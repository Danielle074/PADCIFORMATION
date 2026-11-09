<template>
  <div class="flex flex-col h-[calc(100vh-8rem)] relative">

    <!-- BARRE D'OUTILS SUPÉRIEURE -->
    <div class="bg-white border-b border-gray-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-t-xl shadow-sm z-10 relative shrink-0">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center shadow-sm">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
        </div>
        <div>
          <h1 class="text-lg font-bold text-gray-800">Introduction au CCNA 200-301</h1>
          <p class="text-xs text-gray-500">Support de l'auditeur</p>
        </div>
      </div>

      <div class="flex items-center gap-2 w-full sm:w-auto">
        <a
          :href="pdfUrl"
          download="Introduction_CCNA.pdf"
          class="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Télécharger
        </a>
      </div>
    </div>

    <!-- LECTEUR PDF -->
    <div class="flex-1 relative bg-gray-100 rounded-b-xl overflow-hidden shadow-inner border border-t-0 border-gray-200">
      <iframe
        :src="`${pdfUrl}#toolbar=1&navpanes=0`"
        class="w-full h-full border-none"
        title="Introduction CCNA PDF"
      ></iframe>
    </div>

    <!-- BOUTON FLOTTANT POUR TERMINER LA LECTURE -->
    <!-- Il apparaît après 5 secondes pour laisser le temps de lire un peu -->
    <transition name="slide-up">
      <div v-if="showFinishButton" class="absolute bottom-6 right-6 z-20 animate-bounce">
        <button
          @click="finishReading"
          class="bg-primary hover:bg-primary-shade text-white px-6 py-3 rounded-full font-bold shadow-2xl shadow-primary/50 flex items-center gap-2 transition transform hover:scale-105"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          J'ai terminé la lecture
        </button>
      </div>
    </transition>

    <!-- ================= MODALE DE FÉLICITATIONS ================= -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
    >
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all animate-scale-in">
        <div class="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-5 shadow-inner">
          <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h2 class="text-2xl font-extrabold text-gray-800 mb-2">Félicitations ! 🎉</h2>
        <p class="text-gray-600 text-sm mb-6 leading-relaxed">
          Vous avez terminé la lecture de l'introduction. Vous êtes maintenant prêt à plonger dans le vif du sujet avec le Chapitre 1.
        </p>

        <router-link
          to="/formations/network/chapitre1"
          class="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-shade text-white py-3.5 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-primary/30 hover:-translate-y-0.5"
        >
          Aller au Chapitre 1
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Le chemin vers ton PDF dans le dossier public
const pdfUrl = '/public/Introduction_CCNA.pdf'

const showModal = ref(false)
const showFinishButton = ref(false)
let timer: any

onMounted(() => {
  // On affiche le bouton "J'ai terminé" après 5 secondes de lecture
  timer = setTimeout(() => {
    showFinishButton.value = true
  }, 5000)
})

onUnmounted(() => {
  clearTimeout(timer)
})

const finishReading = () => {
  showModal.value = true
  showFinishButton.value = false // On cache le bouton flottant
}
</script>

<style scoped>
/* Animation d'apparition du bouton */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Animation de la modale */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
.animate-scale-in {
  animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
</style>
