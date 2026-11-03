<template>
  <div class="max-w-3xl mx-auto p-6 mt-10">

    <!-- Bouton Retour -->
    <router-link
      to="/"
      class="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-4 transition group font-medium"
    >
      <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Retour à la connexion
    </router-link>

    <div class="bg-white shadow-lg rounded-xl p-6">
      <h1 class="text-2xl font-bold text-primary mb-6 text-center">
        Formulaire d’inscription – Formation
      </h1>

      <!-- Indicateur d’étapes -->
      <div class="flex justify-between items-center mb-8">
        <div v-for="step in 5" :key="step" class="flex-1 text-center">
          <div
            class="w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold text-white transition-colors"
            :class="{
              'bg-primary': step <= currentStep,
              'bg-gray-300': step > currentStep
            }"
          >
            {{ step }}
          </div>
          <div class="text-xs mt-1 text-gray-600">
            {{ stepLabels[step - 1] }}
          </div>
        </div>
      </div>

      <!-- Contenu des étapes -->
      <form @submit.prevent="submitForm" class="space-y-6">

        <!-- Étape 1 : Identité + Diplôme -->
        <div v-if="currentStep === 1" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nom *</label>
              <input v-model="form.nom" type="text" required
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Prénom *</label>
              <input v-model="form.prenom" type="text" required
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Nationalité *</label>
            <select v-model="form.nationalite" required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
              <option value="Ivoirien">Ivoirien</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">NNI (facultatif)</label>
            <input v-model="form.nni" type="text"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Email *</label>
              <input v-model="form.email" type="email" required
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Téléphone *</label>
              <input v-model="form.telephone" type="tel" required
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Date de naissance *</label>
              <input v-model="form.dateNaissance" type="date" required
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Adresse *</label>
              <input v-model="form.adresse" type="text" required
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
            </div>
          </div>

          <!-- ===== Diplôme obtenu ===== -->
          <div class="border-t pt-4 mt-4">
            <h3 class="font-semibold text-gray-800 mb-1">Diplôme obtenu *</h3>
            <p class="text-sm text-gray-500 mb-3">Niveau minimum requis : BTS</p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <label v-for="d in diplomes" :key="d"
                     class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
                     :class="{ 'border-primary bg-primary/5': form.diplome === d }">
                <input type="radio" v-model="form.diplome" :value="d" class="h-4 w-4 text-primary">
                <span class="ml-2">{{ d }}</span>
              </label>
            </div>

            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-700">Type / Spécialité du diplôme *</label>
              <input v-model="form.typeDiplome" type="text" required
                     placeholder="Ex : Informatique, Réseaux, Cybersécurité, Développement..."
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
            </div>
          </div>
        </div>

        <!-- Étape 2 : Documents -->
        <div v-if="currentStep === 2" class="space-y-4">
          <div class="flex items-center mb-2">
            <input v-model="form.pasCarteIdentite" type="checkbox" id="pasCarte"
                   class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded">
            <label for="pasCarte" class="ml-2 block text-sm text-gray-700">
              Je ne possède pas de carte d’identité
            </label>
          </div>

          <div v-if="!form.pasCarteIdentite">
            <label class="block text-sm font-medium text-gray-700">Carte d’identité *</label>
            <input type="file" @change="handleFileUpload($event, 'carteIdentite')"
                   class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90">
          </div>
          <div v-else>
            <label class="block text-sm font-medium text-gray-700">Attestation d’identité / Duplicata *</label>
            <input type="file" @change="handleFileUpload($event, 'attestationIdentite')"
                   class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Photo d’identité *</label>
            <input type="file" @change="handleFileUpload($event, 'photoIdentite')"
                   class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Extrait de naissance *</label>
            <input type="file" @change="handleFileUpload($event, 'extraitNaissance')"
                   class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90">
          </div>

          <!-- Upload du diplôme (le niveau et le type ont été saisis à l'étape 1) -->
          <div class="border-t pt-4 mt-4">
            <div v-if="form.diplome && form.typeDiplome"
                 class="mb-3 p-3 bg-primary/5 border border-primary/20 rounded-lg text-sm">
              <p class="text-gray-700">
                Diplôme renseigné :
                <span class="font-semibold text-primary">{{ form.diplome }} — {{ form.typeDiplome }}</span>
              </p>
              <router-link
                to="#"
                @click.prevent="currentStep = 1"
                class="text-xs text-primary hover:underline mt-1 inline-block"
              >
                Modifier
              </router-link>
            </div>

            <label class="block text-sm font-medium text-gray-700">
              Télécharger votre diplôme
              <span v-if="form.diplome && form.typeDiplome">({{ form.diplome }} - {{ form.typeDiplome }})</span>
              *
            </label>
            <input type="file" @change="handleFileUpload($event, 'diplomeFile')"
                   accept="image/*,application/pdf"
                   class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90">
          </div>
        </div>

        <!-- Étape 3 : Choix de formation -->
        <div v-if="currentStep === 3" class="space-y-4">
          <label class="block text-sm font-medium text-gray-700">Formation souhaitée *</label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label v-for="formation in formations" :key="formation"
                   class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
                   :class="{ 'border-primary bg-primary/5': form.formation === formation }">
              <input type="radio" v-model="form.formation" :value="formation" class="h-4 w-4 text-primary">
              <span class="ml-2">{{ formation }}</span>
            </label>
          </div>
        </div>

        <!-- Étape 4 : Ordinateur -->
        <div v-if="currentStep === 4" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Possédez-vous un ordinateur personnel ? *
            </label>
            <div class="flex gap-3">
              <label
                class="flex-1 flex items-center justify-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
                :class="{ 'border-primary bg-primary/5': form.possedeOrdinateur === true }">
                <input type="radio" :value="true" v-model="form.possedeOrdinateur" class="h-4 w-4 text-primary">
                <span class="ml-2 font-medium">Oui</span>
              </label>
              <label
                class="flex-1 flex items-center justify-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
                :class="{ 'border-primary bg-primary/5': form.possedeOrdinateur === false }">
                <input type="radio" :value="false" v-model="form.possedeOrdinateur" class="h-4 w-4 text-primary">
                <span class="ml-2 font-medium">Non</span>
              </label>
            </div>
          </div>

          <!-- Détails si possède un ordinateur -->
          <div v-if="form.possedeOrdinateur === true" class="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div class="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
              <p class="font-semibold mb-1">Configuration minimale requise :</p>
              <p>Processeur Core i5 · 8 Go de RAM · 256 Go de stockage</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Processeur *</label>
                <select v-model="form.processeur" required
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                  <option value="" disabled>Sélectionner</option>
                  <option v-for="p in processeurs" :key="p" :value="p">{{ p }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">RAM *</label>
                <select v-model="form.ram" required
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                  <option value="" disabled>Sélectionner</option>
                  <option v-for="r in rams" :key="r" :value="r">{{ r }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Stockage *</label>
                <select v-model="form.stockage" required
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                  <option value="" disabled>Sélectionner</option>
                  <option v-for="s in stockages" :key="s" :value="s">{{ s }}</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">
                Photo de l’ordinateur avec les caractéristiques visibles *
              </label>
              <p class="text-xs text-gray-500 mb-1">
                Prenez une photo montrant l’ordinateur et ses caractéristiques (étiquette, écran système, etc.) pour prouver son authenticité.
              </p>
              <input type="file" accept="image/*" @change="handleFileUpload($event, 'photoOrdinateur')"
                     class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90">
            </div>
          </div>

          <!-- Avertissement si pas d'ordinateur -->
          <div v-if="form.possedeOrdinateur === false"
               class="p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
            <p class="font-semibold mb-1">Attention</p>
            <p>
              La formation nécessite un ordinateur personnel. Sans ordinateur, votre candidature
              pourrait ne pas être retenue. Contactez l’administration pour plus d’informations.
            </p>
          </div>
        </div>

        <!-- Étape 5 : Récapitulatif -->
        <div v-if="currentStep === 5" class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-800 text-center mb-2">
            Récapitulatif de votre dossier
          </h2>

          <!-- Informations personnelles -->
          <div class="bg-gray-50 rounded-xl p-4">
            <h3 class="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wide mb-3">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Informations personnelles
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm bg-white p-4 rounded-lg border border-gray-100">
              <p><span class="text-gray-500">Nom :</span> <span class="font-medium">{{ form.nom }}</span></p>
              <p><span class="text-gray-500">Prénom :</span> <span class="font-medium">{{ form.prenom }}</span></p>
              <p><span class="text-gray-500">Nationalité :</span> <span class="font-medium">{{ form.nationalite }}</span></p>
              <p><span class="text-gray-500">NNI :</span> <span class="font-medium">{{ form.nni || 'Non renseigné' }}</span></p>
              <p><span class="text-gray-500">Email :</span> <span class="font-medium">{{ form.email }}</span></p>
              <p><span class="text-gray-500">Téléphone :</span> <span class="font-medium">{{ form.telephone }}</span></p>
              <p><span class="text-gray-500">Date de naissance :</span> <span class="font-medium">{{ form.dateNaissance }}</span></p>
              <p><span class="text-gray-500">Adresse :</span> <span class="font-medium">{{ form.adresse }}</span></p>
            </div>
          </div>

          <!-- Diplôme -->
          <div class="bg-gray-50 rounded-xl p-4">
            <h3 class="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wide mb-3">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Diplôme
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm bg-white p-4 rounded-lg border border-gray-100">
              <p>
                <span class="text-gray-500">Niveau :</span>
                <span class="font-medium">{{ form.diplome }}</span>
              </p>
              <p>
                <span class="text-gray-500">Type / Spécialité :</span>
                <span class="font-medium">{{ form.typeDiplome }}</span>
              </p>
              <p class="md:col-span-2">
                <span class="text-gray-500">Fichier du diplôme :</span>
                <span class="font-medium" :class="form.diplomeFile ? 'text-green-600' : 'text-red-500'">
                  {{ form.diplomeFile ? 'Téléchargé' : 'Manquant' }}
                </span>
              </p>
            </div>
          </div>

          <!-- Documents -->
          <div class="bg-gray-50 rounded-xl p-4">
            <h3 class="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wide mb-3">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Documents fournis
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm bg-white p-4 rounded-lg border border-gray-100">
              <p>
                <span class="text-gray-500">Pièce d’identité :</span>
                <span class="font-medium">
                  {{ form.pasCarteIdentite ? 'Attestation fournie' : 'Carte fournie' }}
                </span>
              </p>
              <p>
                <span class="text-gray-500">Photo d’identité :</span>
                <span class="font-medium" :class="form.photoIdentite ? 'text-green-600' : 'text-red-500'">
                  {{ form.photoIdentite ? 'Fournie' : 'Manquante' }}
                </span>
              </p>
              <p>
                <span class="text-gray-500">Extrait de naissance :</span>
                <span class="font-medium" :class="form.extraitNaissance ? 'text-green-600' : 'text-red-500'">
                  {{ form.extraitNaissance ? 'Fourni' : 'Manquant' }}
                </span>
              </p>
            </div>
          </div>

          <!-- Formation -->
          <div class="bg-gray-50 rounded-xl p-4">
            <h3 class="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wide mb-3">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Formation souhaitée
            </h3>
            <div class="bg-white p-4 rounded-lg border border-gray-100 text-sm">
              <p><span class="font-semibold text-primary">{{ form.formation }}</span></p>
            </div>
          </div>

          <!-- Ordinateur -->
          <div class="bg-gray-50 rounded-xl p-4">
            <h3 class="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wide mb-3">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Équipement
            </h3>
            <div class="bg-white p-4 rounded-lg border border-gray-100 text-sm">
              <p>
                <span class="text-gray-500">Possède un ordinateur :</span>
                <span class="font-medium">{{ form.possedeOrdinateur ? 'Oui' : 'Non' }}</span>
              </p>
              <template v-if="form.possedeOrdinateur">
                <p class="mt-1">
                  <span class="text-gray-500">Processeur :</span>
                  <span class="font-medium">{{ form.processeur }}</span>
                </p>
                <p class="mt-1">
                  <span class="text-gray-500">RAM :</span>
                  <span class="font-medium">{{ form.ram }}</span>
                </p>
                <p class="mt-1">
                  <span class="text-gray-500">Stockage :</span>
                  <span class="font-medium">{{ form.stockage }}</span>
                </p>
                <p class="mt-1">
                  <span class="text-gray-500">Photo de l’ordinateur :</span>
                  <span class="font-medium" :class="form.photoOrdinateur ? 'text-green-600' : 'text-red-500'">
                    {{ form.photoOrdinateur ? 'Fournie' : 'Manquante' }}
                  </span>
                </p>
              </template>
            </div>
          </div>

          <p class="text-sm text-gray-500 text-center mt-4">
            Veuillez vérifier vos informations avant de confirmer.
          </p>
        </div>

        <!-- Boutons de navigation -->
        <div class="flex justify-between items-center pt-4 border-t">
          <button type="button" @click="prevStep" v-if="currentStep > 1"
                  class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition">
            Précédent
          </button>
          <div v-else></div>

          <button type="button" @click="nextStep" v-if="currentStep < 5"
                  class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition">
            Suivant
          </button>

          <button type="submit" v-if="currentStep === 5"
                  class="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition font-semibold shadow">
            Confirmer l’inscription
          </button>
        </div>
      </form>
    </div>

    <!-- ============ MODAL SUCCÈS ============ -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center animate-modal">
        <div class="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-5">
          <svg class="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Inscription réussie !</h2>
        <p class="text-gray-600 text-sm mb-6 leading-relaxed">
          Votre dossier a été soumis avec succès.<br />
          Vous pouvez maintenant vous connecter à votre espace.
        </p>
        <router-link
          to="/"
          class="w-full inline-flex items-center justify-center gap-2
                 bg-gradient-to-r from-[#198341] to-[#22a854]
                 hover:from-[#146b34] hover:to-[#198341]
                 text-white py-3 rounded-xl font-semibold transition-all duration-300
                 hover:-translate-y-0.5 shadow-lg shadow-[#198341]/30"
        >
          Aller à la connexion
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultiStepForm',
  data() {
    return {
      currentStep: 1,
      showSuccessModal: false,
      stepLabels: ['Identité', 'Documents', 'Formation', 'Ordinateur', 'Récapitulatif'],
      formations: [
        'Cyber security',
        'Data Analysis',
        'IT Support',
        'Network Specialist',
        'Artificial Intelligence'
      ],
      diplomes: ['BTS', 'Licence', 'Master'],
      processeurs: ['Core i5', 'Core i7', 'Core i9'],
      rams: ['8 Go', '16 Go', '32 Go'],
      stockages: ['256 Go', '512 Go', '1 To', '2 To'],
      form: {
        nom: '',
        prenom: '',
        nationalite: 'Ivoirien',
        nni: '',
        email: '',
        telephone: '',
        dateNaissance: '',
        adresse: '',
        diplome: '',
        typeDiplome: '',
        pasCarteIdentite: false,
        carteIdentite: null,
        attestationIdentite: null,
        photoIdentite: null,
        extraitNaissance: null,
        diplomeFile: null,
        formation: '',
        possedeOrdinateur: null,
        processeur: '',
        ram: '',
        stockage: '',
        photoOrdinateur: null
      }
    };
  },
  methods: {
    nextStep() {
      // Étape 1 : Identité + Diplôme
      if (this.currentStep === 1) {
        if (!this.form.nom || !this.form.prenom || !this.form.email || !this.form.telephone || !this.form.dateNaissance || !this.form.adresse) {
          alert('Veuillez remplir tous les champs obligatoires de l’étape 1.');
          return;
        }
        if (!this.form.diplome) {
          alert('Veuillez sélectionner votre diplôme obtenu.');
          return;
        }
        if (!this.form.typeDiplome) {
          alert('Veuillez renseigner le type / la spécialité de votre diplôme.');
          return;
        }
      }
      // Étape 2 : Documents
      if (this.currentStep === 2) {
        if (!this.form.pasCarteIdentite && !this.form.carteIdentite) {
          alert('Veuillez télécharger une carte d’identité ou cocher "Je ne possède pas de carte".');
          return;
        }
        if (this.form.pasCarteIdentite && !this.form.attestationIdentite) {
          alert('Veuillez télécharger une attestation d’identité.');
          return;
        }
        if (!this.form.photoIdentite) {
          alert('Veuillez télécharger une photo d’identité.');
          return;
        }
        if (!this.form.extraitNaissance) {
          alert('Veuillez télécharger un extrait de naissance.');
          return;
        }
        if (!this.form.diplomeFile) {
          alert('Veuillez télécharger votre diplôme.');
          return;
        }
      }
      // Étape 3 : Formation
      if (this.currentStep === 3) {
        if (!this.form.formation) {
          alert('Veuillez choisir une formation.');
          return;
        }
      }
      // Étape 4 : Ordinateur
      if (this.currentStep === 4) {
        if (this.form.possedeOrdinateur === null) {
          alert('Veuillez indiquer si vous possédez un ordinateur.');
          return;
        }
        if (this.form.possedeOrdinateur === true) {
          if (!this.form.processeur || !this.form.ram || !this.form.stockage) {
            alert('Veuillez renseigner la configuration de votre ordinateur.');
            return;
          }
          if (!this.form.photoOrdinateur) {
            alert('Veuillez télécharger une photo de votre ordinateur avec ses caractéristiques.');
            return;
          }
        }
      }

      if (this.currentStep < 5) this.currentStep++;
    },
    prevStep() {
      if (this.currentStep > 1) this.currentStep--;
    },
    handleFileUpload(event, field) {
      const file = event.target.files[0];
      if (file) {
        this.form[field] = file;
      }
    },
    submitForm() {
      console.log('Données du formulaire :', this.form);
      // TODO : envoyer les données au backend avec FormData
      this.showSuccessModal = true;
    }
  }
};
</script>

<style scoped>
@keyframes modalIn {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
.animate-modal {
  animation: modalIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
</style>
