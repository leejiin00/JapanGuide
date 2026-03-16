'use client'

// app/destination/[nom]/avis/AvisClient.tsx

import { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ReviewRow } from '@/types/database'
import { submitReviewAction } from '@/app/actions/reviews'

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

function Stars({
  n, color, interactive, onSelect,
}: {
  n: number; color: string; interactive?: boolean; onSelect?: (v: number) => void
}) {
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
            color:    s <= (hov || n) ? color : 'rgba(255,255,255,0.15)',
            fontSize: interactive ? '1.4rem' : '0.75rem',
            cursor:   interactive ? 'pointer' : 'default',
            transition: 'color 0.15s',
          }}
        >
          ★
        </span>
      ))}
    </div>
  )
}

const COUNTRIES = [
  { name: 'France',       flag: '🇫🇷' },
  { name: 'Belgique',     flag: '🇧🇪' },
  { name: 'Suisse',       flag: '🇨🇭' },
  { name: 'Canada',       flag: '🇨🇦' },
  { name: 'Allemagne',    flag: '🇩🇪' },
  { name: 'Espagne',      flag: '🇪🇸' },
  { name: 'Italie',       flag: '🇮🇹' },
  { name: 'Royaume-Uni',  flag: '🇬🇧' },
  { name: 'États-Unis',   flag: '🇺🇸' },
  { name: 'Australie',    flag: '🇦🇺' },
  { name: 'Japon',        flag: '🇯🇵' },
  { name: 'Autre',        flag: '🌍' },
]

export default function AvisClient({ dest, reviews }: Props) {
  const [showForm,   setShowForm]   = useState(false)
  const [submitted,  setSubmitted]  = useState(false)
  const [serverError, setServerError] = useState('')
  const [isPending,  startTransition] = useTransition()

  // Champs du formulaire
  const [author,    setAuthor]    = useState('')
  const [country,   setCountry]   = useState(COUNTRIES[0].name)
  const [rating,    setRating]    = useState(5)
  const [body,      setBody]      = useState('')
  const [highlight, setHighlight] = useState('')

  const avgRating = reviews.length
    ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length
    : 0

  const selectedCountry = COUNTRIES.find((c) => c.name === country) ?? COUNTRIES[0]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setServerError('')

    startTransition(async () => {
      const result = await submitReviewAction({
        destination_id:   dest.id,
        destination_slug: dest.slug,
        author,
        country,
        flag:      selectedCountry.flag,
        rating,
        body,
        highlight,
      })

      if (result.success) {
        setSubmitted(true)
        setShowForm(false)
      } else {
        setServerError(result.error)
      }
    })
  }

  const inputStyle: React.CSSProperties = {
    background:  'rgba(255,255,255,0.05)',
    border:      '1px solid rgba(255,255,255,0.1)',
    color:       '#fff',
    fontFamily:  'Outfit, sans-serif',
    fontSize:    '0.875rem',
    outline:     'none',
    transition:  'border-color 0.2s',
    width:       '100%',
    padding:     '12px 16px',
    borderRadius:'12px',
  }

  return (
    <div className="space-y-14">

      {/* ── Header ── */}
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
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -4, boxShadow: `0 20px 60px ${dest.shadow_color}` }}
                className="rounded-2xl p-7"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)' }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-lg shrink-0"
                      style={{ background: `${dest.accent_color}15`, border: `1px solid ${dest.accent_color}25` }}
                    >
                      {review.flag}
                    </div>
                    <div>
                      <p className="text-sm font-body text-white font-light">{review.author}</p>
                      <p className="text-[10px] font-body text-white/30">{review.country} · {review.review_date}</p>
                    </div>
                  </div>
                  <Stars n={review.rating} color={dest.accent_color} />
                </div>
                <blockquote
                  className="font-display font-light italic leading-relaxed mb-5"
                  style={{ fontSize: 'clamp(1rem,1.8vw,1.2rem)', color: 'rgba(255,255,255,0.75)' }}
                >
                  "{review.body}"
                </blockquote>
                <span
                  className="text-[10px] px-3 py-1 rounded-full font-body tracking-wider"
                  style={{ background: `${dest.accent_color}12`, border: `1px solid ${dest.accent_color}25`, color: dest.accent_color }}
                >
                  ✓ {review.highlight}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ── CTA / Formulaire / Confirmation ── */}
      <AnimatePresence mode="wait">

        {/* Confirmation après envoi */}
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
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="rounded-2xl p-8"
            style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${dest.accent_color}25`, backdropFilter: 'blur(20px)' }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[10px] tracking-[0.35em] uppercase font-body mb-1" style={{ color: dest.accent_color }}>
                  Votre Expérience
                </p>
                <h3 className="font-display font-thin text-2xl text-white">Écrire un Avis</h3>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="text-white/30 hover:text-white/60 font-body text-sm transition-colors"
              >
                ✕ Fermer
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid sm:grid-cols-2 gap-5">
                {/* Prénom */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-white/30 font-body mb-2">
                    Votre Prénom
                  </label>
                  <input
                    type="text" value={author} onChange={(e) => setAuthor(e.target.value)}
                    required placeholder="Marie D." style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = `${dest.accent_color}70`)}
                    onBlur={(e)  => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                  />
                </div>

                {/* Pays */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-white/30 font-body mb-2">
                    Pays
                  </label>
                  <select
                    value={country} onChange={(e) => setCountry(e.target.value)}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={(e) => (e.target.style.borderColor = `${dest.accent_color}70`)}
                    onBlur={(e)  => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.name} value={c.name} style={{ background: '#0c0820' }}>
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Note */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-white/30 font-body mb-3">
                  Note
                </label>
                <Stars n={rating} color={dest.accent_color} interactive onSelect={setRating} />
              </div>

              {/* Témoignage */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-white/30 font-body mb-2">
                  Votre Témoignage
                </label>
                <textarea
                  value={body} onChange={(e) => setBody(e.target.value)}
                  required rows={4} placeholder={`Décrivez votre expérience à ${dest.name}...`}
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={(e) => (e.target.style.borderColor = `${dest.accent_color}70`)}
                  onBlur={(e)  => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>

              {/* Moment phare */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-white/30 font-body mb-2">
                  Moment Phare
                </label>
                <input
                  type="text" value={highlight} onChange={(e) => setHighlight(e.target.value)}
                  required placeholder="ex: Fushimi Inari à l'aube" style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = `${dest.accent_color}70`)}
                  onBlur={(e)  => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>

              {/* Erreur serveur */}
              {serverError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                  className="text-xs font-body px-4 py-3 rounded-xl"
                  style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5' }}
                >
                  {serverError}
                </motion.p>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isPending}
                whileHover={{ scale: isPending ? 1 : 1.02, boxShadow: `0 0 30px ${dest.accent_color}40` }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl text-sm tracking-widest uppercase font-body font-medium"
                style={{
                  background: isPending
                    ? `${dest.accent_color}50`
                    : `linear-gradient(135deg, ${dest.accent_color}, ${dest.secondary_color})`,
                  color:  '#000',
                  cursor: isPending ? 'not-allowed' : 'pointer',
                }}
              >
                {isPending ? 'Envoi en cours...' : 'Soumettre mon Avis'}
              </motion.button>

              <p className="text-[10px] text-center text-white/20 font-body">
                Votre avis sera vérifié avant publication (24–48h).
              </p>
            </form>
          </motion.div>
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