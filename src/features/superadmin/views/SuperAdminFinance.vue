<template>
  <div class="space-y-6">
    <!-- EN-TÊTE -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Budget &amp; Décaissements</h1>
        <p class="text-sm text-gray-500 mt-1">Gouvernance financière du programme (ADR-011).</p>
      </div>
    </div>

    <!-- CARTES DE BUDGET -->
    <div v-if="isBudgetPending || isDisbursementsPending" class="text-center text-gray-500 py-6">
      Chargement…
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="total in budgetTotals"
        :key="total.currency"
        class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 relative overflow-hidden"
      >
        <div
          class="absolute top-0 right-0 w-20 h-20 bg-orange-50 rounded-bl-full -mr-4 -mt-4"
        ></div>
        <p class="text-gray-500 text-sm font-medium relative z-10">
          Budget alloué ({{ total.currency }})
        </p>
        <p class="text-2xl font-bold text-gray-800 mt-1 relative z-10">
          {{ formatAmount(total.allocated, total.currency) }}
        </p>
        <div class="w-full bg-gray-100 rounded-full h-2 mt-4 relative z-10">
          <div
            class="bg-orange-500 h-2 rounded-full"
            :style="{ width: total.consumedPercent + '%' }"
          ></div>
        </div>
        <p class="text-xs text-gray-500 mt-2 relative z-10">
          Consommé : {{ formatAmount(total.consumed, total.currency) }} ({{
            total.consumedPercent
          }}%)
        </p>
      </div>

      <div
        v-if="budgetTotals.length === 0"
        class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 text-sm text-gray-500 md:col-span-2"
      >
        Aucune ligne budgétaire créée pour l'instant.
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <p class="text-gray-500 text-sm font-medium">Décaissements en attente</p>
        <div class="flex items-end gap-2 mt-1">
          <p class="text-2xl font-bold text-gray-800">{{ pendingDisbursementsCount }}</p>
          <p class="text-sm font-normal text-gray-500 mb-1">en attente d'ANO signée</p>
        </div>
      </div>
    </div>

    <!-- TABLEAU DES DÉCAISSEMENTS -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 class="text-lg font-bold text-gray-800">Demandes de décaissement</h3>
        <span class="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
          >{{ disbursements.length }} au total</span
        >
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <th class="py-3 px-6">Date</th>
              <th class="py-3 px-6">Bénéficiaire</th>
              <th class="py-3 px-6">Objet</th>
              <th class="py-3 px-6">Montant</th>
              <th class="py-3 px-6">ANO liée</th>
              <th class="py-3 px-6">Statut</th>
              <th class="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-sm">
            <tr v-if="isDisbursementsError">
              <td colspan="7" class="py-8 text-center text-red-600">
                {{
                  (disbursementsError as ApiError)?.message ??
                  'Impossible de charger les décaissements.'
                }}
              </td>
            </tr>
            <tr v-else-if="disbursements.length === 0">
              <td colspan="7" class="py-8 text-center text-gray-500">
                Aucune demande de décaissement.
              </td>
            </tr>
            <tr
              v-for="disbursement in disbursements"
              :key="disbursement.key"
              class="hover:bg-gray-50 transition"
            >
              <td class="py-4 px-6 text-gray-600">{{ formatDate(disbursement.requested_at) }}</td>
              <td class="py-4 px-6 font-medium text-gray-800">{{ disbursement.beneficiary }}</td>
              <td class="py-4 px-6 text-gray-600">{{ disbursement.purpose }}</td>
              <td class="py-4 px-6 font-bold text-gray-800">
                {{ formatAmount(disbursement.amount_minor, disbursement.currency) }}
              </td>
              <td class="py-4 px-6 text-gray-600">
                <span
                  v-if="disbursement.ano_request"
                  :class="
                    disbursement.ano_request.status === 'signed' ? 'text-primary' : 'text-amber-600'
                  "
                >
                  {{ disbursement.ano_request.status === 'signed' ? 'Signée' : 'Non signée' }}
                </span>
                <span v-else class="text-gray-400">Aucune</span>
              </td>
              <td class="py-4 px-6">
                <span
                  class="px-2.5 py-1 rounded-full text-xs font-semibold"
                  :class="statusClass(disbursement.status)"
                >
                  {{ statusLabel(disbursement.status) }}
                </span>
              </td>
              <td class="py-4 px-6 text-center">
                <button
                  v-if="disbursement.status === 'pending_ano'"
                  @click="ouvrirValidation(disbursement)"
                  :disabled="isMutating(disbursement.key)"
                  class="text-orange-600 hover:bg-orange-50 p-2 rounded-lg font-medium text-xs transition disabled:opacity-50"
                >
                  Valider
                </button>
                <span v-else class="text-gray-400 text-xs">—</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ================= MODALE DE CONFIRMATION ================= -->
    <div
      v-if="showConfirmModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    >
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-modal">
        <div class="p-6 text-center">
          <div
            class="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4"
          >
            <svg
              class="w-8 h-8 text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-800 mb-2">Confirmer le décaissement</h3>
          <p class="text-sm text-gray-500 mb-1">
            Vous êtes sur le point de valider le paiement de :
          </p>
          <p class="text-base font-bold text-gray-800 mb-6">
            {{
              selectedDisbursement
                ? formatAmount(selectedDisbursement.amount_minor, selectedDisbursement.currency)
                : ''
            }}
            - {{ selectedDisbursement?.beneficiary }}
          </p>
          <p
            v-if="actionError"
            class="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4 text-left"
          >
            {{ actionError }}
          </p>

          <div class="flex gap-3">
            <button
              @click="showConfirmModal = false"
              class="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition"
            >
              Annuler
            </button>
            <button
              @click="confirmerValidation"
              :disabled="markPaidMutation.isPending.value"
              class="flex-1 px-4 py-2.5 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition shadow-md shadow-orange-500/30 disabled:opacity-50"
            >
              Valider le paiement
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ApiError } from '@/api/http'
import { useBudgetLines } from '../composables/useBudgetLines'
import {
  useDisbursements,
  useMarkDisbursementPaid,
  type Disbursement,
} from '../composables/useDisbursements'

// ==================== BUDGET (agrégé depuis les lignes réelles) ====================
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

function formatDate(value: string | null): string {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('fr-FR')
}

// ==================== DÉCAISSEMENTS ====================
const disbursementFilters = computed(() => ({}))
const {
  data: disbursementsData,
  isPending: isDisbursementsPending,
  isError: isDisbursementsError,
  error: disbursementsError,
} = useDisbursements(disbursementFilters)
const disbursements = computed(() => disbursementsData.value?.items ?? [])
const pendingDisbursementsCount = computed(
  () => disbursements.value.filter((d) => d.status === 'pending_ano').length,
)

const statusLabels: Record<string, string> = {
  pending_ano: 'En attente ANO',
  paid: 'Payé',
  rejected: 'Rejeté',
}
function statusLabel(status: string): string {
  return statusLabels[status] ?? status
}
function statusClass(status: string): string {
  switch (status) {
    case 'pending_ano':
      return 'bg-amber-100 text-amber-700'
    case 'paid':
      return 'bg-green-100 text-green-700'
    case 'rejected':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

const showConfirmModal = ref(false)
const selectedDisbursement = ref<Disbursement | null>(null)
const actionError = ref<string | null>(null)
const mutatingKey = ref<string | null>(null)

function isMutating(key: string): boolean {
  return mutatingKey.value === key
}

function ouvrirValidation(disbursement: Disbursement) {
  selectedDisbursement.value = disbursement
  actionError.value = null
  showConfirmModal.value = true
}

const markPaidMutation = useMarkDisbursementPaid()
function confirmerValidation() {
  if (!selectedDisbursement.value) return
  actionError.value = null
  mutatingKey.value = selectedDisbursement.value.key
  markPaidMutation.mutate(selectedDisbursement.value.key, {
    onSuccess: () => {
      showConfirmModal.value = false
      selectedDisbursement.value = null
    },
    // Server-enforced: fails with 422 if the linked ANO isn't signed yet.
    // Shown as-is, never swallowed or worked around client-side.
    onError: (mutationError) => {
      actionError.value = (mutationError as ApiError).displayMessage
    },
    onSettled: () => {
      mutatingKey.value = null
    },
  })
}
</script>

<style scoped>
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
