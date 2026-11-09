import { useMutation } from '@tanstack/vue-query'
import { http } from '@/api/http'

interface ResetPasswordPayload {
  email: string
  /** Signed-ish token from the password-reset email (`?token=…&email=…`). */
  token: string
  password: string
  password_confirmation: string
}

/**
 * POST /v1/auth/reset-password (`PasswordResetController::reset`).
 * On success the backend revokes ALL of the user's Sanctum tokens — any
 * open session elsewhere is logged out. An invalid or expired token comes
 * back as `PasswordResetFailedException`; surface its message verbatim,
 * do not soften it ("session expirée, redemandez un lien" is a lie the
 * backend decides, not us).
 */
export function useResetPassword() {
  return useMutation({
    mutationFn: async (payload: ResetPasswordPayload) => {
      const { data } = await http.post<null>('/auth/reset-password', payload)
      return data
    },
  })
}
