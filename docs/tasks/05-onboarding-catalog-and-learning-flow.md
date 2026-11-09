# 05 — Flow optimisé : inscription → catalogue → candidature → apprentissage

> Décision prise (2026-11-09, voir `PADCI-API/docs/architecture/adr/ADR-012-cohort-selection-and-equipment.md`,
> commit `75e935a` sur `develop`) : le backend a été étendu plutôt que
> contourné côté frontend. Ce fichier est maintenant une checklist comme
> les fichiers 01-04 — à donner à un agent pour implémenter le frontend.

## Pourquoi le flow actuel à 5 étapes n'est pas optimal

`src/features/auth/views/Inscription.vue` (727 lignes) collecte en une
seule séquence anonyme : identité civile (nom, prénom, genre, nationalité,
NNI, téléphone, date de naissance, adresse), diplôme + fichier, choix de
formation, configuration ordinateur + photo, récapitulatif. **Il n'y a
aucun champ mot de passe.** `submitForm()` (l.703) fait `console.log(form)`
puis affiche une fausse modale de succès — rien n'est jamais envoyé au
backend.

Trois problèmes de fond, pas de détail :

1. **Deux contrats backend différents, tassés en un seul formulaire.**
   `POST /v1/auth/register` (créer un compte) ne veut que nom/email/mot de
   passe. `POST /v1/applications` (candidater, module Admissions) veut
   `pathway_key` + `motivation` + `payload` libre — et **exige déjà un
   compte connecté**. Le formulaire actuel ne peut réussir ni l'un ni
   l'autre tel qu'il est écrit.
2. **Aucun visiteur ne voit le catalogue avant de s'engager.** Un flow
   moderne (Coursera, Udemy, OpenClassrooms) montre le catalogue et ses
   sessions **avant** de demander un compte — ça motive l'inscription.
   Ici, c'est l'inverse : formulaire de 5 étapes d'abord, aucune formation
   visible avant.
3. **Chaque étape répète l'intégralité de la mise en page** (bulles
   décoratives, dégradé, logo) — pas de notion d'étape réellement légère ;
   5 écrans lourds au lieu d'un parcours court.

## Ce qui a changé côté backend (ADR-012) — à utiliser tel quel

Le candidat **voit et choisit sa session** à la candidature — ni "flow à
l'aveugle" (option A envisagée initialement), ni visibilité sans choix
(option B envisagée initialement) : le backend a été étendu pour que ça
marche vraiment, exactement comme le tableau d'exemple le montrait (une
seule session "Disponible" à la fois parmi plusieurs déjà planifiées).

- `GET /v1/catalog/pathways/{key}/cohorts` (public, nouveau) — sessions
  d'une filière, triées par date de début :
  `{id, key, code, name, session, starts_at, ends_at, available}`.
  `available` est calculé côté backend (`CohortAvailability`) ; ne jamais
  le recalculer côté front à partir du statut brut.
- `POST /v1/applications` prend maintenant `cohort_key` en plus de
  `pathway_key` (requis) : `{pathway_key, cohort_key, motivation, payload}`.
  Le backend refuse si la cohorte n'appartient pas à la filière, ou si
  elle n'est plus `available` (code erreur `cohort_closed` /
  `cohort_outside_pathway`, voir `lang/fr/admissions.php`).
- `GET /v1/applications` et `GET /v1/applications/{key}` renvoient maintenant
  un objet `cohort` (code, dates) en plus de `pathway`.
- `GET /v1/catalog/pathways/{key}` renvoie maintenant `equipment_requirements`
  (`{min_cpu, min_ram_gb, min_storage_gb, notes}`) — c'est la donnée
  réelle à afficher à la place du texte codé en dur "Configuration
  minimale requise : Core i5 · 8 Go de RAM · 256 Go" de l'étape 4
  actuelle.
- Les 5 filières réelles (Cyber Sécurité, Data Analyst, IT Support,
  Network Specialist, Artificial Intelligence) sont seedées avec leur
  session (`database/seeders/CatalogSeeder.php`, tourne dans tous les
  environnements) — données déjà en base dès que le backend est
  migré/seedé, rien à inventer côté front pour tester.

## Flow proposé

```
1. Visiteur anonyme
   └─ Catalogue public (filières, formations) — PEUT ÊTRE VU SANS COMPTE
        GET /v1/catalog/pathways, GET /v1/catalog/pathways/{key}, GET /v1/catalog/courses

2. Création de compte (court — voir 01-auth-flow-completion.md, ne pas redévelopper)
   nom + email + mot de passe → vérification email → connexion

3. Choix de la session (apprenant connecté, sur la filière choisie en étape 1)
   Liste des sessions de la filière avec dates et disponibilité — une
   seule cliquable ("Disponible"), les autres affichées mais désactivées
   ("Indisponible — ouverture à venir").
        GET /v1/catalog/pathways/{key}/cohorts

4. Candidature (sur la session choisie)
   Formulaire COURT : motivation (texte libre) + bloc "équipement"
   (possède un ordinateur ? processeur/RAM/stockage + photo), comparé à
   `equipment_requirements` de la filière, sérialisé dans `payload`.
   **Décision (2026-11-09) : les champs identité civile (genre,
   nationalité, NNI, adresse) et documents (pièce d'identité, diplôme)
   des étapes 1-2 actuelles sont supprimés**, pas repris dans la
   candidature — aucune règle du backend (policy, workflow de décision)
   ne les lit aujourd'hui ; les garder alourdirait le formulaire sans
   utilité vérifiée. Réversible : si un besoin réel apparaît, on rajoute
   un bloc `payload.credentials` + upload Media, même traitement que
   l'équipement, pas une refonte.
        POST /v1/applications { pathway_key, cohort_key, motivation, payload }

5. Suivi de candidature (apprenant)
   Page "Mes candidatures" : statut en temps réel (soumise / en revue /
   acceptée / liste d'attente / rejetée). Notification déjà existante
   côté backend sur la décision (ApplicationDecided, module Communication)
   — vérifier si un canal in-app (pas seulement email) est voulu.
        GET /v1/applications, GET /v1/applications/{key}

6. Affectation (admin, hors scope frontend apprenant)
   Déjà existant : POST /v1/admin/enrollments après décision positive —
   l'admin y retrouve la session déjà choisie par le candidat sur sa
   candidature (`application.cohort`), il n'a plus à la redeviner.

7. Apprentissage (apprenant, dès qu'un Enrollment existe)
   Dashboard listant les formations réellement suivies (pas une formation
   figée en dur) → vue d'ensemble d'UNE formation (outline, progression,
   reprise) → lecture d'UN chapitre (contenu, ressources, progression
   enregistrée au fil de la lecture).
        GET /v1/learning/courses/{course}
        GET /v1/learning/courses/{course}/chapters/{chapter}
        PUT /v1/learning/courses/{course}/chapters/{chapter}/progress
```

## Layout : un seul, dynamique — pas un par catégorie

Confirmé en lisant le code : `src/features/learning/layouts/
DefaultLayoutNetworkSpecialist.vue` + `SidebarNetworkSpecialist.vue`
dupliquent presque entièrement `DefaultLayout.vue` + `Sidebar.vue`, pour
**une seule formation** ("réseau"/CCNA) codée en dur. Répliquer ce
pattern pour Cyber Sécurité, Data Analyst, IT Support, Artificial
Intelligence donnerait 5 paires layout+sidebar quasi identiques à
maintenir en parallèle — c'est l'inverse de ce qu'il faut faire.

**La bonne nouvelle, déjà vérifiée** : `GET /v1/learning/courses/{course}`
renvoie déjà la structure complète et réelle d'une formation —
`CourseOutlineResource.php` : modules → chapitres, avec `locked`,
`progress`, `resume`. C'est générique par construction, peu importe la
formation. Il n'y a donc aucune raison de coder un chapitre par fichier
Vue : **un seul composant `ChapterViewer.vue` affichant le contenu reçu de
l'API**, pour n'importe quelle formation.

- [x] Un seul `LearnerLayout.vue` (fusion/renommage de `DefaultLayout.vue`),
      dont la sidebar se construit depuis l'outline de la formation
      actuellement ouverte (`GET /v1/learning/courses/{course}` — modules et
      chapitres réels), pas depuis une liste de routes codées en dur.
- [x] Supprimer `DefaultLayoutNetworkSpecialist.vue`,
      `SidebarNetworkSpecialist.vue`, et tous les fichiers
      `Chapitre2.vue`…`Chapitre7.vue`, `NetworkChapitre1.vue`…`NetworkChapitre6.vue`,
      `NetworkDashboard.vue`, `NetworkTp.vue`, `NetworkExamen.vue`,
      `Introduction.vue`, `Annexes.vue` (17 fichiers), remplacés par :
  - `src/features/learning/views/CourseOverview.vue` (route
    `/formations/:courseKey`) — appelle `GET /v1/learning/courses/{course}`.
  - `src/features/learning/views/ChapterViewer.vue` (route
    `/formations/:courseKey/chapitres/:chapterKey`) — appelle
    `GET /v1/learning/courses/{course}/chapters/{chapter}`, envoie la
    progression (`PUT .../progress`) au fil de la lecture/lecture vidéo.
  - `src/features/learning/views/LearnerDashboard.vue` (remplace
    l'actuel `Dashboard.vue` figé) — liste les formations réellement
    suivies par l'apprenant (`GET /v1/enrollments` → une carte par
    formation active, avec reprise).
- [x] `Exercices.vue` / `Evaluations.vue` : dissociés du flow principal de cours
      (géré via l'outline dynamique du cours `ChapterViewer`).

## Candidature — ce qui remplace le contenu actuel d'`Inscription.vue`

`Inscription.vue` garde sa route (l'écran "s'inscrire") mais son contenu
est remplacé par le compte court du 01 (`useRegister.ts` — nom, email,
mot de passe) ; ses 727 lignes actuelles (identité civile, documents,
formation, ordinateur, récapitulatif) disparaissent de ce fichier.

- [x] `Inscription.vue` ne garde que l'étape compte (01) ; aucun des
      champs candidature (filière, session, équipement, documents) n'y reste.
- [x] Nouvelle vue `src/features/admissions/views/CandidatureView.vue`,
      sur la filière + session déjà choisies (étapes 3-4 du flow proposé) :
      motivation + bloc équipement + écran de relecture avant envoi. 3 étapes
      courtes, pas 5.
- [x] Supprimer du formulaire (pas de champ caché, pas de `v-if="false"`,
      suppression réelle) : genre, nationalité, NNI, téléphone, date de
      naissance, adresse, diplôme + type de diplôme, upload pièce d'identité,
      upload diplôme — décision actée ci-dessus, aucune règle backend ne les
      lit.
- [x] `useSubmitApplication.ts` (`src/features/admissions/composables/useLearnerApplications.ts`)
      — `POST /v1/applications`, erreurs `cohort_closed` / `cohort_outside_pathway` / `duplicate`
      affichées explicitement (`ApiError`), pas un message générique.
- [x] Vue `src/features/admissions/views/MesCandidaturesView.vue` : suivi en
      temps réel des candidatures déposées, avec possibilité de retrait.

## Configuration de l'ordinateur — où ça va

Le champ existe déjà dans le formulaire actuel (étape 4 : "Processeur /
RAM / stockage + photo"). Il correspond exactement au commentaire du
champ `payload` de `StoreApplicationRequest`
(`PADCI-API/app/Modules/Admissions/Http/Requests/StoreApplicationRequest.php`) :
_"Free-form context (equipment, availability, prerequisites...)"_. Pas
besoin d'un champ backend dédié pour ce que le candidat déclare — mais le
**minimum requis à afficher** n'est plus un texte codé en dur : il vient
de `pathway.equipment_requirements` (ADR-012, déjà seedé à
`{min_cpu: "Core i5", min_ram_gb: 8, min_storage_gb: 256}` pour les 5
filières).

- [x] Afficher le minimum requis depuis `pathway.equipment_requirements`
      (étape "configuration minimale requise"), pas en dur dans le template.
- [x] Structurer `payload` proprement :
  ```json
  {
    "equipment": {
      "has_computer": true,
      "cpu": "Core i5",
      "ram_gb": 8,
      "storage_gb": 256
    }
  }
  ```

## UI/UX — repères "LMS moderne"

- **Catalogue** : grille de cartes (une par filière), pas un tableau brut
  — image/icône, nom, nombre de formations (`courses_count` déjà exposé
  par `PathwayResource`). Composants shadcn déjà installés : `Card`, `Badge`.
- **Fiche filière** : description, liste des formations publiées de la
  filière (`GET /v1/catalog/courses?pathway_key=...`), **liste des sessions**
  (`GET /v1/catalog/pathways/{key}/cohorts`) avec un badge `Badge` par
  session (`available` → vert "Disponible", sinon gris "Indisponible" +
  date d'ouverture si connue), CTA "Candidater" actif seulement sur une
  session `available` (redirige vers connexion si non connecté, avec
  retour automatique — pattern déjà en place dans `router/index.ts`,
  `query.redirect`).
- **Suivi de candidature** : statut visuel clair (`Badge` shadcn,
  couleur par statut), pas un texte brut.
- **Dashboard apprenant** : cartes "formation en cours" avec barre de
  progression réelle (déjà calculée côté `CourseOutlineResource.resume`),
  pas des pourcentages inventés.
- **Lecteur de chapitre** : sommaire (sidebar) qui reflète l'outline
  réel, indicateur verrouillé/terminé par chapitre, bouton "chapitre
  suivant" qui avance dans l'outline réel plutôt qu'un lien figé vers le
  nom du fichier suivant.

## Ce qui reste ouvert (à trancher avec le mainteneur, pas à deviner)

- [ ] Notification in-app (pas seulement email) sur décision de
      candidature — existe déjà côté événements backend
      (`ApplicationDecided`), pas encore de canal in-app frontend.

## Validation avant de cocher quoi que ce soit

- [x] `npx vue-tsc --build --force` et `npm run build` passent.
- [x] Backend à jour : `develop` (commit `75e935a` ou plus récent),
      migré (`php artisan migrate`) et seedé (`php artisan db:seed` —
      idempotent, inclut `CatalogSeeder`).
- [x] Parcours complet validé en tests Playwright E2E réels contre `padci_app`
      (`e2e/onboarding-learning-flow.spec.ts`, 11 tests sur toute la suite au vert) :
      catalogue public → sélection session disponible → candidature 3 étapes →
      suivi candidatures → dashboard apprenant dynamique branché sur enrollments
      et lecture de chapitre avec enregistrement de progression.
