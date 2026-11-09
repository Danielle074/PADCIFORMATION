<template>
  <!-- OVERLAY MOBILE -->
  <div
    v-if="isOpen"
    @click="$emit('close')"
    class="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
  ></div>

  <!-- SIDEBAR -->
  <aside
    class="fixed left-0 top-0 h-screen w-64 bg-white shadow-xl flex flex-col z-50 transform transition-transform duration-300 ease-in-out"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
  >
    <!-- LOGO / EN-TÊTE -->
    <div class="p-4 border-b border-gray-100 flex justify-between items-center shrink-0">
      <router-link to="/" class="flex-1 flex justify-center lg:justify-start">
        <img
          :src="padciLogo"
          alt="PADCI Formation"
          class="h-16 lg:h-20 w-auto object-contain cursor-pointer"
        />
      </router-link>

      <!-- Bouton fermer (Mobile) -->
      <button @click="$emit('close')" class="lg:hidden text-gray-500 hover:text-red-500 p-2">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- NAVIGATION -->
    <nav class="flex-1 overflow-y-auto py-4 custom-scrollbar">

      <!-- Dashboard -->
      <div class="px-3 mb-4">
        <router-link
          to="/formations/network/dashboard"
          class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
          :class="{ 'bg-primary/10 text-primary': isActive('/formations/network/dashboard') }"
          @click="$emit('close')"
        >
          <LayoutDashboardIcon class="group-hover:scale-110 transition-transform" :size="20" />
          <span>Tableau de bord</span>
        </router-link>
      </div>

      <!-- SECTION CHAPITRES (CCNA 200-301) -->
      <div class="mb-2 px-4">
        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Programme CCNA</p>
      </div>

      <div class="space-y-1 px-3">

        <!-- AJOUT ICI : L'INTRODUCTION -->
        <router-link to="/formations/network/introduction" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/network/introduction') }" @click="$emit('close')">
          <InfoIcon class="group-hover:scale-110 transition-transform" :size="20" />
          <div class="flex flex-col flex-1">
            <span class="truncate">Introduction</span>
            <span class="text-[10px] text-gray-400 group-hover:text-primary/70">Bienvenue & Méthode</span>
          </div>
        </router-link>

        <!-- Chapitre 1 -->
        <router-link to="/formations/network/chapitre1" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/network/chapitre1') }" @click="$emit('close')">
          <LayersIcon class="group-hover:scale-110 transition-transform" :size="20" />
          <div class="flex flex-col flex-1">
            <span class="truncate">1. Fondamentaux</span>
            <span class="text-[10px] text-gray-400 group-hover:text-primary/70">20% de l'examen</span>
          </div>
        </router-link>

        <!-- Chapitre 2 -->
        <router-link to="/formations/network/chapitre2" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/network/chapitre2') }" @click="$emit('close')">
          <GitBranchIcon class="group-hover:scale-110 transition-transform" :size="20" />
          <div class="flex flex-col flex-1">
            <span class="truncate">2. Accès réseau (VLAN)</span>
            <span class="text-[10px] text-gray-400 group-hover:text-primary/70">20% de l'examen</span>
          </div>
        </router-link>

        <!-- Chapitre 3 -->
        <router-link to="/formations/network/chapitre3" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/network/chapitre3') }" @click="$emit('close')">
          <NetworkIcon class="group-hover:scale-110 transition-transform" :size="20" />
          <div class="flex flex-col flex-1">
            <span class="truncate">3. Connectivité IP</span>
            <span class="text-[10px] text-gray-400 group-hover:text-primary/70">25% de l'examen</span>
          </div>
          <span class="ml-auto text-[10px] bg-primary text-white px-1.5 py-0.5 rounded font-bold">Clé</span>
        </router-link>

        <!-- Chapitre 4 -->
        <router-link to="/formations/network/chapitre4" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/network/chapitre4') }" @click="$emit('close')">
          <ServerIcon class="group-hover:scale-110 transition-transform" :size="20" />
          <div class="flex flex-col flex-1">
            <span class="truncate">4. Services IP</span>
            <span class="text-[10px] text-gray-400 group-hover:text-primary/70">10% de l'examen</span>
          </div>
        </router-link>

        <!-- Chapitre 5 -->
        <router-link to="/formations/network/chapitre5" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/network/chapitre5') }" @click="$emit('close')">
          <ShieldHalfIcon class="group-hover:scale-110 transition-transform" :size="20" />
          <div class="flex flex-col flex-1">
            <span class="truncate">5. Sécurité</span>
            <span class="text-[10px] text-gray-400 group-hover:text-primary/70">15% de l'examen</span>
          </div>
        </router-link>

        <!-- Chapitre 6 -->
        <router-link to="/formations/network/chapitre6" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/network/chapitre6') }" @click="$emit('close')">
          <BotIcon class="group-hover:scale-110 transition-transform" :size="20" />
          <div class="flex flex-col flex-1">
            <span class="truncate">6. Automatisation</span>
            <span class="text-[10px] text-gray-400 group-hover:text-primary/70">10% de l'examen</span>
          </div>
        </router-link>
      </div>

      <!-- SECTION PRATIQUE -->
      <div class="border-t border-gray-100 my-4"></div>
      <div class="mb-2 px-4">
        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pratique & Examen</p>
      </div>

      <div class="space-y-1 px-3">
        <!-- Packet Tracer -->
        <router-link to="/formations/network/tp" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/network/tp') }" @click="$emit('close')">
          <LaptopIcon class="group-hover:scale-110 transition-transform" :size="20" />
          <span>Travaux Pratiques (TP)</span>
        </router-link>

        <!-- Préparation Examen -->
        <router-link to="/formations/network/examen" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/network/examen') }" @click="$emit('close')">
          <AwardIcon class="group-hover:scale-110 transition-transform" :size="20" />
          <span>Préparation Examen</span>
        </router-link>

        <!-- Annexes -->
        <router-link to="/formations/network/annexes" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/network/annexes') }" @click="$emit('close')">
          <BookOpenTextIcon class="group-hover:scale-110 transition-transform" :size="20" />
          <span>Annexes & Glossaire</span>
        </router-link>
      </div>

      <!-- RETOUR ACCUEIL -->
      <div class="border-t border-gray-100 my-4"></div>
      <div class="px-3">
        <router-link to="/" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-500 hover:bg-gray-100 transition-all duration-200" @click="$emit('close')">
          <LogOutIcon :size="20" />
          <span>Retour à l'accueil</span>
        </router-link>
      </div>
    </nav>

    <!-- FOOTER PROGRESSION -->
    <div class="p-4 border-t border-gray-100 shrink-0">
      <div class="bg-secondary/10 rounded-lg p-3">
        <div class="flex justify-between items-center mb-1">
          <p class="text-xs font-bold text-gray-700">Progression CCNA</p>
          <p class="text-xs font-bold text-primary">15%</p>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div class="bg-primary h-2 rounded-full transition-all duration-500" style="width: 15%"></div>
        </div>
        <p class="text-[10px] text-center text-gray-500 mt-2">Chapitre 1 en cours</p>
      </div>
    </div>

  </aside>
</template>

<script setup lang="ts">
import { AwardIcon, BookOpenTextIcon, BotIcon, GitBranchIcon, InfoIcon, LaptopIcon, LayersIcon, LayoutDashboardIcon, LogOutIcon, NetworkIcon, ServerIcon, ShieldHalfIcon } from '@lucide/vue'
import { useRoute } from 'vue-router'
import padciLogo from '@/assets/images/logodepadci.png'

// Props pour le contrôle mobile
defineProps<{
  isOpen: boolean
}>()

// Émission pour fermer le menu sur mobile
const emit = defineEmits(['close'])

const route = useRoute()

// Fonction pour vérifier le lien actif
const isActive = (path: string) => {
  return route.path === path
}
</script>

<style scoped>
/* Scrollbar personnalisée */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #225095;
  border-radius: 4px;
}

/* Animation au survol du logo */
img {
  transition: transform 0.3s ease;
}
img:hover {
  transform: scale(1.05);
}
</style>
