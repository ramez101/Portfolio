import SectionLabel from '@/components/ui/SectionLabel'
import { techStack } from '@/lib/data'

export default function StackSection() {
  return (
    <section id="stack" className="relative z-10 px-6 py-24 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <SectionLabel text="// tech_stack" />
        <h2 className="font-grotesk font-bold text-4xl lg:text-5xl text-[var(--ice)] mb-4 leading-[1.1]">
          Technologies maîtrisées
        </h2>
        <p className="text-[var(--slate)] mb-14 max-w-xl">
          Un écosystème complet couvrant le front-end, le back-end, les données et l&apos;IA.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="rounded-lg border border-[var(--border)] bg-white/[0.85] p-5 text-center shadow-[0_14px_34px_rgba(17,28,47,0.06)] transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(155,50,244,0.34)] cursor-default"
            >
              <div className="text-3xl mb-2">{tech.icon}</div>
              <div className="font-semibold text-[var(--ice)] text-sm leading-tight">{tech.name}</div>
              <div className="font-mono text-[0.65rem] text-[var(--slate)] mt-1">{tech.category}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
