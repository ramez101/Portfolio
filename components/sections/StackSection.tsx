import SectionLabel from '@/components/ui/SectionLabel'
import { techStack } from '@/lib/data'

function TechCard({ tech }: { tech: (typeof techStack)[number] }) {
  return (
    <div
      className="tech-marquee__card glass-card flex min-h-[118px] w-[210px] shrink-0 flex-col rounded-2xl p-4 text-left sm:w-[230px] sm:p-5"
      role="listitem"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="tech-marquee__icon" aria-hidden="true">{tech.icon}</span>
        {tech.level && (
          <span className="tech-marquee__level">
            {tech.level}%
          </span>
        )}
      </div>
      <div className="mt-3 font-grotesk text-sm font-semibold leading-tight text-[var(--ice)]">
        {tech.name}
      </div>
      <div className="mt-1 font-mono text-[0.62rem] text-[var(--slate)]">
        {tech.category}
      </div>
    </div>
  )
}

export default function StackSection() {
  const rows = [techStack.filter((_, index) => index % 2 === 0), techStack.filter((_, index) => index % 2 === 1)]

  return (
    <section id="stack" className="page-section px-4 sm:px-6 lg:px-8">
      <div className="section-shell">
        <div data-reveal>
          <SectionLabel text="// tech_stack" />
          <h2 className="section-title mb-4">
            Technologies maîtrisées
          </h2>
          <p className="mb-10 max-w-xl text-[var(--slate)] sm:mb-14">
            Un écosystème complet couvrant le front-end, le back-end, les données et l&apos;IA.
          </p>
        </div>

        <div className="tech-marquee" aria-label="Défilement des technologies maîtrisées">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`tech-marquee__row${rowIndex === 1 ? ' tech-marquee__row--reverse' : ''}`}
              role="list"
              aria-label={`Ligne ${rowIndex + 1} des technologies`}
            >
              <div className="tech-marquee__track">
                <div className="tech-marquee__group">
                  {row.map((tech) => <TechCard key={tech.name} tech={tech} />)}
                </div>
                <div className="tech-marquee__group" aria-hidden="true">
                  {row.map((tech) => <TechCard key={tech.name} tech={tech} />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
