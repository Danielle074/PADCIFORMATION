import { useMutation } from '@tanstack/vue-query'
import { http } from '@/api/http'
import { useAuthStore, type SessionUser } from '@/stores/auth'

interface LoginPayload {
  email: string
  password: string
}

interface LoginSuccess {
  token: string
  token_type: 'Bearer'
  expires_at: string | null
  user: SessionUser
}

/**
 * POST /auth/login. A privileged account with TOTP confirmed gets a 428
 * (`AUTH_MFA_REQUIRED`) instead of a token — that is not a failure for the
 * UI to show as "wrong credentials", the caller must branch on
 * `error.code === 'AUTH_MFA_REQUIRED'` and move to the challenge step
 * (see useMfaChallenge). This composable only does the plain login call.
 */
export function useLogin() {
  const auth = useAuthStore()

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await http.post<LoginSuccess>('/auth/login', {
        ...payload,
        device_name: `web-${navigator.platform || 'browser'}`,
      })
      return data
    },
    onSuccess: (data) => {
      auth.setSession(data.token, data.user)
    },
  })
}
