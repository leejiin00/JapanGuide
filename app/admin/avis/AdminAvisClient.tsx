'use client';
// Cette partie là sert à indiquer à Next.js qu'on est côté client (navigateur). C'est indispensable car on utilise des hooks d'état (useState) et d'interactivité.

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { approveReviewAction, deleteReviewAction } from '@/app/actions/admin';

// Cette partie concerne le typage TypeScript de notre objet "Review" tel qu'il revient de la base de données.
interface Review {
  id:           string
  author:       string
  country:      string
  flag:         string
  rating:       number
  body:         string
  highlight:    string
  review_date:  string
  approved:     boolean
  created_at:   string
  destinations: { name: string; slug: string; accent_color: string } | null
}

interface Props { reviews: Review[] }

type Filter = 'all' | 'pending' | 'approved'

export default function AdminAvisClient({ reviews: initial }: Props) {
  const router = useRouter()
  // Cette partie concerne la gestion de l'état local du composant. On initialise les avis avec ce qui vient du serveur (initial).
  const [reviews, setReviews] = useState<Review[]>(initial)
  const [filter, setFilter]   = useState<Filter>('pending')
  
  // J'ai fait ça pour garder en mémoire l'ID de l'avis en cours de traitement, afin de désactiver les boutons et éviter qu'un utilisateur clique deux fois.
  const [processing, setProc] = useState<string | null>(null)

  // Cette partie là sert à filtrer le tableau d'avis affiché en fonction de l'onglet sélectionné (En attente, Approuvés, Tous).
  const filtered = reviews.filter((r) => {
    if (filter === 'pending')  return !r.approved
    if (filter === 'approved') return r.approved
    return true
  })

  const counts = {
    all:      reviews.length,
    pending:  reviews.filter((r) => !r.approved).length,
    approved: reviews.filter((r) => r.approved).length,
  }

  // Approbation via Server Action — createAdminClient() côté serveur uniquement.
  // Mise à jour optimiste de l'UI pour une réactivité immédiate.
  const approve = async (id: string) => {
    if (processing) return
    setProc(id)
    try {
      const result = await approveReviewAction(id)
      if (!result.success) {
        console.error('[approve]', result.error)
        return
      }
      setReviews((prev) => prev.map((r) => r.id === id ? { ...r, approved: true } : r))
      router.refresh()
    } catch (err) {
      console.error('[approve] Erreur inattendue:', err)
    } finally {
      setProc(null)
    }
  }

  // Suppression via Server Action — createAdminClient() côté serveur uniquement.
  const remove = async (id: string) => {
    if (!confirm('Supprimer cet avis définitivement ?')) return
    if (processing) return
    setProc(id)
    try {
      const result = await deleteReviewAction(id)
      if (!result.success) {
        console.error('[remove]', result.error)
        return
      }
      setReviews((prev) => prev.filter((r) => r.id !== id))
      router.refresh()
    } catch (err) {
      console.error('[remove] Erreur inattendue:', err)
    } finally {
      setProc(null)
    }
  }

  const tabs: { key: Filter; label: string }[] = [
    { key: 'pending',  label: `En attente (${counts.pending})`  },
    { key: 'approved', label: `Approuvés (${counts.approved})`  },
    { key: 'all',      label: `Tous (${counts.all})`            },
  ]

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[10px] tracking-[0.4em] uppercase font-body mb-2" style={{ color: '#fb923c' }}>Modération</p>
        <h1 className="font-display font-thin text-white" style={{ fontSize: '2.5rem' }}>Tous les Avis</h1>
      </div>

      <div className="flex gap-2 flex-wrap">
        {tabs.map(({ key, label }) => (
          <motion.button key={key} onClick={() => setFilter(key)} whileHover={{ scale: 1.02 }}
            className="px-5 py-2.5 rounded-full text-xs tracking-wider font-body"
            style={{
              background: filter === key ? 'rgba(251,146,60,0.12)' : 'rgba(255,255,255,0.04)',
              border:     `1px solid ${filter === key ? 'rgba(251,146,60,0.4)' : 'rgba(255,255,255,0.08)'}`,
              color:      filter === key ? '#fb923c' : 'rgba(255,255,255,0.4)',
            }}>
            {label}
          </motion.button>
        ))}
      </div>

      {/* Cette partie concerne les animations de sortie. AnimatePresence est nécessaire pour que framer-motion puisse animer un élément qui est supprimé du DOM (quand on approuve ou supprime un avis). */}
      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="rounded-2xl p-14 text-center"
            style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-3xl mb-3">✅</p>
            <p className="text-white/40 font-body text-sm">Aucun avis dans cette catégorie.</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filtered.map((review, i) => {
              const accentColor = review.destinations?.accent_color ?? '#fb923c'
              return (
                <motion.div key={review.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }} transition={{ delay: i * 0.04 }}
                  className="rounded-2xl p-6"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span className="text-xl">{review.flag}</span>
                        <div>
                          <span className="text-sm text-white font-body">{review.author}</span>
                          <span className="text-white/30 font-body text-xs mx-2">·</span>
                          <span className="text-white/30 font-body text-xs">{review.country}</span>
                        </div>
                        {review.destinations && (
                          <span className="text-xs font-body px-2 py-0.5 rounded-full"
                            style={{ background: `${accentColor}12`, border: `1px solid ${accentColor}25`, color: accentColor }}>
                            {review.destinations.name}
                          </span>
                        )}
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-body`}
                          style={{
                            background: review.approved ? 'rgba(52,211,153,0.1)'  : 'rgba(251,191,36,0.1)',
                            border:     review.approved ? '1px solid rgba(52,211,153,0.25)' : '1px solid rgba(251,191,36,0.25)',
                            color:      review.approved ? '#34d399' : '#fbbf24',
                          }}>
                          {review.approved ? '✓ Approuvé' : '⏳ En attente'}
                        </span>
                      </div>
                      <div className="flex gap-0.5 mb-2">
                        {[1,2,3,4,5].map((s) => (
                          <span key={s} className="text-xs" style={{ color: s <= review.rating ? '#fbbf24' : 'rgba(255,255,255,0.1)' }}>★</span>
                        ))}
                        <span className="text-[10px] text-white/25 font-body ml-2">{review.review_date}</span>
                      </div>
                      <p className="text-sm text-white/55 font-body leading-relaxed mb-2 line-clamp-2">"{review.body}"</p>
                      <span className="text-[10px] font-body" style={{ color: accentColor }}>✓ {review.highlight}</span>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      {!review.approved && (
                        <motion.button onClick={() => approve(review.id)} disabled={processing === review.id}
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2 rounded-xl text-[10px] tracking-wider font-body font-medium"
                          style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)', color: '#34d399', cursor: processing === review.id ? 'not-allowed' : 'pointer' }}>
                          {processing === review.id ? '...' : '✓ Approuver'}
                        </motion.button>
                      )}
                      <motion.button onClick={() => remove(review.id)} disabled={processing === review.id}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 rounded-xl text-[10px] tracking-wider font-body font-medium"
                        style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.22)', color: '#fca5a5', cursor: processing === review.id ? 'not-allowed' : 'pointer' }}>
                        ✕ Supprimer
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}