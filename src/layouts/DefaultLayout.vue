<template>
  <div class="min-h-screen bg-gray-50 flex overflow-hidden">

    <!-- ================= SIDEBAR ================= -->
    <!-- On passe isOpen et @close à ta Sidebar existante -->
    <Sidebar
      :is-open="isSidebarOpen"
      @close="isSidebarOpen = false"
    />

    <!-- ================= CONTENU PRINCIPAL ================= -->
    <!-- Le lg:pl-64 pousse le contenu à droite uniquement sur PC -->
    <div class="flex-1 flex flex-col min-h-screen transition-all duration-300 lg:pl-64 w-full">

      <!-- HEADER -->
      <header class="bg-white shadow-sm sticky top-0 z-30 h-16 flex items-center justify-between px-4 sm:px-6">
        <!-- Bouton Hamburger (Mobile & Tablette) -->
        <div class="flex items-center gap-4">
          <button
            @click="isSidebarOpen = true"
            class="lg:hidden text-gray-600 hover:text-primary p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <!-- Titre de la page (Optionnel) -->
          <h2 class="text-lg font-bold text-gray-800 hidden sm:block">Espace Apprenant</h2>
        </div>

        <!-- Actions Droite (Notifications + Profil) -->
        <div class="flex items-center gap-2 sm:gap-4">
          <!-- Notifications -->
          <button class="relative p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-full transition-all">
            <i class='bx bxs-bell text-2xl'></i>
            <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <!-- Menu profil avec sous-menu -->
          <div class="relative" ref="profileMenu">
            <!-- Bouton profil -->
            <button
              @click="toggleProfileMenu"
              class="flex items-center gap-2 sm:gap-3 hover:bg-gray-50 rounded-lg p-1.5 sm:p-2 transition-all duration-200"
            >
              <div class="w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-sm">
                {{ userInitials }}
              </div>

              <!-- Textes (Cachés sur très petits écrans) -->
              <div class="text-left hidden md:block">
                <p class="text-sm font-semibold text-gray-800 leading-tight">{{ userName }}</p>
                <p class="text-xs text-gray-500">{{ userRole }}</p>
              </div>

              <i class='bx bx-chevron-down text-xl text-gray-500 transition-transform duration-300' :class="{ 'rotate-180': isProfileMenuOpen }"></i>
            </button>

            <!-- Sous-menu déroulant -->
            <div
              v-if="isProfileMenuOpen"
              class="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in"
            >
              <!-- En-tête du sous-menu -->
              <div class="px-4 py-3 border-b border-gray-100">
                <p class="text-sm font-bold text-gray-800">{{ userName }}</p>
                <p class="text-xs text-gray-500 truncate">{{ userEmail }}</p>
              </div>

              <!-- Liens du sous-menu -->
              <div class="py-2">
                <router-link
                  to="/profil"
                  class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                  @click="closeProfileMenu"
                >
                  <i class='bx bxs-user text-lg'></i>
                  <span>Voir mon profil</span>
                </router-link>

                <router-link
                  to="/parametres"
                  class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                  @click="closeProfileMenu"
                >
                  <i class='bx bxs-cog text-lg'></i>
                  <span>Paramètres</span>
                </router-link>

                <!-- Séparateur -->
                <div class="border-t border-gray-100 my-2"></div>

                <!-- Déconnexion -->
                <button
                  @click="handleLogout"
                  class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-all duration-200"
                >
                  <i class='bx bxs-log-out text-lg'></i>
                  <span>Se déconnecter</span>
                </button>
              </div>

              <!-- Version de l'application -->
              <div class="px-4 py-2 border-t border-gray-100">
                <p class="text-[10px] text-gray-400 text-center">Version 1.0.0</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- CONTENU DE LA PAGE (Router View) -->
      <main class="flex-1 p-4 sm:p-6 lg:p-8">
        <router-view />
      </main>

      <!-- FOOTER -->
      <footer class="py-4 px-6 text-center text-xs sm:text-sm text-gray-500 border-t border-gray-200 bg-white">
        <p>&copy; 2024 PADCI Formation - Éducation routière en Côte d'Ivoire. Tous droits réservés.</p>
      </footer>
    </div>

    <!-- Overlay pour fermer le menu profil quand on clique dehors -->
    <div
      v-if="isProfileMenuOpen"
      @click="closeProfileMenu"
      class="fixed inset-0 z-20"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue' // Ou le nom de ton composant SidebarApprenant

const router = useRouter()
const profileMenu = ref<HTMLElement | null>(null)
const isProfileMenuOpen = ref(false)

// ==================== ÉTAT SIDEBAR MOBILE ====================
const isSidebarOpen = ref(false)

// ==================== DONNÉES UTILISATEUR ====================
const userName = ref('Kouassi Jean-Baptiste')
const userEmail = ref('jeanbaptiste.k@example.com')
const userRole = ref('Apprenant')

// Initiales de l'utilisateur
const userInitials = computed(() => {
  return userName.value
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
})

// ==================== GESTION DU MENU PROFIL ====================
const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value
}

const closeProfileMenu = () => {
  isProfileMenuOpen.value = false
}

const handleLogout = () => {
  console.log('Déconnexion...')
  closeProfileMenu()
  router.push('/') // Redirection vers la page de login
}

// Gestion du clic en dehors du menu
const handleClickOutside = (event: MouseEvent) => {
  if (profileMenu.value && !profileMenu.value.contains(event.target as Node)) {
    closeProfileMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Animation pour le sous-menu */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.2s ease-out both;
}

/* Style pour le header avec effet de flou (Glassmorphism) */
header {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.95);
}
</style>
