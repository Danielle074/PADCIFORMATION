<template>
  <div class="space-y-6">

    <!-- ================= EN-TÊTE ================= -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Rapports & Suivi-Évaluation</h1>
        <p class="text-sm text-gray-500 mt-1">
          Indicateurs de performance (KPIs) et rapports du projet PADCI (Composante 3).
        </p>
      </div>

      <!-- Bouton de génération de rapport global -->
      <button class="flex items-center justify-center gap-2 bg-primary hover:bg-primary-shade text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-sm text-sm">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Générer le rapport final (PDF)
      </button>
    </div>

    <!-- ================= TABLEAU DES INDICATEURS CLÉS (KPIs du TDR) ================= -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100">
        <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
          <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Indicateurs de performance (Cibles TDR)
        </h2>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">
              <th class="py-3 px-6">Indicateur</th>
              <th class="py-3 px-6 text-center">Cible (TDR)</th>
              <th class="py-3 px-6 text-center">Réalisé</th>
              <th class="py-3 px-6">Progression</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-sm">
            <!-- Ligne 1 -->
            <tr class="hover:bg-gray-50 transition">
              <td class="py-4 px-6 font-medium text-gray-800">Formateurs formés et certifiés</td>
              <td class="py-4 px-6 text-center text-gray-600">200</td>
              <td class="py-4 px-6 text-center font-bold text-primary">148</td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-2">
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-primary h-2 rounded-full" style="width: 74%"></div>
                  </div>
                  <span class="text-xs font-bold text-gray-700">74%</span>
                </div>
              </td>
            </tr>
            <!-- Ligne 2 -->
            <tr class="hover:bg-gray-50 transition">
              <td class="py-4 px-6 font-medium text-gray-800">Taux de certification Cisco/Oracle</td>
              <td class="py-4 px-6 text-center text-gray-600">≥ 80%</td>
              <td class="py-4 px-6 text-center font-bold text-primary">82%</td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-2">
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-primary h-2 rounded-full" style="width: 82%"></div>
                  </div>
                  <span class="text-xs font-bold text-gray-700">82%</span>
                </div>
              </td>
            </tr>
            <!-- Ligne 3 -->
            <tr class="hover:bg-gray-50 transition">
              <td class="py-4 px-6 font-medium text-gray-800">Taux d'assiduité aux sessions</td>
              <td class="py-4 px-6 text-center text-gray-600">≥ 90%</td>
              <td class="py-4 px-6 text-center font-bold text-primary">94%</td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-2">
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-primary h-2 rounded-full" style="width: 94%"></div>
                  </div>
                  <span class="text-xs font-bold text-gray-700">94%</span>
                </div>
              </td>
            </tr>
            <!-- Ligne 4 -->
            <tr class="hover:bg-gray-50 transition">
              <td class="py-4 px-6 font-medium text-gray-800">Taux de satisfaction (évaluation à chaud)</td>
              <td class="py-4 px-6 text-center text-gray-600">≥ 85%</td>
              <td class="py-4 px-6 text-center font-bold text-primary">89%</td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-2">
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-primary h-2 rounded-full" style="width: 89%"></div>
                  </div>
                  <span class="text-xs font-bold text-gray-700">89%</span>
                </div>
              </td>
            </tr>
            <!-- Ligne 5 -->
            <tr class="hover:bg-gray-50 transition">
              <td class="py-4 px-6 font-medium text-gray-800">Kits pédagogiques validés</td>
              <td class="py-4 px-6 text-center text-gray-600">5</td>
              <td class="py-4 px-6 text-center font-bold text-primary">4</td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-2">
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-amber-400 h-2 rounded-full" style="width: 80%"></div>
                  </div>
                  <span class="text-xs font-bold text-gray-700">80%</span>
                </div>
              </td>
            </tr>
            <!-- Ligne 6 -->
            <tr class="hover:bg-gray-50 transition">
              <td class="py-4 px-6 font-medium text-gray-800">Taux de femmes dans le pool (Parité)</td>
              <td class="py-4 px-6 text-center text-gray-600">30 - 40%</td>
              <td class="py-4 px-6 text-center font-bold text-primary">36%</td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-2">
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-primary h-2 rounded-full" style="width: 36%"></div>
                  </div>
                  <span class="text-xs font-bold text-gray-700">36%</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ================= GRAPHIQUES ET ANALYSES ================= -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- Graphique 1 : Répartition Hommes / Femmes par filière -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          Répartition par Genre (Parité)
        </h3>
        <div class="h-64">
          <Bar :data="genderChartData" :options="chartOptions" />
        </div>
      </div>

      <!-- Graphique 2 : Taux de réussite par filière -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
          Taux de réussite (Certification) par Filière
        </h3>
        <div class="h-64">
          <Bar :data="successRateData" :options="chartOptions" />
        </div>
      </div>
    </div>

    <!-- ================= HISTORIQUE DES RAPPORTS TÉLÉCHARGEABLES ================= -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
        <h3 class="text-lg font-bold text-gray-800">Documents & Rapports générés</h3>
      </div>
      <ul class="divide-y divide-gray-100">
        <li v-for="(doc, index) in rapports" :key="index" class="p-4 sm:px-6 hover:bg-gray-50 transition flex items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <p class="font-bold text-gray-800 text-sm">{{ doc.nom }}</p>
              <p class="text-xs text-gray-500 mt-0.5">Généré le {{ doc.date }} · {{ doc.taille }}</p>
            </div>
          </div>
          <button class="text-primary hover:bg-primary/10 p-2 rounded-lg transition" title="Télécharger">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          </button>
        </li>
      </ul>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// ==================== DONNÉES GENRE (Parité TDR) ====================
// Couleurs Chart.js : options de config natives sans classes Tailwind —
// valeurs littérales. #198341 = --color-primary (marque), #9ca3af = gris
// de contraste, #f3f4f6 = grille (gray-100).
const genderChartData = {
  labels: ['Cybersécurité', 'Data Analysis', 'IT Support', 'Network', 'IA'],
  datasets: [
    {
      label: 'Hommes',
      data: [24, 22, 20, 18, 14],
      backgroundColor: '#198341',
      borderRadius: 4,
      barPercentage: 0.6,
      categoryPercentage: 0.6
    },
    {
      label: 'Femmes',
      data: [14, 13, 10, 7, 6],
      backgroundColor: '#9ca3af', // Gris pour contraster
      borderRadius: 4,
      barPercentage: 0.6,
      categoryPercentage: 0.6
    }
  ]
}

// ==================== DONNÉES TAUX DE RÉUSSITE ====================
const successRateData = {
  labels: ['Cybersécurité', 'Data Analysis', 'IT Support', 'Network', 'IA'],
  datasets: [
    {
      label: 'Taux de réussite (%)',
      data: [85, 80, 88, 78, 84],
      backgroundColor: 'rgba(25, 131, 65, 0.8)',
      borderColor: '#198341',
      borderWidth: 1,
      borderRadius: 4
    }
  ]
}

// ==================== OPTIONS GRAPHIQUES ====================
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20 } }
  },
  scales: {
    y: { beginAtZero: true, grid: { color: '#f3f4f6' } },
    x: { grid: { display: false } }
  }
}

// ==================== DONNÉES DES RAPPORTS ====================
const rapports = ref([
  { nom: 'Rapport global de performance - PADCI (Phase 1)', date: '15/10/2024', taille: '2.4 Mo' },
  { nom: 'Rapport de sélection des 200 formateurs', date: '10/10/2024', taille: '1.8 Mo' },
  { nom: 'Rapport de formation - Cohorte 1 (IA)', date: '20/10/2024', taille: '4.2 Mo' },
  { nom: 'Bilan des certifications Cisco / Oracle', date: '25/10/2024', taille: '1.1 Mo' },
])
</script>

<style scoped>
/* Design entièrement géré par Tailwind */
</style>
