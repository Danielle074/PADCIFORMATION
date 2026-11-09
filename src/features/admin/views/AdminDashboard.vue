<template>
  <div class="space-y-6">

    <!-- ================= EN-TÊTE ================= -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        <p class="text-sm text-gray-500 mt-1">
          Vue d'ensemble du programme : apprenants, cohortes, cours et certifications.
        </p>
      </div>
    </div>

    <!-- ================= STATISTIQUES PRINCIPALES (KPIs réels) ================= -->
    <div v-if="isOverviewPending" class="text-center text-gray-500 py-6">Chargement des indicateurs…</div>
    <div v-else-if="isOverviewError" class="text-center text-red-600 py-6">
      {{ (overviewError as ApiError)?.message ?? 'Impossible de charger les indicateurs.' }}
    </div>
    <div v-else-if="overview" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-gray-500 text-sm font-medium">Apprenants</p>
            <p class="text-3xl font-bold text-gray-800 mt-1">{{ overview.learners_total }}</p>
          </div>
          <div class="bg-primary/10 p-3 rounded-xl">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-gray-500 text-sm font-medium">Cohortes actives</p>
            <p class="text-3xl font-bold text-gray-800 mt-1">{{ overview.active_cohorts_total }}</p>
          </div>
          <div class="bg-primary/10 p-3 rounded-xl">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-gray-500 text-sm font-medium">Taux de complétion</p>
            <p class="text-3xl font-bold text-gray-800 mt-1">{{ Math.round(overview.completion_rate * 100) }}%</p>
          </div>
          <div class="bg-primary/10 p-3 rounded-xl">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-gray-500 text-sm font-medium">Certificats délivrés</p>
            <p class="text-3xl font-bold text-gray-800 mt-1">{{ overview.certificates_issued_total }}</p>
          </div>
          <div class="bg-primary/10 p-3 rounded-xl">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= GRAPHIQUES ================= -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Répartition par filière (réel, GET /admin/dashboard/reports/pathways) -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-gray-800">Inscrits par filière</h3>
        </div>
        <div v-if="isPathwaysPending" class="h-64 flex items-center justify-center text-sm text-gray-500">Chargement…</div>
        <div v-else-if="isPathwaysError" class="h-64 flex items-center justify-center text-sm text-red-600">Impossible de charger.</div>
        <div v-else-if="pathwayMetrics && pathwayMetrics.length > 0" class="h-64">
          <Bar :data="pathwayChartData" :options="chartOptions" />
        </div>
        <div v-else class="h-64 flex items-center justify-center text-sm text-gray-500">Aucune filière à afficher.</div>
      </div>

      <!-- Statut des candidatures (réel, totaux par statut via GET /admin/applications) -->
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 class="text-lg font-bold text-gray-800 mb-4">Statut des candidatures</h3>
        <div v-if="isStatusCountsPending" class="h-64 flex items-center justify-center text-sm text-gray-500">Chargement…</div>
        <div v-else-if="isStatusCountsError" class="h-64 flex items-center justify-center text-sm text-red-600">Impossible de charger.</div>
        <div v-else-if="statusCounts && totalApplications > 0" class="h-64">
          <Doughnut :data="statusChartData" :options="doughnutOptions" />
        </div>
        <div v-else class="h-64 flex items-center justify-center text-sm text-gray-500">Aucune candidature pour l'instant.</div>
      </div>
    </div>

    <!-- ================= DERNIÈRES CANDIDATURES ACCEPTÉES (réel) ================= -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 class="text-lg font-bold text-gray-800">Dernières candidatures acceptées</h3>
        <router-link to="/admin/candidatures" class="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
          Tout voir
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </router-link>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <th class="py-3 px-6">Candidat</th>
              <th class="py-3 px-6">Filière</th>
              <th class="py-3 px-6">Session</th>
              <th class="py-3 px-6">Date de décision</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-sm">
            <tr v-if="isRecentPending">
              <td colspan="4" class="py-8 text-center text-gray-500">Chargement…</td>
            </tr>
            <tr v-else-if="recentAccepted.length === 0">
              <td colspan="4" class="py-8 text-center text-gray-500">Aucune candidature acceptée pour l'instant.</td>
            </tr>
            <tr v-for="application in recentAccepted" :key="application.key" class="hover:bg-gray-50 transition">
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    {{ initialsOf(application.user?.name) }}
                  </div>
                  <div>
                    <p class="font-medium text-gray-800">{{ application.user?.name ?? '—' }}</p>
                    <p class="text-xs text-gray-500">{{ application.user?.email ?? '—' }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6 text-gray-600">{{ application.pathway?.name ?? '—' }}</td>
              <td class="py-4 px-6 text-gray-600">{{ application.cohort?.code ?? '—' }}</td>
              <td class="py-4 px-6 text-gray-600">{{ formatDate(application.decided_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Bar, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale,
  LinearScale, ArcElement,
} from 'chart.js'
import type { ApiError } from '@/api/http'
import { useApplications } from '../composables/useApplications'
import { useApplicationStatusCounts, useDashboardByPathway, useDashboardOverview } from '../composables/useDashboard'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

// ==================== KPIs ====================
const { data: overview, isPending: isOverviewPending, isError: isOverviewError, error: overviewError } = useDashboardOverview()

// ==================== RÉPARTITION PAR FILIÈRE ====================
const { data: pathwayMetrics, isPending: isPathwaysPending, isError: isPathwaysError } = useDashboardByPathway()

const pathwayChartData = computed(() => ({
  labels: (pathwayMetrics.value ?? []).map((pathway) => pathway.name),
  datasets: [
    {
      label: 'Inscrits',
      data: (pathwayMetrics.value ?? []).map((pathway) => pathway.enrolled_count),
      backgroundColor: 'rgba(25, 131, 65, 0.85)',
      borderRadius: 6,
      borderWidth: 0,
    },
    {
      label: 'Complétés',
      data: (pathwayMetrics.value ?? []).map((pathway) => pathway.completed_count),
      backgroundColor: 'rgba(25, 131, 65, 0.35)',
      borderRadius: 6,
      borderWidth: 0,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true, position: 'bottom' as const, labels: { usePointStyle: true, padding: 20 } },
  },
  scales: {
    y: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: '#f3f4f6' } },
    x: { grid: { display: false } },
  },
}

// ==================== STATUT DES CANDIDATURES ====================
const { data: statusCounts, isPending: isStatusCountsPending, isError: isStatusCountsError } = useApplicationStatusCounts()

const statusLabels: Record<string, string> = {
  submitted: 'Soumises',
  in_review: 'En revue',
  accepted: 'Acceptées',
  waitlisted: 'Liste d’attente',
  rejected: 'Rejetées',
  withdrawn: 'Retirées',
}

const totalApplications = computed(() =>
  Object.values(statusCounts.value ?? {}).reduce((sum: number, count) => sum + (count as number), 0),
)

const statusChartData = computed(() => {
  const counts = statusCounts.value ?? {}
  const entries = (Object.entries(counts) as [string, number][]).filter(([, count]) => count > 0)

  return {
    labels: entries.map(([status]) => statusLabels[status] ?? status),
    datasets: [
      {
        data: entries.map(([, count]) => count),
        // Chart.js n'accepte pas de classes Tailwind ; --color-primary pour
        // "Acceptées", le reste des couleurs de statut justifiées (voir 02).
        backgroundColor: entries.map(([status]) => {
          switch (status) {
            case 'accepted': return '#198341'
            case 'in_review':
            case 'waitlisted': return '#f59e0b'
            case 'rejected': return '#ef4444'
            default: return '#9ca3af'
          }
        }),
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  }
})

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' as const, labels: { usePointStyle: true, padding: 15 } },
  },
  cutout: '75%',
}

// ==================== DERNIÈRES CANDIDATURES ACCEPTÉES ====================
const { data: recentData, isPending: isRecentPending } = useApplications(
  computed(() => ({ status: 'accepted', page: 1 })),
)
const recentAccepted = computed(() => (recentData.value?.items ?? []).slice(0, 5))

function initialsOf(name: string | undefined): string {
  if (!name) return '—'
  return name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('')
}

function formatDate(value: string | null | undefined): string {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('fr-FR')
}
</script>

<style scoped>
/* Optionnel : Personnalisation de la scrollbar */
</style>
