<template>
  <aside class="fixed left-0 top-0 h-screen w-64 bg-white shadow-xl flex flex-col z-50">
    <!-- Logo POLI avec l'image -->
  <div class="p-4 border-b border-gray-100 flex justify-center">
  <router-link to="/">
    <img
      :src="padciLogo"
      alt="PADCI Formation"
      class="h-20 w-auto object-contain cursor-pointer"
    />
  </router-link>
</div>

    <!-- Navigation principale -->
    <nav class="flex-1 overflow-y-auto py-4">
      <div class="px-4 mb-4">
        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Menu principal</p>
      </div>

      <!-- Liens de cours -->
      <div class="space-y-1 px-3">
        <!-- Dashboard -->
        <router-link to="/formations/dashboard" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/dashboard') }">
          <i class='bx bxs-dashboard text-xl group-hover:scale-110 transition-transform'></i>
          <span>Tableau de bord</span>
        </router-link>

        <!-- SECTION MODULE 1 - Éducation routière -->
        <div class="mt-4 mb-2">
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3">Module 1 - Éducation routière</p>
        </div>

        <!-- Chapitre 1 -->
        <router-link to="/formations/modules1" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/modules1') }">
          <i class='bx bx-traffic-cone text-xl group-hover:scale-110 transition-transform'></i>
          <span>Chapitre 1: Code de la route</span>
          <span class="ml-auto text-xs bg-secondary text-white px-2 py-0.5 rounded-full">Nouveau</span>
        </router-link>

        <!-- Chapitre 2 -->
        <router-link to="/formations/chapitre2" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/chapitre2') }">
          <i class='bx bx-signal-5 text-xl group-hover:scale-110 transition-transform'></i>
          <span>Chapitre 2: Les panneaux et signauxde circulation</span>
        </router-link>

        <!-- Chapitre 3 -->
        <router-link to="/formations/chapitre3" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/chapitre3') }">
          <i class='bx bxs-motorcycle text-xl group-hover:scale-110 transition-transform'></i>
          <span>Chapitre 3: Comportement et sécurité sur la route</span>
        </router-link>

        <!-- Chapitre 4 -->
        <router-link to="/formations/chapitre4" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/chapitre4') }">
          <i class='bx bxs-shield text-xl group-hover:scale-110 transition-transform'></i>
          <span>Chapitre 4: Étude de cas</span>
        </router-link>

        <!-- Chapitre 5 -->
        <router-link to="/formations/chapitre5" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/chapitre5') }">
          <i class='bx bxs-map text-xl group-hover:scale-110 transition-transform'></i>
          <span>Chapitre 5: Les 5 Etapes Après un accident</span>
        </router-link>

        <!-- Chapitre 6 -->
        <router-link to="/formations/chapitre6" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/chapitre6') }">
          <i class='bx bxs-first-aid text-xl group-hover:scale-110 transition-transform'></i>
          <span>Chapitre 6: Activités interactives</span>
        </router-link>

        <!-- Chapitre 7 -->
        <router-link to="/formations/chapitre7" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/chapitre7') }">
          <i class='bx bxs-graduation text-xl group-hover:scale-110 transition-transform'></i>
          <span>Chapitre 7: Résumé</span>
          <span class="ml-auto text-xs bg-secondary text-white px-2 py-0.5 rounded-full">Récapitulatif</span>
        </router-link>

        <!-- SECTION AUTRES MODULES -->
        <div class="border-t border-gray-100 my-4"></div>
        <div class="mb-2">
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3">Autres ressources</p>
        </div>
        <!-- Exercices -->
        <router-link to="/formations/exercices" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/exercices') }">
          <i class='bx bxs-pencil text-xl group-hover:scale-110 transition-transform'></i>
          <span>Exercices pratiques</span>
        </router-link>

        <!-- Évaluations -->
        <router-link to="/formations/evaluations" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/formations/evaluations') }">
          <i class='bx bxs-bar-chart-alt-2 text-xl group-hover:scale-110 transition-transform'></i>
          <span>Évaluations</span>
        </router-link>

        <!-- Admin Dashboard -->
        <router-link to="/admin/dashboard" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/admin/dashboard') }">
          <i class='bx bxs-dashboard text-xl group-hover:scale-110 transition-transform'></i>
          <span>Admin Dashboard</span>
        </router-link>
         <router-link to="/superadmin/dashboard" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group" :class="{ 'bg-primary/10 text-primary': isActive('/admin/dashboard') }">
          <i class='bx bxs-dashboard text-xl group-hover:scale-110 transition-transform'></i>
          <span>SuperAdmin Dashboard</span>
        </router-link>

        <!-- Séparateur -->
        <div class="border-t border-gray-100 my-4"></div>

        <!-- Retour à l'accueil générale -->
        <router-link to="/" class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-500 hover:bg-gray-100 transition-all duration-200">
          <i class='bx bx-exit text-xl'></i>
          <span>Retour à l'accueil</span>
        </router-link>
      </div>
    </nav>

    <!-- Footer du sidebar -->
    <div class="p-4 border-t border-gray-100">
      <div class="bg-secondary/10 rounded-lg p-3">
        <p class="text-xs text-gray-600 mb-1">Progression Module 1</p>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div class="bg-primary h-2 rounded-full" style="width: 15%"></div>
        </div>
        <p class="text-xs text-right text-gray-500 mt-1">1/7 chapitres complétés</p>
      </div>

      <!-- Version -->
      <p class="text-[10px] text-gray-400 text-center mt-2">Version 1.0.0</p>
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'
import padciLogo from '@/assets/images/logodepadci.png'

const route = useRoute()

const isActive = (path) => {
  return route.path === path
}
</script>

<style scoped>
/* Animation pour les liens */

/* Scrollbar personnalisée */
aside ::-webkit-scrollbar {
  width: 4px;
}

aside ::-webkit-scrollbar-track {
  background: #f1f1f1;
}

aside ::-webkit-scrollbar-thumb {
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
