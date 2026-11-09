# Tâches frontend — PADCI-WEB

Ce dossier contient la liste de tâches à donner à un agent (ou un dev) pour
continuer le travail sur `PADCI-WEB`. Chaque fichier est une checklist
autonome : contexte, constat, et cases à cocher. Cocher une case ne devrait
jamais être fait "en théorie" — chaque tâche dit ce qu'il faut vérifier
avant de la cocher (build, test manuel, ou les deux).

## Pourquoi ce dossier existe

Audit réalisé le 2026-11-08 sur le code actuel (pas de supposition — chaque
fichier cité a été lu) : le frontend est fonctionnellement un **chantier non
organisé**. Le routeur, l'outillage (Vue Query, Axios, shadcn-vue) et une
partie de l'authentification (connexion, MFA, déconnexion) sont posés et
**vérifiés en conditions réelles** contre le backend dockerisé. Le reste —
inscription, mot de passe oublié/réinitialisation, vérification d'email,
cohérence visuelle, données en dur — ne l'est pas.

## État au 2026-11-09

`01` et `02` sont faits et vérifiés (build + tests réels) :
- Flux auth réel (register/vérification email/forgot/reset/login),
  `Inscription.vue` réduit à l'étape compte.
- Décisions de design system actées et implémentées : palette verte
  `#198341` (famille primary/bright/shade/deep), police Futura PT
  auto-hébergée, dark mode désactivé, icônes lucide (`boxicons` retiré).
  Reste ouvert sur 02 : la revue visuelle humaine page par page n'a pas
  été faite (pas bloquant pour continuer sur 03/04/05).

## Ordre recommandé

1. **`01-auth-flow-completion.md`** — le flux d'authentification n'est pas
   complet ; c'est le prérequis de tout le reste (on ne peut pas tester le
   reste de l'app sans pouvoir créer un vrai compte).
2. **`02-design-system-unification.md`** — tant que les tokens ne sont pas
   posés, chaque nouvelle page ajoute une nouvelle couleur en dur.
3. **`03-hardcoded-content-and-fake-flows.md`** — remplacer les données et
   les soumissions de formulaire factices restantes.
4. **`04-structure-cleanup.md`** — décisions produit en attente (rôle de
   certaines pages, doublon de contenu).
5. **`05-onboarding-catalog-and-learning-flow.md`** — refonte du parcours
   inscription → choix de session → candidature → apprentissage, et
   suppression du pattern "un layout par catégorie"
   (`NetworkSpecialistLayout`) au profit d'un layout unique piloté par
   les données réelles de l'API Learning. Le backend a été étendu pour
   le supporter (ADR-012 côté PADCI-API, `develop` à jour) : le candidat
   choisit désormais une session réelle à la candidature, et les 5
   filières sont seedées avec leurs vraies dates.

Le 05 dépend seulement du 01 (le composable `useRegister.ts` et
`Inscription.vue` réduit à l'étape compte) — il peut démarrer dès le 01
terminé, sans attendre le 02/03/04. Les deux points du 04 qui le
bloquaient (découpe du formulaire, doublon `/formations/network`) sont
déjà tranchés et cochés dans ce fichier.

## Règles pour l'agent qui exécute ces tâches

- **Lire le contrat backend avant de coder** — chaque tâche qui touche
  l'API cite le fichier backend exact (`PADCI-API/app/...`) et les champs
  attendus. Ne pas deviner un nom de champ.
- **Un commit par tâche cochée** (ou par petit groupe cohérent), sur
  `develop`. Message de commit qui dit *quoi* et *pourquoi*, pas juste "fix".
- **Vérifier avant de cocher** : `npx vue-tsc --build --force` et
  `npm run build` doivent passer. Pour tout ce qui touche un appel API,
  tester en vrai contre le backend (`docker ps` doit montrer `padci_app`
  actif ; sinon `cd PADCI-API && make up`).
- **Ne pas introduire de nouvelle dépendance** sans le signaler dans le
  commit (nom, version, raison) — même règle que côté backend.
- Si une tâche révèle un vrai problème qui n'est pas dans cette liste,
  l'ajouter à `04-structure-cleanup.md` plutôt que de l'ignorer.
