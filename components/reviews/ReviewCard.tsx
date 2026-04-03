'use client'
// components/reviews/ReviewCard.tsx
// Affiche un avis voyageur individuel avec animation au survol.
// Extrait de AvisClient.tsx pour respecter le principe de responsabilité unique.

import { motion } from 'framer-motion'
import type { ReviewRow } from '@/types/database'
import Stars from '@/components/ui/Stars'

interface ReviewCardProps {
  review:      ReviewRow
  accentColor: string
  shadowColor: string
  /** Index dans la liste, utilisé pour le délai d'animation en cascade */
  index:       number
}

/**
 * Carte d'avis avec animation d'apparition et effet de survol.
 *
 * @example
 * <ReviewCard review={review} accentColor="#fb923c" shadowColor="rgba(251,146,60,0.2)" index={0} />
 */
export default function ReviewCard({ review, accentColor, shadowColor, index }: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <motion.div
        whileHover={{ y: -4, boxShadow: `0 20px 60px ${shadowColor}` }}
        className="rounded-2xl p-7"
        style={{
          background:    'rgba(255,255,255,0.03)',
          border:        '1px solid rgba(255,255,255,0.07)',
          backdropFilter:'blur(20px)',
        }}
      >
        {/* Auteur + note */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-lg shrink-0"
              style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}25` }}
            >
              {review.flag}
            </div>
            <div>
              <p className="text-sm font-body text-white font-light">{review.author}</p>
              <p className="text-[10px] font-body text-white/30">{review.country} · {review.review_date}</p>
            </div>
          </div>
          <Stars n={review.rating} color={accentColor} />
        </div>

        {/* Corps du témoignage */}
        <blockquote
          className="font-display font-light italic leading-relaxed mb-5"
          style={{ fontSize: 'clamp(1rem,1.8vw,1.2rem)', color: 'rgba(255,255,255,0.75)' }}
        >
          "{review.body}"
        </blockquote>

        {/* Moment phare */}
        <span
          className="text-[10px] px-3 py-1 rounded-full font-body tracking-wider"
          style={{
            background: `${accentColor}12`,
            border:     `1px solid ${accentColor}25`,
            color:      accentColor,
          }}
        >
          ✓ {review.highlight}
        </span>
      </motion.div>
    </motion.div>
  )
}
