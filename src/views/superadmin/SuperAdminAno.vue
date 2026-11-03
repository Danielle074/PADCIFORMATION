<template>
  <div class="space-y-6">
    <!-- EN-TÊTE -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Validation des ANO</h1>
        <p class="text-sm text-gray-500 mt-1">Avis de Non-Objection (UCP / Banque Mondiale)</p>
      </div>
      <div class="flex items-center gap-2 text-sm text-gray-500">
        <span class="font-medium text-gray-700">{{ enAttenteCount }}</span> dossier(s) en attente de signature
      </div>
    </div>

    <!-- LISTE DES ANO -->
    <div class="grid gap-4">
      <div
        v-for="ano in anos"
        :key="ano.id"
        class="bg-white rounded-xl shadow-sm p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300"
        :class="ano.statut === 'en_attente' && ano.priorite === 'haute'
          ? 'border-l-4 border-orange-500'
          : (ano.statut === 'signe' ? 'border border-gray-100 opacity-75' : 'border-l-4 border-gray-300')"
      >
        <div>
          <!-- Badge Statut/Priorité -->
          <span
            class="text-xs font-bold uppercase tracking-wide"
            :class="{
              'text-orange-600': ano.statut === 'en_attente' && ano.priorite === 'haute',
              'text-gray-500': ano.statut === 'en_attente' && ano.priorite === 'normale',
              'text-green-600': ano.statut === 'signe'
            }"
          >
            {{ getBadgeText(ano) }}
          </span>

          <h3 class="text-lg font-bold text-gray-800 mt-1">{{ ano.titre }}</h3>
          <p class="text-sm text-gray-500 mt-1">
            Soumis par {{ ano.soumetteur }} le {{ ano.dateSoumission }}
            <span v-if="ano.filiere">· Filière : {{ ano.filiere }}</span>
          </p>
        </div>

        <div class="flex gap-3">
          <button
            @click="voirDossier(ano)"
            class="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
          >
            Voir le dossier
          </button>

          <button
            v-if="ano.statut === 'en_attente'"
            @click="ouvrirConfirmation(ano)"
            class="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition shadow-sm shadow-orange-500/30"
          >
            Signer l'ANO
          </button>

          <button
            v-else
            disabled
            class="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg text-sm font-medium cursor-not-allowed"
          >
            Déjà validé
          </button>
        </div>
      </div>
    </div>

    <!-- ================= MODALE DE CONFIRMATION DE SIGNATURE ================= -->
    <div v-if="showConfirmModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-modal">
        <div class="p-6 text-center">
          <div class="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-800 mb-2">Confirmer la signature</h3>
          <p class="text-sm text-gray-500 mb-6">
            Vous êtes sur le point de signer l'ANO pour :<br>
            <strong class="text-gray-800">{{ selectedAno?.titre }}</strong>
          </p>

          <div class="flex gap-3">
            <button @click="showConfirmModal = false" class="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition">
              Annuler
            </button>
            <button @click="confirmerSignature" class="flex-1 px-4 py-2.5 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition shadow-md shadow-orange-500/30">
              Confirmer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// ==================== TYPES & INTERFACES ====================
type StatutAno = 'en_attente' | 'signe'
type PrioriteAno = 'haute' | 'normale'

interface Ano {
  id: number
  titre: string
  soumetteur: string
  dateSoumission: string
  filiere?: string
  statut: StatutAno
  priorite: PrioriteAno
  dateSignature?: string
}

// ==================== ÉTAT ====================
// Données typées et réactives
const anos = ref<Ano[]>([
  {
    id: 1,
    titre: 'Liste des 200 candidats retenus',
    soumetteur: 'la CPED',
    dateSoumission: '12/10/2024',
    filiere: 'Toutes',
    statut: 'en_attente',
    priorite: 'haute'
  },
  {
    id: 2,
    titre: 'Kit pédagogique - Filière Cybersécurité',
    soumetteur: 'l\'EMSP',
    dateSoumission: '10/10/2024',
    statut: 'en_attente',
    priorite: 'normale'
  },
  {
    id: 3,
    titre: 'Rapport de la Cohorte 1 (IA)',
    soumetteur: 'la CPED',
    dateSoumission: '04/10/2024',
    statut: 'signe',
    priorite: 'normale',
    dateSignature: '05/10/2024'
  }
])

const showConfirmModal = ref<boolean>(false)
const selectedAno = ref<Ano | null>(null)

// ==================== COMPUTED ====================
const enAttenteCount = computed(() => {
  return anos.value.filter(a => a.statut === 'en_attente').length
})

// ==================== MÉTHODES ====================
const getBadgeText = (ano: Ano): string => {
  if (ano.statut === 'signe') return `Signé le ${ano.dateSignature}`
  return ano.priorite === 'haute' ? 'Priorité Haute' : 'En attente'
}

const voirDossier = (ano: Ano) => {
  // À remplacer par une redirection vers le PDF ou une modale de détails
  alert(`Ouverture du dossier : ${ano.titre}`)
}

const ouvrirConfirmation = (ano: Ano) => {
  selectedAno.value = ano
  showConfirmModal.value = true
}

const confirmerSignature = () => {
  if (selectedAno.value) {
    // Mise à jour locale (à remplacer par un appel API)
    selectedAno.value.statut = 'signe'
    selectedAno.value.dateSignature = new Date().toLocaleDateString('fr-FR')

    // Fermeture de la modale
    showConfirmModal.value = false
    selectedAno.value = null
  }
}
</script>

<style scoped>
/* Animation d'apparition de la modale */
@keyframes modalIn {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
.animate-modal {
  animation: modalIn 0.25s ease-out both;
}
</style>
