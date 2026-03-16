'use client';

import { motion } from 'framer-motion';

const values = [
  {
    icon: '🔦',
    title: 'Authenticité avant tout',
    desc: "Nos recommandations viennent d'une expérience directe. Pas de partenariats payants, pas de contenu sponsorisé — juste ce qui vaut vraiment le détour.",
    color: '#fb923c',
  },
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

function FloatingOrb({ color, style }: { color: string; style: React.CSSProperties }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none blur-3xl"
      style={{ background: color, ...style }}
      aria-hidden
    />
  );
}

export default function AProposPage() {
  return (
    <main className="pt-28 pb-20 overflow-hidden">

      <FloatingOrb color="rgba(139,92,246,0.1)"  style={{ width: 600, height: 600, top: 0,     left: '-15%' }} />
      <FloatingOrb color="rgba(251,146,60,0.07)" style={{ width: 400, height: 400, top: '30%', right: '-10%' }} />

      <div className="max-w-5xl mx-auto px-6 space-y-28 relative z-10">

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase font-body mb-6" style={{ color: '#fb923c' }}>
            Notre Histoire
          </p>
          <h1
            className="font-display font-thin text-white leading-tight mb-8"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
          >
            Un Guide Né<br />
            <em className="text-white/50">d'une Obsession</em>
          </h1>
          <div className="space-y-5 text-white/50 font-body font-light text-base leading-relaxed max-w-2xl">
            <p>
              Nihon Guide est né d'un voyage raté. En 2018, nous avons atterri à Tokyo avec un guide
              papier épais comme un parpaing et des attentes de carte postale. Nous sommes rentrés
              déçus — non par le Japon, mais par notre façon de le chercher.
            </p>
            <p>
              Le vrai Japon, celui qui vous change, se trouve entre les pages des guides touristiques.
              Dans le ramen-ya sans enseigne repéré par hasard. Dans le temple fermé aux touristes,
              ouvert sur demande. Dans la conversation avec un taxi à 2h du matin.
            </p>
            <p>
              Nihon Guide est notre réponse à ce premier voyage manqué. Un outil pour vous aider
              à tomber amoureux du Japon pour de bonnes raisons.
            </p>
          </div>
        </motion.div>

        {/* ── Values ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
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
                // margin négatif : déclenche l'animation 150px AVANT que
                // la carte entre dans le viewport — corrige l'affichage tardif
                viewport={{ once: true, margin: '0px 0px -150px 0px' }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <motion.div
                  whileHover={{ y: -5, boxShadow: `0 20px 60px ${color}20` }}
                  className="rounded-2xl p-7 h-full"
                  style={{
                    background:    'rgba(255,255,255,0.03)',
                    border:        `1px solid ${color}20`,
                    backdropFilter:'blur(16px)',
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

        {/* ── Team ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            className="mb-12"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase font-body mb-3" style={{ color: '#fb923c' }}>
              L'Équipe
            </p>
            <h2 className="font-display font-thin text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Les Voix derrière le Guide
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-5">
            {team.map(({ name, role, origin, years }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <motion.div
                  whileHover={{ y: -5, boxShadow: '0 20px 50px rgba(251,146,60,0.15)' }}
                  className="rounded-2xl p-7"
                  style={{
                    background:    'rgba(255,255,255,0.03)',
                    border:        '1px solid rgba(255,255,255,0.07)',
                    backdropFilter:'blur(16px)',
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-5"
                    style={{ background: 'rgba(251,146,60,0.1)', border: '1px solid rgba(251,146,60,0.2)' }}
                  >
                    {origin.split(' ')[0]}
                  </div>
                  <p className="font-display font-light text-xl text-white mb-1">{name}</p>
                  <p className="text-[10px] tracking-wider uppercase font-body mb-4" style={{ color: '#fb923c' }}>
                    {role}
                  </p>
                  <p className="text-xs text-white/35 font-body">{origin.replace(origin.split(' ')[0] + ' ', '')}</p>
                  <p className="text-xs text-white/25 font-body mt-1">{years}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Quote ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          className="text-center py-16 relative"
        >
          <div
            className="absolute inset-0 rounded-3xl"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(251,146,60,0.12)' }}
            aria-hidden
          />
          <div className="relative z-10">
            <p
              className="font-display font-thin italic text-white/75 leading-relaxed"
              style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)' }}
            >
              « Voyager n'est pas fuir —
              <br />
              <span style={{ color: '#fb923c' }}>c'est enfin arriver. »</span>
            </p>
            <p className="text-[10px] text-white/20 tracking-widest mt-6 font-body uppercase">
              — Nihon Guide
            </p>
          </div>
        </motion.div>

      </div>
    </main>
  );
}