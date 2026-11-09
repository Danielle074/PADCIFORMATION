<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- CONTENU PRINCIPAL -->
    <section class="px-4 md:px-6 py-8 max-w-4xl mx-auto w-full">
      <!-- EN-TÊTE DU QUIZ -->
      <div class="bg-gradient-to-r from-[#007668] to-[#005a4e] text-white p-6 rounded-t-xl">
        <div class="flex items-center gap-3 mb-3">
          <GraduationCapIcon :size="30" />
          <h1 class="text-2xl md:text-3xl font-bold">Quiz Final - Module 1</h1>
        </div>
        <p class="text-white/90 mb-2">Évaluation des connaissances • Éducation routière</p>
        <div class="flex flex-wrap gap-4 mt-4">
          <div class="bg-white/20 rounded-lg px-4 py-2">
            <span class="text-sm opacity-90">10 questions</span>
          </div>
          <div class="bg-white/20 rounded-lg px-4 py-2">
            <span class="text-sm opacity-90">Note minimale : 7/10</span>
          </div>
          <div class="bg-[#FFDC00] text-[#007668] rounded-lg px-4 py-2 font-bold">
            <span>{{ score }}/10</span>
          </div>
        </div>
      </div>

      <!-- CORPS DU QUIZ -->
      <div class="bg-white rounded-b-xl shadow-md overflow-hidden p-6 md:p-8">
        <!-- Message de consigne -->
        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <div class="flex items-start gap-3">
            <InfoIcon class="text-blue-500" :size="20" />
            <div>
              <p class="text-blue-700 font-medium">Instructions</p>
              <p class="text-sm text-blue-600">
                Lis chaque question et choisis la bonne réponse. Tu as besoin d'au moins 7 bonnes réponses pour valider le module.
              </p>
            </div>
          </div>
        </div>

        <!-- LISTE DES QUESTIONS -->
        <div class="space-y-8">
          <div v-for="(question, index) in questions" :key="index"
               class="border border-gray-200 rounded-lg p-5"
               :class="{ 'border-green-500 bg-green-50': isQuestionCorrect(index) && showResults }">

            <!-- En-tête de question -->
            <div class="flex items-start gap-3 mb-4">
              <span class="bg-[#007668] text-white w-7 h-7 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                {{ index + 1 }}
              </span>
              <div class="flex-1">
                <p class="font-medium text-gray-800">{{ question.text }}</p>
                <p v-if="question.hint && showResults" class="text-sm text-[#007668] mt-1 italic">
                  <LightbulbIcon class="mr-1" /> {{ question.hint }}
                </p>
              </div>
              <!-- Icône de résultat -->
              <div v-if="showResults" class="flex-shrink-0">
                <CircleCheckIcon class="result-mark text-green-500" :size="30" v-if="isQuestionCorrect(index)" />
                <CircleXIcon class="result-mark text-red-500" :size="30" v-else />
              </div>
            </div>

            <!-- Options de réponse -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 ml-10">
              <div v-for="option in question.options" :key="option.letter"
                   @click="selectAnswer(index, option.letter)"
                   class="border rounded-lg p-3 cursor-pointer transition-all"
                   :class="[
                     selectedAnswers[index] === option.letter ? 'border-[#007668] bg-[#007668]/5' : 'border-gray-200 hover:border-[#007668] hover:bg-gray-50',
                     showResults && option.letter === question.correctAnswer ? 'border-green-500 bg-green-100' : '',
                     showResults && selectedAnswers[index] === option.letter && option.letter !== question.correctAnswer ? 'border-red-500 bg-red-100' : ''
                   ]">
                <div class="flex items-start gap-2">
                  <span class="font-bold text-gray-600">{{ option.letter }}.</span>
                  <span class="text-gray-700">{{ option.text }}</span>
                  <!-- Indicateur de bonne réponse -->
                  <span v-if="showResults && option.letter === question.correctAnswer" class="ml-auto">
                    <CheckIcon class="text-green-600" :size="20" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RÉSULTATS -->
        <div v-if="showResults" class="mt-8 p-6 rounded-lg" :class="score >= 7 ? 'bg-green-100' : 'bg-red-100'">
          <div class="flex items-center gap-4">
            <div class="text-5xl">
              <TrophyIcon v-if="score >= 7" :size="30" class="text-[#FFDC00]" />
              <CircleAlertIcon class="text-red-600" v-else />
            </div>
            <div>
              <h3 class="text-2xl font-bold" :class="score >= 7 ? 'text-green-700' : 'text-red-700'">
                {{ score >= 7 ? 'Félicitations !' : 'Dommage...' }}
              </h3>
              <p class="text-gray-700">
                Vous avez obtenu {{ score }}/10 bonnes réponses.
                <span v-if="score >= 7">Vous avez validé le module !</span>
                <span v-else>Vous n'avez pas atteint la note minimale de 7/10.</span>
              </p>
              <!-- Barre de progression -->
              <div class="w-full bg-gray-200 rounded-full h-2.5 mt-3">
                <div class="h-2.5 rounded-full"
                     :class="score >= 7 ? 'bg-green-500' : 'bg-red-500'"
                     :style="{ width: (score * 10) + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- BOUTONS D'ACTION -->
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            @click="resetQuiz"
            class="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition-all w-full md:w-auto justify-center"
          >
            <RotateCcwIcon />
            <span>Réinitialiser</span>
          </button>

          <button
            v-if="!showResults"
            @click="checkAnswers"
            :disabled="!allQuestionsAnswered"
            class="flex items-center gap-3 px-8 py-3 rounded-lg font-bold transition-all shadow-lg w-full md:w-auto justify-center"
            :class="allQuestionsAnswered ? 'bg-[#FFDC00] text-[#007668] hover:bg-[#007668] hover:text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
          >
            <ShieldCheckIcon />
            <span>Corriger mes réponses</span>
          </button>

          <button
            v-else
            @click="showResults = false; showResults = false"
            class="flex items-center gap-3 px-8 py-3 rounded-lg font-bold bg-[#007668] text-white hover:bg-[#005a4e] transition-all shadow-lg w-full md:w-auto justify-center"
          >
            <RefreshCwIcon />
            <span>Refaire le quiz</span>
          </button>

          <RouterLink
            v-if="score >= 7 && showResults"
            to="/formations/chapitre7"
            class="flex items-center gap-3 px-8 py-3 rounded-lg font-bold bg-green-600 text-white hover:bg-green-700 transition-all shadow-lg w-full md:w-auto justify-center"
          >
            <AwardIcon />
            <span>Obtenir mon certificat</span>
          </RouterLink>
        </div>

        <!-- Message d'alerte si toutes les questions ne sont pas répondues -->
        <p v-if="!allQuestionsAnswered && !showResults" class="text-center text-amber-600 text-sm mt-4">
          <CircleAlertIcon /> Veuillez répondre à toutes les questions
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { AwardIcon, CheckIcon, CircleAlertIcon, CircleCheckIcon, CircleXIcon, GraduationCapIcon, InfoIcon, LightbulbIcon, RefreshCwIcon, RotateCcwIcon, ShieldCheckIcon } from '@lucide/vue'
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

// Liste des questions
const questions = ref([
  {
    text: 'Quelle est la vitesse maximale autorisée en ville à Abidjan ?',
    options: [
      { letter: 'A', text: '30 km/h' },
      { letter: 'B', text: '50 km/h' },
      { letter: 'C', text: '70 km/h' },
      { letter: 'D', text: '90 km/h' }
    ],
    correctAnswer: 'B',
    hint: 'En ville, la vitesse est limitée à 50 km/h. Dans les zones scolaires ou marchés, elle est réduite à 30 km/h.'
  },
  {
    text: 'Que signifie un feu tricolore rouge ?',
    options: [
      { letter: 'A', text: 'On peut passer si personne n\'arrive' },
      { letter: 'B', text: 'On accélère pour dégager la voie' },
      { letter: 'C', text: 'On s\'arrête obligatoirement' },
      { letter: 'D', text: 'On ralentit seulement' }
    ],
    correctAnswer: 'C',
    hint: 'Un feu rouge impose l\'arrêt total, sans exception. Griller un feu rouge est une infraction grave.'
  },
  {
    text: 'Quel numéro appelles-tu pour les urgences médicales à Abidjan ?',
    options: [
      { letter: 'A', text: '110' },
      { letter: 'B', text: '180' },
      { letter: 'C', text: '1515' },
      { letter: 'D', text: '111' }
    ],
    correctAnswer: 'C',
    hint: 'Le 1515 est le numéro du SAMU en Côte d\'Ivoire pour les urgences médicales.'
  },
  {
    text: 'Tu as un accident. Tu dois le déclarer à ton assurance dans quel délai ?',
    options: [
      { letter: 'A', text: '24 heures' },
      { letter: 'B', text: '48 heures' },
      { letter: 'C', text: '1 semaine' },
      { letter: 'D', text: '1 mois' }
    ],
    correctAnswer: 'B',
    hint: 'En Côte d\'Ivoire, la déclaration d\'accident à l\'assurance doit se faire dans les 48 heures.'
  },
  {
    text: 'Un panneau triangulaire avec une bordure rouge indique :',
    options: [
      { letter: 'A', text: 'Une interdiction' },
      { letter: 'B', text: 'Une information' },
      { letter: 'C', text: 'Un danger' },
      { letter: 'D', text: 'Une obligation' }
    ],
    correctAnswer: 'C',
    hint: 'Les panneaux triangulaires à bordure rouge signalent un danger. Ils t\'alertent d\'un risque devant toi.'
  },
  {
    text: 'Tu conduis sous la pluie. Que fais-tu ?',
    options: [
      { letter: 'A', text: 'Tu accélères pour finir vite' },
      { letter: 'B', text: 'Tu réduis ta vitesse et augmentes la distance de sécurité' },
      { letter: 'C', text: 'Tu continues à la même vitesse' },
      { letter: 'D', text: 'Tu t\'arrêtes immédiatement' }
    ],
    correctAnswer: 'B',
    hint: 'La pluie rend la route glissante. Il faut réduire la vitesse et garder une grande distance de sécurité.'
  },
  {
    text: 'Que fais-tu si un policier te fait signe de t\'arrêter ?',
    options: [
      { letter: 'A', text: 'Tu accélères pour t\'échapper' },
      { letter: 'B', text: 'Tu t\'arrêtes calmement et tu salues' },
      { letter: 'C', text: 'Tu ignores et tu continues' },
      { letter: 'D', text: 'Tu fais demi-tour' }
    ],
    correctAnswer: 'B',
    hint: 'Fuir ou ignorer un policier est une infraction grave. Tu t\'arrêtes toujours avec respect et calme.'
  },
  {
    text: 'Lequel de ces comportements est autorisé en conduisant ?',
    options: [
      { letter: 'A', text: 'Téléphoner avec un kit mains-libres' },
      { letter: 'B', text: 'Envoyer un SMS à un feu rouge' },
      { letter: 'C', text: 'Tenir le téléphone à la main' },
      { letter: 'D', text: 'Regarder sa carte Google Maps en roulant' }
    ],
    correctAnswer: 'A',
    hint: 'Seul le kit mains-libres est toléré. Tenir le téléphone en main est une infraction sanctionnée.'
  },
  {
    text: 'Qui a la priorité sur un passage piéton ?',
    options: [
      { letter: 'A', text: 'Le véhicule le plus rapide' },
      { letter: 'B', text: 'Le premier arrivé' },
      { letter: 'C', text: 'Le piéton toujours' },
      { letter: 'D', text: 'Le conducteur' }
    ],
    correctAnswer: 'C',
    hint: 'Le piéton engagé ou sur le point de s\'engager a toujours la priorité sur le passage piéton.'
  },
  {
    text: 'Que signifie un feu tricolore jaune fixe ?',
    options: [
      { letter: 'A', text: 'Je peux passer si je suis pressé' },
      { letter: 'B', text: 'Je m\'arrête si je peux le faire sans danger' },
      { letter: 'C', text: 'J\'accélère pour passer avant le rouge' },
      { letter: 'D', text: 'C\'est un feu en panne' }
    ],
    correctAnswer: 'B',
    hint: 'Le feu jaune fixe annonce le passage au rouge. Il faut s\'arrêter si on peut le faire sans danger.'
  }
])

// Réponses sélectionnées par l'utilisateur
const selectedAnswers = ref(Array(questions.value.length).fill(null))
const showResults = ref(false)

// Sélectionner une réponse
const selectAnswer = (questionIndex, letter) => {
  if (!showResults.value) {
    selectedAnswers.value[questionIndex] = letter
  }
}

// Vérifier si toutes les questions ont une réponse
const allQuestionsAnswered = computed(() => {
  return selectedAnswers.value.every(answer => answer !== null)
})

// Calculer le score
const score = computed(() => {
  let correct = 0
  questions.value.forEach((question, index) => {
    if (selectedAnswers.value[index] === question.correctAnswer) {
      correct++
    }
  })
  return correct
})

// Vérifier si une question est correcte
const isQuestionCorrect = (index) => {
  return selectedAnswers.value[index] === questions.value[index].correctAnswer
}

// Corriger les réponses
const checkAnswers = () => {
  if (allQuestionsAnswered.value) {
    showResults.value = true
  }
}

// Réinitialiser le quiz
const resetQuiz = () => {
  selectedAnswers.value = Array(questions.value.length).fill(null)
  showResults.value = false
}
</script>

<style scoped>
/* Animations */
.bx {
  transition: all 0.2s ease;
}

button:disabled {
  cursor: not-allowed;
}

/* Animation pour les coches */
.result-mark {
  animation: popIn 0.3s ease;
}

@keyframes popIn {
  0% { transform: scale(0); }
  80% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

/* Style pour les options cliquables */
.cursor-pointer {
  transition: all 0.2s ease;
}

.cursor-pointer:hover {
  transform: translateY(-1px);
}

/* Responsive */
@media (max-width: 640px) {
  .ml-10 {
    margin-left: 0;
  }
}
</style>
