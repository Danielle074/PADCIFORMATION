<template>
  <div class="space-y-6">
    <!-- EN-TÊTE -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Validation des ANO</h1>
        <p class="text-sm text-gray-500 mt-1">Avis de Non-Objection (UCP / Banque Mondiale)</p>
      </div>
      <div class="flex items-center gap-2 text-sm text-gray-500">
        <span class="font-medium text-gray-700">{{ pendingCount }}</span> dossier(s) en attente de
        signature
      </div>
    </div>

    <p
      v-if="!canSign"
      class="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3"
    >
      Seul un super administrateur peut signer ou rejeter une ANO. Vous pouvez consulter la liste.
    </p>

    <div v-if="isPending" class="text-center text-gray-500 py-10">Chargement des ANO…</div>
    <div v-else-if="isError" class="text-center text-red-600 py-10">
      {{ (error as ApiError)?.message ?? 'Impossible de charger les ANO.' }}
    </div>
    <div v-else-if="anos.length === 0" class="text-center text-gray-500 py-10">
      Aucune ANO pour l'instant.
    </div>

    <!-- LISTE DES ANO -->
    <div v-else class="grid gap-4">
      <div
        v-for="ano in anos"
        :key="ano.key"
        class="bg-white rounded-xl shadow-sm p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300"
        :class="cardBorderClass(ano)"
      >
        <div>
          <span class="text-xs font-bold uppercase tracking-wide" :class="badgeClass(ano)">
            {{ badgeText(ano) }}
          </span>

          <h3 class="text-lg font-bold text-gray-800 mt-1">{{ ano.title }}</h3>
          <p class="text-sm text-gray-500 mt-1">
            Soumis par {{ ano.submitter?.name ?? '—' }} le {{ formatDate(ano.submitted_at) }}
            <span v-if="ano.pathway">· Filière : {{ ano.pathway.name }}</span>
          </p>
          <p
            v-if="ano.status === 'rejected' && ano.rejection_reason"
            class="text-sm text-red-600 mt-1"
          >
            Rejetée : {{ ano.rejection_reason }}
          </p>
        </div>

        <div class="flex flex-wrap gap-3">
          <template v-if="ano.status === 'pending'">
            <button
              v-if="rejectingKey !== ano.key"
              @click="startReject(ano)"
              :disabled="!canSign || isMutating(ano.key)"
              class="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition disabled:opacity-50"
            >
              Rejeter
            </button>
            <button
              @click="ouvrirConfirmation(ano)"
              :disabled="!canSign || isMutating(ano.key)"
              class="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition shadow-sm shadow-orange-500/30 disabled:opacity-50"
            >
              Signer l'ANO
            </button>
          </template>
          <span v-else class="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg text-sm font-medium">
            {{ ano.status === 'signed' ? 'Déjà validé' : 'Rejetée' }}
          </span>
        </div>

        <!-- Saisie du motif de rejet -->
        <div v-if="rejectingKey === ano.key" class="w-full md:basis-full">
          <textarea
            v-model="rejectReason"
            rows="2"
            placeholder="Motif du rejet"
            class="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
          ></textarea>
          <div class="flex gap-2 mt-2">
            <button
              @click="rejectingKey = null"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
            >
              Annuler
            </button>
            <button
              @click="confirmReject(ano)"
              :disabled="rejectMutation.isPending.value"
              class="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition disabled:opacity-50"
            >
              Confirmer le rejet
            </button>
          </div>
        </div>
      </div>
    </div>

    <p
      v-if="actionError"
      class="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
    >
      {{ actionError }}
    </p>

    <!-- ================= MODALE DE CONFIRMATION DE SIGNATURE ================= -->
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-800 mb-2">Confirmer la signature</h3>
          <p class="text-sm text-gray-500 mb-6">
            Vous êtes sur le point de signer l'ANO pour :<br />
            <strong class="text-gray-800">{{ selectedAno?.title }}</strong>
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
              @click="confirmerSignature"
              :disabled="signMutation.isPending.value"
              class="flex-1 px-4 py-2.5 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition shadow-md shadow-orange-500/30 disabled:opacity-50"
            >
              Confirmer
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
import { useAuthStore } from '@/stores/auth'
import {
  useAnoRequests,
  useRejectAno,
  useSignAno,
  type AnoRequest,
} from '../composables/useAnoRequests'

const auth = useAuthStore()
const canSign = computed(() => auth.hasRole('super_admin'))

const filters = computed(() => ({}))
const { data, isPending, isError, error } = useAnoRequests(filters)
const anos = computed(() => data.value?.items ?? [])
const pendingCount = computed(() => anos.value.filter((ano) => ano.status === 'pending').length)

function formatDate(value: string | null): string {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('fr-FR')
}

function badgeText(ano: AnoRequest): string {
  if (ano.status === 'signed') return `Signé le ${formatDate(ano.signed_at)}`
  if (ano.status === 'rejected') return 'Rejetée'
  return ano.priority === 'haute' ? 'Priorité haute' : 'En attente'
}

function badgeClass(ano: AnoRequest): string {
  if (ano.status === 'signed') return 'text-green-600'
  if (ano.status === 'rejected') return 'text-red-600'
  return ano.priority === 'haute' ? 'text-orange-600' : 'text-gray-500'
}

function cardBorderClass(ano: AnoRequest): string {
  if (ano.status === 'pending' && ano.priority === 'haute') return 'border-l-4 border-orange-500'
  if (ano.status === 'signed') return 'border border-gray-100 opacity-75'
  if (ano.status === 'rejected') return 'border-l-4 border-red-300'
  return 'border-l-4 border-gray-300'
}

const showConfirmModal = ref(false)
const selectedAno = ref<AnoRequest | null>(null)
const actionError = ref<string | null>(null)
const mutatingKey = ref<string | null>(null)

function isMutating(key: string): boolean {
  return mutatingKey.value === key
}

function ouvrirConfirmation(ano: AnoRequest) {
  selectedAno.value = ano
  actionError.value = null
  showConfirmModal.value = true
}

const signMutation = useSignAno()
function confirmerSignature() {
  if (!selectedAno.value) return
  actionError.value = null
  mutatingKey.value = selectedAno.value.key
  signMutation.mutate(selectedAno.value.key, {
    onSuccess: () => {
      showConfirmModal.value = false
      selectedAno.value = null
    },
    onError: (mutationError) => {
      actionError.value = (mutationError as ApiError).displayMessage
    },
    onSettled: () => {
      mutatingKey.value = null
    },
  })
}

const rejectingKey = ref<string | null>(null)
const rejectReason = ref('')
function startReject(ano: AnoRequest) {
  rejectingKey.value = ano.key
  rejectReason.value = ''
}
const rejectMutation = useRejectAno()
function confirmReject(ano: AnoRequest) {
  if (!rejectReason.value.trim()) {
    actionError.value = 'Le motif du rejet est obligatoire.'
    return
  }
  actionError.value = null
  mutatingKey.value = ano.key
  rejectMutation.mutate(
    { key: ano.key, reason: rejectReason.value.trim() },
    {
      onSuccess: () => {
        rejectingKey.value = null
      },
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
