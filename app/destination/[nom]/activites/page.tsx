'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { getDestination } from '@/data/destinations';

interface Props {
  params: Promise<{ nom: string }>;
}

export default function ActivitesPage({ params }: Props) {
  const { nom } = use(params);
  const dest    = getDestination(nom);
  if (!dest) notFound();

  const [selected, setSelected] = useState<number | null>(null);

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
          体験 — Expériences
        </p>
        <h2
          className="font-display font-thin text-white mb-3"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
        >
          Que Faire à {dest.name}
        </h2>
        <p className="text-sm text-white/40 font-body max-w-xl">
          Des expériences soigneusement choisies pour vivre {dest.name} autrement — au-delà des guides classiques.
        </p>
      </motion.div>

      {/* Activity cards grid */}
      <div className="grid sm:grid-cols-2 gap-5">
        {dest.activities.map((act, i) => (
          <motion.div
            key={act.name}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            onClick={() => setSelected(selected === i ? null : i)}
            animate-custom={{}}
          >
            <motion.div
              whileHover={{
                y: -5,
                boxShadow: `0 24px 60px ${act.accentColor}25`,
              }}
              className="rounded-2xl overflow-hidden cursor-pointer"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${selected === i ? act.accentColor + '40' : 'rgba(255,255,255,0.07)'}`,
                backdropFilter: 'blur(20px)',
                transition: 'border-color 0.3s',
              }}
            >
              {/* Card header */}
              <div
                className="p-6 pb-4"
                style={{
                  background: selected === i
                    ? `linear-gradient(135deg, ${act.accentColor}12, transparent)`
                    : 'transparent',
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <motion.span
                    className="text-4xl"
                    animate={{ scale: selected === i ? 1.15 : 1, rotate: selected === i ? 5 : 0 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {act.icon}
                  </motion.span>
                  <div className="text-right">
                    <span
                      className="text-[9px] px-2 py-1 rounded-full font-body tracking-wider block mb-1"
                      style={{
                        background: `${act.accentColor}12`,
                        border: `1px solid ${act.accentColor}25`,
                        color: act.accentColor,
                      }}
                    >
                      {act.category}
                    </span>
                    <span className="text-[9px] text-white/25 font-body">{act.difficulty}</span>
                  </div>
                </div>

                <h3
                  className="font-display font-light text-white mb-2"
                  style={{ fontSize: '1.2rem' }}
                >
                  {act.name}
                </h3>

                <div className="flex items-center gap-4 text-[10px] text-white/30 font-body">
                  <span>⏱ {act.duration}</span>
                  <span>🕐 {act.bestTime}</span>
                </div>
              </div>

              {/* Expandable description */}
              <motion.div
                initial={false}
                animate={{ height: selected === i ? 'auto' : 0, opacity: selected === i ? 1 : 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <div
                  className="px-6 pb-6 pt-0"
                  style={{ borderTop: `1px solid ${act.accentColor}20` }}
                >
                  <p className="text-sm text-white/50 font-body leading-relaxed mt-4">
                    {act.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span
                      className="text-[10px] px-3 py-1.5 rounded-full font-body"
                      style={{
                        background: `${act.accentColor}10`,
                        border: `1px solid ${act.accentColor}25`,
                        color: act.accentColor,
                      }}
                    >
                      ✓ Meilleur moment : {act.bestTime}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Toggle arrow */}
              <div
                className="px-6 pb-4 flex justify-end"
                style={{ display: selected === i ? 'none' : 'flex' }}
              >
                <motion.span
                  className="text-xs font-body tracking-wider"
                  style={{ color: act.accentColor }}
                  animate={{ x: selected === i ? 4 : 0 }}
                >
                  Détails →
                </motion.span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Tips block */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="rounded-2xl p-8"
        style={{
          background: 'rgba(255,255,255,0.025)',
          border: `1px solid ${dest.accentColor}20`,
        }}
      >
        <p
          className="text-[10px] tracking-[0.35em] uppercase font-body mb-4"
          style={{ color: dest.accentColor }}
        >
          💡 Conseils d'Initié
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { tip: 'Réservez les expériences culturelles (cérémonies du thé, cours de céramique) au moins 2 semaines à l\'avance.' },
            { tip: 'Les temples et sanctuaires sont toujours plus beaux à l\'aube — et pratiquement vides.' },
            { tip: 'Téléchargez Google Maps hors-ligne pour votre zone avant de partir. La connectivité n\'est pas partout parfaite.' },
          ].map(({ tip }, i) => (
            <div key={i} className="flex gap-3">
              <span style={{ color: dest.accentColor }} className="text-lg shrink-0">→</span>
              <p className="text-xs text-white/45 font-body leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}