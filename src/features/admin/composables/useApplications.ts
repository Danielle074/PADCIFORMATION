import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, type Ref } from 'vue'
import { apiMeta, http } from '@/api/http'
import type { ApiPaginationMeta } from '@/api/types'

export interface ApplicationPathway {
  id: number
  key: string
  code: string
  name: string
  slug: string
}

export interface ApplicationCohort {
  id: number
  key: string
  code: string
  name: string
  session: string | null
  starts_at: string | null
  ends_at: string | null
  status: string
}

export interface ApplicationUser {
  id: number
  key: string
  name: string
  email: string
}

/** `ApplicationResource` shape. `payload` is free-form — see StoreApplicationRequest. */
export interface Application {
  id: number
  key: string
  status: 'submitted' | 'in_review' | 'accepted' | 'waitlisted' | 'rejected' | 'withdrawn'
  motivation: string | null
  payload: Record<string, unknown> | null
  user?: ApplicationUser
  pathway?: ApplicationPathway
  cohort?: ApplicationCohort | null
  decided_by?: { id: number; key: string; name: string } | null
  reason: string | null
  submitted_at: string | null
  decided_at: string | null
  created_at: string
  updated_at: string
}

export interface ApplicationListFilters {
  status?: string
  pathwayKey?: string
  q?: string
  page?: number
}

/** GET /admin/applications — admissions.view. Server-side filtering/paging. */
export function useApplications(filters: Ref<ApplicationListFilters>) {
  return useQuery({
    queryKey: computed(() => ['admin-applications', filters.value]),
    queryFn: async () => {
      const response = await http.get<Application[]>('/admin/applications', {
        params: {
          status: filters.value.status || undefined,
          pathway_key: filters.value.pathwayKey || undefined,
          q: filters.value.q || undefined,
          page: filters.value.page ?? 1,
        },
      })

      return {
        items: response.data,
        pagination: apiMeta(response)?.pagination ?? (null as ApiPaginationMeta | null),
      }
    },
  })
}

/** GET /admin/applications/{application} — full detail (cohort, decided_by). */
export function useApplication(key: Ref<string | null>) {
  return useQuery({
    queryKey: computed(() => ['admin-application', key.value]),
    queryFn: async () => {
      const { data } = await http.get<Application>(`/admin/applications/${key.value}`)
      return data
    },
    enabled: computed(() => key.value !== null),
  })
}

/** POST /admin/applications/{application}/start-review — admissions.manage. */
export function useStartApplicationReview() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (key: string) => {
      const { data } = await http.post<Application>(`/admin/applications/${key}/start-review`)
      return data
    },
    onSuccess: (application) => {
      queryClient.invalidateQueries({ queryKey: ['admin-applications'] })
      queryClient.invalidateQueries({ queryKey: ['admin-application', application.key] })
    },
  })
}

export interface DecideApplicationPayload {
  key: string
  decision: 'accepted' | 'waitlisted' | 'rejected'
  /** Required by the backend when decision is 'rejected' (DecideApplicationRequest). */
  reason?: string
}

/** POST /admin/applications/{application}/decide — admissions.manage. */
export function useDecideApplication() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ key, decision, reason }: DecideApplicationPayload) => {
      const { data } = await http.post<Application>(`/admin/applications/${key}/decide`, {
        decision,
        reason,
      })
      return data
    },
    onSuccess: (application) => {
      queryClient.invalidateQueries({ queryKey: ['admin-applications'] })
      queryClient.invalidateQueries({ queryKey: ['admin-application', application.key] })
    },
  })
}
