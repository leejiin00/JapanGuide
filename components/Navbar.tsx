'use client'

// components/Navbar.tsx

// Cette partie là sert à importer les outils nécessaires au routage et aux animations interactives.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

// C'est une excellente pratique de sortir la configuration des liens en dehors du composant pour ne pas polluer le JSX et faciliter les modifications futures.
const navLinks = [
  { href: '/',            label: 'Accueil'      },
  { href: '/destination', label: 'Destinations' },
  { href: '/apps',        label: 'Applications' },
  { href: '/a-propos',    label: 'À Propos'     },
]

export default function Navbar() {
  const pathname = usePathname()
  
  // Ces deux états locaux gèrent le comportement de la barre.
  const [scrolled,  setScrolled]  = useState(false) // Permet de savoir si on a commencé à descendre sur la page.
  const [menuOpen,  setMenuOpen]  = useState(false) // Gère l'ouverture du menu mobile.

  // Cette partie concerne la détection du défilement.
  useEffect(() => {
    // Si l'utilisateur a défilé de plus de 40 pixels, on passe "scrolled" à true.
    const handleScroll = () => setScrolled(window.scrollY > 40)
    
    // J'ai fait ça pour écouter le scroll. L'option "{ passive: true }" est une super bonne pratique de performance : elle dit au navigateur qu'on ne va pas bloquer le défilement naturel (avec un e.preventDefault()), ce qui rend le scroll beaucoup plus fluide sur mobile.
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Le "return" dans un useEffect sert de fonction de nettoyage (cleanup). Si le composant est détruit, on enlève l'écouteur d'événement pour éviter les fuites de mémoire.
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // J'ai fait ça pour forcer la fermeture du menu mobile (plein écran) dès que l'utilisateur clique sur un lien et change de page (pathname change).
  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
        // Cette partie là sert à modifier l'apparence de la barre (fond flouté et bordure) dynamiquement selon qu'on a défilé (scrolled) ou non.
        style={{
          background:          scrolled ? 'rgba(6,4,16,0.88)' : 'rgba(6,4,16,0.4)',
          backdropFilter:      'blur(24px)',
          WebkitBackdropFilter:'blur(24px)',
          borderBottom:        scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          transition:          'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <motion.span
            className="text-2xl leading-none"
            style={{ color: '#fb923c', fontFamily: 'Cormorant Garamond, serif' }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            日
          </motion.span>
          <div>
            <p className="text-white font-light text-sm tracking-[0.2em] uppercase leading-none font-body">
              Nihon
            </p>
            <p
              className="text-[10px] tracking-[0.15em] leading-none mt-0.5 font-body"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            >
              Guide Mystique
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            // Cette logique sert à savoir si le lien actuel correspond à la page affichée. Pour l'accueil ('/'), il faut une correspondance stricte. Pour les autres, un "startsWith" suffit (pour que le menu "Destinations" reste allumé quand on est sur "/destination/tokyo").
            const isActive = href === '/'
              ? pathname === '/'
              : pathname.startsWith(href)
              
            return (
              <Link key={href} href={href}>
                <motion.span
                  className="relative px-4 py-2 text-xs tracking-[0.2em] uppercase block font-body"
                  style={{ color: isActive ? '#fb923c' : 'rgba(255,255,255,0.4)' }}
                  whileHover={{ color: '#fb923c' }}
                  transition={{ duration: 0.2 }}
                >
                  {/* On retrouve la fameuse astuce "layoutId" de Framer Motion vue précédemment ! Cela fait glisser la surbrillance d'un onglet à l'autre. */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: 'rgba(251,146,60,0.08)',
                        border:     '1px solid rgba(251,146,60,0.2)',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative">{label}</span>
                </motion.span>
              </Link>
            )
          })}
        </nav>

        {/* CTA + burger */}
        <div className="flex items-center gap-3">
          <motion.a
            href="/destination"
            whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(251,146,60,0.45)' }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:block px-5 py-2 rounded-full text-[11px] tracking-[0.2em] uppercase font-medium font-body"
            style={{
              background: 'linear-gradient(135deg, #fb923c, #f59e0b)',
              color:      '#000',
              boxShadow:  '0 0 20px rgba(251,146,60,0.25)',
            }}
          >
            Explorer
          </motion.a>

          {/* Mobile burger */}
          {/* Cette partie concerne la création d'un bouton burger personnalisé composé de 3 lignes de HTML/CSS animées, sans utiliser d'image externe. */}
          <button
            className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {/* Ligne du haut : elle s'incline à 45 degrés pour faire la barre de la croix. */}
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              className="block w-5 h-px bg-white origin-center"
            />
            {/* Ligne du milieu : elle disparaît complètement. */}
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              className="block w-5 h-px bg-white"
            />
            {/* Ligne du bas : elle s'incline à -45 degrés pour finir la croix. */}
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              className="block w-5 h-px bg-white origin-center"
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      {/* J'ai fait ça (AnimatePresence) pour permettre au menu mobile de jouer son animation de fondu de sortie ("exit") quand il se ferme. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: 'rgba(6,4,16,0.97)', backdropFilter: 'blur(24px)' }}
          >
            <nav className="flex flex-col items-center gap-7">
              {navLinks.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  // L'utilisation de "i * 0.07" crée un joli effet d'apparition en cascade (stagger) pour les liens du menu.
                  transition={{ delay: i * 0.07 + 0.1 }}
                >
                  <Link
                    href={href}
                    className="text-3xl font-thin text-white hover:text-orange-400 transition-colors font-display"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="mt-4"
              >
                <Link
                  href="/destination"
                  className="px-8 py-3 rounded-full text-sm tracking-widest uppercase font-medium font-body"
                  style={{ background: 'linear-gradient(135deg, #fb923c, #f59e0b)', color: '#000' }}
                >
                  Explorer le Japon
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}