import { useQuery } from '@tanstack/vue-query'
import { http } from '@/api/http'

export interface CatalogPathway {
  id: number
  key: string
  code: string
  name: string
  slug: string
  description: string | null
  equipment_requirements: Record<string, unknown> | null
  icon: string | null
  position: number
  is_active: boolean
  courses_count?: number
}

/** GET /catalog/pathways — public, no auth. Active pathways only (server-side). */
export function useCatalogPathways() {
  return useQuery({
    queryKey: ['catalog-pathways'],
    queryFn: async () => {
      const { data } = await http.get<CatalogPathway[]>('/catalog/pathways', {
        params: { per_page: 100 },
      })
      return data
    },
    staleTime: 5 * 60 * 1000,
  })
}
