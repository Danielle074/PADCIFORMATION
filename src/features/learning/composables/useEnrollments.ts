import { useQuery } from '@tanstack/vue-query'
import { apiMeta, http } from '@/api/http'
import type { ApiPaginationMeta } from '@/api/types'

export interface EnrollmentCohort {
  id: number
  key: string
  code: string
  name: string
  session: string
  status: string
}

export interface EnrollmentCourse {
  id: number
  key: string
  slug: string
  title: string
  status: string
}

export interface LearnerEnrollment {
  id: number
  key: string
  status: 'active' | 'suspended' | 'completed' | 'revoked'
  cohort?: EnrollmentCohort | null
  course?: EnrollmentCourse | null
  enrolled_at: string | null
  completed_at: string | null
  created_at: string
}

/**
 * Learner: enrollments list.
 */
export function useEnrollments() {
  return useQuery({
    queryKey: ['learner-enrollments'],
    queryFn: async () => {
      const response = await http.get<LearnerEnrollment[]>('/enrollments', {
        params: { per_page: 50 },
      })
      return {
        items: response.data,
        pagination: apiMeta(response)?.pagination ?? (null as ApiPaginationMeta | null),
      }
    },
  })
}
