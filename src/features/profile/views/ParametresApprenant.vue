<template>
  <div class="max-w-4xl mx-auto space-y-6">

    <!-- ================= EN-TÊTE ================= -->
    <div>
      <h1 class="text-2xl font-bold text-gray-800">Paramètres</h1>
      <p class="text-sm text-gray-500 mt-1">Gérez le profil et la sécurité de votre compte.</p>
    </div>

    <!-- ================= SECTION : PROFIL ================= -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
          <CircleUserIcon class="text-primary" :size="20" /> Profil
        </h2>
      </div>
      <div class="p-6 space-y-4">
        <div v-if="isProfilePending" class="text-sm text-gray-500">Chargement…</div>
        <form v-else @submit.prevent="submitProfile" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input
              v-model="profileForm.name"
              type="text"
              class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
            >
            <p v-if="profileErrors.name" class="text-xs text-red-600 mt-1">{{ profileErrors.name[0] }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="profileForm.email"
              type="email"
              class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
            >
            <p v-if="profileErrors.email" class="text-xs text-red-600 mt-1">{{ profileErrors.email[0] }}</p>
            <p v-else-if="emailChanged" class="text-xs text-amber-600 mt-1">
              Changer l'email nécessite de le vérifier à nouveau avant la prochaine connexion.
            </p>
          </div>
          <div class="flex items-center gap-3">
            <button
              type="submit"
              :disabled="updateProfileMutation.isPending.value"
              class="flex items-center justify-center gap-2 bg-primary hover:bg-primary-shade text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm text-sm disabled:opacity-50"
            >
              <SaveIcon :size="18" />
              Enregistrer
            </button>
            <span v-if="profileSaved" class="text-sm text-primary font-medium">Enregistré.</span>
          </div>
        </form>
      </div>
    </div>

    <!-- ================= SECTION : SÉCURITÉ ================= -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
          <ShieldHalfIcon class="text-primary" :size="20" /> Sécurité
        </h2>
      </div>
      <div class="p-6 space-y-6">

        <!-- Mot de passe -->
        <form @submit.prevent="submitPassword" class="space-y-4">
          <p class="font-medium text-gray-800">Changer le mot de passe</p>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Mot de passe actuel</label>
            <input
              v-model="passwordForm.current_password"
              type="password"
              class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
            >
            <p v-if="passwordErrors.current_password" class="text-xs text-red-600 mt-1">{{ passwordErrors.current_password[0] }}</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
              <input
                v-model="passwordForm.password"
                type="password"
                class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              >
              <p v-if="passwordErrors.password" class="text-xs text-red-600 mt-1">{{ passwordErrors.password[0] }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Confirmation</label>
              <input
                v-model="passwordForm.password_confirmation"
                type="password"
                class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              >
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button
              type="submit"
              :disabled="changePasswordMutation.isPending.value"
              class="px-5 py-2.5 bg-primary/10 text-primary text-sm font-semibold rounded-lg hover:bg-primary/20 transition-colors disabled:opacity-50"
            >
              Changer le mot de passe
            </button>
            <span v-if="passwordChanged" class="text-sm text-primary font-medium">Mot de passe changé. Vos autres sessions ont été déconnectées.</span>
          </div>
        </form>

        <!-- Double authentification (2FA) -->
        <div class="flex items-center justify-between gap-4 pt-6 border-t border-gray-100">
          <div>
            <p class="font-medium text-gray-800">Double authentification (2FA)</p>
            <p class="text-sm text-gray-500">
              {{ profile?.mfa_enabled ? 'Activée sur ce compte.' : 'Ajoutez une couche de sécurité supplémentaire.' }}
            </p>
          </div>
          <router-link
            v-if="!profile?.mfa_enabled"
            to="/mfa/configuration"
            class="text-sm font-semibold text-primary bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-lg transition-colors text-center shrink-0"
          >
            Activer
          </router-link>
          <button
            v-else
            @click="disableMfa"
            :disabled="mfaDisableMutation.isPending.value"
            class="text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors shrink-0 disabled:opacity-50"
          >
            Désactiver
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { CircleUserIcon, SaveIcon, ShieldHalfIcon } from '@lucide/vue'
import { useQueryClient } from '@tanstack/vue-query'
import { computed, reactive, ref, watch } from 'vue'
import type { ApiError } from '@/api/http'
import { useMfaDisable } from '@/features/auth/composables/useMfaSetup'
import { useChangePassword, useProfile, useUpdateProfile } from '../composables/useProfile'

// ==================== PROFIL (nom / email) ====================
const { data: profile, isPending: isProfilePending } = useProfile()

const profileForm = reactive({ name: '', email: '' })
watch(profile, (value) => {
  if (value) {
    profileForm.name = value.name
    profileForm.email = value.email
  }
}, { immediate: true })

const emailChanged = computed(() => profile.value !== undefined && profile.value !== null && profileForm.email !== profile.value.email)

const updateProfileMutation = useUpdateProfile()
const profileErrors = ref<Record<string, string[]>>({})
const profileSaved = ref(false)

function submitProfile() {
  profileErrors.value = {}
  profileSaved.value = false
  updateProfileMutation.mutate(
    { name: profileForm.name, email: profileForm.email },
    {
      onSuccess: () => { profileSaved.value = true },
      onError: (mutationError) => { profileErrors.value = (mutationError as ApiError).fieldErrors },
    },
  )
}

// ==================== MOT DE PASSE ====================
const passwordForm = reactive({ current_password: '', password: '', password_confirmation: '' })
const changePasswordMutation = useChangePassword()
const passwordErrors = ref<Record<string, string[]>>({})
const passwordChanged = ref(false)

function submitPassword() {
  passwordErrors.value = {}
  passwordChanged.value = false
  changePasswordMutation.mutate(
    { ...passwordForm },
    {
      onSuccess: () => {
        passwordChanged.value = true
        passwordForm.current_password = ''
        passwordForm.password = ''
        passwordForm.password_confirmation = ''
      },
      onError: (mutationError) => { passwordErrors.value = (mutationError as ApiError).fieldErrors },
    },
  )
}

// ==================== MFA ====================
const queryClient = useQueryClient()
const mfaDisableMutation = useMfaDisable()
function disableMfa() {
  mfaDisableMutation.mutate(undefined, {
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['profile'] }) },
  })
}
</script>
