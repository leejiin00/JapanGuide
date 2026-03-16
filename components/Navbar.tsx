'use client'

// components/Navbar.tsx

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const navLinks = [
  { href: '/',             label: 'Accueil'      },
  { href: '/destinations', label: 'Destinations' }, // ← corrigé
  { href: '/a-propos',     label: 'À Propos'     },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{
          background:    scrolled ? 'rgba(6,4,16,0.88)' : 'rgba(6,4,16,0.4)',
          backdropFilter:'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom:  scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          transition:    'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
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
            <p className="text-[10px] tracking-[0.15em] leading-none mt-0.5 font-body" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Guide Mystique
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
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
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'rgba(251,146,60,0.08)', border: '1px solid rgba(251,146,60,0.2)' }}
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
            href="/destinations"
            whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(251,146,60,0.45)' }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:block px-5 py-2 rounded-full text-[11px] tracking-[0.2em] uppercase font-medium font-body"
            style={{
              background:  'linear-gradient(135deg, #fb923c, #f59e0b)',
              color:       '#000',
              boxShadow:   '0 0 20px rgba(251,146,60,0.25)',
            }}
          >
            Explorer
          </motion.a>

          {/* Mobile burger */}
          <button
            className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              className="block w-5 h-px bg-white origin-center"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              className="block w-5 h-px bg-white"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              className="block w-5 h-px bg-white origin-center"
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
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
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 + 0.1 }}
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
                transition={{ delay: 0.4 }}
                className="mt-4"
              >
                <Link
                  href="/destinations"
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