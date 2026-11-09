import { useQuery } from '@tanstack/vue-query'
import { apiMeta, http } from '@/api/http'

/** GET /admin/dashboard/overview — reports.view. Platform-wide for admin/super_admin. */
export interface DashboardOverview {
  learners_total: number
  active_cohorts_total: number
  published_courses_total: number
  /** 0..1 ratio, not a percentage. */
  completion_rate: number
  certificates_issued_total: number
}

export function useDashboardOverview() {
  return useQuery({
    queryKey: ['admin-dashboard-overview'],
    queryFn: async () => {
      const { data } = await http.get<DashboardOverview>('/admin/dashboard/overview')
      return data
    },
  })
}

/** GET /admin/dashboard/reports/pathways — enrollment/completion counts per pathway. */
export interface PathwayMetrics {
  pathway_key: string
  name: string
  enrolled_count: number
  completed_count: number
  completion_rate: number
  certificates_issued: number
}

export function useDashboardByPathway() {
  return useQuery({
    queryKey: ['admin-dashboard-by-pathway'],
    queryFn: async () => {
      const { data } = await http.get<PathwayMetrics[]>('/admin/dashboard/reports/pathways')
      return data
    },
  })
}

const APPLICATION_STATUSES = ['submitted', 'in_review', 'accepted', 'waitlisted', 'rejected', 'withdrawn'] as const

/**
 * No dedicated stats endpoint exists for application status counts
 * (Admissions is a separate module from Operations/DashboardMetrics) — this
 * reads `meta.pagination.total` from GET /admin/applications once per
 * status (per_page=1, no records fetched beyond the one needed to read the
 * total), which stays correct at any volume unlike counting a single capped
 * page of items client-side.
 */
export function useApplicationStatusCounts() {
  return useQuery({
    queryKey: ['admin-application-status-counts'],
    queryFn: async () => {
      const results = await Promise.all(
        APPLICATION_STATUSES.map(async (status) => {
          const response = await http.get('/admin/applications', { params: { status, per_page: 1 } })
          return [status, apiMeta(response)?.pagination?.total ?? 0] as const
        }),
      )
      return Object.fromEntries(results) as Record<(typeof APPLICATION_STATUSES)[number], number>
    },
  })
}
