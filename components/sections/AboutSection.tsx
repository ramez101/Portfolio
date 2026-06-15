import SectionLabel from '@/components/ui/SectionLabel'
import { skills } from '@/lib/data'

const stats = [
  { num: '2+', label: 'ans d\'expérience' },
  { num: '5+', label: 'projets livrés' },
  { num: '2', label: 'secteurs (banking & retail)' },
  { num: '4', label: 'langues maîtrisées' },
]

export default function AboutSection() {
  return (
    <section id="about" className="relative z-10 px-6 py-24 lg:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* Left — text */}
        <div>
          <SectionLabel text="// about_me" />
          <h2 className="font-grotesk font-bold text-4xl lg:text-5xl text-[var(--ice)] mb-6 leading-[1.1]">
            Passionné de code,<br />orienté résultats
          </h2>
          <p className="text-[var(--slate)] mb-4 leading-relaxed">
            Développeur web full-stack titulaire d&apos;une licence en génie logiciel, avec une expérience dans le secteur bancaire (BTK Finance / BTK Bank) et le retail (Groupe Elloumi).
          </p>
          <p className="text-[var(--slate)] mb-4 leading-relaxed">
            J&apos;aime créer des outils qui simplifient des processus complexes — que ce soit une plateforme de gestion d&apos;archives, un chatbot IA, ou un module e-commerce sur mesure.
          </p>
          <p className="text-[var(--slate)] leading-relaxed">
            Toujours curieux, je m&apos;intéresse activement à l&apos;intelligence artificielle, à l&apos;automatisation et aux architectures modernes.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mt-10">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-[var(--border)] bg-white/[0.82] p-5 shadow-[0_14px_34px_rgba(17,28,47,0.06)]"
              >
                <div className="font-grotesk font-bold text-3xl text-[var(--blue)] leading-none mb-1">
                  {s.num}
                </div>
                <div className="text-[var(--slate)] text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — skill bars */}
        <div>
          <SectionLabel text="// top_skills" />
          <div className="flex flex-col gap-5">
            {skills.map((skill, i) => (
              <div key={skill.name} className="flex items-center gap-4">
                <span className="font-mono text-[0.78rem] text-[var(--slate)] w-28 flex-shrink-0">
                  {skill.name}
                </span>
                <div className="flex-1 h-1.5 bg-[rgba(17,28,47,0.08)] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,var(--blue),var(--pink))]"
                    style={{
                      width: `${skill.level}%`,
                      animation: `growBar 1.4s cubic-bezier(.16,1,.3,1) ${i * 0.1}s both`,
                    }}
                  />
                </div>
                <span className="font-mono text-[0.7rem] text-[var(--blue)] w-8 text-right">
                  {skill.level}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
