# 05 — Flow optimisé : inscription → catalogue → candidature → apprentissage

> Document de proposition. **Ne pas implémenter avant validation du
> mainteneur** — section "Décision requise" en premier, elle bloque tout
> le reste. Une fois validé, ce fichier devient une checklist comme les
> fichiers 01-04.

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
   `POST /auth/register` (créer un compte) ne veut que nom/email/mot de
   passe. `POST /applications` (candidater, module Admissions) veut
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

## Décision requise avant toute implémentation

**Il n'existe aujourd'hui aucun endpoint public ou apprenant pour lister
les cohortes (sessions) d'une filière avec leurs dates et leur
disponibilité.** Vérifié dans
`PADCI-API/app/Modules/Cohort/Routes/api.php` : la seule route de liste
(`GET /admin/cohorts`) est derrière `can:cohorts.view` (admin/super_admin).
Le tableau donné en exemple —

```
Cyber Sécurité    1    01/04/2026    30/06/2026    Disponible
Data Analyst      2    15/07/2026    30/09/2026    Indisponible
...
```

— correspond exactement aux colonnes du modèle `Cohort`
(`pathway`, `code`, `starts_at`, `ends_at`, `status` — voir
`PADCI-API/app/Modules/Cohort/Models/Cohort.php`,
`CohortResource.php`), mais **ce modèle n'est visible par personne
d'autre qu'un admin aujourd'hui.** De plus, `EnrollmentWorkflow::enroll()`
(`PADCI-API/app/Modules/Cohort/Services/EnrollmentWorkflow.php`) n'est
appelé que depuis `POST /admin/enrollments` — **le candidat ne
s'inscrit jamais lui-même à une cohorte**, c'est toujours un admin qui le
fait après avoir accepté sa candidature. C'est cohérent avec le
positionnement "centre de formation" du SRS (pas une marketplace en
self-service), mais ça contredit "l'apprenant choisit sa session".

Deux options, à trancher avant de continuer — **aucune des deux ne doit
être choisie silencieusement par l'agent qui implémente** :

- **Option A — rester fidèle au backend actuel.** Le candidat voit la
  filière et son descriptif (catalogue public, existant), candidate sans
  voir ni choisir de session précise. Une fois sa candidature acceptée,
  **un admin l'affecte à une cohorte** (déjà possible aujourd'hui, aucun
  endpoint à ajouter) ; le candidat découvre sa session (dates) seulement
  à ce moment, via `GET /enrollments`. C'est l'option "zéro travail
  backend".
- **Option B — ajouter la visibilité des sessions.** Nouvel endpoint
  public (ou apprenant-connecté) qui expose les cohortes d'une filière
  avec disponibilité calculée (`status.acceptsEnrollments() &&
  enrollments_count < capacity`), **sans** permettre au candidat de choisir
  laquelle — l'affectation reste admin. Exige un brief backend
  contract-first (nouveau endpoint, nouvelle Resource publique qui ne
  fuite pas les champs admin de `Cohort`) + revue, avant tout travail
  frontend sur cet écran précis.

La suite de ce document est écrite pour fonctionner avec les **deux**
options (le tableau de sessions est optionnel/affiché "si disponible" en
option A, affiché systématiquement en option B) — mais la case à cocher
"afficher les sessions" ne doit être commencée qu'après ce choix.

## Flow proposé

```
1. Visiteur anonyme
   └─ Catalogue public (filières, formations) — PEUT ÊTRE VU SANS COMPTE
        GET /catalog/pathways, GET /catalog/pathways/{key}, GET /catalog/courses

2. Création de compte (court — voir 01-auth-flow-completion.md, ne pas redévelopper)
   nom + email + mot de passe → vérification email → connexion

3. Candidature (apprenant connecté, sur la filière choisie en étape 1)
   Formulaire COURT : motivation (texte libre) + bloc "équipement"
   (possède un ordinateur ? processeur/RAM/stockage + photo) sérialisé
   dans `payload`. PAS de diplôme/pièce d'identité tant que le besoin
   métier réel n'est pas reconfirmé (voir "Ce qui reste ouvert" plus bas).
        POST /applications { pathway_key, motivation, payload }

4. Suivi de candidature (apprenant)
   Page "Mes candidatures" : statut en temps réel (soumise / en revue /
   acceptée / liste d'attente / rejetée). Notification déjà existante
   côté backend sur la décision (ApplicationDecided, module Communication)
   — vérifier si un canal in-app (pas seulement email) est voulu.
        GET /applications, GET /applications/{key}

5. Affectation (admin, hors scope frontend apprenant)
   Déjà existant : POST /admin/enrollments après décision positive.

6. Apprentissage (apprenant, dès qu'un Enrollment existe)
   Dashboard listant les formations réellement suivies (pas une formation
   figée en dur) → vue d'ensemble d'UNE formation (outline, progression,
   reprise) → lecture d'UN chapitre (contenu, ressources, progression
   enregistrée au fil de la lecture).
        GET /learning/courses/{course}
        GET /learning/courses/{course}/chapters/{chapter}
        PUT /learning/courses/{course}/chapters/{chapter}/progress
```

## Layout : un seul, dynamique — pas un par catégorie

Confirmé en lisant le code : `src/features/learning/layouts/
DefaultLayoutNetworkSpecialist.vue` + `SidebarNetworkSpecialist.vue`
dupliquent presque entièrement `DefaultLayout.vue` + `Sidebar.vue`, pour
**une seule formation** ("réseau"/CCNA) codée en dur. Répliquer ce
pattern pour Cyber Sécurité, Data Analyst, IT Support, Artificial
Intelligence donnerait 5 paires layout+sidebar quasi identiques à
maintenir en parallèle — c'est l'inverse de ce qu'il faut faire.

**La bonne nouvelle, déjà vérifiée** : `GET /learning/courses/{course}`
renvoie déjà la structure complète et réelle d'une formation —
`CourseOutlineResource.php` : modules → chapitres, avec `locked`,
`progress`, `resume`. C'est générique par construction, peu importe la
formation. Il n'y a donc aucune raison de coder un chapitre par fichier
Vue : **un seul composant `ChapterViewer.vue` affichant le contenu reçu de
l'API**, pour n'importe quelle formation.

- [ ] Un seul `LearnerLayout.vue` (fusion/renommage de `DefaultLayout.vue`),
  dont la sidebar se construit depuis l'outline de la formation
  actuellement ouverte (`GET /learning/courses/{course}` — modules et
  chapitres réels), pas depuis une liste de routes codées en dur.
- [ ] Supprimer `DefaultLayoutNetworkSpecialist.vue`,
  `SidebarNetworkSpecialist.vue`, et tous les fichiers
  `Chapitre2.vue`…`Chapitre7.vue`, `NetworkChapitre1.vue`…`NetworkChapitre6.vue`,
  `NetworkDashboard.vue`, `NetworkTp.vue`, `NetworkExamen.vue`,
  `Introduction.vue`, `Annexes.vue` (17 fichiers), remplacés par :
  - `src/features/learning/views/CourseOverview.vue` (route
    `/formations/:courseKey`) — appelle `GET /learning/courses/{course}`.
  - `src/features/learning/views/ChapterViewer.vue` (route
    `/formations/:courseKey/chapitres/:chapterKey`) — appelle
    `GET /learning/courses/{course}/chapters/{chapter}`, envoie la
    progression (`PUT .../progress`) au fil de la lecture/lecture vidéo.
  - `src/features/learning/views/LearnerDashboard.vue` (remplace
    l'actuel `Dashboard.vue` figé) — liste les formations réellement
    suivies par l'apprenant (`GET /enrollments` → une carte par
    formation active, avec reprise).
- [ ] `Exercices.vue` / `Evaluations.vue` : à rattacher au module
  Assessment réel (`GET /learning/courses/{course}/assessments`,
  `POST .../attempts`…) **une fois** la question du contenu "réseau" en
  dur tranchée dans `04-structure-cleanup.md` — ne pas les dupliquer par
  formation non plus.

## Configuration de l'ordinateur — où ça va

Le champ existe déjà dans le formulaire actuel (étape 4 : "Processeur /
RAM / stockage + photo"). Il correspond exactement au commentaire du
champ `payload` de `StoreApplicationRequest`
(`PADCI-API/app/Modules/Admissions/Http/Requests/StoreApplicationRequest.php`) :
*"Free-form context (equipment, availability, prerequisites...)"*. Pas
besoin d'un champ backend dédié — **c'est déjà prévu pour ça**.

- [ ] La photo de l'ordinateur passe par le module Media existant
  (`POST /media`, puis référencer la `key` retournée dans `payload`) —
  jamais un fichier encodé en base64 dans le JSON de la candidature.
- [ ] Structurer `payload` proprement, ex. :
  ```json
  {
    "equipment": {
      "has_computer": true,
      "cpu": "Core i5",
      "ram_gb": 8,
      "storage_gb": 256,
      "evidence_media_key": "med_01..."
    }
  }
  ```
  Documenter cette structure dans le commit — c'est un contrat de fait
  entre le front et quiconque lira ces candidatures côté admin.

## UI/UX — repères "LMS moderne"

- **Catalogue** : grille de cartes (une par filière), pas un tableau brut
  — image/icône, nom, nombre de formations (`pathways_count` déjà exposé
  par `PathwayResource`), badge de statut si option B retenue. Composants
  shadcn déjà installés : `Card`, `Badge`.
- **Fiche filière** : description, liste des formations publiées de la
  filière (`GET /catalog/courses?pathway_key=...`), CTA "Candidater"
  (redirige vers connexion si non connecté, avec retour automatique —
  pattern déjà en place dans `router/index.ts`, `query.redirect`).
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

- [ ] Le dossier de candidature a-t-il encore besoin du diplôme et de la
  pièce d'identité (champs actuels de l'étape 1-2) ? Si oui, même
  traitement que l'équipement : upload via Media, référence dans
  `payload` — pas de nouveau champ backend sans brief.
- [ ] Une candidature vise-t-elle une filière (comme aujourd'hui,
  `pathway_key`) ou une formation précise (`course`) ? Le contrat actuel
  ne prend que `pathway_key`.
- [ ] Notification in-app (pas seulement email) sur décision de
  candidature — existe déjà côté événements backend
  (`ApplicationDecided`), pas encore de canal in-app frontend.

## Validation avant de cocher quoi que ce soit

- [ ] Décision "Option A / Option B" actée et écrite dans le commit.
- [ ] `npx vue-tsc --build --force` et `npm run build` passent.
- [ ] Parcours manuel complet contre le backend dockerisé : créer un
  compte → candidater à une filière → (admin) accepter la candidature →
  (admin) créer l'inscription → apprenant voit sa formation au dashboard
  → ouvre un chapitre → progression enregistrée au reload.
