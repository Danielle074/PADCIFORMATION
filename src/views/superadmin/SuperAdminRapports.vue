<template>
  <div class="space-y-6">
    <!-- EN-TÊTE -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Rapports & Conformité</h1>
        <p class="text-sm text-gray-500 mt-1">Suivi des KPIs et des mesures environnementales & sociales (E&S)</p>
      </div>
      <button
        @click="telechargerRapportFinal"
        class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-medium shadow-sm transition text-sm flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
        </svg>
        Télécharger le rapport final
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- INDICATEURS DE PERFORMANCE (TDR) -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 class="text-lg font-bold text-gray-800 mb-4">Indicateurs de Performance (TDR)</h3>
        <div class="space-y-5">
          <div v-for="kpi in kpis" :key="kpi.nom">
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gray-600">{{ kpi.nom }}</span>
              <span class="font-bold text-gray-800">
                {{ kpi.valeur }}%
                <span class="text-gray-400 font-normal">(Cible: {{ kpi.cible }})</span>
              </span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-2">
              <div
                class="h-2 rounded-full transition-all duration-1000"
                :class="kpi.valeur >= kpi.cibleValeur ? 'bg-orange-500' : 'bg-amber-400'"
                :style="{ width: kpi.valeur + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- CONFORMITÉ E&S -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
          Mesures de sauvegarde (CES)
        </h3>
        <ul class="space-y-3 text-sm text-gray-600">
          <li v-for="(mesure, index) in mesuresES" :key="index" class="flex items-start gap-2">
            <svg class="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
            <span>{{ mesure }}</span>
          </li>
        </ul>
        <div class="mt-6 pt-4 border-t border-gray-100">
          <div class="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 px-3 py-2 rounded-lg w-fit">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Conformité validée par la Banque Mondiale
          </div>
        </div>
      </div>
    </div>

    <!-- LIVRABLES ATTENDUS -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 class="text-lg font-bold text-gray-800 mb-4">Livrables du Projet (TDR)</h3>
      <div class="space-y-3">
        <div
          v-for="livrable in livrables"
          :key="livrable.id"
          class="flex flex-col md:flex-row md:items-center justify-between p-3 rounded-lg border gap-3 transition"
          :class="{
            'bg-gray-50 border-gray-100': livrable.statut === 'valide',
            'bg-orange-50 border-orange-100': livrable.statut === 'en_attente',
            'bg-white border-gray-200': livrable.statut === 'a_venir'
          }"
        >
          <div class="flex items-center gap-3">
            <!-- Icône du statut -->
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
              :class="{
                'bg-green-100 text-green-600': livrable.statut === 'valide',
                'bg-orange-200 text-orange-700': livrable.statut === 'en_attente',
                'bg-gray-200 text-gray-400': livrable.statut === 'a_venir'
              }"
            >
              <svg v-if="livrable.statut === 'valide'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
              <span v-else-if="livrable.statut === 'en_attente'">!</span>
              <span v-else>-</span>
            </div>
            <span class="text-sm font-medium text-gray-800">{{ livrable.nom }}</span>
          </div>

          <div class="flex items-center gap-3 ml-auto">
            <span
              class="text-xs font-medium"
              :class="{
                'text-gray-500': livrable.statut === 'valide',
                'text-orange-600 font-bold': livrable.statut === 'en_attente',
                'text-gray-400': livrable.statut === 'a_venir'
              }"
            >
              {{ getStatutText(livrable.statut) }}
            </span>

            <!-- Bouton de téléchargement (uniquement si validé) -->
            <button
              v-if="livrable.statut === 'valide'"
              @click="telechargerLivrable(livrable)"
              class="p-1.5 text-gray-400 hover:text-orange-500 hover:bg-white rounded-lg transition"
              title="Télécharger"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// ==================== TYPES & INTERFACES ====================
type StatutLivrable = 'valide' | 'en_attente' | 'a_venir'

interface Kpi {
  nom: string
  valeur: number
  cible: string
  cibleValeur: number
}

interface Livrable {
  id: number
  nom: string
  statut: StatutLivrable
}

// ==================== ÉTAT ====================
const kpis = ref<Kpi[]>([
  { nom: "Taux d'assiduité aux sessions", valeur: 94, cible: '≥90%', cibleValeur: 90 },
  { nom: "Taux de réussite aux évaluations", valeur: 82, cible: '≥80%', cibleValeur: 80 },
  { nom: "Satisfaction des participants", valeur: 89, cible: '≥85%', cibleValeur: 85 },
  { nom: "Taux de certification Cisco/Oracle", valeur: 82, cible: '≥80%', cibleValeur: 80 },
])

const mesuresES = ref<string[]>([
  "Accessibilité des locaux aux personnes en situation de handicap.",
  "Signature du code de conduite (EAS/HS) par les 200 formateurs.",
  "Mécanisme de gestion des plaintes opérationnel et accessible.",
  "Dématérialisation des supports (limitation de l'empreinte carbone)."
])

const livrables = ref<Livrable[]>([
  { id: 1, nom: "Note méthodologique et chronogramme", statut: 'valide' },
  { id: 2, nom: "Rapport de sélection des 200 formateurs", statut: 'valide' },
  { id: 3, nom: "Kits pédagogiques harmonisés (5 filières)", statut: 'valide' },
  { id: 4, nom: "Base de données des formateurs certifiés", statut: 'en_attente' },
  { id: 5, nom: "Rapport final de l'atelier", statut: 'a_venir' },
])

// ==================== MÉTHODES ====================
const getStatutText = (statut: StatutLivrable): string => {
  switch (statut) {
    case 'valide': return 'Validé'
    case 'en_attente': return 'En attente'
    case 'a_venir': return 'À venir'
    default: return ''
  }
}

const telechargerLivrable = (livrable: Livrable) => {
  // Logique de téléchargement (à connecter au backend)
  alert(`Téléchargement du livrable : ${livrable.nom}`)
}

const telechargerRapportFinal = () => {
  // Logique d'export PDF global
  alert('Génération du rapport final en cours...')
}
</script>
