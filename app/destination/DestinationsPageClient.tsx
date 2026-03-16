'use client'

// app/destinations/DestinationsPageClient.tsx

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import DestinationCard from '@/components/DestinationCard'
import type { DestinationWithStats } from '@/types/database'

interface Props {
  destinations: DestinationWithStats[]
}

const REGIONS = ['Toutes', 'Kansai', 'Kantō', 'Chūgoku']

export default function DestinationsPageClient({ destinations }: Props) {
  const [search,        setSearch]        = useState('')
  const [activeRegion,  setActiveRegion]  = useState('Toutes')

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      const matchRegion = activeRegion === 'Toutes' || d.region === activeRegion
      const matchSearch = search.trim() === '' ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      return matchRegion && matchSearch
    })
  }, [destinations, activeRegion, search])

  return (
    <main className="min-h-screen pt-28 pb-20">

      {/* ── Hero ── */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="text-[10px] tracking-[0.4em] uppercase font-body mb-4"
            style={{ color: '#fb923c' }}
          >
            地域 — Toutes les Destinations
          </p>
          <h1
            className="font-display font-thin text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Explorez le Japon
          </h1>
          <p className="text-white/40 font-body font-light text-base max-w-xl">
            {destinations.length} destinations sélectionnées pour leur authenticité,
            leur beauté et leur capacité à vous transformer.
          </p>
        </motion.div>
      </div>

      {/* ── Filters ── */}
      <div
        className="sticky top-20 z-10 mb-12"
        style={{
          background:    'rgba(6,4,16,0.85)',
          backdropFilter:'blur(20px)',
          borderBottom:  '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">

          {/* Search */}
          <div className="relative shrink-0 w-full sm:w-64">
            <span
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 text-sm pointer-events-none"
            >
              🔍
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une ville, un tag..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-body text-white placeholder-white/20 outline-none transition-all"
              style={{
                background:  'rgba(255,255,255,0.05)',
                border:      '1px solid rgba(255,255,255,0.1)',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(251,146,60,0.5)')}
              onBlur={(e)  => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
          </div>

          {/* Region filters */}
          <div className="flex gap-2 flex-wrap">
            {REGIONS.map((region) => (
              <motion.button
                key={region}
                onClick={() => setActiveRegion(region)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2 rounded-full text-xs tracking-wider font-body transition-all"
                style={{
                  background: activeRegion === region
                    ? 'rgba(251,146,60,0.15)'
                    : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${activeRegion === region
                    ? 'rgba(251,146,60,0.45)'
                    : 'rgba(255,255,255,0.08)'}`,
                  color: activeRegion === region
                    ? '#fb923c'
                    : 'rgba(255,255,255,0.4)',
                }}
              >
                {region}
              </motion.button>
            ))}
          </div>

          {/* Count */}
          <p className="text-[10px] text-white/25 font-body ml-auto hidden sm:block">
            {filtered.length} destination{filtered.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-7xl mx-auto px-6">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-white/40 font-body text-sm">
              Aucune destination ne correspond à votre recherche.
            </p>
            <button
              onClick={() => { setSearch(''); setActiveRegion('Toutes') }}
              className="mt-4 text-xs font-body tracking-wider underline underline-offset-4"
              style={{ color: '#fb923c' }}
            >
              Réinitialiser les filtres
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((dest, i) => (
              <DestinationCard key={dest.id} destination={dest} index={i} />
            ))}
          </div>
        )}
      </div>

    </main>
  )
}