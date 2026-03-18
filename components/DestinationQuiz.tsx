'use client'

// components/DestinationQuiz.tsx

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface Choice {
  label:  string
  icon:   string
  // Ce record permet d'attribuer des points à différentes destinations pour un même choix. Ex: Plage -> Okinawa +3 pts, Hiroshima +1 pt.
  scores: Record<string, number>
}

interface Question {
  kanji:    string
  question: string
  choices:  Choice[]
}

interface Result {
  slug:        string
  kanji:       string
  name:        string
  subtitle:    string
  reason:      string
  accentColor: string
  icon:        string
}

// Cette partie concerne la base de données de notre quiz (questions et points). C'est statique, donc on la met en dehors du composant pour ne pas la recréer à chaque rendu.
const QUESTIONS: Question[] = [
  {
    kanji:    '旅',
    question: 'Quelle est votre vision du voyage idéal ?',
    choices: [
      { label: 'Spiritualité & silence',    icon: '🕯️', scores: { kyoto: 3, nara: 2, hakone: 1 } },
      { label: 'Énergie urbaine & néons',   icon: '🏙️', scores: { tokyo: 3, osaka: 2 } },
      { label: 'Nature & grands espaces',   icon: '🌿', scores: { hokkaido: 3, hakone: 2, nara: 1 } },
      { label: 'Plage & culture insulaire', icon: '🏖️', scores: { okinawa: 3, hiroshima: 1 } },
    ],
  },
  {
    kanji:    '心',
    question: 'Ce qui vous touche profondément...',
    choices: [
      { label: 'Les traces du temps qui passe',   icon: '⛩️', scores: { kyoto: 3, nara: 2, hiroshima: 1 } },
      { label: 'La beauté brute de la nature',    icon: '🗻', scores: { hokkaido: 3, hakone: 2 } },
      { label: 'Le chaos vivant des villes',      icon: '🚦', scores: { tokyo: 3, osaka: 2 } },
      { label: 'Une civilisation à part entière', icon: '🌺', scores: { okinawa: 3, kyoto: 1, nara: 1 } },
    ],
  },
  {
    kanji:    '夢',
    question: 'Votre souvenir de voyage parfait serait...',
    choices: [
      { label: 'Skier dans la meilleure poudreuse du monde', icon: '⛷️', scores: { hokkaido: 3, hakone: 1 } },
      { label: 'Se perdre dans une ruelle la nuit',          icon: '🏮', scores: { kyoto: 2, osaka: 2, tokyo: 1 } },
      { label: 'Nager avec des tortues dans un lagon turquoise', icon: '🐢', scores: { okinawa: 3, hiroshima: 1 } },
      { label: 'Voir le soleil se lever sur la mer',         icon: '🌅', scores: { hiroshima: 2, nara: 1, hakone: 1 } },
    ],
  },
]

// Cette partie là sert de dictionnaire (lookup table) pour récupérer les belles infos de la destination gagnante.
const RESULTS: Record<string, Result> = {
  kyoto:    { slug: 'kyoto',    kanji: '京都', name: 'Kyoto',    subtitle: "L'Âme Ancienne",       reason: 'Vous cherchez la profondeur, le silence et la beauté millénaire. Kyoto vous attend au détour de chaque ruelle pavée.',                                accentColor: '#c084fc', icon: '⛩️' },
  tokyo:    { slug: 'tokyo',    kanji: '東京', name: 'Tokyo',    subtitle: 'Lumières Infinies',     reason: "Vous vibrez avec l'énergie des villes vivantes. Tokyo est la seule métropole qui ne vous laissera jamais indifférent.",                         accentColor: '#38bdf8', icon: '🏙️' },
  hakone:   { slug: 'hakone',   kanji: '箱根', name: 'Hakone',   subtitle: 'Le Souffle du Fuji',    reason: 'Vous avez besoin de grand air et de beauté naturelle. Hakone et ses onsen face au Fuji vous ressourceront profondément.',                         accentColor: '#fb923c', icon: '🗻' },
  osaka:    { slug: 'osaka',    kanji: '大阪', name: 'Osaka',    subtitle: "L'Art de Vivre",        reason: "Vous aimez rire, manger et vivre intensément. Osaka est le Japon sans filtre — chaleureux, festif et irrésistible.",                              accentColor: '#f472b6', icon: '🏯' },
  nara:     { slug: 'nara',     kanji: '奈良', name: 'Nara',     subtitle: 'Les Gardiens Sacrés',   reason: "Vous recherchez la douceur et le sacré. Nara et ses cerfs divins vous offriront un moment hors du temps.",                                        accentColor: '#34d399', icon: '🦌' },
  hiroshima:{ slug: 'hiroshima',kanji: '広島', name: 'Hiroshima',subtitle: 'Mémoire & Renaissance', reason: "Vous êtes touché par les histoires humaines et la résilience. Hiroshima vous marquera à jamais.",                                                 accentColor: '#94a3b8', icon: '🕊️' },
  okinawa:  { slug: 'okinawa',  kanji: '沖縄', name: 'Okinawa',  subtitle: "L'Âme des Tropiques",   reason: "Vous rêvez de mer turquoise et de cultures insulaires uniques. Okinawa et son Royaume Ryukyu vous révéleront un Japon que vous n'imaginiez pas.",  accentColor: '#22d3ee', icon: '🏖️' },
  hokkaido: { slug: 'hokkaido', kanji: '北海道',name: 'Hokkaidō', subtitle: 'Le Grand Nord Sauvage', reason: "Vous aimez la nature démesurée et les grands espaces vierges. Hokkaidō — ses champs de lavande, sa poudreuse légendaire et ses volcans — est fait pour vous.", accentColor: '#818cf8', icon: '🏔️' },
}

// Cette partie concerne le "cerveau" du quiz. 
// J'ai fait ça en dehors du composant pour garder la logique pure et testable. Elle prend un tableau de réponses (ex: [0, 2, 1]) et retourne la destination qui a le plus de points.
function computeResult(answers: number[]): Result {
  const scores: Record<string, number> = {}
  
  // On boucle sur chaque réponse de l'utilisateur.
  answers.forEach((choiceIndex, questionIndex) => {
    // On retrouve le choix exact qu'il a cliqué pour cette question.
    const choice = QUESTIONS[questionIndex].choices[choiceIndex]
    
    // On ajoute les points de ce choix au total de chaque destination concernée.
    Object.entries(choice.scores).forEach(([slug, pts]) => {
      scores[slug] = (scores[slug] ?? 0) + pts // Si la destination n'a pas encore de points (undefined), on commence à 0 (grâce à ?? 0).
    })
  })
  
  // C'est un peu technique : on transforme l'objet des scores en tableau, on le trie par ordre décroissant de points (b[1] - a[1]), et on prend le slug du gagnant ([0][0]).
  const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
  return RESULTS[winner]
}

// Composant visuel simple pour afficher la barre de progression en haut du quiz.
function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex gap-2 justify-center mb-6">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ width: i === current ? 24 : 8, opacity: i <= current ? 1 : 0.3 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="h-1.5 rounded-full"
          style={{ background: i <= current ? '#fb923c' : 'rgba(255,255,255,0.2)' }}
        />
      ))}
    </div>
  )
}

export default function DestinationQuiz() {
  const router = useRouter()
  
  // Cette partie concerne les différents états du quiz.
  const [open,          setOpen]          = useState(false) // Modale ouverte ou fermée ?
  const [step,          setStep]          = useState(0) // Quelle question affiche-t-on ? (0, 1, 2...)
  const [answers,       setAnswers]       = useState<number[]>([]) // Historique des choix de l'utilisateur.
  const [result,        setResult]        = useState<Result | null>(null) // Résultat final.
  const [hoveredChoice, setHoveredChoice] = useState<number | null>(null) // Effet visuel au survol d'un choix.

  // Ouvre le quiz et remet tout à zéro.
  const handleOpen = () => {
    setStep(0)
    setAnswers([])
    setResult(null)
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  // Permet de revenir à la question précédente.
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
      setAnswers(answers.slice(0, -1)) // On enlève la dernière réponse de l'historique.
    }
  }

  // Cette partie là sert à enregistrer le choix de l'utilisateur quand il clique sur une option.
  const handleChoice = (choiceIndex: number) => {
    const newAnswers = [...answers, choiceIndex]
    setAnswers(newAnswers)
    
    // Si on a répondu à toutes les questions, on calcule le résultat. Sinon, on passe à la question suivante.
    if (newAnswers.length === QUESTIONS.length) {
      setResult(computeResult(newAnswers))
      setStep(QUESTIONS.length)
    } else {
      setStep(step + 1)
    }
  }

  const handleRestart = () => {
    setStep(0)
    setAnswers([])
    setResult(null)
  }

  const currentQuestion = QUESTIONS[step]
  // Permet de savoir facilement si on doit afficher une question ou l'écran de résultat final.
  const isQuestion = step < QUESTIONS.length

  return (
    <>
      {/* Le bouton d'appel à l'action initial (sur la page d'accueil) */}
      <motion.button
        onClick={handleOpen}
        whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(251,146,60,0.35)' }}
        whileTap={{ scale: 0.97 }}
        className="px-9 py-4 rounded-full text-sm tracking-widest uppercase font-body font-medium flex items-center gap-3"
        style={{ background: 'linear-gradient(135deg, #fb923c, #f59e0b)', color: '#000', boxShadow: '0 0 25px rgba(251,146,60,0.3)' }}
      >
        <span>✦</span>
        Trouver ma destination
      </motion.button>

      {/* Cette partie concerne la fenêtre modale (le pop-up) qui s'ouvre par-dessus la page. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-6 pt-24"
            style={{ background: 'rgba(6,4,16,0.92)', backdropFilter: 'blur(16px)' }}
            // J'ai fait ça pour permettre à l'utilisateur de fermer le quiz en cliquant n'importe où en dehors de la boîte centrale.
            onClick={(e) => e.target === e.currentTarget && handleClose()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              exit={{    opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg"
              style={{
                background:    'rgba(12,8,32,0.98)',
                border:        '1px solid rgba(255,255,255,0.1)',
                backdropFilter:'blur(24px)',
                borderRadius:  '24px',
                boxShadow:     '0 40px 100px rgba(0,0,0,0.8)',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(251,146,60,0.1), transparent)', borderRadius: '24px' }}
                aria-hidden
              />

              {/* Barre top (Bouton Retour et Fermer) */}
              <div className="relative z-10 flex items-center justify-between px-6 pt-6 pb-2">
                {isQuestion && step > 0 ? (
                  <motion.button
                    onClick={handleBack}
                    whileHover={{ x: -3 }}
                    className="flex items-center gap-1.5 text-xs tracking-wider uppercase font-body"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
                  >
                    ← Retour
                  </motion.button>
                ) : (
                  <span className="w-16" /> // Élément invisible pour garder le bouton "X" aligné à droite avec Flexbox (space-between).
                )}

                <button
                  onClick={handleClose}
                  className="flex items-center justify-center w-9 h-9 rounded-full font-body text-sm transition-all"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
                  aria-label="Fermer le quiz"
                >
                  ✕
                </button>
              </div>

              {/* Contenu dynamique */}
              <div className="relative z-10 px-8 pb-10 pt-2">
                <AnimatePresence mode="wait">

                  {/* ── Écran des Questions ── */}
                  {isQuestion && (
                    <motion.div
                      // L'utilisation de key={`q-${step}`} est super importante ici. Elle force React/FramerMotion à comprendre que c'est une nouvelle question et qu'il faut rejouer l'animation de glissement.
                      key={`q-${step}`}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0  }}
                      exit={{    opacity: 0, x: -24 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="text-center mb-7">
                        <p className="font-display font-thin text-5xl mb-3" style={{ color: '#fb923c' }}>
                          {currentQuestion.kanji}
                        </p>
                        <p className="text-[10px] tracking-[0.3em] uppercase font-body mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                          Question {step + 1} / {QUESTIONS.length}
                        </p>
                        <ProgressDots total={QUESTIONS.length} current={step} />
                        <h2 className="font-display font-thin text-white" style={{ fontSize: 'clamp(1.1rem, 3vw, 1.45rem)' }}>
                          {currentQuestion.question}
                        </h2>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {currentQuestion.choices.map((choice, i) => (
                          <motion.button
                            key={i}
                            onClick={() => handleChoice(i)}
                            onHoverStart={() => setHoveredChoice(i)}
                            onHoverEnd={() => setHoveredChoice(null)}
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            animate={{
                              boxShadow:   hoveredChoice === i ? '0 12px 40px rgba(251,146,60,0.2)' : '0 2px 12px rgba(0,0,0,0.3)',
                              borderColor: hoveredChoice === i ? 'rgba(251,146,60,0.4)' : 'rgba(255,255,255,0.07)',
                            }}
                            className="rounded-2xl p-4 text-left flex flex-col gap-2 cursor-pointer"
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                          >
                            <span className="text-2xl">{choice.icon}</span>
                            <span className="text-xs font-body leading-tight" style={{ color: 'rgba(255,255,255,0.75)' }}>
                              {choice.label}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ── Écran du Résultat ── */}
                  {!isQuestion && result && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1   }}
                      exit={{    opacity: 0             }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="text-center"
                    >
                      <div className="relative inline-block mb-5">
                        <motion.div
                          className="absolute inset-0 rounded-full blur-2xl"
                          style={{ background: result.accentColor, opacity: 0.3 }}
                          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                          aria-hidden
                        />
                        <span className="relative text-6xl">{result.icon}</span>
                      </div>

                      <p className="text-[10px] tracking-[0.4em] uppercase font-body mb-2" style={{ color: result.accentColor }}>
                        Votre destination
                      </p>
                      <p className="font-display font-thin mb-1" style={{ fontSize: '3.5rem', color: result.accentColor, lineHeight: 1 }}>
                        {result.kanji}
                      </p>
                      <h3 className="font-display font-thin text-white mb-1" style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)' }}>
                        {result.name}
                      </h3>
                      <p className="text-sm font-body italic mb-4" style={{ color: result.accentColor + 'aa' }}>
                        {result.subtitle}
                      </p>
                      <div className="mx-auto mb-4 h-px w-24" style={{ background: `linear-gradient(to right, transparent, ${result.accentColor}60, transparent)` }} />
                      <p className="text-sm text-white/50 font-body leading-relaxed mb-7 px-2">
                        {result.reason}
                      </p>

                      <div className="flex gap-3 justify-center flex-wrap">
                        {/* Ce bouton redirige l'utilisateur vers la page détaillée de la destination qu'il vient de "gagner". */}
                        <motion.button
                          onClick={() => { handleClose(); router.push(`/destination/${result.slug}`) }}
                          whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${result.accentColor}50` }}
                          whileTap={{ scale: 0.97 }}
                          className="px-7 py-3 rounded-full text-xs tracking-widest uppercase font-body font-medium"
                          style={{ background: `linear-gradient(135deg, ${result.accentColor}, ${result.accentColor}bb)`, color: '#000' }}
                        >
                          Explorer {result.name} →
                        </motion.button>
                        <motion.button
                          onClick={handleRestart}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                          className="px-7 py-3 rounded-full text-xs tracking-widest uppercase font-body"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }}
                        >
                          Recommencer
                        </motion.button>
                      </div>

                      <button
                        onClick={() => { handleClose(); router.push('/destination') }}
                        className="mt-5 text-[10px] tracking-wider uppercase font-body underline underline-offset-4 block mx-auto transition-colors"
                        style={{ color: 'rgba(255,255,255,0.2)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
                      >
                        Voir toutes les destinations
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}