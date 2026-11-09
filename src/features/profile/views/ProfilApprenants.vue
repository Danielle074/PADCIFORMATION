<template>
  <div class="space-y-6">

    <!-- ================= 1. EN-TÊTE DU PROFIL ================= -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Bannière de fond -->
      <div class="h-32 bg-gradient-to-r from-primary-deep to-primary-bright relative">
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      </div>

      <!-- Infos principales -->
      <div class="px-6 sm:px-10 pb-8 relative">
        <div class="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12 sm:-mt-16">
          <!-- Avatar -->
          <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white p-1 shadow-lg shrink-0 relative z-10">
            <div class="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <!-- Image de profil ou Initiales -->
              <span class="text-3xl sm:text-4xl font-bold text-gray-500">JK</span>
            </div>
          </div>

          <!-- Nom et Rôle -->
          <div class="flex-1 text-center sm:text-left mb-2">
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">{{ auth.user?.name }}</h1>
            <p class="text-sm text-gray-500 font-medium mt-1">Apprenant · Formation Network Specialist</p>
            <div class="flex items-center justify-center sm:justify-start gap-2 mt-2">
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-green-100 text-green-700">
                <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Compte actif
              </span>
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-100 text-blue-700">
                <AwardIcon /> CCNA 200-301
              </span>
            </div>
          </div>

          <!-- Boutons d'action -->
          <div class="flex gap-3 w-full sm:w-auto mt-4 sm:mt-0">
            <router-link
              to="/profil/modifier"
              class="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary hover:bg-primary-shade text-white px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-md text-sm"
            >
              <SquarePenIcon :size="18" />
              Modifier le profil
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= 2. CONTENU (2 COLONNES) ================= -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- COLONNE GAUCHE : Informations personnelles -->
      <div class="lg:col-span-1 space-y-6">

        <!-- Carte Infos -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <CircleUserIcon class="text-primary" :size="20" /> Informations
          </h2>

          <div class="space-y-4 text-sm">
            <!-- Email -->
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 text-gray-500">
                <MailIcon :size="18" />
              </div>
              <div>
                <p class="text-gray-500 text-xs font-medium">Email</p>
                <p class="text-gray-800 font-medium break-all">{{ auth.user?.email }}</p>
              </div>
            </div>

            <!-- Téléphone -->
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 text-gray-500">
                <PhoneIcon :size="18" />
              </div>
              <div>
                <p class="text-gray-500 text-xs font-medium">Téléphone</p>
                <p class="text-gray-800 font-medium">+225 07 00 00 00 01</p>
              </div>
            </div>

            <!-- Genre -->
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 text-gray-500">
                <UsersIcon :size="18" />
              </div>
              <div>
                <p class="text-gray-500 text-xs font-medium">Genre</p>
                <p class="text-gray-800 font-medium">Masculin</p>
              </div>
            </div>

            <!-- Date de naissance -->
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 text-gray-500">
                <CalendarIcon :size="18" />
              </div>
              <div>
                <p class="text-gray-500 text-xs font-medium">Date de naissance</p>
                <p class="text-gray-800 font-medium">12 Mai 1995</p>
              </div>
            </div>

            <!-- Adresse -->
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 text-gray-500">
                <MapIcon :size="18" />
              </div>
              <div>
                <p class="text-gray-500 text-xs font-medium">Adresse</p>
                <p class="text-gray-800 font-medium">Cocody, Abidjan, Côte d'Ivoire</p>
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

      <!-- COLONNE DROITE : Statistiques et Activités -->
      <div class="lg:col-span-2 space-y-6">

        <!-- Statistiques d'apprentissage -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <div class="w-10 h-10 mx-auto rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
              <BookOpenTextIcon :size="20" />
            </div>
            <p class="text-2xl font-bold text-gray-800">1</p>
            <p class="text-xs text-gray-500 font-medium">Cours suivis</p>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <div class="w-10 h-10 mx-auto rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mb-2">
              <LaptopIcon :size="20" />
            </div>
            <p class="text-2xl font-bold text-gray-800">0</p>
            <p class="text-xs text-gray-500 font-medium">TP réalisés</p>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <div class="w-10 h-10 mx-auto rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-2">
              <ClockIcon :size="20" />
            </div>
            <p class="text-2xl font-bold text-gray-800">4h30</p>
            <p class="text-xs text-gray-500 font-medium">Temps d'étude</p>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <div class="w-10 h-10 mx-auto rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
              <TrophyIcon :size="20" />
            </div>
            <p class="text-2xl font-bold text-gray-800">0</p>
            <p class="text-xs text-gray-500 font-medium">Certificats</p>
          </div>
        </div>

        <!-- Progression globale -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
              <ChartLineIcon class="text-primary" :size="20" /> Ma progression
            </h2>
            <span class="text-sm font-bold text-primary">15%</span>
          </div>
          <div class="w-full bg-gray-100 rounded-full h-3 mb-2">
            <div class="bg-primary h-3 rounded-full" style="width: 15%"></div>
          </div>
          <p class="text-xs text-gray-500 text-right">1 chapitre validé sur 6</p>
        </div>

        <!-- Dernières activités -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <HistoryIcon class="text-primary" :size="20" /> Activités récentes
          </h2>

          <div class="space-y-4">
            <!-- Activité 1 -->
            <div class="flex items-start gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
              <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <CheckIcon :size="18" />
              </div>
              <div>
                <p class="text-sm font-medium text-gray-800">Chapitre 1 terminé : Fondamentaux des réseaux</p>
                <p class="text-xs text-gray-500 mt-1">Aujourd'hui à 10:30</p>
              </div>
            </div>

            <!-- Activité 2 -->
            <div class="flex items-start gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
              <div class="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                <LogInIcon :size="18" />
              </div>
              <div>
                <p class="text-sm font-medium text-gray-800">Connexion à la plateforme</p>
                <p class="text-xs text-gray-500 mt-1">Aujourd'hui à 08:15</p>
              </div>
            </div>

            <!-- Activité 3 -->
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                <BookOpenIcon :size="18" />
              </div>
              <div>
                <p class="text-sm font-medium text-gray-800">Début de la lecture du Chapitre 2</p>
                <p class="text-xs text-gray-500 mt-1">Hier à 16:45</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AwardIcon, BookOpenIcon, BookOpenTextIcon, CalendarIcon, ChartLineIcon, CheckIcon, CircleUserIcon, ClockIcon, HistoryIcon, LaptopIcon, LogInIcon, LogOutIcon, MailIcon, MapIcon, PhoneIcon, SquarePenIcon, TrophyIcon, UsersIcon } from '@lucide/vue'
import { useAuthStore } from '@/stores/auth'
import { useLogout } from '@/features/auth/composables/useLogout'

const auth = useAuthStore()
const logout = useLogout()
</script>

<style scoped>
/* Aucun style CSS supplémentaire n'est requis, tout est géré par Tailwind */
</style>
