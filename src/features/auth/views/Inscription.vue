<template>
  <div class="min-h-screen flex flex-col md:flex-row relative">

    <!-- ================= FORMULAIRE (GAUCHE) ================= -->
    <div class="flex w-full md:w-1/2 items-center justify-center order-2 md:order-1 py-10 px-5 bg-white relative overflow-hidden">

      <!-- Bulles décoratives floutées -->
      <div class="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-float-slow"></div>
      <div class="absolute -bottom-32 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none animate-float-slow" style="animation-delay: 2s;"></div>

      <div class="w-full max-w-md relative z-10 animate-fade-in-up">

        <!-- Bouton Retour -->
        <router-link
          to="/"
          class="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-4 transition group font-medium text-sm"
        >
          <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour à la connexion
        </router-link>

        <!-- Logo + Titre : état "formulaire" ou "en attente de vérification" -->
        <div class="flex flex-col items-center mb-6">
          <img :src="formLogo" alt="PADCI Formation" class="w-32 h-auto mb-3" />

          <template v-if="!accountCreated">
            <h1 class="text-2xl font-bold text-gray-800">Créer un compte</h1>
            <p class="text-gray-500 text-sm mt-1 text-center">
              Un compte simple d'abord (nom, email, mot de passe) — la candidature
              se fait après la connexion.
            </p>
          </template>

          <!-- ÉTAT SUCCÈS HONNÊTE : compte créé, en attente de vérification -->
          <template v-else>
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 class="text-2xl font-bold text-gray-800">Compte créé !</h1>
            <p class="text-gray-600 text-sm mt-2 text-center leading-relaxed">
              Un e-mail de vérification a été envoyé à<br />
              <strong class="text-gray-800">{{ form.email }}</strong>.<br />
              Vous pourrez vous connecter après avoir vérifié votre adresse.
            </p>

            <!-- Lien de développement (local/testing uniquement) : le backend
                 ne le renvoie QUE dans ces environnements, jamais en prod. -->
            <div v-if="verificationUrl" class="mt-4 w-full">
              <a
                :href="verificationUrl"
                class="block w-full text-center bg-green-50 border border-primary/30 rounded-xl px-4 py-3 text-sm text-primary hover:bg-green-100 transition"
              >
                [dev] Vérifier l'adresse maintenant
              </a>
              <p class="text-[11px] text-gray-400 mt-1 text-center">
                Lien signé direct — présent uniquement dans l'environnement local.
              </p>
            </div>

            <button
              v-if="verificationUrl === null"
              type="button"
              :disabled="resendPending || resendDone"
              class="mt-5 text-sm font-medium text-primary hover:underline transition disabled:opacity-60 disabled:hover:no-underline"
              :class="{ 'text-gray-500': resendDone }"
              @click="resend"
            >
              {{ resendDone ? 'E-mail renvoyé ✓' : resendPending ? 'Envoi en cours…' : 'Pas reçu ? Renvoyer l\'e-mail' }}
            </button>

            <router-link
              to="/"
              class="mt-4 w-full inline-flex items-center justify-center gap-2
                     bg-gradient-to-r from-primary to-primary-bright
                     text-white py-3 rounded-xl font-semibold transition-all duration-300
                     hover:-translate-y-0.5 shadow-lg shadow-primary/30"
            >
              Aller à la connexion
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </router-link>
          </template>
        </div>

        <!-- FORMULAIRE (disparait une fois le compte créé) -->
        <form v-if="!accountCreated" @submit.prevent="submit" class="space-y-4" novalidate>

          <!-- Nom -->
          <div class="relative group">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <input v-model="form.name" type="text" required placeholder="Nom complet *"
                   :class="inputClasses('name')"
                   @input="fieldErrors.name = []">
          </div>
          <p v-if="errorFor('name')" class="text-xs text-red-600 mt-1 px-1">{{ errorFor('name') }}</p>

          <!-- Email -->
          <div class="relative group">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <input v-model="form.email" type="email" required placeholder="Email *"
                   :class="inputClasses('email')"
                   @input="fieldErrors.email = []">
          </div>
          <p v-if="errorFor('email')" class="text-xs text-red-600 mt-1 px-1">{{ errorFor('email') }}</p>

          <!-- Mot de passe -->
          <div class="relative group">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            <input v-model="form.password" :type="showPassword ? 'text' : 'password'" required placeholder="Mot de passe *"
                   :class="inputClasses('password', 'pr-12')"
                   @input="fieldErrors.password = []">
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors p-1 rounded-lg hover:bg-primary/10"
              aria-label="Afficher ou masquer le mot de passe"
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
          <p v-if="errorFor('password')" class="text-xs text-red-600 mt-1 px-1">{{ errorFor('password') }}</p>

          <!-- Confirmation -->
          <div
            class="relative group"
            :class="{ 'animate-shake mismatch': mismatch }"
          >
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </span>
            <input v-model="form.passwordConfirmation" :type="showPassword ? 'text' : 'password'" required placeholder="Confirmer le mot de passe *"
                   :class="inputClasses('password', 'pr-12')">
          </div>

          <p class="text-[11px] text-gray-400 px-1">
            Minimum 8 caractères — les règles exactes sont appliquées par le serveur.
          </p>

          <!-- Erreur générale (message API non spécifique à un champ) -->
          <div v-if="formError" class="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-xl">
            <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {{ formError }}
          </div>

          <!-- Bouton Créer le compte -->
          <button
            type="submit"
            :disabled="isPending"
            class="group w-full inline-flex items-center justify-center gap-2
                   bg-gradient-to-r from-primary to-primary-bright hover:from-primary-shade hover:to-primary
                   text-white py-3.5 rounded-xl font-semibold text-base
                   shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40
                   transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0
                   disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <svg v-if="isPending" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-if="!isPending">Créer mon compte</span>
            <span v-else>Création en cours…</span>
          </button>

          <p class="text-sm text-gray-500 text-center">
            Déjà un compte ?
            <router-link to="/" class="text-primary hover:underline font-medium">Se connecter</router-link>
          </p>
        </form>

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
      <div class="absolute inset-0 bg-gradient-to-br from-primary/50 via-primary/30 to-primary-deep/50"></div>

      <!-- Overlay desktop -->
      <div class="hidden md:flex absolute inset-0 z-20 flex-col justify-center items-center px-10 text-center text-white">
        <div class="max-w-md animate-fade-in-up drop-shadow-lg">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4 leading-tight">Rejoignez-nous</h2>
          <p class="text-base lg:text-lg opacity-90 leading-relaxed">
            Créez votre compte, puis candidatez à la session de la formation de votre choix.
          </p>
        </div>
      </div>

      <!-- Overlay mobile -->
      <div class="absolute inset-0 z-20 flex items-center justify-center md:hidden px-4">
        <div class="text-center text-white drop-shadow-lg">
          <h2 class="text-xl font-bold">PADCI Formation</h2>
          <p class="text-sm opacity-90">Création de compte</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { ApiError } from '@/api/http'
import formLogo from "@/assets/images/logoemsp.png"
import loginImage from "@/assets/images/photodecybersecurite.jpg"
import { useRegister } from '../composables/useRegister'
import { useResendVerification } from '../composables/useResendVerification'

const register = useRegister()
const resendVerification = useResendVerification()

const form = reactive({
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
})

const showPassword = ref(false)
const accountCreated = ref(false)
const verificationUrl = ref<string | null>(null)
const formError = ref<string | null>(null)
const fieldErrors = reactive<Record<string, string[]>>({})

// Success + state of the resend button on the "await verification" screen.
const resendPending = computed(() => resendVerification.isPending.value)
const resendDone = ref(false)

const mismatch = computed(() => {
  return form.passwordConfirmation.length > 0 && form.password !== form.passwordConfirmation
})

const isPending = computed(() => register.isPending.value)

/** First field-level message from the backend, or null. */
function errorFor(field: string): string | null {
  const first = fieldErrors[field]?.[0]
  return first ?? null
}

/** Base classes of an input + the red variant when the server rejects the field. */
function inputClasses(field: string, extras = ''): string {
  const invalid = errorFor(field) !== null
  return [
    'w-full pl-12 pr-4 py-3 text-base border rounded-xl bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:outline-none transition-all duration-300',
    extras,
    invalid
      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/15'
      : 'border-gray-200 focus:ring-primary/15 focus:border-primary',
  ].join(' ')
}

async function submit(): Promise<void> {
  formError.value = null

  if (mismatch.value) {
    formError.value = 'Les mots de passe ne correspondent pas.'
    return
  }

  try {
    const created = await register.mutateAsync({
      name: form.name,
      email: form.email,
      password: form.password,
      password_confirmation: form.passwordConfirmation,
    })
    accountCreated.value = true
    // Local/testing only (see AuthController::register) — absent in production.
    verificationUrl.value = created.verification_url ?? null
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.code === 'VALIDATION_FAILED') {
        fieldErrors.email = error.fieldErrors.email ?? []
        fieldErrors.password = error.fieldErrors.password ?? []
        fieldErrors.name = error.fieldErrors.name ?? []
      } else {
        formError.value = error.message
      }
    } else {
      formError.value = 'Une erreur est survenue.'
    }
  }
}

async function resend(): Promise<void> {
  try {
    await resendVerification.mutateAsync({ email: form.email })
    resendDone.value = true
  } catch {
    // Without revealing whether the address exists, most errors are rate limits.
    formError.value = 'E-mail non renvoyé. Réessayez dans quelques instants.'
  }
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

/* Confirmer le mot de passe : petit signal visuel, pas un rollo créatif */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  75% { transform: translateX(6px); }
}
/* Rouge de statut d'erreur (red-500) : flash visuel du mismatch,
   cohérent avec les classes text-red-600 du formulaire. */
.animate-shake.mismatch input { border-color: #ef4444; }
.animate-shake { animation: shake 0.35s ease-in-out 1 both; }
</style>
