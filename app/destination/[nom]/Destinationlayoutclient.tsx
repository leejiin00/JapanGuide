'use client';
// Cette partie là sert à indiquer qu'on est sur le navigateur (client-side) car on a besoin de hooks interactifs (usePathname) et d'animations.

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

// Cette partie concerne la définition du contrat de données. 
// J'ai fait ça pour définir exactement quelles informations de la destination (le nom, les couleurs, etc.) le Server Component parent doit passer à ce Layout visuel.
interface DestMeta {
  slug:         string;
  kanji:        string;
  name:         string;
  subtitle:     string;
  region:       string;
  tags:         string[];
  icon:         string;
  accent_color: string;
  hero_gradient: string;
  best_months:  string;
  budget:       string;
}

interface Props {
  dest:     DestMeta;
  children: ReactNode; // 'children' représentera le contenu spécifique de la page (Hôtels, Activités ou Avis) qui viendra s'insérer en dessous de l'en-tête.
}

// Cette partie là sert à configurer les liens du sous-menu de la destination.
const subNav = [
  { segment: '',          label: "Vue d'ensemble", icon: '🗾' },
  { segment: 'hotels',    label: 'Hôtels',         icon: '🏨' },
  { segment: 'activites', label: 'Activités',        icon: '🎌' },
  { segment: 'avis',      label: 'Avis',             icon: '⭐' },
];

export default function DestinationLayoutClient({ dest, children }: Props) {
  // J'ai fait ça pour récupérer l'URL exacte sur laquelle l'utilisateur se trouve (ex: "/destination/tokyo/hotels") afin de pouvoir allumer le bon onglet.
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      {/* ── Header strip ── */}
      {/* Cette partie concerne l'en-tête visuel global qui sera commun à toutes les sous-pages de cette destination. */}
      <div className="pt-24 pb-0 relative overflow-hidden" style={{ background: dest.hero_gradient }}>
        {/* Subtle noise */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
          aria-hidden
        />

        <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
          {/* Breadcrumb */}
          {/* Cette partie là sert à afficher le fil d'Ariane pour aider l'utilisateur à se repérer dans le site. */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-6 font-body text-xs tracking-wider"
            style={{ color: 'rgba(255,255,255,0.28)' }}
          >
            <Link href="/" className="hover:text-white/60 transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-white/40">Destinations</span>
            <span>/</span>
            <span style={{ color: dest.accent_color }}>{dest.name}</span>
          </motion.div>

          {/* Title block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-end gap-6 mb-8"
          >
            <div>
              <p
                className="font-display font-thin leading-none mb-2"
                style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: dest.accent_color }}
              >
                {dest.kanji}
              </p>
              <div className="flex items-baseline gap-4 flex-wrap">
                <h1
                  className="font-display font-thin text-white"
                  style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                >
                  {dest.name}
                </h1>
                <span
                  className="text-sm font-body font-light italic"
                  style={{ color: dest.accent_color + 'aa' }}
                >
                  {dest.subtitle}
                </span>
              </div>
            </div>
            <span className="text-5xl pb-2 hidden sm:block" aria-hidden>{dest.icon}</span>
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
                  background: `${dest.accent_color}15`,
                  border:     `1px solid ${dest.accent_color}30`,
                  color:       dest.accent_color,
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
            aria-label="Sections de la destination"
          >
            {/* Cette partie là sert à générer les onglets de navigation. */}
            {subNav.map(({ segment, label, icon }) => {
              // On construit l'URL de l'onglet. Si le segment est vide (Accueil de la destination), on n'ajoute pas de slash.
              const href     = `/destination/${dest.slug}${segment ? `/${segment}` : ''}`;
              
              // J'ai fait ça pour déterminer si l'onglet doit être considéré comme "actif". La logique diffère un peu pour l'accueil de la destination par rapport aux sous-pages.
              const isActive = segment
                ? pathname === href
                : pathname === `/destination/${dest.slug}`;

              return (
                <Link key={segment} href={href}>
                  <motion.span
                    className="relative flex items-center gap-2 px-5 py-3 text-xs tracking-wider uppercase font-body whitespace-nowrap"
                    style={{ color: isActive ? dest.accent_color : 'rgba(255,255,255,0.38)' }}
                    whileHover={{ color: dest.accent_color }}
                    transition={{ duration: 0.2 }}
                  >
                    {isActive && (
                      <motion.span
                        // Cette partie concerne l'animation de la petite barre colorée sous l'onglet actif.
                        // L'astuce "layoutId" de Framer Motion permet à cette barre de "glisser" magiquement d'un onglet à l'autre quand l'utilisateur navigue !
                        layoutId="dest-tab-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                        style={{ background: dest.accent_color }}
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

      {/* ── Page content ── */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Cette partie concerne l'injection de la sous-page demandée par l'utilisateur (la grille des hôtels, la liste des activités, etc.). */}
        {children}
      </div>
    </div>
  );
}