<template>
  <div class="min-h-screen bg-gray-50">

    <!-- En-tête de bienvenue -->
    <div class="bg-gradient-to-r from-[#198341] to-[#22a854] text-white">
      <div class="container mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p class="text-white/80 text-sm">Bonjour,</p>
            <h1 class="text-2xl md:text-3xl font-bold mt-1">Kouassi Jean </h1>
            <p class="text-white/80 text-sm mt-1">
              Formation : <span class="font-semibold">Cyber Security</span> · Promotion 2024
            </p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/20">
            <p class="text-xs text-white/80">Progression globale</p>
            <div class="flex items-center gap-3 mt-1">
              <div class="w-32 bg-white/20 rounded-full h-2.5">
                <div class="bg-white h-2.5 rounded-full" style="width: 68%"></div>
              </div>
              <span class="font-bold text-lg">68%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">

      <!-- Cartes de statistiques -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#198341] hover:shadow-lg transition">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-gray-500 text-sm">Modules suivis</p>
              <p class="text-3xl font-bold text-[#198341]">6</p>
              <p class="text-green-600 text-sm mt-2">2 en cours</p>
            </div>
            <div class="bg-[#198341]/10 p-3 rounded-lg">
              <svg class="w-6 h-6 text-[#198341]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500 hover:shadow-lg transition">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-gray-500 text-sm">Heures d'étude</p>
              <p class="text-3xl font-bold text-yellow-500">124h</p>
              <p class="text-green-600 text-sm mt-2">+8h cette semaine</p>
            </div>
            <div class="bg-yellow-500/10 p-3 rounded-lg">
              <svg class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-gray-500 text-sm">Certificats obtenus</p>
              <p class="text-3xl font-bold text-blue-500">4</p>
              <p class="text-green-600 text-sm mt-2">2 en attente</p>
            </div>
            <div class="bg-blue-500/10 p-3 rounded-lg">
              <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-gray-500 text-sm">Moyenne générale</p>
              <p class="text-3xl font-bold text-purple-500">15.8/20</p>
              <p class="text-green-600 text-sm mt-2">+0.5 vs trimestre</p>
            </div>
            <div class="bg-purple-500/10 p-3 rounded-lg">
              <svg class="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Prochains cours / Deadline -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Prochain cours -->
        <div class="lg:col-span-2 bg-gradient-to-br from-[#198341] to-[#22a854] rounded-xl shadow-lg p-6 text-white">
          <div class="flex items-center gap-2 text-white/90 text-sm mb-3">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Prochain cours
          </div>
          <h3 class="text-xl md:text-2xl font-bold mb-1">Introduction au Pentesting</h3>
          <p class="text-white/80 text-sm mb-4">Module 4 · Sécurité offensive</p>
          <div class="flex flex-wrap items-center gap-4 text-sm">
            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Demain · 09h00
            </div>
            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Salle B12 · Campus
            </div>
            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              M. Traoré
            </div>
          </div>
          <button class="mt-5 bg-white text-[#198341] font-semibold px-5 py-2.5 rounded-lg hover:bg-white/90 transition inline-flex items-center gap-2">
            Rejoindre le cours
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        <!-- Deadline -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-bold text-[#198341] mb-4 flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Échéances proches
          </h3>
          <ul class="space-y-3">
            <li v-for="(d, i) in deadlines" :key="i"
                class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition border border-gray-100">
              <div class="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                   :class="d.urgent ? 'bg-red-500' : 'bg-[#198341]'"></div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-800 truncate">{{ d.titre }}</p>
                <p class="text-xs text-gray-500 mt-0.5">{{ d.date }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Graphiques principaux -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Progression par module -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-bold text-[#198341] mb-4 flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Progression par module
          </h3>
          <div class="h-64">
            <Bar :data="moduleProgressData" :options="chartOptions" />
          </div>
        </div>

        <!-- Répartition du temps d'étude -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-bold text-[#198341] mb-4 flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            Répartition du temps d'étude
          </h3>
          <div class="h-64">
            <Doughnut :data="studyTimeData" :options="doughnutOptions" />
          </div>
        </div>
      </div>

      <!-- Deuxième ligne de graphiques -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Évolution hebdomadaire -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-bold text-[#198341] mb-4 flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Heures d'étude (7 derniers jours)
          </h3>
          <div class="h-64">
            <Line :data="weeklyData" :options="lineOptions" />
          </div>
        </div>

        <!-- Notes par matière -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-bold text-[#198341] mb-4 flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Résultats par matière
          </h3>
          <div class="h-64">
            <Pie :data="gradesData" :options="pieOptions" />
          </div>
        </div>
      </div>

      <!-- Tableau des dernières activités -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-[#198341] flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Mes dernières activités
          </h3>
          <a href="#" class="text-sm text-[#198341] font-medium hover:underline">Tout voir</a>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b-2 border-gray-200">
                <th class="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Module / Cours</th>
                <th class="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Type</th>
                <th class="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Progression</th>
                <th class="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Date</th>
                <th class="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(activity, index) in recentActivities" :key="index"
                  class="border-b border-gray-100 hover:bg-gray-50 transition">
                <td class="py-3 px-4 text-sm font-medium text-gray-800">{{ activity.module }}</td>
                <td class="py-3 px-4 text-sm text-gray-600">{{ activity.type }}</td>
                <td class="py-3 px-4">
                  <div class="flex items-center gap-2">
                    <div class="w-24 bg-gray-200 rounded-full h-2">
                      <div class="bg-[#198341] h-2 rounded-full transition-all"
                           :style="{ width: activity.progression + '%' }"></div>
                    </div>
                    <span class="text-sm text-gray-700 font-medium">{{ activity.progression }}%</span>
                  </div>
                </td>
                <td class="py-3 px-4 text-sm text-gray-600">{{ activity.date }}</td>
                <td class="py-3 px-4">
                  <span class="px-2.5 py-1 rounded-full text-xs font-semibold"
                    :class="{
                      'bg-green-100 text-green-800': activity.statut === 'Terminé',
                      'bg-yellow-100 text-yellow-800': activity.statut === 'En cours',
                      'bg-blue-100 text-blue-800': activity.statut === 'À venir'
                    }">
                    {{ activity.statut }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Bar, Doughnut, Line, Pie } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale,
  LinearScale, LineElement, PointElement, ArcElement, Filler
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement, ArcElement, Filler)

// Progression par module
const moduleProgressData = {
  labels: ['Cybersécurité', 'Réseaux', 'Data Analysis', 'Pentesting', 'IA', 'Cloud'],
  datasets: [{
    label: 'Progression (%)',
    data: [100, 85, 72, 45, 30, 20],
    backgroundColor: [
      'rgba(25, 131, 65, 0.8)',
      'rgba(34, 168, 84, 0.8)',
      'rgba(59, 130, 246, 0.8)',
      'rgba(168, 85, 247, 0.8)',
      'rgba(236, 72, 153, 0.8)',
      'rgba(251, 191, 36, 0.8)'
    ],
    borderColor: ['#198341', '#22a854', '#3B82F6', '#A855F7', '#EC4899', '#FBBF24'],
    borderWidth: 1,
    borderRadius: 6
  }]
}

// Temps d'étude par catégorie
const studyTimeData = {
  labels: ['Cours en ligne', 'TP pratiques', 'Révisions', 'Projets'],
  datasets: [{
    data: [45, 30, 15, 10],
    backgroundColor: [
      'rgba(25, 131, 65, 0.85)',
      'rgba(59, 130, 246, 0.85)',
      'rgba(251, 191, 36, 0.85)',
      'rgba(168, 85, 247, 0.85)'
    ],
    borderColor: ['#198341', '#3B82F6', '#FBBF24', '#A855F7'],
    borderWidth: 2
  }]
}

// Évolution hebdomadaire
const weeklyData = {
  labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
  datasets: [{
    label: 'Heures étudiées',
    data: [3, 4.5, 2.5, 5, 3.5, 2, 1],
    borderColor: '#198341',
    backgroundColor: 'rgba(25, 131, 65, 0.15)',
    tension: 0.4,
    fill: true,
    pointBackgroundColor: '#198341',
    pointBorderColor: '#fff',
    pointBorderWidth: 2,
    pointRadius: 5
  }]
}

// Résultats par matière
const gradesData = {
  labels: ['Cybersécurité', 'Réseaux', 'Data', 'IA'],
  datasets: [{
    data: [18, 15, 14, 16],
    backgroundColor: [
      'rgba(25, 131, 65, 0.85)',
      'rgba(59, 130, 246, 0.85)',
      'rgba(251, 191, 36, 0.85)',
      'rgba(168, 85, 247, 0.85)'
    ],
    borderColor: ['#198341', '#3B82F6', '#FBBF24', '#A855F7'],
    borderWidth: 2
  }]
}

// Options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { beginAtZero: true, max: 100, ticks: { callback: (v) => v + '%' } }
  }
}

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom', labels: { padding: 15, usePointStyle: true } } }
}

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: { y: { beginAtZero: true, ticks: { callback: (v) => v + 'h' } } }
}

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom', labels: { padding: 15, usePointStyle: true } } }
}

// Échéances
const deadlines = ref([
  { titre: 'Projet Pentesting - Rendu final', date: 'Aujourd\'hui · 23h59', urgent: true },
  { titre: 'Quiz Réseaux - Module 3', date: 'Demain · 10h00', urgent: true },
  { titre: 'TP Data Analysis', date: '15 janv. 2024', urgent: false },
  { titre: 'Examen Cybersécurité', date: '20 janv. 2024', urgent: false }
])

// Activités récentes
const recentActivities = ref([
  { module: 'Cybersécurité - Les bases', type: 'Cours vidéo', progression: 100, date: '15 janv.', statut: 'Terminé' },
  { module: 'Réseaux - Protocole TCP/IP', type: 'Cours vidéo', progression: 85, date: '15 janv.', statut: 'En cours' },
  { module: 'Data Analysis - Python Pandas', type: 'TP pratique', progression: 72, date: '14 janv.', statut: 'En cours' },
  { module: 'Pentesting - Reconnaissance', type: 'Cours vidéo', progression: 45, date: '14 janv.', statut: 'En cours' },
  { module: 'IA - Introduction ML', type: 'Quiz', progression: 30, date: '13 janv.', statut: 'En cours' },
  { module: 'Cloud - AWS Fundamentals', type: 'Cours vidéo', progression: 0, date: '20 janv.', statut: 'À venir' }
])
</script>

<style scoped>
.bg-white {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
</style>
