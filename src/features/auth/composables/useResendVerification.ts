import { useMutation } from '@tanstack/vue-query'
import { http } from '@/api/http'

/**
 * POST /v1/email/verification-notification — PUBLIC route (no session:
 * the caller is by definition someone who cannot log in yet).
 * `ResendVerificationRequest` wants `{ email }`. The backend never
 * reveals whether the address exists; the UI treats "accepted" as done.
 */
export function useResendVerification() {
  return useMutation({
    mutationFn: async (payload: { email: string }) => {
      const { data } = await http.post<null>('/email/verification-notification', payload)
      return data
    },
  })
}
