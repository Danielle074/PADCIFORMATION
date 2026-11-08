<template>
  <div class="min-h-screen flex flex-col md:flex-row relative">

    <!-- ================= FORMULAIRE (GAUCHE) ================= -->
    <div class="flex w-full md:w-1/2 items-center justify-center order-2 md:order-1 py-10 px-5 bg-white relative overflow-hidden">

      <!-- Bulles décoratives floutées -->
      <div class="absolute -top-32 -left-32 w-96 h-96 bg-[#198341]/10 rounded-full blur-3xl pointer-events-none animate-float-slow"></div>
      <div class="absolute -bottom-32 -right-20 w-96 h-96 bg-[#198341]/5 rounded-full blur-3xl pointer-events-none animate-float-slow" style="animation-delay: 2s;"></div>

      <div class="w-full max-w-md relative z-10 animate-fade-in-up">

        <!-- Bouton Retour -->
        <router-link
          to="/"
          class="inline-flex items-center gap-2 text-gray-500 hover:text-[#198341] mb-6 transition group font-medium text-sm"
        >
          <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour à la connexion
        </router-link>

        <!-- Logo + Titre -->
        <div class="flex flex-col items-center mb-8">
          <img :src="formLogo" alt="PADCI Formation" class="w-36 h-auto mb-4" />

          <!-- ÉTAT 1 : FORMULAIRE -->
          <template v-if="!isSubmitted">
            <h1 class="text-2xl font-bold text-gray-800">Mot de passe oublié ?</h1>
            <p class="text-gray-500 text-sm mt-2 text-center">
              Entrez votre adresse email professionnelle. Nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>
          </template>

          <!-- ÉTAT 2 : SUCCÈS -->
          <template v-else>
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
              <svg class="w-8 h-8 text-[#198341]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 class="text-2xl font-bold text-gray-800">Email envoyé !</h1>
            <p class="text-gray-500 text-sm mt-2 text-center">
              Un lien de réinitialisation a été envoyé à <br/>
              <strong class="text-gray-800">{{ email }}</strong>.
            </p>
          </template>
        </div>

        <!-- FORMULAIRE -->
        <form v-if="!isSubmitted" @submit.prevent="handleSubmit" class="space-y-5">

          <div class="relative group">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#198341] transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <input
              v-model="email"
              type="email"
              required
              placeholder="Email professionnel"
              class="w-full pl-12 pr-5 py-3.5 text-base border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-[#198341]/15 focus:border-[#198341] focus:outline-none transition-all duration-300"
            />
          </div>

          <!-- Bouton Soumettre -->
          <button
            type="submit"
            :disabled="isLoading"
            class="group w-full inline-flex items-center justify-center gap-2
                   bg-gradient-to-r from-[#198341] to-[#22a854]
                   hover:from-[#146b34] hover:to-[#198341]
                   text-white py-3.5 rounded-xl font-semibold text-base
                   shadow-lg shadow-[#198341]/30 hover:shadow-xl hover:shadow-[#198341]/40
                   transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0
                   disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-if="!isLoading">Envoyer le lien</span>
            <span v-else>Envoi en cours...</span>

            <svg v-if="!isLoading" class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>

        <!-- ÉTAT SUCCÈS : BOUTON RETOUR LOGIN -->
        <div v-else class="space-y-4">
          <router-link
            to="/"
            class="w-full inline-flex items-center justify-center gap-2
                   bg-gradient-to-r from-[#198341] to-[#22a854]
                   hover:from-[#146b34] hover:to-[#198341]
                   text-white py-3.5 rounded-xl font-semibold text-base
                   shadow-lg shadow-[#198341]/30 hover:shadow-xl hover:shadow-[#198341]/40
                   transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            Retour à la connexion
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </router-link>

          <button
            @click="isSubmitted = false"
            class="w-full text-center text-sm text-gray-500 hover:text-[#198341] transition-colors"
          >
            Vous n'avez pas reçu l'email ? Réessayer
          </button>
        </div>

        <!-- Copyright -->
        <p class="text-center text-gray-400 text-xs mt-10 tracking-wide">
          PADCI Formation — Tous droits réservés © 2024
        </p>
      </div>
    </div>

    <!-- ================= IMAGE (DROITE) ================= -->
    <div class="w-full md:w-1/2 relative overflow-hidden order-1 md:order-2 min-h-[250px] md:min-h-screen">

      <img :src="loginImage" alt="PADCI Formation" class="w-full h-full object-cover" />

      <!-- Dégradé vert transparent -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#198341]/50 via-[#198341]/30 to-[#0f5229]/50"></div>

      <!-- Overlay desktop -->
      <div class="hidden md:flex absolute inset-0 z-20 flex-col justify-center items-center px-10 text-center text-white">
        <div class="max-w-md animate-fade-in-up drop-shadow-lg">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4 leading-tight">Sécurisez votre accès</h2>
          <p class="text-base lg:text-lg opacity-90 leading-relaxed">
            Ne vous inquiétez pas, nous allons vous aider à retrouver votre compte en toute sécurité.
          </p>

          <div class="mt-8 flex items-center justify-center gap-6 text-sm opacity-90">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Sécurisé
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Confidentiel
            </div>
          </div>
        </div>
      </div>

      <!-- Overlay mobile -->
      <div class="absolute inset-0 z-20 flex items-center justify-center md:hidden px-4">
        <div class="text-center text-white drop-shadow-lg">
          <h2 class="text-xl font-bold">PADCI Formation</h2>
          <p class="text-sm opacity-90">Récupération de compte</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import formLogo from "@/assets/images/logoemsp.png"
import loginImage from "@/assets/images/photodecybersecurite.jpg"

// États du formulaire
const email = ref('')
const isLoading = ref(false)
const isSubmitted = ref(false)

// Fonction de soumission
const handleSubmit = () => {
  if (!email.value) return

  isLoading.value = true

  // Simulation d'un appel API (à remplacer par ton vrai backend)
  setTimeout(() => {
    isLoading.value = false
    isSubmitted.value = true
  }, 1500) // 1.5 seconde de chargement
}
</script>

<style scoped>
/* Apparition douce */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fadeInUp 0.7s ease-out both; }

/* Mouvement lent des bulles */
@keyframes floatSlow {
  0%, 100% { transform: translate(0, 0); }
  50%      { transform: translate(20px, -20px); }
}
.animate-float-slow { animation: floatSlow 8s ease-in-out infinite; }
</style>
