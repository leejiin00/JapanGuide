'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import type { ReviewRow } from '@/types/database';

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

function Stars({ n, color, interactive, onSelect }: { n: number; color: string; interactive?: boolean; onSelect?: (v: number) => void }) {
  const [hov, setHov] = useState(0)
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map((s) => (
        <span
          key={s}
          onClick={() => onSelect?.(s)}
          onMouseEnter={() => interactive && setHov(s)}
          onMouseLeave={() => interactive && setHov(0)}
          style={{ color: s <= (hov || n) ? color : 'rgba(255,255,255,0.15)', fontSize: interactive ? '1.25rem' : '0.75rem', cursor: interactive ? 'pointer' : 'default' }}
        >★</span>
      ))}
    </div>
  )
}

const COUNTRIES = [
  { name: 'France',      flag: '🇫🇷' },
  { name: 'Belgique',    flag: '🇧🇪' },
  { name: 'Suisse',      flag: '🇨🇭' },
  { name: 'Canada',      flag: '🇨🇦' },
  { name: 'Allemagne',   flag: '🇩🇪' },
  { name: 'Espagne',     flag: '🇪🇸' },
  { name: 'Italie',      flag: '🇮🇹' },
  { name: 'Royaume-Uni', flag: '🇬🇧' },
  { name: 'États-Unis',  flag: '🇺🇸' },
  { name: 'Australie',   flag: '🇦🇺' },
  { name: 'Japon',       flag: '🇯🇵' },
  { name: 'Autre',       flag: '🌍' },
]

export default function AvisClient({ dest, reviews: initialReviews }: Props) {
  const [reviews, setReviews]       = useState<ReviewRow[]>(initialReviews)
  const [showForm, setShowForm]     = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const [loading, setLoading]       = useState(false)
  const [author, setAuthor]         = useState('')
  const [country, setCountry]       = useState(COUNTRIES[0].name)
  const [rating, setRating]         = useState(5)
  const [body, setBody]             = useState('')
  const [highlight, setHighlight]   = useState('')

  const avgRating = reviews.length
    ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length
    : 0

  const selectedCountry = COUNTRIES.find((c) => c.name === country) ?? COUNTRIES[0]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!author || !body || !highlight) return
    setLoading(true)

    const reviewDate = new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    const supabase   = createClient()

    // On caste en `any` car le type généré ne connaît pas encore la table
    // tant que `supabase gen types` n'a pas été lancé avec votre projet.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from('reviews') as any).insert({
      destination_id: dest.id,
      author,
      country,
      flag:        selectedCountry.flag,
      rating,
      review_date: reviewDate,
      body,
      highlight,
      approved:    false,
    })

    setLoading(false)
    if (!error) {
      setSubmitted(true)
      setShowForm(false)
    }
  }

  const inputStyle = {
    background:  'rgba(255,255,255,0.05)',
    border:      '1px solid rgba(255,255,255,0.1)',
    color:       '#fff',
    fontFamily:  'Outfit, sans-serif',
    fontSize:    '0.875rem',
    outline:     'none',
    transition:  'border-color 0.2s',
  }

  return (
    <div className="space-y-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
      >
        <div>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body mb-2" style={{ color: dest.accent_color }}>口コミ — Témoignages</p>
          <h2 className="font-display font-thin text-white mb-2" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>Ils ont vécu {dest.name}</h2>
          <p className="text-sm text-white/40 font-body">Des voyageurs du monde entier partagent leur expérience authentique.</p>
        </div>
        {reviews.length > 0 && (
          <div className="rounded-2xl p-5 text-center shrink-0" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${dest.accent_color}30`, minWidth: '130px' }}>
            <p className="font-display font-thin mb-1" style={{ fontSize: '2.6rem', color: dest.accent_color }}>{avgRating.toFixed(1)}</p>
            <Stars n={Math.round(avgRating)} color={dest.accent_color} />
            <p className="text-[10px] text-white/25 font-body mt-2">{reviews.length} avis</p>
          </div>
        )}
      </motion.div>

      {reviews.length === 0 ? (
        <div className="rounded-2xl p-14 text-center" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-4xl mb-3">✍️</p>
          <p className="text-white/40 font-body text-sm">Aucun avis pour l'instant — soyez le premier !</p>
        </div>
      ) : (
        <div className="space-y-5">
          {reviews.map((review, i) => (
            <motion.div key={review.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <motion.div
                whileHover={{ y: -4, boxShadow: `0 20px 60px ${dest.shadow_color}` }}
                className="rounded-2xl p-7"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)' }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-lg shrink-0"
                      style={{ background: `${dest.accent_color}15`, border: `1px solid ${dest.accent_color}25` }}>
                      {review.flag}
                    </div>
                    <div>
                      <p className="text-sm font-body text-white font-light">{review.author}</p>
                      <p className="text-[10px] font-body text-white/30">{review.country} · {review.review_date}</p>
                    </div>
                  </div>
                  <Stars n={review.rating} color={dest.accent_color} />
                </div>
                <blockquote className="font-display font-light italic leading-relaxed mb-5"
                  style={{ fontSize: 'clamp(1rem,1.8vw,1.2rem)', color: 'rgba(255,255,255,0.75)' }}>
                  "{review.body}"
                </blockquote>
                <span className="text-[10px] px-3 py-1 rounded-full font-body tracking-wider"
                  style={{ background: `${dest.accent_color}12`, border: `1px solid ${dest.accent_color}25`, color: dest.accent_color }}>
                  ✓ {review.highlight}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div key="thanks" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="rounded-2xl p-10 text-center"
            style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.2)' }}>
            <p className="text-4xl mb-3">🙏</p>
            <p className="font-display font-thin text-2xl text-white mb-2">Merci pour votre avis !</p>
            <p className="text-sm text-white/40 font-body">Il sera visible après validation par notre équipe.</p>
          </motion.div>
        ) : showForm ? (
          <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="rounded-2xl p-8"
            style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${dest.accent_color}25`, backdropFilter: 'blur(20px)' }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[10px] tracking-[0.35em] uppercase font-body mb-1" style={{ color: dest.accent_color }}>Votre Expérience</p>
                <h3 className="font-display font-thin text-2xl text-white">Écrire un Avis</h3>
              </div>
              <button onClick={() => setShowForm(false)} className="text-white/30 hover:text-white/60 font-body text-sm transition-colors">✕ Fermer</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-white/30 font-body mb-2">Votre Prénom</label>
                  <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required placeholder="Marie D."
                    className="w-full px-4 py-3 rounded-xl" style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = `${dest.accent_color}60`)}
                    onBlur={(e)  => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-white/30 font-body mb-2">Pays</label>
                  <select value={country} onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl" style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={(e) => (e.target.style.borderColor = `${dest.accent_color}60`)}
                    onBlur={(e)  => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}>
                    {COUNTRIES.map((c) => (
                      <option key={c.name} value={c.name} style={{ background: '#0c0820' }}>{c.flag} {c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-white/30 font-body mb-3">Note</label>
                <Stars n={rating} color={dest.accent_color} interactive onSelect={setRating} />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-white/30 font-body mb-2">Votre Témoignage</label>
                <textarea value={body} onChange={(e) => setBody(e.target.value)} required rows={4}
                  placeholder={`Décrivez votre expérience à ${dest.name}...`}
                  className="w-full px-4 py-3 rounded-xl resize-none" style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = `${dest.accent_color}60`)}
                  onBlur={(e)  => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-white/30 font-body mb-2">Moment Phare</label>
                <input type="text" value={highlight} onChange={(e) => setHighlight(e.target.value)} required
                  placeholder="ex: Fushimi Inari à l'aube"
                  className="w-full px-4 py-3 rounded-xl" style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = `${dest.accent_color}60`)}
                  onBlur={(e)  => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
              </div>
              <motion.button type="submit" disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02, boxShadow: `0 0 30px ${dest.accent_color}40` }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl text-sm tracking-widest uppercase font-body font-medium"
                style={{ background: loading ? `${dest.accent_color}50` : `linear-gradient(135deg, ${dest.accent_color}, ${dest.secondary_color})`, color: '#000', cursor: loading ? 'not-allowed' : 'pointer' }}>
                {loading ? 'Envoi...' : 'Soumettre mon Avis'}
              </motion.button>
              <p className="text-[10px] text-center text-white/20 font-body">Votre avis sera vérifié avant publication (24–48h).</p>
            </form>
          </motion.div>
        ) : (
          <motion.div key="cta" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="rounded-2xl p-8 text-center"
            style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${dest.accent_color}20` }}>
            <p className="font-display font-thin text-2xl text-white mb-3">Vous avez visité {dest.name} ?</p>
            <p className="text-sm text-white/40 font-body mb-6">Partagez votre expérience avec la communauté de voyageurs Nihon.</p>
            <motion.button onClick={() => setShowForm(true)}
              whileHover={{ scale: 1.04, boxShadow: `0 0 30px ${dest.accent_color}40` }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-full text-xs tracking-widest uppercase font-body font-medium"
              style={{ background: `linear-gradient(135deg, ${dest.accent_color}, ${dest.secondary_color})`, color: '#000' }}>
              Écrire un Avis
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}