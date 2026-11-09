<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- HEADER / BANNIÈRE ENTIÈREMENT VISIBLE -->
    <section class="relative w-full bg-white overflow-hidden shadow-sm">
      <img :src="bannerImage" alt="Bannière PADCI Formation" class="w-full h-auto object-contain" />
    </section>

    <!-- SERVICES -->
    <section class="px-6 py-16 max-w-6xl mx-auto w-full flex-1">
      <!-- TITRE + RETOUR -->
      <div class="mb-10 relative">
        <RouterLink
          to="/"
          class="text-primary text-2xl font-bold hover:scale-110 transition absolute left-0 bottom-3"
        >
          ←
        </RouterLink>

        <p class="text-sm font-semibold text-primary absolute left-0 top-5">Retour</p>

        <div class="text-center">
          <h2 class="text-xl font-bold text-primary mb-2">Nouvelle Demande</h2>
        </div>
      </div>

      <!-- 2 CARDS PARFAITEMENT CENTRÉES -->
      <div class="flex flex-wrap justify-center items-stretch gap-8 max-w-3xl mx-auto">
        <!-- CARD ENRÔLEMENT -->
        <RouterLink
          to="/inscription"
          class="bg-secondary rounded-xl p-12 flex flex-col items-center justify-center text-center shadow-md hover:scale-105 transition cursor-pointer w-80"
        >
          <UserPlusIcon class="text-primary size-16 mb-4" />
          <p class="text-primary font-semibold text-2xl">Inscription</p>
        </RouterLink>

        <!-- CARD FORMATION -->
        <RouterLink
          to="/formation"
          class="bg-secondary rounded-xl p-12 flex flex-col items-center justify-center text-center shadow-md hover:scale-105 transition cursor-pointer w-80"
        >
          <BookOpenIcon class="text-primary size-16 mb-4" />
          <p class="text-primary font-semibold text-2xl">Formation</p>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { BookOpenIcon, UserPlusIcon } from '@lucide/vue'
import { RouterLink } from 'vue-router'
import bannerImage from '@/assets/images/banierepadciformation.png'
</script>
