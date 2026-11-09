<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Bannière (optionnelle) -->
    <div v-if="false" class="bg-[#007668] text-white p-4">
      <h1 class="text-xl font-bold">Module 1 : Éducation routière</h1>
    </div>

    <!-- CONTENU PRINCIPAL -->
    <section class="px-4 md:px-6 py-8 max-w-5xl mx-auto w-full">
      <!-- BLOC UNIQUE DES IMAGES FUSIONNÉES (carrousel) avec chevrons à l'extérieur -->
      <div class="mb-6">
        <!-- En-tête du module -->
        <div class="bg-[#007668] text-white p-4 rounded-t-xl flex justify-between items-center">
          <div class="flex items-center gap-2">
            <BookOpenIcon :size="20" />
            <span class="font-bold">Support de cours officiel – Chapitre 1</span>
          </div>
          <!-- Indicateur de page -->
          <span class="text-sm bg-white/30 px-3 py-1 rounded-full">
            {{ currentIndex + 1 }} / {{ totalImages }}
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

          <!-- Image active -->
          <div class="flex-grow flex justify-center bg-white rounded-lg p-2 shadow-inner">
            <img
              :src="currentImage"
              :alt="'Page du cours ' + (currentIndex + 1)"
              class="max-h-[500px] w-auto object-contain rounded"
            />
          </div>

          <!-- Chevron droit -->
          <button
            @click="nextSlide"
            :disabled="currentIndex === totalImages - 1"
            class="flex-shrink-0 bg-[#007668] hover:bg-[#007668]/90 text-white rounded-full p-3 shadow-lg transition disabled:opacity-40 disabled:cursor-not-allowed"
            style="min-width: 50px;"
          >
            <ChevronRightIcon :size="30" />
          </button>
        </div>


      </div>

      <!-- ZONE DE NAVIGATION -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-md mt-2">

        <!-- Bouton Précédent -->
        <RouterLink
          to="/formations/chapitre3"
          class="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition-all w-full md:w-auto justify-center"
        >
          <ArrowLeftIcon :size="20" />
          <span>Précédent</span>
        </RouterLink>

        <!-- Bouton Suivant (RouterLink) -->
        <RouterLink
          to="/formations/Chapitre5"
          class="flex items-center gap-3 px-8 py-3 rounded-lg font-bold transition-all shadow-lg w-full md:w-auto justify-center"
          :class="isLastSlideViewed ? 'bg-[#FFDC00] text-[#007668] hover:bg-[#007668] hover:text-white' : 'bg-gray-300 text-gray-500 pointer-events-none'"
        >
          <span>Suivant</span>
          <ArrowRightIcon :size="24" />
        </RouterLink>

      </div>

      <!-- Indicateur de progression -->
      <p class="text-center text-xs text-gray-500 mt-4">
        Chapitre 4 sur 7 • Module 1 : Éducation routière
        <span v-if="!isLastSlideViewed" class="block mt-1 text-amber-600">👆 Faites défiler toutes les pages pour activer le bouton suivant</span>
        <span v-else class="block mt-1 text-green-600">✓ Vous avez consulté tout le cours. Vous pouvez passer au chapitre 2.</span>
      </p>
    </section>
  </div>
</template>

<script setup>
import { ArrowLeftIcon, ArrowRightIcon, BookOpenIcon, ChevronLeftIcon, ChevronRightIcon } from '@lucide/vue'
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

// IMPORT DES IMAGES
import module1Img1 from '@/assets/images/Chapitre4.png'
import module1Img2 from '@/assets/images/Chapitre4-1.png'
import module1Img3 from '@/assets/images/Chapitre4-2.png'
import module1Img4 from '@/assets/images/Chapitre4-3.png'
import module1Img5 from '@/assets/images/Chapitre4-4.png'

const totalImages = 5
const currentIndex = ref(0)

const images = [
  module1Img1,
  module1Img2,
  module1Img3,
  module1Img4,
  module1Img5
]

const currentImage = computed(() => images[currentIndex.value])

const prevSlide = () => {
  if (currentIndex.value > 0) currentIndex.value--
}

const nextSlide = () => {
  if (currentIndex.value < totalImages - 1) currentIndex.value++
}

const isLastSlideViewed = computed(() => currentIndex.value === totalImages - 1)
</script>

<style scoped>
.bx {
  font-size: 1.5rem;
}

button:disabled {
  cursor: not-allowed;
}

.flex.items-center.justify-between {
  background-color: #f3f4f6;
}

.flex-grow {
  min-width: 0;
}

@media (max-width: 640px) {
  .max-h-\[500px\] {
    max-height: 350px;
  }

  .rounded-full {
    padding: 0.5rem;
  }

  .text-3xl {
    font-size: 1.5rem;
  }
}

.rounded-full {
  border-radius: 9999px;
}
</style>
