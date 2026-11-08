import { QueryClient } from '@tanstack/vue-query'
import { ApiError } from './http'

/**
 * A 401/403/404/422 will never succeed on retry — only retry on transient
 * failures (network errors, 5xx). Mirrors what a human would actually do:
 * re-click "retry" on a timeout, not on "forbidden".
 */
function isRetryable(error: unknown): boolean {
  if (!(error instanceof ApiError)) return true
  return error.status === 0 || error.status >= 500
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => failureCount < 2 && isRetryable(error),
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
})
