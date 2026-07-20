<template>
  <div class="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
    <h1 class="text-2xl font-bold text-primary mb-6 text-center">
      Formulaire d’inscription – Formation
    </h1>

    <!-- Indicateur d’étapes -->
    <div class="flex justify-between items-center mb-8">
      <div
        v-for="step in 5"
        :key="step"
        class="flex-1 text-center"
      >
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
      <!-- Étape 1 : Identité -->
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
            <option value="Ivoirien" selected>Ivoirien</option>
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
        <div>
          <label class="block text-sm font-medium text-gray-700">Date de naissance *</label>
          <input v-model="form.dateNaissance" type="date" required
                 class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
        </div>
      </div>

      <!-- Étape 2 : Parents -->
      <div v-if="currentStep === 2" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nom de la mère *</label>
            <input v-model="form.nomMere" type="text" required
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Nom du père *</label>
            <input v-model="form.nomPere" type="text" required
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Fonction (facultatif)</label>
          <input v-model="form.fonction" type="text"
                 class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Adresse *</label>
          <input v-model="form.adresse" type="text" required
                 class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
        </div>
      </div>

      <!-- Étape 3 : Documents -->
      <div v-if="currentStep === 3" class="space-y-4">
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
      </div>

      <!-- Étape 4 : Choix de formation -->
      <div v-if="currentStep === 4" class="space-y-4">
        <label class="block text-sm font-medium text-gray-700">Formation souhaitée *</label>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label v-for="formation in formations" :key="formation"
                 class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
                 :class="{ 'border-primary bg-primary/5': form.formation === formation }">
            <input type="radio" v-model="form.formation" :value="formation" class="h-4 w-4 text-primary">
            <span class="ml-2">{{ formation }}</span>
          </label>
        </div>
        <p v-if="!form.formation" class="text-sm text-red-500">Veuillez sélectionner une formation.</p>
      </div>

      <!-- Étape 5 : Récapitulatif -->
      <div v-if="currentStep === 5" class="space-y-4">
        <h2 class="text-xl font-semibold text-gray-800">Récapitulatif de votre dossier</h2>
        <div class="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
          <p><span class="font-medium">Nom :</span> {{ form.nom }}</p>
          <p><span class="font-medium">Prénom :</span> {{ form.prenom }}</p>
          <p><span class="font-medium">Nationalité :</span> {{ form.nationalite }}</p>
          <p><span class="font-medium">NNI :</span> {{ form.nni || 'Non renseigné' }}</p>
          <p><span class="font-medium">Email :</span> {{ form.email }}</p>
          <p><span class="font-medium">Téléphone :</span> {{ form.telephone }}</p>
          <p><span class="font-medium">Date de naissance :</span> {{ form.dateNaissance }}</p>
          <p><span class="font-medium">Mère :</span> {{ form.nomMere }}</p>
          <p><span class="font-medium">Père :</span> {{ form.nomPere }}</p>
          <p><span class="font-medium">Fonction :</span> {{ form.fonction || 'Non renseigné' }}</p>
          <p><span class="font-medium">Adresse :</span> {{ form.adresse }}</p>
          <p><span class="font-medium">Formation :</span> {{ form.formation }}</p>
          <p><span class="font-medium">Carte d’identité :</span>
            {{ form.pasCarteIdentite ? 'Non fournie (Attestation fournie)' : 'Fournie' }}
          </p>
          <p><span class="font-medium">Photo d’identité :</span> {{ form.photoIdentite ? 'Téléchargée' : 'Manquante' }}</p>
          <p><span class="font-medium">Extrait de naissance :</span> {{ form.extraitNaissance ? 'Téléchargé' : 'Manquant' }}</p>
        </div>
        <p class="text-sm text-gray-500">Veuillez vérifier vos informations avant de valider.</p>
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
                class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
          Soumettre ma demande
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'MultiStepForm',
  data() {
    return {
      currentStep: 1,
      stepLabels: ['Identité', 'Parents', 'Documents', 'Formation', 'Récapitulatif'],
      formations: [
        'Cyber security',
        'Data Analysis',
        'IT Support',
        'Network Specialist',
        'Artificial Intelligence'
      ],
      form: {
        nom: '',
        prenom: '',
        nationalite: 'Ivoirien',
        nni: '',
        email: '',
        telephone: '',
        dateNaissance: '',
        nomMere: '',
        nomPere: '',
        fonction: '',
        adresse: '',
        pasCarteIdentite: false,
        carteIdentite: null,
        attestationIdentite: null,
        photoIdentite: null,
        extraitNaissance: null,
        formation: ''
      }
    };
  },
  methods: {
    nextStep() {
      // Validation simple des champs obligatoires pour l'étape courante
      if (this.currentStep === 1) {
        if (!this.form.nom || !this.form.prenom || !this.form.email || !this.form.telephone || !this.form.dateNaissance) {
          alert('Veuillez remplir tous les champs obligatoires de l’étape 1.');
          return;
        }
      }
      if (this.currentStep === 2) {
        if (!this.form.nomMere || !this.form.nomPere || !this.form.adresse) {
          alert('Veuillez remplir tous les champs obligatoires de l’étape 2.');
          return;
        }
      }
      if (this.currentStep === 3) {
        // Vérifier que les fichiers sont uploadés selon les cas
        if (!this.form.pasCarteIdentite && !this.form.carteIdentite) {
          alert('Veuillez télécharger une carte d’identité ou cocher l’option "Je ne possède pas de carte".');
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
      }
      if (this.currentStep === 4) {
        if (!this.form.formation) {
          alert('Veuillez choisir une formation.');
          return;
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
      // Ici vous pouvez envoyer les données (formData avec les fichiers)
      alert('Votre demande a été soumise avec succès !');
      console.log('Données du formulaire :', this.form);
      // Réinitialiser ou rediriger...
    }
  }
};
</script>

<style scoped>
/* Vous pouvez ajouter des styles supplémentaires si besoin */
</style>
