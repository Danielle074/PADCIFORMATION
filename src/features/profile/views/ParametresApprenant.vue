<template>
  <div class="max-w-4xl mx-auto space-y-6">

    <!-- ================= EN-TÊTE ================= -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Paramètres</h1>
        <p class="text-sm text-gray-500 mt-1">Gérez vos préférences et la sécurité de votre compte.</p>
      </div>
      <button
        @click="sauvegarder"
        class="flex items-center justify-center gap-2 bg-primary hover:bg-primary-shade text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm text-sm"
      >
        <SaveIcon :size="18" />
        Enregistrer les modifications
      </button>
    </div>

    <!-- ================= SECTION : PRÉFÉRENCES GÉNÉRALES ================= -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
          <SlidersHorizontalIcon class="text-primary" :size="20" /> Préférences générales
        </h2>
      </div>
      <div class="p-6 space-y-6">

        <!-- Langue -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p class="font-medium text-gray-800">Langue de l'interface</p>
            <p class="text-sm text-gray-500">Choisissez la langue d'affichage de la plateforme.</p>
          </div>
          <select
            v-model="langue"
            class="w-full sm:w-48 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-gray-50"
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>

        <!-- Thème (Mode sombre) -->
        <div class="flex items-center justify-between gap-4 pt-4 border-t border-gray-100">
          <div>
            <p class="font-medium text-gray-800">Mode sombre</p>
            <p class="text-sm text-gray-500">Activer le thème sombre (bêta).</p>
          </div>
          <button
            @click="isDarkMode = !isDarkMode"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            :class="isDarkMode ? 'bg-primary' : 'bg-gray-200'"
          >
            <span
              class="inline-block h-4 w-4 transform rounded-full bg-white transition shadow"
              :class="isDarkMode ? 'translate-x-6' : 'translate-x-1'"
            ></span>
          </button>
        </div>

      </div>
    </div>

    <!-- ================= SECTION : NOTIFICATIONS ================= -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
          <BellIcon class="text-primary" :size="20" /> Notifications
        </h2>
      </div>
      <div class="p-6 space-y-6">

        <!-- Notifications par Email -->
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="font-medium text-gray-800">Alertes par email</p>
            <p class="text-sm text-gray-500">Recevoir un email lors de la publication d'un nouveau chapitre.</p>
          </div>
          <button
            @click="emailNotifs = !emailNotifs"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            :class="emailNotifs ? 'bg-primary' : 'bg-gray-200'"
          >
            <span
              class="inline-block h-4 w-4 transform rounded-full bg-white transition shadow"
              :class="emailNotifs ? 'translate-x-6' : 'translate-x-1'"
            ></span>
          </button>
        </div>

        <!-- Notifications Push -->
        <div class="flex items-center justify-between gap-4 pt-4 border-t border-gray-100">
          <div>
            <p class="font-medium text-gray-800">Notifications push</p>
            <p class="text-sm text-gray-500">Recevoir des rappels sur les échéances de formation.</p>
          </div>
          <button
            @click="pushNotifs = !pushNotifs"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            :class="pushNotifs ? 'bg-primary' : 'bg-gray-200'"
          >
            <span
              class="inline-block h-4 w-4 transform rounded-full bg-white transition shadow"
              :class="pushNotifs ? 'translate-x-6' : 'translate-x-1'"
            ></span>
          </button>
        </div>

      </div>
    </div>

    <!-- ================= SECTION : SÉCURITÉ ================= -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
          <ShieldHalfIcon class="text-primary" :size="20" /> Sécurité
        </h2>
      </div>
      <div class="p-6 space-y-6">

        <!-- Mot de passe -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p class="font-medium text-gray-800">Mot de passe</p>
            <p class="text-sm text-gray-500">Modifiez votre mot de passe pour sécuriser votre compte.</p>
          </div>
          <router-link
            to="/reinitialiser-mot-de-passe"
            class="text-sm font-semibold text-primary bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-lg transition-colors text-center"
          >
            Changer le mot de passe
          </router-link>
        </div>

        <!-- Double authentification (2FA) -->
        <div class="flex items-center justify-between gap-4 pt-4 border-t border-gray-100">
          <div>
            <p class="font-medium text-gray-800">Double authentification (2FA)</p>
            <p class="text-sm text-gray-500">Ajoutez une couche de sécurité supplémentaire.</p>
          </div>
          <button
            @click="twoFactorAuth = !twoFactorAuth"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            :class="twoFactorAuth ? 'bg-primary' : 'bg-gray-200'"
          >
            <span
              class="inline-block h-4 w-4 transform rounded-full bg-white transition shadow"
              :class="twoFactorAuth ? 'translate-x-6' : 'translate-x-1'"
            ></span>
          </button>
        </div>

      </div>
    </div>

    <!-- ================= SECTION : ZONE DE DANGER ================= -->
    <div class="bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden">
      <div class="p-6">
        <h2 class="text-lg font-bold text-red-600 mb-2 flex items-center gap-2">
          <CircleAlertIcon :size="20" /> Zone de danger
        </h2>
        <p class="text-sm text-gray-500 mb-4">
          La suppression de votre compte entraînera la perte définitive de toutes vos données de formation et de vos certificats. Cette action est irréversible.
        </p>
        <button
          @click="showDeleteModal = true"
          class="px-5 py-2.5 bg-white border border-red-200 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-50 transition-colors"
        >
          Supprimer mon compte
        </button>
      </div>
    </div>

    <!-- ================= MODALE DE SUPPRESSION ================= -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div class="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full text-center animate-scale-in">
        <div class="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
          <Trash2Icon class="text-red-500" :size="30" />
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">Supprimer le compte ?</h3>
        <p class="text-sm text-gray-500 mb-6">
          Êtes-vous sûr de vouloir supprimer définitivement votre compte ? Toutes vos données seront perdues.
        </p>
        <div class="flex gap-3">
          <button @click="showDeleteModal = false" class="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition">
            Annuler
          </button>
          <button @click="supprimerCompte" class="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition shadow-md shadow-red-500/30">
            Confirmer
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { BellIcon, CircleAlertIcon, SaveIcon, ShieldHalfIcon, SlidersHorizontalIcon, Trash2Icon } from '@lucide/vue'
import { ref } from 'vue'

// ==================== ÉTAT DES PARAMÈTRES ====================
const langue = ref('fr')
const isDarkMode = ref(false)
const emailNotifs = ref(true)
const pushNotifs = ref(false)
const twoFactorAuth = ref(false)

// Modale de suppression
const showDeleteModal = ref(false)

// ==================== ACTIONS ====================
const sauvegarder = () => {
  // Ici, tu ajouteras l'appel API pour enregistrer les préférences
  alert('Vos paramètres ont été enregistrés avec succès !')
}

const supprimerCompte = () => {
  showDeleteModal.value = false
  // Logique de suppression du compte (appel API, puis redirection vers /login)
  alert('Votre compte a été supprimé.')
}
</script>

<style scoped>
/* Animation d'apparition de la modale */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
.animate-scale-in {
  animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
</style>
