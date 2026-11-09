<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- CONTENU PRINCIPAL -->
    <section class="px-4 md:px-6 py-8 max-w-5xl mx-auto w-full">
      <!-- Bloc principal avec chevrons extérieurs -->
      <div class="mb-6">
        <!-- En-tête du module -->
        <div class="bg-[#007668] text-white p-4 rounded-t-xl flex justify-between items-center">
          <div class="flex items-center gap-2">
            <ClipboardListIcon :size="20" />
            <span class="font-bold">Récapitulatif – Chapitre 8 (support officiel)</span>
          </div>
          <!-- Indicateur de page -->
          <span class="text-sm bg-white/30 px-3 py-1 rounded-full">
            {{ currentIndex + 1 }} / {{ totalItems }}
          </span>
        </div>

        <!-- Conteneur principal avec chevrons à l'extérieur -->
        <div class="flex items-center justify-between gap-2 bg-gray-100 p-2 rounded-b-xl">
          <!-- Chevron gauche -->
          <button
            @click="prevSlide"
            :disabled="currentIndex === 0"
            class="flex-shrink-0 bg-[#007668] hover:bg-[#007668]/90 text-white rounded-full p-3 shadow-lg transition disabled:opacity-40 disabled:cursor-not-allowed"
            style="min-width: 50px;"
          >
            <ChevronLeftIcon :size="30" />
          </button>

          <!-- Contenu actif -->
          <div class="flex-grow flex justify-center bg-white rounded-lg p-2 shadow-inner min-h-[400px] items-center">
            <!-- Image -->
            <div v-if="currentIndex === 0" class="w-full">
              <img
                :src="images[0]"
                alt="Résumé du chapitre 8"
                class="max-h-[400px] w-auto object-contain rounded-lg mx-auto"
              />
              <p class="text-center text-sm text-gray-600 mt-2">Synthèse visuelle du chapitre</p>
            </div>

            <!-- Vidéo -->
            <div v-else class="w-full">
              <video
                ref="videoPlayer"
                :src="videoSrc"
                controls
                @ended="onVideoEnded"
                class="w-full max-h-[400px] rounded-lg shadow-sm bg-black mx-auto"
              >
                Votre navigateur ne supporte pas la lecture de vidéo.
              </video>
              <p class="text-center text-sm text-gray-600 mt-2">Vidéo de synthèse</p>
            </div>
          </div>

          <!-- Chevron droit -->
          <button
            @click="nextSlide"
            :disabled="currentIndex === totalItems - 1"
            class="flex-shrink-0 bg-[#007668] hover:bg-[#007668]/90 text-white rounded-full p-3 shadow-lg transition disabled:opacity-40 disabled:cursor-not-allowed"
            style="min-width: 50px;"
          >
            <ChevronRightIcon :size="30" />
          </button>
        </div>

        <!-- Mini légende -->
        <div class="bg-gray-50 p-3 text-center text-sm text-gray-600 border-t">
          <span v-if="currentIndex === 0">📷 Image récapitulative</span>
          <span v-else>🎬 Vidéo de synthèse</span>
        </div>
      </div>

      <!-- ZONE DE NAVIGATION -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-md mt-2">
        <!-- Bouton Précédent -->
        <RouterLink
          to="/formations/chapitre6"
          class="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition-all w-full md:w-auto justify-center"
        >
          <ArrowLeftIcon :size="20" />
          <span>Précédent (Chap 6)</span>
        </RouterLink>

        <!-- Bouton Évaluation (actif seulement quand la vidéo a été vue) -->
        <button
          @click="goToEvaluation"
          :disabled="!canGoToEvaluation"
          class="flex items-center gap-3 px-8 py-3 rounded-lg font-bold transition-all shadow-lg w-full md:w-auto justify-center"
          :class="canGoToEvaluation ? 'bg-[#FFDC00] text-[#007668] hover:bg-[#007668] hover:text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
        >
          <CircleCheckIcon :size="20" />
          <span>Faire l'évaluation</span>
          <ArrowRightIcon :size="24" />
        </button>
      </div>

      <!-- Indicateur de progression -->
      <p class="text-center text-xs text-gray-500 mt-4">
        Chapitre 7 sur 7 • Module 1 : Éducation routière
        <span v-if="!videoWatched" class="block mt-1 text-amber-600">
          👆 Passez à la vidéo (chevron droit) et regardez-la pour faire l'évaluation
        </span>
        <span v-else class="block mt-1 text-green-600">
          ✓ Vidéo visionnée – vous pouvez maintenant faire l'évaluation
        </span>
      </p>

      <!-- Message supplémentaire si la vidéo est finie -->
      <div v-if="videoWatched" class="mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
        <div class="flex items-center gap-3">
          <CircleCheckIcon class="text-green-500" :size="24" />
          <div>
            <p class="text-green-700 font-medium">Prêt pour l'évaluation !</p>
            <p class="text-green-600 text-sm">
              Cliquez sur "Faire l'évaluation" pour tester vos connaissances et valider le module.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, CircleCheckIcon, ClipboardListIcon } from '@lucide/vue'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

// Import de l'image
import module1Img1 from '@/assets/images/Quiz3.png'

// Router
const router = useRouter()

// États
const currentIndex = ref(0)
const totalItems = 2 // 1 image + 1 vidéo
const videoWatched = ref(false)
const videoPlayer = ref(null)

// Sources
const images = [module1Img1]
const videoSrc = '/module1.mp4'

// Navigation carrousel
const prevSlide = () => {
  if (currentIndex.value > 0) currentIndex.value--
}

const nextSlide = () => {
  if (currentIndex.value < totalItems - 1) currentIndex.value++
}

// Vérifier si on peut aller à l'évaluation
const canGoToEvaluation = computed(() => {
  return videoWatched.value
})

// Aller à l'évaluation
const goToEvaluation = () => {
  if (canGoToEvaluation.value) {
    router.push('/formations/evaluation')
  }
}

// Détecter la fin de la vidéo
const onVideoEnded = () => {
  videoWatched.value = true
}

// Nettoyage
onBeforeUnmount(() => {
  // Pas besoin de nettoyer car on utilise @ended dans le template
})
</script>

<style scoped>
.bx {
  font-size: 1.5rem;
}

button:disabled {
  cursor: not-allowed;
}

/* Hauteur minimale pour le conteneur */
.min-h-\[400px\] {
  min-height: 400px;
}

/* Adaptation mobile */
@media (max-width: 640px) {
  .min-h-\[400px\] {
    min-height: 250px;
  }

  .max-h-\[400px\] {
    max-height: 250px;
  }

  button {
    padding: 0.5rem;
  }

  .text-3xl {
    font-size: 1.5rem;
  }
}

.rounded-full {
  border-radius: 9999px;
}

/* Animation pour le message de confirmation */
.bg-green-50 {
  animation: slideIn 0.5s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
