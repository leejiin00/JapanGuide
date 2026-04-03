'use client'
// components/home/HomeFooter.tsx
// Footer de la page d'accueil.
// Extrait de HomeClient.tsx.

/**
 * Footer minimal avec logo, baseline et copyright.
 */
export default function HomeFooter() {
  return (
    <footer className="py-12 px-8 relative" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-display" style={{ color: '#fb923c' }}>日</span>
          <div>
            <p className="text-white font-light text-sm tracking-widest uppercase font-body">Nihon Guide</p>
            <p className="text-[11px] font-body" style={{ color: 'rgba(255,255,255,0.18)' }}>Mystique & Immersif</p>
          </div>
        </div>

        <p className="text-[11px] tracking-wider font-body text-center" style={{ color: 'rgba(255,255,255,0.15)' }}>
          日本への旅 — Un guide conçu pour les âmes curieuses
        </p>

        <p className="text-[11px] font-body" style={{ color: 'rgba(255,255,255,0.18)' }}>
          © 2025 Nihon Guide
        </p>
      </div>
    </footer>
  )
}
