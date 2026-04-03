'use client'
// components/home/DestinationsSection.tsx
// Grille des 6 premières destinations avec bouton "Voir plus".
// Extrait de HomeClient.tsx.

import { motion } from 'framer-motion'
import DestinationCard from '@/components/DestinationCard'
import type { DestinationWithStats } from '@/types/database'

interface DestinationsSectionProps {
  destinations: DestinationWithStats[]
}

/**
 * Affiche les 6 premières destinations en grille responsive.
 * Si plus de 6 destinations existent, un bouton vers /destination est affiché.
 */
export default function DestinationsSection({ destinations }: DestinationsSectionProps) {
  return (
    <section id="destinations" className="relative py-32 px-6 overflow-hidden">
      {/* Orbes décoratives */}
      <div className="absolute rounded-full pointer-events-none blur-3xl" aria-hidden
        style={{ background: 'rgba(139,92,246,0.1)', width: 600, height: 600, top: '5%', left: '-12%' }} />
      <div className="absolute rounded-full pointer-events-none blur-3xl" aria-hidden
        style={{ background: 'rgba(251,146,60,0.07)', width: 400, height: 400, bottom: '8%', right: '-8%' }} />

      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="mb-20 max-w-xl"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase mb-5 font-body" style={{ color: '#fb923c' }}>
            地域 — Destinations
          </p>
          <h2 className="font-display font-thin text-white leading-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)' }}>
            Nos Coups<br />
            <em className="text-white/45">de Cœur</em>
          </h2>
          <p className="text-white/38 font-body font-light text-sm leading-relaxed">
            Du chaos lumineux de Tokyo à l'éternel silence de Nara, une sélection de
            destinations pour commencer votre exploration du Japon.
          </p>
        </motion.div>

        {/* Grille ou état vide */}
        {destinations.length === 0 ? (
          <div className="text-center py-20 text-white/30 font-body">
            <p className="text-4xl mb-4">⛩️</p>
            <p>Les destinations se chargent...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {destinations.slice(0, 6).map((dest, i) => (
                <DestinationCard key={dest.id} destination={dest} index={i} />
              ))}
            </div>

            {/* Bouton "Voir plus" si plus de 6 destinations */}
            {destinations.length > 6 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center mt-12"
              >
                <motion.a
                  href="/destination"
                  whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(251,146,60,0.35)' }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm tracking-widest uppercase font-body"
                  style={{
                    background:    'rgba(255,255,255,0.05)',
                    border:        '1px solid rgba(251,146,60,0.3)',
                    color:         '#fb923c',
                    backdropFilter:'blur(12px)',
                  }}
                >
                  Voir les {destinations.length} destinations
                  <span>→</span>
                </motion.a>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
