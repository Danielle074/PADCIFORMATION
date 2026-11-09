<template>
  <div class="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto space-y-8">
      <!-- RETOUR -->
      <div>
        <router-link
          :to="pathwayKey ? `/catalogue/${pathwayKey}` : '/catalogue'"
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
          Retour au détail de la formation
        </router-link>
      </div>

      <!-- SUCCÈS -->
      <div
        v-if="isSuccess"
        class="bg-white rounded-2xl border border-green-200 p-8 shadow-sm text-center space-y-4 animate-modal"
      >
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900">Candidature enregistrée !</h2>
        <p class="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
          Votre dossier pour la session
          <strong class="text-gray-800">{{ selectedCohort?.name }}</strong> a été transmis à
          l'équipe pédagogique. Vous pouvez suivre son statut en temps réel.
        </p>
        <div class="pt-4 flex flex-col sm:flex-row justify-center gap-3">
          <router-link
            to="/mes-candidatures"
            class="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition shadow-sm"
          >
            Voir mes candidatures
          </router-link>
          <router-link
            to="/catalogue"
            class="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition"
          >
            Retour au catalogue
          </router-link>
        </div>
      </div>

      <!-- FORMULAIRE DE CANDIDATURE (3 ÉTAPES) -->
      <div v-else class="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
        <!-- INDICATEUR D'ÉTAPES -->
        <div
          class="bg-gray-50 border-b border-gray-200/80 px-6 py-4 flex items-center justify-between"
        >
          <div class="flex items-center gap-2">
            <span
              class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
              :class="currentStep === 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'"
            >
              1
            </span>
            <span
              class="text-xs sm:text-sm font-medium"
              :class="currentStep === 1 ? 'text-primary font-bold' : 'text-gray-500'"
            >
              Session &amp; Motivation
            </span>
          </div>
          <div class="w-8 h-px bg-gray-300"></div>
          <div class="flex items-center gap-2">
            <span
              class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
              :class="currentStep === 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'"
            >
              2
            </span>
            <span
              class="text-xs sm:text-sm font-medium"
              :class="currentStep === 2 ? 'text-primary font-bold' : 'text-gray-500'"
            >
              Équipement
            </span>
          </div>
          <div class="w-8 h-px bg-gray-300"></div>
          <div class="flex items-center gap-2">
            <span
              class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
              :class="currentStep === 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'"
            >
              3
            </span>
            <span
              class="text-xs sm:text-sm font-medium"
              :class="currentStep === 3 ? 'text-primary font-bold' : 'text-gray-500'"
            >
              Confirmation
            </span>
          </div>
        </div>

        <div class="p-6 sm:p-8 space-y-6">
          <!-- ÉTAPE 1 : SESSION ET MOTIVATION -->
          <div v-if="currentStep === 1" class="space-y-6">
            <div>
              <h2 class="text-xl font-bold text-gray-900">Votre session de formation</h2>
              <p class="text-xs sm:text-sm text-gray-500 mt-1">
                Vérifiez la session choisie et exprimez brièvement vos motivations.
              </p>
            </div>

            <div class="bg-primary/[0.03] border border-primary/20 rounded-xl p-4 space-y-2">
              <span class="text-xs font-bold uppercase text-primary tracking-wide">{{
                pathway?.code
              }}</span>
              <h3 class="text-base font-bold text-gray-800">{{ pathway?.name }}</h3>
              <p v-if="selectedCohort" class="text-xs text-gray-600">
                Session : <strong class="text-gray-800">{{ selectedCohort.name }}</strong> (du
                {{ selectedCohort.starts_at }} au {{ selectedCohort.ends_at }})
              </p>
              <p v-else class="text-xs text-amber-700">Aucune session valide n'a été spécifiée.</p>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">
                Lettre ou texte de motivation
                <span class="text-gray-400 font-normal">(optionnel)</span>
              </label>
              <textarea
                v-model="motivation"
                rows="5"
                placeholder="Expliquez votre parcours, vos objectifs professionnels et pourquoi vous souhaitez suivre cette formation..."
                class="w-full border border-gray-200 rounded-xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              ></textarea>
            </div>

            <div class="flex justify-end pt-4">
              <button
                @click="nextToStep2"
                :disabled="!selectedCohort"
                class="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition shadow-sm disabled:opacity-50"
              >
                Continuer vers l'équipement &rarr;
              </button>
            </div>
          </div>

          <!-- ÉTAPE 2 : ÉQUIPEMENT INFORMATIQUE -->
          <div v-if="currentStep === 2" class="space-y-6">
            <div>
              <h2 class="text-xl font-bold text-gray-900">Équipement informatique requis</h2>
              <p class="text-xs sm:text-sm text-gray-500 mt-1">
                Les travaux pratiques exigent un matériel compatible avec les outils du programme.
              </p>
            </div>

            <!-- RAPPEL PRÉREQUIS FILIÈRE -->
            <div
              v-if="pathway?.equipment_requirements"
              class="bg-gray-50 rounded-xl p-4 text-xs text-gray-600 border border-gray-200/80 space-y-1"
            >
              <p class="font-bold text-gray-800">
                Spécifications recommandées pour {{ pathway.name }} :
              </p>
              <p>
                Processeur : {{ pathway.equipment_requirements.min_cpu || 'Non spécifié' }} · RAM :
                {{
                  pathway.equipment_requirements.min_ram_gb
                    ? pathway.equipment_requirements.min_ram_gb + ' Go'
                    : '4 Go'
                }}
                · Stockage :
                {{
                  pathway.equipment_requirements.min_storage_gb
                    ? pathway.equipment_requirements.min_storage_gb + ' Go'
                    : '128 Go'
                }}
              </p>
            </div>

            <div class="space-y-4">
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700">
                  Disposez-vous d'un ordinateur pour suivre la formation ? *
                </label>
                <div class="flex gap-4">
                  <label class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="radio"
                      :value="true"
                      v-model="hasComputer"
                      class="text-primary focus:ring-primary"
                    />
                    Oui
                  </label>
                  <label class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="radio"
                      :value="false"
                      v-model="hasComputer"
                      class="text-primary focus:ring-primary"
                    />
                    Non
                  </label>
                </div>
              </div>

              <template v-if="hasComputer">
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div class="space-y-1">
                    <label class="block text-xs font-semibold text-gray-700"
                      >Processeur (CPU)</label
                    >
                    <input
                      v-model="cpu"
                      type="text"
                      placeholder="Ex: Core i5, Ryzen 5, M1"
                      class="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div class="space-y-1">
                    <label class="block text-xs font-semibold text-gray-700">RAM (en Go)</label>
                    <input
                      v-model.number="ramGb"
                      type="number"
                      min="1"
                      placeholder="Ex: 8 ou 16"
                      class="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div class="space-y-1">
                    <label class="block text-xs font-semibold text-gray-700"
                      >Stockage (en Go)</label
                    >
                    <input
                      v-model.number="storageGb"
                      type="number"
                      min="1"
                      placeholder="Ex: 256 ou 512"
                      class="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>
              </template>
              <div v-else class="p-3 bg-amber-50 text-amber-800 rounded-xl text-xs">
                Note : Si vous ne disposez pas d'ordinateur personnel, votre candidature sera
                examinée en fonction des places équipées disponibles en centre.
              </div>
            </div>

            <div class="flex justify-between pt-4">
              <button
                @click="currentStep = 1"
                class="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition"
              >
                &larr; Retour
              </button>
              <button
                @click="currentStep = 3"
                class="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition shadow-sm"
              >
                Vérifier et soumettre &rarr;
              </button>
            </div>
          </div>

          <!-- ÉTAPE 3 : CONFIRMATION & SOUMISSION -->
          <div v-if="currentStep === 3" class="space-y-6">
            <div>
              <h2 class="text-xl font-bold text-gray-900">Récapitulatif de votre candidature</h2>
              <p class="text-xs sm:text-sm text-gray-500 mt-1">
                Relisez attentivement ces informations avant de confirmer l'envoi.
              </p>
            </div>

            <div
              class="divide-y divide-gray-100 border border-gray-200/80 rounded-xl overflow-hidden text-sm"
            >
              <div class="p-4 bg-gray-50/50 flex justify-between">
                <span class="text-gray-500">Filière</span>
                <span class="font-bold text-gray-800">{{ pathway?.name }}</span>
              </div>
              <div class="p-4 flex justify-between">
                <span class="text-gray-500">Session choisie</span>
                <span class="font-semibold text-gray-800">{{ selectedCohort?.name }}</span>
              </div>
              <div class="p-4 bg-gray-50/50 flex justify-between">
                <span class="text-gray-500">Dates</span>
                <span class="text-gray-700"
                  >Du {{ selectedCohort?.starts_at }} au {{ selectedCohort?.ends_at }}</span
                >
              </div>
              <div class="p-4 flex justify-between">
                <span class="text-gray-500">Possède un ordinateur</span>
                <span class="font-medium text-gray-800">{{ hasComputer ? 'Oui' : 'Non' }}</span>
              </div>
              <div v-if="hasComputer" class="p-4 bg-gray-50/50 flex justify-between">
                <span class="text-gray-500">Spécifications déclarées</span>
                <span class="text-gray-700 font-medium"
                  >{{ cpu || 'CPU non précisé' }} · {{ ramGb }} Go RAM · {{ storageGb }} Go</span
                >
              </div>
              <div v-if="motivation" class="p-4 space-y-1">
                <span class="text-gray-500 block text-xs">Motivation</span>
                <p class="text-gray-700 text-xs italic whitespace-pre-wrap">{{ motivation }}</p>
              </div>
            </div>

            <p
              v-if="submitError"
              class="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
            >
              {{ submitError }}
            </p>

            <div class="flex justify-between pt-4">
              <button
                @click="currentStep = 2"
                class="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition"
              >
                &larr; Retour
              </button>
              <button
                @click="submit"
                :disabled="submitMutation.isPending.value"
                class="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition shadow-sm disabled:opacity-50"
              >
                {{
                  submitMutation.isPending.value
                    ? 'Envoi en cours…'
                    : 'Confirmer et envoyer la candidature'
                }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { ApiError } from '@/api/http'
import { usePathway, usePathwayCohorts } from '@/features/catalog/composables/useCatalog'
import { useSubmitApplication } from '../composables/useLearnerApplications'

const route = useRoute()
const pathwayKey = computed(() => String(route.query.pathway ?? ''))
const cohortKey = computed(() => String(route.query.cohort ?? ''))

const { data: pathway } = usePathway(pathwayKey)
const { data: cohortsData } = usePathwayCohorts(pathwayKey)
const cohorts = computed(() => cohortsData.value ?? [])
const selectedCohort = computed(() => cohorts.value.find((c) => c.key === cohortKey.value))

const currentStep = ref(1)
const motivation = ref('')
const hasComputer = ref(true)
const cpu = ref('Core i5')
const ramGb = ref(8)
const storageGb = ref(256)

const submitError = ref<string | null>(null)
const isSuccess = ref(false)
const submitMutation = useSubmitApplication()

function nextToStep2() {
  if (selectedCohort.value) {
    currentStep.value = 2
  }
}

function submit() {
  if (!selectedCohort.value) return
  submitError.value = null

  submitMutation.mutate(
    {
      pathway_key: pathwayKey.value,
      cohort_key: selectedCohort.value.key,
      motivation: motivation.value.trim() || undefined,
      payload: {
        equipment: {
          has_computer: hasComputer.value,
          cpu: hasComputer.value ? cpu.value.trim() : undefined,
          ram_gb: hasComputer.value ? Number(ramGb.value) : undefined,
          storage_gb: hasComputer.value ? Number(storageGb.value) : undefined,
        },
      },
    },
    {
      onSuccess: () => {
        isSuccess.value = true
      },
      onError: (err) => {
        submitError.value = (err as ApiError).displayMessage
      },
    },
  )
}
</script>
