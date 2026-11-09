# 01 — Compléter le flux d'authentification

> Prérequis de tout le reste : tant qu'on ne peut pas créer un vrai compte,
> vérifier son email et réinitialiser son mot de passe, on ne peut pas tester
> le reste de l'application en conditions réelles.

## Contexte — ce qui est déjà fait et vérifié

Vérifié en conditions réelles contre le backend dockerisé (audit 2026-11-08) :

- `POST /v1/auth/login` — `src/features/auth/composables/useLogin.ts`
  (gestion du 428 `AUTH_MFA_REQUIRED`, stockage token en `sessionStorage`).
- Challenge MFA — `useMfaChallenge.ts`, `useMfaSetup.ts`, `MfaSetup.vue`
  (ADR-006 ; redirection globale sur `AUTH_MFA_SETUP_REQUIRED` dans
  `src/api/http.ts`).
- `POST /v1/auth/logout` — `useLogout.ts`.
- Bootstrap de session — `useBootstrapAuth.ts` (`GET /v1/auth/me`), guard
  `router.beforeEach` dans `src/router/index.ts`.

**Les composables existants sont le gabarit** : `@tanstack/vue-query`
(`useMutation`), `ApiError` normalisé (`src/api/http.ts`), branchement sur
l'enveloppe `{ success, data, message }`. Un nouveau composable dans cette
tâche doit suivre la même convention, pas en inventer une.

## Constat — ce qui est factice ou manquant (re-vérifié le 2026-11-09)

### 1. `Inscription.vue` — soumission factice, contrat incomplet

`src/features/auth/views/Inscription.vue` : `submitForm()` (l.703-706) fait
uniquement `console.log(form)` puis affiche la modale de succès. **Aucun
appel API.** Le "succès" ment à l'utilisateur.

Les formulaires collectent genre, NNI, téléphone, adresse, documents
(pièces d'identité, photo, extrait de naissance, diplôme), formation
souhaitée, configuration ordinateur. **Aucun de ces champs n'appartient au
contrat d'inscription** :

- `POST /v1/auth/register`
  (`PADCI-API/app/Modules/Identity/Http/Controllers/AuthController.php::register`,
  request `RegisterRequest.php`) ne prend que :
  - `name` (string, max 255) — requis
  - `email` (email:rfc, unique) — requis
  - `password` (+ `password_confirmation`) — requis, `Password::defaults()`
  - `device_name` (optionnel, string, max 255)
  - En local/testing seulement : la réponse ajoute `verification_url`
    (lien signé, cf. `EmailVerificationLink.php`).
- Le dossier de candidature correspond à un **autre** contrat :
  `POST /v1/applications`
  (`PADCI-API/app/Modules/Admissions/Http/Requests/StoreApplicationRequest.php`)
  : `pathway_key` (requis, `exists:pathways,key`), `motivation` (optionnel),
  `payload` (array libre, max 50 — blob de contexte versionné : équipement,
  disponibilité…). **Ce endpoint exige un compte authentifié** (`auth:sanctum`).
- Les documents (pièces justificatives) se déposent via `POST /v1/media`
  (`PADCI-API/app/Modules/Media/Http/Controllers/MediaFileController.php`,
  request `StoreMediaFileRequest.php`) : champ `file` unique,
  MIME autorisés dans `config('media.mime_extensions')`, taille max
  `config('media.max_kb')`.

Conséquence d'architecture : le compte et le dossier sont **deux flux** —
1) inscription + vérification email + connexion ; 2) dossier de candidature
(connecté). Le formulaire 5 étapes actuel mélange les deux. Voir
`04-structure-cleanup.md` pour la décision produit ; cette tâche livre
d'abord ce qui a un contrat exact.

### 2. `ForgotPassword.vue` — setTimeout factice

`src/features/auth/views/ForgotPassword.vue` l.182-192 : simulation 1,5 s
puis écran "Email envoyé". L'email n'est jamais envoyé.

Contrat : `POST /v1/auth/forgot-password` `{ email }` → **toujours 202**
(`PasswordResetController::forgot`) — ne jamais afficher "cette adresse
n'existe pas", l'endpoint le garantit lui-même.

### 3. `ResetPassword.vue` — setTimeout factice + ne lit pas la query

`src/features/auth/views/ResetPassword.vue` l.240-260 : simulation 1,5 s
puis écran succès. Le mot de passe n'est jamais changé. De plus la page ne
lit ni `token` ni `email` depuis l'URL, alors que le lien de l'email en
contient les deux.

Contrat : `POST /v1/auth/reset-password`
`{ email, token, password, password_confirmation }` (champs passés à
`Password::reset` dans `PasswordResetController::reset`). Erreur :
`PasswordResetFailedException` (token invalide/expiré) ; à succès, **tous les
tokens de l'utilisateur sont révoqués** côté backend.

### 4. Bugs de chemins des emails — les deux liens cassent

Chaînes exactes à vérifier avant de cocher (déjà relevées le 2026-11-09) :

- Email de réinitialisation :
  `PADCI-API/app/Modules/Identity/Notifications/ResetPasswordNotification.php`
  construit `app.frontend_url . '/reset-password?token=…&email=…'`.
  **La SPA expose `/reinitialiser-mot-de-passe`, pas `/reset-password`** →
  le lien de l'email mène à une 404 frontend.
- Email de vérification :
  `PADCI-API/app/Modules/Identity/Http/Controllers/EmailVerificationController.php`
  redirige le navigateur vers `frontend('/connexion?verified=1')`.
  **La route de connexion de la SPA est `/`** → la redirection casse.

La correction se fait côté backend (`config('app.frontend_url')` et les
chemins construits) ou en créant les routes SPA correspondantes ;
coordonner avec le mainteneur backend — **une seule correction canonique**,
pas un contournement frontend.

### 5. Vérification d'email — page manquante

Après `POST /v1/auth/register`, jusqu'à `markEmailAsVerified`, la connexion
échoue avec **403 `AUTH_EMAIL_NOT_VERIFIED`**
(`PADCI-API/app/Modules/Identity/Exceptions/EmailNotVerifiedException.php`).
Il n'existe aucune page frontend pour consommer le lien signé ni pour
afficher un état "compte créé, en attente de vérification" avec un bouton
de renvoi — endpoint existant : `POST /v1/email/verification-notification`
(`EmailVerificationController::resend`).

## Tâches — cocher seulement après vérification réelle

### Contrat d'abord

- [ ] Lire le contrat des 6 endpoints concernés dans
  `PADCI-API/docs/api/openapi.json` (et regénérer le spec si nécessaire :
  `scramble` côté backend, puis regénérer les types frontend — règle
  contract-first de `AGENTS.md`).
- [ ] Trancher la découpe du formulaire avec le mainteneur (cf. 04) : la
  tâche livrée ici couvre **inscription compte** (étape 1 : nom, email,
  mot de passe, confirmation) + forgot/reset + vérification email. Le
  dossier de candidature (étapes 2-4) est traité après décision 04.

### Composables (convention `useLogin.ts`)

- [ ] `useRegister.ts` — `POST /v1/auth/register` ; gérer
  `VALIDATION_FAILED` (mot de passe non conforme, email déjà pris) et
  exposer `verification_url` en local.
- [ ] `useForgotPassword.ts` — `POST /v1/auth/forgot-password` ; traiter
  202 comme succès, ne jamais brancher d'affichage "email inconnu".
- [ ] `useResetPassword.ts` — `POST /v1/auth/reset-password` ; exposer le
  message `PasswordResetFailedException`.
- [ ] `useResendVerification.ts` — `POST /v1/email/verification-notification`.

### Vues & routes

- [ ] `Inscription.vue` : étape compte branchée sur `useRegister`, erreur
      de validation affichée champ par champ (`ApiError.fieldErrors`),
      écran final honnête ("consultez vos emails", lien renvoi) — plus de
      modale de succès avant un appel API qui a réussi.
- [ ] Nouvelle page `VérificationEmail` : consomme le lien signé
      (GET `/v1/email/verify/{id}/{hash}`), gère signature invalide/lien
      expiré, puis un état "vérifié → aller à la connexion".
- [ ] `ForgotPassword.vue` : brancher `useForgotPassword` (supprimer le
      setTimeout).
- [ ] `ResetPassword.vue` : lire `token` et `email` du query string,
      brancher `useResetPassword` (supprimer le setTimeout).
- [ ] Corriger les chemins des deux emails (backend ou SPA, voir 4), et
      vérifier le `app.frontend_url` du `.env.example` backend.

### Validation (doit être fait avant chaque case cochée `- [x]`)

- [ ] `npx vue-tsc --build --force` passe.
- [ ] `npm run build` passe.
- [ ] Cycle manuel complet contre le backend dockerisé
  (`docker ps` montre `padci_app` ; sinon `cd PADCI-API && make up`) :
  1. register → réponse 201 + `verification_url` en local ;
  2. login avant vérification → 403 `AUTH_EMAIL_NOT_VERIFIED` codé correctement côté UI ;
  3. clic du lien de vérification → compte vérifié ;
  4. login → token Sanctum réel, dashboard apprenant atteint ;
  5. Mailpit (`padci_mailpit`) : ouvrir l'email reset, clic du lien →
     route SPA atteinte avec `?token=…&email=…` ;
  6. reset → login avec le nouveau mot de passe → l'ancien token invalide.
- [ ] Documenter dans le commit : les endpoints appelés, et le chemin
  réellement corrigé pour les 2 liens emails.

## Rappel des règles

Un commit par tâche cochée ; tester en réel, jamais "en théorie" ; pas de
nouvelle dépendance sans la signaler (nom, version, raison).
