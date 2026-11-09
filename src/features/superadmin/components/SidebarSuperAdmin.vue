<template>
  <!-- OVERLAY MOBILE (pour fermer la sidebar en cliquant à côté) -->
  <div
    v-if="isOpen"
    @click="$emit('close')"
    class="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm transition-opacity"
  ></div>

  <!-- ================= SIDEBAR SUPER ADMIN ================= -->
  <aside
    class="fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 shadow-xl lg:shadow-none transform transition-transform duration-300 ease-in-out flex flex-col"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
  >
    <!-- LOGO / EN-TÊTE SIDEBAR -->
    <div class="flex items-center justify-between h-20 px-6 border-b border-gray-100 shrink-0">
      <router-link to="/superadmin/dashboard" class="flex items-center gap-3 group w-full">

        <!-- TON LOGO ICI -->
        <img
          :src="logoImage"
          alt="Logo EMSP"
          class="h-10 w-auto object-contain group-hover:scale-105 transition-transform"
        />

        
      </router-link>

      <!-- Bouton fermer mobile -->
      <button @click="$emit('close')" class="lg:hidden text-gray-500 hover:text-red-500 p-1">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- MENU DE NAVIGATION -->
    <div class="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">

      <!-- ================= SECTION 1 : PILOTAGE STRATÉGIQUE ================= -->
      <p class="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Pilotage Stratégique</p>

      <!-- Lien Dashboard Global -->
      <router-link
        to="/superadmin/dashboard"
        class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
        :class="isActive('/superadmin/dashboard') ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-orange-600'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span>Vue Globale PADCI</span>
      </router-link>

      <!-- Lien Budget & Finance -->
      <router-link
        to="/superadmin/finance"
        class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
        :class="isActive('/superadmin/finance') ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-orange-600'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Budget & Décaissements</span>
      </router-link>

      <!-- Lien Validation ANO -->
      <router-link
        to="/superadmin/ano"
        class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
        :class="isActive('/superadmin/ano') ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-orange-600'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Validation des ANO</span>
        <!-- Badge d'alerte -->
        <span class="ml-auto bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">3</span>
      </router-link>

      <!-- Séparateur -->
      <div class="my-4 border-t border-gray-100"></div>

      <!-- ================= SECTION 2 : SUPERVISION DU PROJET ================= -->
      <p class="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Supervision</p>

      <!-- Lien Cohortes -->
      <router-link
        to="/superadmin/cohortes"
        class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
        :class="isActive('/superadmin/cohortes') ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-orange-600'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <span>Supervision Cohortes</span>
      </router-link>

      <!-- Lien Rapports & KPIs -->
      <router-link
        to="/superadmin/rapports"
        class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
        :class="isActive('/superadmin/rapports') ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-orange-600'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span>Rapports & KPIs</span>
      </router-link>

      <!-- Séparateur -->
      <div class="my-4 border-t border-gray-100"></div>

      <!-- ================= SECTION 3 : ADMINISTRATION ================= -->
      <p class="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Administration</p>

      <!-- Lien Gestion des rôles -->
      <router-link
        to="/superadmin/utilisateurs"
        class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
        :class="isActive('/superadmin/utilisateurs') ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-orange-600'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <span>Gestion des Accès</span>
      </router-link>

    </div>

    <!-- PROFIL SUPER ADMIN (Bas de la sidebar) -->
    <div class="p-4 border-t border-gray-100 bg-gray-50/50 shrink-0">
      <div class="flex items-center gap-3 p-2 rounded-xl hover:bg-white transition cursor-pointer border border-transparent hover:border-gray-200 group">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-[color:var(--color-primary-shade)] flex items-center justify-center text-white font-bold shadow-md shrink-0">
          SA
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold text-gray-800 truncate">{{ auth.user?.name }}</p>
          <p class="text-xs text-gray-500 truncate">{{ auth.user?.email }}</p>
        </div>
        <!-- Icône déconnexion -->
        <button @click="handleLogout" title="Se déconnecter" class="text-gray-400 hover:text-red-500 transition p-1 rounded-lg hover:bg-red-50">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'
import logoImage from '@/assets/images/logoemsp.png'
import { useAuthStore } from '@/stores/auth'
import { useLogout } from '@/features/auth/composables/useLogout'

// Props pour gérer l'ouverture/fermeture depuis le layout parent
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

// Émission de l'événement pour fermer la sidebar sur mobile
const emit = defineEmits(['close'])

const route = useRoute()
const auth = useAuthStore()
const logout = useLogout()

// Fonction pour vérifier si un lien est actif
const isActive = (path) => {
  return route.path.startsWith(path)
}

const handleLogout = async () => {
  await logout()
}
</script>

<style scoped>
/* Personnalisation de la scrollbar pour la sidebar */
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--color-primary);
}
</style>
