'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getDestination } from '@/data/destinations';

interface Props {
  params: Promise<{ nom: string }>;
}

export default function DestinationPage({ params }: Props) {
  const { nom } = use(params);
  const dest    = getDestination(nom);
  if (!dest) notFound();

  return (
    <div className="space-y-16">

      {/* ─── Description ─── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="grid md:grid-cols-5 gap-10"
      >
        {/* Long text */}
        <div className="md:col-span-3 space-y-5">
          <p
            className="text-[10px] tracking-[0.35em] uppercase font-body mb-3"
            style={{ color: dest.accentColor }}
          >
            À Propos
          </p>
          <p
            className="font-display font-thin italic leading-relaxed"
            style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'rgba(255,255,255,0.8)' }}
          >
            {dest.description}
          </p>
          <p className="text-sm text-white/45 leading-relaxed font-body font-light">
            {dest.longDescription}
          </p>
        </div>

        {/* Quick facts */}
        <div
          className="md:col-span-2 rounded-2xl p-7 self-start"
          style={{
            background: 'rgba(255,255,255,0.035)',
            border: `1px solid ${dest.accentColor}25`,
            backdropFilter: 'blur(20px)',
          }}
        >
          <p
            className="text-[10px] tracking-[0.3em] uppercase font-body mb-6"
            style={{ color: dest.accentColor }}
          >
            Infos Pratiques
          </p>
          <div className="space-y-4">
            {[
              { label: 'Région',          value: dest.region },
              { label: 'Meilleure période', value: dest.bestMonths },
              { label: 'Budget moyen',    value: dest.budget },
              { label: 'Langue',          value: dest.language },
              { label: 'Fuseau horaire',  value: dest.timezone },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-baseline gap-4">
                <span
                  className="text-[10px] uppercase tracking-wider font-body shrink-0"
                  style={{ color: 'rgba(255,255,255,0.28)' }}
                >
                  {label}
                </span>
                <span
                  className="text-xs font-body text-right"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div
            className="my-5 h-px"
            style={{ background: `linear-gradient(to right, ${dest.accentColor}40, transparent)` }}
          />

          {/* Key numbers */}
          <div className="grid grid-cols-2 gap-4">
            {dest.quickFacts.map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl p-3 text-center"
                style={{ background: `${dest.accentColor}08` }}
              >
                <p
                  className="font-display font-thin text-xl mb-0.5"
                  style={{ color: dest.accentColor }}
                >
                  {value}
                </p>
                <p
                  className="text-[9px] tracking-wider uppercase font-body"
                  style={{ color: 'rgba(255,255,255,0.25)' }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ─── Divider ─── */}
      <div
        className="h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)' }}
      />

      {/* ─── Highlights preview ─── */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p
            className="text-[10px] tracking-[0.35em] uppercase font-body mb-2"
            style={{ color: dest.accentColor }}
          >
            Aperçu
          </p>
          <h2
            className="font-display font-thin text-white"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
          >
            Les Essentiels
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5">
          {/* Hotels teaser */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
          >
            <Link href={`/destination/${nom}/hotels`}>
              <motion.div
                whileHover={{
                  y: -6,
                  boxShadow: `0 20px 60px ${dest.shadowColor}`,
                }}
                className="rounded-2xl p-6 cursor-pointer h-full"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${dest.accentColor}20`,
                  backdropFilter: 'blur(16px)',
                }}
              >
                <span className="text-3xl block mb-4">🏨</span>
                <h3 className="font-display font-light text-xl text-white mb-2">Hôtels</h3>
                <p className="text-xs text-white/40 font-body leading-relaxed mb-4">
                  {dest.hotels.length} hébergements sélectionnés, du ryokan traditionnel au design hotel.
                </p>
                <span
                  className="text-[10px] tracking-widest uppercase font-body font-medium"
                  style={{ color: dest.accentColor }}
                >
                  Voir les hôtels →
                </span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Activities teaser */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Link href={`/destination/${nom}/activites`}>
              <motion.div
                whileHover={{
                  y: -6,
                  boxShadow: `0 20px 60px ${dest.shadowColor}`,
                }}
                className="rounded-2xl p-6 cursor-pointer h-full"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${dest.accentColor}20`,
                  backdropFilter: 'blur(16px)',
                }}
              >
                <span className="text-3xl block mb-4">🎌</span>
                <h3 className="font-display font-light text-xl text-white mb-2">Activités</h3>
                <p className="text-xs text-white/40 font-body leading-relaxed mb-4">
                  {dest.activities.length} expériences incontournables, des temples aux marchés de nuit.
                </p>
                <span
                  className="text-[10px] tracking-widest uppercase font-body font-medium"
                  style={{ color: dest.accentColor }}
                >
                  Voir les activités →
                </span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Reviews teaser */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href={`/destination/${nom}/avis`}>
              <motion.div
                whileHover={{
                  y: -6,
                  boxShadow: `0 20px 60px ${dest.shadowColor}`,
                }}
                className="rounded-2xl p-6 cursor-pointer h-full"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${dest.accentColor}20`,
                  backdropFilter: 'blur(16px)',
                }}
              >
                <span className="text-3xl block mb-4">⭐</span>
                <h3 className="font-display font-light text-xl text-white mb-2">Avis</h3>
                <p className="text-xs text-white/40 font-body leading-relaxed mb-4">
                  {dest.reviews.length} témoignages de voyageurs qui ont vécu {dest.name}.
                </p>
                <span
                  className="text-[10px] tracking-widest uppercase font-body font-medium"
                  style={{ color: dest.accentColor }}
                >
                  Lire les avis →
                </span>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ─── First activity teaser ─── */}
      <div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[10px] tracking-[0.35em] uppercase font-body mb-8"
          style={{ color: dest.accentColor }}
        >
          Expériences Phares
        </motion.p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dest.activities.map((act, i) => (
            <motion.div
              key={act.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, boxShadow: `0 16px 40px ${act.accentColor}20` }}
              className="rounded-xl p-5"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: `1px solid ${act.accentColor}20`,
              }}
            >
              <span className="text-2xl block mb-3">{act.icon}</span>
              <p className="text-sm font-display font-light text-white mb-1">{act.name}</p>
              <p
                className="text-[10px] font-body tracking-wider"
                style={{ color: act.accentColor }}
              >
                {act.category}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}