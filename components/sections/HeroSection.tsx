'use client'

import HeroScene from '@/components/ui/HeroScene'

const heroStats = [
  { value: '2+', label: 'ans d’expérience' },
  { value: '8', label: 'projets présentés' },
  { value: '2', label: 'secteurs métier' },
]

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-screen items-center px-0 pb-0 pt-0"
    >
      <div className="hero-shell min-h-screen w-full overflow-hidden rounded-none">
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="hero-copy flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14" data-reveal>

            <p className="hero-kicker mb-4 font-mono text-[0.68rem] uppercase tracking-[0.2em]">
              Bonjour, moi c&apos;est Ramez · Disponible pour vos projets
            </p>

            <h1 className="hero-title font-grotesk text-[clamp(2.6rem,4.8vw,4.5rem)] font-bold leading-[0.96] tracking-[-0.065em]">
              Développeur
              <br />
              <span>Full-Stack.</span>
            </h1>

            <p className="hero-description mt-6 max-w-lg text-sm leading-7 sm:text-base">
              Basé à Tunis, j&apos;imagine et je construis des produits web modernes,
              des applications métier et des expériences numériques qui font la différence.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollTo('#projects')}
                className="accent-gradient primary-button"
              >
                Explorer mes projets <span aria-hidden="true">↗</span>
              </button>
              <button
                type="button"
                onClick={() => scrollTo('#contact')}
                className="secondary-button"
              >
                Parlons de votre idée
              </button>
            </div>

            <div className="hero-socials mt-7 flex items-center gap-3">
              <a
                href="https://linkedin.com/in/ramez-werfelli"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Voir le profil LinkedIn de Ramez"
                className="hero-social-link"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6.5 9v9M6.5 6.5v.01M10.5 18v-9h3.3v1.4c.5-.9 1.5-1.6 3-1.6 2.3 0 3.7 1.4 3.7 4.3V18h-3.2v-4.5c0-1.4-.5-2.2-1.7-2.2-1.3 0-1.9.9-1.9 2.4V18h-3.2Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="mailto:ramez.werfelli9@gmail.com"
                aria-label="Envoyer un e-mail à Ramez"
                className="hero-social-link"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3.5" y="5" width="17" height="14" rx="3" stroke="currentColor" strokeWidth="1.7" />
                  <path d="m5 7 7 5.5L19 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <span className="hero-social-caption">Connectons-nous</span>
            </div>

            <div className="hero-stats mt-10 grid grid-cols-3 pt-6 sm:mt-12 sm:pt-7">
              {heroStats.map((stat) => (
                <div key={stat.label} className="pr-4">
                  <div className="hero-stat-value font-grotesk text-2xl font-bold sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="hero-stat-label mt-1 text-[0.68rem] font-semibold leading-tight sm:text-xs">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual-panel relative flex min-h-[420px] items-center justify-center overflow-hidden p-4 sm:p-7 lg:p-9" data-reveal>
            <HeroScene />
          </div>
        </div>
      </div>
    </section>
  )
}
