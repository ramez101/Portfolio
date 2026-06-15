import SectionLabel from '@/components/ui/SectionLabel'
import { experiences } from '@/lib/data'

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative z-10 px-6 py-24 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <SectionLabel text="// work_experience" />
        <h2 className="font-grotesk font-bold text-4xl lg:text-5xl text-[var(--ice)] mb-4 leading-[1.1]">
          Parcours professionnel
        </h2>
        <p className="text-[var(--slate)] mb-14 max-w-xl">
          Des environnements exigeants qui ont forgé des réflexes solides.
        </p>

        <div className="relative pl-8 border-l border-[var(--border)]">
          {experiences.map((exp, i) => (
            <div key={i} className="relative mb-14 last:mb-0">
              {/* Dot */}
              <div className="absolute -left-[2.15rem] top-1 w-3 h-3 rounded-full bg-[var(--blue)] shadow-[0_0_0_5px_rgba(155,50,244,0.14)]" />

              <p className="font-mono text-[0.72rem] text-[var(--blue)] mb-1">{exp.period}</p>
              <h3 className="font-grotesk font-bold text-xl text-[var(--ice)] mb-0.5">{exp.title}</h3>
              <p className="text-[var(--slate)] text-sm mb-4">
                {exp.company} · {exp.location}
              </p>

              <ul className="flex flex-col gap-2">
                {exp.bullets.map((bullet, j) => (
                  <li key={j} className="flex gap-3 text-[var(--slate)] text-sm leading-relaxed">
                    <span className="text-[var(--blue)] text-[0.65rem] mt-1.5 flex-shrink-0">▸</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
