<template>
  <div class="min-h-screen flex flex-col md:flex-row relative">


    <div
      class="flex w-full md:w-1/2 items-center justify-center bg-quaternary order-2 md:order-1 py-8 px-5"
    >
      <div class="w-full max-w-md">
        <div class="flex flex-col items-center mb-6">
          <img :src="formLogo" alt="Bipia" class="w-44 h-auto mb-3" />
        </div>

        <form class="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email professionnel"
              class="w-full px-5 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition"
            />
          </div>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              placeholder="Mot de passe"
              class="w-full px-5 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition pr-12"
            />
            <button
              type="button"
              @click="togglePassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
            >
              <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            </button>
          </div>

          <div class="flex items-center justify-between text-sm sm:text-base text-gray-600">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" class="rounded text-primary focus:ring-primary w-4 h-4" />
              <span>Rester connecté</span>
            </label>
            <a href="#" class="text-primary hover:underline">Mot de passe oublié ?</a>
          </div>

          <router-link
            to="/accueil"
            class="w-full inline-block text-center bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold transition transform hover:scale-[1.02] text-base sm:text-lg"
          >
            Se connecter
          </router-link>
        </form>

        <p class="text-center text-sm sm:text-base mt-4">
          <span class="text-gray-600">Vous n'avez pas de compte ?</span>
          <router-link to="/inscription" class="text-primary font-semibold hover:underline ml-1">
            Inscrivez-vous
          </router-link>
        </p>

        <p class="text-center text-gray-500 text-sm mt-6 leading-tight">
         PADCI Formation - Tous droits réservés © 2024
        </p>
      </div>
    </div>

    <div
      class="w-full md:w-1/2 relative overflow-hidden order-1 md:order-2 min-h-[250px] md:min-h-screen"
      style="background-color: var(--color-tertiary);"
    >
      <img :src="loginImage" alt="Bipia" class="w-full h-full object-cover opacity-90" />
      <div class="absolute inset-0 bg-black/40z-10"></div>

      <div class="absolute inset-0 z-20 flex items-center justify-center md:hidden px-4">
        <div class="text-center text-white">
          <img :src="formLogo" alt="PADCI Formation" class="w-20 h-auto mx-auto mb-2 opacity-90" />
          <h2 class="text-xl font-bold">PADCI Formation</h2>
          <p class="text-sm opacity-90">Formation professionnelle de qualité</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import formLogo from "@/assets/images/logodepadci.png"      // Remplacez par votre logo Bipia
import loginImage from "@/assets/images/photologinpadci.jpg" // Votre image de fond

const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<style scoped>
input:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(13, 124, 65, 0.2); /* ombre avec la couleur primary */
}
</style>
