import SectionLabel from '@/components/ui/SectionLabel'
import { projects } from '@/lib/data'
import type { Project } from '@/types'
import { clsx } from 'clsx'

const badgeStyles = {
  blue: 'bg-[rgba(155,50,244,0.1)] text-[var(--blue)] border border-[rgba(155,50,244,0.24)]',
  green: 'bg-[rgba(22,163,74,0.1)] text-[#15803D] border border-[rgba(22,163,74,0.18)]',
  orange: 'bg-[rgba(234,88,12,0.1)] text-[#C2410C] border border-[rgba(234,88,12,0.18)]',
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className={clsx(
        'flex flex-col rounded-lg border border-[var(--border)] bg-white/[0.88] p-8 shadow-[0_14px_34px_rgba(17,28,47,0.06)] transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(155,50,244,0.34)]',
        project.featured && 'border-[rgba(155,50,244,0.24)] bg-[linear-gradient(180deg,#ffffff_0%,#fbf7ff_100%)]'
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl">{project.emoji}</span>
        <span className={clsx('font-mono text-[0.68rem] px-3 py-1 rounded-full', badgeStyles[project.badgeColor])}>
          {project.badge}
        </span>
      </div>

      {project.period && (
        <p className="font-mono text-[0.68rem] text-[var(--slate)] mb-2">{project.period}</p>
      )}

      <h3 className="font-grotesk font-bold text-lg text-[var(--ice)] mb-3 leading-snug">
        {project.title}
      </h3>
      <p className="text-[var(--slate)] text-sm leading-relaxed flex-1 mb-6">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[0.65rem] text-[var(--slate)] border border-[var(--border)] rounded px-2 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 px-6 py-24 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <SectionLabel text="// featured_projects" />
        <h2 className="font-grotesk font-bold text-4xl lg:text-5xl text-[var(--ice)] mb-4 leading-[1.1]">
          Projets récents
        </h2>
        <p className="text-[var(--slate)] mb-14 max-w-xl">
          Des solutions concrètes, de l&apos;idée à la mise en production.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
