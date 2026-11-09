# 04 — Structure : décisions produit en attente

> Cette liste accumule les points où le code contient la trace d'un choix
> non tranché (TODO, doublon, page orpheline, dépendance morte). Chaque
> point exige l'arbitrage du mainteneur — l'agent ne tranche pas
> silencieusement. Deux entrées sont toutefois des corrections triviales
> qui peuvent partir immédiatement.

## Constat (re-vérifié le 2026-11-09)

### Corrections triviales (petits commits directs)

- [ ] **Bug de lien `to="/Formation"`** : `src/features/auth/views/NouvelleDemande.vue` l.51 pointe vers `/Formation` (majuscule) ; la route déclarée est `/formation` (`src/router/index.ts` l.92). Sous Linux le matching échoue → 404. Corriger puis vérifier le clic manuellement (`npm run dev`).
- [ ] **Store `counter.ts` mort** : `src/stores/counter.ts` est le template Pinia du starter, non utilisé (grep vérifié). Suppression directe.
- [x] **Mettre à jour le README de ce dossier** : les 5 fichiers (01-05)
  sont décrits et à jour (README mis à jour le 2026-11-09 avec l'ajout du
  05 et sa décision).

### Duplications et pages orphelines (traçable dans `src/router/index.ts`)

- [ ] **TODO(learning) l.77-80** : `/formation`, `/education-routiere`,
  `/cours` sont des pages autonomes hors layout, sans sidebar. Décision :
  où les ranger (feature `public` / catalogue) et quel contenu.
- [x] ~~TODO(learning) l.118-122~~ — **tranché le 2026-11-09**, voir
  `05-onboarding-catalog-and-learning-flow.md` section "Layout : un seul,
  dynamique" : `/formations/network` et `NetworkSpecialistLayout`/
  `SidebarNetworkSpecialist.vue` sont retirés, remplacés par un layout
  apprenant unique piloté par `GET /v1/learning/courses/{course}`
  (générique, déjà réel côté backend) — pas un layout par filière.
- [ ] **TODO(roles) l.174-176** : le backend a 5 rôles, le frontend en
  couvre 3 (`apprenant`, `admin`, `super_admin`) — `formateur` et
  `moderateur` n'ont aucune route. Décision : à construire ou à écarter du
  périmètre (consigner l'un des deux).

### Décisions de flux (bloquent les tâches des autres fichiers)

- [x] ~~Formulaire d'inscription en deux flux~~ — **tranché le
  2026-11-09**, voir `05-onboarding-catalog-and-learning-flow.md` et
  `PADCI-API/docs/architecture/adr/ADR-012-cohort-selection-and-equipment.md`
  (commit `75e935a`). Inscription en 2 temps (compte court, puis
  candidature sur filière + **session choisie**) ; le backend a été
  étendu (le candidat choisit sa session, plus une liste à l'aveugle).
  Les champs identité civile/documents de l'ancien formulaire sont
  supprimés, pas repris dans la candidature (aucune règle backend ne les
  lit).
- [ ] **Chemin des emails liés au compte** (bloque le 01, cf. détail dans
  01 §4) : `reset-password` vs `/reinitialiser-mot-de-passe` et
  `/connexion` vs `/`. Unifier côté backend (`app.frontend_url` + chemins
  construits) ou côté routes SPA.
- [x] ~~Page SuperAdminFinance sans backend~~ — **correction du
  2026-11-09** : faux, à ne pas suivre. Le module `Finance` backend existe
  et est testé (budget/décaissements/ANO, `ADR-011` — pas `ADR-007`, qui
  concerne le pivot LMS/marketplace, sans rapport). `SuperAdminFinance.vue`
  et `SuperAdminAno.vue` ont un vrai contrat à brancher — déplacé en tâche
  concrète dans `03-hardcoded-content-and-fake-flows.md` section F. Ce qui
  reste différé (ADR-010, sans fournisseur branché) est le **paiement
  client** des formations, pas le budget/ANO programme — ne pas confondre
  les deux.
- [x] ~~Pages learning sans backend~~ (`Exercices.vue`, `Evaluations.vue`,
  chapitres, TPs, examen) — **tranché le 2026-11-09**, voir
  `05-onboarding-catalog-and-learning-flow.md` : le module Learning
  (chapitres/progression) et le module Assessment (évaluations) existent
  et sont réels, déjà testés côté backend. Ce n'était pas "à attendre",
  c'est à brancher — plan détaillé dans le 05, pas de nouvelle décision
  produit à prendre ici.


## Ce que cet agent ne doit PAS faire depuis ce fichier

- Implémenter des paiements, un ledger, du RBAC ou des entitlements sans
  ADR approuvé + revue humaine (règle `AGENTS.md`).
- Choisir unilatéralement une des options de cette liste — chaque case
  cochée ici requiert une décision consignée (checkbox cochée = décision
  écrite, pas code).
