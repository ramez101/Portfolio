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
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('mobile-menu-open', menuOpen)

    return () => document.body.classList.remove('mobile-menu-open')
  }, [menuOpen])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`site-nav fixed left-0 right-0 top-3 z-50 px-3 transition-all duration-300 sm:top-5 sm:px-5 ${
        scrolled ? 'site-nav--scrolled' : 'site-nav--transparent'
      }`}
    >
      <div
        className="site-nav__panel mx-auto w-full rounded-2xl border px-4 py-3 transition-all duration-300 sm:px-5 lg:px-7"
      >
        {/* Logo */}
        <div className="flex items-center justify-between gap-5">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 text-left"
            aria-label="Retour en haut"
          >
            <span className="site-nav__logo flex h-10 w-12 items-center justify-center rounded-xl px-2 sm:h-11 sm:w-14">
              <Image
                src="/RW.png"
                alt="RW"
                width={48}
                height={24}
                className="h-auto w-full object-contain invert"
                priority
              />
            </span>
            <span className="site-nav__name font-grotesk text-base font-bold tracking-tight sm:text-xl">
              Ramez Werfelli
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <button
                  type="button"
                  onClick={() => handleNav(l.href)}
                  className="site-nav__link text-sm font-semibold transition-colors"
                >
                  {l.label}
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => handleNav('#contact')}
                className="accent-gradient primary-button px-5 py-2.5"
              >
                Contact
              </button>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="site-nav__menu flex h-11 w-11 items-center justify-center rounded-xl border transition-colors lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-controls="mobile-navigation"
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
          <div id="mobile-navigation" className="site-nav__mobile-menu mt-4 flex flex-col gap-1 border-t pt-4 lg:hidden">
            {links.map((l) => (
              <button
                key={l.href}
                type="button"
                onClick={() => handleNav(l.href)}
                className="site-nav__mobile-link rounded-xl px-3 py-3 text-left text-sm font-semibold transition-colors"
              >
                {l.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleNav('#contact')}
              className="accent-gradient primary-button mt-2 w-full"
            >
              Contact
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
