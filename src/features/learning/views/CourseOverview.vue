<template>
  <div class="space-y-8">
    <!-- RETOUR DASHBOARD -->
    <div>
      <router-link
        to="/formations/dashboard"
        class="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-primary transition"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Retour à mon tableau de bord
      </router-link>
    </div>

    <!-- ÉTAT CHARGEMENT / ERREUR -->
    <div v-if="isPending" class="text-center py-16 text-gray-500">Chargement du plan de cours…</div>
    <div v-else-if="isError" class="text-center py-16 text-red-600">
      {{ (error as ApiError)?.message ?? 'Impossible de charger ce cours.' }}
    </div>

    <template v-else-if="course">
      <!-- HERO DU COURS -->
      <div class="bg-white rounded-2xl border border-gray-200/80 p-8 shadow-sm space-y-4">
        <div class="flex flex-wrap items-center gap-2">
          <span
            class="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-primary/10 text-primary"
          >
            {{ course.level }}
          </span>
          <span v-if="course.pathway" class="text-xs text-gray-500 font-medium">
            Filière : {{ course.pathway.name }}
          </span>
        </div>

        <h1 class="text-3xl font-extrabold text-gray-900">{{ course.title }}</h1>
        <p v-if="course.summary" class="text-gray-600 text-sm max-w-2xl leading-relaxed">
          {{ course.summary }}
        </p>

        <!-- REPRENDRE LA LECTURE -->
        <div
          v-if="course.resume"
          class="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div class="space-y-0.5">
            <span class="text-xs text-gray-400 font-semibold uppercase tracking-wider"
              >Reprendre où vous vous êtes arrêté</span
            >
            <p class="text-sm font-bold text-gray-800">{{ course.resume.chapter_title }}</p>
          </div>
          <router-link
            :to="`/formations/${course.key}/chapitres/${course.resume.chapter_key}`"
            class="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90 transition shadow-sm text-center"
          >
            Continuer la lecture &rarr;
          </router-link>
        </div>
      </div>

      <!-- STRUCTURE DU COURS (MODULES & CHAPITRES) -->
      <div class="space-y-6">
        <h2 class="text-xl font-bold text-gray-900">Sommaire de la formation</h2>

        <div
          v-if="course.modules.length === 0"
          class="bg-white rounded-xl p-8 border border-gray-200/80 text-center text-sm text-gray-500"
        >
          Ce cours n'a pas encore de modules publiés.
        </div>

        <div
          v-for="module in course.modules"
          :key="module.key"
          class="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm"
        >
          <div
            class="bg-gray-50 px-6 py-4 border-b border-gray-200/80 flex items-center justify-between"
          >
            <div>
              <span class="text-xs font-bold text-gray-400 uppercase tracking-wide"
                >Module {{ module.position }}</span
              >
              <h3 class="text-base font-bold text-gray-900">{{ module.title }}</h3>
            </div>
            <span class="text-xs font-medium text-gray-500"
              >{{ module.chapters.length }} chapitre(s)</span
            >
          </div>

          <div class="divide-y divide-gray-100">
            <div
              v-for="chapter in module.chapters"
              :key="chapter.key"
              class="px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50/50 transition"
              :class="chapter.locked ? 'opacity-60 bg-gray-50/30' : ''"
            >
              <div class="flex items-center gap-3">
                <!-- STATUT / VERROUILLÉ -->
                <div class="shrink-0">
                  <span
                    v-if="chapter.progress?.status === 'completed'"
                    class="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs"
                    title="Terminé"
                  >
                    ✓
                  </span>
                  <span
                    v-else-if="chapter.locked"
                    class="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-xs"
                    title="Verrouillé"
                  >
                    🔒
                  </span>
                  <span
                    v-else
                    class="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold"
                  >
                    {{ chapter.position }}
                  </span>
                </div>

                <div>
                  <h4 class="text-sm font-semibold text-gray-800">{{ chapter.title }}</h4>
                  <p class="text-xs text-gray-400">
                    {{ chapterTypeLabel(chapter.type) }}
                    <span v-if="chapter.duration_seconds">
                      · {{ Math.round(chapter.duration_seconds / 60) }} min</span
                    >
                  </p>
                </div>
              </div>

              <div>
                <router-link
                  v-if="!chapter.locked"
                  :to="`/formations/${course.key}/chapitres/${chapter.key}`"
                  class="px-3.5 py-1.5 bg-gray-100 hover:bg-primary hover:text-white rounded-lg text-xs font-semibold text-gray-700 transition"
                >
                  Lire
                </router-link>
                <span v-else class="text-xs text-gray-400 italic">Verrouillé</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { ApiError } from '@/api/http'
import { useCourseOutline } from '../composables/useLearningCourse'

const route = useRoute()
const courseKey = computed(() => String(route.params.courseKey ?? ''))

const { data: course, isPending, isError, error } = useCourseOutline(courseKey)

function chapterTypeLabel(type: string): string {
  switch (type) {
    case 'video':
      return 'Vidéo'
    case 'quiz':
      return 'Quiz d’évaluation'
    case 'assignment':
      return 'Devoir pratique'
    default:
      return 'Leçon'
  }
}
</script>
