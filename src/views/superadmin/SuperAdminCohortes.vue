<template>
  <div class="space-y-6">
    <!-- EN-TÊTE -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Supervision des Cohortes</h1>
        <p class="text-sm text-gray-500 mt-1">Vue consolidée des 5 filières (Lecture seule)</p>
      </div>

      <!-- Légende des statuts -->
      <div class="flex items-center gap-4 text-xs font-medium text-gray-600">
        <div class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-blue-500"></span> En cours</div>
        <div class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-gray-400"></span> Terminé</div>
        <div class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-amber-400"></span> À venir</div>
      </div>
    </div>

    <!-- TABLEAU DE SUPERVISION -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">
              <th class="py-4 px-6">Filière</th>
              <th class="py-4 px-6">Inscrits</th>
              <th class="py-4 px-6">Taux de femmes</th>
              <th class="py-4 px-6">Taux de certification</th>
              <th class="py-4 px-6">Statut</th>
              <th class="py-4 px-6 text-center">Détails</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-sm">
            <tr v-for="cohorte in cohortes" :key="cohorte.id" class="hover:bg-gray-50 transition">
              <!-- Filière -->
              <td class="py-4 px-6 font-medium text-gray-800">{{ cohorte.filiere }}</td>

              <!-- Inscrits -->
              <td class="py-4 px-6 text-gray-600">
                <span class="font-semibold text-gray-800">{{ cohorte.inscrits }}</span> / {{ cohorte.objectif }}
              </td>

              <!-- Taux de femmes (Avec alerte si sous la cible) -->
              <td class="py-4 px-6">
                <span
                  v-if="cohorte.tauxFemmes !== null"
                  class="px-2 py-1 rounded font-bold text-xs"
                  :class="cohorte.tauxFemmes >= 30 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'"
                  :title="cohorte.tauxFemmes < 30 ? 'En dessous de la cible de 30%' : ''"
                >
                  {{ cohorte.tauxFemmes }}%
                </span>
                <span v-else class="text-gray-400">-</span>
              </td>

              <!-- Taux de certification -->
              <td class="py-4 px-6 text-gray-600">
                <span v-if="cohorte.tauxCertification !== null" class="font-medium">
                  {{ cohorte.tauxCertification }}%
                </span>
                <span v-else class="text-gray-400">-</span>
              </td>

              <!-- Statut -->
              <td class="py-4 px-6">
                <span
                  class="px-2.5 py-1 rounded-full text-xs font-semibold"
                  :class="getStatutClass(cohorte.statut)"
                >
                  {{ cohorte.statut }}
                </span>
              </td>

              <!-- Action -->
              <td class="py-4 px-6 text-center">
                <button
                  @click="voirDetails(cohorte)"
                  :disabled="cohorte.statut === 'Non démarré'"
                  class="text-orange-600 hover:underline text-xs font-medium disabled:text-gray-300 disabled:cursor-not-allowed"
                >
                  Voir
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// ==================== TYPES & INTERFACES ====================
type StatutCohorte = 'En cours' | 'Terminé' | 'À venir' | 'Non démarré'

interface Cohorte {
  id: number
  filiere: string
  inscrits: number
  objectif: number
  tauxFemmes: number | null
  tauxCertification: number | null
  statut: StatutCohorte
}

// ==================== ÉTAT ====================
const cohortes = ref<Cohorte[]>([
  {
    id: 1,
    filiere: 'Cybersécurité',
    inscrits: 38,
    objectif: 40,
    tauxFemmes: 35,
    tauxCertification: 85,
    statut: 'En cours'
  },
  {
    id: 2,
    filiere: 'Data Analysis',
    inscrits: 40,
    objectif: 40,
    tauxFemmes: 32,
    tauxCertification: 80,
    statut: 'En cours'
  },
  {
    id: 3,
    filiere: 'Intelligence Artificielle',
    inscrits: 40,
    objectif: 40,
    tauxFemmes: 40,
    tauxCertification: 84,
    statut: 'Terminé'
  },
  {
    id: 4,
    filiere: 'IT Support',
    inscrits: 30,
    objectif: 40,
    tauxFemmes: 28, // Alerte : en dessous de 30%
    tauxCertification: null,
    statut: 'À venir'
  },
  {
    id: 5,
    filiere: 'Network Specialist',
    inscrits: 0,
    objectif: 40,
    tauxFemmes: null,
    tauxCertification: null,
    statut: 'Non démarré'
  }
])

// ==================== MÉTHODES ====================
const getStatutClass = (statut: StatutCohorte): string => {
  switch (statut) {
    case 'En cours':
      return 'bg-blue-100 text-blue-700'
    case 'Terminé':
      return 'bg-gray-100 text-gray-600'
    case 'À venir':
      return 'bg-amber-100 text-amber-700'
    case 'Non démarré':
      return 'bg-gray-100 text-gray-500'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

const voirDetails = (cohorte: Cohorte) => {
  // À remplacer par une modale de détails ou une redirection
  alert(`Détails de la filière : ${cohorte.filiere}\nInscrits : ${cohorte.inscrits}/${cohorte.objectif}`)
}
</script>
