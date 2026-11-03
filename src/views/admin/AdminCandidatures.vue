<template>
  <div class="space-y-6">

    <!-- ================= EN-TÊTE ================= -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Gestion des Candidatures</h1>
        <p class="text-sm text-gray-500 mt-1">
          Sélection et validation des 200 formateurs pour le pool du DTC.
        </p>
      </div>

      <!-- Bouton d'export -->
      <button class="flex items-center justify-center gap-2 bg-[#198341] hover:bg-[#146b34] text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-sm text-sm">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Exporter la liste (CSV)
      </button>
    </div>

    <!-- ================= BARRE D'OUTILS (Filtres) ================= -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div class="flex flex-col md:flex-row gap-4">

        <!-- Recherche -->
        <div class="relative flex-1">
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher un nom, email..."
            class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#198341]/20 focus:border-[#198341] text-sm"
          >
        </div>

        <!-- Filtre Filière -->
        <select v-model="filterFiliere" class="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#198341]/20 focus:border-[#198341] text-sm text-gray-700 bg-white min-w-[200px]">
          <option value="">Toutes les filières</option>
          <option value="Cybersécurité">Cybersécurité</option>
          <option value="Data Analysis">Data Analysis</option>
          <option value="IT Support">IT Support</option>
          <option value="Network Specialist">Network Specialist</option>
          <option value="Intelligence Artificielle">Intelligence Artificielle</option>
        </select>

        <!-- Filtre Statut -->
        <select v-model="filterStatus" class="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#198341]/20 focus:border-[#198341] text-sm text-gray-700 bg-white min-w-[150px]">
          <option value="">Tous les statuts</option>
          <option value="Validé">Validé</option>
          <option value="En attente">En attente</option>
          <option value="Rejeté">Rejeté</option>
        </select>
      </div>
    </div>

    <!-- ================= TABLEAU DES CANDIDATURES ================= -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <th class="py-4 px-6">Candidat</th>
              <th class="py-4 px-6">Filière</th>
              <th class="py-4 px-6">Date de dépôt</th>
              <th class="py-4 px-6">Ordinateur</th>
              <th class="py-4 px-6">Statut</th>
              <th class="py-4 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-sm">

            <!-- Ligne Candidat -->
            <tr v-for="candidat in filteredCandidats" :key="candidat.id" class="hover:bg-gray-50 transition">
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-[#198341]/10 flex items-center justify-center text-[#198341] font-bold text-sm shrink-0">
                    {{ candidat.initials }}
                  </div>
                  <div>
                    <p class="font-bold text-gray-800">{{ candidat.nom }}</p>
                    <p class="text-xs text-gray-500">{{ candidat.email }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6 text-gray-700 font-medium">
                {{ candidat.filiere }}
              </td>
              <td class="py-4 px-6 text-gray-500">
                {{ candidat.date }}
              </td>
              <td class="py-4 px-6">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                  {{ candidat.processeur }}
                </span>
              </td>
              <td class="py-4 px-6">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                  :class="{
                    'bg-[#198341]/10 text-[#198341]': candidat.statut === 'Validé',
                    'bg-amber-100 text-amber-700': candidat.statut === 'En attente',
                    'bg-red-100 text-red-700': candidat.statut === 'Rejeté'
                  }">
                  <span class="w-1.5 h-1.5 rounded-full"
                    :class="{
                      'bg-[#198341]': candidat.statut === 'Validé',
                      'bg-amber-500': candidat.statut === 'En attente',
                      'bg-red-500': candidat.statut === 'Rejeté'
                    }"></span>
                  {{ candidat.statut }}
                </span>
              </td>
              <td class="py-4 px-6 text-center">
                <button @click="openModal(candidat)" class="text-[#198341] hover:bg-[#198341]/10 p-2 rounded-lg transition" title="Voir le dossier">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </td>
            </tr>

            <!-- Si aucune candidature trouvée -->
            <tr v-if="filteredCandidats.length === 0">
              <td colspan="6" class="py-10 text-center text-gray-500">
                Aucune candidature ne correspond à vos critères.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- PAGINATION -->
      <div class="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span class="text-sm text-gray-600">
          Affichage de <span class="font-semibold text-gray-800">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> à
          <span class="font-semibold text-gray-800">{{ Math.min(currentPage * itemsPerPage, filteredCandidats.length) }}</span> sur
          <span class="font-semibold text-gray-800">{{ filteredCandidats.length }}</span> candidatures
        </span>
        <nav class="inline-flex rounded-md shadow-sm -space-x-px">
          <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-2 border border-gray-300 bg-white text-gray-500 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <span class="px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700">
            {{ currentPage }} / {{ totalPages }}
          </span>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-2 border border-gray-300 bg-white text-gray-500 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </nav>
      </div>
    </div>

    <!-- ================= MODALE DE DÉTAIL CANDIDAT ================= -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-modal">

        <!-- En-tête Modale -->
        <div class="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-[#198341] flex items-center justify-center text-white font-bold text-lg shadow-md">
              {{ selectedCandidat?.initials }}
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-800">{{ selectedCandidat?.nom }}</h3>
              <p class="text-sm text-gray-500">{{ selectedCandidat?.email }}</p>
            </div>
          </div>
          <button @click="isModalOpen = false" class="text-gray-400 hover:text-red-500 transition p-1 rounded-lg hover:bg-red-50">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <!-- Contenu Modale -->
        <div class="p-6 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">

          <!-- 1. Informations Personnelles -->
          <div>
            <h4 class="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3 flex items-center gap-2">
              <svg class="w-4 h-4 text-[#198341]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Identité & Contact
            </h4>
            <div class="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl text-sm">
              <div><span class="text-gray-500">Nationalité :</span> <span class="font-medium text-gray-800">Ivoirienne</span></div>
              <div><span class="text-gray-500">Téléphone :</span> <span class="font-medium text-gray-800">{{ selectedCandidat?.telephone }}</span></div>
              <div><span class="text-gray-500">Date de naissance :</span> <span class="font-medium text-gray-800">12/05/1995</span></div>
              <div><span class="text-gray-500">Adresse :</span> <span class="font-medium text-gray-800">Cocody, Abidjan</span></div>
            </div>
          </div>

          <!-- 2. Prérequis Académiques -->
          <div>
            <h4 class="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3 flex items-center gap-2">
              <svg class="w-4 h-4 text-[#198341]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
              Diplôme & Documents
            </h4>
            <div class="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl text-sm">
              <div><span class="text-gray-500">Niveau :</span> <span class="font-medium text-gray-800">Licence</span></div>
              <div><span class="text-gray-500">Spécialité :</span> <span class="font-medium text-gray-800">Réseaux & Télécoms</span></div>
              <div class="col-span-2 flex items-center gap-2 mt-2">
                <span class="text-gray-500">Fichier diplôme :</span>
                <a href="#" class="text-[#198341] hover:underline flex items-center gap-1 font-medium">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  Voir le diplôme (PDF)
                </a>
              </div>
            </div>
          </div>

          <!-- 3. Équipement Informatique (Critère TDR) -->
          <div>
            <h4 class="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3 flex items-center gap-2">
              <svg class="w-4 h-4 text-[#198341]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Équipement (Core i5 / 8Go / 256Go min)
            </h4>
            <div class="bg-gray-50 p-4 rounded-xl text-sm space-y-2">
              <div class="flex justify-between border-b border-gray-200 pb-2">
                <span class="text-gray-500">Processeur :</span>
                <span class="font-bold text-gray-800">{{ selectedCandidat?.processeur }}</span>
              </div>
              <div class="flex justify-between border-b border-gray-200 pb-2">
                <span class="text-gray-500">RAM :</span>
                <span class="font-bold text-gray-800">{{ selectedCandidat?.ram }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Photo de l'ordinateur :</span>
                <a href="#" class="text-[#198341] hover:underline flex items-center gap-1 font-medium">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Voir la photo
                </a>
              </div>
            </div>
          </div>

        </div>

        <!-- Pied de Modale (Actions) -->
        <div class="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button @click="rejectCandidat" class="px-5 py-2.5 bg-white border border-red-200 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition text-sm">
            Rejeter la candidature
          </button>
          <button @click="validateCandidat" class="px-5 py-2.5 bg-[#198341] text-white rounded-xl font-semibold hover:bg-[#146b34] transition shadow-md shadow-[#198341]/30 text-sm">
            Valider le formateur
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// ==================== ÉTAT DES FILTRES ET PAGINATION ====================
const searchQuery = ref('')
const filterFiliere = ref('')
const filterStatus = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

// ==================== MODALE ====================
const isModalOpen = ref(false)
const selectedCandidat = ref(null)

const openModal = (candidat) => {
  selectedCandidat.value = candidat
  isModalOpen.value = true
}

// ==================== DONNÉES FICTIVES (Simulant la BDD) ====================
const candidats = ref([
  { id: 1, initials: 'AD', nom: 'Aya Diomandé', email: 'aya.d@email.ci', telephone: '+225 07 00 00 01', filiere: 'Cybersécurité', date: '12/10/2024', statut: 'Validé', processeur: 'Core i7', ram: '16 Go' },
  { id: 2, initials: 'KT', nom: 'Koffi Traoré', email: 'k.traore@email.ci', telephone: '+225 07 00 00 02', filiere: 'Data Analysis', date: '12/10/2024', statut: 'En attente', processeur: 'Core i5', ram: '8 Go' },
  { id: 3, initials: 'MA', nom: 'Mariam Anouman', email: 'm.anouman@email.ci', telephone: '+225 07 00 00 03', filiere: 'Intelligence Artificielle', date: '11/10/2024', statut: 'Validé', processeur: 'Core i9', ram: '32 Go' },
  { id: 4, initials: 'YB', nom: 'Yao Bamba', email: 'y.bamba@email.ci', telephone: '+225 07 00 00 04', filiere: 'IT Support', date: '11/10/2024', statut: 'Rejeté', processeur: 'Core i3', ram: '4 Go' }, // Rejeté car config insuffisante
  { id: 5, initials: 'FS', nom: 'Fatou Sarr', email: 'f.sarr@email.ci', telephone: '+225 07 00 00 05', filiere: 'Network Specialist', date: '10/10/2024', statut: 'En attente', processeur: 'Core i5', ram: '8 Go' },
  { id: 6, initials: 'JM', nom: 'Jean-Marc K.', email: 'jm.k@email.ci', telephone: '+225 07 00 00 06', filiere: 'Cybersécurité', date: '09/10/2024', statut: 'En attente', processeur: 'Core i5', ram: '8 Go' },
  { id: 7, initials: 'SB', nom: 'Sarah B.', email: 's.b@email.ci', telephone: '+225 07 00 00 07', filiere: 'Data Analysis', date: '09/10/2024', statut: 'Validé', processeur: 'Core i7', ram: '16 Go' },
  { id: 8, initials: 'PL', nom: 'Paul L.', email: 'p.l@email.ci', telephone: '+225 07 00 00 08', filiere: 'IT Support', date: '08/10/2024', statut: 'En attente', processeur: 'Core i5', ram: '8 Go' },
])

// ==================== LOGIQUE DE FILTRAGE ====================
const filteredCandidats = computed(() => {
  return candidats.value.filter(c => {
    const matchSearch = c.nom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        c.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchFiliere = filterFiliere.value ? c.filiere === filterFiliere.value : true
    const matchStatus = filterStatus.value ? c.statut === filterStatus.value : true
    return matchSearch && matchFiliere && matchStatus
  })
})

// ==================== LOGIQUE DE PAGINATION ====================
const totalPages = computed(() => Math.ceil(filteredCandidats.value.length / itemsPerPage))
const paginatedCandidats = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredCandidats.value.slice(start, start + itemsPerPage)
})

const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }

// Réinitialiser la page à 1 lors d'un changement de filtre
import { watch } from 'vue'
watch([searchQuery, filterFiliere, filterStatus], () => {
  currentPage.value = 1
})

// ==================== ACTIONS MODALE ====================
const validateCandidat = () => {
  if (selectedCandidat.value) {
    selectedCandidat.value.statut = 'Validé'
    isModalOpen.value = false
  }
}

const rejectCandidat = () => {
  if (selectedCandidat.value) {
    selectedCandidat.value.statut = 'Rejeté'
    isModalOpen.value = false
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 4px;
}

@keyframes modalIn {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
.animate-modal {
  animation: modalIn 0.25s ease-out both;
}
</style>
