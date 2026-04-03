---
name: commit
description: Génère un conventional commit message basé sur les changements staged. Analyse le diff, choisit le bon type, scope et description. Adapté au projet JapanGuides (React/Next.js/Supabase/Vercel).
---

# Skill : commit

## Objectif
Générer un message de commit au format **Conventional Commits** strict, basé sur les fichiers modifiés et le diff Git.

## Stack cible
- React / Next.js 14+ (App Router)
- Tailwind CSS
- Supabase
- Vercel

## Instructions

### 1. Analyse des changements
- Exécute `git diff --staged` pour voir les changements staged
- Si rien n'est staged, exécute `git diff` pour voir les changements non staged
- Identifie les fichiers modifiés et leur nature

### 2. Choix du type
Utilise **strictement** ces types :
| Type | Usage |
|------|-------|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `style` | Changements UI/CSS (Tailwind) sans logique |
| `refactor` | Restructuration sans changement de comportement |
| `perf` | Optimisation de performance |
| `test` | Ajout ou modification de tests |
| `docs` | Documentation, JSDoc, commentaires |
| `chore` | Config, dépendances, scripts |
| `ci` | CI/CD, Vercel config |
| `db` | Migrations Supabase, RLS, schéma |

### 3. Scope (optionnel mais recommandé)
Déduis le scope du chemin des fichiers :
- `components/` → nom du composant (ex: `card`, `navbar`)
- `app/` → nom de la route (ex: `home`, `destinations`)
- `lib/` → nom du module (ex: `supabase`, `utils`)
- `supabase/` → `rls`, `migration`, `seed`
- Global → omets le scope

### 4. Format du message
```
<type>(<scope>): <description courte en français>

[corps optionnel : contexte, raison du changement]

[footer optionnel : BREAKING CHANGE, closes #issue]
```

### 5. Règles strictes
- Description en **français**, impératif présent (ex: "ajoute", "corrige", "supprime")
- Maximum **72 caractères** sur la première ligne
- Pas de point final sur la première ligne
- Corps et footer séparés par une ligne vide
- Si BREAKING CHANGE → ajouter `!` après le type/scope ET un footer

### 6. Exemples
```
feat(destinations): ajoute le filtre par région
fix(supabase): corrige la politique RLS sur les favoris
style(card): ajuste le responsive mobile avec Tailwind
db(rls): ajoute la règle de lecture publique sur destinations
ci: met à jour la config Vercel pour les variables d'env
```

### 7. Sortie
- Affiche le message de commit proposé
- Demande confirmation avant d'exécuter `git commit -m "..."`
- Ne jamais utiliser `--no-verify`
