<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">

    <!-- BANNIÈRE ENTIÈREMENT VISIBLE -->
    <section class="relative w-full bg-white overflow-hidden shadow-sm">
      <img
        :src="bannerImage"
        alt="Bannière PADCI Formation"
        class="w-full h-auto object-contain"
      />
    </section>

    <!-- CONTENU PRINCIPAL (pleine largeur) -->
    <section class="px-4 md:px-8 py-8 w-full max-w-[95%] mx-auto flex-1">

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
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800 uppercase tracking-wide">
          Nos tableaux de nos formations
        </h1>
      </div>

      <!-- TABLEAU FULL WIDTH -->
      <div class="bg-white rounded-xl shadow-lg p-0 mb-8 border border-primary/20 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr class="border-b-2 border-primary bg-gray-50/80">
                <th class="py-4 px-6 text-primary font-bold text-sm md:text-base">N°</th>
                <th class="py-4 px-6 text-primary font-bold text-sm md:text-base">Formation</th>
                <th class="py-4 px-6 text-primary font-bold text-sm md:text-base">Cohorte</th>
                <th class="py-4 px-6 text-primary font-bold text-sm md:text-base">Début</th>
                <th class="py-4 px-6 text-primary font-bold text-sm md:text-base">Fin</th>
                <th class="py-4 px-6 text-primary font-bold text-sm md:text-base">Statut</th>
                <th class="py-4 px-6 text-primary font-bold text-sm md:text-base text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(item, index) in paginatedFormations"
                :key="item.id"
                class="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <!-- Numérotation globale (pas juste par page) -->
                <td class="py-4 px-6 font-medium text-gray-500 text-sm md:text-base">
                  {{ (currentPage - 1) * itemsPerPage + index + 1 }}
                </td>

                <td class="py-4 px-6 font-medium text-sm md:text-base">{{ item.formation }}</td>
                <td class="py-4 px-6 text-sm md:text-base">{{ item.cohorte }}</td>
                <td class="py-4 px-6 text-sm md:text-base">{{ item.debut }}</td>
                <td class="py-4 px-6 text-sm md:text-base">{{ item.fin }}</td>
                <td class="py-4 px-6">
                  <span
                    class="px-3 py-1 rounded-full text-xs md:text-sm font-medium"
                    :class="item.statut === 'Disponible' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                  >
                    {{ item.statut }}
                  </span>
                </td>
                <td class="py-4 px-6 text-center">
                  <button
                    v-if="item.statut === 'Disponible'"
                    @click="openModal = true"
                    class="text-primary hover:text-primary/70 transition"
                  >
                    <i class='bx bx-show text-2xl'></i>
                  </button>
                  <span v-else class="text-gray-300 cursor-not-allowed">
                    <i class='bx bx-show text-2xl'></i>
                  </span>
                </td>
              </tr>

              <!-- Si aucune formation trouvée -->
              <tr v-if="paginatedFormations.length === 0">
                <td colspan="7" class="py-10 text-center text-gray-500">
                  Aucune formation disponible.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- PAGINATION -->
        <div class="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span class="text-sm text-gray-600">
            Affichage de <span class="font-semibold text-gray-800">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> à
            <span class="font-semibold text-gray-800">{{ Math.min(currentPage * itemsPerPage, formations.length) }}</span> sur
            <span class="font-semibold text-gray-800">{{ formations.length }}</span> formations
          </span>

          <nav class="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <!-- Bouton Précédent -->
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <i class='bx bx-chevron-left text-lg'></i>
            </button>

            <!-- Numéros de page -->
            <button
              v-for="page in displayedPages"
              :key="page"
              @click="goToPage(page)"
              class="relative inline-flex items-center px-4 py-2 border text-sm font-medium transition"
              :class="[
                currentPage === page
                  ? 'z-10 bg-primary border-primary text-white'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              ]"
            >
              {{ page }}
            </button>

            <!-- Bouton Suivant -->
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <i class='bx bx-chevron-right text-lg'></i>
            </button>
          </nav>
        </div>
      </div>
    </section>

    <!-- MODAL VIDÉO -->
    <div v-if="openModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div class="bg-white shadow-xl max-w-4xl w-full p-4 md:p-6 rounded-2xl animate-modal">
        <video
          controls
          class="w-full rounded-lg bg-black"
          :src="videoUrl"
        ></video>

        <div class="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <RouterLink
            to="/accueil"
            class="bg-gradient-to-r from-[#198341] to-[#22a854] hover:from-[#146b34] hover:to-[#198341] text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-primary/30 hover:-translate-y-0.5 text-center"
          >
            S'enregistrer à la formation
          </RouterLink>

          <button
            @click="openModal = false"
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition text-center"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import bannerImage from '@/assets/images/banierepadciformation.png'

const openModal = ref(false)
const videoUrl = '/resumepadciformation.mp4'

// Données des formations
const formations = ref([
  { id: 1, formation: 'Cyber Sécurité', cohorte: 1, debut: '01/04/2026', fin: '30/06/2026', statut: 'Disponible' },
  { id: 2, formation: 'Data Analyst', cohorte: 2, debut: '15/07/2026', fin: '30/09/2026', statut: 'Indisponible' },
  { id: 3, formation: 'IT Support', cohorte: 3, debut: '01/10/2026', fin: '30/12/2026', statut: 'Indisponible' },
  { id: 4, formation: 'Network Specialist', cohorte: 4, debut: '01/01/2027', fin: '30/03/2027', statut: 'Indisponible' },
  { id: 5, formation: 'Artificial Intelligence', cohorte: 5, debut: '01/04/2027', fin: '30/06/2027', statut: 'Indisponible' },
  // Ajout de données fictives pour tester la pagination
  { id: 6, formation: 'Cloud Computing', cohorte: 6, debut: '01/07/2027', fin: '30/09/2027', statut: 'Disponible' },
  { id: 7, formation: 'DevOps', cohorte: 7, debut: '01/10/2027', fin: '30/12/2027', statut: 'Indisponible' },
  { id: 8, formation: 'Web Development', cohorte: 8, debut: '01/01/2028', fin: '30/03/2028', statut: 'Disponible' },
  { id: 9, formation: 'Blockchain', cohorte: 9, debut: '01/04/2028', fin: '30/06/2028', statut: 'Indisponible' },
  { id: 10, formation: 'IoT Security', cohorte: 10, debut: '01/07/2028', fin: '30/09/2028', statut: 'Disponible' },
  { id: 11, formation: 'Game Development', cohorte: 11, debut: '01/10/2028', fin: '30/12/2028', statut: 'Indisponible' },
])

// --- PAGINATION ---
const currentPage = ref(1)
const itemsPerPage = ref(5) // Nombre d'éléments par page

const totalPages = computed(() => {
  return Math.ceil(formations.value.length / itemsPerPage.value)
})

const paginatedFormations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return formations.value.slice(start, end)
})

// Affichage intelligent des numéros de pages
const displayedPages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const delta = 1 // Nombre de pages à afficher autour de la page courante
  const range = []

  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    range.push(i)
  }

  if (current - delta > 2) {
    range.unshift('...')
  }
  if (current + delta < total - 1) {
    range.push('...')
  }

  // On s'assure de toujours afficher la première et la dernière page
  range.unshift(1)
  if (total > 1) {
    range.push(total)
  }

  // Filtrer les doublons potentiels si totalPages est petit
  return [...new Set(range)]
})

const goToPage = (page) => {
  if (page === '...') return
  currentPage.value = page
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}
</script>

<style scoped>
@keyframes modalIn {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
.animate-modal {
  animation: modalIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
</style>
