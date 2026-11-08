import axios, { AxiosError, type AxiosInstance } from 'axios'
import { useAuthStore } from '@/stores/auth'
import type { ApiFailure } from './types'

/**
 * Normalized error shape for the whole app — every catch block deals with
 * this, never a raw AxiosError or the backend's envelope directly.
 */
export class ApiError extends Error {
  readonly code: string
  readonly status: number
  readonly details: Record<string, unknown> | null
  readonly requestId: string | null

  constructor(message: string, code: string, status: number, details: Record<string, unknown> | null, requestId: string | null) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.status = status
    this.details = details
    this.requestId = requestId
  }

  /** Field-level validation messages, when `code === 'VALIDATION_FAILED'`. */
  get fieldErrors(): Record<string, string[]> {
    const details = this.details
    if (details === null) return {}
    return details as Record<string, string[]>
  }
}

export const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8070/api/v1',
  headers: {
    Accept: 'application/json',
  },
})

http.interceptors.request.use((config) => {
  // Correlates a request with the backend's `audit_logs`/error responses —
  // the API echoes this back (see SetRequestId middleware) so a bug report
  // can quote one exact id.
  config.headers['X-Request-Id'] = crypto.randomUUID()

  const token = useAuthStore().token
  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

http.interceptors.response.use(
  // Success responses are always `{ success: true, data, message, meta }` —
  // callers want `data`, not the envelope.
  (response) => {
    response.data = response.data?.data
    return response
  },
  (error: AxiosError<ApiFailure>) => {
    const requestId = error.response?.headers?.['x-request-id'] ?? null

    // An expired/invalid token is a dead session regardless of which shape
    // the error body comes in — drop it before anything else.
    if (error.response?.status === 401) {
      useAuthStore().clearSession()
    }

    if (error.response?.data?.success === false) {
      const { message, error: failure } = error.response.data
      return Promise.reject(
        new ApiError(message, failure.code, error.response.status, failure.details, requestId),
      )
    }

    // Network failure, timeout, or a non-JSON error (e.g. a 502 from the
    // reverse proxy) — the backend's envelope never reached us.
    return Promise.reject(
      new ApiError(
        error.message || 'Erreur réseau.',
        error.code ?? 'NETWORK_ERROR',
        error.response?.status ?? 0,
        null,
        requestId,
      ),
    )
  },
)
