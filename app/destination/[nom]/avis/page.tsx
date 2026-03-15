'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { getDestination } from '@/data/destinations';

interface Props {
  params: Promise<{ nom: string }>;
}

function Stars({ rating, color }: { rating: number; color: string }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <span
          key={s}
          style={{
            color: s <= rating ? color : 'rgba(255,255,255,0.12)',
            fontSize: '0.75rem',
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function AvisPage({ params }: Props) {
  const { nom } = use(params);
  const dest    = getDestination(nom);
  if (!dest) notFound();

  const avgRating =
    dest.reviews.reduce((acc, r) => acc + r.rating, 0) / dest.reviews.length;

  return (
    <div className="space-y-14">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
      >
        <div>
          <p
            className="text-[10px] tracking-[0.35em] uppercase font-body mb-2"
            style={{ color: dest.accentColor }}
          >
            口コミ — Témoignages
          </p>
          <h2
            className="font-display font-thin text-white mb-2"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Ils ont vécu {dest.name}
          </h2>
          <p className="text-sm text-white/40 font-body">
            Des voyageurs du monde entier partagent leur expérience authentique.
          </p>
        </div>

        {/* Average rating */}
        <div
          className="rounded-2xl p-6 text-center shrink-0"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${dest.accentColor}30`,
            minWidth: '140px',
          }}
        >
          <p
            className="font-display font-thin mb-1"
            style={{ fontSize: '2.8rem', color: dest.accentColor }}
          >
            {avgRating.toFixed(1)}
          </p>
          <Stars rating={Math.round(avgRating)} color={dest.accentColor} />
          <p className="text-[10px] text-white/25 font-body mt-2">
            {dest.reviews.length} avis
          </p>
        </div>
      </motion.div>

      {/* Reviews */}
      <div className="space-y-5">
        {dest.reviews.map((review, i) => (
          <motion.div
            key={review.author}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
          >
            <motion.div
              whileHover={{
                y: -4,
                boxShadow: `0 20px 60px ${dest.shadowColor}`,
              }}
              className="rounded-2xl p-7"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-4">
                  {/* Avatar placeholder */}
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-lg shrink-0"
                    style={{ background: `${dest.accentColor}15`, border: `1px solid ${dest.accentColor}25` }}
                  >
                    {review.flag}
                  </div>
                  <div>
                    <p className="text-sm font-body text-white font-light">{review.author}</p>
                    <p
                      className="text-[10px] font-body"
                      style={{ color: 'rgba(255,255,255,0.3)' }}
                    >
                      {review.country} · {review.date}
                    </p>
                  </div>
                </div>
                <Stars rating={review.rating} color={dest.accentColor} />
              </div>

              {/* Review text */}
              <blockquote
                className="font-display font-light italic leading-relaxed mb-5"
                style={{
                  fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                  color: 'rgba(255,255,255,0.75)',
                }}
              >
                "{review.text}"
              </blockquote>

              {/* Highlight tag */}
              <div className="flex items-center gap-2">
                <span
                  className="text-[10px] px-3 py-1 rounded-full font-body tracking-wider"
                  style={{
                    background: `${dest.accentColor}12`,
                    border: `1px solid ${dest.accentColor}25`,
                    color: dest.accentColor,
                  }}
                >
                  ✓ {review.highlight}
                </span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* CTA to submit review (decorative) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="rounded-2xl p-8 text-center"
        style={{
          background: 'rgba(255,255,255,0.025)',
          border: `1px solid ${dest.accentColor}20`,
        }}
      >
        <p
          className="font-display font-thin text-2xl text-white mb-3"
        >
          Vous avez visité {dest.name} ?
        </p>
        <p className="text-sm text-white/40 font-body mb-6">
          Partagez votre expérience avec la communauté de voyageurs Nihon.
        </p>
        <motion.button
          whileHover={{ scale: 1.04, boxShadow: `0 0 30px ${dest.accentColor}40` }}
          whileTap={{ scale: 0.97 }}
          className="px-7 py-3 rounded-full text-xs tracking-widest uppercase font-body font-medium"
          style={{
            background: `linear-gradient(135deg, ${dest.accentColor}, ${dest.secondaryColor})`,
            color: '#000',
          }}
        >
          Écrire un Avis
        </motion.button>
      </motion.div>
    </div>
  );
}