'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
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
  const cover = project.images[0] ?? {
    src: '/bg-optimized.jpg',
    alt: `Aperçu visuel du projet ${project.title}`,
  }

  return (
    <article
      className={clsx(
        'project-card group flex flex-col rounded-[1.35rem]',
        project.featured && 'project-card--featured lg:col-span-2'
      )}
      data-reveal
    >
      <div className="project-card__media">
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes={project.featured ? '(max-width: 1024px) 100vw, 760px' : '(max-width: 768px) 100vw, 360px'}
          className="project-card__image"
        />
        <div className="project-card__media-shade" aria-hidden="true" />

        <div className="project-card__topline">
          <span className="project-card__index">{project.featured ? '01' : 'PROJECT'}</span>
          <span className={clsx('rounded-full px-3 py-1 font-mono text-[0.68rem]', badgeStyles[project.badgeColor])}>
            {project.badge}
          </span>
        </div>

        <div className="project-card__preview-label">
          <span className="project-card__preview-dot" />
          Aperçu du projet
        </div>

        <button
          type="button"
          onClick={() => onView(project)}
          className="project-card__quick-view"
          aria-label={`Visualiser ${project.title}`}
        >
          <span>Voir le projet</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="project-card__content">
        <div className="mb-4 flex items-start justify-between gap-4">
          <span className="project-card__emoji" aria-hidden="true">{project.emoji}</span>
          {project.period && (
            <p className="pt-1 font-mono text-[0.68rem] text-[var(--slate)]">{project.period}</p>
          )}
        </div>

        <h3 className="mb-3 font-grotesk text-xl font-bold leading-tight text-[var(--ice)] sm:text-2xl">
          {project.title}
        </h3>
        <p className="mb-6 flex-1 text-sm leading-relaxed text-[var(--slate)]">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, project.featured ? 5 : 3).map((tag) => (
            <span
              key={tag}
              className="project-card__tag rounded border border-[var(--border)] px-2 py-0.5 font-mono text-[0.65rem] text-[var(--slate)]"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > (project.featured ? 5 : 3) && (
            <span className="project-card__tag rounded border border-[var(--border)] px-2 py-0.5 font-mono text-[0.65rem] text-[var(--slate)]">
              +{project.tags.length - (project.featured ? 5 : 3)}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onView(project)}
          className="project-card__details mt-7 flex items-center justify-between border-t border-[var(--border)] pt-4 text-left text-sm font-bold text-[var(--blue)]"
        >
          <span>Découvrir les détails</span>
          <span className="project-card__arrow" aria-hidden="true">↗</span>
        </button>
      </div>
    </article>
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
      <div className="project-slider__frame relative overflow-hidden rounded-lg border bg-[var(--navy-3)]">
        <div className="project-slider__canvas aspect-[16/9] max-h-[64vh] w-full">
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

  const modalCover = project.images[0] ?? {
    src: '/bg-optimized.jpg',
    alt: `Aperçu visuel du projet ${project.title}`,
  }

  return createPortal(
    <div
      className="project-modal-backdrop fixed inset-0 z-[80] flex items-center justify-center overflow-hidden px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="project-modal max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[1.5rem] p-4 sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-3">
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
            <p className="mt-2 max-w-2xl text-sm text-[var(--slate)]">Galerie, détails et technologies utilisées</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="project-modal__close flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-xs font-bold transition-colors"
            aria-label="Fermer le détail du projet"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="project-modal__hero mb-5">
          <Image
            src={modalCover.src}
            alt={modalCover.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
          />
          <div className="project-modal__hero-shade" aria-hidden="true" />
          <div className="project-modal__hero-meta">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-cyan-200">Project showcase</span>
            <span className="font-mono text-[0.7rem] text-white/70">{project.images.length} captures disponibles</span>
          </div>
        </div>

        <div className="project-modal__tabs mb-5 flex w-full max-w-sm rounded-xl border p-1">
          <button
            type="button"
            onClick={() => setActivePanel('description')}
            className={clsx(
              'flex-1 rounded-md px-3 py-2 text-sm font-bold transition-all',
              activePanel === 'description'
                ? 'accent-gradient text-white shadow-[0_10px_24px_rgba(50,134,244,0.18)]'
                : 'text-[var(--slate)] hover:bg-white hover:text-[var(--ice)]'
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
                : 'text-[var(--slate)] hover:bg-white hover:text-[var(--ice)]'
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
                <div className="project-modal__info-card rounded-lg border bg-[var(--navy-3)] p-5">
                  <p className="mb-2 font-mono text-[0.7rem] uppercase text-[var(--blue)]">Rôle</p>
                  <p className="text-sm leading-6 text-[var(--ice)]">{project.role}</p>
                </div>
              )}
              {project.impact && (
                <div className="project-modal__info-card rounded-lg border bg-[var(--navy-3)] p-5">
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

type ProjectFilter = 'all' | 'production' | 'commerce' | 'ai' | 'experiments'

const projectFilters: Array<{ value: ProjectFilter; label: string }> = [
  { value: 'all', label: 'Tous les projets' },
  { value: 'production', label: 'Production' },
  { value: 'commerce', label: 'E-commerce' },
  { value: 'ai', label: 'IA & Data' },
  { value: 'experiments', label: 'Expériences' },
]

const matchesProjectFilter = (project: Project, filter: ProjectFilter) => {
  if (filter === 'all') return true
  if (filter === 'production') return project.featured || project.badge === 'Temps réel'
  if (filter === 'commerce') return project.badge === 'E-commerce' || project.badge === 'Mobile'
  if (filter === 'ai') return project.badge === 'IA' || project.badge === 'Data'
  return project.badge === 'Fintech' || project.badge === 'Jeu'
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [filter, setFilter] = useState<ProjectFilter>('all')

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

  const visibleProjects = projects.filter((project) => matchesProjectFilter(project, filter))

  return (
    <section id="projects" className="projects-section page-section px-4 sm:px-6 lg:px-8">
      <div className="section-shell">
        <SectionLabel text="// featured_projects" />
        <div className="projects-heading" data-reveal>
          <div>
            <h2 className="section-title mb-4">
              Projets récents<span className="text-gradient">.</span>
            </h2>
            <p className="max-w-xl text-[var(--slate)]">
              Des solutions concrètes, de l&apos;idée à la mise en production — pensées pour être utiles, rapides et mémorables.
            </p>
          </div>
          <div className="projects-heading__count" aria-label={`${projects.length} projets présentés`}>
            <strong>{String(projects.length).padStart(2, '0')}</strong>
            <span>projets<br />présentés</span>
          </div>
        </div>

        <div className="projects-filters" role="group" aria-label="Filtrer les projets" data-reveal>
          {projectFilters.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              aria-pressed={filter === option.value}
              className={clsx('projects-filter', filter === option.value && 'projects-filter--active')}
            >
              <span>{option.label}</span>
              <small>{projects.filter((project) => matchesProjectFilter(project, option.value)).length}</small>
            </button>
          ))}
        </div>

        <div className="projects-grid grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onView={setSelectedProject} />
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
