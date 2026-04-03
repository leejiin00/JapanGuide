'use client'
// components/home/KanjiLayer.tsx
// Couche décorative de kanjis flottants en arrière-plan.
// Extrait de HomeClient.tsx — réutilisé dans HeroSection et QuoteSection.

import { motion } from 'framer-motion'

const CHARS = ['日', '本', '旅', '夢', '美', '心', '道', '光', '影', '神', '風', '海', '火', '山']

/**
 * Affiche des caractères japonais animés en arrière-plan (décoration uniquement).
 * aria-hidden : invisible pour les lecteurs d'écran.
 */
export default function KanjiLayer() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
      {CHARS.map((char, i) => (
        <motion.span
          key={i}
          className="absolute font-display"
          style={{
            fontSize: `${40 + (i % 4) * 30}px`,
            left:     `${(i / CHARS.length) * 95}%`,
            top:      `${(i * 47) % 90}%`,
            color:    'rgba(255,255,255,0.025)',
          }}
          animate={{ opacity: [0.015, 0.05, 0.015], y: [0, -18, 0] }}
          transition={{ duration: 7 + i * 0.6, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  )
}
