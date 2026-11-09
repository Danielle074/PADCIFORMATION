<template>
  <div class="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto space-y-8">
      <!-- EN-TÊTE -->
      <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6"
      >
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-primary"
            >Espace Candidat</span
          >
          <h1 class="text-3xl font-extrabold text-gray-900 mt-1">Mes Candidatures</h1>
          <p class="text-sm text-gray-500 mt-1">
            Consultez le statut de vos candidatures aux différentes sessions de formation.
          </p>
        </div>
        <div>
          <router-link
            to="/catalogue"
            class="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition shadow-sm"
          >
            Découvrir d'autres filières &rarr;
          </router-link>
        </div>
      </div>

      <!-- ÉTATS DE CHARGEMENT / ERREUR -->
      <div v-if="isPending" class="text-center py-16 text-gray-500">
        Chargement de vos candidatures…
      </div>
      <div v-else-if="isError" class="text-center py-16 text-red-600">
        {{ (error as ApiError)?.message ?? 'Impossible de charger vos candidatures.' }}
      </div>
      <div
        v-else-if="applications.length === 0"
        class="bg-white rounded-2xl border border-gray-200/80 p-12 text-center space-y-4"
      >
        <div
          class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-800">Aucune candidature déposée</h3>
        <p class="text-sm text-gray-500 max-w-sm mx-auto">
          Vous n'avez pas encore postulé à une formation. Consultez notre catalogue et choisissez
          une session ouverte.
        </p>
        <div class="pt-2">
          <router-link
            to="/catalogue"
            class="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition shadow-sm"
          >
            Consulter le catalogue
          </router-link>
        </div>
      </div>

      <!-- LISTE DES CANDIDATURES -->
      <div v-else class="grid gap-6">
        <div
          v-for="app in applications"
          :key="app.key"
          class="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div class="space-y-3">
            <div class="flex flex-wrap items-center gap-2">
              <span
                class="px-2.5 py-0.5 rounded-full text-xs font-bold"
                :class="statusClass(app.status)"
              >
                {{ statusLabel(app.status) }}
              </span>
              <span class="text-xs text-gray-400 font-mono font-semibold">{{
                app.pathway?.code
              }}</span>
              <span class="text-xs text-gray-400"
                >· Soumise le {{ formatDate(app.submitted_at || app.created_at) }}</span
              >
            </div>

            <div>
              <h3 class="text-xl font-bold text-gray-900">{{ app.pathway?.name }}</h3>
              <p v-if="app.cohort" class="text-sm text-gray-600 mt-1">
                Session sélectionnée : <strong class="text-gray-800">{{ app.cohort.name }}</strong>
                <span class="text-gray-500 text-xs">
                  (du {{ app.cohort.starts_at }} au {{ app.cohort.ends_at }})</span
                >
              </p>
            </div>

            <div v-if="app.payload?.equipment" class="text-xs text-gray-500 space-y-0.5">
              <p class="font-medium text-gray-700">Équipement déclaré :</p>
              <p>
                {{
                  app.payload.equipment.has_computer
                    ? "Dispose d'un ordinateur personnel"
                    : 'Sans ordinateur personnel'
                }}
                <template v-if="app.payload.equipment.has_computer">
                  · {{ app.payload.equipment.cpu || 'CPU standard' }} ·
                  {{ app.payload.equipment.ram_gb || 8 }} Go RAM
                </template>
              </p>
            </div>

            <p
              v-if="app.status === 'rejected' && app.reason"
              class="text-xs text-red-600 font-medium"
            >
              Motif : {{ app.reason }}
            </p>
          </div>

          <div class="flex flex-col sm:flex-row items-center gap-3">
            <button
              v-if="app.status === 'submitted' || app.status === 'under_review'"
              @click="withdraw(app)"
              :disabled="withdrawMutation.isPending.value"
              class="w-full sm:w-auto px-4 py-2 border border-red-200 text-red-600 rounded-xl text-xs font-semibold hover:bg-red-50 transition disabled:opacity-50"
            >
              Retirer ma candidature
            </button>
            <router-link
              v-if="app.status === 'accepted'"
              to="/formations/dashboard"
              class="w-full sm:w-auto px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition shadow-sm text-center"
            >
              Accéder à mes cours &rarr;
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ApiError } from '@/api/http'
import {
  useLearnerApplications,
  useWithdrawApplication,
  type LearnerApplication,
} from '../composables/useLearnerApplications'

const { data, isPending, isError, error } = useLearnerApplications()
const applications = computed(() => data.value?.items ?? [])

const statusMap: Record<string, { label: string; class: string }> = {
  submitted: { label: 'Soumise — en attente d’examen', class: 'bg-blue-100 text-blue-700' },
  under_review: { label: 'En cours d’examen', class: 'bg-amber-100 text-amber-700' },
  accepted: { label: 'Candidature acceptée 🎉', class: 'bg-green-100 text-green-700' },
  waitlisted: { label: 'Sur liste d’attente', class: 'bg-purple-100 text-purple-700' },
  rejected: { label: 'Non retenue', class: 'bg-red-100 text-red-700' },
  withdrawn: { label: 'Candidature retirée', class: 'bg-gray-100 text-gray-600' },
}

function statusLabel(status: string): string {
  return statusMap[status]?.label ?? status
}

function statusClass(status: string): string {
  return statusMap[status]?.class ?? 'bg-gray-100 text-gray-700'
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const withdrawMutation = useWithdrawApplication()
function withdraw(app: LearnerApplication) {
  if (confirm(`Confirmez-vous le retrait de votre candidature pour ${app.pathway?.name} ?`)) {
    withdrawMutation.mutate(app.key)
  }
}
</script>
