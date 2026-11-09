import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, type Ref } from 'vue'
import { apiMeta, http } from '@/api/http'
import type { ApiPaginationMeta } from '@/api/types'

/** `DisbursementRequestResource` shape (ADR-011). Append-only ledger row — never deleted, even rejected. */
export interface Disbursement {
  id: number
  key: string
  beneficiary: string
  purpose: string
  amount_minor: number
  currency: string
  status: 'pending_ano' | 'paid' | 'rejected'
  budget_line?: { id: number; key: string; name: string }
  ano_request?: { id: number; key: string; title: string; status: string } | null
  requested_by?: { id: number; key: string; name: string }
  requested_at: string | null
  paid_at: string | null
  paid_by?: { id: number; key: string; name: string } | null
  rejection_reason: string | null
  created_at: string
  updated_at: string
}

export interface DisbursementListFilters {
  status?: string
  budgetLineKey?: string
  page?: number
}

/** GET /admin/disbursement-requests — finance.view. */
export function useDisbursements(filters: Ref<DisbursementListFilters>) {
  return useQuery({
    queryKey: computed(() => ['admin-disbursements', filters.value]),
    queryFn: async () => {
      const response = await http.get<Disbursement[]>('/admin/disbursement-requests', {
        params: {
          status: filters.value.status || undefined,
          budget_line_key: filters.value.budgetLineKey || undefined,
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

export interface CreateDisbursementPayload {
  budget_line_key: string
  beneficiary: string
  purpose: string
  amount_minor: number
  currency: string
  ano_request_key?: string
}

/** POST /admin/disbursement-requests — finance.manage. */
export function useCreateDisbursement() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateDisbursementPayload) => {
      const { data } = await http.post<Disbursement>('/admin/disbursement-requests', payload)
      return data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-disbursements'] }),
  })
}

/**
 * POST /admin/disbursement-requests/{disbursementRequest}/mark-paid —
 * finance.manage, fails with 422 if the linked ANO isn't signed yet — the
 * backend enforces this, the UI must show that error, never pre-validate
 * and hide the button (the server stays authoritative, see task 03.F).
 */
export function useMarkDisbursementPaid() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (key: string) => {
      const { data } = await http.post<Disbursement>(
        `/admin/disbursement-requests/${key}/mark-paid`,
      )
      return data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-disbursements'] }),
  })
}

/** POST /admin/disbursement-requests/{disbursementRequest}/reject — finance.manage. */
export function useRejectDisbursement() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ key, reason }: { key: string; reason: string }) => {
      const { data } = await http.post<Disbursement>(`/admin/disbursement-requests/${key}/reject`, {
        reason,
      })
      return data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-disbursements'] }),
  })
}
