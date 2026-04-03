'use client'
// components/ui/Stars.tsx
// Composant réutilisable d'affichage/sélection d'étoiles.
// Extrait de AvisClient.tsx pour être partagé entre ReviewCard, ReviewForm et AdminAvisClient.

import { useState } from 'react'

interface StarsProps {
  /** Valeur actuelle (1-5) */
  n: number
  /** Couleur des étoiles sélectionnées (hex ou rgba) */
  color: string
  /** Active le mode interactif (survol + clic) */
  interactive?: boolean
  /** Callback déclenché quand l'utilisateur sélectionne une note */
  onSelect?: (value: number) => void
}

/**
 * Affiche une rangée de 5 étoiles, avec gestion du survol en mode interactif.
 *
 * @example
 * // Affichage statique
 * <Stars n={4} color="#fb923c" />
 *
 * @example
 * // Sélecteur interactif
 * <Stars n={rating} color="#fb923c" interactive onSelect={setRating} />
 */
export default function Stars({ n, color, interactive, onSelect }: StarsProps) {
  // hov stocke l'étoile survolée pour le retour visuel avant le clic.
  const [hov, setHov] = useState(0)

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          onClick={() => onSelect?.(s)}
          onMouseEnter={() => interactive && setHov(s)}
          onMouseLeave={() => interactive && setHov(0)}
          style={{
            color:      s <= (hov || n) ? color : 'rgba(255,255,255,0.15)',
            fontSize:   interactive ? '1.4rem' : '0.75rem',
            cursor:     interactive ? 'pointer' : 'default',
            transition: 'color 0.15s',
          }}
        >
          ★
        </span>
      ))}
    </div>
  )
}
