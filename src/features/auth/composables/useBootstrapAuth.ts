import { http, ApiError } from '@/api/http'
import { useAuthStore, type SessionUser } from '@/stores/auth'

/**
 * A page reload keeps the token (sessionStorage) but loses the in-memory
 * `user` object. Router guards call this before the first navigation so
 * `auth.user` is populated again from `GET /auth/me` whenever a token
 * exists — without it, every reload of a protected page would look
 * logged-out even though the token is still valid.
 *
 * Memoized: concurrent guard checks during the same navigation must not
 * fire this twice.
 */
let bootstrapPromise: Promise<void> | null = null

export function bootstrapAuth(): Promise<void> {
  const auth = useAuthStore()

  if (auth.token === null) {
    return Promise.resolve()
  }
  if (auth.user !== null) {
    return Promise.resolve()
  }
  if (bootstrapPromise !== null) {
    return bootstrapPromise
  }

  bootstrapPromise = http
    .get<SessionUser>('/auth/me')
    .then(({ data }) => {
      auth.setSession(auth.token as string, data)
    })
    .catch((error) => {
      // An expired/invalid token: the http interceptor already clears the
      // session on a 401, nothing else to do here. Any other failure
      // (network) leaves the stale token in place — a subsequent request
      // will hit the same 401 and clear it then.
      if (!(error instanceof ApiError) || error.status !== 401) {
        throw error
      }
    })
    .finally(() => {
      bootstrapPromise = null
    })

  return bootstrapPromise
}
