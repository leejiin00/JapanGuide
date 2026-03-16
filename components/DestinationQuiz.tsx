'use client'

// components/DestinationQuiz.tsx
// Quiz "Quelle destination vous correspond ?"
// 3 questions → résultat animé → lien vers la destination

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

// ─── Types ────────────────────────────────────────────────────
interface Choice {
  label:   string
  icon:    string
  scores:  Record<string, number> // slug → points
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

// ─── Data ─────────────────────────────────────────────────────
const QUESTIONS: Question[] = [
  {
    kanji:    '旅',
    question: 'Quelle est votre vision du voyage idéal ?',
    choices: [
      {
        label:  'Spiritualité & silence',
        icon:   '🕯️',
        scores: { kyoto: 3, nara: 2, hakone: 1 },
      },
      {
        label:  'Énergie urbaine & néons',
        icon:   '🏙️',
        scores: { tokyo: 3, osaka: 2 },
      },
      {
        label:  'Nature & ressourcement',
        icon:   '🌿',
        scores: { hakone: 3, nara: 2, hiroshima: 1 },
      },
      {
        label:  'Gastronomie & fête',
        icon:   '🍜',
        scores: { osaka: 3, tokyo: 1, kyoto: 1 },
      },
    ],
  },
  {
    kanji:    '心',
    question: 'Ce qui vous touche profondément...',
    choices: [
      {
        label:  'Les traces du temps qui passe',
        icon:   '⛩️',
        scores: { kyoto: 3, nara: 2, hiroshima: 1 },
      },
      {
        label:  'La beauté brute de la nature',
        icon:   '🗻',
        scores: { hakone: 3, nara: 1 },
      },
      {
        label:  'Le chaos vivant des villes',
        icon:   '🚦',
        scores: { tokyo: 3, osaka: 2 },
      },
      {
        label:  'Les histoires humaines',
        icon:   '🕊️',
        scores: { hiroshima: 3, kyoto: 1, nara: 1 },
      },
    ],
  },
  {
    kanji:    '夢',
    question: 'Votre souvenir de voyage parfait serait...',
    choices: [
      {
        label:  'Un bain chaud face au Fuji',
        icon:   '♨️',
        scores: { hakone: 3 },
      },
      {
        label:  'Se perdre dans une ruelle la nuit',
        icon:   '🏮',
        scores: { kyoto: 2, osaka: 2, tokyo: 1 },
      },
      {
        label:  'Un cerf qui s\'incline devant moi',
        icon:   '🦌',
        scores: { nara: 3 },
      },
      {
        label:  'Voir le soleil se lever sur la mer',
        icon:   '🌅',
        scores: { hiroshima: 2, hakone: 1, tokyo: 1 },
      },
    ],
  },
]

const RESULTS: Record<string, Result> = {
  kyoto: {
    slug:        'kyoto',
    kanji:       '京都',
    name:        'Kyoto',
    subtitle:    "L'Âme Ancienne",
    reason:      'Vous cherchez la profondeur, le silence et la beauté millénaire. Kyoto vous attend au détour de chaque ruelle pavée.',
    accentColor: '#c084fc',
    icon:        '⛩️',
  },
  tokyo: {
    slug:        'tokyo',
    kanji:       '東京',
    name:        'Tokyo',
    subtitle:    'Lumières Infinies',
    reason:      "Vous vibrez avec l'énergie des villes vivantes. Tokyo est la seule métropole qui ne vous laissera jamais indifférent.",
    accentColor: '#38bdf8',
    icon:        '🏙️',
  },
  hakone: {
    slug:        'hakone',
    kanji:       '箱根',
    name:        'Hakone',
    subtitle:    'Le Souffle du Fuji',
    reason:      'Vous avez besoin de grand air et de beauté naturelle. Hakone et ses onsen face au Fuji vous ressourceront profondément.',
    accentColor: '#fb923c',
    icon:        '🗻',
  },
  osaka: {
    slug:        'osaka',
    kanji:       '大阪',
    name:        'Osaka',
    subtitle:    "L'Art de Vivre",
    reason:      "Vous aimez rire, manger et vivre intensément. Osaka est le Japon sans filtre — chaleureux, festif et irrésistible.",
    accentColor: '#f472b6',
    icon:        '🏯',
  },
  nara: {
    slug:        'nara',
    kanji:       '奈良',
    name:        'Nara',
    subtitle:    'Les Gardiens Sacrés',
    reason:      "Vous recherchez la douceur et le sacré. Nara et ses cerfs divins vous offriront un moment hors du temps.",
    accentColor: '#34d399',
    icon:        '🦌',
  },
  hiroshima: {
    slug:        'hiroshima',
    kanji:       '広島',
    name:        'Hiroshima',
    subtitle:    'Mémoire & Renaissance',
    reason:      "Vous êtes touché par les histoires humaines et la résilience. Hiroshima vous marquera à jamais.",
    accentColor: '#94a3b8',
    icon:        '🕊️',
  },
}

// ─── Helper ───────────────────────────────────────────────────
function computeResult(answers: number[]): Result {
  const scores: Record<string, number> = {}

  answers.forEach((choiceIndex, questionIndex) => {
    const choice = QUESTIONS[questionIndex].choices[choiceIndex]
    Object.entries(choice.scores).forEach(([slug, pts]) => {
      scores[slug] = (scores[slug] ?? 0) + pts
    })
  })

  const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
  return RESULTS[winner]
}

// ─── Sub-components ───────────────────────────────────────────

function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex gap-2 justify-center mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            width:   i === current ? 24 : 8,
            opacity: i <= current ? 1 : 0.3,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="h-1.5 rounded-full"
          style={{ background: i <= current ? '#fb923c' : 'rgba(255,255,255,0.2)' }}
        />
      ))}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────
export default function DestinationQuiz() {
  const router   = useRouter()
  const [open,   setOpen]    = useState(false)
  const [step,   setStep]    = useState(0)       // 0-2 = questions, 3 = résultat
  const [answers, setAnswers] = useState<number[]>([])
  const [result,  setResult]  = useState<Result | null>(null)
  const [hoveredChoice, setHoveredChoice] = useState<number | null>(null)

  const handleOpen = () => {
    setStep(0)
    setAnswers([])
    setResult(null)
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  const handleChoice = (choiceIndex: number) => {
    const newAnswers = [...answers, choiceIndex]
    setAnswers(newAnswers)

    if (newAnswers.length === QUESTIONS.length) {
      // Toutes les questions répondues → calcul du résultat
      const res = computeResult(newAnswers)
      setResult(res)
      setStep(QUESTIONS.length) // step 3 = résultat
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

  return (
    <>
      {/* ── Trigger button ── */}
      <motion.button
        onClick={handleOpen}
        whileHover={{
          scale: 1.05,
          boxShadow: '0 0 40px rgba(251,146,60,0.35)',
        }}
        whileTap={{ scale: 0.97 }}
        className="px-9 py-4 rounded-full text-sm tracking-widest uppercase font-body font-medium flex items-center gap-3"
        style={{
          background: 'linear-gradient(135deg, #fb923c, #f59e0b)',
          color:      '#000',
          boxShadow:  '0 0 25px rgba(251,146,60,0.3)',
        }}
      >
        <span>✦</span>
        Trouver ma destination
      </motion.button>

      {/* ── Modal overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: 'rgba(6,4,16,0.92)', backdropFilter: 'blur(16px)' }}
            onClick={(e) => e.target === e.currentTarget && handleClose()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              exit={{    opacity: 0, scale: 0.92, y: 24 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg rounded-3xl overflow-hidden"
              style={{
                background:    'rgba(12,8,32,0.95)',
                border:        '1px solid rgba(255,255,255,0.08)',
                backdropFilter:'blur(24px)',
                boxShadow:     '0 40px 100px rgba(0,0,0,0.6)',
              }}
            >
              {/* Ambient glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(251,146,60,0.08), transparent)',
                }}
                aria-hidden
              />

              <div className="relative z-10 p-8">

                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-6 right-6 text-white/25 hover:text-white/60 transition-colors text-lg"
                  aria-label="Fermer"
                >
                  ✕
                </button>

                <AnimatePresence mode="wait">

                  {/* ── Questions ── */}
                  {step < QUESTIONS.length && (
                    <motion.div
                      key={`q-${step}`}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0  }}
                      exit={{    opacity: 0, x: -30 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Header */}
                      <div className="text-center mb-6">
                        <p
                          className="font-display font-thin text-5xl mb-2"
                          style={{ color: '#fb923c' }}
                        >
                          {currentQuestion.kanji}
                        </p>
                        <p
                          className="text-[10px] tracking-[0.3em] uppercase font-body mb-1"
                          style={{ color: 'rgba(255,255,255,0.3)' }}
                        >
                          Question {step + 1} / {QUESTIONS.length}
                        </p>
                        <ProgressDots total={QUESTIONS.length} current={step} />
                        <h2
                          className="font-display font-thin text-white"
                          style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}
                        >
                          {currentQuestion.question}
                        </h2>
                      </div>

                      {/* Choices */}
                      <div className="grid grid-cols-2 gap-3 mt-8">
                        {currentQuestion.choices.map((choice, i) => (
                          <motion.button
                            key={i}
                            onClick={() => handleChoice(i)}
                            onHoverStart={() => setHoveredChoice(i)}
                            onHoverEnd={() => setHoveredChoice(null)}
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            animate={{
                              boxShadow: hoveredChoice === i
                                ? '0 12px 40px rgba(251,146,60,0.2)'
                                : '0 2px 12px rgba(0,0,0,0.3)',
                              borderColor: hoveredChoice === i
                                ? 'rgba(251,146,60,0.4)'
                                : 'rgba(255,255,255,0.07)',
                            }}
                            className="rounded-2xl p-4 text-left flex flex-col gap-2 cursor-pointer"
                            style={{
                              background: 'rgba(255,255,255,0.04)',
                              border:     '1px solid rgba(255,255,255,0.07)',
                            }}
                          >
                            <span className="text-2xl">{choice.icon}</span>
                            <span
                              className="text-xs font-body leading-tight"
                              style={{ color: 'rgba(255,255,255,0.75)' }}
                            >
                              {choice.label}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ── Résultat ── */}
                  {step === QUESTIONS.length && result && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1   }}
                      exit={{    opacity: 0             }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="text-center"
                    >
                      {/* Glow derrière l'icône */}
                      <div className="relative inline-block mb-6">
                        <motion.div
                          className="absolute inset-0 rounded-full blur-2xl"
                          style={{ background: result.accentColor, opacity: 0.3 }}
                          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                          aria-hidden
                        />
                        <span className="relative text-6xl">{result.icon}</span>
                      </div>

                      <p
                        className="text-[10px] tracking-[0.4em] uppercase font-body mb-2"
                        style={{ color: result.accentColor }}
                      >
                        Votre destination
                      </p>

                      <p
                        className="font-display font-thin mb-1"
                        style={{ fontSize: '4rem', color: result.accentColor, lineHeight: 1 }}
                      >
                        {result.kanji}
                      </p>

                      <h3
                        className="font-display font-thin text-white mb-1"
                        style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}
                      >
                        {result.name}
                      </h3>

                      <p
                        className="text-sm font-body italic mb-5"
                        style={{ color: result.accentColor + 'aa' }}
                      >
                        {result.subtitle}
                      </p>

                      {/* Séparateur */}
                      <div
                        className="mx-auto mb-5 h-px w-24"
                        style={{ background: `linear-gradient(to right, transparent, ${result.accentColor}60, transparent)` }}
                      />

                      <p className="text-sm text-white/50 font-body leading-relaxed mb-8 px-2">
                        {result.reason}
                      </p>

                      {/* CTAs */}
                      <div className="flex gap-3 justify-center flex-wrap">
                        <motion.button
                          onClick={() => router.push(`/destination/${result.slug}`)}
                          whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${result.accentColor}50` }}
                          whileTap={{ scale: 0.97 }}
                          className="px-7 py-3 rounded-full text-xs tracking-widest uppercase font-body font-medium"
                          style={{
                            background: `linear-gradient(135deg, ${result.accentColor}, ${result.accentColor}bb)`,
                            color:      '#000',
                          }}
                        >
                          Explorer {result.name} →
                        </motion.button>

                        <motion.button
                          onClick={handleRestart}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                          className="px-7 py-3 rounded-full text-xs tracking-widest uppercase font-body"
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            border:     '1px solid rgba(255,255,255,0.12)',
                            color:      'rgba(255,255,255,0.5)',
                          }}
                        >
                          Recommencer
                        </motion.button>
                      </div>

                      {/* Lien voir toutes */}
                      <button
                        onClick={() => router.push('/destinations')}
                        className="mt-5 text-[10px] tracking-wider uppercase font-body underline underline-offset-4 block mx-auto"
                        style={{ color: 'rgba(255,255,255,0.2)' }}
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