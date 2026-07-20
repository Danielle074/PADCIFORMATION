<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">

   <!-- HEADER -->
    <section class="relative w-full h-96 overflow-hidden">
      <img
        :src="headerImage"
        alt="Dashboard Header"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 "></div>


    </section>

    <!-- CONTENU PRINCIPAL -->
    <section class="px-4 md:px-6 py-8 max-w-6xl mx-auto w-full">

      <!-- TITRE + RETOUR -->
      <div class="mb-6 relative">
        <RouterLink
          to="/formation"
          class="text-[#007668] text-2xl font-bold hover:scale-110 transition absolute left-0 -top-2"
        >
          ←
        </RouterLink>
        <p class="text-xs font-semibold text-[#007668] absolute left-0 top-6">
          Retour
        </p>

        <div class="text-center">
          <h2 class="text-xl font-bold text-[#007668] mb-1">
            Support de cours
          </h2>
          <p class="text-sm text-gray-600">Chapitre 1 — Le Code de la Route en Côte d'Ivoire</p>
        </div>
      </div>

      <!-- INTRODUCTION DU COURS -->
      <div class="bg-white rounded-xl shadow-md p-6 mb-8">
        <p class="text-gray-700 leading-relaxed">
          Chaque jour, des centaines de coursiers circulent dans les rues d'Abidjan pour livrer des colis,
          des repas et des documents. Ce travail est utile pour toute la ville. Mais les routes d'Abidjan
          peuvent être dangereuses : embouteillages, carrefours difficiles, piétons nombreux, routes
          abîmées.

        </p>
        <p class="text-gray-700 leading-relaxed mt-4">
          Ce module de formation a été créé spécialement pour les coursiers. Il explique les règles de la
          route, comment conduire en sécurité, et comment éviter les accidents.
        </p>
      </div>

      <!-- OBJECTIFS D'APPRENTISSAGE -->
      <div class="bg-[#f0f9f5] rounded-xl p-6 mb-8 border-l-4 border-[#FFDC00]">
        <h3 class="font-bold text-[#007668] text-lg mb-4 flex items-center gap-2">
          <i class='bx bx-target-lock text-2xl'></i>
          Ce que vous allez apprendre dans ce chapitre
        </h3>
        <ul class="grid md:grid-cols-2 gap-3">
          <li class="flex items-start gap-2">
            <span class="text-[#007668] font-bold">1.</span>
            <span>Connaître le Code de la Route en Côte d'Ivoire</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-[#007668] font-bold">2.</span>
            <span>Comprendre les panneaux et les signaux</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-[#007668] font-bold">3.</span>
            <span>Adopter les bons comportements au volant</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-[#007668] font-bold">4.</span>
            <span>Connaître vos droits et responsabilités</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-[#007668] font-bold">5.</span>
            <span>Savoir quoi faire en cas d'accident</span>
          </li>
        </ul>
        <div class="mt-4 flex items-center gap-2 text-sm text-gray-600 bg-white/50 p-3 rounded-lg">
          <i class='bx bx-time text-[#007668]'></i>
          <span>⏱ Durée estimée : 45 minutes • Lisez chaque partie calmement. À la fin, un quiz vous permettra de vérifier ce que vous avez appris.</span>
        </div>
      </div>

      <!-- CHAPITRE 1.1 -->
      <div class="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 class="font-bold text-[#007668] text-lg mb-3">Chapitre 1 — Le Code de la Route en Côte d'Ivoire</h3>
        <p class="text-gray-700 mb-4">
          Le Code de la Route est un ensemble de règles que tous les conducteurs doivent respecter. Ces
          règles protègent votre vie et la vie des autres.
        </p>

        <div class="bg-yellow-50 p-4 rounded-lg mb-4 flex items-start gap-3">
          <i class='bx bx-question-mark text-2xl text-[#FFDC00] bg-[#007668] rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0'></i>
          <div>
            <p class="font-semibold text-[#007668]">Le saviez-vous?</p>
            <p class="text-sm text-gray-700">En Côte d'Ivoire, les accidents de la route sont l'une des premières causes de décès. La majorité des accidents arrivent à cause du non-respect du Code de la Route. Respecter les règles, c'est protéger votre vie et votre travail.</p>
          </div>
        </div>

        <h4 class="font-semibold text-[#007668] mb-2">1.2 — Les documents obligatoires</h4>
        <p class="text-sm text-gray-600 mb-3">En tant que coursier, vous devez toujours avoir ces documents avec vous :</p>

        <div class="overflow-x-auto mb-6">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-[#007668] text-white">
                <th class="p-3 text-left text-sm">Document</th>
                <th class="p-3 text-left text-sm">À quoi ça sert ?</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b">
                <td class="p-3 font-medium">Permis de conduire (A ou A2 pour moto)</td>
                <td class="p-3 text-sm">Prouve que vous avez le droit de conduire</td>
              </tr>
              <tr class="border-b bg-gray-50">
                <td class="p-3 font-medium">Carte grise du véhicule</td>
                <td class="p-3 text-sm">Prouve que le véhicule est enregistré</td>
              </tr>
              <tr class="border-b">
                <td class="p-3 font-medium">Assurance en cours de validité</td>
                <td class="p-3 text-sm">Couvre les dommages en cas d'accident</td>
              </tr>
              <tr class="border-b bg-gray-50">
                <td class="p-3 font-medium">Carte nationale d'identité</td>
                <td class="p-3 text-sm">Pièce d'identité officielle</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="bg-red-50 p-4 rounded-lg mb-6 flex items-start gap-3">
          <i class='bx bx-error-circle text-2xl text-red-600 flex-shrink-0'></i>
          <div>
            <p class="font-semibold text-red-700">Attention !</p>
            <p class="text-sm text-gray-700">Rouler sans ces documents peut entraîner une amende ou la saisie de votre véhicule par la Police ou la Gendarmerie.</p>
          </div>
        </div>

        <h4 class="font-semibold text-[#007668] mb-2">1.3 — Les équipements obligatoires</h4>
        <p class="text-sm text-gray-600 mb-3">Pour votre sécurité et celle des autres, certains équipements sont obligatoires :</p>

        <ul class="list-disc pl-6 mb-4 space-y-1 text-gray-700">
          <li>Le casque homologué (pour vous ET votre passager si vous en avez un)</li>
          <li>Les rétroviseurs en bon état</li>
          <li>Les clignotants qui fonctionnent</li>
          <li>Les freins efficaces</li>
          <li>Les feux avant et arrière (surtout la nuit)</li>
        </ul>

        <div class="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
          <i class='bx bx-bulb text-2xl text-blue-600 flex-shrink-0'></i>
          <div>
            <p class="font-semibold text-blue-700">Conseil pratique</p>
            <p class="text-sm text-gray-700">Vérifiez votre véhicule chaque matin avant de partir : pneus, freins, rétroviseurs, feux. Cela prend 5 minutes et peut vous sauver la vie.</p>
          </div>
        </div>
      </div>

      <!-- CHAPITRE 2 (Raccourci) -->
      <div class="bg-white rounded-xl shadow-md p-6 mb-8">
        <h3 class="font-bold text-[#007668] text-lg mb-2">Chapitre 2 — Les Panneaux et Signaux de Circulation</h3>
        <p class="text-gray-700">
          Les panneaux de signalisation indiquent ce que vous devez faire ou ne pas faire sur la route. Il
          est très important de les connaître.
        </p>
        <div class="mt-4 text-center py-4 bg-gray-100 rounded-lg">
          <p class="text-gray-500 italic">(Contenu détaillé à venir dans la version complète du cours)</p>
        </div>
      </div>

      <!-- LIENS PDF, VIDEO, QUIZ -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <!-- Lien PDF -->
        <a
          :href="pdfUrl"
          target="_blank"
          class="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg hover:scale-105 transition-all cursor-pointer border-2 border-transparent hover:border-[#FFDC00] group"
        >
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-red-200 transition">
            <i class='bx bxs-file-pdf text-red-600 text-4xl'></i>
          </div>
          <h3 class="font-bold text-[#007668] text-lg mb-1">PDF</h3>
          <p class="text-sm text-gray-600">Télécharger le cours complet</p>
          <span class="text-xs text-gray-400 mt-2">PDF • 2.5 MB</span>
        </a>

        <!-- Lien Vidéo - Ouvre la vidéo module1 -->
        <a
          :href="videoUrl"
          target="_blank"
          class="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg hover:scale-105 transition-all cursor-pointer border-2 border-transparent hover:border-[#FFDC00] group"
        >
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-200 transition">
            <i class='bx bxs-video text-blue-600 text-4xl'></i>
          </div>
          <h3 class="font-bold text-[#007668] text-lg mb-1">Vidéo</h3>
          <p class="text-sm text-gray-600">Regarder la leçon vidéo</p>
          <span class="text-xs text-gray-400 mt-2">Module 1 • 15 min</span>
        </a>

        <!-- Lien Quiz -->
        <a
          :href="quizUrl"
          target="_blank"
          class="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg hover:scale-105 transition-all cursor-pointer border-2 border-transparent hover:border-[#FFDC00] group"
        >
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-200 transition">
            <i class='bx bx-question-mark text-green-600 text-4xl'></i>
          </div>
          <h3 class="font-bold text-[#007668] text-lg mb-1">Quiz</h3>
          <p class="text-sm text-gray-600">Tester vos connaissances</p>
          <span class="text-xs text-gray-400 mt-2">10 questions</span>
        </a>
      </div>

      <!-- BOUTON S'ENREGISTRER -->
      <div class="text-center mt-6 mb-10">
        <RouterLink
          to="/inscription-formation"
          class="inline-flex items-center gap-3 bg-[#FFDC00] text-[#007668] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#007668] hover:text-white transition-all shadow-lg hover:shadow-xl"
        >
          <i class='bx bx-edit-alt text-2xl'></i>
          S'enregistrer pour cette formation
          <i class='bx bx-right-arrow-alt text-2xl'></i>
        </RouterLink>
        <p class="text-xs text-gray-500 mt-3">L'enregistrement vous permet de suivre votre progression et d'obtenir une attestation</p>
      </div>

    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import headerImage from '@/assets/images/bannieredepoli.jpg'

// URLs pour les ressources
const pdfUrl = '/Module_Education_Routiere_Coursiers_Abidjan.pdf'
const videoUrl = '/module1.mp4' // Pour une vidéo locale dans /public
// OU const videoUrl = 'https://www.youtube.com/watch?v=VOTRE_ID_VIDEO' // Pour YouTube
const quizUrl = '/quiz-chapitre1'
</script>

<style scoped>
/* Styles supplémentaires si nécessaire */
</style>
