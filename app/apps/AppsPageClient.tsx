'use client'

// app/apps/AppsPageClient.tsx

// Cette partie là sert à indiquer à Next.js qu'on est côté client. Indispensable pour utiliser useState, framer-motion et réagir aux clics de l'utilisateur.
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { AppWithStats, AppCategory } from '@/types/database'

// Cette partie concerne la configuration de tes catégories.
// J'ai fait ça pour séparer les données statiques du composant React, ce qui rend le code beaucoup plus propre et facile à modifier si tu ajoutes une catégorie plus tard.
const CATEGORIES: {
  key:   AppCategory | 'all'
  label: string
  icon:  string
  color: string
}[] = [
  { key: 'all',           label: 'Toutes',        icon: '✦',  color: '#fb923c' },
  { key: 'transport',     label: 'Transport',     icon: '🚄', color: '#34a853' },
  { key: 'traduction',    label: 'Traduction',    icon: '🌐', color: '#4285f4' },
  { key: 'paiement',      label: 'Paiement',      icon: '💴', color: '#00b9a9' },
  { key: 'hebergement',   label: 'Hébergement',   icon: '🏨', color: '#ff5a5f' },
  { key: 'nourriture',    label: 'Nourriture',    icon: '🍜', color: '#c94a24' },
  { key: 'communication', label: 'Communication', icon: '💬', color: '#00b900' },
  { key: 'culture',       label: 'Culture',       icon: '⛩️', color: '#bc002d' },
]

const CATEGORY_LABELS: Record<AppCategory, string> = {
  transport:     'Transport',
  traduction:    'Traduction',
  paiement:      'Paiement & Budget',
  hebergement:   'Hébergement',
  nourriture:    'Nourriture',
  communication: 'Communication',
  culture:       'Culture & Guide',
}

interface Props {
  appsByCategory: Record<AppCategory, AppWithStats[]>
}

// Cette partie là sert à créer le sous-composant qui affiche une seule application.
function AppCard({
  app,
  index,
  isFirstCategory,
}: {
  app: AppWithStats
  index: number
  isFirstCategory: boolean
}) {
  // J'ai fait ça pour gérer l'état d'ouverture/fermeture de la carte (le système d'accordéon).
  const [expanded, setExpanded] = useState(false)

  const priceColor =
    app.price_type === 'gratuit'  ? '#34d399' :
    app.price_type === 'freemium' ? '#fbbf24' : '#f472b6'

  // Cartes dans le viewport dès le chargement → animate directement
  // Cartes hors viewport → whileInView pour déclencher au scroll
  // Cette partie concerne l'optimisation des animations. J'ai fait ça pour éviter que le navigateur calcule les animations des éléments qui ne sont pas encore visibles à l'écran.
  const animationProps = isFirstCategory
    ? {
        initial:    { opacity: 0, y: 24 },
        animate:    { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as any },
      }
    : {
        initial:     { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport:    { once: true, margin: '0px 0px -150px 0px' },
        transition:  { duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] as any },
      }

  return (
    <motion.div {...animationProps}>
      <motion.div
        whileHover={{ y: -4, boxShadow: `0 24px 60px ${app.accent_color}20` }}
        className="rounded-2xl overflow-hidden cursor-pointer"
        style={{
          background:    'rgba(255,255,255,0.035)',
          border:        '1px solid rgba(255,255,255,0.07)',
          backdropFilter:'blur(20px)',
          transition:    'border-color 0.3s, box-shadow 0.3s',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="p-5">
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
              style={{ background: `${app.accent_color}15`, border: `1px solid ${app.accent_color}25` }}
            >
              {app.icon_emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-display font-light text-white text-lg leading-tight">
                  {app.name}
                </h3>
                <div className="flex items-center gap-2 shrink-0">
                  {app.essential && (
                    <span
                      className="text-[9px] px-2 py-0.5 rounded-full font-body tracking-wider font-medium"
                      style={{ background: 'rgba(251,146,60,0.15)', border: '1px solid rgba(251,146,60,0.35)', color: '#fb923c' }}
                    >
                      Essentiel
                    </span>
                  )}
                  {app.available_offline && (
                    <span
                      className="text-[9px] px-2 py-0.5 rounded-full font-body tracking-wider"
                      style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)', color: '#34d399' }}
                    >
                      Hors-ligne
                    </span>
                  )}
                </div>
              </div>
              <p className="text-xs text-white/50 font-body leading-relaxed mb-2 line-clamp-2">
                {app.description}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-body" style={{ color: priceColor }}>
                  {app.price_type === 'gratuit'  ? '● Gratuit' :
                   app.price_type === 'freemium' ? '◐ Freemium' : '● Payant'}
                </span>
                {app.avg_rating && (
                  <span className="text-[10px] font-body text-white/30 flex items-center gap-1">
                    <span style={{ color: '#fbbf24' }}>★</span>
                    {app.avg_rating}
                    <span className="text-white/20">({app.review_count})</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Cette partie là sert à animer le déploiement de la zone d'informations supplémentaires. */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className="px-5 pb-5" style={{ borderTop: `1px solid ${app.accent_color}20` }}>
                <p className="text-sm text-white/50 font-body leading-relaxed mt-4 mb-5">
                  {app.long_description}
                </p>
                <div className="flex items-center gap-2 mb-5">
                  <span
                    className="text-[10px] px-3 py-1 rounded-full font-body tracking-wider"
                    style={{ background: `${priceColor}10`, border: `1px solid ${priceColor}25`, color: priceColor }}
                  >
                    {app.price_detail}
                  </span>
                  {app.available_offline && (
                    <span
                      className="text-[10px] px-3 py-1 rounded-full font-body tracking-wider"
                      style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', color: '#34d399' }}
                    >
                      ✓ Disponible hors-ligne
                    </span>
                  )}
                </div>
                <div className="flex gap-3 flex-wrap">
                  {app.url_appstore && (
                    <motion.a
                      href={app.url_appstore}
                      target="_blank"
                      rel="noopener noreferrer"
                      // J'ai fait ça pour éviter que le clic sur ce lien déclenche aussi le clic de la div parente (qui fermerait la carte).
                      onClick={(e) => e.stopPropagation()}
                      whileHover={{ scale: 1.04, boxShadow: `0 0 20px ${app.accent_color}30` }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-body tracking-wider"
                      style={{ background: `${app.accent_color}15`, border: `1px solid ${app.accent_color}30`, color: app.accent_color }}
                    >
                      🍎 App Store
                    </motion.a>
                  )}
                  {app.url_playstore && (
                    <motion.a
                      href={app.url_playstore}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      whileHover={{ scale: 1.04, boxShadow: `0 0 20px ${app.accent_color}30` }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-body tracking-wider"
                      style={{ background: `${app.accent_color}15`, border: `1px solid ${app.accent_color}30`, color: app.accent_color }}
                    >
                      🤖 Google Play
                    </motion.a>
                  )}
                  {app.url_website && (
                    <motion.a
                      href={app.url_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      whileHover={{ scale: 1.04 }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-body tracking-wider"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.45)' }}
                    >
                      🌐 Site web
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="px-5 pb-4 flex justify-between items-center">
          <span className="text-[10px] text-white/20 font-body">
            {expanded ? 'Réduire' : 'Voir les détails et liens'}
          </span>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-white/20 text-xs"
          >
            ↓
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function AppsPageClient({ appsByCategory }: Props) {
  // Cette partie concerne le filtre de catégorie sélectionné par l'utilisateur.
  const [activeCategory, setActiveCategory] = useState<AppCategory | 'all'>('all')

  const allApps = Object.values(appsByCategory).flat()
  const essentialApps = allApps.filter((a) => a.essential)

  // Cette partie là sert à définir quelles catégories doivent être affichées en dessous selon le bouton cliqué dans le menu.
  const categoriesToShow: AppCategory[] =
    activeCategory === 'all'
      ? (Object.keys(appsByCategory) as AppCategory[]).filter((c) => appsByCategory[c].length > 0)
      : [activeCategory]

  return (
    <main className="min-h-screen pt-28 pb-20" style={{ background: '#060410' }}>

      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[10px] tracking-[0.4em] uppercase font-body mb-4" style={{ color: '#fb923c' }}>
            アプリ — Applications
          </p>
          <h1
            className="font-display font-thin text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Préparez votre<br />
            <em className="text-white/50">Kit Numérique</em>
          </h1>
          <p className="text-white/40 font-body font-light text-base max-w-xl leading-relaxed">
            {allApps.length} applications sélectionnées pour voyager au Japon sereinement.
            Téléchargez-les avant le départ — certaines sont essentielles dès l'aéroport.
          </p>
        </motion.div>
      </div>

      {essentialApps.length > 0 && activeCategory === 'all' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-7xl mx-auto px-6 mb-14"
        >
          <div
            className="rounded-2xl p-6"
            style={{ background: 'rgba(251,146,60,0.06)', border: '1px solid rgba(251,146,60,0.2)', backdropFilter: 'blur(16px)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-lg">⚡</span>
              <p className="text-sm font-body font-medium" style={{ color: '#fb923c' }}>
                À télécharger absolument avant de partir
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {essentialApps.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ background: `${app.accent_color}12`, border: `1px solid ${app.accent_color}25` }}
                >
                  <span className="text-base">{app.icon_emoji}</span>
                  <span className="text-xs font-body" style={{ color: app.accent_color }}>{app.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <div
        className="sticky top-18 z-30 mb-12"
        style={{ background: 'rgba(6,4,16,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto">
          {CATEGORIES.map(({ key, label, icon, color }) => (
            <motion.button
              key={key}
              onClick={() => setActiveCategory(key)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-wider font-body whitespace-nowrap shrink-0"
              style={{
                background: activeCategory === key ? `${color}18` : 'rgba(255,255,255,0.04)',
                border:     `1px solid ${activeCategory === key ? color + '45' : 'rgba(255,255,255,0.08)'}`,
                color:      activeCategory === key ? color : 'rgba(255,255,255,0.4)',
              }}
            >
              <span>{icon}</span>
              <span>{label}</span>
              {key !== 'all' && (
                <span
                  className="text-[9px] px-1.5 py-0.5 rounded-full"
                  style={{
                    background: activeCategory === key ? `${color}25` : 'rgba(255,255,255,0.08)',
                    color:      activeCategory === key ? color : 'rgba(255,255,255,0.3)',
                  }}
                >
                  {/* J'ai fait ça pour afficher le nombre d'applications pour chaque filtre. */}
                  {appsByCategory[key as AppCategory]?.length ?? 0}
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {categoriesToShow.map((category, categoryIndex) => {
              const apps = appsByCategory[category]
              if (!apps || apps.length === 0) return null
              const catConfig = CATEGORIES.find((c) => c.key === category)
              // Première catégorie affichée = déjà dans le viewport au chargement
              const isFirstCategory = categoryIndex === 0

              return (
                <div key={category} className="mb-16">
                  {activeCategory === 'all' && (
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl">{catConfig?.icon}</span>
                      <div>
                        <h2 className="font-display font-thin text-white" style={{ fontSize: '1.6rem' }}>
                          {CATEGORY_LABELS[category]}
                        </h2>
                        <p className="text-[10px] text-white/25 font-body">
                          {apps.length} application{apps.length > 1 ? 's' : ''}
                        </p>
                      </div>
                      <div
                        className="flex-1 h-px ml-2"
                        style={{ background: `linear-gradient(to right, ${catConfig?.color ?? '#fb923c'}30, transparent)` }}
                      />
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {apps.map((app, i) => (
                      <AppCard
                        key={app.id}
                        app={app}
                        index={i}
                        isFirstCategory={isFirstCategory}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>

    </main>
  )
}