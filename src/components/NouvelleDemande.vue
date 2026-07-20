<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">

    <!-- HEADER -->
     <section class="relative w-full h-64 bg-white overflow-hidden flex items-center justify-center shadow-sm">
      <img
        :src="bannerImage"
        alt="Dashboard Header"
        class="w-full h-full object-cover object-top"
      />
    </section>

    <!-- SERVICES -->
    <section class="px-6 py-16 max-w-6xl mx-auto w-full">

      <!-- TITRE + RETOUR -->
      <div class="mb-10 relative">
        <RouterLink
          to="/"
          class="text-primary text-2xl font-bold hover:scale-110 transition absolute left-0 bottom-3"
        >
          ←
        </RouterLink>

        <p class="text-sm font-semibold text-primary absolute left-0 top-5">
          Retour
        </p>

        <div class="text-center">
          <h2 class="text-xl font-bold text-primary mb-2">
            Nouvelle Demande
          </h2>
        </div>
      </div>

      <!-- 2 CARDS SEULEMENT - ENRÔLEMENT ET FORMATION -->
      <div class="flex flex-wrap justify-center gap-8 max-w-3xl mx-auto">
        <!-- CARD ENRÔLEMENT -->
        <RouterLink
          to="/inscription"
          class="bg-secondary rounded-xl p-12 flex flex-col items-center text-center shadow-md hover:scale-105 transition cursor-pointer w-80"
        >
          <i class="bx bx-user-plus text-primary text-6xl mb-4"></i>
          <p class="text-primary font-semibold text-2xl">
            Inscription
          </p>
        </RouterLink>

        <!-- CARD FORMATION -->
        <RouterLink
          to="/Formation"
          class="bg-secondary rounded-xl p-12 flex flex-col items-center text-center shadow-md hover:scale-105 transition cursor-pointer w-80"
        >
          <i class="bx bx-book-open text-primary text-6xl mb-4"></i>
          <p class="text-primary font-semibold text-2xl">
            Formation
          </p>
        </RouterLink>
      </div>

    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import bannerImage from '@/assets/images/banierepadciformation.png'
</script>
