import { useMutation } from '@tanstack/vue-query'
import { http } from '@/api/http'

/**
 * POST /v1/auth/forgot-password. The backend answers 202 regardless of
 * whether the address exists (`PasswordResetController::forgot` never
 * reveals it) — for the UI, "the request was accepted" IS the success
 * state; there is no "unknown email" branch to build and none should be.
 */
export function useForgotPassword() {
  return useMutation({
    mutationFn: async (payload: { email: string }) => {
      const { data } = await http.post<null>('/auth/forgot-password', payload)
      return data
    },
  })
}
