---
name: component
description: Génère un composant React avec Tailwind CSS, TypeScript strict, conforme aux conventions du projet JapanGuides. Inclut props typées, accessibilité et responsive mobile-first.
---

# Skill : component

## Objectif
Créer un composant React production-ready, typé TypeScript, stylé Tailwind CSS, compatible avec le projet JapanGuides.

## Stack cible
- React / Next.js 14+ (App Router)
- TypeScript strict
- Tailwind CSS (mobile-first)
- Supabase (si données dynamiques)

## Instructions

### 1. Collecte d'informations
Avant de générer, détermine :
- Nom du composant (PascalCase)
- Emplacement : `components/ui/`, `components/layout/`, `components/[feature]/`
- Props attendues et leurs types
- Est-il un Server Component ou Client Component ?
- A-t-il besoin de données Supabase ?

### 2. Structure du fichier
```tsx
// components/[dossier]/[NomComposant].tsx

"use client" // seulement si nécessaire (hooks, events, state)

import { type FC } from "react"

interface [NomComposant]Props {
  // props typées ici
}

const [NomComposant]: FC<[NomComposant]Props> = ({ ...props }) => {
  return (
    // JSX ici
  )
}

export default [NomComposant]
```

### 3. Règles Tailwind
- **Mobile-first** : base = mobile, `md:` = tablette, `lg:` = desktop
- Utilise les classes utilitaires existantes du projet (pas de styles inline)
- Couleurs : respecte la palette définie dans `tailwind.config.ts`
- Pas de `!important`, pas de classes arbitraires sauf si indispensable
- Préfère `gap-` à `margin` pour les espaces entre enfants

### 4. Règles TypeScript
- Toujours typer les props avec une interface (pas `type`)
- Pas de `any`, pas de `@ts-ignore`
- Utiliser les types Supabase générés si données DB

### 5. Accessibilité (a11y)
- `alt` sur toutes les `<img>`
- `aria-label` sur les boutons sans texte visible
- Utiliser les balises sémantiques : `<nav>`, `<main>`, `<section>`, `<article>`
- Focus visible : ne jamais supprimer `outline` sans alternative

### 6. Performance
- Images : utiliser `next/image` avec `width`, `height` et `priority` si above-the-fold
- Liens : utiliser `next/link`
- Lazy loading par défaut pour les composants lourds avec `dynamic()`

### 7. Exemple de sortie
```tsx
"use client"

import { type FC } from "react"
import Image from "next/image"

interface DestinationCardProps {
  title: string
  image: string
  region: string
  onClick?: () => void
}

const DestinationCard: FC<DestinationCardProps> = ({ title, image, region, onClick }) => {
  return (
    <article
      className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 w-full">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 uppercase tracking-wide">{region}</p>
        <h3 className="text-lg font-semibold mt-1">{title}</h3>
      </div>
    </article>
  )
}

export default DestinationCard
```
