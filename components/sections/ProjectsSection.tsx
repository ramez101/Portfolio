'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import SectionLabel from '@/components/ui/SectionLabel'
import { projects } from '@/lib/data'
import type { Project } from '@/types'
import { clsx } from 'clsx'

const badgeStyles = {
  blue: 'bg-[rgba(155,50,244,0.1)] text-[var(--blue)] border border-[rgba(155,50,244,0.24)]',
  green: 'bg-[rgba(22,163,74,0.1)] text-[#15803D] border border-[rgba(22,163,74,0.18)]',
  orange: 'bg-[rgba(234,88,12,0.1)] text-[#C2410C] border border-[rgba(234,88,12,0.18)]',
}

function ProjectCard({
  project,
  onView,
}: {
  project: Project
  onView: (project: Project) => void
}) {
  return (
    <div
      className={clsx(
        'flex flex-col rounded-lg border border-[var(--border)] bg-white/[0.88] p-8 shadow-[0_14px_34px_rgba(17,28,47,0.06)] transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(155,50,244,0.34)]',
        project.featured && 'border-[rgba(155,50,244,0.24)] bg-[linear-gradient(180deg,#ffffff_0%,#fbf7ff_100%)]'
      )}
    >
      <div className="mb-4 flex items-start justify-between">
        <span className="text-3xl">{project.emoji}</span>
        <span className={clsx('rounded-full px-3 py-1 font-mono text-[0.68rem]', badgeStyles[project.badgeColor])}>
          {project.badge}
        </span>
      </div>

      {project.period && (
        <p className="mb-2 font-mono text-[0.68rem] text-[var(--slate)]">{project.period}</p>
      )}

      <h3 className="mb-3 font-grotesk text-lg font-bold leading-snug text-[var(--ice)]">
        {project.title}
      </h3>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-[var(--slate)]">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-[var(--border)] px-2 py-0.5 font-mono text-[0.65rem] text-[var(--slate)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onView(project)}
        className="mt-6 rounded-lg border border-[rgba(155,50,244,0.22)] bg-white px-4 py-3 text-sm font-bold text-[var(--blue)] transition-all hover:border-[var(--blue)] hover:bg-[rgba(155,50,244,0.06)]"
      >
        Visualiser
      </button>
    </div>
  )
}

function ProjectSlider({
  project,
  activeIndex,
  onChange,
}: {
  project: Project
  activeIndex: number
  onChange: (index: number) => void
}) {
  const images = project.images.length
    ? project.images
    : [
        {
          src: '/bg-optimized.jpg',
          alt: `Apercu visuel du projet ${project.title}`,
          caption: 'Apercu du projet',
        },
      ]
  const activeImage = images[activeIndex] ?? images[0]
  const hasMultipleImages = images.length > 1

  const goToPrevious = () => {
    onChange((activeIndex - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    onChange((activeIndex + 1) % images.length)
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--navy-3)]">
        <div className="aspect-[16/9] max-h-[64vh] w-full">
          <img
            src={activeImage.src}
            alt={activeImage.alt}
            className="h-full w-full object-contain"
          />
        </div>

        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg border border-white/70 bg-white/90 text-[var(--ice)] shadow-[0_10px_22px_rgba(17,28,47,0.16)] transition-colors hover:text-[var(--blue)]"
              aria-label="Image precedente"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg border border-white/70 bg-white/90 text-[var(--ice)] shadow-[0_10px_22px_rgba(17,28,47,0.16)] transition-colors hover:text-[var(--blue)]"
              aria-label="Image suivante"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-[var(--slate)]">
          {activeImage.caption}
        </p>
        <span className="font-mono text-[0.72rem] text-[var(--slate)]">
          {activeIndex + 1} / {images.length}
        </span>
      </div>

      {hasMultipleImages && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              type="button"
              onClick={() => onChange(index)}
              className={clsx(
                'w-24 shrink-0 overflow-hidden rounded-lg border bg-white p-1 transition-all sm:w-28',
                activeIndex === index
                  ? 'border-[var(--blue)] shadow-[0_10px_26px_rgba(50,134,244,0.2)]'
                  : 'border-[var(--border)] opacity-70 hover:opacity-100'
              )}
              aria-label={`Afficher l image ${index + 1}`}
            >
              <span className="block aspect-[16/9] overflow-hidden rounded-md">
                <img
                  src={image.src}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  const [activeImage, setActiveImage] = useState(0)
  const [activePanel, setActivePanel] = useState<'description' | 'images'>('description')

  useEffect(() => {
    setActiveImage(0)
    setActivePanel('description')
  }, [project?.id])

  if (!project || typeof document === 'undefined') return null

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-[rgba(237,243,246,0.62)] px-4 py-6 backdrop-blur-[18px] backdrop-saturate-75"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-lg border border-white/80 bg-white p-5 shadow-[0_28px_100px_rgba(17,28,47,0.18)] sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className={clsx('rounded-full px-3 py-1 font-mono text-[0.68rem]', badgeStyles[project.badgeColor])}>
                {project.badge}
              </span>
              {project.period && (
                <span className="font-mono text-[0.72rem] text-[var(--slate)]">
                  {project.period}
                </span>
              )}
            </div>
            <h3
              id="project-modal-title"
              className="font-grotesk text-2xl font-bold leading-tight text-[var(--ice)] sm:text-3xl"
            >
              {project.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] text-xs font-bold text-[var(--slate)] transition-colors hover:border-[var(--blue)] hover:text-[var(--blue)]"
            aria-label="Fermer le detail du projet"
          >
            X
          </button>
        </div>

        <div className="mb-5 flex w-full max-w-xs rounded-lg border border-[var(--border)] bg-[var(--navy-3)] p-0.5">
          <button
            type="button"
            onClick={() => setActivePanel('description')}
            className={clsx(
              'flex-1 rounded-md px-3 py-2 text-sm font-bold transition-all',
              activePanel === 'description'
                ? 'accent-gradient text-white shadow-[0_10px_24px_rgba(50,134,244,0.18)]'
                : 'text-[var(--slate)] hover:text-[var(--ice)]'
            )}
          >
            Description
          </button>
          <button
            type="button"
            onClick={() => setActivePanel('images')}
            className={clsx(
              'flex-1 rounded-md px-3 py-2 text-sm font-bold transition-all',
              activePanel === 'images'
                ? 'accent-gradient text-white shadow-[0_10px_24px_rgba(50,134,244,0.18)]'
                : 'text-[var(--slate)] hover:text-[var(--ice)]'
            )}
          >
            Images
          </button>
        </div>

        {activePanel === 'images' ? (
          <ProjectSlider project={project} activeIndex={activeImage} onChange={setActiveImage} />
        ) : (
          <>
            <p className="text-base leading-8 text-[var(--slate)]">
              {project.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {project.role && (
                <div className="rounded-lg border border-[var(--border)] bg-[var(--navy-3)] p-5">
                  <p className="mb-2 font-mono text-[0.7rem] uppercase text-[var(--blue)]">Rôle</p>
                  <p className="text-sm leading-6 text-[var(--ice)]">{project.role}</p>
                </div>
              )}
              {project.impact && (
                <div className="rounded-lg border border-[var(--border)] bg-[var(--navy-3)] p-5">
                  <p className="mb-2 font-mono text-[0.7rem] uppercase text-[var(--blue)]">Impact</p>
                  <p className="text-sm leading-6 text-[var(--ice)]">{project.impact}</p>
                </div>
              )}
            </div>

            <div className="mt-8">
              <h4 className="mb-4 font-grotesk text-xl font-bold text-[var(--ice)]">
                Détails du projet
              </h4>
              <ul className="grid gap-3">
                {project.details.map((detail) => (
                  <li key={detail} className="flex gap-3 text-sm leading-7 text-[var(--slate)]">
                    <span className="accent-gradient mt-2 h-2 w-2 shrink-0 rounded-full" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 border-t border-[var(--border)] pt-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-[var(--border)] px-2 py-1 font-mono text-[0.68rem] text-[var(--slate)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  )
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    if (!selectedProject) return

    const originalOverflow = document.body.style.overflow
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null)
    }

    document.body.style.overflow = 'hidden'
    document.body.classList.add('project-modal-open')
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.classList.remove('project-modal-open')
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [selectedProject])

  return (
    <section id="projects" className="relative z-10 px-6 py-24 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionLabel text="// featured_projects" />
        <h2 className="mb-4 font-grotesk text-4xl font-bold leading-[1.1] text-[var(--ice)] lg:text-5xl">
          Projets récents
        </h2>
        <p className="mb-14 max-w-xl text-[var(--slate)]">
          Des solutions concrètes, de l&apos;idée à la mise en production.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onView={setSelectedProject} />
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
