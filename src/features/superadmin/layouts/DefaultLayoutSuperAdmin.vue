<template>
  <div class="flex h-screen bg-gray-50 font-sans overflow-hidden">

    <!-- Import de ta nouvelle sidebar -->
    <SidebarSuperAdmin
      :is-open="isSidebarOpen"
      @close="isSidebarOpen = false"
    />

    <div class="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all duration-300">

      <!-- Header fixe -->
      <header class="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 shadow-sm sticky top-0 z-10 shrink-0">
        <div class="flex items-center gap-4">
          <!-- Bouton Hamburger Mobile -->
          <button @click="isSidebarOpen = true" class="lg:hidden text-gray-500 hover:text-orange-600 focus:outline-none transition p-1">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <h1 class="text-lg font-bold text-gray-800 hidden sm:block">Espace Super Administrateur - PADCI</h1>
        </div>
      </header>

      <!-- Zone de contenu -->
      <main class="flex-1 p-4 sm:p-6 overflow-y-auto">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SidebarSuperAdmin from '@/features/superadmin/components/SidebarSuperAdmin.vue'

const isSidebarOpen = ref(false)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
