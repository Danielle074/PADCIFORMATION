<template>
  <div class="min-h-screen bg-gray-50 flex overflow-hidden">
    <!-- OVERLAY MOBILE -->
    <div
      v-if="isSidebarOpen"
      @click="isSidebarOpen = false"
      class="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
    ></div>

    <!-- ================= SIDEBAR APPRENANT DYNAMIQUE ================= -->
    <aside
      class="fixed left-0 top-0 h-screen w-64 bg-white shadow-xl flex flex-col z-50 transform transition-transform duration-300 ease-in-out"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
    >
      <!-- LOGO ET FERMETURE MOBILE -->
      <div class="p-4 border-b border-gray-100 flex justify-between items-center shrink-0">
        <router-link to="/formations/dashboard" class="flex-1 flex items-center gap-2">
          <img :src="padciLogo" alt="PADCI LMS" class="h-10 w-auto object-contain cursor-pointer" />
          <span class="font-bold text-gray-800 text-sm">PADCI LMS</span>
        </router-link>
        <button
          @click="isSidebarOpen = false"
          class="lg:hidden text-gray-500 hover:text-red-500 p-2"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- NAVIGATION PRINCIPALE -->
      <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-4 custom-scrollbar">
        <!-- MENU GLOBAL -->
        <div class="space-y-1">
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
            Espace Apprenant
          </p>
          <router-link
            to="/formations/dashboard"
            class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-gray-700 hover:bg-primary/10 hover:text-primary transition"
            :class="{ 'bg-primary/10 text-primary font-bold': isActive('/formations/dashboard') }"
            @click="isSidebarOpen = false"
          >
            <LayoutDashboardIcon :size="18" />
            <span>Tableau de bord</span>
          </router-link>

          <router-link
            to="/mes-candidatures"
            class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-gray-700 hover:bg-primary/10 hover:text-primary transition"
            :class="{ 'bg-primary/10 text-primary font-bold': isActive('/mes-candidatures') }"
            @click="isSidebarOpen = false"
          >
            <FileTextIcon :size="18" />
            <span>Mes candidatures</span>
          </router-link>

          <router-link
            to="/catalogue"
            class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-gray-700 hover:bg-primary/10 hover:text-primary transition"
            :class="{ 'bg-primary/10 text-primary font-bold': isActive('/catalogue') }"
            @click="isSidebarOpen = false"
          >
            <CompassIcon :size="18" />
            <span>Catalogue</span>
          </router-link>
        </div>

        <!-- OUTLINE DYNAMIQUE DE LA FORMATION OUVERTE -->
        <div
          v-if="activeCourseKey && courseOutline"
          class="pt-4 border-t border-gray-100 space-y-3"
        >
          <div class="px-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary"
              >Formation en cours</span
            >
            <p class="text-xs font-bold text-gray-800 line-clamp-1 mt-0.5">
              {{ courseOutline.title }}
            </p>
          </div>

          <div class="space-y-3">
            <div v-for="module in courseOutline.modules" :key="module.key" class="space-y-1">
              <p class="text-xs font-semibold text-gray-400 px-3 uppercase tracking-wide">
                {{ module.title }}
              </p>
              <div class="space-y-0.5">
                <router-link
                  v-for="ch in module.chapters"
                  :key="ch.key"
                  :to="ch.locked ? '#' : `/formations/${activeCourseKey}/chapitres/${ch.key}`"
                  class="flex items-center justify-between gap-2 px-3 py-1.5 text-xs rounded-lg transition"
                  :class="[
                    isActive(`/formations/${activeCourseKey}/chapitres/${ch.key}`)
                      ? 'bg-primary/10 text-primary font-bold'
                      : 'text-gray-600 hover:bg-gray-50',
                    ch.locked ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
                  ]"
                  @click="!ch.locked && (isSidebarOpen = false)"
                >
                  <span class="truncate">{{ ch.title }}</span>
                  <span
                    v-if="ch.progress?.status === 'completed'"
                    class="text-green-600 text-xs shrink-0"
                    >✓</span
                  >
                  <span v-else-if="ch.locked" class="text-gray-400 text-xs shrink-0">🔒</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- COMPTE / PARAMÈTRES -->
        <div class="pt-4 border-t border-gray-100 space-y-1">
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
            Compte
          </p>
          <router-link
            to="/profil"
            class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-gray-700 hover:bg-primary/10 hover:text-primary transition"
            :class="{ 'bg-primary/10 text-primary font-bold': isActive('/profil') }"
            @click="isSidebarOpen = false"
          >
            <UserIcon :size="18" />
            <span>Mon profil</span>
          </router-link>

          <router-link
            to="/parametres"
            class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-gray-700 hover:bg-primary/10 hover:text-primary transition"
            :class="{ 'bg-primary/10 text-primary font-bold': isActive('/parametres') }"
            @click="isSidebarOpen = false"
          >
            <SettingsIcon :size="18" />
            <span>Paramètres</span>
          </router-link>
        </div>
      </nav>

      <!-- UTILISATEUR EN BAS -->
      <div class="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div class="flex items-center gap-2 overflow-hidden">
          <div
            class="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center text-xs shrink-0"
          >
            {{ userInitials }}
          </div>
          <div class="truncate text-left">
            <p class="text-xs font-bold text-gray-800 truncate">
              {{ auth.user?.name || 'Apprenant' }}
            </p>
            <p class="text-[10px] text-gray-500 truncate">{{ auth.user?.email }}</p>
          </div>
        </div>
        <button
          @click="logout"
          title="Se déconnecter"
          class="text-gray-400 hover:text-red-600 p-1 rounded-lg transition"
        >
          <LogOutIcon :size="16" />
        </button>
      </div>
    </aside>

    <!-- ================= CONTENU PRINCIPAL ================= -->
    <div class="flex-1 flex flex-col min-h-screen transition-all duration-300 lg:pl-64 w-full">
      <!-- HEADER -->
      <header
        class="bg-white shadow-sm sticky top-0 z-30 h-16 flex items-center justify-between px-4 sm:px-6"
      >
        <div class="flex items-center gap-4">
          <button
            @click="isSidebarOpen = true"
            class="lg:hidden text-gray-600 hover:text-primary p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h2 class="text-lg font-bold text-gray-800 hidden sm:block">Espace Apprenant PADCI</h2>
        </div>

        <div class="flex items-center gap-3">
          <router-link
            to="/catalogue"
            class="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition"
          >
            <CompassIcon :size="14" />
            <span>Catalogue</span>
          </router-link>
          <div
            class="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center text-xs"
          >
            {{ userInitials }}
          </div>
        </div>
      </header>

      <!-- PAGE PRINCIPALE -->
      <main class="flex-1 p-4 sm:p-6 lg:p-8">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Compass as CompassIcon,
  FileText as FileTextIcon,
  LayoutDashboard as LayoutDashboardIcon,
  LogOut as LogOutIcon,
  Settings as SettingsIcon,
  User as UserIcon,
} from '@lucide/vue'
import padciLogo from '@/assets/images/logodepadci.png'
import { useAuthStore } from '@/stores/auth'
import { useLogout } from '@/features/auth/composables/useLogout'
import { useCourseOutline } from '../composables/useLearningCourse'

const route = useRoute()
const auth = useAuthStore()
const logout = useLogout()

const isSidebarOpen = ref(false)

const activeCourseKey = computed(() => {
  const param = route.params.courseKey
  return param ? String(param) : null
})

const { data: courseOutline } = useCourseOutline(activeCourseKey)

function isActive(path: string): boolean {
  return route.path === path || route.path.startsWith(path + '/')
}

const userInitials = computed(() => {
  const name = auth.user?.name ?? ''
  return (
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') || 'AP'
  )
})
</script>
