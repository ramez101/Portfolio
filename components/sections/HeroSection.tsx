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
      className="relative z-10 min-h-screen px-4 pb-16 pt-32 sm:pt-36 lg:px-8"
    >
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[24px] border border-white/80 bg-white/[0.88] shadow-[0_28px_100px_rgba(17,28,47,0.14)] backdrop-blur-xl">
        <div className="grid min-h-[590px] grid-cols-1 lg:grid-cols-[1fr_0.82fr]">
          <div className="flex flex-col justify-center px-7 py-10 sm:px-10 lg:px-14">
            <div className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(155,50,244,0.18)] bg-[var(--blue-glow)] px-3.5 py-1.5 text-[0.7rem] font-bold text-[var(--blue)]">
              <span className="h-2 w-2 rounded-full bg-[var(--blue)]" />
              Disponible pour missions &amp; alternances
            </div>

            <h1 className="font-grotesk text-4xl font-bold leading-[1.05] text-[var(--ice)] sm:text-5xl lg:text-6xl">
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
                className="accent-gradient rounded-lg px-6 py-3 text-sm font-bold text-white shadow-[0_16px_36px_rgba(155,50,244,0.26)] transition-transform hover:-translate-y-0.5"
              >
                Voir mes projets
              </button>
              <button
                type="button"
                onClick={() => scrollTo('#contact')}
                className="rounded-lg border border-[var(--border)] bg-white px-6 py-3 text-sm font-bold text-[var(--ice)] transition-colors hover:border-[var(--blue)] hover:text-[var(--blue)]"
              >
                Me contacter
              </button>
            </div>

            <div className="mt-12 grid grid-cols-3 border-t border-[var(--border)] pt-7">
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

          <div className="relative flex items-center justify-center bg-[var(--navy-3)] p-7 lg:p-9">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(155,50,244,0.08),rgba(255,56,184,0.06)_46%,rgba(255,255,255,0.7))]" />
            <div className="relative h-[460px] w-full max-w-[340px] overflow-hidden rounded-lg border border-white bg-white shadow-[0_24px_70px_rgba(17,28,47,0.18)] sm:h-[530px]">
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
