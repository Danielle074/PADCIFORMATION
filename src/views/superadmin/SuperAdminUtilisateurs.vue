<template>
  <div class="space-y-6">
    <!-- EN-TÊTE -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Gestion des Accès</h1>
        <p class="text-sm text-gray-500 mt-1">Gérez les rôles et les permissions de la plateforme</p>
      </div>
      <button
        @click="showAddModal = true"
        class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-medium shadow-sm transition text-sm flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Ajouter un utilisateur
      </button>
    </div>

    <!-- TABLEAU DES UTILISATEURS -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <th class="py-4 px-6">Utilisateur</th>
              <th class="py-4 px-6">Rôle</th>
              <th class="py-4 px-6">Institution</th>
              <th class="py-4 px-6">Dernière connexion</th>
              <th class="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-sm">
            <tr v-for="user in utilisateurs" :key="user.id" class="hover:bg-gray-50 transition">
              <!-- Utilisateur -->
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                    :class="getRoleColors(user.role).bg"
                  >
                    <span :class="getRoleColors(user.role).text">{{ user.initials }}</span>
                  </div>
                  <div>
                    <p class="font-bold text-gray-800">{{ user.nom }}</p>
                    <p class="text-xs text-gray-500">{{ user.email }}</p>
                  </div>
                </div>
              </td>

              <!-- Rôle -->
              <td class="py-4 px-6">
                <span
                  class="px-2.5 py-1 rounded-md text-xs font-bold"
                  :class="[getRoleColors(user.role).bg, getRoleColors(user.role).text]"
                >
                  {{ user.role }}
                </span>
              </td>

              <!-- Institution -->
              <td class="py-4 px-6 text-gray-600">{{ user.institution }}</td>

              <!-- Dernière connexion -->
              <td class="py-4 px-6 text-gray-500">{{ user.derniereConnexion }}</td>

              <!-- Actions -->
              <td class="py-4 px-6 text-center">
                <span v-if="user.estMoi" class="text-xs italic text-gray-400">(C'est vous)</span>
                <button
                  v-else
                  @click="ouvrirSuppression(user)"
                  class="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                  title="Supprimer"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ================= MODALE D'AJOUT ================= -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-modal">
        <!-- En-tête -->
        <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 class="text-lg font-bold text-gray-800">Ajouter un utilisateur</h3>
          <button @click="showAddModal = false" class="text-gray-400 hover:text-red-500 p-1 rounded-lg hover:bg-red-50 transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- Formulaire -->
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
            <input v-model="newUser.nom" type="text" placeholder="Ex: Jean Kouassi" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email professionnel</label>
            <input v-model="newUser.email" type="email" placeholder="Ex: j.kouassi@padci.ci" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm">
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
              <select v-model="newUser.role" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm bg-white">
                <option value="Admin (EMSP)">Admin (EMSP)</option>
                <option value="Lecteur (Supervision)">Lecteur (Supervision)</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Institution</label>
              <select v-model="newUser.institution" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm bg-white">
                <option value="EMSP">EMSP</option>
                <option value="MTNIT / UCP">MTNIT / UCP</option>
                <option value="Banque Mondiale">Banque Mondiale</option>
                <option value="Partenaire">Partenaire (Cisco, Oracle...)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Pied -->
        <div class="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button @click="showAddModal = false" class="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
            Annuler
          </button>
          <button @click="ajouterUtilisateur" class="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition shadow-sm">
            Créer l'utilisateur
          </button>
        </div>
      </div>
    </div>

    <!-- ================= MODALE DE SUPPRESSION ================= -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-modal">
        <div class="p-6 text-center">
          <div class="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-800 mb-2">Supprimer cet utilisateur ?</h3>
          <p class="text-sm text-gray-500 mb-6">
            Voulez-vous vraiment retirer l'accès de <strong>{{ selectedUser?.nom }}</strong> ? Cette action est irréversible.
          </p>

          <div class="flex gap-3">
            <button @click="showDeleteModal = false" class="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition">
              Annuler
            </button>
            <button @click="supprimerUtilisateur" class="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition shadow-md shadow-red-500/30">
              Supprimer
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
type Role = 'Super Admin' | 'Admin (EMSP)' | 'Lecteur (Supervision)'

interface Utilisateur {
  id: number
  initials: string
  nom: string
  email: string
  role: Role
  institution: string
  derniereConnexion: string
  estMoi?: boolean
}

// ==================== ÉTAT ====================
const utilisateurs = ref<Utilisateur[]>([
  {
    id: 1,
    initials: 'AD',
    nom: 'Admin UCP',
    email: 'admin@padci.ci',
    role: 'Super Admin',
    institution: 'MTNIT / UCP',
    derniereConnexion: "Aujourd'hui, 08:30",
    estMoi: true
  },
  {
    id: 2,
    initials: 'EM',
    nom: 'Direction EMSP',
    email: 'direction@emsp.ci',
    role: 'Admin (EMSP)',
    institution: 'EMSP',
    derniereConnexion: 'Hier, 16:45'
  },
  {
    id: 3,
    initials: 'BM',
    nom: 'Expert Banque Mondiale',
    email: 'expert@worldbank.org',
    role: 'Lecteur (Supervision)',
    institution: 'Banque Mondiale',
    derniereConnexion: '10/10/2024'
  }
])

// Modales
const showAddModal = ref<boolean>(false)
const showDeleteModal = ref<boolean>(false)
const selectedUser = ref<Utilisateur | null>(null)

// Formulaire d'ajout
const newUser = ref({
  nom: '',
  email: '',
  role: 'Admin (EMSP)' as Role,
  institution: 'EMSP'
})

// ==================== MÉTHODES ====================
const getRoleColors = (role: Role) => {
  switch (role) {
    case 'Super Admin':
      return { bg: 'bg-orange-100', text: 'text-orange-700' }
    case 'Admin (EMSP)':
      return { bg: 'bg-blue-100', text: 'text-blue-700' }
    case 'Lecteur (Supervision)':
      return { bg: 'bg-gray-100', text: 'text-gray-600' }
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-600' }
  }
}

const ajouterUtilisateur = () => {
  if (!newUser.value.nom || !newUser.value.email) {
    alert('Veuillez remplir le nom et l\'email.')
    return
  }

  // Génération des initiales
  const initials = newUser.value.nom
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)

  // Ajout à la liste
  utilisateurs.value.push({
    id: Date.now(),
    initials,
    nom: newUser.value.nom,
    email: newUser.value.email,
    role: newUser.value.role,
    institution: newUser.value.institution,
    derniereConnexion: 'Jamais connecté'
  })

  // Reset & fermeture
  newUser.value = { nom: '', email: '', role: 'Admin (EMSP)', institution: 'EMSP' }
  showAddModal.value = false
}

const ouvrirSuppression = (user: Utilisateur) => {
  selectedUser.value = user
  showDeleteModal.value = true
}

const supprimerUtilisateur = () => {
  if (selectedUser.value) {
    utilisateurs.value = utilisateurs.value.filter(u => u.id !== selectedUser.value?.id)
    showDeleteModal.value = false
    selectedUser.value = null
  }
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
