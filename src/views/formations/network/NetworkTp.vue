<template>
  <div class="flex flex-col h-[calc(100vh-8rem)] relative">

    <!-- BARRE D'OUTILS SUPÉRIEURE -->
    <div class="bg-white border-b border-gray-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-t-xl shadow-sm z-10 relative shrink-0">
      <div class="flex items-center gap-3">
        <!-- Icône spécifique au chapitre (Packet Tracer / Labo) -->
        <div class="w-10 h-10 rounded-lg bg-sky-500 text-white flex items-center justify-center shadow-sm">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
        </div>
        <div>
          <div class="flex items-center gap-2 mb-0.5">
            <span class="bg-sky-100 text-sky-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Chapitre 07</span>
            <span class="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Travaux Pratiques</span>
          </div>
          <h1 class="text-lg font-bold text-gray-800">Packet Tracer & Projet Final</h1>
        </div>
      </div>

      <div class="flex items-center gap-2 w-full sm:w-auto">
        <a
          :href="pdfUrl"
          download="Chapitre7_CCNA_Travaux_Pratiques.pdf"
          class="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Télécharger
        </a>
        <!-- Bouton pour ouvrir en grand -->
        <a
          :href="pdfUrl"
          target="_blank"
          class="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-sky-50 hover:bg-sky-100 text-sky-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
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
        title="Cours CCNA - Chapitre 7"
      ></iframe>
    </div>

    <!-- BOUTON FLOTTANT POUR TERMINER LA LECTURE -->
    <transition name="slide-up">
      <div v-if="showFinishButton" class="absolute bottom-6 right-6 z-20">
        <button
          @click="finishReading"
          class="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-bold shadow-2xl shadow-sky-500/50 flex items-center gap-2 transition transform hover:scale-105 animate-bounce"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          J'ai terminé les TP
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

        <h2 class="text-2xl font-extrabold text-gray-800 mb-2">Travaux Pratiques terminés ! 🎉</h2>
        <p class="text-gray-600 text-sm mb-6 leading-relaxed">
          Vous avez configuré les VLAN, OSPF, HSRP et la sécurité sur Packet Tracer. Il ne vous reste plus qu'à préparer l'examen final !
        </p>

        <!-- Redirection vers la préparation de l'examen -->
        <router-link
          to="/formations/network/examen"
          class="w-full inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white py-3.5 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-sky-500/30 hover:-translate-y-0.5"
        >
          Se préparer à l'examen
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// ⚠️ Assure-toi de bien placer le fichier dans public/documents/
const pdfUrl = '/public/Chapitre7_TP_Packet_Tracer.pdf'

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
