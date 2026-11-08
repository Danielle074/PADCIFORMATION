import { useMutation } from '@tanstack/vue-query'
import { http } from '@/api/http'

interface SetupResponse {
  secret: string
  provisioning_uri: string
}

interface ConfirmPayload {
  secret: string
  code: string
}

interface ConfirmResponse {
  recovery_codes: string[]
}

/** POST /auth/mfa/setup — generates a secret, not persisted until confirmed. */
export function useMfaSetup() {
  return useMutation({
    mutationFn: async () => {
      const { data } = await http.post<SetupResponse>('/auth/mfa/setup')
      return data
    },
  })
}

/** POST /auth/mfa/confirm — the only response that ever carries plaintext
 * recovery codes, and only once. */
export function useMfaConfirm() {
  return useMutation({
    mutationFn: async (payload: ConfirmPayload) => {
      const { data } = await http.post<ConfirmResponse>('/auth/mfa/confirm', payload)
      return data
    },
  })
}
