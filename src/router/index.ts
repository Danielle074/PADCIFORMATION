import { createRouter, createWebHistory } from 'vue-router'

// ==================== IMPORTS EXISTANTS ====================
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
import Chapitre5 from '@/views/formations/Chapitre5.vue'
import Chapitre6 from '@/views/formations/Chapitre6.vue'
import Chapitre7 from '@/views/formations/Chapitre7.vue'
import Exercices from '@/components/Exercices.vue'
import Evaluations from '@/components/Evaluations.vue'
import Inscription from '@/views/Inscription.vue'


// ==================== NOUVEAUX IMPORTS ADMIN ====================
import DefaultLayoutAdmin from '@/layouts/admin/DefaultLayoutAdmin.vue'
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import AdminCandidatures from '@/views/admin/AdminCandidatures.vue'
import AdminCohortes from '@/views/admin/AdminCohortes.vue'
import AdminRapports from '@/views/admin/AdminRapports.vue'
import AdminParametres from '@/views/admin/AdminParametres.vue'

// ==================== NOUVEAUX IMPORTS SUPER ADMIN ====================
import DefaultLayoutSuperAdmin from '@/layouts/superadmin/DefaultLayoutSuperAdmin.vue'
import SuperAdminDashboard from '@/views/superadmin/SuperAdminDashboard.vue'
import SuperAdminFinance from '@/views/superadmin/SuperAdminFinance.vue'
import SuperAdminAno from '@/views/superadmin/SuperAdminAno.vue'
import SuperAdminCohortes from '@/views/superadmin/SuperAdminCohortes.vue'
import SuperAdminRapports from '@/views/superadmin/SuperAdminRapports.vue'
import SuperAdminUtilisateurs from '@/views/superadmin/SuperAdminUtilisateurs.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [

    // ==================== PAGES SANS SIDEBAR ====================
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

    // ==================== PAGES APPRENANT (SIDEBAR) ====================
    {
      path: '/formations',
      component: DefaultLayout,
      children: [
        { path: 'modules1', name: 'modules1', component: Modules1 },
        { path: 'dashboard', name: 'dashboard', component: Dashboard },
        { path: 'chapitre2', name: 'chapitre2', component: Chapitre2 },
        { path: 'chapitre3', name: 'chapitre3', component: Chapitre3 },
        { path: 'chapitre4', name: 'chapitre4', component: Chapitre4 },
        { path: 'chapitre5', name: 'chapitre5', component: Chapitre5 },
        { path: 'chapitre6', name: 'chapitre6', component: Chapitre6 },
        { path: 'chapitre7', name: 'chapitre7', component: Chapitre7 },
        { path: 'exercices', name: 'exercices', component: Exercices },
        { path: 'evaluations', name: 'evaluations', component: Evaluations },
      ]
    },

    // ==================== PAGES ADMIN (SIDEBAR ADMIN) ====================
    {
      path: '/admin',
      component: DefaultLayoutAdmin,
      redirect: '/admin/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: AdminDashboard
        },
        {
          path: 'candidatures',
          name: 'admin-candidatures',
          component: AdminCandidatures
        },
        {
          path: 'cohortes',
          name: 'admin-cohortes',
          component: AdminCohortes
        },
        {
          path: 'rapports',
          name: 'admin-rapports',
          component: AdminRapports
        },
        {
          path: 'parametres',
          name: 'admin-parametres',
          component: AdminParametres
        }
      ]
    },

    // ==================== PAGES SUPER ADMIN (SIDEBAR SUPER ADMIN) ====================
    {
      path: '/superadmin',
      component: DefaultLayoutSuperAdmin,
      redirect: '/superadmin/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'superadmin-dashboard',
          component: SuperAdminDashboard
        },
        {
          path: 'finance',
          name: 'superadmin-finance',
          component: SuperAdminFinance
        },
        {
          path: 'ano',
          name: 'superadmin-ano',
          component: SuperAdminAno
        },
        {
          path: 'cohortes',
          name: 'superadmin-cohortes',
          component: SuperAdminCohortes
        },
        {
          path: 'rapports',
          name: 'superadmin-rapports',
          component: SuperAdminRapports
        },
        {
          path: 'utilisateurs',
          name: 'superadmin-utilisateurs',
          component: SuperAdminUtilisateurs
        }
      ]
    }

  ]
})

export default router
