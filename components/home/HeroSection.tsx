'use client'
// components/home/HeroSection.tsx
// Section hero plein écran avec parallaxe, kanjis flottants et Torii SVG.
// Extrait de HomeClient.tsx.

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import DestinationQuiz from '@/components/DestinationQuiz'
import KanjiLayer from '@/components/home/KanjiLayer'

/** Silhouette SVG d'un Torii — décoration de bas de page hero */
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

/**
 * Hero plein écran avec effet parallaxe au scroll, kanjis flottants, Torii et CTA.
 */
export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const yParallax   = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacityHero = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const scaleHero   = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const springY     = useSpring(yParallax, { stiffness: 80, damping: 25 })

  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">

      {/* Fond dégradé avec zoom au scroll */}
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

      {/* Orbes lumineuses */}
      <div className="absolute rounded-full pointer-events-none blur-3xl" aria-hidden
        style={{ background: 'rgba(192,132,252,0.08)', width: 700, height: 700, top: '-15%', left: '-15%' }} />
      <div className="absolute rounded-full pointer-events-none blur-3xl" aria-hidden
        style={{ background: 'rgba(56,189,248,0.06)', width: 500, height: 500, top: '10%', right: '-10%' }} />

      {/* Torii avec parallaxe doux */}
      <motion.div style={{ y: springY }} className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <ToriiSilhouette />
      </motion.div>

      {/* Contenu hero — disparaît au scroll */}
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.25 }}
          className="flex items-center justify-center gap-5 flex-wrap"
        >
          <DestinationQuiz />

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

      {/* Indicateur de scroll */}
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
  )
}
