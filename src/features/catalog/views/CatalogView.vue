<template>
  <div class="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto space-y-8">
      <!-- EN-TÊTE -->
      <div
        class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6"
      >
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-primary">PADCI LMS</span>
          <h1 class="text-3xl font-extrabold text-gray-900 mt-1">Catalogue des Formations</h1>
          <p class="text-gray-600 mt-2 max-w-2xl text-sm sm:text-base">
            Découvrez nos filières professionnalisantes, les sessions programmées et les prérequis
            techniques pour déposer votre candidature.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <router-link
            v-if="!auth.token"
            to="/connexion"
            class="px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-xl text-sm font-medium hover:bg-gray-50 transition shadow-sm"
          >
            Se connecter
          </router-link>
          <router-link
            v-if="!auth.token"
            to="/inscription"
            class="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition shadow-sm shadow-primary/20"
          >
            Créer un compte
          </router-link>
          <router-link
            v-else
            to="/formations/dashboard"
            class="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition shadow-sm shadow-primary/20"
          >
            Mon Espace Apprenant
          </router-link>
        </div>
      </div>

      <!-- ÉTATS DE CHARGEMENT / ERREUR -->
      <div v-if="isPending" class="text-center py-16 text-gray-500">
        Chargement des filières de formation…
      </div>
      <div v-else-if="isError" class="text-center py-16 text-red-600">
        {{ (error as ApiError)?.message ?? 'Impossible de charger le catalogue.' }}
      </div>
      <div v-else-if="pathways.length === 0" class="text-center py-16 text-gray-500">
        Aucune filière de formation disponible pour le moment.
      </div>

      <!-- GRILLE DES FILIÈRES -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="pathway in pathways"
          :key="pathway.key"
          class="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
        >
          <div class="space-y-4">
            <div class="flex items-start justify-between gap-2">
              <span
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary"
              >
                {{ pathway.code }}
              </span>
              <span v-if="pathway.courses_count" class="text-xs text-gray-500 font-medium">
                {{ pathway.courses_count }} cours
              </span>
            </div>

            <div>
              <h2 class="text-xl font-bold text-gray-900 group-hover:text-primary transition">
                {{ pathway.name }}
              </h2>
              <p class="text-sm text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                {{
                  pathway.description ||
                  'Formation certifiante structurée en modules et sessions intensives.'
                }}
              </p>
            </div>

            <!-- Configuration minimale -->
            <div
              v-if="pathway.equipment_requirements"
              class="bg-gray-50 rounded-xl p-3 text-xs text-gray-600 space-y-1 border border-gray-100"
            >
              <p class="font-semibold text-gray-700 flex items-center gap-1.5">
                <svg
                  class="w-4 h-4 text-primary"
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
                Prérequis matériel recommandé :
              </p>
              <p class="text-gray-500">
                {{ pathway.equipment_requirements.min_cpu || 'Processeur récent' }} ·
                {{
                  pathway.equipment_requirements.min_ram_gb
                    ? pathway.equipment_requirements.min_ram_gb + ' Go RAM'
                    : ''
                }}
                ·
                {{
                  pathway.equipment_requirements.min_storage_gb
                    ? pathway.equipment_requirements.min_storage_gb + ' Go SSD'
                    : ''
                }}
              </p>
            </div>
          </div>

          <div class="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
            <router-link
              :to="`/catalogue/${pathway.key}`"
              class="w-full text-center px-4 py-2.5 bg-gray-900 text-white group-hover:bg-primary rounded-xl text-sm font-semibold transition"
            >
              Voir les sessions &amp; candidater &rarr;
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
import { useAuthStore } from '@/stores/auth'
import { usePathways } from '../composables/useCatalog'

const auth = useAuthStore()
const { data, isPending, isError, error } = usePathways()
const pathways = computed(() => data.value?.items ?? [])
</script>
