import SectionLabel from '@/components/ui/SectionLabel'

const stats = [
  { num: '2+', label: 'ans d\'expérience' },
  { num: '5+', label: 'projets livrés' },
  { num: '2', label: 'secteurs (banking & retail)' },
  { num: '4', label: 'langues maîtrisées' },
]

export default function AboutSection() {
  return (
    <section id="about" className="relative z-10 px-6 py-24 lg:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-start">
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
        </div>

        <div className="grid grid-cols-2 gap-4 self-center">
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
    </section>
  )
}
