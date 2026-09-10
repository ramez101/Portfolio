'use client'

import Image from 'next/image'

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
      className="relative z-10 flex min-h-screen items-center px-4 pb-10 pt-28 sm:px-6 sm:pt-32 lg:px-8"
    >
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/[0.78] shadow-[0_28px_100px_rgba(17,28,47,0.14)] backdrop-blur-xl">
        <div className="grid min-h-[590px] grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
            <div className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(37,99,235,0.18)] bg-[var(--blue-glow)] px-3.5 py-1.5 text-[0.7rem] font-bold text-[var(--blue)]">
              <span className="h-2 w-2 rounded-full bg-[var(--blue)] shadow-[0_0_0_4px_rgba(37,99,235,0.12)]" />
              Freelance – Disponible pour projets et missions
            </div>

            <h1 className="font-grotesk text-[clamp(2.6rem,7vw,5rem)] font-bold leading-[0.98] tracking-[-0.065em] text-[var(--ice)]">
              Bonjour, je suis
              <br />
              <span className="text-gradient">Ramez Werfelli</span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-[var(--slate)] sm:text-base">
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

            <div className="mt-10 grid grid-cols-3 border-t border-[var(--border)] pt-6 sm:mt-12 sm:pt-7">
              {heroStats.map((stat) => (
                <div key={stat.label} className="pr-4">
                  <div className="font-grotesk text-2xl font-bold text-[var(--ice)] sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[0.68rem] font-semibold leading-tight text-[var(--slate)] sm:text-xs">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-[var(--navy-3)] p-7 lg:p-9">
            <div className="float-slow absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="float-delayed absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-teal-300/25 blur-3xl" />
            <div className="relative h-[410px] w-full max-w-[320px] overflow-hidden rounded-2xl border border-white bg-white shadow-[0_24px_70px_rgba(17,28,47,0.18)] sm:h-[510px] sm:max-w-[340px]">
              <Image
                src="/Ramez.jpg"
                alt="Ramez Werfelli"
                fill
                sizes="(max-width: 480px) calc(100vw - 56px), 340px"
                quality={72}
                className="scale-[1.12] object-cover object-[50%_42%]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
