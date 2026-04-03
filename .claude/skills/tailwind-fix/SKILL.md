---
name: tailwind-fix
description: Diagnostique et corrige les problèmes d'UI, de responsive et de cohérence visuelle Tailwind CSS dans le projet JapanGuides. Approche mobile-first stricte.
---

# Skill : tailwind-fix

## Objectif
Identifier et corriger les problèmes visuels, de responsive et de cohérence Tailwind CSS dans les composants React du projet.

## Stack cible
- Tailwind CSS (mobile-first)
- React / Next.js 14+
- Pas de CSS modules, pas de styled-components

## Breakpoints du projet
```
mobile  : < 768px  (base, pas de préfixe)
tablette: ≥ 768px  (md:)
desktop : ≥ 1024px (lg:)
large   : ≥ 1280px (xl:)
```

## Instructions

### 1. Diagnostic
Avant de corriger, identifier la catégorie du problème :

| Catégorie | Symptômes |
|-----------|-----------|
| Responsive cassé | Débordement horizontal, texte trop petit/grand sur mobile |
| Espacement incohérent | Gaps/paddings/margins non harmonisés |
| Couleurs hors palette | Couleurs hardcodées hors `tailwind.config.ts` |
| Alignement | Éléments mal centrés, flex/grid mal configuré |
| Typographie | Tailles de police non harmonisées |
| Z-index | Éléments cachés derrière d'autres |
| Overflow | Contenu qui déborde du container |

### 2. Règles de correction

#### A. Mobile-first obligatoire
```tsx
// Mauvais (desktop-first)
<div className="text-2xl md:text-base">

// Correct (mobile-first)
<div className="text-base md:text-2xl">
```

#### B. Layout responsive
```tsx
// Grid responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Flex responsive
<div className="flex flex-col md:flex-row gap-4">

// Container centré
<div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
```

#### C. Texte responsive
```tsx
// Titres
<h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
<h2 className="text-xl md:text-3xl font-semibold">
<p className="text-sm md:text-base">
```

#### D. Images responsives avec next/image
```tsx
<div className="relative w-full h-48 md:h-64 lg:h-80">
  <Image src={src} alt={alt} fill className="object-cover" />
</div>
```

#### E. Overflow et débordements
```tsx
// Texte long
<p className="truncate"> // 1 ligne
<p className="line-clamp-2"> // 2 lignes max

// Container
<div className="overflow-hidden"> // empêche le débordement
<div className="overflow-x-auto"> // scroll horizontal si nécessaire
```

#### F. Navigation mobile
```tsx
// Menu hamburger responsive
<nav className="hidden md:flex"> // visible desktop
<button className="md:hidden"> // visible mobile seulement
```

### 3. Problèmes fréquents et corrections rapides

**Débordement horizontal sur mobile**
```tsx
// Ajouter sur le wrapper principal
<div className="w-full overflow-x-hidden">
```

**Bouton trop petit sur mobile (touch target)**
```tsx
// Min 44px × 44px pour l'accessibilité tactile
<button className="min-h-[44px] min-w-[44px] px-4 py-2">
```

**Carte qui ne s'étire pas correctement**
```tsx
// Utiliser h-full sur les cartes dans un grid
<article className="h-full flex flex-col">
  <div className="flex-1"> {/* contenu extensible */}
```

**Couleurs non harmonisées**
```tsx
// Ne pas utiliser : text-[#FF5733]
// Utiliser les couleurs du config Tailwind du projet
```

### 4. Format de la réponse
```
## Tailwind Fix — [NomComposant]

**Problème détecté :** [description]
**Breakpoint(s) affecté(s) :** mobile / tablette / desktop

### Correction
[Code JSX corrigé avec classes Tailwind]

### Avant / Après
[Comparaison si pertinent]
```
