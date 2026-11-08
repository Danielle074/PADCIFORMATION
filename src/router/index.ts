import { createRouter, createWebHistory } from 'vue-router'

// Routes are feature-based (src/features/<domain>) rather than role-based —
// see docs/architecture note in the PADCI backend repo for the module
// mapping this mirrors (Catalog, Learning, Admissions...).
//
// Every page is lazy-loaded: the previous single-chunk build warned about a
// >500KB bundle (no code-splitting at all). This also means each route's
// component only downloads when actually navigated to.

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    // ==================== AUTH / PUBLIC ====================
    {
      path: '/',
      name: 'login',
      component: () => import('@/features/auth/views/Login.vue'),
    },
    {
      path: '/mot-de-passe-oublie',
      name: 'forgot-password',
      component: () => import('@/features/auth/views/ForgotPassword.vue'),
    },
    {
      path: '/reinitialiser-mot-de-passe',
      name: 'reset-password',
      component: () => import('@/features/auth/views/ResetPassword.vue'),
    },
    {
      path: '/nouvelle-demande',
      name: 'nouvelle-demande',
      component: () => import('@/features/auth/views/NouvelleDemande.vue'),
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: () => import('@/features/auth/views/Inscription.vue'),
    },
    {
      path: '/accueil',
      name: 'Accueil',
      component: () => import('@/features/public/views/Accueil.vue'),
    },
    {
      path: '/connectivite',
      name: 'connectivity-check',
      component: () => import('@/features/public/views/ConnectivityCheck.vue'),
    },

    // TODO(learning): /formation, /education-routiere, /cours are
    // standalone pages with no sidebar layout today — same status as
    // before this reorg, not resolved here. Likely belong under a public
    // catalog feature once the real catalog is wired to the API.
    {
      path: '/formation',
      name: 'formation',
      component: () => import('@/features/learning/views/Formation.vue'),
    },
    {
      path: '/education-routiere',
      name: 'education-routiere',
      component: () => import('@/features/learning/views/EducationRoutiere.vue'),
    },
    {
      path: '/cours',
      name: 'cours',
      component: () => import('@/features/learning/views/Cours.vue'),
    },

    // ==================== APPRENANT (learning feature) ====================
    {
      path: '/formations',
      component: () => import('@/features/learning/layouts/DefaultLayout.vue'),
      children: [
        { path: 'modules1', name: 'modules1', component: () => import('@/features/learning/views/Modules1.vue') },
        { path: 'dashboard', name: 'dashboard', component: () => import('@/features/learning/views/Dashboard.vue') },
        { path: 'chapitre2', name: 'chapitre2', component: () => import('@/features/learning/views/Chapitre2.vue') },
        { path: 'chapitre3', name: 'chapitre3', component: () => import('@/features/learning/views/Chapitre3.vue') },
        { path: 'chapitre4', name: 'chapitre4', component: () => import('@/features/learning/views/Chapitre4.vue') },
        { path: 'chapitre5', name: 'chapitre5', component: () => import('@/features/learning/views/Chapitre5.vue') },
        { path: 'chapitre6', name: 'chapitre6', component: () => import('@/features/learning/views/Chapitre6.vue') },
        { path: 'chapitre7', name: 'chapitre7', component: () => import('@/features/learning/views/Chapitre7.vue') },
        { path: 'exercices', name: 'exercices', component: () => import('@/features/learning/views/Exercices.vue') },
        { path: 'evaluations', name: 'evaluations', component: () => import('@/features/learning/views/Evaluations.vue') },
        { path: '/profil', name: 'profil-apprenant', component: () => import('@/features/profile/views/ProfilApprenants.vue') },
        { path: '/parametres', name: 'parametres-apprenant', component: () => import('@/features/profile/views/ParametresApprenant.vue') },
      ],
    },

    // TODO(learning): this is one hardcoded example course ("réseau"/CCNA),
    // duplicating the generic /formations pages above instead of the
    // generic dashboard rendering whatever course the learner is actually
    // enrolled in. Left as-is structurally (just relocated) — fixing the
    // duplication is API-wiring work (Phase 5), not this reorg.
    {
      path: '/formations/network',
      component: () => import('@/features/learning/layouts/DefaultLayoutNetworkSpecialist.vue'),
      redirect: '/formations/network/dashboard',
      children: [
        { path: 'dashboard', name: 'network-dashboard', component: () => import('@/features/learning/views/network/NetworkDashboard.vue') },
        { path: 'introduction', name: 'network-introduction', component: () => import('@/features/learning/views/network/Introduction.vue') },
        { path: 'chapitre1', name: 'network-chapitre1', component: () => import('@/features/learning/views/network/NetworkChapitre1.vue') },
        { path: 'chapitre2', name: 'network-chapitre2', component: () => import('@/features/learning/views/network/NetworkChapitre2.vue') },
        { path: 'chapitre3', name: 'network-chapitre3', component: () => import('@/features/learning/views/network/NetworkChapitre3.vue') },
        { path: 'chapitre4', name: 'network-chapitre4', component: () => import('@/features/learning/views/network/NetworkChapitre4.vue') },
        { path: 'chapitre5', name: 'network-chapitre5', component: () => import('@/features/learning/views/network/NetworkChapitre5.vue') },
        { path: 'chapitre6', name: 'network-chapitre6', component: () => import('@/features/learning/views/network/NetworkChapitre6.vue') },
        { path: 'tp', name: 'network-tp', component: () => import('@/features/learning/views/network/NetworkTp.vue') },
        { path: 'examen', name: 'network-examen', component: () => import('@/features/learning/views/network/NetworkExamen.vue') },
        { path: 'annexes', name: 'network-annexes', component: () => import('@/features/learning/views/network/Annexes.vue') },
      ],
    },

    // ==================== ADMIN ====================
    {
      path: '/admin',
      component: () => import('@/features/admin/layouts/DefaultLayoutAdmin.vue'),
      redirect: '/admin/dashboard',
      children: [
        { path: 'dashboard', name: 'admin-dashboard', component: () => import('@/features/admin/views/AdminDashboard.vue') },
        { path: 'candidatures', name: 'admin-candidatures', component: () => import('@/features/admin/views/AdminCandidatures.vue') },
        { path: 'cohortes', name: 'admin-cohortes', component: () => import('@/features/admin/views/AdminCohortes.vue') },
        { path: 'rapports', name: 'admin-rapports', component: () => import('@/features/admin/views/AdminRapports.vue') },
        { path: 'parametres', name: 'admin-parametres', component: () => import('@/features/admin/views/AdminParametres.vue') },
      ],
    },

    // ==================== SUPER ADMIN ====================
    {
      path: '/superadmin',
      component: () => import('@/features/superadmin/layouts/DefaultLayoutSuperAdmin.vue'),
      redirect: '/superadmin/dashboard',
      children: [
        { path: 'dashboard', name: 'superadmin-dashboard', component: () => import('@/features/superadmin/views/SuperAdminDashboard.vue') },
        { path: 'finance', name: 'superadmin-finance', component: () => import('@/features/superadmin/views/SuperAdminFinance.vue') },
        { path: 'ano', name: 'superadmin-ano', component: () => import('@/features/superadmin/views/SuperAdminAno.vue') },
        { path: 'cohortes', name: 'superadmin-cohortes', component: () => import('@/features/superadmin/views/SuperAdminCohortes.vue') },
        { path: 'rapports', name: 'superadmin-rapports', component: () => import('@/features/superadmin/views/SuperAdminRapports.vue') },
        { path: 'utilisateurs', name: 'superadmin-utilisateurs', component: () => import('@/features/superadmin/views/SuperAdminUtilisateurs.vue') },
      ],
    },

    // TODO(roles): no routes yet for `formateur`/`moderateur` — the real
    // backend has 5 roles, this frontend only covers 3. Tracked, not built
    // here (see the audit report / plan).
  ],
})

export default router
