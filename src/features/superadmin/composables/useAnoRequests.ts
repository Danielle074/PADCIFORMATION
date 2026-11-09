import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, type Ref } from 'vue'
import { apiMeta, http } from '@/api/http'
import type { ApiPaginationMeta } from '@/api/types'

/** `AnoRequestResource` shape (ADR-011 — Avis de Non-Objection). */
export interface AnoRequest {
  id: number
  key: string
  title: string
  priority: 'normale' | 'haute'
  status: 'pending' | 'signed' | 'rejected'
  pathway?: { id: number; key: string; name: string } | null
  submitter?: { id: number; key: string; name: string }
  signer?: { id: number; key: string; name: string } | null
  submitted_at: string | null
  signed_at: string | null
  rejection_reason: string | null
  created_at: string
  updated_at: string
}

export interface AnoListFilters {
  status?: string
  pathwayKey?: string
  page?: number
}

/** GET /admin/ano-requests — finance.view. */
export function useAnoRequests(filters: Ref<AnoListFilters>) {
  return useQuery({
    queryKey: computed(() => ['admin-ano-requests', filters.value]),
    queryFn: async () => {
      const response = await http.get<AnoRequest[]>('/admin/ano-requests', {
        params: {
          status: filters.value.status || undefined,
          pathway_key: filters.value.pathwayKey || undefined,
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

export interface SubmitAnoPayload {
  title: string
  pathway_key?: string
  priority: 'normale' | 'haute'
}

/** POST /admin/ano-requests — ano.manage. */
export function useSubmitAno() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: SubmitAnoPayload) => {
      const { data } = await http.post<AnoRequest>('/admin/ano-requests', payload)
      return data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-ano-requests'] }),
  })
}

/** POST /admin/ano-requests/{anoRequest}/sign — ano.sign, super_admin only (403 otherwise). */
export function useSignAno() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (key: string) => {
      const { data } = await http.post<AnoRequest>(`/admin/ano-requests/${key}/sign`)
      return data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-ano-requests'] }),
  })
}

/** POST /admin/ano-requests/{anoRequest}/reject — ano.sign. */
export function useRejectAno() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ key, reason }: { key: string; reason: string }) => {
      const { data } = await http.post<AnoRequest>(`/admin/ano-requests/${key}/reject`, { reason })
      return data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-ano-requests'] }),
  })
}
