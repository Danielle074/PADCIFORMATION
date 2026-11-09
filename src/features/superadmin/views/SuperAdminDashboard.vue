<template>
  <div class="space-y-6">
    <!-- EN-TÊTE -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Vue Globale PADCI</h1>
        <p class="text-sm text-gray-500 mt-1">
          Pilotage du programme : apprentissage et gouvernance financière.
        </p>
      </div>
      <div
        class="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100"
      >
        <div class="w-2 h-2 rounded-full bg-orange-300 animate-pulse"></div>
        <span class="text-sm font-medium text-gray-600"
          >Financement : Banque Mondiale (ADR-011)</span
        >
      </div>
    </div>

    <!-- BANDEAU BUDGET (réel, agrégé depuis les lignes budgétaires) -->
    <div
      v-if="budgetTotals.length > 0"
      class="bg-gradient-to-r from-orange-400 to-orange-400 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden"
    >
      <div
        class="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"
      ></div>
      <div
        v-for="total in budgetTotals"
        :key="total.currency"
        class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <p class="text-white/80 text-sm font-medium">Budget alloué ({{ total.currency }})</p>
          <h2 class="text-4xl font-bold mt-1">
            {{ formatAmount(total.allocated, total.currency) }}
          </h2>
        </div>
        <div class="w-full md:w-64">
          <div class="flex justify-between text-sm mb-1">
            <span class="text-white/80">Consommation</span>
            <span class="font-bold">{{ total.consumedPercent }}%</span>
          </div>
          <div class="w-full bg-black/20 rounded-full h-3">
            <div
              class="bg-white h-3 rounded-full"
              :style="{ width: total.consumedPercent + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- STATISTIQUES CLÉS -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-gray-500 text-sm font-medium">Apprenants</p>
            <p class="text-3xl font-bold text-orange-600 mt-1">
              {{ overview?.learners_total ?? '—' }}
            </p>
          </div>
          <div class="bg-orange-50 p-3 rounded-xl">
            <svg
              class="w-6 h-6 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-gray-500 text-sm font-medium">Taux de complétion</p>
            <p class="text-3xl font-bold text-orange-600 mt-1">
              {{ overview ? Math.round(overview.completion_rate * 100) : '—' }}%
            </p>
          </div>
          <div class="bg-orange-50 p-3 rounded-xl">
            <svg
              class="w-6 h-6 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-gray-500 text-sm font-medium">Certificats délivrés</p>
            <p class="text-3xl font-bold text-orange-600 mt-1">
              {{ overview?.certificates_issued_total ?? '—' }}
            </p>
          </div>
          <div class="bg-orange-50 p-3 rounded-xl">
            <svg
              class="w-6 h-6 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-gray-500 text-sm font-medium">ANO en attente</p>
            <p class="text-3xl font-bold text-orange-600 mt-1">{{ pendingAnoCount }}</p>
            <p class="text-xs text-gray-500 mt-2 font-medium">Signature requise</p>
          </div>
          <div class="bg-orange-50 p-3 rounded-xl">
            <svg
              class="w-6 h-6 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- GRAPHIQUE : lignes budgétaires réelles -->
    <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 class="text-lg font-bold text-gray-800 mb-4">
        Allocation et consommation par ligne budgétaire
      </h3>
      <div
        v-if="isBudgetPending"
        class="h-64 flex items-center justify-center text-sm text-gray-500"
      >
        Chargement…
      </div>
      <div
        v-else-if="budgetLines.length === 0"
        class="h-64 flex items-center justify-center text-sm text-gray-500"
      >
        Aucune ligne budgétaire créée pour l'instant.
      </div>
      <div v-else class="h-64"><Bar :data="budgetChartData" :options="chartOptions" /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { useDashboardOverview } from '@/features/admin/composables/useDashboard'
import { useAnoRequests } from '../composables/useAnoRequests'
import { useBudgetLines } from '../composables/useBudgetLines'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// ==================== KPIs (module Operations, partagé avec AdminDashboard) ====================
const { data: overview } = useDashboardOverview()

// ==================== ANO EN ATTENTE ====================
const anoFilters = computed(() => ({ status: 'pending' }))
const { data: anoData } = useAnoRequests(anoFilters)
const pendingAnoCount = computed(
  () => anoData.value?.pagination?.total ?? anoData.value?.items.length ?? 0,
)

// ==================== BUDGET (réel) ====================
const budgetFilters = computed(() => ({}))
const { data: budgetData, isPending: isBudgetPending } = useBudgetLines(budgetFilters)
const budgetLines = computed(() => budgetData.value?.items ?? [])

const budgetTotals = computed(() => {
  const byCurrency = new Map<string, { allocated: number; consumed: number }>()
  for (const line of budgetLines.value) {
    const entry = byCurrency.get(line.currency) ?? { allocated: 0, consumed: 0 }
    entry.allocated += line.allocated_amount_minor
    entry.consumed += line.consumed_amount_minor
    byCurrency.set(line.currency, entry)
  }
  return Array.from(byCurrency.entries()).map(([currency, totals]) => ({
    currency,
    allocated: totals.allocated,
    consumed: totals.consumed,
    consumedPercent:
      totals.allocated === 0 ? 0 : Math.round((totals.consumed / totals.allocated) * 100),
  }))
})

function formatAmount(amountMinor: number, currency: string): string {
  try {
    return (amountMinor / 100).toLocaleString('fr-FR', { style: 'currency', currency })
  } catch {
    return `${(amountMinor / 100).toLocaleString('fr-FR')} ${currency}`
  }
}

// Couleurs de séries Chart.js : les options de config n'acceptent pas de
// classes Tailwind — valeurs littérales calées sur la famille --color-primary.
const budgetChartData = computed(() => ({
  labels: budgetLines.value.map((line) => line.name),
  datasets: [
    {
      label: 'Alloué',
      data: budgetLines.value.map((line) => line.allocated_amount_minor / 100),
      backgroundColor: 'rgba(249, 115, 22, 0.85)',
      borderRadius: 6,
      borderWidth: 0,
    },
    {
      label: 'Consommé',
      data: budgetLines.value.map((line) => line.consumed_amount_minor / 100),
      backgroundColor: 'rgba(249, 115, 22, 0.35)',
      borderRadius: 6,
      borderWidth: 0,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom' as const, labels: { usePointStyle: true } } },
  scales: {
    y: { beginAtZero: true, grid: { color: '#f3f4f6' } },
    x: { grid: { display: false } },
  },
}
</script>
