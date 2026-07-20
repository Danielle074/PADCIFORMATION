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
          to="/nouvelle-demande"
          class="text-primary text-2xl font-bold hover:scale-110 transition absolute left-0 bottom-3"
        >
          ←
        </RouterLink>

        <p class="text-sm font-semibold text-primary absolute left-0 top-5">
          Retour
        </p>

        <div class="text-center">
          <h2 class="text-xl font-bold text-primary mb-2">
            Formation
          </h2>
        </div>

      </div>

      <!-- GRID - 9 CARTES -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        <!-- CARD = LIEN -->
        <RouterLink
          v-for="(service, index) in services"
          :key="index"
          :to="service.route"
          class="bg-secondary rounded-xl p-8 flex flex-col items-center text-center shadow-md hover:scale-105 transition cursor-pointer"
        >
          <i :class="service.icon" class="text-primary text-4xl mb-4"></i>

          <p class="text-primary font-semibold text-lg">
            {{ service.name }}
          </p>
        </RouterLink>

      </div>
    </section>

  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import bannerImage from '@/assets/images/banierepadciformation.png'

const services = [
  {
    name: 'Cyber sécurité',
    icon: 'bx bx-shield',
    route: '/cours'
  },
  {
    name: 'Data Analytics',
    icon: 'bx bx-chart',
    route: '/cours'
  },
  {
    name: 'IT Support',
    icon: 'bx bx-laptop',
    route: '/cours'
  },
  {
    name: 'Network Specialist',
    icon: 'bx bx-network-chart',
    route: '/cours'
  },
  {
    name: 'Artificial Intelligence',
    icon: 'bx bx-brain',
    route: '/cours'
  },

]
</script>
