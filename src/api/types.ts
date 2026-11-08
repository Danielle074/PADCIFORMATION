/**
 * PADCI-API response envelope (see `app/Modules/Shared/Http/ApiResponse.php`
 * and `ApiExceptionRenderer` on the backend) — every endpoint returns one of
 * these two shapes, never a bare payload.
 */
export interface ApiMeta {
  request_id: string
  timestamp: string
}

export interface ApiSuccess<T> {
  success: true
  message: string | null
  data: T
  meta: ApiMeta
}

export interface ApiFailure {
  success: false
  message: string
  error: {
    code: string
    details: Record<string, unknown> | null
  }
  meta: ApiMeta
}

export type ApiEnvelope<T> = ApiSuccess<T> | ApiFailure
