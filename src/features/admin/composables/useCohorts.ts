import { useQuery } from '@tanstack/vue-query'
import { computed, type Ref } from 'vue'
import { apiMeta, http } from '@/api/http'
import type { ApiPaginationMeta } from '@/api/types'

export interface CohortTrainer {
  id: number
  key: string
  name: string
  email: string
  cohort_role: string
}

/** `CohortResource` shape. */
export interface Cohort {
  id: number
  key: string
  code: string
  name: string
  session: string | null
  capacity: number | null
  starts_at: string | null
  ends_at: string | null
  status: 'planned' | 'open' | 'running' | 'completed' | 'cancelled'
  pathway?: { id: number; key: string; code: string; name: string }
  trainers?: CohortTrainer[]
  enrollments_count?: number
  created_at: string
  updated_at: string
}

export interface CohortListFilters {
  pathwayKey?: string
  status?: string
  q?: string
  page?: number
}

/** GET /admin/cohorts — cohorts.view. */
export function useCohorts(filters: Ref<CohortListFilters>) {
  return useQuery({
    queryKey: computed(() => ['admin-cohorts', filters.value]),
    queryFn: async () => {
      const response = await http.get<Cohort[]>('/admin/cohorts', {
        params: {
          pathway_key: filters.value.pathwayKey || undefined,
          status: filters.value.status || undefined,
          q: filters.value.q || undefined,
          page: filters.value.page ?? 1,
          per_page: 100,
        },
      })

      return {
        items: response.data,
        pagination: apiMeta(response)?.pagination ?? (null as ApiPaginationMeta | null),
      }
    },
  })
}
