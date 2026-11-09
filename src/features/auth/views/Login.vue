<template>
  <div class="min-h-screen flex flex-col md:flex-row relative">

    <!-- ================= FORMULAIRE ================= -->
    <div class="flex w-full md:w-1/2 items-center justify-center order-2 md:order-1 py-10 px-5 bg-white relative overflow-hidden">

      <!-- Bulles décoratives floutées -->
      <div class="absolute -top-32 -left-32 w-96 h-96 bg-[#198341]/10 rounded-full blur-3xl pointer-events-none animate-float-slow"></div>
      <div class="absolute -bottom-32 -right-20 w-96 h-96 bg-[#198341]/5 rounded-full blur-3xl pointer-events-none animate-float-slow" style="animation-delay: 2s;"></div>

      <div class="w-full max-w-md relative z-10 animate-fade-in-up">

        <!-- Logo + Titre -->
        <div class="flex flex-col items-center mb-8">
          <img :src="formLogo" alt="PADCI Formation" class="w-40 h-auto mb-4" />
          <h1 class="text-2xl font-bold text-gray-800">Bienvenue</h1>
          <p class="text-gray-500 text-sm mt-1">Connectez-vous à votre espace</p>
        </div>

        <p
          v-if="formError && !unverified"
          role="alert"
          class="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3"
        >
          {{ formError }}
        </p>

        <!-- Retour de vérification : l'API consomme le lien signé de l'email et
             renvoie le navigateur ici avec ?verified=1
             (EmailVerificationController côté backend) -->
        <p
          v-if="emailVerified"
          class="mb-4 rounded-lg bg-green-50 border border-[#198341]/30 text-[#198341] text-sm px-4 py-3"
        >
          Adresse vérifiée ✓ — vous pouvez vous connecter.
        </p>

        <!-- Lien de vérification consommé mais invalide ou expiré
             (EmailVerificationController::failure → /connexion?error=…).
             Demander un nouveau lien, ne pas laisser croire à une
             "mauvaise identification". -->
        <p
          v-if="verifyError"
          class="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3"
        >
          Lien de vérification invalide ou expiré. Identifiez-vous : vous pourrez
          redemander un e-mail de vérification.
        </p>

        <!-- Compte existant mais email non vérifié : le 403
             AUTH_EMAIL_NOT_VERIFIED de /auth/login est intercepté ici plutôt
             qu'affiché comme une "mauvaise identification". -->
        <div
          v-if="unverified"
          role="alert"
          class="mb-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm px-4 py-3"
        >
          <p>Adresse email non vérifiée — consultez votre boîte mail.</p>
          <button
            v-if="!resendDone"
            type="button"
            :disabled="resendPending"
            class="mt-2 font-medium text-[#198341] hover:underline disabled:opacity-60"
            @click="resendLink"
          >
            {{ resendPending ? 'Envoi en cours…' : "Renvoyer l'e-mail de vérification" }}
          </button>
          <p v-else class="mt-1 font-medium text-[#198341]">E-mail de vérification renvoyé ✓</p>
        </div>

        <!-- ================= ÉTAPE MOT DE PASSE ================= -->
        <form v-if="challengeToken === null" class="space-y-5" @submit.prevent="submitLogin">

          <!-- Email -->
          <div class="relative group">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#198341] transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <label for="login-email" class="sr-only">Email professionnel</label>
            <input
              id="login-email"
              v-model="email"
              type="email"
              autocomplete="email"
              required
              placeholder="Email professionnel"
              class="w-full pl-12 pr-5 py-3.5 text-base border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder:text-gray-400
                     focus:bg-white focus:ring-4 focus:ring-[#198341]/15 focus:border-[#198341] focus:outline-none transition-all duration-300"
            />
          </div>

          <!-- Mot de passe -->
          <div class="relative group">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#198341] transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            <label for="login-password" class="sr-only">Mot de passe</label>
            <input
              id="login-password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              required
              placeholder="Mot de passe"
              class="w-full pl-12 pr-12 py-3.5 text-base border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder:text-gray-400
                     focus:bg-white focus:ring-4 focus:ring-[#198341]/15 focus:border-[#198341] focus:outline-none transition-all duration-300"
            />
            <button
              type="button"
              @click="togglePassword"
              :aria-label="showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#198341] transition-colors p-1 rounded-lg hover:bg-[#198341]/10"
            >
              <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            </button>
          </div>

          <!-- Options -->
          <div class="flex items-center justify-between text-sm text-gray-600">
            <router-link to="/mot-de-passe-oublie" class="text-[#198341] font-medium hover:underline transition-colors">
              Mot de passe oublié ?
            </router-link>
          </div>

          <!-- Bouton -->
          <button
            type="submit"
            :disabled="isPending"
            class="group w-full inline-flex items-center justify-center gap-2
                   bg-gradient-to-r from-[#198341] to-[#22a854]
                   hover:from-[#146b34] hover:to-[#198341]
                   text-white py-3.5 rounded-xl font-semibold text-base
                   shadow-lg shadow-[#198341]/30 hover:shadow-xl hover:shadow-[#198341]/40
                   transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0
                   disabled:opacity-60 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
          >
            {{ isPending ? 'Connexion…' : 'Se connecter' }}
            <svg v-if="!isPending" class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </form>

        <!-- ================= ÉTAPE MFA ================= -->
        <form v-else class="space-y-5" @submit.prevent="submitMfaCode">
          <p class="text-sm text-gray-600">
            Saisissez le code à 6 chiffres de votre application d'authentification,
            ou un de vos codes de récupération.
          </p>
          <div>
            <label for="mfa-code" class="sr-only">Code de vérification</label>
            <input
              id="mfa-code"
              v-model="mfaCode"
              type="text"
              inputmode="numeric"
              autocomplete="one-time-code"
              required
              placeholder="123456"
              class="w-full px-5 py-3.5 text-center text-lg tracking-widest border border-gray-200 rounded-xl bg-gray-50 text-gray-800
                     focus:bg-white focus:ring-4 focus:ring-[#198341]/15 focus:border-[#198341] focus:outline-none transition-all duration-300"
            />
          </div>
          <button
            type="submit"
            :disabled="isPending"
            class="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#198341] to-[#22a854]
                   hover:from-[#146b34] hover:to-[#198341] text-white py-3.5 rounded-xl font-semibold text-base
                   shadow-lg shadow-[#198341]/30 transition-all duration-300
                   disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {{ isPending ? 'Vérification…' : 'Valider' }}
          </button>
        </form>

        <!-- Lien inscription -->
        <p class="text-center text-sm mt-6">
          <span class="text-gray-600">Vous n'avez pas de compte ?</span>
          <router-link to="/inscription" class="text-[#198341] font-semibold hover:underline ml-1">
            Inscrivez-vous
          </router-link>
        </p>

        <!-- Copyright -->
        <p class="text-center text-gray-400 text-xs mt-8 tracking-wide">
          PADCI Formation — Tous droits réservés © 2024
        </p>
      </div>
    </div>

    <!-- ================= IMAGE ================= -->
    <div class="w-full md:w-1/2 relative overflow-hidden order-1 md:order-2 min-h-[250px] md:min-h-screen">

      <img :src="loginImage" alt="PADCI Formation" class="w-full h-full object-cover" />

      <!-- Dégradé vert plus transparent par-dessus l'image -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#198341]/50 via-[#198341]/30 to-[#0f5229]/50"></div>

      <!-- Overlay desktop -->
      <div class="hidden md:flex absolute inset-0 z-20 flex-col justify-center items-center px-10 text-center text-white">
        <div class="max-w-md animate-fade-in-up drop-shadow-lg">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4 leading-tight">PADCI Formation</h2>
          <p class="text-base lg:text-lg opacity-90 leading-relaxed">
            Formation professionnelle de qualité pour bâtir votre avenir.
          </p>

          <div class="mt-8 flex items-center justify-center gap-6 text-sm opacity-90">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
              Certifié
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
              Reconnu
            </div>
          </div>
        </div>
      </div>

      <!-- Overlay mobile -->
      <div class="absolute inset-0 z-20 flex items-center justify-center md:hidden px-4">
        <div class="text-center text-white drop-shadow-lg">
          <h2 class="text-xl font-bold">PADCI Formation</h2>
          <p class="text-sm opacity-90">Formation professionnelle de qualité</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import formLogo from "@/assets/images/logoemsp.png"
import loginImage from "@/assets/images/photodecybersecurite.jpg"
import { ApiError } from '@/api/http'
import { useLogin } from '../composables/useLogin'
import { useMfaChallenge } from '../composables/useMfaChallenge'
import { useResendVerification } from '../composables/useResendVerification'

const showPassword = ref(false)
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const route = useRoute()
const router = useRouter()

const email = ref('')
const password = ref('')
const formError = ref<string | null>(null)

const login = useLogin()
const mfaChallenge = useMfaChallenge()
const resendVerification = useResendVerification()

// ?verified=1 : l'API de vérification d'email redirige ici après consommation
// du lien signé (voir EmailVerificationController). ?error=… : lien expiré ou
// signature invalide (`failure()`).
const emailVerified = computed(() => route.query.verified === '1')
const verifyError = computed(() => typeof route.query.error === 'string')

// 403 AUTH_EMAIL_NOT_VERIFIED à la connexion : état dédié avec renvoi du lien.
const unverified = ref(false)
const resendPending = computed(() => resendVerification.isPending.value)
const resendDone = ref(false)

async function resendLink(): Promise<void> {
  try {
    await resendVerification.mutateAsync({ email: email.value })
    resendDone.value = true
  } catch (error) {
    formError.value = error instanceof ApiError ? error.message : 'Une erreur est survenue.'
  }
}

// Set once a 428 AUTH_MFA_REQUIRED comes back from useLogin — switches the
// form to the "enter your 6-digit code" step instead of a second meaning
// for the same fields.
const challengeToken = ref<string | null>(null)
const mfaCode = ref('')

const isPending = computed(() => login.isPending.value || mfaChallenge.isPending.value)

async function afterAuthenticated(): Promise<void> {
  const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/formations/dashboard'
  await router.push(redirect)
}

async function submitLogin(): Promise<void> {
  formError.value = null
  unverified.value = false

  try {
    await login.mutateAsync({ email: email.value, password: password.value })
    await afterAuthenticated()
  } catch (error) {
    if (error instanceof ApiError && error.code === 'AUTH_MFA_REQUIRED') {
      challengeToken.value = error.details?.challenge_token as string
      return
    }
    if (error instanceof ApiError && error.code === 'AUTH_EMAIL_NOT_VERIFIED') {
      unverified.value = true
      return
    }
    formError.value = error instanceof ApiError ? error.message : 'Une erreur est survenue.'
  }
}

async function submitMfaCode(): Promise<void> {
  if (challengeToken.value === null) return
  formError.value = null

  try {
    await mfaChallenge.mutateAsync({ challenge_token: challengeToken.value, code: mfaCode.value })
    await afterAuthenticated()
  } catch (error) {
    formError.value = error instanceof ApiError ? error.message : 'Une erreur est survenue.'
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
  0%, 100% { transform: translate(0, 0); }
  50%      { transform: translate(20px, -20px); }
}
.animate-float-slow {
  animation: floatSlow 8s ease-in-out infinite;
}
</style>
