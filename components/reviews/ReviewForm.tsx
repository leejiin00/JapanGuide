'use client'
// components/reviews/ReviewForm.tsx
// Formulaire de soumission d'avis voyageur.
// Extrait de AvisClient.tsx — gère son propre état interne et appelle la Server Action.

import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { submitReviewAction } from '@/app/actions/reviews'
import Stars from '@/components/ui/Stars'

interface DestMeta {
  id:              string
  slug:            string
  name:            string
  accent_color:    string
  secondary_color: string
}

interface ReviewFormProps {
  dest:        DestMeta
  onSubmitted: () => void
  onClose:     () => void
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

const inputStyle: React.CSSProperties = {
  background:   'rgba(255,255,255,0.05)',
  border:       '1px solid rgba(255,255,255,0.1)',
  color:        '#fff',
  fontFamily:   'Outfit, sans-serif',
  fontSize:     '0.875rem',
  outline:      'none',
  transition:   'border-color 0.2s',
  width:        '100%',
  padding:      '12px 16px',
  borderRadius: '12px',
}

/**
 * Formulaire d'avis avec validation et appel à la Server Action.
 * Notifie le parent via `onSubmitted` en cas de succès ou `onClose` pour fermer.
 */
export default function ReviewForm({ dest, onSubmitted, onClose }: ReviewFormProps) {
  const [serverError,  setServerError]  = useState('')
  const [isPending,    startTransition] = useTransition()

  // Champs contrôlés du formulaire
  const [author,    setAuthor]    = useState('')
  const [country,   setCountry]   = useState(COUNTRIES[0].name)
  const [rating,    setRating]    = useState(5)
  const [body,      setBody]      = useState('')
  const [highlight, setHighlight] = useState('')

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
        onSubmitted()
      } else {
        setServerError(result.error)
      }
    })
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = `${dest.accent_color}70`
  }
  const handleBlur  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.1)'
  }

  return (
    <motion.div
      key="form"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      className="rounded-2xl p-8"
      style={{
        background:    'rgba(255,255,255,0.03)',
        border:        `1px solid ${dest.accent_color}25`,
        backdropFilter:'blur(20px)',
      }}
    >
      {/* Header du formulaire */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] tracking-[0.35em] uppercase font-body mb-1" style={{ color: dest.accent_color }}>
            Votre Expérience
          </p>
          <h3 className="font-display font-thin text-2xl text-white">Écrire un Avis</h3>
        </div>
        <button
          onClick={onClose}
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
              onFocus={handleFocus} onBlur={handleBlur}
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
              onFocus={handleFocus} onBlur={handleBlur}
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
            onFocus={handleFocus} onBlur={handleBlur}
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
            onFocus={handleFocus} onBlur={handleBlur}
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
  )
}
