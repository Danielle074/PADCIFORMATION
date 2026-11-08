<template>
  <div class="flex flex-col h-[calc(100vh-8rem)] relative">

    <!-- BARRE D'OUTILS SUPÉRIEURE -->
    <div class="bg-white border-b border-gray-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-t-xl shadow-sm z-10 relative shrink-0">
      <div class="flex items-center gap-3">
        <!-- Icône spécifique au chapitre (Diplôme / Certification) -->
        <div class="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-sm">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
        </div>
        <div>
          <div class="flex items-center gap-2 mb-0.5">
            <span class="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Chapitre 08</span>
            <span class="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Préparation Examen</span>
          </div>
          <h1 class="text-lg font-bold text-gray-800">Se préparer à l'examen</h1>
        </div>
      </div>

      <div class="flex items-center gap-2 w-full sm:w-auto">
        <a
          :href="pdfUrl"
          download="Chapitre8_CCNA_Preparation_Examen.pdf"
          class="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Télécharger
        </a>
        <!-- Bouton pour ouvrir en grand -->
        <a
          :href="pdfUrl"
          target="_blank"
          class="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
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
        title="Cours CCNA - Chapitre 8"
      ></iframe>
    </div>

    <!-- BOUTON FLOTTANT POUR TERMINER LA LECTURE -->
    <transition name="slide-up">
      <div v-if="showFinishButton" class="absolute bottom-6 right-6 z-20">
        <button
          @click="finishReading"
          class="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-bold shadow-2xl shadow-amber-500/50 flex items-center gap-2 transition transform hover:scale-105 animate-bounce"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          J'ai terminé la préparation
        </button>
      </div>
    </transition>

    <!-- ================= MODALE DE FÉLICITATIONS FINALE ================= -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
    >
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all animate-scale-in">
        <!-- Icône de trophée ou diplôme -->
        <div class="w-24 h-24 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-5 shadow-inner">
          <svg class="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        </div>

        <h2 class="text-2xl font-extrabold text-gray-800 mb-2">Félicitations ! 🎓</h2>
        <p class="text-gray-600 text-sm mb-6 leading-relaxed">
          Vous avez terminé l'intégralité du programme <strong>CCNA 200-301</strong> !<br>
          Vous êtes maintenant prêt à passer votre certification officielle.
        </p>

        <!-- Retour au tableau de bord principal -->
        <router-link
          to="/formations/network/dashboard"
          class="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white py-3.5 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-amber-500/30 hover:-translate-y-0.5"
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
const pdfUrl = '/public/CCNA_Chapitre_8_Questions_21_a_25.pdf'

const showModal = ref(false)
const showFinishButton = ref(false)
let timer: any

onMounted(() => {
  // Affichage du bouton après 10 secondes
  timer = setTimeout(() => {
    showFinishButton.value = true
  }, 10000)
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
