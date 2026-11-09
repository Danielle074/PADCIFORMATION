<template>
  <div class="space-y-6">
    <!-- ================= EN-TÊTE ================= -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Gestion des Candidatures</h1>
        <p class="text-sm text-gray-500 mt-1">
          File d'admission : revue et décision sur les candidatures soumises par les apprenants.
        </p>
      </div>
    </div>

    <!-- ================= BARRE D'OUTILS (Filtres) ================= -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Recherche -->
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
            class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
          />
        </div>

        <!-- Filtre Filière (filières réelles du catalogue) -->
        <select
          v-model="filterPathwayKey"
          class="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-gray-700 bg-white min-w-[200px]"
        >
          <option value="">Toutes les filières</option>
          <option v-for="pathway in pathways" :key="pathway.key" :value="pathway.key">
            {{ pathway.name }}
          </option>
        </select>

        <!-- Filtre Statut -->
        <select
          v-model="filterStatus"
          class="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-gray-700 bg-white min-w-[170px]"
        >
          <option value="">Tous les statuts</option>
          <option v-for="status in statusOptions" :key="status.value" :value="status.value">
            {{ status.label }}
          </option>
        </select>
      </div>
    </div>

    <!-- ================= TABLEAU DES CANDIDATURES ================= -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr
              class="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider"
            >
              <th class="py-4 px-6">Candidat</th>
              <th class="py-4 px-6">Filière</th>
              <th class="py-4 px-6">Session</th>
              <th class="py-4 px-6">Date de dépôt</th>
              <th class="py-4 px-6">Statut</th>
              <th class="py-4 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-sm">
            <tr v-if="isPending">
              <td colspan="6" class="py-10 text-center text-gray-500">
                Chargement des candidatures…
              </td>
            </tr>

            <tr v-else-if="isError">
              <td colspan="6" class="py-10 text-center text-red-600">
                {{ (error as ApiError)?.message ?? 'Impossible de charger les candidatures.' }}
              </td>
            </tr>

            <tr v-else-if="applications.length === 0">
              <td colspan="6" class="py-10 text-center text-gray-500">
                Aucune candidature ne correspond à vos critères.
              </td>
            </tr>

            <tr
              v-for="application in applications"
              :key="application.key"
              class="hover:bg-gray-50 transition"
            >
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0"
                  >
                    {{ initialsOf(application.user?.name) }}
                  </div>
                  <div>
                    <p class="font-bold text-gray-800">{{ application.user?.name ?? '—' }}</p>
                    <p class="text-xs text-gray-500">{{ application.user?.email ?? '—' }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6 text-gray-700 font-medium">
                {{ application.pathway?.name ?? '—' }}
              </td>
              <td class="py-4 px-6 text-gray-500">
                {{ application.cohort?.code ?? '—' }}
              </td>
              <td class="py-4 px-6 text-gray-500">
                {{ formatDate(application.submitted_at) }}
              </td>
              <td class="py-4 px-6">
                <span
                  class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                  :class="statusBadgeClass(application.status)"
                >
                  <span
                    class="w-1.5 h-1.5 rounded-full"
                    :class="statusDotClass(application.status)"
                  ></span>
                  {{ statusLabel(application.status) }}
                </span>
              </td>
              <td class="py-4 px-6 text-center">
                <button
                  @click="openModal(application.key)"
                  class="text-primary hover:bg-primary/10 p-2 rounded-lg transition"
                  title="Voir le dossier"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- PAGINATION (réelle, meta.pagination du backend) -->
      <div
        v-if="pagination"
        class="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <span class="text-sm text-gray-600">
          Affichage de <span class="font-semibold text-gray-800">{{ pagination.from ?? 0 }}</span> à
          <span class="font-semibold text-gray-800">{{ pagination.to ?? 0 }}</span> sur
          <span class="font-semibold text-gray-800">{{ pagination.total ?? 0 }}</span> candidatures
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
    </div>

    <!-- ================= MODALE DE DÉTAIL CANDIDAT ================= -->
    <div
      v-if="selectedKey"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    >
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-modal">
        <!-- En-tête Modale -->
        <div
          class="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg shadow-md"
            >
              {{ initialsOf(detail?.user?.name) }}
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-800">{{ detail?.user?.name ?? '—' }}</h3>
              <p class="text-sm text-gray-500">{{ detail?.user?.email ?? '—' }}</p>
            </div>
          </div>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-red-500 transition p-1 rounded-lg hover:bg-red-50"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Contenu Modale -->
        <div class="p-6 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
          <div v-if="isDetailPending" class="text-sm text-gray-500 text-center py-6">
            Chargement du dossier…
          </div>
          <div v-else-if="isDetailError" class="text-sm text-red-600 text-center py-6">
            {{ (detailError as ApiError)?.message ?? 'Impossible de charger ce dossier.' }}
          </div>

          <template v-else-if="detail">
            <!-- Statut actuel -->
            <div class="flex items-center justify-between">
              <span
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                :class="statusBadgeClass(detail.status)"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full"
                  :class="statusDotClass(detail.status)"
                ></span>
                {{ statusLabel(detail.status) }}
              </span>
              <span class="text-xs text-gray-500"
                >Déposée le {{ formatDate(detail.submitted_at) }}</span
              >
            </div>

            <!-- Filière et session -->
            <div>
              <h4 class="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3">
                Filière &amp; session
              </h4>
              <div class="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl text-sm">
                <div>
                  <span class="text-gray-500">Filière :</span>
                  <span class="font-medium text-gray-800">{{ detail.pathway?.name ?? '—' }}</span>
                </div>
                <div>
                  <span class="text-gray-500">Session :</span>
                  <span class="font-medium text-gray-800">{{ detail.cohort?.code ?? '—' }}</span>
                </div>
                <div v-if="detail.cohort">
                  <span class="text-gray-500">Dates :</span>
                  <span class="font-medium text-gray-800"
                    >{{ formatDate(detail.cohort.starts_at) }} →
                    {{ formatDate(detail.cohort.ends_at) }}</span
                  >
                </div>
              </div>
            </div>

            <!-- Motivation -->
            <div v-if="detail.motivation">
              <h4 class="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3">
                Motivation
              </h4>
              <p class="bg-gray-50 p-4 rounded-xl text-sm text-gray-700 whitespace-pre-wrap">
                {{ detail.motivation }}
              </p>
            </div>

            <!-- Payload libre (équipement, disponibilité...) -->
            <div v-if="detail.payload && Object.keys(detail.payload).length > 0">
              <h4 class="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3">
                Informations complémentaires
              </h4>
              <div class="bg-gray-50 p-4 rounded-xl text-sm space-y-1.5">
                <div
                  v-for="(value, key) in detail.payload"
                  :key="key"
                  class="flex justify-between gap-4"
                >
                  <span class="text-gray-500">{{ key }}</span>
                  <span class="font-medium text-gray-800 text-right">{{
                    formatPayloadValue(value)
                  }}</span>
                </div>
              </div>
            </div>

            <!-- Décision déjà prise -->
            <div v-if="detail.decided_at" class="bg-gray-50 p-4 rounded-xl text-sm space-y-1">
              <p>
                <span class="text-gray-500">Décidée par :</span>
                <span class="font-medium text-gray-800">{{ detail.decided_by?.name ?? '—' }}</span>
                le {{ formatDate(detail.decided_at) }}
              </p>
              <p v-if="detail.reason">
                <span class="text-gray-500">Motif :</span>
                <span class="font-medium text-gray-800">{{ detail.reason }}</span>
              </p>
            </div>

            <!-- Saisie du motif de rejet -->
            <div v-if="pendingDecision === 'rejected'">
              <label class="text-sm font-medium text-gray-700 mb-1 block"
                >Motif du rejet (obligatoire)</label
              >
              <textarea
                v-model="rejectReason"
                rows="3"
                class="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              ></textarea>
              <p v-if="decideError" class="text-xs text-red-600 mt-1">{{ decideError }}</p>
            </div>
          </template>
        </div>

        <!-- Pied de Modale (Actions) -->
        <div
          v-if="detail"
          class="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-wrap justify-end gap-3"
        >
          <button
            v-if="detail.status === 'submitted'"
            @click="startReview"
            :disabled="startReviewMutation.isPending.value"
            class="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition text-sm disabled:opacity-50"
          >
            Démarrer la revue
          </button>

          <template v-if="canDecide">
            <button
              v-if="pendingDecision !== 'rejected'"
              @click="pendingDecision = 'rejected'"
              class="px-5 py-2.5 bg-white border border-red-200 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition text-sm"
            >
              Rejeter
            </button>
            <button
              v-else
              @click="confirmReject"
              :disabled="decideMutation.isPending.value"
              class="px-5 py-2.5 bg-white border border-red-200 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition text-sm disabled:opacity-50"
            >
              Confirmer le rejet
            </button>
            <button
              @click="decide('waitlisted')"
              :disabled="decideMutation.isPending.value"
              class="px-5 py-2.5 bg-white border border-amber-200 text-amber-700 rounded-xl font-semibold hover:bg-amber-50 transition text-sm disabled:opacity-50"
            >
              Liste d'attente
            </button>
            <button
              @click="decide('accepted')"
              :disabled="decideMutation.isPending.value"
              class="px-5 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-shade transition shadow-md shadow-primary/30 text-sm disabled:opacity-50"
            >
              Accepter
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { refDebounced } from '@vueuse/core'
import type { ApiError } from '@/api/http'
import { useCatalogPathways } from '@/features/public/composables/useCatalogPathways'
import {
  useApplication,
  useApplications,
  useDecideApplication,
  useStartApplicationReview,
  type ApplicationListFilters,
} from '../composables/useApplications'

// ==================== FILTRES (server-side) ====================
const searchQuery = ref('')
const searchQueryDebounced = refDebounced(searchQuery, 350)
const filterPathwayKey = ref('')
const filterStatus = ref('')
const page = ref(1)

watch([filterPathwayKey, filterStatus, searchQueryDebounced], () => {
  page.value = 1
})

const filters = computed<ApplicationListFilters>(() => ({
  q: searchQueryDebounced.value || undefined,
  pathwayKey: filterPathwayKey.value || undefined,
  status: filterStatus.value || undefined,
  page: page.value,
}))

const { data, isPending, isError, error } = useApplications(filters)
const applications = computed(() => data.value?.items ?? [])
const pagination = computed(() => data.value?.pagination ?? null)

const { data: pathways } = useCatalogPathways()

const statusOptions = [
  { value: 'submitted', label: 'Soumise' },
  { value: 'in_review', label: 'En revue' },
  { value: 'accepted', label: 'Acceptée' },
  { value: 'waitlisted', label: 'Liste d’attente' },
  { value: 'rejected', label: 'Rejetée' },
  { value: 'withdrawn', label: 'Retirée' },
]

function statusLabel(status: string): string {
  return statusOptions.find((option) => option.value === status)?.label ?? status
}

function statusBadgeClass(status: string): string {
  switch (status) {
    case 'accepted':
      return 'bg-primary/10 text-primary'
    case 'in_review':
    case 'waitlisted':
      return 'bg-amber-100 text-amber-700'
    case 'rejected':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

function statusDotClass(status: string): string {
  switch (status) {
    case 'accepted':
      return 'bg-primary'
    case 'in_review':
    case 'waitlisted':
      return 'bg-amber-500'
    case 'rejected':
      return 'bg-red-500'
    default:
      return 'bg-gray-400'
  }
}

function initialsOf(name: string | undefined): string {
  if (!name) return '—'
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

function formatDate(value: string | null | undefined): string {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('fr-FR')
}

function formatPayloadValue(value: unknown): string {
  if (value === null || value === undefined) return '—'
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

// ==================== MODALE DE DÉTAIL ====================
const selectedKey = ref<string | null>(null)
const pendingDecision = ref<'rejected' | null>(null)
const rejectReason = ref('')
const decideError = ref<string | null>(null)

const {
  data: detail,
  isPending: isDetailPending,
  isError: isDetailError,
  error: detailError,
} = useApplication(computed(() => selectedKey.value))

const canDecide = computed(
  () =>
    detail.value !== undefined &&
    detail.value !== null &&
    ['submitted', 'in_review', 'waitlisted'].includes(detail.value.status),
)

function openModal(key: string) {
  selectedKey.value = key
  pendingDecision.value = null
  rejectReason.value = ''
  decideError.value = null
}

function closeModal() {
  selectedKey.value = null
  pendingDecision.value = null
  rejectReason.value = ''
  decideError.value = null
}

const startReviewMutation = useStartApplicationReview()
function startReview() {
  if (!selectedKey.value) return
  startReviewMutation.mutate(selectedKey.value)
}

const decideMutation = useDecideApplication()

function decide(decision: 'accepted' | 'waitlisted') {
  if (!selectedKey.value) return
  decideError.value = null
  decideMutation.mutate(
    { key: selectedKey.value, decision },
    {
      onError: (mutationError) => {
        decideError.value = (mutationError as ApiError).displayMessage
      },
    },
  )
}

function confirmReject() {
  if (!selectedKey.value) return
  if (!rejectReason.value.trim()) {
    decideError.value = 'Le motif du rejet est obligatoire.'
    return
  }
  decideError.value = null
  decideMutation.mutate(
    { key: selectedKey.value, decision: 'rejected', reason: rejectReason.value.trim() },
    {
      onSuccess: () => {
        pendingDecision.value = null
      },
      onError: (mutationError) => {
        decideError.value = (mutationError as ApiError).displayMessage
      },
    },
  )
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  /* --border : variable shadcn CSS réelle (équivalent de l'ancien #e5e7eb). */
  background: var(--border);
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
.animate-modal {
  animation: modalIn 0.25s ease-out both;
}
</style>
