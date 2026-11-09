<template>
  <div class="space-y-6">

    <!-- ================= EN-TÊTE ================= -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Gestion des Cohortes</h1>
        <p class="text-sm text-gray-500 mt-1">
          Suivi de la répartition des 200 formateurs par filière et de l'avancement des sessions.
        </p>
      </div>
    </div>

    <!-- ================= RÉSUMÉ GLOBAL ================= -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-xl shadow-sm p-5 border border-gray-100 flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <div>
          <p class="text-sm text-gray-500 font-medium">Total Formateurs</p>
          <p class="text-2xl font-bold text-gray-800">200 <span class="text-sm text-gray-400 font-normal">/ 200</span></p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-5 border border-gray-100 flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <div>
          <p class="text-sm text-gray-500 font-medium">Objectif Parité (Femmes)</p>
          <p class="text-2xl font-bold text-primary">36% <span class="text-sm text-gray-400 font-normal">(72 femmes)</span></p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-5 border border-gray-100 flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        <div>
          <p class="text-sm text-gray-500 font-medium">Formations Terminées</p>
          <p class="text-2xl font-bold text-gray-800">2 <span class="text-sm text-gray-400 font-normal">/ 5 filières</span></p>
        </div>
      </div>
    </div>

    <!-- ================= CARTES DES COHORTES (5 FILIÈRES) ================= -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      <!-- Boucle sur les filières -->
      <div v-for="cohorte in cohortes" :key="cohorte.id" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition flex flex-col">

        <!-- En-tête de la carte -->
        <div class="p-5 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-sm shadow-sm">
              C{{ cohorte.id }}
            </div>
            <div>
              <h3 class="font-bold text-gray-800">{{ cohorte.nom }}</h3>
              <p class="text-xs text-gray-500">Session {{ cohorte.session }}</p>
            </div>
          </div>
          <!-- Badge statut -->
          <span class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
            :class="{
              'bg-primary/10 text-primary': cohorte.statut === 'Terminé',
              'bg-blue-100 text-blue-700': cohorte.statut === 'En cours',
              'bg-gray-100 text-gray-500': cohorte.statut === 'À venir'
            }">
            {{ cohorte.statut }}
          </span>
        </div>

        <!-- Corps de la carte (Données) -->
        <div class="p-5 flex-1 space-y-4">

          <!-- Effectif -->
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gray-500 font-medium">Effectif</span>
              <span class="font-bold text-gray-800">{{ cohorte.inscrits }} / 40</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-2">
              <div class="bg-primary h-2 rounded-full" :style="{ width: (cohorte.inscrits / 40) * 100 + '%' }"></div>
            </div>
          </div>

          <!-- Détails (Lieu, Date, Format) -->
          <div class="grid grid-cols-2 gap-3 text-sm">
            <div class="bg-gray-50 p-2 rounded-lg">
              <p class="text-xs text-gray-400 mb-0.5">Début</p>
              <p class="font-medium text-gray-700">{{ cohorte.debut }}</p>
            </div>
            <div class="bg-gray-50 p-2 rounded-lg">
              <p class="text-xs text-gray-400 mb-0.5">Fin</p>
              <p class="font-medium text-gray-700">{{ cohorte.fin }}</p>
            </div>
          </div>

          <div class="space-y-2 text-sm pt-2 border-t border-gray-100">
            <div class="flex items-center gap-2 text-gray-600">
              <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>80h (50h en ligne / 30h présentiel)</span>
            </div>
            <div class="flex items-center gap-2 text-gray-600">
              <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span>EMSP Abidjan / LMS NetAcad</span>
            </div>
          </div>
        </div>

        <!-- Pied de la carte (Action) -->
        <div class="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
          <div class="flex -space-x-2">
            <!-- Avatars fictifs -->
            <div class="w-7 h-7 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-600">AB</div>
            <div class="w-7 h-7 rounded-full bg-gray-400 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">CD</div>
            <div class="w-7 h-7 rounded-full bg-primary border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">+{{ cohorte.inscrits - 2 }}</div>
          </div>
          <button class="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
            Détails
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

// ==================== DONNÉES DES 5 COHORTES (Conformes au TDR) ====================
const cohortes = ref([
  {
    id: 1,
    nom: 'Intelligence Artificielle',
    session: 'Octobre 2024',
    inscrits: 40,
    debut: '07/10/2024',
    fin: '18/10/2024',
    statut: 'Terminé'
  },
  {
    id: 2,
    nom: 'Cybersécurité',
    session: 'Novembre 2024',
    inscrits: 38,
    debut: '04/11/2024',
    fin: '15/11/2024',
    statut: 'En cours'
  },
  {
    id: 3,
    nom: 'Data Analysis',
    session: 'Novembre 2024',
    inscrits: 40,
    debut: '18/11/2024',
    fin: '29/11/2024',
    statut: 'En cours'
  },
  {
    id: 4,
    nom: 'IT Support',
    session: 'Décembre 2024',
    inscrits: 30,
    debut: '02/12/2024',
    fin: '13/12/2024',
    statut: 'À venir'
  },
  {
    id: 5,
    nom: 'Network Specialist',
    session: 'Janvier 2025',
    inscrits: 0,
    debut: '06/01/2025',
    fin: '17/01/2025',
    statut: 'À venir'
  }
])
</script>

<style scoped>
/* Le design est entièrement géré par Tailwind, pas besoin de CSS supplémentaire */
</style>
