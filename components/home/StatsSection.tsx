'use client'
// components/home/StatsSection.tsx
// Bande de statistiques sur le Japon.
// Extrait de HomeClient.tsx.

import { motion } from 'framer-motion'

const STATS = [
  { value: '47',    suffix: '',  label: 'Préfectures'    },
  { value: '3 776', suffix: 'm', label: 'Mont Fuji'      },
  { value: '125',   suffix: 'M', label: 'Habitants'      },
  { value: '2 000', suffix: '+', label: "Ans d'histoire" },
]

/**
 * Section de statistiques animées sur le Japon.
 */
export default function StatsSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
      className="py-16 relative"
      style={{
        background:   'rgba(255,255,255,0.02)',
        borderTop:    '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div className="max-w-6xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map(({ value, suffix, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <p className="text-3xl font-display font-thin text-white mb-1">
              {value}<span style={{ color: '#fb923c' }}>{suffix}</span>
            </p>
            <p className="text-[10px] tracking-widest uppercase font-body" style={{ color: 'rgba(255,255,255,0.28)' }}>
              {label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
