<template>
  <div class="min-h-screen bg-gray-50">


    <!-- Statistiques principales -->
    <div class="container mx-auto px-4 py-8">
      <!-- Cartes de statistiques -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-gray-500 text-sm">Coursiers inscrits</p>
              <p class="text-3xl font-bold text-primary">1,248</p>
              <p class="text-green-600 text-sm mt-2">+12% cette semaine</p>
            </div>
            <div class="bg-primary/10 p-3 rounded-lg">
              <i class='bx bx-user text-2xl text-primary'></i>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-secondary">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-gray-500 text-sm">Cours actifs</p>
              <p class="text-3xl font-bold text-secondary">856</p>
              <p class="text-green-600 text-sm mt-2">+5% aujourd'hui</p>
            </div>
            <div class="bg-secondary/10 p-3 rounded-lg">
              <i class='bx bx-bike text-2xl text-secondary'></i>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-gray-500 text-sm">Modules complétés</p>
              <p class="text-3xl font-bold text-blue-500">3,452</p>
              <p class="text-green-600 text-sm mt-2">+124 cette semaine</p>
            </div>
            <div class="bg-blue-500/10 p-3 rounded-lg">
              <i class='bx bx-check-circle text-2xl text-blue-500'></i>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-gray-500 text-sm">Taux de réussite</p>
              <p class="text-3xl font-bold text-purple-500">87%</p>
              <p class="text-green-600 text-sm mt-2">+3% vs mois dernier</p>
            </div>
            <div class="bg-purple-500/10 p-3 rounded-lg">
              <i class='bx bx-trophy text-2xl text-purple-500'></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Graphiques principaux -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Progression par module -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-bold text-primary mb-4 flex items-center gap-2">
            <i class='bx bx-line-chart'></i>
            Progression par module
          </h3>
          <Bar :data="moduleProgressData" :options="chartOptions" />
        </div>

        <!-- Répartition des coursiers par statut -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-bold text-primary mb-4 flex items-center gap-2">
            <i class='bx bx-pie-chart-alt'></i>
            Statut des coursiers
          </h3>
          <Doughnut :data="coursierStatusData" :options="doughnutOptions" />
        </div>
      </div>

      <!-- Deuxième ligne de graphiques -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Évolution hebdomadaire -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-bold text-primary mb-4 flex items-center gap-2">
            <i class='bx bx-trending-up'></i>
            Nouveaux coursiers (7 derniers jours)
          </h3>
          <Line :data="weeklyData" :options="lineOptions" />
        </div>

        <!-- Performance par ville -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-bold text-primary mb-4 flex items-center gap-2">
            <i class='bx bx-map'></i>
            Répartition géographique
          </h3>
          <Pie :data="cityData" :options="pieOptions" />
        </div>
      </div>

      <!-- Tableau des dernières activités -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h3 class="text-lg font-bold text-primary mb-4 flex items-center gap-2">
          <i class='bx bx-time'></i>
          Dernières activités
        </h3>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b-2 border-gray-200">
                <th class="text-left py-3 px-4 text-gray-600">Coursier</th>
                <th class="text-left py-3 px-4 text-gray-600">Module</th>
                <th class="text-left py-3 px-4 text-gray-600">Progression</th>
                <th class="text-left py-3 px-4 text-gray-600">Date</th>
                <th class="text-left py-3 px-4 text-gray-600">Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(activity, index) in recentActivities" :key="index" class="border-b border-gray-100 hover:bg-gray-50">
                <td class="py-3 px-4">{{ activity.coursier }}</td>
                <td class="py-3 px-4">{{ activity.module }}</td>
                <td class="py-3 px-4">
                  <div class="flex items-center gap-2">
                    <div class="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        class="bg-primary h-2 rounded-full"
                        :style="{ width: activity.progression + '%' }"
                      ></div>
                    </div>
                    <span class="text-sm">{{ activity.progression }}%</span>
                  </div>
                </td>
                <td class="py-3 px-4">{{ activity.date }}</td>
                <td class="py-3 px-4">
                  <span
                    class="px-2 py-1 rounded-full text-xs font-semibold"
                    :class="{
                      'bg-green-100 text-green-800': activity.statut === 'Actif',
                      'bg-yellow-100 text-yellow-800': activity.statut === 'En cours',
                      'bg-blue-100 text-blue-800': activity.statut === 'Terminé'
                    }"
                  >
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
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement, ArcElement, Filler } from 'chart.js'

// Enregistrement des composants Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement, ArcElement, Filler)

// Données pour le graphique de progression par module
const moduleProgressData = {
  labels: ['Module 1', 'Module 2', 'Module 3', 'Module 4', 'Module 5', 'Module 6'],
  datasets: [
    {
      label: 'Taux de complétion (%)',
      data: [85, 72, 68, 91, 45, 63],
      backgroundColor: [
        'rgba(36, 79, 144, 0.8)',
        'rgba(255, 220, 0, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(34, 197, 94, 0.8)'
      ],
      borderColor: [
        '#225095',
        '#FFDC00',
        '#3B82F6',
        '#A855F7',
        '#EC4899',
        '#22C55E'
      ],
      borderWidth: 1
    }
  ]
}

// Données pour le graphique des statuts des coursiers
const coursierStatusData = {
  labels: ['Actifs', 'En formation', 'En pause', 'Inactifs'],
  datasets: [
    {
      data: [856, 234, 98, 60],
      backgroundColor: [
        'rgba(36, 79, 144, 0.8)',
        'rgba(255, 220, 0, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(156, 163, 175, 0.8)'
      ],
      borderColor: [
        '#225095',
        '#FFDC00',
        '#3B82F6',
        '#9CA3AF'
      ],
      borderWidth: 1
    }
  ]
}

// Données pour l'évolution hebdomadaire
const weeklyData = {
  labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
  datasets: [
    {
      label: 'Nouveaux inscrits',
      data: [24, 32, 28, 35, 42, 18, 12],
      borderColor: '#225095',
      backgroundColor: 'rgba(34, 79, 144, 0.2)',
      tension: 0.4,
      fill: true
    }
  ]
}

// Données pour la répartition par ville
const cityData = {
  labels: ['Abidjan', 'Bouaké', 'Yamoussoukro', 'San-Pédro', 'Autres'],
  datasets: [
    {
      data: [856, 234, 156, 98, 104],
      backgroundColor: [
        'rgba(36, 79, 144, 0.8)',
        'rgba(255, 220, 0, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(236, 72, 153, 0.8)'
      ]
    }
  ]
}

// Options communes
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100
    }
  }
}

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
}

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  }
}

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
}

// Données du tableau des activités récentes
const recentActivities = ref([
  { coursier: 'Kouassi Jean', module: 'Module 1 - Éducation routière', progression: 100, date: '2024-01-15', statut: 'Terminé' },
  { coursier: 'Touré Amadou', module: 'Module 2 - Sécurité', progression: 75, date: '2024-01-15', statut: 'En cours' },
  { coursier: 'N\'Guessan Marie', module: 'Module 1 - Éducation routière', progression: 45, date: '2024-01-14', statut: 'En cours' },
  { coursier: 'Bamba Moussa', module: 'Module 3 - Livraison', progression: 90, date: '2024-01-14', statut: 'Actif' },
  { coursier: 'Konan Philippe', module: 'Module 1 - Éducation routière', progression: 100, date: '2024-01-13', statut: 'Terminé' },
  { coursier: 'Diallo Fatou', module: 'Module 2 - Sécurité', progression: 30, date: '2024-01-13', statut: 'En cours' }
])
</script>

<style scoped>
/* Styles pour les conteneurs de graphiques */
canvas {
  max-height: 300px;
  max-width: 100%;
}

/* Animation pour les cartes */
.bg-white {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.bg-white:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}
</style>
