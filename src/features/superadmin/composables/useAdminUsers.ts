import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, type Ref } from 'vue'
import { apiMeta, http } from '@/api/http'
import type { ApiPaginationMeta } from '@/api/types'

export type AppRole = 'super_admin' | 'admin' | 'moderateur' | 'formateur' | 'apprenant'

/** `UserResource` shape. */
export interface AdminUser {
  id: number
  key: string
  name: string
  email: string
  email_verified: boolean
  is_active: boolean
  roles: AppRole[]
  mfa_enabled: boolean
  mfa_required: boolean
  last_login_at: string | null
  created_at: string
}

export interface AdminUserListFilters {
  role?: AppRole | ''
  q?: string
  page?: number
}

/** GET /admin/users — users.view. */
export function useAdminUsers(filters: Ref<AdminUserListFilters>) {
  return useQuery({
    queryKey: computed(() => ['admin-users', filters.value]),
    queryFn: async () => {
      const response = await http.get<AdminUser[]>('/admin/users', {
        params: {
          role: filters.value.role || undefined,
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

export interface UpdateAdminUserPayload {
  key: string
  is_active?: boolean
  role?: AppRole
}

/** PATCH /admin/users/{user} — users.manage. No create/delete endpoint exists. */
export function useUpdateAdminUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ key, ...data }: UpdateAdminUserPayload) => {
      const { data: user } = await http.patch<AdminUser>(`/admin/users/${key}`, data)
      return user
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
    },
  })
}
