import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, type Ref } from 'vue'
import { apiMeta, http } from '@/api/http'
import type { ApiPaginationMeta } from '@/api/types'

/** `BudgetLineResource` shape (ADR-011). `consumed_amount_minor` is computed server-side, never stored. */
export interface BudgetLine {
  id: number
  key: string
  name: string
  allocated_amount_minor: number
  consumed_amount_minor: number
  currency: string
  parent?: { id: number; key: string; name: string } | null
  pathway?: { id: number; key: string; name: string } | null
  note: string | null
  created_at: string
  updated_at: string
}

export interface BudgetLineListFilters {
  pathwayKey?: string
  page?: number
}

/** GET /admin/budget-lines — finance.view. */
export function useBudgetLines(filters: Ref<BudgetLineListFilters>) {
  return useQuery({
    queryKey: computed(() => ['admin-budget-lines', filters.value]),
    queryFn: async () => {
      const response = await http.get<BudgetLine[]>('/admin/budget-lines', {
        params: {
          pathway_key: filters.value.pathwayKey || undefined,
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

export interface CreateBudgetLinePayload {
  name: string
  allocated_amount_minor: number
  currency: string
  parent_budget_line_key?: string
  pathway_key?: string
  note?: string
}

/** POST /admin/budget-lines — finance.manage. */
export function useCreateBudgetLine() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateBudgetLinePayload) => {
      const { data } = await http.post<BudgetLine>('/admin/budget-lines', payload)
      return data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-budget-lines'] }),
  })
}
