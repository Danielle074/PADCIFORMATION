<template>
  <div class="space-y-6">

    <!-- ================= EN-TÊTE WELCOME ================= -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Tableau de bord PADCI</h1>
        <p class="text-sm text-gray-500 mt-1">
          Suivi de l'atelier de renforcement des capacités des 200 formateurs DTC
        </p>
      </div>
      <div class="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
        <div class="w-2 h-2 rounded-full bg-[#198341] animate-pulse"></div>
        <span class="text-sm font-medium text-gray-600">Projet en cours · Phase 1 (2025-2030)</span>
      </div>
    </div>

    <!-- ================= STATISTIQUES PRINCIPALES (KPIs) ================= -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      <!-- Carte 1 : Formateurs formés -->
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-gray-500 text-sm font-medium">Formateurs formés</p>
            <div class="flex items-end gap-2 mt-1">
              <p class="text-3xl font-bold text-gray-800">148</p>
              <p class="text-sm text-gray-400 font-medium mb-1">/ 200</p>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-1.5 mt-3">
              <div class="bg-[#198341] h-1.5 rounded-full" style="width: 74%"></div>
            </div>
          </div>
          <div class="bg-[#198341]/10 p-3 rounded-xl">
            <svg class="w-6 h-6 text-[#198341]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Carte 2 : Taux de certification -->
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-gray-500 text-sm font-medium">Taux de certification</p>
            <div class="flex items-end gap-2 mt-1">
              <p class="text-3xl font-bold text-gray-800">82%</p>
              <p class="text-sm text-[#198341] font-medium mb-1">+2%</p>
            </div>
            <p class="text-xs text-gray-400 mt-3">Cisco / Oracle (Cible : ≥ 80%)</p>
          </div>
          <div class="bg-[#198341]/10 p-3 rounded-xl">
            <svg class="w-6 h-6 text-[#198341]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Carte 3 : Taux de femmes -->
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-gray-500 text-sm font-medium">Taux de femmes</p>
            <div class="flex items-end gap-2 mt-1">
              <p class="text-3xl font-bold text-gray-800">36%</p>
              <p class="text-sm text-[#198341] font-medium mb-1">Objectif</p>
            </div>
            <p class="text-xs text-gray-400 mt-3">Cible : ≥ 30 à 40%</p>
          </div>
          <div class="bg-[#198341]/10 p-3 rounded-xl">
            <svg class="w-6 h-6 text-[#198341]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Carte 4 : Kits pédagogiques -->
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-gray-500 text-sm font-medium">Kits pédagogiques</p>
            <div class="flex items-end gap-2 mt-1">
              <p class="text-3xl font-bold text-gray-800">4</p>
              <p class="text-sm text-gray-400 font-medium mb-1">/ 5 validés</p>
            </div>
            <p class="text-xs text-gray-400 mt-3">1 en cours de révision</p>
          </div>
          <div class="bg-[#198341]/10 p-3 rounded-xl">
            <svg class="w-6 h-6 text-[#198341]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= GRAPHIQUES ================= -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Graphique 1 : Répartition par filière (Prend 2 colonnes) -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-gray-800">Répartition des formateurs par filière</h3>
          <span class="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">Total : 200</span>
        </div>
        <div class="h-64">
          <Bar :data="filiereChartData" :options="chartOptions" />
        </div>
      </div>

      <!-- Graphique 2 : Statut des candidatures -->
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 class="text-lg font-bold text-gray-800 mb-4">Statut des candidatures</h3>
        <div class="h-64">
          <Doughnut :data="statusChartData" :options="doughnutOptions" />
        </div>
      </div>
    </div>

    <!-- ================= TABLEAU DES ACTIVITÉS RÉCENTES ================= -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 class="text-lg font-bold text-gray-800">Dernières candidatures validées</h3>
        <router-link to="/admin/candidatures" class="text-sm font-semibold text-[#198341] hover:underline flex items-center gap-1">
          Tout voir
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </router-link>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <th class="py-3 px-6">Candidat</th>
              <th class="py-3 px-6">Filière</th>
              <th class="py-3 px-6">Date de validation</th>
              <th class="py-3 px-6">Certification</th>
              <th class="py-3 px-6 text-center">Statut</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-sm">
            <tr v-for="(candidat, index) in recentCandidats" :key="index" class="hover:bg-gray-50 transition">
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-[#198341]/10 flex items-center justify-center text-[#198341] font-bold text-xs">
                    {{ candidat.initials }}
                  </div>
                  <div>
                    <p class="font-medium text-gray-800">{{ candidat.nom }}</p>
                    <p class="text-xs text-gray-500">{{ candidat.email }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6 text-gray-600">{{ candidat.filiere }}</td>
              <td class="py-4 px-6 text-gray-600">{{ candidat.date }}</td>
              <td class="py-4 px-6">
                <span class="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                  {{ candidat.certification }}
                </span>
              </td>
              <td class="py-4 px-6 text-center">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#198341]/10 text-[#198341]">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#198341]"></span>
                  Validé
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup>
import { Bar, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale,
  LinearScale, ArcElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

// ==================== DONNÉES GRAPHIQUE FILIÈRE ====================
const filiereChartData = {
  labels: ['Cybersécurité', 'Data Analysis', 'IT Support', 'Network Specialist', 'Intelligence Artificielle'],
  datasets: [
    {
      label: 'Formateurs formés',
      data: [38, 35, 30, 25, 20],
      backgroundColor: [
        'rgba(25, 131, 65, 0.9)',
        'rgba(25, 131, 65, 0.75)',
        'rgba(25, 131, 65, 0.6)',
        'rgba(25, 131, 65, 0.45)',
        'rgba(25, 131, 65, 0.3)'
      ],
      borderRadius: 6,
      borderWidth: 0
    },
    {
      label: 'Objectif (40)',
      data: [40, 40, 40, 40, 40],
      backgroundColor: 'rgba(229, 231, 235, 0.5)', // gris clair
      borderRadius: 6,
      borderWidth: 0
    }
  ]
}

// ==================== DONNÉES GRAPHIQUE STATUT ====================
const statusChartData = {
  labels: ['Validées', 'En attente', 'Rejetées', 'Liste d\'attente'],
  datasets: [
    {
      data: [148, 32, 10, 10],
      backgroundColor: [
        '#198341',
        '#f59e0b',
        '#ef4444',
        '#9ca3af'
      ],
      borderColor: '#ffffff',
      borderWidth: 2
    }
  ]
}

// ==================== OPTIONS GRAPHIQUES ====================
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true, position: 'bottom', labels: { usePointStyle: true, padding: 20 } }
  },
  scales: {
    y: { beginAtZero: true, max: 50, grid: { color: '#f3f4f6' } },
    x: { grid: { display: false } }
  }
}

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom', labels: { usePointStyle: true, padding: 15 } }
  },
  cutout: '75%'
}

// ==================== DONNÉES TABLEAU ====================
const recentCandidats = [
  { initials: 'AD', nom: 'Aya Diomandé', email: 'aya.d@email.ci', filiere: 'Cybersécurité', date: '12/10/2024', certification: 'Cisco CyberOps' },
  { initials: 'KT', nom: 'Koffi Traoré', email: 'k.traore@email.ci', filiere: 'Data Analysis', date: '12/10/2024', certification: 'Oracle Data' },
  { initials: 'MA', nom: 'Mariam Anouman', email: 'm.anouman@email.ci', filiere: 'Intelligence Artificielle', date: '11/10/2024', certification: 'Cisco AI' },
  { initials: 'YB', nom: 'Yao Bamba', email: 'y.bamba@email.ci', filiere: 'IT Support', date: '11/10/2024', certification: 'Cisco IT' },
  { initials: 'FS', nom: 'Fatou Sarr', email: 'f.sarr@email.ci', filiere: 'Network Specialist', date: '10/10/2024', certification: 'Cisco CCNA' },
]
</script>

<style scoped>
/* Optionnel : Personnalisation de la scrollbar */
</style>
