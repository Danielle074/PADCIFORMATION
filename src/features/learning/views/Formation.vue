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
          to="/nouvelle-demande"
          class="text-primary text-2xl font-bold hover:scale-110 transition absolute left-0 bottom-3"
        >
          ←
        </RouterLink>

        <p class="text-sm font-semibold text-primary absolute left-0 top-5">Retour</p>

        <div class="text-center">
          <h2 class="text-xl font-bold text-primary mb-2">Formation</h2>
        </div>
      </div>

      <!-- GRID - CARTES CENTRÉES (avec flex au lieu de grid pour gérer l'impair) -->
      <div class="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
        <!-- CARD = LIEN -->
        <RouterLink
          v-for="(service, index) in services"
          :key="index"
          :to="service.route"
          class="bg-secondary rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-md hover:scale-105 transition cursor-pointer w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm"
        >
          <component :is="service.icon" class="text-primary size-10 mb-4" />

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
import { BrainIcon, ChartLineIcon, LaptopIcon, NetworkIcon, ShieldIcon } from '@lucide/vue'
import bannerImage from '@/assets/images/banierepadciformation.png'

// Données des filières réelles (05 branchera sur l'API Catalog) : les
// icônes sont des composants directement dans le template des cards.
const services = [
  {
    name: 'Cyber sécurité',
    icon: ShieldIcon,
    route: '/cours',
  },
  {
    name: 'Data Analytics',
    icon: ChartLineIcon,
    route: '/cours',
  },
  {
    name: 'IT Support',
    icon: LaptopIcon,
    route: '/cours',
  },
  {
    name: 'Network Specialist',
    icon: NetworkIcon,
    route: '/cours',
  },
  {
    name: 'Artificial Intelligence',
    icon: BrainIcon,
    route: '/cours',
  },
]
</script>
