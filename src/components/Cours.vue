<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">

    <!-- BANNIÈRE -->
     <section class="relative w-full h-64 bg-white overflow-hidden flex items-center justify-center shadow-sm">
      <img
        :src="bannerImage"
        alt="Dashboard Header"
        class="w-full h-full object-cover object-top"
      />
    </section>

    <!-- CONTENU PRINCIPAL -->
    <section class="px-4 md:px-6 py-8 max-w-4xl mx-auto w-full">

      <!-- LIEN RETOUR -->
      <div class="mb-6">
        <RouterLink
          to="/formation"
          class="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
        >
          <i class='bx bx-arrow-back text-xl'></i>
          Retour aux formations
        </RouterLink>
      </div>

      <!-- TITRE -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-3xl font-bold text-gray-800">
          NOS TABLEAUX DE NOS FORMATIONS
        </h1>

      </div>

      <!-- TABLEAU -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-primary/20">

        <table class="w-full text-left border-collapse">

          <thead>
            <tr class="border-b-2 border-primary">
              <th class="py-4 px-4 text-primary font-bold text-lg">Formation</th>
              <th class="py-4 px-4 text-primary font-bold text-lg">Cohorte</th>
              <th class="py-4 px-4 text-primary font-bold text-lg">Début</th>
              <th class="py-4 px-4 text-primary font-bold text-lg">Fin</th>
              <th class="py-4 px-4 text-primary font-bold text-lg">Statut</th>
              <th class="py-4 px-4 text-primary font-bold text-lg">Action</th>
            </tr>
          </thead>

          <tbody>

            <!-- COHORTE 1 -->
            <tr class="border-b border-gray-200 hover:bg-gray-50 transition">
              <td class="py-4 px-4 font-medium">Cyber Sécurité</td>
              <td class="py-4 px-4">1</td>
              <td class="py-4 px-4">01/04/2026</td>
              <td class="py-4 px-4">30/06/2026</td>
              <td class="py-4 px-4">
                <span class="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  Disponible
                </span>
              </td>
              <td class="py-4 px-4">
                <button @click="openModal = true" class="text-primary hover:text-primary/80 transition">
                  <i class='bx bx-show text-2xl'></i>
                </button>
              </td>
            </tr>

            <!-- COHORTE 2 -->
            <tr class="border-b border-gray-200 hover:bg-gray-50 transition">
              <td class="py-4 px-4 font-medium">Data Analyst</td>
              <td class="py-4 px-4">2</td>
              <td class="py-4 px-4">15/07/2026</td>
              <td class="py-4 px-4">30/09/2026</td>
              <td class="py-4 px-4">
                <span class="px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
                  Indisponible
                </span>
              </td>
              <td class="py-4 px-4">
                <span class="text-gray-400">
                  <i class='bx bx-show text-2xl'></i>
                </span>
              </td>
            </tr>

            <!-- COHORTE 3 -->
            <tr class="border-b border-gray-200 hover:bg-gray-50 transition">
              <td class="py-4 px-4 font-medium">IT Support</td>
              <td class="py-4 px-4">3</td>
              <td class="py-4 px-4">01/10/2026</td>
              <td class="py-4 px-4">30/12/2026</td>
              <td class="py-4 px-4">
                <span class="px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
                  Indisponible
                </span>
              </td>
              <td class="py-4 px-4">
                <span class="text-gray-400">
                  <i class='bx bx-show text-2xl'></i>
                </span>
              </td>
            </tr>

            <!-- COHORTE 4 -->
            <tr class="border-b border-gray-200 hover:bg-gray-50 transition">
              <td class="py-4 px-4 font-medium">Network Specialist</td>
              <td class="py-4 px-4">4</td>
              <td class="py-4 px-4">01/01/2027</td>
              <td class="py-4 px-4">30/03/2027</td>
              <td class="py-4 px-4">
                <span class="px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
                  Indisponible
                </span>
              </td>
              <td class="py-4 px-4">
                <span class="text-gray-400">
                  <i class='bx bx-show text-2xl'></i>
                </span>
              </td>
            </tr>

            <!-- COHORTE 5 -->
            <tr class="border-b border-gray-200 hover:bg-gray-50 transition">
              <td class="py-4 px-4 font-medium">Artificial Intelligence</td>
              <td class="py-4 px-4">5</td>
              <td class="py-4 px-4">01/04/2027</td>
              <td class="py-4 px-4">30/06/2027</td>
              <td class="py-4 px-4">
                <span class="px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
                  Indisponible
                </span>
              </td>
              <td class="py-4 px-4">
                <span class="text-gray-400">
                  <i class='bx bx-show text-2xl'></i>
                </span>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </section>

    <!-- MODAL VIDÉO -->
    <div v-if="openModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div class=" shadow-xl max-w-3xl w-full p-3">

        <video
          controls
          class="w-full rounded-lg"
          :src="videoUrl"
        ></video>

        <div class="flex justify-center gap-4 mt-6">

          <!-- ROUTER LINK -->
          <RouterLink
            to="/accueil"
            class="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-secondary hover:text-white transition"
          >
            S'enregistrer à la formation
          </RouterLink>

          <button
            @click="openModal = false"
            class="bg-gray-200 px-6 py-3 rounded-lg"
          >
            Fermer
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import bannerImage from '@/assets/images/banierepadciformation.png' // Remplacez par votre image de fond

const openModal = ref(false)

const videoUrl = '/public/resumepadciformation.mp4'

</script>
