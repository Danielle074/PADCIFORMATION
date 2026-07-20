<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Contenu principal avec marge pour le sidebar -->
    <div class="ml-64">
      <!-- Header avec profil -->
      <header class="bg-white shadow-sm sticky top-0 z-40">
        <div class="flex justify-end items-center px-6 py-3">
          <!-- Notifications -->
          <button class="relative mr-4 p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-full transition-all">
            <i class='bx bxs-bell text-2xl'></i>
            <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <!-- Menu profil avec sous-menu -->
          <div class="relative" ref="profileMenu">
            <!-- Bouton profil -->
            <button
              @click="toggleProfileMenu"
              class="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-all duration-200"
            >
              <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                {{ userInitials }}
              </div>
              <div class="text-left">
                <p class="text-sm font-semibold text-gray-800">{{ userName }}</p>
                <p class="text-xs text-gray-500">{{ userRole }}</p>
              </div>
              <i class='bx bx-chevron-down text-xl text-gray-500' :class="{ 'rotate-180': isProfileMenuOpen }"></i>
            </button>

            <!-- Sous-menu déroulant -->
            <div
              v-if="isProfileMenuOpen"
              class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
            >
              <!-- En-tête du sous-menu -->
              <div class="px-4 py-3 border-b border-gray-100">
                <p class="text-sm font-semibold text-gray-800">{{ userName }}</p>
                <p class="text-xs text-gray-500">{{ userEmail }}</p>
              </div>

              <!-- Liens du sous-menu -->
              <div class="py-2">
                <!-- Voir le profil -->
                <router-link
                  to="/profil"
                  class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                  @click="closeProfileMenu"
                >
                  <i class='bx bxs-user text-lg'></i>
                  <span>Voir mon profil</span>
                </router-link>

                <!-- Modifier le profil -->
                <router-link
                  to="/profil/modifier"
                  class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                  @click="closeProfileMenu"
                >
                  <i class='bx bxs-edit text-lg'></i>
                  <span>Modifier mon profil</span>
                </router-link>

                <!-- Paramètres -->
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
                <p class="text-xs text-gray-400">Version 1.0.0</p>
              </div>
            </div>
          </div>
        </div>


      </header>

     <main class="">
  <router-view />
</main>

      <!-- Footer (optionnel) -->
      <footer class="ml-64 py-4 px-6 text-center text-sm text-gray-500 border-t border-gray-200">
        <p>&copy; 2024 POLI Formation - Éducation routière en Côte d'Ivoire. Tous droits réservés.</p>
      </footer>
    </div>

    <!-- Overlay pour fermer le menu quand on clique dehors -->
    <div
      v-if="isProfileMenuOpen"
      @click="closeProfileMenu"
      class="fixed inset-0 z-30"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'

const router = useRouter()
const profileMenu = ref(null)
const isProfileMenuOpen = ref(false)

// Données de l'utilisateur (à remplacer par tes vraies données)
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

// Progression du cours (à ajuster selon le module actif)
const showCourseProgress = ref(true)
const currentModuleProgress = ref(65) // Pourcentage

// Fonctions pour le menu profil
const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value
}

const closeProfileMenu = () => {
  isProfileMenuOpen.value = false
}

// Fonction de déconnexion
const handleLogout = () => {
  // Ici tu peux ajouter ta logique de déconnexion
  // (vider le localStorage, appeler une API, etc.)
  console.log('Déconnexion...')

  // Redirection vers la page de connexion
  router.push('/connexion')

  // Fermer le menu
  closeProfileMenu()
}

// Gestion du clic en dehors du menu
const handleClickOutside = (event) => {
  if (profileMenu.value && !profileMenu.value.contains(event.target)) {
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
/* Animation pour le chevron */
.bx-chevron-down {
  transition: transform 0.3s ease;
}

.rotate-180 {
  transform: rotate(180deg);
}

/* Animation pour le sous-menu */
.profile-menu-enter-active,
.profile-menu-leave-active {
  transition: all 0.2s ease;
}

.profile-menu-enter-from,
.profile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Style pour le header */
header {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.95);
}

/* Animation pour les liens du sous-menu */
a, button {
  transition: all 0.2s ease;
}
</style>
