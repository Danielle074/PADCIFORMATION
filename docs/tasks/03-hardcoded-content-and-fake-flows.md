# 03 — Remplacer le contenu en dur et les flux factices

> Ce qui reste après le 01 (flux auth) : les vues métier affichent des
> données inventées et n'appellent aucune API. Brancher celles qui ont un
> contrat backend réel ; ajouter à `04-structure-cleanup.md` celles qui
> n'ont pas encore de décision produit.

## Constat (re-vérifié le 2026-11-09)

**Aucune vue métier n'appelle l'API.** Le seul appel frontend hors auth est
le ping de connectivité :

```bash
grep -rn "useApiPing\|http\.\(get\|post\|patch\|put\)" src --include="*.vue"
# → src/features/public/views/ConnectivityCheck.vue:12  (seul match)
```

Les composables auth (`useLogin`, `useLogout`, `useBootstrapAuth`,
`useMfaSetup`, `useMfaChallenge`) sont les seuls consommateurs réels —
vérifiés en conditions réelles (audit 2026-11-08).

### Données en dur citées précisément (toutes relues le 2026-11-09)

- `src/features/admin/views/AdminCandidatures.vue` l.274 : `const candidats = ref([...])` — dossier de candidatures.
- `src/features/admin/views/AdminCohortes.vue` l.142 : `const cohortes = ref([...])`.
- `src/features/admin/views/AdminDashboard.vue` l.255 : `const recentCandidats = [...]`.
- `src/features/superadmin/views/SuperAdminDashboard.vue` l.102-122 : `budgetChartData`, `progressChartData` (graphiques chart.js alimentés par des littéraux).
- `src/features/superadmin/views/SuperAdminFinance.vue` : budget "128.6 M €" en dur, tableau de décaissements `ref([...])`.
- `src/features/superadmin/views/SuperAdminAno.vue` l.120 : `const anos = ref<Ano[]>([...])` ; `confirmerSignature()` (l.173) ne fait qu'une mutation locale, commentaire explicite "à remplacer par un appel API".
- `src/features/learning/views/Dashboard.vue` (426 l.), `Exercices.vue`, `Evaluations.vue` (362 l. chacun), toutes les pages chapitre et `/formations/network/*` : 100 % statique.
- `src/features/profile/views/ProfilApprenants.vue`, `ParametresApprenant.vue` : 100 % statique.

### Flux factices résiduels

- Vues auth : couvertes par `01-auth-flow-completion.md` — ne pas les
  rebrancher ici.

## Contraintes de méthode (non négociables)

- **Contract-first** : pour chaque branche, partir de
  `PADCI-API/docs/api/openapi.json` ; si le spec est en retard sur le
  backend, regénérer d'abord (`AGENTS.md`). Regénérer ensuite les types
  frontend (`src/api/types.ts` et modules générés).
- **Pattern obligatoire** : `@tanstack/vue-query` dans
  `src/features/<domaine>/composables/` (symétrique des composables auth)
  — jamais d'appel `http.*` inline dans le `<script setup>` d'une vue.
- Erreurs via `ApiError` (code/status/details/fieldErrors), jamais un
  catch brut sur l'AxiosError.
- Pagination : si le backend renvoie `meta` (page/per_page...), l'afficher
  — pas de "load more" improvisé.

## Ordre recommandé (par contrat disponible)

### A. AdminCandidatures — contrat déjà en place, première cible

Endpoint backend exact (`PADCI-API/app/Modules/Admissions/Routes/api.php`,
middleware `can:admissions.view` / `can:admissions.manage`) :

- `GET /v1/admin/applications` — liste de la file
- `GET /v1/admin/applications/{application}` — détail
- `POST /v1/admin/applications/{application}/start-review`
- `POST /v1/admin/applications/{application}/decide`

- [ ] Lire `ApplicationResource.php` (champs exposés) et
  `DecideApplicationRequest.php` (payload decide) avant de coder.
- [ ] Composable `src/features/admin/composables/useApplications.ts`
  (query index + mutations review/decide).
- [ ] Brancher la liste (l.274 remplacée), pages/états de chargement /
  erreur / vide via vue-query.
- [ ] Vérifier manuellement avec un compte admin réel : actions
  start-review + decide visibles dans `padci_app` (log SQL / réponse).

### B. AdminCohortes + AdminDashboard

- Module backend : `PADCI-API/app/Modules/Cohort/Routes/api.php` — lire les
  routes réelles et porter les champs des Resources.
- [ ] Brancher cohortes sur le contrat.
- [ ] Brancher dashboard admin (l.255) : décider avec le mainteneur si le
  tableau `recentCandidats` devient la liste candidates paginée réelle.

### C. Profil / paramètres apprenant

Contrat existant (module Identity) :

- `GET /v1/profile`, `PATCH /v1/profile`,
  `PUT /v1/profile/password` (`ProfileController::changePassword`,
  request `ChangePasswordRequest.php`).
- [ ] `ProfilApprenants.vue` : lecture sur `GET /v1/profile`.
- [ ] `ParametresApprenant.vue` : changement de mot de passe branché
  (`password`, `current_password` — vérifier les champs exacts dans
  `ChangePasswordRequest.php`, ne pas deviner) + MFA, via les endpoints
  déjà branchés côté composables (`useMfaSetup`).

### D. Dashboard apprenant / learning

- Le catalogue réel est servi par le module Catalog
  (`PADCI-API/app/Modules/Catalog/Routes/api.php` : `GET /v1/catalog/pathways`,
  `GET /v1/catalog/pathways/{key}`, `GET /v1/catalog/courses`).
  **Correction du 2026-11-09** : contrairement à ce que cette section
  disait, les pages chapitre (Chapitre2…7, network/*) **ont bien un
  équivalent backend réel** — module Learning, déjà testé de bout en
  bout : `GET /v1/learning/courses/{course}` (outline générique, modules
  → chapitres, verrouillage, progression), `GET
  /v1/learning/courses/{course}/chapters/{chapter}` (contenu),
  `PUT .../progress`. Ce n'est pas "à attendre", c'est à brancher — plan
  détaillé (y compris la suppression des fichiers chapitre codés en dur
  et du dashboard figé) dans
  `05-onboarding-catalog-and-learning-flow.md` section "Layout : un seul,
  dynamique". Ne pas refaire ce travail ici, le fichier 05 est la
  référence pour tout ce domaine (candidature, session, apprentissage).
- [x] Décision enregistrée — voir 05, plus de blocage sur ce point.

### E. SuperAdmin — utilisateurs & dashboard

- [ ] `SuperAdminUtilisateurs.vue` : endpoint réel existant —
  `GET /v1/admin/users`, `GET /v1/admin/users/{user}`,
  `PATCH /v1/admin/users/{user}` (`PADCI-API/app/Modules/Identity/Http/Controllers/Admin/UserController.php`,
  `UpdateUserRequest.php`) ; permission `users.view`/`users.manage`. Lire
  `UserResource.php` pour les champs exposés avant de coder le tableau.
- [ ] `SuperAdminDashboard.vue` (graphiques l.102-122) : endpoints réels
  existants — `GET /v1/admin/dashboard/overview`,
  `GET /v1/admin/dashboard/reports/cohorts`,
  `GET /v1/admin/dashboard/reports/pathways`
  (`PADCI-API/app/Modules/Operations/Http/Controllers/Admin/DashboardController.php`,
  permission `reports.view`). Le budget/décaissements de cette page
  **n'en font pas partie** — voir section F, module Finance séparé.

### F. SuperAdmin — budget, décaissements et ANO (module Finance, contrat réel)

`SuperAdminFinance.vue` et `SuperAdminAno.vue` modélisent la gouvernance
programme (bailleur Banque Mondiale), **pas** le paiement d'une formation
par un apprenant (ADR-010, celui-ci reste différé — fournisseur de
paiement non choisi). Le module backend `Finance` pour le budget/ANO
existe et est **vérifié de bout en bout en HTTP réel** (session du
2026-11-08) : décaissement refusé sans ANO signée (422), signature
réservée à `super_admin` (403 pour un simple `admin`), paiement accepté
après signature (200), `consumed_amount_minor` recalculé juste. ADR de
référence : `ADR-011` (pas `ADR-007`, qui n'a aucun rapport).

Endpoints (`PADCI-API/app/Modules/Finance/Routes/governance.php`) :

- ANO : `GET/POST /v1/admin/ano-requests`,
  `GET /v1/admin/ano-requests/{anoRequest}`,
  `POST .../{anoRequest}/sign` (`ano.sign`, **super_admin seul**),
  `POST .../{anoRequest}/reject` (`{reason}`).
- Budget : `GET/POST /v1/admin/budget-lines`,
  `GET /v1/admin/budget-lines/{budgetLine}` (inclut
  `consumed_amount_minor`, calculé, jamais stocké).
- Décaissements : `GET/POST /v1/admin/disbursement-requests`,
  `GET .../{disbursementRequest}`, `POST .../{disbursementRequest}/mark-paid`,
  `POST .../{disbursementRequest}/reject` (`{reason}`).

Permissions : `finance.view`/`finance.manage` (admin+super_admin),
`ano.manage` (admin+super_admin, soumettre), `ano.sign` (**super_admin
seul** — vérifié en HTTP réel qu'un admin reçoit 403).

- [ ] Lire `AnoRequestResource.php`, `BudgetLineResource.php`,
  `DisbursementRequestResource.php` (champs exacts exposés) avant de coder.
- [ ] Composables `src/features/superadmin/composables/{useAnoRequests,useBudgetLines,useDisbursements}.ts`.
- [ ] Brancher `SuperAdminAno.vue` : liste réelle, action "Signer"
  uniquement visible/activée si l'utilisateur connecté a le rôle
  `super_admin` (vérifier `auth.hasRole('super_admin')`, le serveur reste
  autoritaire de toute façon).
- [ ] Brancher `SuperAdminFinance.vue` : lignes de budget réelles
  (remplacer "128.6 M €"), tableau de décaissements réel, action "Valider
  le paiement" qui appelle `mark-paid` — **doit échouer proprement** (422,
  message backend affiché) si l'ANO liée n'est pas signée ; ne pas
  masquer ou contourner cette erreur côté UI.
- [ ] Test manuel réel : soumettre une ANO, tenter `mark-paid` avant
  signature (doit échouer dans l'UI avec le message backend), signer avec
  un compte `super_admin`, retenter `mark-paid` (doit réussir).

## Validation avant chaque case cochée

- [ ] `npx vue-tsc --build --force` et `npm run build` passent.
- [ ] Test manuel réel contre le backend dockerisé (`docker ps` →
  `padci_app`) : les données affichées proviennent de la réponse HTTP
  réelle (vérifier dans l'onglet Réseau), modifier une donnée côté backend
  (seed ou dev DB) et voir la modification au refresh.
- [ ] Aucune vue n'appelle `http` directement inline (revue du diff).
- [ ] Commit : quels endpoints, quels fichiers, quelle page de contrat.

## Rappel

Toute vue qui trahit le contrat (champ deviné, fallback silencieux) est un
bug, pas un raccourci. Si un endpoint manque au backend, ne pas le
reconstituer côté frontend : l'ouvrir dans `04-structure-cleanup.md`.
