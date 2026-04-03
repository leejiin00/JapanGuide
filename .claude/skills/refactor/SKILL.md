---
name: refactor
description: Découpe, nettoie et restructure le code existant sans changer son comportement. Applique les bonnes pratiques React/TypeScript pour le projet JapanGuides.
---

# Skill : refactor

## Objectif
Améliorer la lisibilité, la maintenabilité et la structure du code sans modifier son comportement observable. Zéro régression garantie.

## Stack cible
- React / Next.js 14+ (App Router)
- TypeScript strict
- Tailwind CSS
- Supabase

## Instructions

### 1. Analyse préalable
Avant de refactorer, identifier :
- Les fonctions / composants trop longs (> 50 lignes)
- La logique métier mélangée avec l'UI
- Les props drilling excessifs (> 3 niveaux)
- Les duplications de code
- Les types manquants ou trop larges

### 2. Règles de refactoring

#### A. Découpage des composants
- Un composant = une responsabilité
- Si un composant dépasse 100 lignes JSX → le découper
- Extraire les sous-parties dans `components/[feature]/`
- Les composants purement visuels → `components/ui/`

#### B. Extraction de la logique métier
- La logique (fetch, calcul, transformation) → hooks custom dans `lib/hooks/`
- Format : `useNomDeLaLogique.ts`
- Ne jamais faire de fetch Supabase directement dans un composant → utiliser un hook

```tsx
// Avant (mauvais)
const Component = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    supabase.from('destinations').select('*').then(({ data }) => setData(data))
  }, [])
  return <div>{data.map(...)}</div>
}

// Après (bien)
// lib/hooks/useDestinations.ts
export const useDestinations = () => {
  const [data, setData] = useState([])
  useEffect(() => { /* fetch */ }, [])
  return { data }
}

// components/Destinations.tsx
const Destinations = () => {
  const { data } = useDestinations()
  return <div>{data.map(...)}</div>
}
```

#### C. Nettoyage TypeScript
- Remplacer `any` par des types précis
- Créer des interfaces dans `types/` si réutilisées
- Utiliser les types générés Supabase (`Database['public']['Tables']['xxx']['Row']`)

#### D. Simplification Tailwind
- Extraire les classes répétées en variables :
```tsx
const cardClass = "rounded-2xl shadow-md p-4 bg-white hover:shadow-xl transition-shadow"
```
- Ou utiliser `cn()` / `clsx()` si déjà dans le projet

#### E. Suppression du code mort
- Supprimer les imports non utilisés
- Supprimer les `console.log`
- Supprimer les variables déclarées et jamais utilisées
- Supprimer les commentaires obsolètes

### 3. Ce qu'on ne change PAS
- Le comportement observable (UI, données, interactions)
- Les noms de routes / API
- Les structures de données Supabase
- Les tests existants (sauf s'ils sont cassés par le refactor)

### 4. Processus de validation
1. Lister les changements prévus avant de les appliquer
2. Modifier un fichier à la fois
3. Vérifier que `npm run build` passe toujours
4. Vérifier que `npm run lint` ne remonte pas d'erreurs

### 5. Format de la réponse
```
## Refactoring proposé

**Fichier(s) ciblé(s) :** [chemins]
**Raison :** [problème identifié]

### Changements
1. [Description du changement 1]
2. [Description du changement 2]

[Code refactorisé]
```
