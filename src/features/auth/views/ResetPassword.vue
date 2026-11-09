<template>
  <div class="min-h-screen flex flex-col md:flex-row relative">
    <!-- ================= FORMULAIRE (GAUCHE) ================= -->
    <div
      class="flex w-full md:w-1/2 items-center justify-center order-2 md:order-1 py-10 px-5 bg-white relative overflow-hidden"
    >
      <!-- Bulles décoratives floutées -->
      <div
        class="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-float-slow"
      ></div>
      <div
        class="absolute -bottom-32 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none animate-float-slow"
        style="animation-delay: 2s"
      ></div>

      <div class="w-full max-w-md relative z-10 animate-fade-in-up">
        <!-- Bouton Retour (seulement si pas en succès) -->
        <router-link
          v-if="!isSuccess"
          to="/"
          class="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition group font-medium text-sm"
        >
          <svg
            class="w-5 h-5 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Retour à la connexion
        </router-link>

        <!-- Logo + Titre -->
        <div class="flex flex-col items-center mb-8">
          <img :src="formLogo" alt="PADCI Formation" class="w-36 h-auto mb-4" />

          <!-- ÉTAT 1 : FORMULAIRE -->
          <template v-if="!isSuccess">
            <h1 class="text-2xl font-bold text-gray-800">Nouveau mot de passe</h1>
            <p class="text-gray-500 text-sm mt-2 text-center">
              Créez un nouveau mot de passe sécurisé pour votre compte.
            </p>
          </template>

          <!-- ÉTAT 2 : SUCCÈS -->
          <template v-else>
            <div
              class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce"
            >
              <svg
                class="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 class="text-2xl font-bold text-gray-800">Mot de passe modifié !</h1>
            <p class="text-gray-500 text-sm mt-2 text-center">
              Votre mot de passe a été réinitialisé avec succès.<br />Vous pouvez maintenant vous
              connecter.
            </p>
          </template>
        </div>

        <!-- FORMULAIRE -->
        <form v-if="!isSuccess" @submit.prevent="handleSubmit" class="space-y-5">
          <!-- Nouveau mot de passe -->
          <div class="relative group">
            <span
              class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="Nouveau mot de passe"
              class="w-full pl-12 pr-12 py-3.5 text-base border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-primary/15 focus:border-primary focus:outline-none transition-all duration-300"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors p-1 rounded-lg hover:bg-primary/10"
            >
              <svg
                v-if="!showPassword"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            </button>
          </div>

          <!-- Confirmer mot de passe -->
          <div class="relative group">
            <span
              class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </span>
            <input
              v-model="form.passwordConfirmation"
              :type="showConfirmPassword ? 'text' : 'password'"
              required
              placeholder="Confirmer le mot de passe"
              class="w-full pl-12 pr-12 py-3.5 text-base border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-primary/15 focus:border-primary focus:outline-none transition-all duration-300"
              :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/15': mismatch }"
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors p-1 rounded-lg hover:bg-primary/10"
            >
              <svg
                v-if="!showConfirmPassword"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            </button>
          </div>

          <!-- Message d'erreur -->
          <div
            v-if="errorMessage"
            class="flex items-center gap-2 text-sm text-red-500 bg-red-50 p-3 rounded-lg"
          >
            <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {{ errorMessage }}
          </div>

          <!-- Bouton Soumettre -->
          <button
            type="submit"
            :disabled="isPending"
            class="group w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-bright hover:from-primary-shade hover:to-primary text-white py-3.5 rounded-xl font-semibold text-base shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <svg
              v-if="isPending"
              class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span v-if="!isPending">Réinitialiser le mot de passe</span>
            <span v-else>Enregistrement...</span>

            <svg
              v-if="!isPending"
              class="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
        </form>

        <!-- ÉTAT SUCCÈS : BOUTON RETOUR LOGIN -->
        <div v-else class="space-y-4 mt-6">
          <router-link
            to="/"
            class="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-bright hover:from-primary-shade hover:to-primary text-white py-3.5 rounded-xl font-semibold text-base shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            Se connecter maintenant
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
          </router-link>
        </div>

        <!-- Copyright -->
        <p class="text-center text-gray-400 text-xs mt-10 tracking-wide">
          PADCI Formation — Tous droits réservés © 2024
        </p>
      </div>
    </div>

    <!-- ================= IMAGE (DROITE) ================= -->
    <div
      class="w-full md:w-1/2 relative overflow-hidden order-1 md:order-2 min-h-[250px] md:min-h-screen"
    >
      <img :src="loginImage" alt="PADCI Formation" class="w-full h-full object-cover" />

      <!-- Dégradé vert transparent -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-primary/50 via-primary/30 to-primary-deep/50"
      ></div>

      <!-- Overlay desktop -->
      <div
        class="hidden md:flex absolute inset-0 z-20 flex-col justify-center items-center px-10 text-center text-white"
      >
        <div class="max-w-md animate-fade-in-up drop-shadow-lg">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4 leading-tight">Nouveau départ</h2>
          <p class="text-base lg:text-lg opacity-90 leading-relaxed">
            Choisissez un mot de passe robuste pour protéger vos données et votre parcours de
            formation.
          </p>

          <div class="mt-8 flex items-center justify-center gap-6 text-sm opacity-90">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Chiffré
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Fiable
            </div>
          </div>
        </div>
      </div>

      <!-- Overlay mobile -->
      <div class="absolute inset-0 z-20 flex items-center justify-center md:hidden px-4">
        <div class="text-center text-white drop-shadow-lg">
          <h2 class="text-xl font-bold">PADCI Formation</h2>
          <p class="text-sm opacity-90">Sécurisation du compte</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ApiError } from '@/api/http'
import formLogo from '@/assets/images/logoemsp.png'
import loginImage from '@/assets/images/photodecybersecurite.jpg'
import { useResetPassword } from '../composables/useResetPassword'

const route = useRoute()

const reset = useResetPassword()

// Le lien de l'email pointe ici avec ?token=…&email=… (voir
// ResetPasswordNotification côté backend) : les deux paramètres pré-remplissent
// le formulaire. `email` reste éditable, le jeton est caché mais requis.
const token = ref(typeof route.query.token === 'string' ? route.query.token : '')
const form = reactive({
  email: typeof route.query.email === 'string' ? route.query.email : '',
  password: '',
  passwordConfirmation: '',
})
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Validation en temps réel : si les deux champs sont remplis et ne correspondent pas
const mismatch = computed(() => {
  return form.passwordConfirmation.length > 0 && form.password !== form.passwordConfirmation
})
const errorMessage = ref('')

const isPending = computed(() => reset.isPending.value)
const isSuccess = computed(() => reset.isSuccess.value)

const handleSubmit = async () => {
  errorMessage.value = ''

  if (form.password.length < 8) {
    errorMessage.value = 'Le mot de passe doit contenir au moins 8 caractères.'
    return
  }

  if (mismatch.value) {
    errorMessage.value = 'Les mots de passe ne correspondent pas.'
    return
  }

  if (!token.value) {
    errorMessage.value =
      'Jeton de réinitialisation manquant dans le lien. Redemandez un e-mail de réinitialisation.'
    return
  }

  try {
    await reset.mutateAsync({
      email: form.email,
      token: token.value,
      password: form.password,
      password_confirmation: form.passwordConfirmation,
    })
  } catch (error) {
    errorMessage.value = error instanceof ApiError ? error.message : 'Une erreur est survenue.'
  }
}
</script>

<style scoped>
/* Apparition douce */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.7s ease-out both;
}

/* Mouvement lent des bulles */
@keyframes floatSlow {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(20px, -20px);
  }
}
.animate-float-slow {
  animation: floatSlow 8s ease-in-out infinite;
}
</style>
