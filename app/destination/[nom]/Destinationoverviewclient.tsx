'use client';
// Cette partie là sert à indiquer qu'on utilise des outils front-end interactifs, principalement ici pour les animations (framer-motion).

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { DestinationFull } from '@/types/database';

interface Props { dest: DestinationFull }

export default function DestinationOverviewClient({ dest }: Props) {
  return (
    <div className="space-y-16">

      {/* ── Description ── */}
      {/* Cette partie concerne le bloc de présentation principal de la destination (le texte et les infos pratiques). */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="grid md:grid-cols-5 gap-10"
      >
        {/* Long text */}
        <div className="md:col-span-3 space-y-5">
          <p className="text-[10px] tracking-[0.35em] uppercase font-body mb-3" style={{ color: dest.accent_color }}>
            À Propos
          </p>
          <p className="font-display font-thin italic leading-relaxed" style={{ fontSize: 'clamp(1.1rem,2vw,1.4rem)', color: 'rgba(255,255,255,0.8)' }}>
            {dest.description}
          </p>
          <p className="text-sm text-white/45 leading-relaxed font-body font-light">
            {dest.long_description}
          </p>
        </div>

        {/* Quick facts */}
        {/* J'ai fait ça (self-start) pour empêcher ce bloc gris de s'étirer verticalement pour faire la même taille que le texte à côté. Il prendra juste la hauteur dont il a besoin. */}
        <div
          className="md:col-span-2 rounded-2xl p-7 self-start"
          style={{
            background:    'rgba(255,255,255,0.035)',
            border:        `1px solid ${dest.accent_color}25`,
            backdropFilter:'blur(20px)',
          }}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase font-body mb-6" style={{ color: dest.accent_color }}>
            Infos Pratiques
          </p>
          <div className="space-y-4">
            {/* Cette partie là sert à créer une petite table de données proprement en bouclant sur un tableau généré à la volée. Ça évite de copier-coller 5 fois la même structure HTML ! */}
            {[
              { label: 'Région',            value: dest.region },
              { label: 'Meilleure période', value: dest.best_months },
              { label: 'Budget moyen',      value: dest.budget },
              { label: 'Langue',            value: dest.language },
              { label: 'Fuseau horaire',    value: dest.timezone },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-baseline gap-4">
                <span className="text-[10px] uppercase tracking-wider font-body shrink-0" style={{ color: 'rgba(255,255,255,0.28)' }}>{label}</span>
                <span className="text-xs font-body text-right text-white/70">{value}</span>
              </div>
            ))}
          </div>

          <div className="my-5 h-px" style={{ background: `linear-gradient(to right, ${dest.accent_color}40, transparent)` }} />

          {/* Key numbers */}
          <div className="grid grid-cols-2 gap-3">
            {/* J'ai fait ça (as {...}[]) car TypeScript a parfois du mal avec le typage des champs JSON ou JSONB venant de Supabase. Ça force le type correct. */}
            {(dest.quick_facts as { label: string; value: string }[]).map(({ label, value }) => (
              <div key={label} className="rounded-xl p-3 text-center" style={{ background: `${dest.accent_color}08` }}>
                <p className="font-display font-thin text-xl mb-0.5" style={{ color: dest.accent_color }}>{value}</p>
                <p className="text-[9px] tracking-wider uppercase font-body text-white/25">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Divider ── */}
      <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)' }} />

      {/* ── Section teasers ── */}
      {/* Cette partie concerne les 3 gros boutons ("Hôtels", "Activités", "Avis") qui renvoient vers les sous-pages. */}
      <div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <p className="text-[10px] tracking-[0.35em] uppercase font-body mb-2" style={{ color: dest.accent_color }}>Aperçu</p>
          <h2 className="font-display font-thin text-white" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)' }}>Les Essentiels</h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { segment: 'hotels',    icon: '🏨', title: 'Hôtels',     count: dest.hotels.length,     desc: 'hébergements sélectionnés' },
            { segment: 'activites', icon: '🎌', title: 'Activités',  count: dest.activities.length, desc: 'expériences incontournables' },
            { segment: 'avis',      icon: '⭐', title: 'Avis',       count: dest.reviews.length,    desc: 'témoignages de voyageurs' },
          ].map(({ segment, icon, title, count, desc }, i) => (
            <motion.div
              key={segment}
              initial={{ opacity: 0, y: 20 }}
              // L'animation ne se lance que quand l'élément apparaît à l'écran (whileInView).
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Le composant <Link> de Next.js permet une navigation ultra-rapide sans recharger toute la page web. */}
              <Link href={`/destination/${dest.slug}/${segment}`}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: `0 20px 60px ${dest.shadow_color}` }}
                  className="rounded-2xl p-6 cursor-pointer h-full"
                  style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${dest.accent_color}20`, backdropFilter: 'blur(16px)' }}
                >
                  <span className="text-3xl block mb-4">{icon}</span>
                  <h3 className="font-display font-light text-xl text-white mb-2">{title}</h3>
                  <p className="text-xs text-white/40 font-body leading-relaxed mb-4">
                    <span style={{ color: dest.accent_color }} className="font-medium">{count}</span> {desc}
                  </p>
                  <span className="text-[10px] tracking-widest uppercase font-body font-medium" style={{ color: dest.accent_color }}>
                    Voir {title.toLowerCase()} →
                  </span>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Activities preview ── */}
      {/* Cette partie là sert à afficher un petit aperçu (une preview) des activités proposées, pour donner envie à l'utilisateur de cliquer sur l'onglet complet. */}
      <div>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-[10px] tracking-[0.35em] uppercase font-body mb-8" style={{ color: dest.accent_color }}>
          Expériences Phares
        </motion.p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dest.activities.map((act, i) => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, boxShadow: `0 16px 40px ${act.accent_color}20` }}
              className="rounded-xl p-5"
              style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${act.accent_color}20` }}
            >
              <span className="text-2xl block mb-3">{act.icon}</span>
              <p className="text-sm font-display font-light text-white mb-1">{act.name}</p>
              <p className="text-[10px] font-body tracking-wider" style={{ color: act.accent_color }}>{act.category}</p>
              <p className="text-[10px] text-white/25 font-body mt-1">⏱ {act.duration}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}