<template>
  <div class="space-y-6 max-w-5xl">

    <!-- ================= EN-TÊTE ================= -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Paramètres</h1>
        <p class="text-sm text-gray-500 mt-1">
          Gérez votre profil, la sécurité et la configuration de la plateforme PADCI.
        </p>
      </div>
      <button class="flex items-center justify-center gap-2 bg-primary hover:bg-primary-shade text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm text-sm">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Enregistrer les modifications
      </button>
    </div>

    <!-- ================= ONGLETS ================= -->
    <div class="border-b border-gray-200">
      <nav class="flex gap-6" aria-label="Tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="pb-3 px-1 text-sm font-medium border-b-2 transition-colors"
          :class="activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        >
          {{ tab.name }}
        </button>
      </nav>
    </div>

    <!-- ================= CONTENU DES ONGLETS ================= -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

      <!-- ========== ONGLET 1 : PROFIL ========== -->
      <div v-if="activeTab === 'profil'" class="space-y-6">
        <h2 class="text-lg font-bold text-gray-800">Informations du Profil</h2>

        <!-- Avatar -->
        <div class="flex items-center gap-6">
          <div class="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-bright flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            AD
          </div>
          <div>
            <button class="border border-gray-300 hover:border-primary hover:text-primary text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Changer d'avatar
            </button>
            <p class="text-xs text-gray-500 mt-2">JPG, PNG. Taille max : 2 Mo.</p>
          </div>
        </div>

        <!-- Champs -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
            <input type="text" value="Admin UCP-PADCI" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Adresse email</label>
            <input type="email" value="admin@padci.ci" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Fonction / Rôle</label>
            <input type="text" value="Coordonnateur UCP" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input type="tel" value="+225 27 20 00 00 00" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm">
          </div>
        </div>
      </div>

      <!-- ========== ONGLET 2 : SÉCURITÉ ========== -->
      <div v-if="activeTab === 'securite'" class="space-y-6">
        <h2 class="text-lg font-bold text-gray-800">Sécurité du Compte</h2>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Mot de passe actuel</label>
            <input type="password" placeholder="••••••••" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm md:w-1/2">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
            <input type="password" placeholder="••••••••" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm md:w-1/2">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
            <input type="password" placeholder="••••••••" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm md:w-1/2">
          </div>
        </div>

        <!-- Double authentification -->
        <div class="border-t border-gray-100 pt-6 mt-6">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="text-sm font-bold text-gray-800">Double authentification (2FA)</h3>
              <p class="text-sm text-gray-500 mt-1">Ajoutez une couche de sécurité supplémentaire à votre compte.</p>
            </div>
            <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              <span class="inline-block h-4 w-4 transform rounded-full bg-white transition shadow"></span>
            </button>
          </div>
        </div>
      </div>

      <!-- ========== ONGLET 3 : NOTIFICATIONS ========== -->
      <div v-if="activeTab === 'notifications'" class="space-y-6">
        <h2 class="text-lg font-bold text-gray-800">Préférences de Notifications</h2>

        <div class="space-y-5">
          <!-- Item 1 -->
          <div class="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
            <div>
              <h3 class="text-sm font-bold text-gray-800">Nouvelles candidatures</h3>
              <p class="text-sm text-gray-500 mt-1">Recevoir un email quand un formateur soumet son dossier.</p>
            </div>
            <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors focus:outline-none">
              <span class="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6 shadow"></span>
            </button>
          </div>
          <!-- Item 2 -->
          <div class="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
            <div>
              <h3 class="text-sm font-bold text-gray-800">Fin de cohorte</h3>
              <p class="text-sm text-gray-500 mt-1">Recevoir une alerte à la fin d'une session de formation.</p>
            </div>
            <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors focus:outline-none">
              <span class="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6 shadow"></span>
            </button>
          </div>
          <!-- Item 3 -->
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="text-sm font-bold text-gray-800">Rapports mensuels</h3>
              <p class="text-sm text-gray-500 mt-1">Recevoir un résumé automatique des KPIs (taux de certification, parité).</p>
            </div>
            <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none">
              <span class="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1 shadow"></span>
            </button>
          </div>
        </div>
      </div>

      <!-- ========== ONGLET 4 : UTILISATEURS ========== -->
      <div v-if="activeTab === 'utilisateurs'" class="space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold text-gray-800">Gestion des Accès</h2>
          <button class="flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-lg transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            Ajouter un administrateur
          </button>
        </div>

        <div class="overflow-x-auto border border-gray-100 rounded-lg">
          <table class="w-full text-left border-collapse text-sm">
            <thead>
              <tr class="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th class="py-3 px-4">Nom</th>
                <th class="py-3 px-4">Email</th>
                <th class="py-3 px-4">Rôle</th>
                <th class="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr class="hover:bg-gray-50">
                <td class="py-3 px-4 font-medium text-gray-800">Admin UCP</td>
                <td class="py-3 px-4 text-gray-600">admin@padci.ci</td>
                <td class="py-3 px-4"><span class="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-bold">Super Admin</span></td>
                <td class="py-3 px-4 text-center text-gray-400 text-xs italic">Vous</td>
              </tr>
              <tr class="hover:bg-gray-50">
                <td class="py-3 px-4 font-medium text-gray-800">Direction EMSP</td>
                <td class="py-3 px-4 text-gray-600">direction@emsp.ci</td>
                <td class="py-3 px-4"><span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-bold">Lecteur</span></td>
                <td class="py-3 px-4 text-center">
                  <button class="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition" title="Supprimer">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ========== ONGLET 5 : PLATEFORME ========== -->
      <div v-if="activeTab === 'plateforme'" class="space-y-6">
        <h2 class="text-lg font-bold text-gray-800">Configuration du Projet</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nom du projet</label>
            <input type="text" value="PADCI - Phase 1" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-gray-50" disabled>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Maître d'ouvrage</label>
            <input type="text" value="MTNIT / UCP-PADCI" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-gray-50" disabled>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Année budgétaire</label>
            <select class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm">
              <option>2024</option>
              <option>2025</option>
              <option>2026</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Ligne budgétaire</label>
            <input type="text" value="Composante 3 - Sous-composante 3.2" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm">
          </div>
        </div>

        <div class="border-t border-gray-100 pt-6 mt-6">
          <h3 class="text-sm font-bold text-gray-800 mb-3">Objectifs (Cibles TDR)</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <p class="text-xs text-gray-500 mb-1">Formateurs cibles</p>
              <input type="number" value="200" class="w-full bg-white border border-gray-200 rounded px-2 py-1 text-sm font-bold text-gray-800 focus:outline-none focus:border-primary">
            </div>
            <div class="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <p class="text-xs text-gray-500 mb-1">% de femmes min.</p>
              <input type="number" value="30" class="w-full bg-white border border-gray-200 rounded px-2 py-1 text-sm font-bold text-gray-800 focus:outline-none focus:border-primary">
            </div>
            <div class="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <p class="text-xs text-gray-500 mb-1">Taux certif. min.</p>
              <input type="number" value="80" class="w-full bg-white border border-gray-200 rounded px-2 py-1 text-sm font-bold text-gray-800 focus:outline-none focus:border-primary">
            </div>
            <div class="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <p class="text-xs text-gray-500 mb-1">Kits péda.</p>
              <input type="number" value="5" class="w-full bg-white border border-gray-200 rounded px-2 py-1 text-sm font-bold text-gray-800 focus:outline-none focus:border-primary">
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- ================= ZONE DE DANGER ================= -->
    <div class="bg-white rounded-xl shadow-sm border border-red-100 p-6">
      <h3 class="text-sm font-bold text-red-600 mb-2">Zone de danger</h3>
      <p class="text-sm text-gray-500 mb-4">La réinitialisation de la base de données supprimera toutes les candidatures et les données de formation. Cette action est irréversible.</p>
      <button class="px-4 py-2 bg-white border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors">
        Réinitialiser les données du projet
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

// ==================== ÉTAT DES ONGLETS ====================
const activeTab = ref('profil')

const tabs = [
  { id: 'profil', name: 'Profil' },
  { id: 'securite', name: 'Sécurité' },
  { id: 'notifications', name: 'Notifications' },
  { id: 'utilisateurs', name: 'Utilisateurs' },
  { id: 'plateforme', name: 'Plateforme' },
]
</script>

<style scoped>
/* Le design est entièrement géré par Tailwind */
</style>
