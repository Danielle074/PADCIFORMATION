<template>
  <div class="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto space-y-8">
      <!-- RETOUR -->
      <div>
        <router-link
          to="/catalogue"
          class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition font-medium"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Retour au catalogue
        </router-link>
      </div>

      <!-- ÉTATS CHARGEMENT / ERREUR -->
      <div v-if="isPathwayPending" class="text-center py-16 text-gray-500">
        Chargement de la filière…
      </div>
      <div v-else-if="isPathwayError" class="text-center py-16 text-red-600">
        {{ (pathwayError as ApiError)?.message ?? 'Filière introuvable.' }}
      </div>

      <template v-else-if="pathway">
        <!-- BANDEAU DE LA FILIÈRE -->
        <div class="bg-white rounded-2xl border border-gray-200/80 p-8 shadow-sm space-y-4">
          <div class="flex flex-wrap items-center gap-3">
            <span
              class="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wide"
            >
              {{ pathway.code }}
            </span>
            <span v-if="pathway.programme" class="text-xs text-gray-500 font-medium">
              Programme : {{ pathway.programme.name }}
            </span>
          </div>

          <h1 class="text-3xl font-extrabold text-gray-900">{{ pathway.name }}</h1>
          <p class="text-gray-600 text-base leading-relaxed max-w-3xl">
            {{
              pathway.description ||
              'Formation professionnelle intensive préparant aux métiers de spécialité.'
            }}
          </p>

          <!-- BLOC PRÉREQUIS MATÉRIEL (issu de pathway.equipment_requirements - ADR-012) -->
          <div
            v-if="pathway.equipment_requirements"
            class="mt-6 bg-amber-50/60 border border-amber-200/80 rounded-xl p-5 text-sm space-y-2 text-amber-900"
          >
            <h3 class="font-bold flex items-center gap-2 text-amber-800">
              <svg
                class="w-5 h-5 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Configuration minimale requise (ADR-012)
            </h3>
            <p class="text-xs sm:text-sm text-amber-900/90">
              Chaque candidat doit disposer d'un équipement adapté pour suivre les travaux pratiques
              et évaluations :
            </p>
            <ul
              class="list-disc list-inside text-xs sm:text-sm space-y-1 font-medium text-amber-950"
            >
              <li v-if="pathway.equipment_requirements.min_cpu">
                Processeur minimal : {{ pathway.equipment_requirements.min_cpu }}
              </li>
              <li v-if="pathway.equipment_requirements.min_ram_gb">
                Mémoire vive : au moins {{ pathway.equipment_requirements.min_ram_gb }} Go de RAM
              </li>
              <li v-if="pathway.equipment_requirements.min_storage_gb">
                Espace de stockage : au moins {{ pathway.equipment_requirements.min_storage_gb }} Go
              </li>
            </ul>
            <p
              v-if="pathway.equipment_requirements.notes"
              class="text-xs italic text-amber-800/80 pt-1"
            >
              Note : {{ pathway.equipment_requirements.notes }}
            </p>
          </div>
        </div>

        <!-- SESSIONS DISPONIBLES (ADR-012) -->
        <div class="bg-white rounded-2xl border border-gray-200/80 p-8 shadow-sm space-y-6">
          <div class="border-b border-gray-100 pb-4">
            <h2 class="text-2xl font-bold text-gray-900">
              Sessions &amp; Calendrier de candidature
            </h2>
            <p class="text-sm text-gray-500 mt-1">
              Sélectionnez une session ouverte pour déposer votre dossier de candidature.
            </p>
          </div>

          <div v-if="isCohortsPending" class="text-center py-6 text-gray-500">
            Chargement des sessions…
          </div>
          <div v-else-if="cohorts.length === 0" class="text-center py-6 text-gray-500">
            Aucune session planifiée pour cette filière pour le moment.
          </div>

          <div v-else class="grid gap-4">
            <div
              v-for="cohort in cohorts"
              :key="cohort.key"
              class="border rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition"
              :class="
                cohort.available
                  ? 'border-primary/40 bg-primary/[0.02] shadow-sm'
                  : 'border-gray-200 bg-gray-50/50 opacity-80'
              "
            >
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span
                    class="px-2.5 py-0.5 rounded-full text-xs font-bold"
                    :class="
                      cohort.available ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                    "
                  >
                    {{
                      cohort.available
                        ? 'Disponible pour candidature'
                        : 'Indisponible — ouverture à venir'
                    }}
                  </span>
                  <span class="text-xs font-mono text-gray-400 font-semibold">{{
                    cohort.code
                  }}</span>
                </div>
                <h3 class="text-lg font-bold text-gray-900">{{ cohort.name }}</h3>
                <p class="text-xs text-gray-500">
                  Période de formation : du
                  <span class="font-medium text-gray-700">{{ formatDate(cohort.starts_at) }}</span>
                  au
                  <span class="font-medium text-gray-700">{{ formatDate(cohort.ends_at) }}</span>
                </p>
              </div>

              <div>
                <button
                  v-if="cohort.available"
                  @click="goToCandidature(cohort)"
                  class="w-full md:w-auto px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition shadow-sm shadow-primary/20"
                >
                  Candidater à cette session &rarr;
                </button>
                <span
                  v-else
                  class="inline-block px-4 py-2 bg-gray-200 text-gray-500 rounded-xl text-xs font-medium cursor-not-allowed"
                >
                  Inscriptions non ouvertes
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- FORMATIONS COMPOSANT LA FILIÈRE -->
        <div class="bg-white rounded-2xl border border-gray-200/80 p-8 shadow-sm space-y-4">
          <h2 class="text-xl font-bold text-gray-900">Cours au programme</h2>
          <div v-if="isCoursesPending" class="text-center py-6 text-gray-500">
            Chargement des cours…
          </div>
          <div v-else-if="courses.length === 0" class="text-sm text-gray-500 py-4">
            Les cours de cette filière sont en cours de finalisation pédagogique.
          </div>
          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="course in courses"
              :key="course.key"
              class="border border-gray-100 rounded-xl p-4 bg-gray-50/50 space-y-1"
            >
              <span class="text-xs text-primary font-bold uppercase">{{ course.level }}</span>
              <h4 class="font-bold text-gray-800">{{ course.title }}</h4>
              <p class="text-xs text-gray-500 line-clamp-2">
                {{ course.summary || 'Module d’apprentissage théorique et pratique.' }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { ApiError } from '@/api/http'
import { useAuthStore } from '@/stores/auth'
import {
  usePathway,
  usePathwayCohorts,
  usePathwayCourses,
  type PublicCohort,
} from '../composables/useCatalog'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const pathwayKey = computed(() => String(route.params.key ?? ''))

const {
  data: pathway,
  isPending: isPathwayPending,
  isError: isPathwayError,
  error: pathwayError,
} = usePathway(pathwayKey)
const { data: cohortsData, isPending: isCohortsPending } = usePathwayCohorts(pathwayKey)
const cohorts = computed(() => cohortsData.value ?? [])

const { data: coursesData, isPending: isCoursesPending } = usePathwayCourses(pathwayKey)
const courses = computed(() => coursesData.value?.items ?? [])

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function goToCandidature(cohort: PublicCohort) {
  const target = `/candidature?pathway=${pathwayKey.value}&cohort=${cohort.key}`
  if (!auth.token) {
    // Visitor must log in or register before applying
    router.push(`/connexion?redirect=${encodeURIComponent(target)}`)
  } else {
    router.push(target)
  }
}
</script>
