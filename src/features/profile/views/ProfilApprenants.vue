<template>
  <div class="space-y-6">

    <!-- ================= 1. EN-TÊTE DU PROFIL ================= -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="h-32 bg-gradient-to-r from-primary-deep to-primary-bright relative">
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      </div>

      <div class="px-6 sm:px-10 pb-8 relative">
        <div v-if="isPending" class="pt-6 text-sm text-gray-500">Chargement du profil…</div>
        <div v-else-if="isError" class="pt-6 text-sm text-red-600">
          {{ (error as ApiError)?.message ?? 'Impossible de charger le profil.' }}
        </div>

        <div v-else-if="profile" class="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12 sm:-mt-16">
          <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white p-1 shadow-lg shrink-0 relative z-10">
            <div class="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <span class="text-3xl sm:text-4xl font-bold text-gray-500">{{ initialsOf(profile.name) }}</span>
            </div>
          </div>

          <div class="flex-1 text-center sm:text-left mb-2">
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">{{ profile.name }}</h1>
            <p class="text-sm text-gray-500 font-medium mt-1">{{ roleLabel(profile.roles) }}</p>
            <div class="flex items-center justify-center sm:justify-start gap-2 mt-2">
              <span
                class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold"
                :class="profile.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'"
              >
                <span class="w-1.5 h-1.5 rounded-full" :class="profile.is_active ? 'bg-green-500' : 'bg-gray-400'"></span>
                {{ profile.is_active ? 'Compte actif' : 'Compte désactivé' }}
              </span>
              <span
                class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold"
                :class="profile.email_verified ? 'bg-primary/10 text-primary' : 'bg-amber-100 text-amber-700'"
              >
                {{ profile.email_verified ? 'Email vérifié' : 'Email non vérifié' }}
              </span>
            </div>
          </div>

          <div class="flex gap-3 w-full sm:w-auto mt-4 sm:mt-0">
            <router-link
              to="/parametres"
              class="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary hover:bg-primary-shade text-white px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-md text-sm"
            >
              <SquarePenIcon :size="18" />
              Modifier le profil
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <template v-if="profile">
      <!-- ================= 2. CONTENU (2 COLONNES) ================= -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- COLONNE GAUCHE : Informations du compte -->
        <div class="lg:col-span-1 space-y-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CircleUserIcon class="text-primary" :size="20" /> Informations
            </h2>

            <div class="space-y-4 text-sm">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 text-gray-500">
                  <MailIcon :size="18" />
                </div>
                <div>
                  <p class="text-gray-500 text-xs font-medium">Email</p>
                  <p class="text-gray-800 font-medium break-all">{{ profile.email }}</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 text-gray-500">
                  <ShieldCheckIcon :size="18" />
                </div>
                <div>
                  <p class="text-gray-500 text-xs font-medium">Authentification à deux facteurs</p>
                  <p class="text-gray-800 font-medium">{{ profile.mfa_enabled ? 'Activée' : 'Désactivée' }}</p>
                </div>
              </div>

              <div v-if="profile.last_login_at" class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 text-gray-500">
                  <ClockIcon :size="18" />
                </div>
                <div>
                  <p class="text-gray-500 text-xs font-medium">Dernière connexion</p>
                  <p class="text-gray-800 font-medium">{{ formatDate(profile.last_login_at) }}</p>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-gray-100">
              <button
                class="w-full flex items-center justify-center gap-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 py-2.5 rounded-lg transition-colors"
                @click="logout"
              >
                <LogOutIcon :size="18" /> Se déconnecter
              </button>
            </div>
          </div>
        </div>

        <!-- COLONNE DROITE : Statistiques réelles -->
        <div class="lg:col-span-2 space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
              <div class="w-10 h-10 mx-auto rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                <BookOpenTextIcon :size="20" />
              </div>
              <p class="text-2xl font-bold text-gray-800">{{ counts?.enrollments ?? '—' }}</p>
              <p class="text-xs text-gray-500 font-medium">Formations suivies</p>
            </div>
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
              <div class="w-10 h-10 mx-auto rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
                <TrophyIcon :size="20" />
              </div>
              <p class="text-2xl font-bold text-gray-800">{{ counts?.certificates ?? '—' }}</p>
              <p class="text-xs text-gray-500 font-medium">Certificats</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { BookOpenTextIcon, CircleUserIcon, ClockIcon, LogOutIcon, MailIcon, ShieldCheckIcon, SquarePenIcon, TrophyIcon } from '@lucide/vue'
import type { ApiError } from '@/api/http'
import { useLogout } from '@/features/auth/composables/useLogout'
import { useLearnerCounts, useProfile } from '../composables/useProfile'

const { data: profile, isPending, isError, error } = useProfile()
const { data: counts } = useLearnerCounts()
const logout = useLogout()

function initialsOf(name: string): string {
  return name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('')
}

function roleLabel(roles: string[]): string {
  const labels: Record<string, string> = {
    apprenant: 'Apprenant',
    formateur: 'Formateur',
    moderateur: 'Modérateur',
    admin: 'Administrateur',
    super_admin: 'Super administrateur',
  }
  return roles.map((role) => labels[role] ?? role).join(', ') || 'Apprenant'
}

function formatDate(value: string): string {
  return new Date(value).toLocaleString('fr-FR')
}
</script>

<style scoped>
/* Aucun style CSS supplémentaire n'est requis, tout est géré par Tailwind */
</style>
