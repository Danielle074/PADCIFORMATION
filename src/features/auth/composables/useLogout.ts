import { useRouter } from 'vue-router'
import { http } from '@/api/http'
import { useAuthStore } from '@/stores/auth'
import { queryClient } from '@/api/queryClient'

/**
 * Logs out and always lands back on the session being cleared locally —
 * even if the server call fails (token already expired, network down),
 * there is no scenario where staying "logged in" client-side is correct.
 */
export function useLogout() {
  const auth = useAuthStore()
  const router = useRouter()

  return async function logout(): Promise<void> {
    try {
      await http.post('/auth/logout')
    } catch {
      // Already-invalid token, network error — doesn't matter, we're
      // clearing the local session regardless.
    } finally {
      auth.clearSession()
      queryClient.clear()
      await router.push('/')
    }
  }
}
