import SectionLabel from '@/components/ui/SectionLabel'
import { techStack } from '@/lib/data'

export default function StackSection() {
  return (
    <section id="stack" className="page-section px-4 sm:px-6 lg:px-8">
      <div className="section-shell">
        <SectionLabel text="// tech_stack" />
        <h2 className="section-title mb-4">
          Technologies maîtrisées
        </h2>
        <p className="mb-10 max-w-xl text-[var(--slate)] sm:mb-14">
          Un écosystème complet couvrant le front-end, le back-end, les données et l&apos;IA.
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="glass-card flex min-h-[142px] flex-col rounded-2xl p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(37,99,235,0.34)] sm:min-h-[154px] sm:p-5"
            >
              <div className="mb-2 flex items-center justify-center gap-2">
                <span className="text-3xl">{tech.icon}</span>
                {tech.level && (
                  <span className="rounded-full bg-[var(--blue-glow)] px-2 py-0.5 font-mono text-[0.65rem] font-bold text-[var(--blue)]">
                    {tech.level}%
                  </span>
                )}
              </div>
              <div className="font-semibold text-[var(--ice)] text-sm leading-tight">{tech.name}</div>
              <div className="font-mono text-[0.65rem] text-[var(--slate)] mt-1">{tech.category}</div>
              {tech.level && (
                <div className="mt-auto pt-4">
                  <div className="h-1.5 overflow-hidden rounded-full bg-[rgba(17,28,47,0.08)]">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,var(--blue),var(--pink))]"
                      style={{ width: `${tech.level}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
