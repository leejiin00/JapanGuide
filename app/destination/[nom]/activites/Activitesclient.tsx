'use client';

// Cette partie là sert à importer les outils nécessaires au fonctionnement du composant côté client.
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DestinationFull } from '@/types/database';

interface Props { dest: DestinationFull }

export default function ActivitesClient({ dest }: Props) {
  // Cette partie concerne la gestion de l'activité actuellement dépliée par l'utilisateur.
  // J'ai fait ça pour m'assurer qu'une seule activité puisse être ouverte à la fois (en stockant son ID). Si c'est null, ça veut dire que toutes les cartes sont fermées.
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-14">

      {/* Header */}
      {/* Cette partie concerne l'en-tête de la section. L'animation "initial/animate" la fait apparaître doucement au chargement. */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="text-[10px] tracking-[0.35em] uppercase font-body mb-2" style={{ color: dest.accent_color }}>体験 — Expériences</p>
        <h2 className="font-display font-thin text-white mb-3" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>Que Faire à {dest.name}</h2>
        <p className="text-sm text-white/40 font-body max-w-xl">
          Des expériences soigneusement choisies pour vivre {dest.name} autrement.
        </p>
      </motion.div>

      {/* Activity cards */}
      <div className="grid sm:grid-cols-2 gap-5">
        {/* Cette partie là sert à parcourir toutes les activités liées à la destination pour créer une carte par activité. */}
        {dest.activities.map((act, i) => {
          // J'ai fait ça pour vérifier simplement si la carte que la boucle est en train de dessiner correspond à celle sur laquelle l'utilisateur a cliqué.
          const isOpen = selected === act.id;
          
          return (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              // L'utilisation du "delay: i * 0.1" permet l'apparition des cartes en cascade, une par une.
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <motion.div
                // Cette partie concerne l'interaction : au clic, si la carte est déjà ouverte, on la ferme (null), sinon on l'ouvre (act.id).
                onClick={() => setSelected(isOpen ? null : act.id)}
                whileHover={{ y: isOpen ? 0 : -5, boxShadow: `0 24px 60px ${act.accent_color}25` }}
                className="rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background:    'rgba(255,255,255,0.03)',
                  border:        `1px solid ${isOpen ? act.accent_color + '40' : 'rgba(255,255,255,0.07)'}`,
                  backdropFilter:'blur(20px)',
                  transition:    'border-color 0.3s',
                }}
              >
                {/* Card header */}
                <div className="p-6 pb-4" style={{ background: isOpen ? `linear-gradient(135deg, ${act.accent_color}12, transparent)` : 'transparent' }}>
                  <div className="flex items-start justify-between mb-4">
                    {/* Cette partie là sert à animer l'icône de l'activité (léger grossissement et rotation) quand la carte s'ouvre. */}
                    <motion.span className="text-4xl" animate={{ scale: isOpen ? 1.15 : 1, rotate: isOpen ? 5 : 0 }} transition={{ type: 'spring', stiffness: 300 }}>
                      {act.icon}
                    </motion.span>
                    <div className="text-right">
                      <span className="text-[9px] px-2 py-1 rounded-full font-body tracking-wider block mb-1"
                        style={{ background: `${act.accent_color}12`, border: `1px solid ${act.accent_color}25`, color: act.accent_color }}>
                        {act.category}
                      </span>
                      <span className="text-[9px] text-white/25 font-body">{act.difficulty}</span>
                    </div>
                  </div>
                  <h3 className="font-display font-light text-white mb-2" style={{ fontSize: '1.2rem' }}>{act.name}</h3>
                  <div className="flex items-center gap-4 text-[10px] text-white/30 font-body">
                    <span>⏱ {act.duration}</span>
                    <span>🕐 {act.best_time}</span>
                  </div>
                </div>

                {/* Expandable */}
                {/* Cette partie concerne le bloc caché qui se déplie. AnimatePresence gère la transition de sortie (exit) quand le composant est retiré du DOM. */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="px-6 pb-6" style={{ borderTop: `1px solid ${act.accent_color}20` }}>
                        <p className="text-sm text-white/50 font-body leading-relaxed mt-4 mb-4">{act.description}</p>
                        <span className="text-[10px] px-3 py-1.5 rounded-full font-body"
                          style={{ background: `${act.accent_color}10`, border: `1px solid ${act.accent_color}25`, color: act.accent_color }}>
                          ✓ Meilleur moment : {act.best_time}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expand hint */}
                {/* J'ai fait ça pour n'afficher le petit texte "Détails ->" que lorsque la carte est fermée. */}
                {!isOpen && (
                  <div className="px-6 pb-4 flex justify-end">
                    <span className="text-xs font-body tracking-wider" style={{ color: act.accent_color }}>Détails →</span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Tips */}
      {/* Cette partie là sert à afficher les astuces, mais uniquement quand l'utilisateur scrolle jusqu'à cette zone (whileInView). */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="rounded-2xl p-8"
        style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${dest.accent_color}20` }}
      >
        <p className="text-[10px] tracking-[0.35em] uppercase font-body mb-4" style={{ color: dest.accent_color }}>💡 Conseils d'Initié</p>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            'Réservez les expériences culturelles au moins 2 semaines à l\'avance.',
            'Les temples sont toujours plus beaux à l\'aube — et pratiquement vides.',
            'Téléchargez Google Maps hors-ligne pour votre zone avant de partir.',
          ].map((tip, i) => (
            <div key={i} className="flex gap-3">
              <span style={{ color: dest.accent_color }} className="text-lg shrink-0">→</span>
              <p className="text-xs text-white/45 font-body leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}