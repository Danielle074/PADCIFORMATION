<template>
  <div class="space-y-6">
    <!-- EN-TÊTE -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Vue Globale PADCI</h1>
        <p class="text-sm text-gray-500 mt-1">Pilotage stratégique des 4 composantes (UCP - MTNIT)</p>
      </div>
      <div class="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
        <div class="w-2 h-2 rounded-full bg-orange-300 animate-pulse"></div>
        <span class="text-sm font-medium text-gray-600">Financement : Banque Mondiale (IPF)</span>
      </div>
    </div>

    <!-- BANDEAU BUDGET -->
    <div class="bg-gradient-to-r from-orange-400 to-orange-400 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
      <div class="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p class="text-white/80 text-sm font-medium">Budget Global Phase 1 (2025-2030)</p>
          <h2 class="text-4xl font-bold mt-1">128.6 M €</h2>
        </div>
        <div class="w-full md:w-64">
          <div class="flex justify-between text-sm mb-1">
            <span class="text-white/80">Consommation</span>
            <span class="font-bold">15%</span>
          </div>
          <div class="w-full bg-black/20 rounded-full h-3">
            <div class="bg-white h-3 rounded-full" style="width: 15%"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- STATISTIQUES CLÉS -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-gray-500 text-sm font-medium">Formateurs certifiés</p>
            <p class="text-3xl font-bold text-orange-600 mt-1">148 <span class="text-sm text-gray-400 font-normal">/ 200</span></p>
            <p class="text-xs text-green-600 mt-2 font-medium">Cible : ≥ 80%</p>
          </div>
          <div class="bg-orange-50 p-3 rounded-xl"><svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg></div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-gray-500 text-sm font-medium">Taux de parité (Femmes)</p>
            <p class="text-3xl font-bold text-orange-600 mt-1">36%</p>
            <p class="text-xs text-green-600 mt-2 font-medium">Objectif : 30-40%</p>
          </div>
          <div class="bg-orange-50 p-3 rounded-xl"><svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg></div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-gray-500 text-sm font-medium">Kits pédagogiques</p>
            <p class="text-3xl font-bold text-orange-600 mt-1">4 <span class="text-sm text-gray-400 font-normal">/ 5</span></p>
            <p class="text-xs text-amber-600 mt-2 font-medium">1 en cours de validation</p>
          </div>
          <div class="bg-orange-50 p-3 rounded-xl"><svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg></div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-gray-500 text-sm font-medium">ANO en attente</p>
            <p class="text-3xl font-bold text-orange-600 mt-1">3</p>
            <p class="text-xs text-gray-500 mt-2 font-medium">Actions requises</p>
          </div>
          <div class="bg-orange-50 p-3 rounded-xl"><svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
        </div>
      </div>
    </div>

    <!-- GRAPHIQUES -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 class="text-lg font-bold text-gray-800 mb-4">Répartition du budget par Composante</h3>
        <div class="h-64"><Doughnut :data="budgetChartData" :options="chartOptions" /></div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 class="text-lg font-bold text-gray-800 mb-4">Progression globale du projet (%)</h3>
        <div class="h-64"><Bar :data="progressChartData" :options="chartOptions" /></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Doughnut, Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale)

// Couleurs de séries Chart.js : les options de config n'acceptent pas de
// classes Tailwind — valeurs littérales calées sur la famille --color-primary
// (#198341 / #22a854 / #146b34), '#9ca3af' gris de contraste pour la 4e part.
const budgetChartData = {
  labels: ['Fondements', 'Connectivité', 'Services Numériques', 'Gestion Projet'],
  datasets: [{
    data: [25, 45, 20, 10],
    backgroundColor: ['#198341', '#22a854', '#146b34', '#9ca3af'],
    borderWidth: 2,
    borderColor: '#ffffff'
  }]
}

const progressChartData = {
  labels: ['Composante 1', 'Composante 2', 'Composante 3', 'Composante 4'],
  datasets: [{
    label: 'Avancement (%)',
    data: [35, 20, 45, 60],
    backgroundColor: '#198341',
    borderRadius: 6
  }]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom', labels: { usePointStyle: true } } }
}
</script>
