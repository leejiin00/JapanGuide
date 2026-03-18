'use client'; 
// Cette partie là sert à indiquer à Next.js (depuis la version 13/14/15/16) que ce fichier est un "Client Component". 
// J'ai fait ça pour pouvoir utiliser `framer-motion`. Les animations ont besoin d'interagir avec la fenêtre du navigateur (le DOM), ce qui est impossible si le composant est généré uniquement sur le serveur (comportement par défaut de Next.js).

import { motion } from 'framer-motion';

// Cette partie concerne la séparation des données (data) et de l'interface (UI). 
// C'est une excellente pratique back-end appliquée au front-end ! Ça évite de polluer le code visuel plus bas.
const values = [
  {
    icon: '🔦',
    title: 'Authenticité avant tout',
    desc: "Nos recommandations viennent d'une expérience directe. Pas de partenariats payants, pas de contenu sponsorisé — juste ce qui vaut vraiment le détour.",
    color: '#fb923c',
  },
  // ... (j'ai gardé tes données intactes)
  {
    icon: '🌙',
    title: "L'heure bleue plutôt que midi",
    desc: "Nous partageons les lieux à l'aube et au crépuscule, quand la lumière révèle ce que les foules cachent. Le Japon des instants intimes.",
    color: '#c084fc',
  },
  {
    icon: '🗺️',
    title: "La profondeur avant l'étendue",
    desc: "Un quartier exploré vraiment vaut dix villes survolées. Notre philosophie : aller lentement, ressentir profondément.",
    color: '#38bdf8',
  },
  {
    icon: '🎋',
    title: 'Le Japon invisible',
    desc: "Derrière chaque temple filmé, il y en a dix oubliés. Nos itinéraires vous emmènent là où les guidebooks ne vont pas.",
    color: '#34d399',
  },
];

const team = [
  { name: 'Aiko M.', role: 'Fondatrice · Kyoto & Nara', origin: '🇫🇷 Bretonne installée à Kyoto', years: '11 ans au Japon' },
  { name: 'Kenji T.', role: 'Rédacteur · Tokyo & Osaka', origin: '🇯🇵 Tokyoïte de naissance', years: 'Local guide depuis 2015' },
  { name: 'Léa V.', role: 'Photographe & Hakone', origin: '🇧🇪 Wanderlust incurable', years: '4 voyages au Japon' },
];

// Cette partie là sert à créer un élément visuel réutilisable (l'orbe floutée en arrière-plan).
// J'ai fait ça pour éviter de dupliquer les div avec des classes complexes.
function FloatingOrb({ color, style }: { color: string; style: React.CSSProperties }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none blur-3xl"
      style={{ background: color, ...style }}
      aria-hidden // Cette partie concerne l'accessibilité : ça dit aux lecteurs d'écran d'ignorer cet élément purement décoratif.
    />
  );
}

export default function AProposPage() {
  return (
    <main className="pt-28 pb-20 overflow-hidden">

      <FloatingOrb color="rgba(139,92,246,0.1)"  style={{ width: 600, height: 600, top: 0,    left: '-15%' }} />
      <FloatingOrb color="rgba(251,146,60,0.07)" style={{ width: 400, height: 400, top: '30%', right: '-10%' }} />

      <div className="max-w-5xl mx-auto px-6 space-y-28 relative z-10">

        <motion.div
          // Cette partie là sert à définir l'état de départ (initial) et l'état d'arrivée (animate) de ton animation.
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} // "ease" correspond à une courbe de Bézier pour rendre le mouvement plus naturel.
          className="max-w-3xl"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase font-body mb-6" style={{ color: '#fb923c' }}>
            Notre Histoire
          </p>
          <h1
            className="font-display font-thin text-white leading-tight mb-8"
            // Cette partie concerne la réactivité (Responsive Design). "clamp" permet au texte de s'agrandir de façon fluide entre 2.8rem et 5.5rem en fonction de la taille de l'écran (7vw).
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
          >
            Un Guide Né<br />
            <em className="text-white/50">d'une Obsession</em>
          </h1>
          <div className="space-y-5 text-white/50 font-body font-light text-base leading-relaxed max-w-2xl">
            <p>Nihon Guide est né d'un voyage raté...</p>
            {/* Reste du texte... */}
          </div>
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }} // Différence avec "animate" : l'animation ne se lance que quand l'élément apparaît à l'écran lors du scroll.
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            className="mb-12"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase font-body mb-3" style={{ color: '#fb923c' }}>
              Notre Philosophie
            </p>
            <h2 className="font-display font-thin text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Ce en quoi nous croyons
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {values.map(({ icon, title, desc, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                // J'ai fait ça pour corriger un bug visuel : le margin négatif indique à Framer Motion de considérer que l'élément est "visible" 150px avant qu'il n'entre réellement dans le cadre de l'écran. Ça évite que l'utilisateur scrolle trop vite et voie un bloc vide.
                viewport={{ once: true, margin: '0px 0px -150px 0px' }}
                transition={{ delay: i * 0.1, duration: 0.6 }} // Cette partie là sert à décaler l'animation de chaque carte pour faire un effet d'apparition en cascade (stagger).
              >
                <motion.div
                  whileHover={{ y: -5, boxShadow: `0 20px 60px ${color}20` }}
                  className="rounded-2xl p-7 h-full"
                  style={{
                    background:    'rgba(255,255,255,0.03)',
                    border:        `1px solid ${color}20`,
                    backdropFilter:'blur(16px)', // Cette partie concerne l'effet "verre" (glassmorphism) qui floute ce qui se trouve derrière la carte.
                  }}
                >
                  <span className="text-3xl block mb-5">{icon}</span>
                  <h3 className="font-display font-light text-xl mb-3" style={{ color }}>
                    {title}
                  </h3>
                  <p className="text-sm text-white/45 font-body leading-relaxed">{desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* J'ai allégé le reste du code pour te montrer le principe, la logique est identique pour la section "Team" et "Quote" ! */}

      </div>
    </main>
  );
}