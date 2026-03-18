'use client';
// Cette partie là sert à indiquer qu'on est sur un Client Component, nécessaire car on gère des états locaux (useState) et des interactions au clic pour modérer les avis.

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

// Cette partie concerne la définition stricte des propriétés (props) que ce composant va recevoir depuis le serveur. 
// J'ai fait ça pour garantir que TypeScript vérifie bien qu'on passe les bons chiffres pour les statistiques.
interface Stats {
  destinations:   number
  hotels:         number
  activities:     number
  pendingReviews: number
}

interface PendingReview {
  id:           string
  author:       string
  country:      string
  flag:         string
  rating:       number
  body:         string
  highlight:    string
  review_date:  string
  created_at:   string
  destinations?: { name: string; slug: string } | null
}

interface Props {
  stats:          Stats
  pendingReviews: PendingReview[]
}

// Cette partie là sert à créer un petit composant réutilisable uniquement dans ce fichier. 
// J'ai fait ça pour éviter de dupliquer quatre fois le même bloc de code (les classes Tailwind, les animations framer-motion) pour chaque statistique en haut du dashboard.
function StatCard({ value, label, icon, color }: { value: number; label: string; icon: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: `0 20px 50px ${color}20` }}
      className="rounded-2xl p-6"
      style={{ background: 'rgba(255,255,255,0.035)', border: `1px solid ${color}25` }}
    >
      <span className="text-3xl block mb-3">{icon}</span>
      <p className="font-display font-thin text-3xl text-white mb-1" style={{ color }}>{value}</p>
      <p className="text-xs text-white/35 font-body uppercase tracking-wider">{label}</p>
    </motion.div>
  )
}

export default function AdminDashboardClient({ stats, pendingReviews: initialReviews }: Props) {
  const router = useRouter()
  // Cette partie concerne l'initialisation de l'état local avec les données venues du serveur.
  // J'ai fait ça pour pouvoir retirer un avis de la liste instantanément (via setReviews) quand l'admin clique sur "Approuver" ou "Supprimer".
  const [reviews, setReviews]   = useState<PendingReview[]>(initialReviews)
  const [processing, setProc]   = useState<string | null>(null)

  // Cette partie concerne l'approbation rapide d'un avis depuis le dashboard. C'est la même logique que sur la page complète des avis.
  const handleApprove = async (reviewId: string) => {
    setProc(reviewId)
    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from('reviews') as any).update({ approved: true }).eq('id', reviewId)
    setReviews((prev) => prev.filter((r) => r.id !== reviewId))
    setProc(null)
    router.refresh()
  }

  // Cette partie là sert à supprimer un avis depuis le dashboard.
  const handleDelete = async (reviewId: string) => {
    setProc(reviewId)
    const supabase = createClient()
    await supabase.from('reviews').delete().eq('id', reviewId)
    setReviews((prev) => prev.filter((r) => r.id !== reviewId))
    setProc(null)
    router.refresh()
  }

  return (
    <div className="space-y-10">
      <div>
        <p className="text-[10px] tracking-[0.4em] uppercase font-body mb-2" style={{ color: '#fb923c' }}>Dashboard</p>
        <h1 className="font-display font-thin text-white" style={{ fontSize: '2.5rem' }}>Vue d'ensemble</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Cette partie là sert à afficher les 4 cartes de statistiques en appelant le sous-composant StatCard qu'on a défini plus haut. */}
        <StatCard value={stats.destinations}   label="Destinations"    icon="🗾" color="#fb923c" />
        <StatCard value={stats.hotels}         label="Hôtels"          icon="🏨" color="#c084fc" />
        <StatCard value={stats.activities}     label="Activités"       icon="🎌" color="#38bdf8" />
        <StatCard value={stats.pendingReviews} label="Avis en attente" icon="⭐" color="#f472b6" />
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase font-body mb-1" style={{ color: '#f472b6' }}>Modération</p>
            <h2 className="font-display font-thin text-white text-2xl">Avis en Attente</h2>
          </div>
          {reviews.length > 0 && (
            <span className="px-3 py-1 rounded-full text-xs font-body" style={{ background: 'rgba(244,114,182,0.1)', border: '1px solid rgba(244,114,182,0.25)', color: '#f472b6' }}>
              {reviews.length} à traiter
            </span>
          )}
        </div>

        {/* Cette partie concerne l'affichage conditionnel : on affiche un gros "✅" si la liste des avis en attente (reviews) est vide. */}
        {reviews.length === 0 ? (
          <div className="rounded-2xl p-12 text-center" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-4xl mb-3">✅</p>
            <p className="text-white/40 font-body text-sm">Aucun avis en attente de modération.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                // Cette partie là sert à créer un effet d'apparition en cascade pour les avis en attente, en utilisant l'index (i) pour retarder l'animation.
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl p-6"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-lg">{review.flag}</span>
                      <div>
                        <span className="text-sm text-white font-body">{review.author}</span>
                        <span className="text-white/30 font-body text-xs mx-2">·</span>
                        <span className="text-white/30 font-body text-xs">{review.country}</span>
                        {review.destinations && (
                          <>
                            <span className="text-white/20 font-body text-xs mx-2">→</span>
                            <span className="text-xs font-body" style={{ color: '#fb923c' }}>{review.destinations.name}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {[1,2,3,4,5].map((s) => (
                        <span key={s} className="text-xs" style={{ color: s <= review.rating ? '#fbbf24' : 'rgba(255,255,255,0.1)' }}>★</span>
                      ))}
                    </div>
                    <p className="text-sm text-white/60 font-body leading-relaxed mb-2 line-clamp-3">"{review.body}"</p>
                    <span className="text-[10px] px-2 py-1 rounded-full font-body" style={{ background: 'rgba(251,146,60,0.08)', border: '1px solid rgba(251,146,60,0.2)', color: '#fb923c' }}>
                      {review.highlight}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <motion.button
                      onClick={() => handleApprove(review.id)}
                      disabled={processing === review.id}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 rounded-xl text-xs tracking-wider font-body font-medium"
                      style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)', color: '#34d399', cursor: processing === review.id ? 'not-allowed' : 'pointer' }}
                    >
                      {processing === review.id ? '...' : '✓ Approuver'}
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(review.id)}
                      disabled={processing === review.id}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 rounded-xl text-xs tracking-wider font-body font-medium"
                      style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5', cursor: processing === review.id ? 'not-allowed' : 'pointer' }}
                    >
                      ✕ Supprimer
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Cette partie concerne les liens de navigation rapides vers les autres sections de l'administration. 
            Utiliser une balise <a> ou un composant <Link> de Next.js imbriqué dans une motion.a permet d'ajouter une animation au survol très facilement. */}
        {[
          { href: '/admin/destinations', label: 'Gérer les Destinations', icon: '🗾', color: '#fb923c' },
          { href: '/admin/avis',         label: 'Tous les Avis',          icon: '⭐', color: '#f472b6' },
        ].map(({ href, label, icon, color }) => (
          <motion.a
            key={href} href={href}
            whileHover={{ y: -4, boxShadow: `0 16px 40px ${color}20` }}
            className="rounded-2xl p-6 flex items-center gap-4 cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${color}20` }}
          >
            <span className="text-2xl">{icon}</span>
            <span className="text-sm font-body" style={{ color }}>{label}</span>
            <span className="ml-auto text-white/20 font-body">→</span>
          </motion.a>
        ))}
      </div>
    </div>
  )
}