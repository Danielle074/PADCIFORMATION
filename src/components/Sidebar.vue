<template>
  <!-- OVERLAY MOBILE (uniquement sur mobile/tablette quand la sidebar est ouverte) -->
  <div
    v-if="isOpen"
    @click="$emit('close')"
    class="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
  ></div>

  <!-- SIDEBAR (Fixe sur Desktop, Coulissante sur Mobile/Tablette) -->
  <aside
    class="fixed left-0 top-0 h-screen w-64 bg-white shadow-xl flex flex-col z-50 transform transition-transform duration-300 ease-in-out"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
  >
    <!-- LOGO ET BOUTON FERMER (Mobile) -->
    <div class="p-4 border-b border-gray-100 flex justify-between items-center shrink-0">
      <router-link to="/" class="flex-1 flex justify-center lg:justify-start">
        <img
          :src="padciLogo"
          alt="PADCI Formation"
          class="h-16 lg:h-20 w-auto object-contain cursor-pointer"
        />
      </router-link>

      <!-- Bouton fermer (visible uniquement sur mobile/tablette) -->
      <button
        @click="$emit('close')"
        class="lg:hidden text-gray-500 hover:text-red-500 p-2"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- NAVIGATION PRINCIPALE -->
    <nav class="flex-1 overflow-y-auto py-4 custom-scrollbar">
      <div class="px-4 mb-4">
        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Menu principal</p>
      </div>

      <div class="space-y-1 px-3">
        <!-- Dashboard -->
        <router-link
          to="/formations/dashboard"
          class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
          :class="{ 'bg-primary/10 text-primary': isActive('/formations/dashboard') }"
          @click="$emit('close')"
        >
          <i class='bx bxs-dashboard text-xl group-hover:scale-110 transition-transform'></i>
          <span>Tableau de bord</span>
        </router-link>

        <!-- SECTION MODULE 1 -->
        <div class="mt-4 mb-2">
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3">Module 1 - Éducation routière</p>
        </div>

        <router-link to="/formations/modules1" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/modules1') }" @click="$emit('close')">
          <i class='bx bx-traffic-cone text-xl group-hover:scale-110 transition-transform'></i>
          <span class="truncate">Chapitre 1: Code de la route</span>
          <span class="ml-auto text-xs bg-secondary text-white px-2 py-0.5 rounded-full">Nouveau</span>
        </router-link>

        <router-link to="/formations/chapitre2" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/chapitre2') }" @click="$emit('close')">
          <i class='bx bx-signal-5 text-xl group-hover:scale-110 transition-transform'></i>
          <span class="truncate">Chapitre 2: Les panneaux et signaux</span>
        </router-link>

        <router-link to="/formations/chapitre3" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/chapitre3') }" @click="$emit('close')">
          <i class='bx bxs-motorcycle text-xl group-hover:scale-110 transition-transform'></i>
          <span class="truncate">Chapitre 3: Comportement et sécurité</span>
        </router-link>

        <router-link to="/formations/chapitre4" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/chapitre4') }" @click="$emit('close')">
          <i class='bx bxs-shield text-xl group-hover:scale-110 transition-transform'></i>
          <span class="truncate">Chapitre 4: Étude de cas</span>
        </router-link>

        <router-link to="/formations/chapitre5" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/chapitre5') }" @click="$emit('close')">
          <i class='bx bxs-map text-xl group-hover:scale-110 transition-transform'></i>
          <span class="truncate">Chapitre 5: Les 5 Étapes</span>
        </router-link>

        <router-link to="/formations/chapitre6" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/chapitre6') }" @click="$emit('close')">
          <i class='bx bxs-first-aid text-xl group-hover:scale-110 transition-transform'></i>
          <span class="truncate">Chapitre 6: Activités interactives</span>
        </router-link>

        <router-link to="/formations/chapitre7" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/chapitre7') }" @click="$emit('close')">
          <i class='bx bxs-graduation text-xl group-hover:scale-110 transition-transform'></i>
          <span class="truncate">Chapitre 7: Résumé</span>
        </router-link>

        <!-- SECTION AUTRES MODULES -->
        <div class="border-t border-gray-100 my-4"></div>
        <div class="mb-2">
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3">Autres ressources</p>
        </div>

        <router-link to="/formations/exercices" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/exercices') }" @click="$emit('close')">
          <i class='bx bxs-pencil text-xl group-hover:scale-110 transition-transform'></i>
          <span>Exercices pratiques</span>
        </router-link>

        <router-link to="/formations/evaluations" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/evaluations') }" @click="$emit('close')">
          <i class='bx bxs-bar-chart-alt-2 text-xl group-hover:scale-110 transition-transform'></i>
          <span>Évaluations</span>
        </router-link>

        <!-- Admin Dashboard -->
        <div class="border-t border-gray-100 my-4"></div>
        <router-link to="/admin/dashboard" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/admin/dashboard') }" @click="$emit('close')">
          <i class='bx bxs-dashboard text-xl group-hover:scale-110 transition-transform'></i>
          <span>Admin Dashboard</span>
        </router-link>

        <router-link to="/superadmin/dashboard" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/superadmin/dashboard') }" @click="$emit('close')">
          <i class='bx bxs-dashboard text-xl group-hover:scale-110 transition-transform'></i>
          <span>SuperAdmin Dashboard</span>
        </router-link>

        <!-- Retour -->
        <div class="border-t border-gray-100 my-4"></div>
        <router-link to="/" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-500 hover:bg-gray-100 transition-all duration-200" @click="$emit('close')">
          <i class='bx bx-exit text-xl'></i>
          <span>Retour à l'accueil</span>
        </router-link>
      </div>
    </nav>

    <!-- FOOTER SIDEBAR -->
    <div class="p-4 border-t border-gray-100 shrink-0">
      <div class="bg-secondary/10 rounded-lg p-3">
        <p class="text-xs text-gray-600 mb-1">Progression Module 1</p>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div class="bg-primary h-2 rounded-full" style="width: 15%"></div>
        </div>
        <p class="text-xs text-right text-gray-500 mt-1">1/7 chapitres complétés</p>
      </div>
      <p class="text-[10px] text-gray-400 text-center mt-2">Version 1.0.0</p>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import padciLogo from '@/assets/images/logodepadci.png'

// Définition des props (gérées par le Layout parent)
defineProps<{
  isOpen: boolean
}>()

// Définition de l'événement pour fermer la sidebar (géré par le Layout parent)
const emit = defineEmits(['close'])

const route = useRoute()

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
