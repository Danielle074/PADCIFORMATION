<template>
  <div class="min-h-screen flex flex-col md:flex-row relative">

    <!-- ================= FORMULAIRE (GAUCHE) ================= -->
    <div class="flex w-full md:w-1/2 items-center justify-center order-2 md:order-1 py-10 px-5 bg-white relative overflow-hidden">

      <!-- Bulles décoratives floutées -->
      <div class="absolute -top-32 -left-32 w-96 h-96 bg-[#198341]/10 rounded-full blur-3xl pointer-events-none animate-float-slow"></div>
      <div class="absolute -bottom-32 -right-20 w-96 h-96 bg-[#198341]/5 rounded-full blur-3xl pointer-events-none animate-float-slow" style="animation-delay: 2s;"></div>

      <div class="w-full max-w-lg relative z-10 animate-fade-in-up">

        <!-- Bouton Retour -->
        <router-link
          to="/"
          class="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-4 transition group font-medium text-sm"
        >
          <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour à la connexion
        </router-link>

        <!-- Logo + Titre -->
        <div class="flex flex-col items-center mb-6">
          <img :src="formLogo" alt="PADCI Formation" class="w-32 h-auto mb-3" />
          <h1 class="text-2xl font-bold text-gray-800">Créer un compte</h1>
          <p class="text-gray-500 text-sm mt-1">Inscription à la formation</p>
        </div>

        <!-- Indicateur d’étapes -->
        <div class="flex justify-between items-center mb-8">
          <div v-for="step in 5" :key="step" class="flex-1 text-center relative">
            <!-- Ligne de connexion -->
            <div
              v-if="step < 5"
              class="absolute top-5 left-1/2 w-full h-0.5 transition-colors"
              :class="step < currentStep ? 'bg-primary' : 'bg-gray-200'"
            ></div>
            <div
              class="relative w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 z-10"
              :class="{
                'bg-gradient-to-r from-[#198341] to-[#22a854] text-white shadow-lg shadow-[#198341]/30 scale-105': step === currentStep,
                'bg-primary text-white': step < currentStep,
                'bg-gray-200 text-gray-500': step > currentStep
              }"
            >
              <svg v-if="step < currentStep" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
              <span v-else>{{ step }}</span>
            </div>
            <div class="text-[11px] mt-1.5 font-medium transition-colors"
                 :class="step <= currentStep ? 'text-primary' : 'text-gray-400'">
              {{ stepLabels[step - 1] }}
            </div>
          </div>
        </div>

        <!-- Contenu des étapes -->
        <form @submit.prevent="submitForm" class="space-y-5">

          <!-- Étape 1 : Identité + Diplôme -->
          <div v-if="currentStep === 1" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="relative group">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input v-model="form.nom" type="text" required placeholder="Nom *"
                       class="w-full pl-12 pr-4 py-3 text-base border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-primary/15 focus:border-primary focus:outline-none transition-all duration-300">
              </div>
              <div class="relative group">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input v-model="form.prenom" type="text" required placeholder="Prénom *"
                       class="w-full pl-12 pr-4 py-3 text-base border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-primary/15 focus:border-primary focus:outline-none transition-all duration-300">
              </div>
            </div>

            <!-- AJOUT DU GENRE ICI -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Genre *</label>
              <div class="flex gap-3">
                <label
                  class="flex-1 flex items-center justify-center p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition"
                  :class="form.genre === 'Masculin' ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'border-gray-200'">
                  <input type="radio" v-model="form.genre" value="Masculin" class="sr-only">
                  <span class="text-sm font-medium" :class="form.genre === 'Masculin' ? 'text-primary' : 'text-gray-700'">Masculin</span>
                </label>
                <label
                  class="flex-1 flex items-center justify-center p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition"
                  :class="form.genre === 'Féminin' ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'border-gray-200'">
                  <input type="radio" v-model="form.genre" value="Féminin" class="sr-only">
                  <span class="text-sm font-medium" :class="form.genre === 'Féminin' ? 'text-primary' : 'text-gray-700'">Féminin</span>
                </label>
              </div>
            </div>
            <!-- FIN AJOUT GENRE -->

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="relative group">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <select v-model="form.nationalite" required
                        class="w-full pl-12 pr-4 py-3 text-base border border-gray-200 rounded-xl bg-gray-50 text-gray-800 focus:bg-white focus:ring-4 focus:ring-primary/15 focus:border-primary focus:outline-none transition-all duration-300 appearance-none">
                  <option value="Ivoirien">Ivoirien</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
              <div class="relative group">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                </span>
                <input v-model="form.nni" type="text" placeholder="NNI (facultatif)"
                       class="w-full pl-12 pr-4 py-3 text-base border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-primary/15 focus:border-primary focus:outline-none transition-all duration-300">
              </div>
            </div>

            <div class="relative group">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <input v-model="form.email" type="email" required placeholder="Email professionnel *"
                     class="w-full pl-12 pr-4 py-3 text-base border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-primary/15 focus:border-primary focus:outline-none transition-all duration-300">
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="relative group">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <input v-model="form.telephone" type="tel" required placeholder="Téléphone *"
                       class="w-full pl-12 pr-4 py-3 text-base border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-primary/15 focus:border-primary focus:outline-none transition-all duration-300">
              </div>
              <div class="relative group">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
                <input v-model="form.dateNaissance" type="date" required
                       class="w-full pl-12 pr-4 py-3 text-base border border-gray-200 rounded-xl bg-gray-50 text-gray-800 focus:bg-white focus:ring-4 focus:ring-primary/15 focus:border-primary focus:outline-none transition-all duration-300">
              </div>
            </div>

            <div class="relative group">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <input v-model="form.adresse" type="text" required placeholder="Adresse *"
                     class="w-full pl-12 pr-4 py-3 text-base border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-primary/15 focus:border-primary focus:outline-none transition-all duration-300">
            </div>

            <!-- Diplôme -->
            <div class="border-t pt-4 mt-2">
              <h3 class="font-semibold text-gray-800 mb-1">Diplôme obtenu *</h3>
              <p class="text-xs text-gray-500 mb-3">Niveau minimum requis : BTS</p>

              <div class="grid grid-cols-3 gap-2">
                <label v-for="d in diplomes" :key="d"
                       class="flex items-center justify-center p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition text-sm"
                       :class="form.diplome === d ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'border-gray-200'">
                  <input type="radio" v-model="form.diplome" :value="d" class="sr-only">
                  <span :class="form.diplome === d ? 'font-semibold text-primary' : 'text-gray-700'">{{ d }}</span>
                </label>
              </div>

              <div class="mt-3 relative group">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </span>
                <input v-model="form.typeDiplome" type="text" required
                       placeholder="Type / Spécialité du diplôme *"
                       class="w-full pl-12 pr-4 py-3 text-base border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-primary/15 focus:border-primary focus:outline-none transition-all duration-300">
              </div>
            </div>
          </div>

          <!-- Étape 2 : Documents -->
          <div v-if="currentStep === 2" class="space-y-4">
            <div class="flex items-center p-3 bg-gray-50 rounded-xl">
              <input v-model="form.pasCarteIdentite" type="checkbox" id="pasCarte"
                     class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer">
              <label for="pasCarte" class="ml-2 block text-sm text-gray-700 cursor-pointer">
                Je ne possède pas de carte d’identité
              </label>
            </div>

            <div v-if="!form.pasCarteIdentite">
              <label class="block text-sm font-medium text-gray-700 mb-1">Carte d’identité *</label>
              <input type="file" @change="handleFileUpload($event, 'carteIdentite')"
                     class="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 file:cursor-pointer cursor-pointer border border-gray-200 rounded-xl bg-gray-50">
            </div>
            <div v-else>
              <label class="block text-sm font-medium text-gray-700 mb-1">Attestation d’identité / Duplicata *</label>
              <input type="file" @change="handleFileUpload($event, 'attestationIdentite')"
                     class="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 file:cursor-pointer cursor-pointer border border-gray-200 rounded-xl bg-gray-50">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Photo d’identité *</label>
              <input type="file" @change="handleFileUpload($event, 'photoIdentite')"
                     class="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 file:cursor-pointer cursor-pointer border border-gray-200 rounded-xl bg-gray-50">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Extrait de naissance *</label>
              <input type="file" @change="handleFileUpload($event, 'extraitNaissance')"
                     class="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 file:cursor-pointer cursor-pointer border border-gray-200 rounded-xl bg-gray-50">
            </div>

            <div class="border-t pt-4 mt-2">
              <div v-if="form.diplome && form.typeDiplome"
                   class="mb-3 p-3 bg-primary/5 border border-primary/20 rounded-xl text-sm">
                <p class="text-gray-700">
                  Diplôme renseigné :
                  <span class="font-semibold text-primary">{{ form.diplome }} — {{ form.typeDiplome }}</span>
                </p>
                <button type="button" @click="currentStep = 1"
                        class="text-xs text-primary hover:underline mt-1 inline-block">
                  Modifier
                </button>
              </div>

              <label class="block text-sm font-medium text-gray-700 mb-1">
                Télécharger votre diplôme
                <span v-if="form.diplome && form.typeDiplome" class="text-primary">({{ form.diplome }} - {{ form.typeDiplome }})</span>
                *
              </label>
              <input type="file" @change="handleFileUpload($event, 'diplomeFile')"
                     accept="image/*,application/pdf"
                     class="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 file:cursor-pointer cursor-pointer border border-gray-200 rounded-xl bg-gray-50">
            </div>
          </div>

          <!-- Étape 3 : Formation -->
          <div v-if="currentStep === 3" class="space-y-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">Formation souhaitée *</label>
            <div class="grid grid-cols-1 gap-2">
              <label v-for="formation in formations" :key="formation"
                     class="flex items-center p-3.5 border rounded-xl cursor-pointer hover:bg-gray-50 transition"
                     :class="form.formation === formation ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'border-gray-200'">
                <input type="radio" v-model="form.formation" :value="formation" class="h-4 w-4 text-primary">
                <span class="ml-3 text-sm" :class="form.formation === formation ? 'font-semibold text-primary' : 'text-gray-700'">{{ formation }}</span>
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
                  class="flex-1 flex items-center justify-center p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition"
                  :class="form.possedeOrdinateur === true ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'border-gray-200'">
                  <input type="radio" :value="true" v-model="form.possedeOrdinateur" class="h-4 w-4 text-primary">
                  <span class="ml-2 font-medium text-sm">Oui</span>
                </label>
                <label
                  class="flex-1 flex items-center justify-center p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition"
                  :class="form.possedeOrdinateur === false ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'border-gray-200'">
                  <input type="radio" :value="false" v-model="form.possedeOrdinateur" class="h-4 w-4 text-primary">
                  <span class="ml-2 font-medium text-sm">Non</span>
                </label>
              </div>
            </div>

            <div v-if="form.possedeOrdinateur === true" class="space-y-3 p-4 bg-gray-50 rounded-xl">
              <div class="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800">
                <p class="font-semibold mb-0.5">Configuration minimale requise :</p>
                <p>Processeur Core i5 · 8 Go de RAM · 256 Go de stockage</p>
              </div>

              <div class="space-y-3">
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Processeur *</label>
                  <select v-model="form.processeur" required
                          class="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:ring-4 focus:ring-primary/15 focus:border-primary focus:outline-none transition">
                    <option value="" disabled>Sélectionner</option>
                    <option v-for="p in processeurs" :key="p" :value="p">{{ p }}</option>
                  </select>
                </div>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">RAM *</label>
                    <select v-model="form.ram" required
                            class="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:ring-4 focus:ring-primary/15 focus:border-primary focus:outline-none transition">
                      <option value="" disabled>Sélectionner</option>
                      <option v-for="r in rams" :key="r" :value="r">{{ r }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Stockage *</label>
                    <select v-model="form.stockage" required
                            class="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:ring-4 focus:ring-primary/15 focus:border-primary focus:outline-none transition">
                      <option value="" disabled>Sélectionner</option>
                      <option v-for="s in stockages" :key="s" :value="s">{{ s }}</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">
                  Photo de l’ordinateur avec les caractéristiques visibles *
                </label>
                <p class="text-[11px] text-gray-500 mb-1.5">
                  Photo montrant l’ordinateur et ses caractéristiques (étiquette, écran système…).
                </p>
                <input type="file" accept="image/*" @change="handleFileUpload($event, 'photoOrdinateur')"
                       class="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 file:cursor-pointer cursor-pointer border border-gray-200 rounded-xl bg-white">
              </div>
            </div>

            <div v-if="form.possedeOrdinateur === false"
                 class="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
              <p class="font-semibold mb-1">Attention</p>
              <p>
                La formation nécessite un ordinateur personnel. Sans ordinateur, votre candidature
                pourrait ne pas être retenue.
              </p>
            </div>
          </div>

          <!-- Étape 5 : Récapitulatif -->
          <div v-if="currentStep === 5" class="space-y-3">
            <h2 class="text-lg font-semibold text-gray-800 text-center mb-1">
              Récapitulatif de votre dossier
            </h2>

            <!-- Informations personnelles -->
            <div class="bg-gray-50 rounded-xl p-3">
              <h3 class="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wide mb-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Informations personnelles
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs bg-white p-3 rounded-lg border border-gray-100">
                <p><span class="text-gray-500">Nom :</span> <span class="font-medium">{{ form.nom }}</span></p>
                <p><span class="text-gray-500">Prénom :</span> <span class="font-medium">{{ form.prenom }}</span></p>
                <!-- AJOUT DU GENRE DANS LE RECAP -->
                <p><span class="text-gray-500">Genre :</span> <span class="font-medium">{{ form.genre }}</span></p>
                <p><span class="text-gray-500">Nationalité :</span> <span class="font-medium">{{ form.nationalite }}</span></p>
                <p><span class="text-gray-500">NNI :</span> <span class="font-medium">{{ form.nni || 'Non renseigné' }}</span></p>
                <p class="md:col-span-2"><span class="text-gray-500">Email :</span> <span class="font-medium">{{ form.email }}</span></p>
                <p><span class="text-gray-500">Téléphone :</span> <span class="font-medium">{{ form.telephone }}</span></p>
                <p><span class="text-gray-500">Date de naissance :</span> <span class="font-medium">{{ form.dateNaissance }}</span></p>
                <p class="md:col-span-2"><span class="text-gray-500">Adresse :</span> <span class="font-medium">{{ form.adresse }}</span></p>
              </div>
            </div>

            <!-- Diplôme -->
            <div class="bg-gray-50 rounded-xl p-3">
              <h3 class="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wide mb-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Diplôme
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs bg-white p-3 rounded-lg border border-gray-100">
                <p><span class="text-gray-500">Niveau :</span> <span class="font-medium">{{ form.diplome }}</span></p>
                <p><span class="text-gray-500">Spécialité :</span> <span class="font-medium">{{ form.typeDiplome }}</span></p>
                <p class="md:col-span-2">
                  <span class="text-gray-500">Fichier :</span>
                  <span class="font-medium" :class="form.diplomeFile ? 'text-green-600' : 'text-red-500'">
                    {{ form.diplomeFile ? 'Téléchargé' : 'Manquant' }}
                  </span>
                </p>
              </div>
            </div>

            <!-- Documents -->
            <div class="bg-gray-50 rounded-xl p-3">
              <h3 class="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wide mb-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Documents
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs bg-white p-3 rounded-lg border border-gray-100">
                <p>
                  <span class="text-gray-500">Pièce d’identité :</span>
                  <span class="font-medium">{{ form.pasCarteIdentite ? 'Attestation' : 'Carte' }}</span>
                </p>
                <p>
                  <span class="text-gray-500">Photo :</span>
                  <span class="font-medium" :class="form.photoIdentite ? 'text-green-600' : 'text-red-500'">
                    {{ form.photoIdentite ? 'Fournie' : 'Manquante' }}
                  </span>
                </p>
                <p>
                  <span class="text-gray-500">Extrait naissance :</span>
                  <span class="font-medium" :class="form.extraitNaissance ? 'text-green-600' : 'text-red-500'">
                    {{ form.extraitNaissance ? 'Fourni' : 'Manquant' }}
                  </span>
                </p>
              </div>
            </div>

            <!-- Formation -->
            <div class="bg-gray-50 rounded-xl p-3">
              <h3 class="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wide mb-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Formation
              </h3>
              <div class="bg-white p-3 rounded-lg border border-gray-100 text-xs">
                <p class="font-semibold text-primary">{{ form.formation }}</p>
              </div>
            </div>

            <!-- Ordinateur -->
            <div class="bg-gray-50 rounded-xl p-3">
              <h3 class="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wide mb-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Équipement
              </h3>
              <div class="bg-white p-3 rounded-lg border border-gray-100 text-xs space-y-1">
                <p>
                  <span class="text-gray-500">Ordinateur :</span>
                  <span class="font-medium">{{ form.possedeOrdinateur ? 'Oui' : 'Non' }}</span>
                </p>
                <template v-if="form.possedeOrdinateur">
                  <p><span class="text-gray-500">Processeur :</span> <span class="font-medium">{{ form.processeur }}</span></p>
                  <p><span class="text-gray-500">RAM :</span> <span class="font-medium">{{ form.ram }}</span></p>
                  <p><span class="text-gray-500">Stockage :</span> <span class="font-medium">{{ form.stockage }}</span></p>
                  <p>
                    <span class="text-gray-500">Photo PC :</span>
                    <span class="font-medium" :class="form.photoOrdinateur ? 'text-green-600' : 'text-red-500'">
                      {{ form.photoOrdinateur ? 'Fournie' : 'Manquante' }}
                    </span>
                  </p>
                </template>
              </div>
            </div>

            <p class="text-xs text-gray-500 text-center mt-2">
              Vérifiez vos informations avant de confirmer.
            </p>
          </div>

          <!-- Boutons de navigation -->
          <div class="flex justify-between items-center pt-4 border-t border-gray-100 gap-3">
            <button type="button" @click="prevStep" v-if="currentStep > 1"
                    class="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-medium text-sm">
              Précédent
            </button>
            <div v-else></div>

            <button type="button" @click="nextStep" v-if="currentStep < 5"
                    class="px-6 py-2.5 bg-gradient-to-r from-[#198341] to-[#22a854] hover:from-[#146b34] hover:to-[#198341] text-white rounded-xl transition font-semibold text-sm shadow-lg shadow-primary/30 hover:-translate-y-0.5">
              Suivant
            </button>

            <button type="submit" v-if="currentStep === 5"
                    class="px-6 py-2.5 bg-gradient-to-r from-[#198341] to-[#22a854] hover:from-[#146b34] hover:to-[#198341] text-white rounded-xl transition font-semibold text-sm shadow-lg shadow-primary/30 hover:-translate-y-0.5">
              Confirmer l’inscription
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ================= IMAGE (DROITE) ================= -->
    <div class="w-full md:w-1/2 relative overflow-hidden order-1 md:order-2 min-h-[250px] md:min-h-screen">
      <img :src="loginImage" alt="PADCI Formation" class="w-full h-full object-cover" />

      <!-- Dégradé vert transparent -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#198341]/50 via-[#198341]/30 to-[#0f5229]/50"></div>

      <!-- Overlay desktop -->
      <div class="hidden md:flex absolute inset-0 z-20 flex-col justify-center items-center px-10 text-center text-white">
        <div class="max-w-md animate-fade-in-up drop-shadow-lg">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4 leading-tight">Rejoignez-nous</h2>
          <p class="text-base lg:text-lg opacity-90 leading-relaxed">
            Inscrivez-vous et démarrez votre parcours en formation professionnelle.
          </p>

          <div class="mt-8 flex items-center justify-center gap-6 text-sm opacity-90">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
              Certifié
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
              Reconnu
            </div>
          </div>
        </div>
      </div>

      <!-- Overlay mobile -->
      <div class="absolute inset-0 z-20 flex items-center justify-center md:hidden px-4">
        <div class="text-center text-white drop-shadow-lg">
          <h2 class="text-xl font-bold">PADCI Formation</h2>
          <p class="text-sm opacity-90">Inscription à la formation</p>
        </div>
      </div>
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

<script setup lang="ts">
import { ref, reactive } from 'vue'
import formLogo from "@/assets/images/logoemsp.png"
import loginImage from "@/assets/images/photodecybersecurite.jpg"

const currentStep = ref(1)
const showSuccessModal = ref(false)

const stepLabels = ['Identité', 'Documents', 'Formation', 'Ordinateur', 'Récapitulatif']

const formations = [
  'Cyber security',
  'Data Analysis',
  'IT Support',
  'Network Specialist',
  'Artificial Intelligence'
]
const diplomes = ['BTS', 'Licence', 'Master']
const processeurs = ['Core i5', 'Core i7', 'Core i9']
const rams = ['8 Go', '16 Go', '32 Go']
const stockages = ['256 Go', '512 Go', '1 To', '2 To']

const form = reactive({
  nom: '',
  prenom: '',
  genre: '', // <-- AJOUTÉ ICI
  nationalite: 'Ivoirien',
  nni: '',
  email: '',
  telephone: '',
  dateNaissance: '',
  adresse: '',
  diplome: '',
  typeDiplome: '',
  pasCarteIdentite: false,
  carteIdentite: null as File | null,
  attestationIdentite: null as File | null,
  photoIdentite: null as File | null,
  extraitNaissance: null as File | null,
  diplomeFile: null as File | null,
  formation: '',
  possedeOrdinateur: null as boolean | null,
  processeur: '',
  ram: '',
  stockage: '',
  photoOrdinateur: null as File | null
})

const handleFileUpload = (event: Event, field: keyof typeof form) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    (form[field] as File | null) = file
  }
}

const nextStep = () => {
  // Étape 1
  if (currentStep.value === 1) {
    if (!form.nom || !form.prenom || !form.email || !form.telephone || !form.dateNaissance || !form.adresse) {
      alert('Veuillez remplir tous les champs obligatoires de l’étape 1.')
      return
    }
    // <-- AJOUTÉ ICI
    if (!form.genre) {
      alert('Veuillez sélectionner votre genre.')
      return
    }
    if (!form.diplome) {
      alert('Veuillez sélectionner votre diplôme obtenu.')
      return
    }
    if (!form.typeDiplome) {
      alert('Veuillez renseigner le type / la spécialité de votre diplôme.')
      return
    }
  }
  // Étape 2 : Documents
  if (currentStep.value === 2) {
    if (!form.pasCarteIdentite && !form.carteIdentite) {
      alert('Veuillez télécharger une carte d’identité ou cocher "Je ne possède pas de carte".')
      return
    }
    if (form.pasCarteIdentite && !form.attestationIdentite) {
      alert('Veuillez télécharger une attestation d’identité.')
      return
    }
    if (!form.photoIdentite) {
      alert('Veuillez télécharger une photo d’identité.')
      return
    }
    if (!form.extraitNaissance) {
      alert('Veuillez télécharger un extrait de naissance.')
      return
    }
    if (!form.diplomeFile) {
      alert('Veuillez télécharger votre diplôme.')
      return
    }
  }
  // Étape 3 : Formation
  if (currentStep.value === 3) {
    if (!form.formation) {
      alert('Veuillez choisir une formation.')
      return
    }
  }
  // Étape 4 : Ordinateur
  if (currentStep.value === 4) {
    if (form.possedeOrdinateur === null) {
      alert('Veuillez indiquer si vous possédez un ordinateur.')
      return
    }
    if (form.possedeOrdinateur === true) {
      if (!form.processeur || !form.ram || !form.stockage) {
        alert('Veuillez renseigner la configuration de votre ordinateur.')
        return
      }
      if (!form.photoOrdinateur) {
        alert('Veuillez télécharger une photo de votre ordinateur avec ses caractéristiques.')
        return
      }
    }
  }

  if (currentStep.value < 5) currentStep.value++
}

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--
}

const submitForm = () => {
  console.log('Données du formulaire :', form)
  showSuccessModal.value = true
}
</script>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fadeInUp 0.7s ease-out both; }

@keyframes floatSlow {
  0%, 100% { transform: translate(0, 0); }
  50%      { transform: translate(20px, -20px); }
}
.animate-float-slow { animation: floatSlow 8s ease-in-out infinite; }

@keyframes modalIn {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
.animate-modal { animation: modalIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
</style>
