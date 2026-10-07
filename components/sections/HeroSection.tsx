'use client'

import HeroScene from '@/components/ui/HeroScene'

const heroStats = [
  { value: '2+', label: 'ans d’expérience' },
  { value: '6', label: 'projets livrés' },
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
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="hero-copy flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14">

            <p className="hero-kicker mb-4 font-mono text-[0.68rem] uppercase tracking-[0.2em]">
              Bonjour, je suis Ramez
            </p>

            <h1 className="hero-title font-grotesk text-[clamp(2.6rem,6vw,5.25rem)] font-bold leading-[0.93] tracking-[-0.07em]">
              Je transforme les idées
              <br />
              en expériences <span>digitales.</span>
            </h1>

            <p className="hero-description mt-6 max-w-lg text-sm leading-7 sm:text-base">
              Développeur web full-stack basé à Tunis. Je conçois des applications modernes,
              des plateformes métier et des expériences web solides, du back-end au front-end.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollTo('#projects')}
                className="accent-gradient primary-button"
              >
                Voir mes projets
              </button>
              <button
                type="button"
                onClick={() => scrollTo('#contact')}
                className="secondary-button"
              >
                Me contacter
              </button>
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

          <div className="hero-visual-panel relative flex min-h-[420px] items-center justify-center overflow-hidden p-4 sm:p-7 lg:p-9">
            <HeroScene />
          </div>
        </div>
      </div>
    </section>
  )
}
