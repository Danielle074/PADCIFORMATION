<template>
  <div class="space-y-6">
    <!-- NAVIGATION RETOUR -->
    <div class="flex items-center justify-between border-b border-gray-100 pb-4">
      <router-link
        :to="`/formations/${courseKey}`"
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
        Retour au plan du cours
      </router-link>

      <div v-if="courseOutline" class="text-xs text-gray-500 font-medium">
        {{ courseOutline.title }}
      </div>
    </div>

    <!-- ÉTAT DE CHARGEMENT / ERREUR -->
    <div v-if="isPending" class="text-center py-16 text-gray-500">Chargement du chapitre…</div>
    <div v-else-if="isError" class="text-center py-16 text-red-600">
      {{ (error as ApiError)?.message ?? 'Impossible de charger ce chapitre.' }}
    </div>

    <template v-else-if="chapter">
      <!-- CORPS DU CHAPITRE -->
      <div class="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-sm space-y-6">
        <div class="space-y-2 border-b border-gray-100 pb-5">
          <div class="flex items-center gap-2">
            <span
              class="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-primary/10 text-primary"
            >
              {{ chapter.type }}
            </span>
            <span v-if="chapter.duration_seconds" class="text-xs text-gray-400">
              Durée estimée : {{ Math.round(chapter.duration_seconds / 60) }} min
            </span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900">{{ chapter.title }}</h1>
        </div>

        <!-- CONTENU DU CHAPITRE -->
        <div class="prose prose-sm max-w-none text-gray-800 leading-relaxed space-y-4">
          <div v-if="chapter.body" class="whitespace-pre-wrap">{{ chapter.body }}</div>
          <div v-else class="text-gray-400 italic py-8 text-center bg-gray-50 rounded-xl">
            Aucun texte supplémentaire pour cette ressource.
          </div>
        </div>

        <!-- RESSOURCES COMPLÉMENTAIRES -->
        <div v-if="chapter.resources.length > 0" class="pt-6 border-t border-gray-100 space-y-3">
          <h3 class="text-sm font-bold text-gray-800">Supports et ressources associées</h3>
          <div class="grid gap-2">
            <div
              v-for="res in chapter.resources"
              :key="res.key"
              class="border rounded-xl p-3 flex items-center justify-between text-xs transition"
              :class="
                res.locked ? 'bg-gray-50 text-gray-400' : 'bg-white hover:bg-gray-50 text-gray-700'
              "
            >
              <div class="flex items-center gap-2">
                <span>{{ res.type === 'link' ? '🔗' : '📄' }}</span>
                <span class="font-medium">{{ res.title }}</span>
              </div>
              <div>
                <a
                  v-if="!res.locked && res.external_url"
                  :href="res.external_url"
                  target="_blank"
                  rel="noopener"
                  class="text-primary hover:underline font-semibold"
                >
                  Ouvrir &rarr;
                </a>
                <span v-else-if="res.locked" class="italic">Verrouillé</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PIED DE NAVIGATION & PROGRESSION -->
      <div
        class="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div>
          <router-link
            v-if="prevChapter"
            :to="`/formations/${courseKey}/chapitres/${prevChapter.key}`"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-200 transition"
          >
            &larr; Chapitre précédent
          </router-link>
        </div>

        <div class="flex items-center gap-3">
          <button
            @click="markCompleteAndNext"
            :disabled="progressMutation.isPending.value"
            class="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90 transition shadow-sm disabled:opacity-50"
          >
            {{
              progressMutation.isPending.value
                ? 'Enregistrement…'
                : 'Marquer comme terminé & suivant ✓'
            }}
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { ApiError } from '@/api/http'
import {
  useChapterContent,
  useCourseOutline,
  useRecordProgress,
  type OutlineChapter,
} from '../composables/useLearningCourse'

const route = useRoute()
const router = useRouter()

const courseKey = computed(() => String(route.params.courseKey ?? ''))
const chapterKey = computed(() => String(route.params.chapterKey ?? ''))

const { data: courseOutline } = useCourseOutline(courseKey)
const { data: chapter, isPending, isError, error } = useChapterContent(courseKey, chapterKey)

// Flatten chapters from outline to find next and previous
const allChapters = computed<OutlineChapter[]>(() => {
  if (!courseOutline.value) return []
  return courseOutline.value.modules.flatMap((m) => m.chapters)
})

const currentIndex = computed(() => allChapters.value.findIndex((c) => c.key === chapterKey.value))

const prevChapter = computed(() => {
  if (currentIndex.value > 0) {
    return allChapters.value[currentIndex.value - 1]
  }
  return null
})

const nextChapter = computed(() => {
  if (currentIndex.value >= 0 && currentIndex.value < allChapters.value.length - 1) {
    return allChapters.value[currentIndex.value + 1]
  }
  return null
})

const progressMutation = useRecordProgress()

function markCompleteAndNext() {
  progressMutation.mutate(
    {
      courseKey: courseKey.value,
      chapterKey: chapterKey.value,
      position_seconds: 0,
      completed: true,
    },
    {
      onSuccess: () => {
        if (nextChapter.value && !nextChapter.value.locked) {
          router.push(`/formations/${courseKey.value}/chapitres/${nextChapter.value.key}`)
        } else {
          router.push(`/formations/${courseKey.value}`)
        }
      },
    },
  )
}
</script>
