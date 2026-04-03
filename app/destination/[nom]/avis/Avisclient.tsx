'use client'
// app/destination/[nom]/avis/AvisClient.tsx
// Orchestrateur de la page d'avis d'une destination.
// Les sous-composants (Stars, ReviewCard, ReviewForm) sont dans components/reviews/.

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ReviewRow } from '@/types/database'
import Stars        from '@/components/ui/Stars'
import ReviewCard   from '@/components/reviews/ReviewCard'
import ReviewForm   from '@/components/reviews/ReviewForm'

interface DestMeta {
  id:              string
  slug:            string
  name:            string
  accent_color:    string
  secondary_color: string
  shadow_color:    string
}

interface Props {
  dest:    DestMeta
  reviews: ReviewRow[]
}

export default function AvisClient({ dest, reviews }: Props) {
  const [showForm,  setShowForm]  = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Moyenne des notes — Derived State : recalculé à chaque render, pas stocké en state.
  const avgRating = reviews.length
    ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length
    : 0

  return (
    <div className="space-y-14">

      {/* ── Header avec note globale ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
      >
        <div>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body mb-2" style={{ color: dest.accent_color }}>
            口コミ — Témoignages
          </p>
          <h2 className="font-display font-thin text-white mb-2" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>
            Ils ont vécu {dest.name}
          </h2>
          <p className="text-sm text-white/40 font-body">
            Des voyageurs du monde entier partagent leur expérience authentique.
          </p>
        </div>

        {reviews.length > 0 && (
          <div
            className="rounded-2xl p-5 text-center shrink-0"
            style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${dest.accent_color}30`, minWidth: '130px' }}
          >
            <p className="font-display font-thin mb-1" style={{ fontSize: '2.6rem', color: dest.accent_color }}>
              {avgRating.toFixed(1)}
            </p>
            <Stars n={Math.round(avgRating)} color={dest.accent_color} />
            <p className="text-[10px] text-white/25 font-body mt-2">{reviews.length} avis</p>
          </div>
        )}
      </motion.div>

      {/* ── Liste des avis ── */}
      {reviews.length === 0 ? (
        <div
          className="rounded-2xl p-14 text-center"
          style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-4xl mb-3">✍️</p>
          <p className="text-white/40 font-body text-sm">Aucun avis pour l'instant — soyez le premier !</p>
        </div>
      ) : (
        <div className="space-y-5">
          {reviews.map((review, i) => (
            <ReviewCard
              key={review.id}
              review={review}
              accentColor={dest.accent_color}
              shadowColor={dest.shadow_color}
              index={i}
            />
          ))}
        </div>
      )}

      {/* ── CTA / Formulaire / Confirmation ── */}
      <AnimatePresence mode="wait">

        {/* Confirmation post-soumission */}
        {submitted && (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="rounded-2xl p-10 text-center"
            style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.2)' }}
          >
            <p className="text-4xl mb-3">🙏</p>
            <p className="font-display font-thin text-2xl text-white mb-2">Merci pour votre avis !</p>
            <p className="text-sm text-white/40 font-body">
              Il sera visible après validation par notre équipe (24–48h).
            </p>
          </motion.div>
        )}

        {/* Formulaire */}
        {!submitted && showForm && (
          <ReviewForm
            dest={dest}
            onSubmitted={() => { setSubmitted(true); setShowForm(false) }}
            onClose={() => setShowForm(false)}
          />
        )}

        {/* CTA initial */}
        {!submitted && !showForm && (
          <motion.div
            key="cta"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="rounded-2xl p-8 text-center"
            style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${dest.accent_color}20` }}
          >
            <p className="font-display font-thin text-2xl text-white mb-3">
              Vous avez visité {dest.name} ?
            </p>
            <p className="text-sm text-white/40 font-body mb-6">
              Partagez votre expérience avec la communauté de voyageurs Nihon.
            </p>
            <motion.button
              onClick={() => setShowForm(true)}
              whileHover={{ scale: 1.04, boxShadow: `0 0 30px ${dest.accent_color}40` }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-full text-xs tracking-widest uppercase font-body font-medium"
              style={{
                background: `linear-gradient(135deg, ${dest.accent_color}, ${dest.secondary_color})`,
                color: '#000',
              }}
            >
              Écrire un Avis
            </motion.button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
