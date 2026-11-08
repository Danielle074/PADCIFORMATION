<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- CONTENU PRINCIPAL -->
    <section class="px-4 md:px-6 py-8 max-w-4xl mx-auto w-full">
      <!-- BLOC PADCI – Certificats en construction -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <!-- En-tête avec dégradé (couleurs PADCI) -->
        <div
          class="text-white p-8 text-center relative overflow-hidden"
          style="background: linear-gradient(135deg, var(--color-primary) 0%, #1a3a6b 100%);"
        >
          <!-- Décoration d'arrière-plan -->
          <div class="absolute inset-0 opacity-10">
            <i class="bx bxs-certificate absolute text-9xl -right-10 -top-10"></i>
            <i class="bx bxs-certificate absolute text-8xl -left-10 -bottom-10"></i>
            <i class="bx bxs-book-open absolute text-7xl right-20 bottom-0 opacity-20"></i>
          </div>

          <!-- Icône principale PADCI -->
          <div class="relative mb-4">
            <div
              class="w-24 h-24 rounded-full mx-auto flex items-center justify-center backdrop-blur-sm"
              style="background: linear-gradient(135deg, var(--color-secondary), var(--color-tertiary)); box-shadow: 0 8px 32px rgba(224, 123, 0, 0.3);"
            >
              <span class="text-3xl font-black text-white tracking-wider">PADCI</span>
            </div>
          </div>

          <h1 class="text-3xl md:text-4xl font-bold mb-2 relative">
            Programme d’Accréditation
          </h1>
          <div class="relative">
            <span
              class="inline-block px-4 py-1 rounded-full text-sm font-bold"
              style="background: var(--color-tertiary); color: var(--color-primary);"
            >
              🚧 Certificats en cours de déploiement
            </span>
          </div>
        </div>

        <!-- Corps de la page -->
        <div class="p-8">
          <!-- Message principal -->
          <div class="text-center max-w-2xl mx-auto">
            <!-- Animation de construction -->
            <div class="flex justify-center items-center gap-4 mb-8">
              <div class="relative">
                <div
                  class="w-16 h-16 rounded-full animate-ping absolute"
                  style="background: var(--color-tertiary); opacity: 0.3;"
                ></div>
                <div
                  class="w-16 h-16 rounded-full flex items-center justify-center relative"
                  style="background: var(--color-primary);"
                >
                  <i class="bx bxs-certificate text-3xl text-white"></i>
                </div>
              </div>
              <div class="text-4xl font-bold text-gray-300">+</div>
              <div class="relative">
                <div
                  class="w-16 h-16 rounded-full animate-ping absolute"
                  style="background: var(--color-secondary); opacity: 0.3; animation-delay: 0.5s;"
                ></div>
                <div
                  class="w-16 h-16 rounded-full flex items-center justify-center relative"
                  style="background: var(--color-secondary);"
                >
                  <i class="bx bxs-construction text-3xl text-white"></i>
                </div>
              </div>
            </div>

            <h2 class="text-2xl font-bold text-gray-800 mb-4">
              Les certificats PADCI arrivent bientôt !
            </h2>

            <p class="text-gray-600 mb-6">
              Le <span style="color: var(--color-primary); font-weight: 600;">Programme PADCI</span>
              vous délivrera des attestations officielles pour chaque module validé.
              Un système sécurisé de certificats numériques est actuellement mis en place
              pour valoriser vos compétences acquises.
            </p>

            <!-- Fonctionnalités à venir (spécifiques PADCI) -->
            <div
              class="rounded-xl p-6 mb-8"
              style="background: var(--color-quaternary);"
            >
              <h3
                class="font-bold mb-4 flex items-center justify-center gap-2"
                style="color: var(--color-primary);"
              >
                <i class="bx bx-gift"></i>
                <span>Ce que vous offre le programme PADCI</span>
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div class="flex items-start gap-3">
                  <div
                    class="rounded-full p-1 mt-0.5"
                    style="background: var(--color-secondary);"
                  >
                    <i class="bx bx-check text-white"></i>
                  </div>
                  <div>
                    <p class="font-medium text-gray-800">Certificats officiels</p>
                    <p class="text-sm text-gray-600">Générés automatiquement après chaque module</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div
                    class="rounded-full p-1 mt-0.5"
                    style="background: var(--color-secondary);"
                  >
                    <i class="bx bx-check text-white"></i>
                  </div>
                  <div>
                    <p class="font-medium text-gray-800">Téléchargement PDF</p>
                    <p class="text-sm text-gray-600">Format imprimable et partageable</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div
                    class="rounded-full p-1 mt-0.5"
                    style="background: var(--color-secondary);"
                  >
                    <i class="bx bx-check text-white"></i>
                  </div>
                  <div>
                    <p class="font-medium text-gray-800">QR Code unique</p>
                    <p class="text-sm text-gray-600">Pour vérifier l’authenticité</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div
                    class="rounded-full p-1 mt-0.5"
                    style="background: var(--color-secondary);"
                  >
                    <i class="bx bx-check text-white"></i>
                  </div>
                  <div>
                    <p class="font-medium text-gray-800">Historique complet</p>
                    <p class="text-sm text-gray-600">Tous vos certificats en un endroit</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Barre de progression -->
            <div class="max-w-md mx-auto mb-6">
              <div class="flex justify-between text-sm text-gray-600 mb-2">
                <span>Développement des certificats</span>
                <span class="font-bold" style="color: var(--color-primary);">80 %</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div
                  class="h-3 rounded-full"
                  style="width: 80%; background: linear-gradient(90deg, var(--color-secondary), var(--color-tertiary));"
                ></div>
              </div>
            </div>

            <!-- Date de lancement -->
            <div
              class="inline-flex items-center gap-3 rounded-full px-6 py-3 mb-8"
              style="background: var(--color-quaternary);"
            >
              <i
                class="bx bx-calendar-star text-2xl"
                style="color: var(--color-primary);"
              ></i>
              <span class="text-gray-700">
                <span class="font-bold">Lancement prévu :</span> 30 avril 2026
              </span>
            </div>

            <!-- Bouton de notification -->
            <button
              @click="showNotification"
              class="w-full md:w-auto text-white px-8 py-3 rounded-lg font-bold hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2 mx-auto"
              style="background: var(--color-secondary);"
            >
              <i class="bx bx-bell"></i>
              <span>M’avertir du lancement</span>
            </button>
          </div>
        </div>

        <!-- Pied de page avec navigation -->
        <div class="border-t p-6" style="border-color: var(--color-quaternary); background: #f8f9fc;">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <RouterLink
              to="/formations/dashboard"
              class="flex items-center gap-2 bg-white px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all border w-full md:w-auto justify-center"
              style="border-color: var(--color-primary); color: var(--color-primary);"
            >
              <i class="bx bx-arrow-back text-xl"></i>
              <span>Retour au tableau de bord</span>
            </RouterLink>

            <RouterLink
              to="/formations/modules1"
              class="flex items-center gap-2 text-white px-6 py-3 rounded-lg font-bold hover:scale-105 transition-all w-full md:w-auto justify-center"
              style="background: var(--color-primary); box-shadow: 0 4px 16px rgba(39, 78, 143, 0.3);"
            >
              <i class="bx bx-book-open text-xl"></i>
              <span>Continuer la formation</span>
            </RouterLink>
          </div>

          <!-- Note -->
          <p class="text-center text-xs text-gray-500 mt-4">
            Les certificats seront disponibles pour tous les modules du programme PADCI
          </p>
        </div>
      </div>

      <!-- Aperçu de ce que sera le certificat -->
      <div class="mt-6 bg-white rounded-xl shadow-md p-6 border-2 border-dashed" style="border-color: var(--color-quaternary);">
        <div class="text-center mb-4">
          <span class="text-sm text-gray-500">APERÇU (MAQUETTE)</span>
        </div>
        <div class="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg border border-gray-200 max-w-md mx-auto opacity-50">
          <div class="text-center">
            <i class="bx bxs-certificate text-5xl" style="color: var(--color-primary);"></i>
            <div class="h-4 w-32 bg-gray-200 rounded mx-auto my-2"></div>
            <div class="h-3 w-48 bg-gray-200 rounded mx-auto"></div>
            <div class="border-t border-gray-200 my-3"></div>
            <div class="h-2 w-40 bg-gray-200 rounded mx-auto"></div>
            <div class="h-2 w-32 bg-gray-200 rounded mx-auto mt-1"></div>
          </div>
          <div class="text-center mt-3">
            <span class="text-xs text-gray-400">Exemple de design</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const showNotification = () => {
  alert('✅ Merci ! Vous serez notifié par email lors du lancement des certificats PADCI.')
}
</script>

<style scoped>
/* Variables CSS */


/* Animations */
@keyframes ping {
  75%, 100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* Animation pour l'icône principale */
.bxs-certificate {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

/* Boutons */
button, .router-link {
  transition: all 0.3s ease;
}
</style>
