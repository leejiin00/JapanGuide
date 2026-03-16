'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { DestinationWithStats } from '@/types/database';

interface Props {
  destination: DestinationWithStats;
  index?: number;
}

export default function DestinationCard({ destination: dest, index = 0 }: Props) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/destination/${dest.slug}`} className="block group">
        <motion.div
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          onMouseMove={handleMouseMove}
          animate={{
            boxShadow: hovered
              ? `0 32px 80px ${dest.shadow_color}, 0 0 40px ${dest.shadow_color}60, inset 0 1px 0 rgba(255,255,255,0.12)`
              : `0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`,
            y: hovered ? -8 : 0, scale: hovered ? 1.015 : 1,
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          className="relative overflow-hidden rounded-2xl cursor-pointer"
          style={{
            background: 'rgba(10,8,25,0.8)', backdropFilter: 'blur(24px)',
            border: `1px solid ${hovered ? dest.accent_color + '30' : 'rgba(255,255,255,0.07)'}`,
            transition: 'border-color 0.3s',
          }}
        >
          <motion.div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
            background: `radial-gradient(circle 180px at ${mousePos.x}% ${mousePos.y}%, ${dest.accent_color}18, transparent 70%)`,
            opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
          }} />
          <motion.div className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none"
            animate={{ opacity: hovered ? 0.25 : 0, scale: hovered ? 1.3 : 0.8 }} transition={{ duration: 0.5 }}
            style={{ background: dest.accent_color }}
          />
          <div className="relative z-10 p-7">
            <div className="flex items-start justify-between mb-5">
              <div>
                <motion.p className="text-5xl font-thin leading-none mb-1" style={{ color: dest.accent_color, fontFamily: 'Cormorant Garamond, serif' }}
                  animate={{ scale: hovered ? 1.04 : 1 }} transition={{ type: 'spring', stiffness: 400 }}>
                  {dest.kanji}
                </motion.p>
                <p className="text-[10px] tracking-[0.3em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'Outfit, sans-serif' }}>
                  {dest.region} · {dest.subtitle}
                </p>
              </div>
              <motion.span className="text-3xl shrink-0" animate={{ rotate: hovered ? 8 : 0, scale: hovered ? 1.2 : 1 }} transition={{ type: 'spring', stiffness: 300 }}>
                {dest.icon}
              </motion.span>
            </div>
            <h3 className="text-2xl font-light text-white mb-3 tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{dest.name}</h3>
            <p className="text-sm leading-relaxed mb-6 line-clamp-3" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Outfit, sans-serif' }}>{dest.description}</p>
            <div className="mb-5 h-px" style={{ background: `linear-gradient(to right, ${dest.accent_color}40, transparent)` }} />
            <div className="flex flex-wrap gap-2 mb-4">
              {dest.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-[10px] px-3 py-1 rounded-full tracking-wider" style={{ background: `${dest.accent_color}12`, border: `1px solid ${dest.accent_color}25`, color: dest.accent_color, fontFamily: 'Outfit, sans-serif' }}>
                  {tag}
                </span>
              ))}
            </div>
            {(dest.hotel_count > 0 || dest.activity_count > 0) && (
              <div className="flex gap-4 mb-4">
                {dest.hotel_count > 0 && <span className="text-[10px] text-white/25 font-body">{dest.hotel_count} hôtel{dest.hotel_count > 1 ? 's' : ''}</span>}
                {dest.activity_count > 0 && <span className="text-[10px] text-white/25 font-body">{dest.activity_count} activité{dest.activity_count > 1 ? 's' : ''}</span>}
                {dest.avg_rating && <span className="text-[10px] font-body" style={{ color: dest.accent_color }}>★ {dest.avg_rating}</span>}
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-[9px] tracking-wider uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'Outfit, sans-serif' }}>Meilleure période</p>
                  <p className="text-xs text-white/60" style={{ fontFamily: 'Outfit, sans-serif' }}>{dest.best_months}</p>
                </div>
                <div className="w-px h-8" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <div>
                  <p className="text-[9px] tracking-wider uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'Outfit, sans-serif' }}>Budget</p>
                  <p className="text-xs text-white/60" style={{ fontFamily: 'Outfit, sans-serif' }}>{dest.budget}</p>
                </div>
              </div>
              <motion.div className="flex items-center gap-2 text-xs tracking-widest uppercase font-medium" style={{ color: dest.accent_color, fontFamily: 'Outfit, sans-serif' }} animate={{ x: hovered ? 6 : 0 }} transition={{ type: 'spring', stiffness: 400 }}>
                Explorer <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ type: 'spring', stiffness: 400 }}>→</motion.span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}