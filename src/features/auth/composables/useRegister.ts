import { useMutation } from '@tanstack/vue-query'
import { http } from '@/api/http'
import type { SessionUser } from '@/stores/auth'

interface RegisterPayload {
  name: string
  email: string
  password: string
  password_confirmation: string
}

/**
 * `UserResource` shape. Everything beyond the session user (`email_verified`,
 * `verification_url`) comes from the register endpoint only:
 * `verification_url` is handed back **exclusively** in the local/testing
 * environments (see `AuthController::register` and `EmailVerificationLink`)
 * so the flow can complete without a real inbox. In production it is absent
 * and the user must use the link received by email.
 */
interface RegisterSuccess extends SessionUser {
  email_verified?: boolean
  verification_url?: string | null
}

/**
 * POST /v1/auth/register. Creates the account only — no email verification,
 * no session: a fresh account must verify its email BEFORE it can log in
 * (403 `AUTH_EMAIL_NOT_VERIFIED` otherwise), so there is never a token or
 * `setSession()` here, unlike `useLogin`.
 */
export function useRegister() {
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await http.post<RegisterSuccess>('/auth/register', payload)
      return data
    },
  })
}
