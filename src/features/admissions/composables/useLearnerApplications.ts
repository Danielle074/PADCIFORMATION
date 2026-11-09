import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { apiMeta, http } from '@/api/http'
import type { ApiPaginationMeta } from '@/api/types'

export interface ApplicationEquipmentPayload {
  has_computer: boolean
  cpu?: string
  ram_gb?: number
  storage_gb?: number
  evidence_media_key?: string
}

export interface ApplicationPayload {
  equipment?: ApplicationEquipmentPayload
  [key: string]: unknown
}

export interface LearnerApplication {
  id: number
  key: string
  status: 'submitted' | 'under_review' | 'accepted' | 'waitlisted' | 'rejected' | 'withdrawn'
  motivation: string | null
  payload: ApplicationPayload | null
  pathway?: {
    id: number
    key: string
    code: string
    name: string
    slug: string
  } | null
  cohort?: {
    id: number
    key: string
    code: string
    name: string
    session: string
    starts_at: string | null
    ends_at: string | null
    status: string
  } | null
  reason: string | null
  submitted_at: string | null
  decided_at: string | null
  created_at: string
  updated_at: string
}

export interface SubmitApplicationDto {
  pathway_key: string
  cohort_key: string
  motivation?: string
  payload?: ApplicationPayload
}

/**
 * Learner: list of applications submitted by the current user.
 */
export function useLearnerApplications() {
  return useQuery({
    queryKey: ['learner-applications'],
    queryFn: async () => {
      const response = await http.get<LearnerApplication[]>('/applications', {
        params: { per_page: 50 },
      })
      return {
        items: response.data,
        pagination: apiMeta(response)?.pagination ?? (null as ApiPaginationMeta | null),
      }
    },
  })
}

/**
 * Learner: submit a new application (ADR-012).
 */
export function useSubmitApplication() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (dto: SubmitApplicationDto) => {
      const { data } = await http.post<LearnerApplication>('/applications', dto)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learner-applications'] })
    },
  })
}

/**
 * Learner: withdraw a pending application.
 */
export function useWithdrawApplication() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (key: string) => {
      const { data } = await http.post<LearnerApplication>(`/applications/${key}/withdraw`)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learner-applications'] })
    },
  })
}
