<template>
  <div class="space-y-6">

    <!-- ================= EN-TÊTE ================= -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Gestion des Cohortes</h1>
        <p class="text-sm text-gray-500 mt-1">
          Sessions par filière : effectifs, statut et dates.
        </p>
      </div>
    </div>

    <!-- ================= FILTRES ================= -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div class="flex flex-col md:flex-row gap-4">
        <select v-model="filterPathwayKey" class="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-gray-700 bg-white min-w-[200px]">
          <option value="">Toutes les filières</option>
          <option v-for="pathway in pathways" :key="pathway.key" :value="pathway.key">{{ pathway.name }}</option>
        </select>
        <select v-model="filterStatus" class="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-gray-700 bg-white min-w-[170px]">
          <option value="">Tous les statuts</option>
          <option v-for="status in statusOptions" :key="status.value" :value="status.value">{{ status.label }}</option>
        </select>
      </div>
    </div>

    <!-- ================= RÉSUMÉ GLOBAL (calculé depuis les cohortes réellement chargées) ================= -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-xl shadow-sm p-5 border border-gray-100 flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <div>
          <p class="text-sm text-gray-500 font-medium">Total inscrits</p>
          <p class="text-2xl font-bold text-gray-800">{{ totalEnrolled }}</p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-5 border border-gray-100 flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <p class="text-sm text-gray-500 font-medium">Sessions actives</p>
          <p class="text-2xl font-bold text-primary">{{ activeCount }} <span class="text-sm text-gray-400 font-normal">/ {{ cohorts.length }}</span></p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-5 border border-gray-100 flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        <div>
          <p class="text-sm text-gray-500 font-medium">Sessions terminées</p>
          <p class="text-2xl font-bold text-gray-800">{{ completedCount }} <span class="text-sm text-gray-400 font-normal">/ {{ cohorts.length }}</span></p>
        </div>
      </div>
    </div>

    <!-- ================= ÉTATS ================= -->
    <div v-if="isPending" class="text-center text-gray-500 py-10">Chargement des cohortes…</div>
    <div v-else-if="isError" class="text-center text-red-600 py-10">
      {{ (error as ApiError)?.message ?? 'Impossible de charger les cohortes.' }}
    </div>
    <div v-else-if="cohorts.length === 0" class="text-center text-gray-500 py-10">
      Aucune cohorte ne correspond à vos critères.
    </div>

    <!-- ================= CARTES DES COHORTES ================= -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="cohort in cohorts" :key="cohort.key" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition flex flex-col">

        <!-- En-tête de la carte -->
        <div class="p-5 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
              {{ cohort.code.slice(0, 4) }}
            </div>
            <div>
              <h3 class="font-bold text-gray-800">{{ cohort.pathway?.name ?? '—' }}</h3>
              <p class="text-xs text-gray-500">{{ cohort.session ?? cohort.code }}</p>
            </div>
          </div>
          <span class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0" :class="statusBadgeClass(cohort.status)">
            {{ statusLabel(cohort.status) }}
          </span>
        </div>

        <!-- Corps de la carte (Données réelles) -->
        <div class="p-5 flex-1 space-y-4">
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gray-500 font-medium">Effectif</span>
              <span class="font-bold text-gray-800">
                {{ cohort.enrollments_count ?? 0 }}<span v-if="cohort.capacity"> / {{ cohort.capacity }}</span>
              </span>
            </div>
            <div v-if="cohort.capacity" class="w-full bg-gray-100 rounded-full h-2">
              <div class="bg-primary h-2 rounded-full" :style="{ width: Math.min(100, ((cohort.enrollments_count ?? 0) / cohort.capacity) * 100) + '%' }"></div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 text-sm">
            <div class="bg-gray-50 p-2 rounded-lg">
              <p class="text-xs text-gray-400 mb-0.5">Début</p>
              <p class="font-medium text-gray-700">{{ formatDate(cohort.starts_at) }}</p>
            </div>
            <div class="bg-gray-50 p-2 rounded-lg">
              <p class="text-xs text-gray-400 mb-0.5">Fin</p>
              <p class="font-medium text-gray-700">{{ formatDate(cohort.ends_at) }}</p>
            </div>
          </div>
        </div>

        <!-- Pied de la carte -->
        <div class="p-4 border-t border-gray-100 bg-gray-50 text-xs text-gray-500">
          Code : <span class="font-medium text-gray-700">{{ cohort.code }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ApiError } from '@/api/http'
import { useCatalogPathways } from '@/features/public/composables/useCatalogPathways'
import { useCohorts, type CohortListFilters } from '../composables/useCohorts'

const filterPathwayKey = ref('')
const filterStatus = ref('')

const filters = computed<CohortListFilters>(() => ({
  pathwayKey: filterPathwayKey.value || undefined,
  status: filterStatus.value || undefined,
}))

const { data, isPending, isError, error } = useCohorts(filters)
const cohorts = computed(() => data.value?.items ?? [])

const { data: pathways } = useCatalogPathways()

const statusOptions = [
  { value: 'planned', label: 'Planifiée' },
  { value: 'open', label: 'Ouverte' },
  { value: 'running', label: 'En cours' },
  { value: 'completed', label: 'Terminée' },
  { value: 'cancelled', label: 'Annulée' },
]

function statusLabel(status: string): string {
  return statusOptions.find((option) => option.value === status)?.label ?? status
}

function statusBadgeClass(status: string): string {
  switch (status) {
    case 'completed':
      return 'bg-primary/10 text-primary'
    case 'open':
    case 'running':
      return 'bg-blue-100 text-blue-700'
    case 'cancelled':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-500'
  }
}

function formatDate(value: string | null): string {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('fr-FR')
}

const totalEnrolled = computed(() => cohorts.value.reduce((sum, cohort) => sum + (cohort.enrollments_count ?? 0), 0))
const activeCount = computed(() => cohorts.value.filter((cohort) => cohort.status === 'open' || cohort.status === 'running').length)
const completedCount = computed(() => cohorts.value.filter((cohort) => cohort.status === 'completed').length)
</script>

<style scoped>
/* Le design est entièrement géré par Tailwind, pas besoin de CSS supplémentaire */
</style>
