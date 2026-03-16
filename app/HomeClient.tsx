'use client'

// app/HomeClient.tsx

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import DestinationCard from '@/components/DestinationCard'
import DestinationQuiz from '@/components/DestinationQuiz'
import type { DestinationWithStats } from '@/types/database'

interface Props {
  destinations: DestinationWithStats[]
}

function KanjiLayer() {
  const chars = ['日', '本', '旅', '夢', '美', '心', '道', '光', '影', '神', '風', '海', '火', '山']
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="absolute text-white/[0.025] font-display"
          style={{
            fontSize: `${40 + (i % 4) * 30}px`,
            left:     `${(i / chars.length) * 95}%`,
            top:      `${(i * 47) % 90}%`,
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

function ToriiSilhouette() {
  return (
    <svg
      viewBox="0 0 900 380"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full absolute bottom-0 opacity-[0.12] pointer-events-none"
      aria-hidden
    >
      <rect x="80"  y="55" width="740" height="22" rx="5" fill="#fb923c" />
      <rect x="115" y="32" width="670" height="16" rx="4" fill="#fb923c" />
      <rect x="160" y="77" width="22"  height="303" rx="5" fill="#fb923c" />
      <rect x="718" y="77" width="22"  height="303" rx="5" fill="#fb923c" />
      <rect x="182" y="165" width="536" height="13" rx="3" fill="#fb923c" />
      <ellipse cx="80"  cy="55" rx="28" ry="8" fill="#fb923c" />
      <ellipse cx="820" cy="55" rx="28" ry="8" fill="#fb923c" />
    </svg>
  )
}

export default function HomeClient({ destinations }: Props) {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })

  const yParallax   = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacityHero = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const scaleHero   = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const springY     = useSpring(yParallax, { stiffness: 80, damping: 25 })

  return (
    <main>
      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">

        {/* Background */}
        <motion.div className="absolute inset-0" style={{ scale: scaleHero }}>
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 50%, rgba(88,28,135,0.55) 0%, transparent 60%),
              radial-gradient(ellipse 60% 80% at 80% 30%, rgba(30,58,138,0.45) 0%, transparent 60%),
              radial-gradient(ellipse 40% 40% at 55% 85%, rgba(251,146,60,0.12) 0%, transparent 60%),
              linear-gradient(180deg, #060410 0%, #0c0820 50%, #060410 100%)
            `,
          }} />
        </motion.div>

        <KanjiLayer />

        {/* Orbs */}
        <div className="absolute rounded-full pointer-events-none blur-3xl" aria-hidden
          style={{ background: 'rgba(192,132,252,0.08)', width: 700, height: 700, top: '-15%', left: '-15%' }} />
        <div className="absolute rounded-full pointer-events-none blur-3xl" aria-hidden
          style={{ background: 'rgba(56,189,248,0.06)', width: 500, height: 500, top: '10%', right: '-10%' }} />

        {/* Torii */}
        <motion.div style={{ y: springY }} className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <ToriiSilhouette />
        </motion.div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: opacityHero }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.8em' }}
            animate={{ opacity: 1, letterSpacing: '0.4em' }}
            transition={{ duration: 1.4, delay: 0.4 }}
            className="text-xs tracking-[0.4em] uppercase mb-8 font-body"
            style={{ color: '#fb923c' }}
          >
            Guide de Voyage Immersif
          </motion.p>

          <div className="overflow-hidden mb-3">
            <motion.h1
              initial={{ y: 130 }} animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-thin leading-none clip-text"
              style={{
                fontSize:        'clamp(5rem, 14vw, 11rem)',
                backgroundImage: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.55) 50%, #fb923c 100%)',
              }}
            >
              日本
            </motion.h1>
          </div>

          <div className="overflow-hidden mb-8">
            <motion.h2
              initial={{ y: 60 }} animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-thin text-white/75 tracking-[0.15em]"
              style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3.8rem)' }}
            >
              Japon
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0 }}
            className="text-base text-white/40 max-w-lg mx-auto leading-relaxed mb-14 font-body font-light"
          >
            Là où les ombres des pagodes dansent avec les néons.
            Là où le silence des jardins de pierre répond au fracas des métropoles infinies.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.25 }}
            className="flex items-center justify-center gap-5 flex-wrap"
          >
            {/* Quiz button — remplace "Explorer" */}
            <DestinationQuiz />

            {/* Secondary CTA */}
            <motion.a
              href="/destination"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,255,255,0.08)' }}
              whileTap={{ scale: 0.97 }}
              className="px-9 py-4 rounded-full text-sm tracking-widest uppercase text-white/55 font-body"
              style={{
                background:    'rgba(255,255,255,0.05)',
                border:        '1px solid rgba(255,255,255,0.13)',
                backdropFilter:'blur(12px)',
              }}
            >
              Toutes les destinations
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden
        >
          <p className="text-[10px] tracking-widest uppercase text-white/20 font-body">Défiler</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-12"
            style={{ background: 'linear-gradient(to bottom, rgba(251,146,60,0.7), transparent)' }}
          />
        </motion.div>
      </section>

      {/* ─── STATS ─── */}
      <motion.section
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="py-16 relative"
        style={{
          background:   'rgba(255,255,255,0.02)',
          borderTop:    '1px solid rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '47',    suffix: '',  label: 'Préfectures'     },
            { value: '3 776', suffix: 'm', label: 'Mont Fuji'       },
            { value: '125',   suffix: 'M', label: 'Habitants'       },
            { value: '2 000', suffix: '+', label: "Ans d'histoire"  },
          ].map(({ value, suffix, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl font-display font-thin text-white mb-1">
                {value}<span style={{ color: '#fb923c' }}>{suffix}</span>
              </p>
              <p className="text-[10px] tracking-widest uppercase font-body" style={{ color: 'rgba(255,255,255,0.28)' }}>
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ─── DESTINATIONS ─── */}
      <section id="destinations" className="relative py-32 px-6 overflow-hidden">
        <div className="absolute rounded-full pointer-events-none blur-3xl" aria-hidden
          style={{ background: 'rgba(139,92,246,0.1)', width: 600, height: 600, top: '5%', left: '-12%' }} />
        <div className="absolute rounded-full pointer-events-none blur-3xl" aria-hidden
          style={{ background: 'rgba(251,146,60,0.07)', width: 400, height: 400, bottom: '8%', right: '-8%' }} />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="mb-20 max-w-xl"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase mb-5 font-body" style={{ color: '#fb923c' }}>
              地域 — Destinations
            </p>
            <h2 className="font-display font-thin text-white leading-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)' }}>
              Six Visages<br />
              <em className="text-white/45">d'un Même Rêve</em>
            </h2>
            <p className="text-white/38 font-body font-light text-sm leading-relaxed">
              Du chaos lumineux de Tokyo à l'éternel silence de Nara, chaque destination
              révèle une facette différente de l'âme japonaise.
            </p>
          </motion.div>

          {destinations.length === 0 ? (
            <div className="text-center py-20 text-white/30 font-body">
              <p className="text-4xl mb-4">⛩️</p>
              <p>Les destinations se chargent...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {destinations.map((dest, i) => (
                <DestinationCard key={dest.id} destination={dest} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── QUOTE ─── */}
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
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(251,146,60,0.12)', backdropFilter: 'blur(16px)' }}
            >
              <p className="font-display font-thin text-white/80 italic leading-relaxed" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}>
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

      {/* ─── FOOTER ─── */}
      <footer className="py-12 px-8 relative" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-display" style={{ color: '#fb923c' }}>日</span>
            <div>
              <p className="text-white font-light text-sm tracking-widest uppercase font-body">Nihon Guide</p>
              <p className="text-white/18 text-xs font-body">Mystique & Immersif</p>
            </div>
          </div>
          <p className="text-white/15 text-xs tracking-wider font-body text-center">
            日本への旅 — Un guide conçu pour les âmes curieuses
          </p>
          <p className="text-white/18 text-xs font-body">© 2025 Nihon Guide</p>
        </div>
      </footer>
    </main>
  )
}