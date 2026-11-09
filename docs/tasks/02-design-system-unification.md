# 02 — Unifier le design system (tokens, couleurs, polices, icônes)

> Tant que les tokens ne sont pas posés, chaque nouvelle page ajoute une
> nouvelle couleur en dur. Unifier AVANT de reprendre les pages du 03,
> sinon on retouche les mêmes fichiers deux fois.

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

## Fichiers porteurs de couleurs en dur (liste exacte, 15 fichiers)

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
```

## Tâches — cocher seulement après vérification réelle

### Décisions (portées par le mainteneur, pas par l'agent)

- [ ] Trancher la palette de marque : vert `#198341` (toutes les vues
  maison), bleu `#274E8F` (premier jet de tokens), ou autre ? Un seul
  `primary`. La décision est consignée dans le commit.
- [ ] Trancher la police : Geist (variable, déjà importée) ou Futura PT
  (locale, déjà embarquée) — une seule. La variable `--font-heading`
  existe déjà pour la distinction titres/texte.
- [ ] Trancher la lib d'icônes : lucide seul est candidat (mutualisé avec
  shadcn). Si boxicons sort, signaler la suppression de dépendance dans le
  commit (nom, version, raison — règle `AGENTS.md`).

### Tokens

- [ ] Réécrire `src/style.css` : une seule déclaration de
  `--color-primary` (supprimer le doublon l.73 vs l.107). Garder
  `@theme inline` pour le mapping variables shadcn, et injecter la palette
  de marque dans les variables shadcn `--primary` / `--secondary` (sans
  oublier `--primary-foreground` et `--ring` : vérifier les contrastes).
- [ ] Définir dans `@theme` uniquement ce qui est réellement utilisé :
  `primary`, `primary-foreground`, les variantes du dégradé vert, et les
  états succès/avertissement (`green-600`, `amber-50`… utilisés en dur
  dans `Inscription.vue`). Rien de spéculatif.
- [ ] Dark mode : décider — les variables `.dark` existent mais aucun
  contrôle ne permet de basculer. Ne pas laisser un thème à moitié
  fonctionnel actif par défaut.

### Remplacements

- [ ] Remplacer les hex en dur dans les 15 fichiers listés par les classes
  tokens (`bg-primary`, `text-primary`, `from-primary/50`…), fichier par
  fichier avec revue visuelle, pas un gros `sed` aveugle.
- [ ] Remplacer les classes `bx-*` par lucide, puis retirer `boxicons` de
  `package.json` (voir décision ci-dessus).
- [ ] Unifier les `<svg>` inline vers lucide progressivement — consigner
  la portée du lot dans le commit (ce qui est fait, ce qui reste).
- [ ] Arbitrer l'import Google Fonts (auto-héberger ou retirer Geist si
  Futura l'emporte) et supprimer la contradiction
  `font-sans: Geist` vs `body { font-family: 'Futura PT Book' }`.

### Vérifier avant de cocher

- [ ] `npx vue-tsc --build --force` et `npm run build` passent.
- [ ] **Revue visuelle page par page avant/après** (`npm run dev`) :
  `/`, `/nouvelle-demande`, `/inscription`, `/mot-de-passe-oublie`,
  `/reinitialiser-mot-de-passe`, `/accueil`, dashboards admin /
  superadmin / apprenant, une page chapitre. Captures avant/après jointes
  à la PR ou au commit.
- [ ] L'inventaire grep des hex ne contient plus que des valeurs
  explicitement justifiées (ex. blanc pur) dans le commit.
- [ ] Aucune nouvelle dépendance ajoutée.

## Ordre avec le reste

- En parallèle du 01 mais **coordonner** : les vues auth refaites dans 01
  reprennent les tokens — sinon les retravailler deux fois. Ordre
  conseillé : décisions de palette/police → 01 (nouvelles vues avec les
  tokens) → remplacement des hex dans les vues restantes.
- À faire avant le 03 : les pages branchées sur l'API dans 03 ne devront
  pas être re-revues visuellement.
