import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * Session token storage. PADCI-API issues a Sanctum Bearer token (not a
 * cookie) — see `AuthController::login`, `token_type: "Bearer"`. There is no
 * httpOnly option for a bearer scheme (the client must read it to set the
 * `Authorization` header itself), so the safer default here is
 * `sessionStorage`: it survives a reload within the tab but is cleared when
 * the tab closes, unlike `localStorage` which would keep a stolen XSS payload
 * useful indefinitely. A "remember me" option, if ever added, is a deliberate
 * trade-off to revisit then, not a default.
 */
const STORAGE_KEY = 'padci.session_token'

export interface SessionUser {
  key: string
  name: string
  email: string
  roles: string[]
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(sessionStorage.getItem(STORAGE_KEY))
  const user = ref<SessionUser | null>(null)

  function setSession(newToken: string, newUser: SessionUser): void {
    token.value = newToken
    user.value = newUser
    sessionStorage.setItem(STORAGE_KEY, newToken)
  }

  function clearSession(): void {
    token.value = null
    user.value = null
    sessionStorage.removeItem(STORAGE_KEY)
  }

  function hasRole(role: string): boolean {
    return user.value?.roles.includes(role) ?? false
  }

  return {
    token,
    user,
    setSession,
    clearSession,
    hasRole,
  }
})
