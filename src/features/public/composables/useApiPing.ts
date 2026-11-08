import { useQuery } from '@tanstack/vue-query'
import { http } from '@/api/http'

interface PingResponse {
  pong: boolean
}

/** Calls the backend's unauthenticated `GET /ping` — proves the frontend can
 * actually reach the API (not just that the frontend itself booted). */
export function useApiPing() {
  return useQuery({
    queryKey: ['api-ping'],
    queryFn: async () => {
      const start = performance.now()
      const { data } = await http.get<PingResponse>('/ping')
      return { ...data, latencyMs: Math.round(performance.now() - start) }
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  })
}
