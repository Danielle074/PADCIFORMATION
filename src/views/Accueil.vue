<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-10">

    <!-- HEADER / BANNIÈRE ENTIÈREMENT VISIBLE -->
    <section class="relative w-full bg-white overflow-hidden shadow-sm">
      <img
        :src="bannerImage"
        alt="Bannière PADCI Formation"
        class="w-full h-auto object-contain"
      />
    </section>

    <!-- TROIS BOUTONS ALIGNÉS SOUS LA BANNIÈRE -->
    <div class="flex flex-wrap justify-between items-center gap-4 mt-6 mb-6 px-4">
      <!-- Bouton Ville avec icône et chevron -->
      <div class="relative flex-1 min-w-[200px]">
        <select
          v-model="selectedCity"
          class="w-full appearance-none bg-white border border-gray-200 rounded-full pl-10 pr-10 py-3 text-sm text-gray-700 font-medium shadow hover:border-primary focus:border-primary focus:outline-none transition-all duration-300 cursor-pointer"
        >
          <option value="" disabled selected>Ville</option>
          <option v-for="city in cities" :key="city.code" :value="city.code">
            {{ city.name }}
          </option>
        </select>
        <!-- Icône Boxicon à gauche -->
        <div class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <i class='bx bx-map text-lg text-primary'></i>
        </div>
        <!-- Chevron à droite DANS LE BOUTON -->
        <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <i class='bx bx-chevron-down text-lg text-primary'></i>
        </div>
      </div>

      <!-- Bouton Actualisé -->
      <button
        @click="updateData"
        class="flex-1 min-w-[150px] bg-primary text-white font-bold py-3 px-4 rounded-full shadow hover:bg-primary/90 hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
      >
        <i class='bx bx-refresh text-lg group-hover:rotate-180 transition-transform duration-500'></i>
        <span>Actualisé</span>
      </button>
    </div>

    <!-- LIGNE BOUTON AJOUTER + BARRE DE RECHERCHE -->
    <div class="flex flex-wrap justify-between items-center gap-4 mb-4 px-4">
      <!-- Bouton Ajouter à gauche -->
      <router-link
        to="/nouvelle-demande"
        class="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg shadow transition-all duration-300 flex items-center justify-center gap-2 group"
      >
        <i class="bx bx-plus-circle text-lg group-hover:rotate-90 transition-transform duration-300"></i>
        <span>Ajouter une nouvelle demande</span>
      </router-link>

      <!-- Barre de recherche à droite -->
      <div class="relative w-full sm:w-72">
        <i class='bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base'></i>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Rechercher..."
          class="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 focus:border-primary focus:outline-none shadow-sm transition-all duration-300 text-sm"
        >
      </div>
    </div>

    <!-- TABLEAU -->
    <div class="bg-white rounded-lg shadow overflow-hidden mx-4">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-secondary">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-bold text-primary uppercase">Nom de formation</th>
              <th class="px-4 py-3 text-left text-xs font-bold text-primary uppercase">Spécificité de la formation</th>
              <th class="px-4 py-3 text-left text-xs font-bold text-primary uppercase">Date de début</th>
              <th class="px-4 py-3 text-left text-xs font-bold text-primary uppercase">Nombre de place</th>
              <th class="px-4 py-3 text-left text-xs font-bold text-primary uppercase">Cours</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">
            <tr v-for="(app, index) in paginatedApplications" :key="index" class="hover:bg-yellow-50 transition-colors duration-200">
              <td class="px-4 py-3 text-sm text-gray-900">
                {{ app.service }}
              </td>
              <td class="px-4 py-3 text-sm text-gray-600">
                {{ app.subservice }}
              </td>
              <td class="px-4 py-3 text-sm text-gray-600">
                {{ app.date }}
              </td>
              <td class="px-4 py-3 text-sm text-gray-600">
                {{ app.status }}
              </td>
              <td class="px-4 py-3 text-sm">
                <!-- ROUTER LINK MODIFIABLE -->
                <router-link
                  :to="app.route"
                  class="text-primary hover:text-primary/90 inline-flex items-center justify-center bg-gray-50 w-10 h-10 rounded-full border border-gray-200 hover:border-primary transition-all group"
                >
                  <i class='bx bx-show text-xl group-hover:scale-110 transition-transform'></i>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- PAGINATION -->
      <div class="bg-white px-4 py-3 border-t border-gray-200">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div class="text-sm text-gray-700 text-center sm:text-left">
            Page {{ currentPage }} sur {{ totalPages }}
          </div>
          <div class="flex justify-center sm:justify-end">
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button @click="prevPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <i class='bx bx-chevron-left text-lg'></i>
              </button>
              <button v-for="page in displayedPages" :key="page" @click="goToPage(page)" :class="[
                'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                currentPage === page
                  ? 'z-10 bg-primary border-primary text-white'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              ]">
                {{ page }}
              </button>
              <button @click="nextPage" :disabled="currentPage === totalPages" class="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <i class='bx bx-chevron-right text-lg'></i>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bannerImage from '@/assets/images/banierepadciformation.png'

export default {
  name: 'HomeView',
  data() {
    return {
      bannerImage,
      selectedCity: 'ABJ',
      selectedPostalAgency: '',
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 5,

      cities: [
        { code: 'ABJ', name: 'Abidjan' },
        { code: 'YOP', name: 'Yopougon' },
        { code: 'COC', name: 'Cocody' },
        { code: 'PLA', name: 'Plateau' },
        { code: 'ADJ', name: 'Adjamé' },
        { code: 'TRE', name: 'Treichville' },
        { code: 'MAR', name: 'Marcory' },
        { code: 'KOU', name: 'Koumassi' },
        { code: 'POR', name: 'Port-Bouët' },
        { code: 'BIN', name: 'Bingerville' }
      ],

      postalAgencies: [
        { code: 'KOU1', name: 'Koumassi - Centre' },
        { code: 'KOU2', name: 'Koumassi - Campement' },
        { code: 'KOU3', name: 'Koumassi - Remblais' },
        { code: 'KOU4', name: 'Koumassi - Nord' },
        { code: 'KOU5', name: 'Koumassi - Sud' }
      ],

      applications: [
        {
          service: 'Cyber sécurité',
          subservice: 'Formation avancée',
          date: '2024-01-21',
          status: '2/50',
          route: '/formations/network/dashboard'
        },
        {
          service: 'Data Analytics',
          subservice: 'Analyse de données',
          date: '2024-01-15',
          status: '2/60',
          route: '/formations/network/dashboard'
        },
        {
          service: 'IT Support',
          subservice: 'Assistance technique',
          date: '2024-01-16',
          status: '3/60',
          route: '/formations/network/dashboard'
        },
        {
          service: 'Network Specialist',
          subservice: 'Administration réseau',
          date: '2024-01-17',
          status: '5/60',
          route: '/formations/network/dashboard'
        },
        {
          service: 'Artificial Intelligence',
          subservice: 'Apprentissage automatique',
          date: '2024-01-18',
          status: '30/60',
          route: '/formations/network/dashboard'
        }
      ]
    }
  },

  computed: {
    filteredApplications() {
      if (!this.searchQuery) {
        return this.applications
      }
      const query = this.searchQuery.toLowerCase()
      return this.applications.filter(app =>
        app.service.toLowerCase().includes(query) ||
        app.subservice.toLowerCase().includes(query)
      )
    },

    paginatedApplications() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredApplications.slice(start, end)
    },

    totalPages() {
      return Math.ceil(this.filteredApplications.length / this.itemsPerPage)
    },

    displayedPages() {
      const pages = []
      const maxVisible = 5
      let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2))
      let end = Math.min(this.totalPages, start + maxVisible - 1)

      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1)
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    }
  },

  watch: {
    searchQuery() {
      this.currentPage = 1
    }
  },

  methods: {
    getCityName(code) {
      const city = this.cities.find(c => c.code === code)
      return city ? city.name : 'Abidjan'
    },

    updateData() {
      if (this.selectedCity && this.selectedPostalAgency) {
        alert(`Actualisation pour ${this.getCityName(this.selectedCity)} - ${this.selectedPostalAgency}`)
      } else if (this.selectedCity) {
        alert(`Actualisation pour ${this.getCityName(this.selectedCity)}`)
      } else {
        alert('Veuillez sélectionner une ville.')
      }
    },

    getStatusClass(status) {
      const classes = {
        'En cours': 'bg-primary text-secondary',
        'Soumis': 'bg-primary text-white',
        'Validé': 'bg-primary text-secondary',
        'En attente': 'bg-yellow-100 text-yellow-800',
        'Disponible': 'bg-blue-100 text-blue-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },

    goToPage(page) {
      this.currentPage = page
    }
  }
}
</script>

<style scoped>
/* Animation pour le chevron */
.bx-chevron-down {
  transition: transform 0.3s ease;
}

select:hover + div .bx-chevron-down {
  transform: translateY(2px);
}

/* Style pour l'autofill */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
  transition: background-color 5000s ease-in-out 0s;
}

/* Animation pour le bouton refresh */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.group:hover .bx-refresh {
  animation: spin 1s ease infinite;
}

/* Style pour le tableau */
tr {
  transition: all 0.2s ease;
}

/* Style pour les badges */
span.rounded-full {
  display: inline-block;
  white-space: nowrap;
}

/* Style pour le bouton d'action */
.router-link-active {
  background-color: #007668 !important;
  color: white !important;
}
</style>
