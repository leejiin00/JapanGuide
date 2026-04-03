---
name: test
description: Génère des tests unitaires et d'intégration pour les composants React et les hooks du projet JapanGuides. Utilise Jest et React Testing Library.
---

# Skill : test

## Objectif
Créer des tests unitaires et d'intégration pertinents, maintenables et rapides pour les composants React, hooks custom et fonctions utilitaires du projet.

## Stack de test
- **Jest** — runner de tests
- **React Testing Library (RTL)** — tests de composants
- **@testing-library/user-event** — simulation d'interactions
- **MSW (Mock Service Worker)** — mock des requêtes Supabase/API (si configuré)

## Instructions

### 1. Quoi tester en priorité
| Priorité | Cible |
|----------|-------|
| Haute | Fonctions utilitaires pures (`lib/utils`) |
| Haute | Hooks custom avec logique métier |
| Haute | Composants interactifs (boutons, formulaires, filtres) |
| Moyenne | Composants d'affichage avec props variées |
| Basse | Composants purement statiques |

### 2. Structure des fichiers de test
```
components/
  DestinationCard/
    DestinationCard.tsx
    DestinationCard.test.tsx   ← test unitaire
lib/
  hooks/
    useDestinations.ts
    useDestinations.test.ts    ← test de hook
  utils/
    formatDate.ts
    formatDate.test.ts         ← test de fonction pure
```

### 3. Template — Composant React
```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NomComposant from './NomComposant'

const defaultProps = {
  // props minimales pour que le composant fonctionne
}

describe('NomComposant', () => {
  it('affiche correctement avec les props par défaut', () => {
    render(<NomComposant {...defaultProps} />)
    expect(screen.getByText('...')).toBeInTheDocument()
  })

  it('appelle le callback onClick quand cliqué', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    render(<NomComposant {...defaultProps} onClick={handleClick} />)
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('affiche un état vide quand aucune donnée', () => {
    render(<NomComposant {...defaultProps} items={[]} />)
    expect(screen.getByText(/aucun résultat/i)).toBeInTheDocument()
  })
})
```

### 4. Template — Fonction utilitaire
```ts
import { nomDeLaFonction } from './nomDuFichier'

describe('nomDeLaFonction', () => {
  it('retourne la valeur attendue pour un cas nominal', () => {
    expect(nomDeLaFonction(entree)).toBe(sortieAttendue)
  })

  it('gère les valeurs nulles/undefined', () => {
    expect(nomDeLaFonction(null)).toBe(valeurParDefaut)
  })

  it('gère les cas limites', () => {
    expect(nomDeLaFonction('')).toBe(...)
  })
})
```

### 5. Template — Hook custom
```ts
import { renderHook, act } from '@testing-library/react'
import { useMonHook } from './useMonHook'

describe('useMonHook', () => {
  it('retourne les valeurs initiales', () => {
    const { result } = renderHook(() => useMonHook())
    expect(result.current.data).toEqual([])
    expect(result.current.loading).toBe(false)
  })

  it('met à jour le state lors d\'une action', async () => {
    const { result } = renderHook(() => useMonHook())
    await act(async () => {
      result.current.doSomething()
    })
    expect(result.current.data).toHaveLength(1)
  })
})
```

### 6. Règles de qualité
- Tester le **comportement** (ce que l'utilisateur voit/fait), pas l'implémentation
- Utiliser `getByRole`, `getByLabelText`, `getByText` (accessible queries) en priorité
- Éviter `getByTestId` sauf dernier recours
- Pas de `setTimeout` dans les tests → utiliser `waitFor` ou `findBy`
- Mocker Supabase avec `jest.mock()` ou MSW
- Un `describe` par fichier, un `it` par comportement

### 7. Mock Supabase (pattern recommandé)
```ts
jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnValue({
        data: [{ id: 1, name: 'Tokyo' }],
        error: null,
      }),
    }),
  },
}))
```

### 8. Format de la réponse
Générer directement le fichier `.test.tsx` complet avec :
- Tous les imports nécessaires
- Un `describe` principal
- Minimum 3 cas de test par composant/fonction
- Commentaires explicatifs si logique complexe
