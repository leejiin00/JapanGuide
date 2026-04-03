'use client'
// components/home/QuoteSection.tsx
// Section citation avec Torii flottant et kanjis en fond.
// Extrait de HomeClient.tsx.

import { motion } from 'framer-motion'
import KanjiLayer from '@/components/home/KanjiLayer'

/**
 * Section de citation immersive sur le Japon.
 */
export default function QuoteSection() {
  return (
    <section className="relative py-40 px-6 overflow-hidden">
      <div className="absolute inset-0" aria-hidden style={{
        background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(251,146,60,0.07) 0%, transparent 65%)',
      }} />
      <KanjiLayer />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1 }}
        >
          <motion.p
            className="text-6xl mb-10 block" aria-hidden
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            ⛩️
          </motion.p>

          <div
            className="relative py-14 px-10 rounded-3xl"
            style={{
              background:    'rgba(255,255,255,0.025)',
              border:        '1px solid rgba(251,146,60,0.12)',
              backdropFilter:'blur(16px)',
            }}
          >
            <p
              className="font-display font-thin text-white/80 italic leading-relaxed"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}
            >
              « Le Japon ne se visite pas —{' '}
              <span style={{ color: '#fb923c' }}>il se ressent.</span> »
            </p>
            <p className="text-[10px] text-white/20 tracking-widest mt-6 font-body uppercase">
              Proverbe de Voyageur
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
