'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const links = [
  { href: '#hero', label: 'Accueil' },
  { href: '#about', label: 'Profil' },
  { href: '#stack', label: 'Stack' },
  { href: '#projects', label: 'Projets' },
  { href: '#experience', label: 'Parcours' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="fixed left-0 right-0 top-4 z-50 px-4 transition-all duration-300"
    >
      <div
        className={`max-w-6xl mx-auto rounded-[24px] border border-white/80 bg-white/[0.88] px-5 py-4 shadow-[0_22px_80px_rgba(17,28,47,0.12)] backdrop-blur-xl transition-all duration-300 lg:px-8 ${
          scrolled ? 'translate-y-0 bg-white/[0.94]' : ''
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between gap-5">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 text-left"
            aria-label="Retour en haut"
          >
            <span className="flex h-11 w-14 items-center justify-center rounded-lg bg-[var(--ice)] px-2">
              <Image
                src="/RW.png"
                alt="RW"
                width={48}
                height={24}
                className="h-auto w-full object-contain invert"
                priority
              />
            </span>
            <span className="font-grotesk text-xl font-bold text-[var(--ice)]">
              Ramez Werfelli
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <button
                  type="button"
                  onClick={() => handleNav(l.href)}
                  className="text-sm font-semibold text-[var(--slate)] transition-colors hover:text-[var(--ice)]"
                >
                  {l.label}
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => handleNav('#contact')}
                className="accent-gradient rounded-lg px-5 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(155,50,244,0.28)] transition-transform hover:-translate-y-0.5"
              >
                Contact
              </button>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--ice)] md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {menuOpen ? (
                <path d="M4 4L18 18M4 18L18 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M3 6H19M3 11H19M3 16H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mt-5 flex flex-col gap-2 border-t border-[var(--border)] pt-5 md:hidden">
            {links.map((l) => (
              <button
                key={l.href}
                type="button"
                onClick={() => handleNav(l.href)}
                className="rounded-lg px-3 py-3 text-left text-sm font-semibold text-[var(--slate)] transition-colors hover:bg-[var(--navy-3)] hover:text-[var(--ice)]"
              >
                {l.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleNav('#contact')}
              className="accent-gradient mt-2 rounded-lg px-5 py-3 text-sm font-bold text-white"
            >
              Contact
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
