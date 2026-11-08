<template>
  <div class="space-y-6">
    <!-- EN-TÊTE -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Budget & Décaissements</h1>
        <p class="text-sm text-gray-500 mt-1">Suivi financier de la Composante 3 (PADCI)</p>
      </div>
      <button
        @click="exporterPDF"
        class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-medium shadow-sm transition text-sm flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Exporter le bilan (PDF)
      </button>
    </div>

    <!-- CARTES DE BUDGET -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Budget Global -->
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-20 h-20 bg-orange-50 rounded-bl-full -mr-4 -mt-4"></div>
        <p class="text-gray-500 text-sm font-medium relative z-10">Budget Global (Phase 1)</p>
        <p class="text-2xl font-bold text-gray-800 mt-1 relative z-10">128.6 M €</p>
        <div class="w-full bg-gray-100 rounded-full h-2 mt-4 relative z-10">
          <div class="bg-orange-500 h-2 rounded-full" :style="{ width: budgetConsomme + '%' }"></div>
        </div>
        <p class="text-xs text-gray-500 mt-2 relative z-10">Consommé : {{ budgetConsomme }} M € ({{ budgetConsomme }}%)</p>
      </div>

      <!-- Budget Formation -->
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <p class="text-gray-500 text-sm font-medium">Budget Formation DTC</p>
        <p class="text-2xl font-bold text-orange-600 mt-1">4.5 M €</p>
        <p class="text-xs text-gray-500 mt-2">Alloué pour les 200 formateurs</p>
        <div class="flex items-center gap-2 mt-3 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-lg w-fit">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          Validé par la Banque Mondiale
        </div>
      </div>

      <!-- Demandes en attente -->
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <p class="text-gray-500 text-sm font-medium">Demandes de décaissement</p>
        <div class="flex items-end gap-2 mt-1">
          <p class="text-2xl font-bold text-gray-800">{{ demandesEnAttenteCount }}</p>
          <p class="text-sm font-normal text-gray-500 mb-1">en attente</p>
        </div>
        <button class="text-orange-600 text-sm font-semibold hover:underline mt-2 flex items-center gap-1">
          Voir les demandes
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
        </button>
      </div>
    </div>

    <!-- TABLEAU DES DÉCAISSEMENTS -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 class="text-lg font-bold text-gray-800">Dernières demandes de paiement</h3>
        <span class="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{{ demandes.length }} transactions</span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <th class="py-3 px-6">Date</th>
              <th class="py-3 px-6">Bénéficiaire</th>
              <th class="py-3 px-6">Objet</th>
              <th class="py-3 px-6">Montant</th>
              <th class="py-3 px-6">Statut</th>
              <th class="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-sm">
            <tr v-for="demande in demandes" :key="demande.id" class="hover:bg-gray-50 transition">
              <td class="py-4 px-6 text-gray-600">{{ demande.date }}</td>
              <td class="py-4 px-6 font-medium text-gray-800">{{ demande.beneficiaire }}</td>
              <td class="py-4 px-6 text-gray-600">{{ demande.objet }}</td>
              <td class="py-4 px-6 font-bold text-gray-800">{{ demande.montant }}</td>
              <td class="py-4 px-6">
                <span
                  class="px-2.5 py-1 rounded-full text-xs font-semibold"
                  :class="getStatutClass(demande.statut)"
                >
                  {{ demande.statut }}
                </span>
              </td>
              <td class="py-4 px-6 text-center">
                <button
                  v-if="demande.statut === 'En attente ANO'"
                  @click="ouvrirValidation(demande)"
                  class="text-orange-600 hover:bg-orange-50 p-2 rounded-lg font-medium text-xs transition"
                >
                  Valider
                </button>
                <span v-else class="text-gray-400 text-xs">-</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ================= MODALE DE CONFIRMATION ================= -->
    <div v-if="showConfirmModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-modal">
        <div class="p-6 text-center">
          <div class="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-800 mb-2">Confirmer le décaissement</h3>
          <p class="text-sm text-gray-500 mb-1">Vous êtes sur le point de valider le paiement de :</p>
          <p class="text-base font-bold text-gray-800 mb-6">{{ selectedDemande?.montant }} - {{ selectedDemande?.beneficiaire }}</p>

          <div class="flex gap-3">
            <button @click="showConfirmModal = false" class="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition">
              Annuler
            </button>
            <button @click="confirmerValidation" class="flex-1 px-4 py-2.5 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition shadow-md shadow-orange-500/30">
              Valider le paiement
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
type StatutPaiement = 'En attente ANO' | 'Payé' | 'Rejeté'

interface DemandePaiement {
  id: number
  date: string
  beneficiaire: string
  objet: string
  montant: string
  statut: StatutPaiement
}

// ==================== ÉTAT ====================
const budgetConsomme = ref<number>(15) // En pourcentage

const demandes = ref<DemandePaiement[]>([
  {
    id: 1,
    date: '12/10/2024',
    beneficiaire: 'Cisco Systems',
    objet: 'Licences NetAcad (Cohorte 1)',
    montant: '15,000 €',
    statut: 'En attente ANO'
  },
  {
    id: 2,
    date: '10/10/2024',
    beneficiaire: 'EMSP (Honoraires)',
    objet: 'Maîtres formateurs (Cohorte 1)',
    montant: '8,500 €',
    statut: 'Payé'
  },
  {
    id: 3,
    date: '08/10/2024',
    beneficiaire: 'Oracle Academy',
    objet: 'Vouchers de certification (IA)',
    montant: '5,200 €',
    statut: 'Payé'
  }
])

const showConfirmModal = ref<boolean>(false)
const selectedDemande = ref<DemandePaiement | null>(null)

// ==================== COMPUTED ====================
const demandesEnAttenteCount = computed(() => {
  return demandes.value.filter(d => d.statut === 'En attente ANO').length
})

// ==================== MÉTHODES ====================
const getStatutClass = (statut: StatutPaiement): string => {
  switch (statut) {
    case 'En attente ANO':
      return 'bg-amber-100 text-amber-700'
    case 'Payé':
      return 'bg-green-100 text-green-700'
    case 'Rejeté':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

const ouvrirValidation = (demande: DemandePaiement) => {
  selectedDemande.value = demande
  showConfirmModal.value = true
}

const confirmerValidation = () => {
  if (selectedDemande.value) {
    selectedDemande.value.statut = 'Payé'
    // Optionnel : faire baisser le budget en attente et augmenter le consommé
    showConfirmModal.value = false
    selectedDemande.value = null
  }
}

const exporterPDF = () => {
  // Logique d'export (à relier à un backend ou une librairie PDF)
  alert('Génération du bilan financier en cours...')
}
</script>

<style scoped>
@keyframes modalIn {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
.animate-modal {
  animation: modalIn 0.25s ease-out both;
}
</style>
