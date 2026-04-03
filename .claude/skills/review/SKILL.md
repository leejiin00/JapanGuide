---
name: review
description: Effectue un audit complet du code — qualité, performance, sécurité et accessibilité — pour le stack React/Tailwind/Supabase/Vercel du projet JapanGuides.
---

# Skill : review

## Objectif
Analyser un fichier ou une PR et produire un rapport structuré de code review avec suggestions de correction prioritisées.

## Stack cible
- React / Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Supabase
- Vercel

## Instructions

### 1. Périmètre d'analyse
- Si un fichier est fourni → analyser ce fichier
- Si une PR est mentionnée → analyser le diff complet
- Si aucun contexte → demander quel fichier/dossier auditer

### 2. Grille d'évaluation (5 axes)

#### A. Qualité du code
- TypeScript strict respecté ? (pas de `any`, types complets)
- Fonctions trop longues (> 50 lignes = warning)
- Duplication de code détectable
- Nommage explicite (variables, fonctions, composants)
- Séparation des responsabilités (un composant = une responsabilité)

#### B. Performance
- Imports inutiles ou trop lourds ?
- `useEffect` avec dépendances manquantes ou infinies
- Re-renders inutiles (mémoisation manquante avec `useMemo`, `useCallback`, `memo`)
- Images sans `next/image`
- Requêtes Supabase sans pagination ou sans `select()` limité
- `console.log` oubliés en production

#### C. Sécurité
- Variables d'environnement côté client (jamais de secrets dans `NEXT_PUBLIC_`)
- Données utilisateur non sanitisées avant insertion Supabase
- Politiques RLS Supabase respectées côté code
- Pas de logique d'autorisation côté client uniquement

#### D. Accessibilité (a11y)
- Balises sémantiques utilisées ?
- `alt` sur les images ?
- Contraste suffisant (classes Tailwind) ?
- Navigation clavier possible ?

#### E. Convention du projet
- Structure de fichiers respectée ?
- Conventions de nommage respectées ?
- Pas de styles inline ?
- Exports default cohérents ?

### 3. Format du rapport
```
## Code Review — [NomDuFichier]

### Résumé
[Note globale : ✅ Bon / ⚠️ Améliorable / ❌ Problèmes critiques]

### Problèmes critiques (bloquer la PR)
- [ ] ...

### Améliorations importantes
- [ ] ...

### Suggestions mineures
- [ ] ...

### Points positifs
- ✅ ...
```

### 4. Règles
- Toujours justifier chaque remarque avec une ligne de code citée
- Proposer une correction concrète pour chaque problème
- Ne pas re-écrire tout le fichier sauf si demandé
- Prioriser : Sécurité > Performance > Qualité > Style
