<template>
  <div class="flex h-screen bg-gray-50 font-sans overflow-hidden">

    <!-- OVERLAY MOBILE -->
    <div v-if="isSidebarOpen" @click="isSidebarOpen = false" class="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm"></div>

    <!-- SIDEBAR ADMIN PADCI -->
    <aside
      class="fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 shadow-xl lg:shadow-none transform transition-transform duration-300 ease-in-out flex flex-col"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
    >
      <!-- LOGO / EN-TÊTE -->
      <div class="flex items-center justify-between h-20 px-4 border-b border-gray-100">
        <router-link to="/admin/dashboard" class="flex items-center gap-3 w-full">
          <!-- Remplacement du bloc "P" par l'image de votre logo -->
          <img
            :src="logoImage"
            alt="Logo EMSP"
            class="h-10 w-auto object-contain"
          />
          <!-- Texte PADCI à côté du logo (optionnel) -->
          <div>
            <h2 class="text-lg font-bold text-gray-800 leading-tight">PADCI</h2>
            <p class="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Admin DTC</p>
          </div>
        </router-link>

        <button @click="isSidebarOpen = false" class="lg:hidden text-gray-500 hover:text-red-500">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <!-- MENU -->
      <div class="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <p class="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Pilotage du Projet</p>

        <!-- Dashboard -->
        <router-link to="/admin/dashboard" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200" :class="$route.path === '/admin/dashboard' ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          <span>Tableau de bord</span>
        </router-link>

        <!-- Gestion des Formateurs / Candidats -->
        <router-link to="/admin/candidatures" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200" :class="$route.path === '/admin/candidatures' ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          <span>Candidatures (200)</span>
          <!-- Badge des nouvelles demandes -->
          <span class="ml-auto bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">45</span>
        </router-link>

        <!-- Répartition par Filière -->
        <router-link to="/admin/cohortes" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200" :class="$route.path === '/admin/cohortes' ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          <span>Gestion des Cohortes</span>
        </router-link>

        <!-- Rapports & KPIs -->
        <router-link to="/admin/rapports" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200" :class="$route.path === '/admin/rapports' ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          <span>Rapports & KPIs</span>
        </router-link>

        <!-- Paramètres -->
        <router-link to="/admin/parametres" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-primary">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <span>Paramètres</span>
        </router-link>
      </div>

      <!-- PROFIL ADMIN -->
      <div class="p-4 border-t border-gray-100 bg-gray-50/50">
        <div class="flex items-center gap-3 p-2 rounded-xl hover:bg-white transition cursor-pointer border border-transparent hover:border-gray-200">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-bright flex items-center justify-center text-white font-bold shadow-md">AD</div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-gray-800 truncate">Admin UCP</p>
            <p class="text-xs text-gray-500 truncate">admin@padci.ci</p>
          </div>
          <button class="text-gray-400 hover:text-red-500 transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
        </div>
      </div>
    </aside>

    <!-- CONTENU PRINCIPAL (avec Slot) -->
    <div class="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all duration-300">
      <!-- Header fixe -->
      <header class="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 shadow-sm sticky top-0 z-10">
        <div class="flex items-center gap-4">
          <button @click="isSidebarOpen = true" class="lg:hidden text-gray-500 hover:text-primary focus:outline-none transition">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <h1 class="text-lg font-bold text-gray-800 hidden sm:block">Espace Administrateur - PADCI</h1>
        </div>
      </header>

      <!-- Router View -->
      <main class="flex-1 p-4 sm:p-6 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// Importation du logo EMSP
// (Assurez-vous d'avoir placé l'image dans le dossier src/assets/images/)
import logoImage from '@/assets/images/logoemsp.png'

const isSidebarOpen = ref(false)
</script>
