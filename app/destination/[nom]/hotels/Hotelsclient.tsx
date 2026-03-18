'use client';
// Cette partie là sert à indiquer à Next.js qu'il s'agit d'un Client Component, ce qui nous autorise à utiliser des hooks d'état (useState) et d'interactivité (onClick).

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { DestinationFull } from '@/types/database';

interface Props { dest: DestinationFull }

// Cette partie concerne le composant d'affichage des étoiles. 
// J'ai fait ça pour extraire cette petite logique visuelle en dehors du composant principal afin de garder "HotelsClient" plus lisible.
function Stars({ n, color }: { n: number; color: string }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <span key={s} style={{ color: s <= n ? color : 'rgba(255,255,255,0.12)', fontSize: '0.75rem' }}>★</span>
      ))}
    </div>
  );
}

export default function HotelsClient({ dest }: Props) {
  // Cette partie concerne la gestion de l'onglet actif. 
  // J'ai fait ça pour mémoriser l'index (0, 1, 2...) de l'hôtel que l'utilisateur est en train de regarder. Par défaut, on affiche le premier (index 0).
  const [active, setActive] = useState(0);
  const hotel = dest.hotels[active];

  // Cette partie là sert à faire ce qu'on appelle un "Early Return" (retour anticipé) ou de la programmation défensive. 
  // J'ai fait ça pour éviter que l'application ne plante (crash) si jamais la base de données renvoie une destination qui ne possède aucun hôtel.
  if (!hotel) return (
    <p className="text-white/40 font-body text-sm pt-10">Aucun hôtel disponible pour cette destination.</p>
  );

  return (
    <div className="space-y-14">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="text-[10px] tracking-[0.35em] uppercase font-body mb-2" style={{ color: dest.accent_color }}>宿泊 — Hébergements</p>
        <h2 className="font-display font-thin text-white mb-3" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>Où Dormir à {dest.name}</h2>
        <p className="text-sm text-white/40 font-body max-w-xl">
          Une sélection rigoureuse pour chaque budget — du ryokan traditionnel au design hotel contemporain.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {/* Cette partie là sert à générer les boutons d'onglets pour chaque hôtel disponible. */}
        {dest.hotels.map((h, i) => (
          <motion.button
            key={h.id}
            // J'ai fait ça pour mettre à jour notre état local avec l'index de l'hôtel cliqué. Cela va forcer React à re-rendre le composant avec les nouvelles données.
            onClick={() => setActive(i)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-2.5 rounded-full text-xs tracking-wider font-body"
            style={{
              background: i === active ? `${dest.accent_color}18` : 'rgba(255,255,255,0.04)',
              border:     `1px solid ${i === active ? dest.accent_color + '50' : 'rgba(255,255,255,0.08)'}`,
              color:      i === active ? dest.accent_color : 'rgba(255,255,255,0.4)',
            }}
          >
            {h.name}
          </motion.button>
        ))}
      </div>

      {/* Active hotel */}
      <motion.div
        // Cette partie concerne une astuce géniale de React et Framer Motion : l'utilisation de la "key".
        // J'ai fait ça pour forcer le composant <motion.div> à se détruire et à se recréer entièrement à chaque fois que la variable "active" change. Cela permet de rejouer l'animation d'apparition "initial" à chaque changement d'onglet !
        key={active}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="grid md:grid-cols-5 gap-8"
      >
        {/* Main card */}
        <div
          className="md:col-span-3 rounded-2xl p-8"
          style={{
            background:    'rgba(255,255,255,0.035)',
            border:        `1px solid ${hotel.accent_color}30`,
            backdropFilter:'blur(20px)',
            boxShadow:     `0 8px 40px ${hotel.accent_color}12`,
          }}
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase font-body mb-1" style={{ color: hotel.accent_color }}>{hotel.type}</p>
              <h3 className="font-display font-light text-white" style={{ fontSize: 'clamp(1.4rem,3vw,2rem)' }}>{hotel.name}</h3>
            </div>
            <div className="text-right">
              <Stars n={hotel.stars} color={hotel.accent_color} />
              <p className="text-sm font-body mt-1" style={{ color: hotel.accent_color }}>{hotel.price_range}</p>
            </div>
          </div>

          <p className="text-sm text-white/50 font-body leading-relaxed mb-8">{hotel.description}</p>

          {/* Highlights */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase font-body mb-4 text-white/25">Points forts</p>
            <div className="grid grid-cols-2 gap-2">
              {hotel.highlights.map((h) => (
                <div key={h} className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: `${hotel.accent_color}08` }}>
                  <span className="text-sm" style={{ color: hotel.accent_color }}>✓</span>
                  <span className="text-xs text-white/60 font-body">{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 h-px" style={{ background: `linear-gradient(to right, ${hotel.accent_color}40, transparent)` }} />

          <motion.button
            whileHover={{ scale: 1.03, boxShadow: `0 0 30px ${hotel.accent_color}40` }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 px-7 py-3 rounded-full text-xs tracking-widest uppercase font-body font-medium"
            style={{ background: `linear-gradient(135deg, ${hotel.accent_color}, ${dest.secondary_color})`, color: '#000' }}
          >
            Réserver cet hôtel
          </motion.button>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-2 space-y-4">
          <div className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-[10px] uppercase tracking-[0.3em] font-body mb-4" style={{ color: dest.accent_color }}>Budget Estimé</p>
            <p className="font-display font-thin mb-1" style={{ fontSize: '1.6rem', color: hotel.accent_color }}>{hotel.price_range}</p>
            <p className="text-xs text-white/30 font-body">par nuit, pour 2 personnes</p>
            <div className="mt-4 text-xs text-white/40 font-body space-y-1">
              <p>✓ Taxes incluses</p>
              <p>✓ Petit-déjeuner souvent inclus</p>
              <p>⚠ Réservez 3–6 mois à l'avance</p>
            </div>
          </div>

          <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-[10px] uppercase tracking-[0.3em] font-body mb-4" style={{ color: dest.accent_color }}>Tous les hébergements</p>
            <div className="space-y-3">
              {dest.hotels.map((h, i) => (
                <button key={h.id} onClick={() => setActive(i)} className="w-full flex items-center justify-between">
                  <span className="text-xs font-body" style={{ color: i === active ? dest.accent_color : 'rgba(255,255,255,0.45)' }}>{h.name}</span>
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