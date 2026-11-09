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
- [ ] **Mettre à jour le README de ce dossier** : les 4 fichiers cités
  (reconstruits et re-vérifiés dans le code le 2026-11-09) ; le cocher une
  fois les 4 fichiers relu pour confirmer que leur contenu correspond
  bien à la description du README.

### Duplications et pages orphelines (traçable dans `src/router/index.ts`)

- [ ] **TODO(learning) l.77-80** : `/formation`, `/education-routiere`,
  `/cours` sont des pages autonomes hors layout, sans sidebar. Décision :
  où les ranger (feature `public` / catalogue) et quel contenu.
- [ ] **TODO(learning) l.118-122** : `/formations/network` est un cours
  unique en dur ("réseau"/CCNA) entre le dashboard générique `/formations`
  et le dashboard spécifique `NetworkDashboard.vue`. Décision de produit :
  transformer en données pilotées par le catalogue (module Catalog) ou
  retirer les deux pages en double.
- [ ] **TODO(roles) l.174-176** : le backend a 5 rôles, le frontend en
  couvre 3 (`apprenant`, `admin`, `super_admin`) — `formateur` et
  `moderateur` n'ont aucune route. Décision : à construire ou à écarter du
  périmètre (consigner l'un des deux).

### Décisions de flux (bloquent les tâches des autres fichiers)

- [ ] **Formulaire d'inscription en deux flux** (bloque la fin du 01) :
  le contrat `POST /v1/auth/register` ne couvre que nom/email/mot de
  passe ; le dossier complet (documents, formation, équipement) appartient
  à `POST /v1/applications` — qui exige un compte connecté. Trancher :
  - Option A : inscription en 2 temps (compte puis dossier une fois
    connecté) — la seule compatible avec les contrats actuels.
  - Option B : modifier le backend (endpoint public d'application) —
    exige un brief contract-first et une revue.
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
- [ ] **Pages learning sans backend** (`Exercices.vue`,
  `Evaluations.vue`, chapitres, TPs, examen) : statiques vs attendre le
  module Learning. Le module Assessment existe (`app/Modules/Assessment/`)
  — vérifier s'il expose déjà évaluations/quiz avant de figer la décision.


## Ce que cet agent ne doit PAS faire depuis ce fichier

- Implémenter des paiements, un ledger, du RBAC ou des entitlements sans
  ADR approuvé + revue humaine (règle `AGENTS.md`).
- Choisir unilatéralement une des options de cette liste — chaque case
  cochée ici requiert une décision consignée (checkbox cochée = décision
  écrite, pas code).
