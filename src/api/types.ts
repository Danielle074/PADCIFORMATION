/**
 * PADCI-API response envelope (see `app/Modules/Shared/Http/ApiResponse.php`
 * and `ApiExceptionRenderer` on the backend) — every endpoint returns one of
 * these two shapes, never a bare payload.
 */
/** Present on `meta` only when `data` was a paginator (`ApiResponse::pagination`). */
export interface ApiPaginationMeta {
  current_page: number
  per_page: number
  from: number | null
  to: number | null
  total?: number
  last_page?: number
}

export interface ApiMeta {
  request_id: string
  timestamp: string
  pagination?: ApiPaginationMeta
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
