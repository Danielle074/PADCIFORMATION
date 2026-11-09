<template>
  <div class="space-y-8">
    <!-- EN-TÊTE DU TABLEAU DE BORD -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Mon Espace de Formation</h1>
        <p class="text-sm text-gray-500 mt-1">
          Bienvenue sur votre espace apprenant. Retrouvez vos cours actifs et vos sessions
          programmées.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <router-link
          to="/mes-candidatures"
          class="px-4 py-2 border border-gray-200 text-gray-700 bg-white rounded-xl text-xs font-semibold hover:bg-gray-50 transition shadow-sm"
        >
          Suivi de mes candidatures
        </router-link>
        <router-link
          to="/catalogue"
          class="px-4 py-2 bg-primary text-white rounded-xl text-xs font-semibold hover:bg-primary/90 transition shadow-sm"
        >
          Catalogue &rarr;
        </router-link>
      </div>
    </div>

    <!-- ÉTAT DE CHARGEMENT / ERREUR -->
    <div v-if="isPending" class="text-center py-12 text-gray-500">
      Chargement de vos formations…
    </div>
    <div v-else-if="isError" class="text-center py-12 text-red-600">
      {{ (error as ApiError)?.message ?? 'Impossible de charger vos formations.' }}
    </div>

    <!-- AUCUNE FORMATION -->
    <div
      v-else-if="enrollments.length === 0"
      class="bg-white rounded-2xl border border-gray-200/80 p-10 text-center space-y-4 shadow-sm"
    >
      <div
        class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      </div>
      <h3 class="text-lg font-bold text-gray-800">Aucune formation active pour l'instant</h3>
      <p class="text-sm text-gray-500 max-w-md mx-auto">
        Vous n'êtes pas encore inscrit à une cohorte active. Consultez le catalogue des filières et
        déposez votre candidature pour rejoindre une session.
      </p>
      <div class="pt-2">
        <router-link
          to="/catalogue"
          class="inline-block px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition shadow-sm"
        >
          Découvrir le catalogue des sessions
        </router-link>
      </div>
    </div>

    <!-- GRILLE DES FORMATIONS ACTIVES -->
    <div v-else class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="enrollment in enrollments"
          :key="enrollment.key"
          class="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
        >
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span
                class="px-2.5 py-0.5 rounded-full text-xs font-bold"
                :class="
                  enrollment.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600'
                "
              >
                {{ enrollment.status === 'active' ? 'En cours' : enrollment.status }}
              </span>
              <span v-if="enrollment.cohort" class="text-xs text-gray-400 font-mono">
                {{ enrollment.cohort.session }}
              </span>
            </div>

            <div>
              <h2 class="text-lg font-bold text-gray-900 line-clamp-2">
                {{ enrollment.course?.title || 'Formation en ligne' }}
              </h2>
              <p v-if="enrollment.cohort" class="text-xs text-gray-500 mt-1">
                Cohorte : <strong class="text-gray-700">{{ enrollment.cohort.name }}</strong>
              </p>
            </div>
          </div>

          <div class="pt-6 mt-4 border-t border-gray-100">
            <router-link
              v-if="enrollment.course"
              :to="`/formations/${enrollment.course.key}`"
              class="w-full inline-block text-center px-4 py-2.5 bg-primary text-white rounded-xl text-xs font-semibold hover:bg-primary/90 transition shadow-sm"
            >
              Accéder au cours &rarr;
            </router-link>
            <span v-else class="text-xs text-gray-400 text-center block">
              Contenu en cours de publication
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ApiError } from '@/api/http'
import { useEnrollments } from '../composables/useEnrollments'

const { data, isPending, isError, error } = useEnrollments()
const enrollments = computed(() => data.value?.items ?? [])
</script>
