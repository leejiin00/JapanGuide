'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { getDestination } from '@/data/destinations';

interface Props {
  params: Promise<{ nom: string }>;
}

function StarRating({ stars, color }: { stars: number; color: string }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <span
          key={s}
          className="text-xs"
          style={{ color: s <= stars ? color : 'rgba(255,255,255,0.15)' }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function HotelsPage({ params }: Props) {
  const { nom } = use(params);
  const dest    = getDestination(nom);
  if (!dest) notFound();

  const [activeHotel, setActiveHotel] = useState(0);
  const hotel = dest.hotels[activeHotel];

  return (
    <div className="space-y-14">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p
          className="text-[10px] tracking-[0.35em] uppercase font-body mb-2"
          style={{ color: dest.accentColor }}
        >
          宿泊 — Hébergements
        </p>
        <h2
          className="font-display font-thin text-white mb-3"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
        >
          Où Dormir à {dest.name}
        </h2>
        <p className="text-sm text-white/40 font-body max-w-xl">
          Une sélection rigoureuse pour chaque budget et chaque envie — de l'authenticité
          absolue du ryokan au design épuré du boutique hotel.
        </p>
      </motion.div>

      {/* Hotel tabs */}
      <div className="flex gap-2 flex-wrap">
        {dest.hotels.map((h, i) => (
          <motion.button
            key={h.name}
            onClick={() => setActiveHotel(i)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative px-5 py-2.5 rounded-full text-xs tracking-wider font-body transition-all"
            style={{
              background: i === activeHotel ? `${dest.accentColor}18` : 'rgba(255,255,255,0.04)',
              border: `1px solid ${i === activeHotel ? dest.accentColor + '50' : 'rgba(255,255,255,0.08)'}`,
              color: i === activeHotel ? dest.accentColor : 'rgba(255,255,255,0.4)',
            }}
          >
            {h.name}
          </motion.button>
        ))}
      </div>

      {/* Active hotel card */}
      <motion.div
        key={activeHotel}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-5 gap-8"
      >
        {/* Main info */}
        <div
          className="md:col-span-3 rounded-2xl p-8"
          style={{
            background: 'rgba(255,255,255,0.035)',
            border: `1px solid ${hotel.accentColor}30`,
            backdropFilter: 'blur(20px)',
            boxShadow: `0 8px 40px ${hotel.accentColor}15`,
          }}
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <p
                className="text-[10px] tracking-[0.3em] uppercase font-body mb-1"
                style={{ color: hotel.accentColor }}
              >
                {hotel.type}
              </p>
              <h3
                className="font-display font-light text-white"
                style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
              >
                {hotel.name}
              </h3>
            </div>
            <div className="text-right">
              <StarRating stars={hotel.stars} color={hotel.accentColor} />
              <p
                className="text-sm font-body mt-1"
                style={{ color: hotel.accentColor }}
              >
                {hotel.priceRange}
              </p>
            </div>
          </div>

          <p className="text-sm text-white/50 font-body leading-relaxed mb-8">
            {hotel.description}
          </p>

          {/* Highlights */}
          <div>
            <p
              className="text-[10px] tracking-[0.3em] uppercase font-body mb-4"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Points forts
            </p>
            <div className="grid grid-cols-2 gap-2">
              {hotel.highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-center gap-3 rounded-xl px-4 py-3"
                  style={{ background: `${hotel.accentColor}08` }}
                >
                  <span className="text-sm" style={{ color: hotel.accentColor }}>✓</span>
                  <span className="text-xs text-white/60 font-body">{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="mt-8 h-px"
            style={{ background: `linear-gradient(to right, ${hotel.accentColor}40, transparent)` }}
          />

          <motion.button
            whileHover={{ scale: 1.03, boxShadow: `0 0 30px ${hotel.accentColor}40` }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 px-7 py-3 rounded-full text-xs tracking-widest uppercase font-body font-medium"
            style={{
              background: `linear-gradient(135deg, ${hotel.accentColor}, ${dest.secondaryColor})`,
              color: '#000',
            }}
          >
            Réserver cet hôtel
          </motion.button>
        </div>

        {/* Side info */}
        <div className="md:col-span-2 space-y-4">
          {/* Price context */}
          <div
            className="rounded-xl p-6"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <p
              className="text-[10px] uppercase tracking-[0.3em] font-body mb-4"
              style={{ color: dest.accentColor }}
            >
              Budget Estimé
            </p>
            <p
              className="font-display font-thin text-white mb-1"
              style={{ fontSize: '1.6rem', color: hotel.accentColor }}
            >
              {hotel.priceRange}
            </p>
            <p className="text-xs text-white/30 font-body">par nuit, pour 2 personnes</p>
            <div className="mt-4 text-xs text-white/40 font-body space-y-1">
              <p>✓ Taxes incluses</p>
              <p>✓ Petit-déjeuner souvent inclus</p>
              <p>⚠ Réservez 3–6 mois à l'avance</p>
            </div>
          </div>

          {/* All hotels mini list */}
          <div
            className="rounded-xl p-5"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <p
              className="text-[10px] uppercase tracking-[0.3em] font-body mb-4"
              style={{ color: dest.accentColor }}
            >
              Tous les hébergements
            </p>
            <div className="space-y-3">
              {dest.hotels.map((h, i) => (
                <button
                  key={h.name}
                  onClick={() => setActiveHotel(i)}
                  className="w-full flex items-center justify-between group"
                >
                  <span
                    className="text-xs font-body"
                    style={{ color: i === activeHotel ? dest.accentColor : 'rgba(255,255,255,0.45)' }}
                  >
                    {h.name}
                  </span>
                  <span className="text-[10px] text-white/20 font-body">{h.type}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}