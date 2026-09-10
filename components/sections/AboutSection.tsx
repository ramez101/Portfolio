import SectionLabel from '@/components/ui/SectionLabel'

const stats = [
  { num: '2+', label: 'ans d\'expérience' },
  { num: '5+', label: 'projets livrés' },
  { num: '2', label: 'secteurs (banking & retail)' },
  { num: '4', label: 'langues maîtrisées' },
]

export default function AboutSection() {
  return (
    <section id="about" className="page-section px-4 sm:px-6 lg:px-8">
      <div className="section-shell grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <SectionLabel text="// about_me" />
          <h2 className="section-title mb-6">
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

        <div className="grid grid-cols-2 gap-3 self-center sm:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass-card rounded-2xl p-4 transition-transform duration-200 hover:-translate-y-1 sm:p-5"
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
