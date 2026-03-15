'use client';

import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { getDestination } from '@/data/destinations';

interface Props { children: ReactNode }

const subNav = [
  { segment: '',          label: 'Vue d\'ensemble', icon: '🗾' },
  { segment: 'hotels',    label: 'Hôtels',           icon: '🏨' },
  { segment: 'activites', label: 'Activités',         icon: '🎌' },
  { segment: 'avis',      label: 'Avis',              icon: '⭐' },
];

export default function DestinationLayout({ children }: Props) {
  const pathname = usePathname();
  const { nom }  = useParams<{ nom: string }>();
  const dest     = getDestination(nom);

  if (!dest) return <div className="pt-24 text-white text-center">Destination introuvable.</div>;

  return (
    <div className="min-h-screen">
      {/* ─── Destination header strip ─── */}
      <div
        className="pt-24 pb-0 relative overflow-hidden"
        style={{ background: dest.heroGradient }}
      >
        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }} aria-hidden />

        <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-6 font-body text-xs tracking-wider text-white/30"
          >
            <Link href="/" className="hover:text-white/60 transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-white/50">Destinations</span>
            <span>/</span>
            <span style={{ color: dest.accentColor }}>{dest.name}</span>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-end gap-6 mb-10"
          >
            <div>
              <p
                className="font-display font-thin leading-none mb-2"
                style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: dest.accentColor }}
              >
                {dest.kanji}
              </p>
              <div className="flex items-baseline gap-4">
                <h1
                  className="font-display font-thin text-white"
                  style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                >
                  {dest.name}
                </h1>
                <span
                  className="text-sm font-body font-light italic"
                  style={{ color: dest.accentColor + 'aa' }}
                >
                  {dest.subtitle}
                </span>
              </div>
            </div>
            <span className="text-5xl pb-2 hidden sm:block">{dest.icon}</span>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {dest.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-3 py-1 rounded-full font-body tracking-wider"
                style={{
                  background: `${dest.accentColor}15`,
                  border: `1px solid ${dest.accentColor}30`,
                  color: dest.accentColor,
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Sub-navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-1 overflow-x-auto pb-px"
            role="navigation"
            aria-label="Sections de la destination"
          >
            {subNav.map(({ segment, label, icon }) => {
              const href    = `/destination/${nom}${segment ? `/${segment}` : ''}`;
              const isActive = segment
                ? pathname === href
                : pathname === `/destination/${nom}`;

              return (
                <Link key={segment} href={href}>
                  <motion.span
                    className="relative flex items-center gap-2 px-5 py-3 text-xs tracking-wider uppercase font-body whitespace-nowrap"
                    style={{ color: isActive ? dest.accentColor : 'rgba(255,255,255,0.38)' }}
                    whileHover={{ color: dest.accentColor }}
                    transition={{ duration: 0.2 }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="dest-tab-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                        style={{ background: dest.accentColor }}
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span>{icon}</span>
                    <span>{label}</span>
                  </motion.span>
                </Link>
              );
            })}
          </motion.nav>
        </div>
      </div>

      {/* ─── Page content ─── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {children}
      </div>
    </div>
  );
}