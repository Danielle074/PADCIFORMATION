<template>
  <div class="space-y-6">
    <!-- EN-TÊTE -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Gestion des Accès</h1>
        <p class="text-sm text-gray-500 mt-1">Rôles et statut des comptes de la plateforme.</p>
      </div>
    </div>

    <!-- FILTRES -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="relative flex-1">
          <svg
            class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher un nom, un email..."
            class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm"
          />
        </div>
        <select
          v-model="filterRole"
          class="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm text-gray-700 bg-white min-w-[200px]"
        >
          <option value="">Tous les rôles</option>
          <option v-for="role in roleOptions" :key="role.value" :value="role.value">
            {{ role.label }}
          </option>
        </select>
      </div>
    </div>

    <!-- TABLEAU DES UTILISATEURS -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr
              class="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100"
            >
              <th class="py-4 px-6">Utilisateur</th>
              <th class="py-4 px-6">Rôle</th>
              <th class="py-4 px-6">Statut</th>
              <th class="py-4 px-6">Dernière connexion</th>
              <th class="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-sm">
            <tr v-if="isPending">
              <td colspan="5" class="py-10 text-center text-gray-500">
                Chargement des utilisateurs…
              </td>
            </tr>
            <tr v-else-if="isError">
              <td colspan="5" class="py-10 text-center text-red-600">
                {{ (error as ApiError)?.message ?? 'Impossible de charger les utilisateurs.' }}
              </td>
            </tr>
            <tr v-else-if="users.length === 0">
              <td colspan="5" class="py-10 text-center text-gray-500">
                Aucun utilisateur ne correspond à vos critères.
              </td>
            </tr>

            <tr v-for="user in users" :key="user.key" class="hover:bg-gray-50 transition">
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0"
                    :class="roleColors(primaryRole(user)).bg"
                  >
                    <span :class="roleColors(primaryRole(user)).text">{{
                      initialsOf(user.name)
                    }}</span>
                  </div>
                  <div>
                    <p class="font-bold text-gray-800">{{ user.name }}</p>
                    <p class="text-xs text-gray-500">{{ user.email }}</p>
                  </div>
                </div>
              </td>

              <td class="py-4 px-6">
                <select
                  :value="primaryRole(user)"
                  :disabled="isSelf(user) || rowMutating(user.key)"
                  @change="changeRole(user, ($event.target as HTMLSelectElement).value as AppRole)"
                  class="px-2.5 py-1.5 rounded-md text-xs font-bold border-0 focus:outline-none focus:ring-2 focus:ring-orange-500/30 disabled:opacity-60"
                  :class="[roleColors(primaryRole(user)).bg, roleColors(primaryRole(user)).text]"
                >
                  <option v-for="role in roleOptions" :key="role.value" :value="role.value">
                    {{ role.label }}
                  </option>
                </select>
              </td>

              <td class="py-4 px-6">
                <span
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                  :class="
                    user.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  "
                >
                  <span
                    class="w-1.5 h-1.5 rounded-full"
                    :class="user.is_active ? 'bg-green-500' : 'bg-gray-400'"
                  ></span>
                  {{ user.is_active ? 'Actif' : 'Désactivé' }}
                </span>
              </td>

              <td class="py-4 px-6 text-gray-500">{{ formatDate(user.last_login_at) }}</td>

              <td class="py-4 px-6 text-center">
                <span v-if="isSelf(user)" class="text-xs italic text-gray-400">(C'est vous)</span>
                <button
                  v-else
                  @click="toggleActive(user)"
                  :disabled="rowMutating(user.key)"
                  class="text-xs font-semibold px-3 py-1.5 rounded-lg transition disabled:opacity-50"
                  :class="
                    user.is_active
                      ? 'text-red-600 hover:bg-red-50'
                      : 'text-primary hover:bg-primary/10'
                  "
                >
                  {{ user.is_active ? 'Désactiver' : 'Réactiver' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- PAGINATION -->
      <div
        v-if="pagination"
        class="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <span class="text-sm text-gray-600">
          Affichage de <span class="font-semibold text-gray-800">{{ pagination.from ?? 0 }}</span> à
          <span class="font-semibold text-gray-800">{{ pagination.to ?? 0 }}</span> sur
          <span class="font-semibold text-gray-800">{{ pagination.total ?? 0 }}</span> utilisateurs
        </span>
        <nav class="inline-flex rounded-md shadow-sm -space-x-px">
          <button
            @click="page > 1 && page--"
            :disabled="page === 1"
            class="px-3 py-2 border border-gray-300 bg-white text-gray-500 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <span
            class="px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700"
          >
            {{ pagination.current_page }} / {{ pagination.last_page ?? 1 }}
          </span>
          <button
            @click="page < (pagination.last_page ?? 1) && page++"
            :disabled="page === (pagination.last_page ?? 1)"
            class="px-3 py-2 border border-gray-300 bg-white text-gray-500 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </nav>
      </div>
      <p v-if="actionError" class="px-6 py-3 text-sm text-red-600 border-t border-gray-100">
        {{ actionError }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ApiError } from '@/api/http'
import { useAuthStore } from '@/stores/auth'
import {
  useAdminUsers,
  useUpdateAdminUser,
  type AdminUser,
  type AdminUserListFilters,
  type AppRole,
} from '../composables/useAdminUsers'

const auth = useAuthStore()

const searchQuery = ref('')
const filterRole = ref<AppRole | ''>('')
const page = ref(1)

const filters = computed<AdminUserListFilters>(() => ({
  q: searchQuery.value || undefined,
  role: filterRole.value || undefined,
  page: page.value,
}))

const { data, isPending, isError, error } = useAdminUsers(filters)
const users = computed(() => data.value?.items ?? [])
const pagination = computed(() => data.value?.pagination ?? null)

const roleOptions: { value: AppRole; label: string }[] = [
  { value: 'super_admin', label: 'Super administrateur' },
  { value: 'admin', label: 'Administrateur' },
  { value: 'moderateur', label: 'Modérateur' },
  { value: 'formateur', label: 'Formateur' },
  { value: 'apprenant', label: 'Apprenant' },
]

function primaryRole(user: AdminUser): AppRole {
  return user.roles[0] ?? 'apprenant'
}

function roleColors(role: AppRole): { bg: string; text: string } {
  switch (role) {
    case 'super_admin':
      return { bg: 'bg-orange-100', text: 'text-orange-700' }
    case 'admin':
      return { bg: 'bg-blue-100', text: 'text-blue-700' }
    case 'moderateur':
      return { bg: 'bg-purple-100', text: 'text-purple-700' }
    case 'formateur':
      return { bg: 'bg-primary/10', text: 'text-primary' }
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-600' }
  }
}

function isSelf(user: AdminUser): boolean {
  return user.key === auth.user?.key
}

function initialsOf(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

function formatDate(value: string | null): string {
  if (!value) return 'Jamais connecté'
  return new Date(value).toLocaleString('fr-FR')
}

const updateMutation = useUpdateAdminUser()
const mutatingKey = ref<string | null>(null)
const actionError = ref<string | null>(null)

function rowMutating(key: string): boolean {
  return mutatingKey.value === key
}

function changeRole(user: AdminUser, role: AppRole) {
  if (role === primaryRole(user)) return
  actionError.value = null
  mutatingKey.value = user.key
  updateMutation.mutate(
    { key: user.key, role },
    {
      onError: (mutationError) => {
        actionError.value = (mutationError as ApiError).displayMessage
      },
      onSettled: () => {
        mutatingKey.value = null
      },
    },
  )
}

function toggleActive(user: AdminUser) {
  actionError.value = null
  mutatingKey.value = user.key
  updateMutation.mutate(
    { key: user.key, is_active: !user.is_active },
    {
      onError: (mutationError) => {
        actionError.value = (mutationError as ApiError).displayMessage
      },
      onSettled: () => {
        mutatingKey.value = null
      },
    },
  )
}
</script>
