import { useMutation } from '@tanstack/vue-query'
import { http } from '@/api/http'
import { useAuthStore, type SessionUser } from '@/stores/auth'

interface ChallengePayload {
  challenge_token: string
  code: string
}

interface ChallengeSuccess {
  token: string
  token_type: 'Bearer'
  expires_at: string | null
  user: SessionUser
}

/** POST /auth/mfa/challenge — the second step after a 428 from useLogin. No
 * Authorization header exists yet at this point (that's the whole point:
 * the caller doesn't have a token until this succeeds), which is fine —
 * this route doesn't require one. */
export function useMfaChallenge() {
  const auth = useAuthStore()

  return useMutation({
    mutationFn: async (payload: ChallengePayload) => {
      const { data } = await http.post<ChallengeSuccess>('/auth/mfa/challenge', payload)
      return data
    },
    onSuccess: (data) => {
      auth.setSession(data.token, data.user)
    },
  })
}
