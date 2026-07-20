import { createRouter, createWebHistory } from 'vue-router'

import Accueil from '@/views/Accueil.vue'
import Login from '@/views/Login.vue'
import Formation from '@/components/Formation.vue'
import EducationRoutiere from '@/components/EducationRoutiere.vue'
import Cours from '@/components/Cours.vue'
import NouvelleDemande from '@/components/NouvelleDemande.vue'
import Modules1 from '@/views/formations/Modules1.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Dashboard from '@/views/formations/Dashboard.vue'
import Chapitre2 from '@/views/formations/Chapitre2.vue'
import Chapitre3 from '@/views/formations/Chapitre3.vue'
import Chapitre4 from '@/views/formations/Chapitre4.vue'
import Chapitre6 from '@/views/formations/Chapitre6.vue'
import Chapitre7 from '@/views/formations/Chapitre7.vue'

import Chapitre5 from '@/views/formations/Chapitre5.vue'
import Exercices from '@/components/Exercices.vue'
import Evaluations from '@/components/Evaluations.vue'
import Inscription from '@/views/Inscription.vue'
import Certificats from '@/components/Certificats.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [

    // PAGES SANS SIDEBAR
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/accueil',
      name: 'Accueil',
      component: Accueil
    },
    {
      path: '/formation',
      name: 'formation',
      component: Formation
    },
    {
      path: '/education-routiere',
      name: 'education-routiere',
      component: EducationRoutiere
    },
    {
      path: '/cours',
      name: 'cours',
      component: Cours
    },
    {
      path: '/nouvelle-demande',
      name: 'nouvelle-demande',
      component: NouvelleDemande
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: Inscription
    },

    // PAGES AVEC SIDEBAR
    {
      path: '/formations',
      component: DefaultLayout,
      children: [
        {
          path: 'modules1',
          name: 'modules1',
          component: Modules1
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: Dashboard
        }
        ,
        {
          path: 'chapitre2',
          name: 'chapitre2',
          component: Chapitre2
        },
        {
          path: 'chapitre3',
          name: 'chapitre3',
          component: Chapitre3
        },
        {
          path: 'chapitre4',
          name: 'chapitre4',
          component: Chapitre4
        },
        {
          path: 'chapitre5',
          name: 'chapitre5',
          component: Chapitre5
        },
        {
          path: 'chapitre6',
          name: 'chapitre6',
          component: Chapitre6
        },
        {
          path: 'chapitre7',
          name: 'chapitre7',
          component: Chapitre7
        },

        {
          path: 'exercices',
          name: 'exercices',
          component: Exercices
        },
        {
          path: 'evaluations',
          name: 'evaluations',
          component: Evaluations
        },
        {
          path: 'certificats',
          name: 'certificats',
          component: Certificats
        }
      ]
    }

  ]
})

export default router
