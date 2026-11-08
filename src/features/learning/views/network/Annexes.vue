<template>
  <div class="flex flex-col h-[calc(100vh-8rem)] relative">

    <!-- BARRE D'OUTILS SUPÉRIEURE -->
    <div class="bg-white border-b border-gray-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-t-xl shadow-sm z-10 relative shrink-0">
      <div class="flex items-center gap-3">
        <!-- Icône spécifique (Document / Référence) -->
        <div class="w-10 h-10 rounded-lg bg-teal-600 text-white flex items-center justify-center shadow-sm">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
        </div>
        <div>
          <div class="flex items-center gap-2 mb-0.5">
            <span class="bg-teal-100 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Annexes</span>
            <span class="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Références</span>
          </div>
          <h1 class="text-lg font-bold text-gray-800">Corrigés, Commandes & Glossaire</h1>
        </div>
      </div>

      <div class="flex items-center gap-2 w-full sm:w-auto">
        <a
          :href="pdfUrl"
          download="Annexes_CCNA.pdf"
          class="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Télécharger
        </a>
        <!-- Bouton pour ouvrir en grand -->
        <a
          :href="pdfUrl"
          target="_blank"
          class="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-teal-50 hover:bg-teal-100 text-teal-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          Plein écran
        </a>
      </div>
    </div>

    <!-- LECTEUR PDF -->
    <div class="flex-1 relative bg-gray-100 rounded-b-xl overflow-hidden shadow-inner border border-t-0 border-gray-200">
      <iframe
        :src="`${pdfUrl}#toolbar=1&navpanes=0`"
        class="w-full h-full border-none"
        title="Cours CCNA - Annexes"
      ></iframe>
    </div>

    <!-- BOUTON FLOTTANT POUR TERMINER LA LECTURE -->
    <transition name="slide-up">
      <div v-if="showFinishButton" class="absolute bottom-6 right-6 z-20">
        <button
          @click="finishReading"
          class="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full font-bold shadow-2xl shadow-teal-600/50 flex items-center gap-2 transition transform hover:scale-105 animate-bounce"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          J'ai terminé les annexes
        </button>
      </div>
    </transition>

    <!-- ================= MODALE DE FÉLICITATIONS FINALE ================= -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
    >
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all animate-scale-in">
        <!-- Icône de médaille / réussite -->
        <div class="w-24 h-24 mx-auto bg-teal-100 rounded-full flex items-center justify-center mb-5 shadow-inner">
          <svg class="w-12 h-12 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>

        <h2 class="text-2xl font-extrabold text-gray-800 mb-2">Parcours Terminé ! 🎓</h2>
        <p class="text-gray-600 text-sm mb-6 leading-relaxed">
          Vous avez lu l'intégralité du support de cours CCNA 200-301, y compris les corrigés et le glossaire. Bonne chance pour votre certification !
        </p>

        <!-- Retour au tableau de bord principal -->
        <router-link
          to="/formations/network/dashboard"
          class="w-full inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white py-3.5 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-teal-500/30 hover:-translate-y-0.5"
        >
          Retour au Tableau de bord
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// ⚠️ Assure-toi de bien placer le fichier dans public/documents/
const pdfUrl = '/public/Extrait_Annexe_A_Correction.pdf'

const showModal = ref(false)
const showFinishButton = ref(false)
let timer: any

onMounted(() => {
  // Affichage du bouton après 8 secondes
  timer = setTimeout(() => {
    showFinishButton.value = true
  }, 8000)
})

onUnmounted(() => {
  clearTimeout(timer)
})

const finishReading = () => {
  showModal.value = true
  showFinishButton.value = false
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
