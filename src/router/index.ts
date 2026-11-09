import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { bootstrapAuth } from '@/features/auth/composables/useBootstrapAuth'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    /** Any one of these roles is enough — not all of them. */
    roles?: string[]
  }
}

/** Where a route's own `roles` meta sends an authenticated-but-wrong-role
 * user — each role's own home, so "forbidden" doesn't just bounce them to
 * login again. */
function homeFor(roles: string[]): string {
  if (roles.includes('super_admin')) return '/superadmin/dashboard'
  if (roles.includes('admin')) return '/admin/dashboard'
  return '/formations/dashboard'
}

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
      // `/connexion` est le chemin sur lequel le backend redirige le
      // navigateur après consommation du lien de vérification d'email
      // (EmailVerificationController : `/connexion?verified=1`). Alias, pas
      // une seconde route : une seule page de connexion pour l'app.
      alias: '/connexion',
      component: () => import('@/features/auth/views/Login.vue'),
    },
    {
      path: '/mot-de-passe-oublie',
      name: 'forgot-password',
      component: () => import('@/features/auth/views/ForgotPassword.vue'),
    },
    {
      // Chemin consommé par le lien de l'email de réinitialisation
      // (?token=…&email=…, ResetPasswordNotification). Alias de la route
      // canonique française — un seul composant, deux chemins d'entrée.
      path: '/reinitialiser-mot-de-passe',
      name: 'reset-password',
      alias: '/reset-password',
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
      path: '/mfa/configuration',
      name: 'mfa-setup',
      component: () => import('@/features/auth/views/MfaSetup.vue'),
      meta: { requiresAuth: true },
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

    // ==================== CATALOGUE PUBLIC (ADR-012) ====================
    {
      path: '/catalogue',
      name: 'catalogue',
      component: () => import('@/features/catalog/views/CatalogView.vue'),
    },
    {
      path: '/catalogue/:key',
      name: 'catalogue-pathway',
      component: () => import('@/features/catalog/views/PathwayDetailView.vue'),
    },

    // ==================== CANDIDATURES (ADR-012) ====================
    {
      path: '/candidature',
      name: 'candidature',
      component: () => import('@/features/admissions/views/CandidatureView.vue'),
      meta: { requiresAuth: true, roles: ['apprenant'] },
    },
    {
      path: '/mes-candidatures',
      name: 'mes-candidatures',
      component: () => import('@/features/admissions/views/MesCandidaturesView.vue'),
      meta: { requiresAuth: true, roles: ['apprenant'] },
    },

    // TODO(learning): /formation, /education-routiere, /cours are
    // standalone pages with no sidebar layout today.
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

    // ==================== APPRENANT (learning feature dynamique) ====================
    {
      path: '/formations',
      component: () => import('@/features/learning/layouts/LearnerLayout.vue'),
      meta: { requiresAuth: true, roles: ['apprenant'] },
      children: [
        { path: '', redirect: '/formations/dashboard' },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/features/learning/views/LearnerDashboard.vue'),
        },
        {
          path: ':courseKey',
          name: 'course-overview',
          component: () => import('@/features/learning/views/CourseOverview.vue'),
        },
        {
          path: ':courseKey/chapitres/:chapterKey',
          name: 'chapter-viewer',
          component: () => import('@/features/learning/views/ChapterViewer.vue'),
        },
        {
          path: '/profil',
          name: 'profil-apprenant',
          component: () => import('@/features/profile/views/ProfilApprenants.vue'),
        },
        {
          path: '/parametres',
          name: 'parametres-apprenant',
          component: () => import('@/features/profile/views/ParametresApprenant.vue'),
        },
      ],
    },

    // ==================== ADMIN ====================
    {
      path: '/admin',
      component: () => import('@/features/admin/layouts/DefaultLayoutAdmin.vue'),
      redirect: '/admin/dashboard',
      meta: { requiresAuth: true, roles: ['admin', 'super_admin'] },
      children: [
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: () => import('@/features/admin/views/AdminDashboard.vue'),
        },
        {
          path: 'candidatures',
          name: 'admin-candidatures',
          component: () => import('@/features/admin/views/AdminCandidatures.vue'),
        },
        {
          path: 'cohortes',
          name: 'admin-cohortes',
          component: () => import('@/features/admin/views/AdminCohortes.vue'),
        },
        {
          path: 'rapports',
          name: 'admin-rapports',
          component: () => import('@/features/admin/views/AdminRapports.vue'),
        },
        {
          path: 'parametres',
          name: 'admin-parametres',
          component: () => import('@/features/admin/views/AdminParametres.vue'),
        },
      ],
    },

    // ==================== SUPER ADMIN ====================
    {
      path: '/superadmin',
      component: () => import('@/features/superadmin/layouts/DefaultLayoutSuperAdmin.vue'),
      redirect: '/superadmin/dashboard',
      meta: { requiresAuth: true, roles: ['super_admin'] },
      children: [
        {
          path: 'dashboard',
          name: 'superadmin-dashboard',
          component: () => import('@/features/superadmin/views/SuperAdminDashboard.vue'),
        },
        {
          path: 'finance',
          name: 'superadmin-finance',
          component: () => import('@/features/superadmin/views/SuperAdminFinance.vue'),
        },
        {
          path: 'ano',
          name: 'superadmin-ano',
          component: () => import('@/features/superadmin/views/SuperAdminAno.vue'),
        },
        {
          path: 'cohortes',
          name: 'superadmin-cohortes',
          component: () => import('@/features/superadmin/views/SuperAdminCohortes.vue'),
        },
        {
          path: 'rapports',
          name: 'superadmin-rapports',
          component: () => import('@/features/superadmin/views/SuperAdminRapports.vue'),
        },
        {
          path: 'utilisateurs',
          name: 'superadmin-utilisateurs',
          component: () => import('@/features/superadmin/views/SuperAdminUtilisateurs.vue'),
        },
      ],
    },

    // TODO(roles): no routes yet for `formateur`/`moderateur` — the real
    // backend has 5 roles, this frontend only covers 3. Tracked, not built
    // here (see the audit report / plan).
  ],
})

/**
 * UX-only (FE-002): this never replaces server-side authorization, every
 * endpoint enforces its own policy regardless of what this guard decides.
 * Its only job is to avoid flashing a protected page before redirecting.
 */
router.beforeEach(async (to) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (!requiresAuth) return true

  await bootstrapAuth()

  const auth = useAuthStore()
  if (auth.user === null) {
    return { path: '/', query: { redirect: to.fullPath } }
  }

  const allowedRoles = to.matched.flatMap((record) => record.meta.roles ?? [])
  if (allowedRoles.length > 0 && !allowedRoles.some((role) => auth.hasRole(role))) {
    return { path: homeFor(auth.user.roles) }
  }

  return true
})

export default router
