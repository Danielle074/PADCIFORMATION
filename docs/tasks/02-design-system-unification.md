# 02 — Unifier le design system (tokens, couleurs, polices, icônes)

> **Décisions prises et implémentées (2026-11-09)**, voir section
> "Décisions" plus bas pour le détail et la justification de chacune.
> Le remplacement des hex en dur est fait pour les fichiers qui restent en
> usage ; les fichiers voués à disparaître (05) ou bloqués par une
> décision produit ouverte (04) sont explicitement exclus, pas oubliés —
> voir "Fichiers porteurs de couleurs en dur" plus bas.

## Constat (re-vérifié le 2026-11-09 via grep sur `src/`)

### 1. Trois palettes coexistent

1. **Tokens bleus** — `src/style.css` l.72-78 :
   `@theme { --color-primary: #274E8F; --color-secondary: #E07B00; … }`.
2. **Vert "brand" en dur** — `#198341` apparaît **258 fois dans 15
   fichiers** `.vue` (liste plus bas), plus les dégradés
   `#22a854` / `#146b34` / `#0f5229` et la variante `#007668` (97×).
   Inventaire complet :
   ```bash
   grep -roh "#[0-9a-fA-F]\{6\}" src --include="*.vue" | sort | uniq -c | sort -rn
   ```
3. **Grayscale shadcn** — `style.css` l.130 : `--primary: oklch(0.205 0 0)`
   (near-black), puis l.107 `@theme inline` redéfinit
   `--color-primary: var(--primary)` APRÈS le `@theme` bleu. En Tailwind
   v4 la dernière déclaration gagne : les classes `bg-primary` /
   `text-primary` ne rendent **ni** le bleu des tokens **ni** le vert des
   vues maison. À vérifier visuellement (ex. `NouvelleDemande.vue`, qui
   n'utilise que `text-primary`, thème shadcn). C'est un bug de rendu, pas
   un détail cosmétique.

### 2. Deux familles de polices en concurrence

- `style.css` l.2 : import Google Fonts **Geist** + l.81
  `--font-sans: 'Geist Variable'`, utilisé par les composants shadcn
  (`font-sans`).
- `style.css` l.64-71 : `body { font-family: 'Futura PT Book' }` (7
  `@font-face` locaux l.12-59) utilisé par les vues maison.

Résultat : la police change selon la page/le composant. L'import Google
Fonts est aussi une requête externe au runtime (confidentialité, offline,
performance) — à arbitrer.

### 3. Trois systèmes d'icônes

- `<svg>` inline path par path — vues auth, vues admin.
- `@lucide/vue` (dependency, utilisée par les composants shadcn).
- `boxicons` (dependency, classes `bx bx-user-plus`… — ex.
  `NouvelleDemande.vue` l.43) : une dépendance npm entière pour quelques
  glyphes.

## Fichiers porteurs de couleurs en dur

**Correction du 2026-11-09** : l'inventaire initial de 15 fichiers (grep
sur `#198341`/`#274E8F` uniquement) était incomplet — il manquait les
fichiers utilisant d'autres couleurs en dur (`#007668`, `#F97316`, etc.).
Liste complète, avec statut :

Faits (hex remplacés par les tokens, ou littéraux Chart.js justifiés par
commentaire) :
```
src/features/admin/components/SidebarAdmin.vue
src/features/admin/layouts/DefaultLayoutAdmin.vue
src/features/admin/views/AdminCandidatures.vue
src/features/admin/views/AdminCohortes.vue
src/features/admin/views/AdminDashboard.vue
src/features/admin/views/AdminParametres.vue
src/features/admin/views/AdminRapports.vue
src/features/auth/views/ForgotPassword.vue
src/features/auth/views/Inscription.vue
src/features/auth/views/Login.vue
src/features/auth/views/ResetPassword.vue
src/features/learning/views/Cours.vue
src/features/learning/views/network/Introduction.vue
src/features/profile/views/ParametresApprenant.vue
src/features/profile/views/ProfilApprenants.vue
src/features/public/views/Accueil.vue
src/features/superadmin/components/SidebarSuperAdmin.vue
src/features/superadmin/views/SuperAdminDashboard.vue
```

**Délibérément exclus pour l'instant** (pas oubliés — touchés par une
décision produit encore ouverte ailleurs, les retoucher maintenant serait
du travail jeté) :
```
src/features/learning/views/Chapitre2.vue … Chapitre7.vue
src/features/learning/views/network/NetworkDashboard.vue
src/features/learning/views/network/Introduction.vue (contenu réseau, pas le header)
src/features/learning/views/Dashboard.vue
src/features/learning/views/Modules1.vue
src/features/learning/views/Exercices.vue
src/features/learning/views/Evaluations.vue
```
→ Ces fichiers sont supprimés ou remplacés par des vues génériques dans
`05-onboarding-catalog-and-learning-flow.md` (layout dynamique, lecteur
de chapitre générique). Y toucher pour des couleurs avant cette
suppression serait retravailler un fichier qui va disparaître.

```
src/features/learning/views/EducationRoutiere.vue
```
→ Son thème teal/jaune (`#007668`/`#FFDC00`) a l'air délibéré (signalétique
routière), pas de la dérive — **et** la page elle-même est une décision
produit ouverte dans `04-structure-cleanup.md` ("TODO(learning) l.77-80" :
où la ranger, quel contenu). Ne pas y toucher avant cette décision.

## Tâches — cocher seulement après vérification réelle

### Décisions (portées par le mainteneur, pas par l'agent)

- [x] **Palette** : vert `#198341` gagne (toutes les vues maison
  l'utilisaient déjà). Famille dérivée des 4 valeurs déjà en usage :
  `--color-primary: #198341`, `--color-primary-bright: #22a854`
  (dégradés), `--color-primary-shade: #146b34` (hover),
  `--color-primary-deep: #0f5229` (overlay). Contraste blanc/#198341
  vérifié ≈ 5.4:1 (AA texte normal).
- [x] **Police** : Futura PT gagne — auto-hébergée, consolidée en UNE
  famille avec les poids réels (300/400/500/600/700/800/900) au lieu de 7
  familles distinctes par graisse. Import Google Fonts (Geist) retiré :
  plus de requête externe au runtime.
- [x] **Dark mode** : désactivé (light only) — les blocs `.dark` de
  variables sont retirés. Les classes `dark:` des composants shadcn
  restent inertes (aucune classe `.dark` n'est jamais posée), c'est
  déterministe ; réactivable proprement plus tard si besoin produit.
- [x] **Lib d'icônes** : lucide gagne. `boxicons` retiré de
  `package.json` (dépendance supprimée, 0 référence `bx-*` restante —
  codemod dans `scripts/codemod-boxicons-to-lucide.mjs`).

### Tokens

- [x] `src/style.css` réécrit : une seule déclaration de
  `--color-primary` (le doublon bleu/near-black est supprimé). La palette
  de marque alimente les variables shadcn `--primary`/`--primary-foreground`.
- [x] `@theme` ne définit que ce qui est réellement utilisé (la famille
  primary + ses 3 variantes). Les états succès/avertissement codés en dur
  dans certaines vues restent des classes Tailwind standard
  (`text-green-600`, `bg-amber-50`…), pas de nouveau token spéculatif.
- [x] Dark mode : décidé ci-dessus (désactivé).

### Remplacements

- [x] Hex en dur remplacés par les tokens dans les 18 fichiers actifs
  listés plus haut (dont 3 ajoutés le 2026-11-09 après correction de
  l'inventaire : `Accueil.vue`, `SidebarSuperAdmin.vue`,
  `SuperAdminDashboard.vue`). Les littéraux Chart.js restants
  (`AdminDashboard.vue`, `AdminRapports.vue`, `SuperAdminDashboard.vue` —
  Chart.js n'accepte pas de classes Tailwind) sont calés sur les valeurs
  exactes de la famille `--color-primary`, avec un commentaire qui le dit.
  Les fichiers exclus (voir plus haut) ne sont pas touchés.
- [x] `bx-*` → lucide, `boxicons` retiré de `package.json`.
- [ ] Unifier les `<svg>` inline restants vers lucide — non fait dans ce
  lot, à reprendre si un agent retouche ces vues.
- [x] Google Fonts retiré, Futura PT auto-hébergée, plus de contradiction
  `font-sans` / `body { font-family }` (une seule famille maintenant).

### Vérifier avant de cocher

- [x] `npx vue-tsc --build --force` et `npm run build` passent (vérifié
  le 2026-11-09 après les 3 fichiers ajoutés à l'inventaire).
- [ ] **Revue visuelle page par page avant/après** (`npm run dev`) : pas
  encore faite par un humain — captures à joindre avant de cocher
  définitivement cette ligne-là.
- [x] L'inventaire grep des hex ne contient plus que des valeurs
  explicitement justifiées (littéraux Chart.js commentés, neutres
  gris/blanc) ou des fichiers explicitement exclus (voir plus haut).
- [x] Aucune nouvelle dépendance ajoutée ; `boxicons` retiré (signalé
  dans le commit).

## Ordre avec le reste

- **Fait dans cet ordre** : 01 (`Inscription.vue` réduit à l'étape
  compte) d'abord, puis les décisions de palette/police/icônes et le
  remplacement des hex — `Inscription.vue` n'a donc été retouché qu'une
  fois, avec les tokens déjà posés. La future vue `Candidature.vue` (05)
  héritera directement des tokens, pas besoin d'un second passage de
  couleurs sur ce domaine.
- À faire avant le 03 : les pages branchées sur l'API dans 03 ne devront
  pas être re-revues visuellement.
