'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import SectionLabel from '@/components/ui/SectionLabel'
import type { ContactFormData } from '@/types'

const initialForm: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

export default function ContactSection() {
  const [form, setForm] = useState<ContactFormData>(initialForm)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [isContactOpen, setIsContactOpen] = useState(false)
  const contactTriggerRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isContactOpen) return

    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsContactOpen(false)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      contactTriggerRef.current?.focus()
    }
  }, [isContactOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error || 'Erreur inconnue.')
        setStatus('error')
      } else {
        setStatus('success')
        setForm(initialForm)
      }
    } catch {
      setErrorMsg('Impossible de joindre le serveur.')
      setStatus('error')
    }
  }

  const inputClass =
    'w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--ice)] text-sm placeholder-[var(--slate)] outline-none transition-all focus:border-[var(--blue)] focus:ring-4 focus:ring-[rgba(155,50,244,0.12)]'

  return (
    <section id="contact" className="page-section px-4 sm:px-6 lg:px-8">
      <div className="section-shell">

        <div className="contact-intro" data-reveal>
          <SectionLabel text="// get_in_touch" />

          <div className="contact-terminal">
            <div className="contact-terminal__bar">
              <div className="contact-terminal__lights" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <span className="contact-terminal__tab">contact.exe</span>
              <span className="contact-terminal__window-mark" aria-hidden="true">↗</span>
            </div>

            <div className="contact-terminal__body">
              <p className="contact-terminal__command">
                <span className="contact-terminal__prompt" aria-hidden="true">&gt;</span>
                <span className="contact-terminal__command-text">Construisons quelque chose<span className="contact-terminal__period">.</span></span>
              </p>
              <h2 className="sr-only">Travaillons ensemble</h2>
              <p className="contact-terminal__copy">
                Une idée de projet ou une envie de collaborer ? Je suis toujours partant pour une conversation intéressante.
              </p>
              <p className="contact-terminal__status">
                <span aria-hidden="true">$</span> status --availability
              </p>
              <p className="contact-terminal__response">
                <span aria-hidden="true">✓</span> Disponible pour de nouveaux projets
              </p>
              <button
                ref={contactTriggerRef}
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="contact-terminal__cta"
                aria-haspopup="dialog"
                aria-expanded={isContactOpen}
              >
                <span aria-hidden="true">$</span>
                <span>envoyer un message</span>
                <span className="contact-terminal__cta-arrow" aria-hidden="true">↗</span>
              </button>
            </div>
          </div>

          <div className="contact-quick-links" aria-label="Autres moyens de contact">
            <a href="mailto:ramez.werfelli9@gmail.com" className="contact-quick-link">
              <span className="contact-quick-link__label">Email</span>
              <span className="contact-quick-link__value">M&apos;écrire</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a href="tel:+21655568854" className="contact-quick-link">
              <span className="contact-quick-link__label">Téléphone</span>
              <span className="contact-quick-link__value">+216 55 568 854</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href="https://linkedin.com/in/ramez-werfelli"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-quick-link"
            >
              <span className="contact-quick-link__label">LinkedIn</span>
              <span className="contact-quick-link__value">Voir mon profil</span>
              <span aria-hidden="true">↗</span>
            </a>
            <div className="contact-quick-link contact-quick-link--location">
              <span className="contact-quick-link__label">Localisation</span>
              <span className="contact-quick-link__value">Tunis, Tunisie</span>
              <span aria-hidden="true">⌖</span>
            </div>
          </div>
        </div>

      </div>

      {isContactOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="contact-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsContactOpen(false)
          }}
        >
          <div
            className="contact-modal glass-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
          >
            <div className="contact-modal__topbar">
              <div className="contact-terminal__lights" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <span className="contact-terminal__tab">nouveau-message.exe</span>
              <button
                ref={closeButtonRef}
                type="button"
                className="contact-modal__close"
                onClick={() => setIsContactOpen(false)}
                aria-label="Fermer la fenêtre de contact"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="contact-form-panel rounded-[1.5rem] p-5 sm:p-8">
          <div className="contact-form-panel__heading">
            <div>
              <p className="contact-form-panel__eyebrow">Nouveau message</p>
              <h3 id="contact-modal-title" className="font-grotesk font-semibold text-xl text-[var(--ice)]">
                On en parle ?
              </h3>
            </div>
            <span className="contact-form-panel__icon" aria-hidden="true">✳</span>
          </div>

          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-14 text-center gap-4">
              <div className="accent-gradient flex h-16 w-16 items-center justify-center rounded-lg text-lg font-bold text-white">OK</div>
              <h4 className="font-grotesk font-bold text-xl text-[var(--ice)]">Message envoyé !</h4>
              <p className="text-[var(--slate)] text-sm max-w-xs">
                Merci pour votre message. Je vous répondrai dans les plus brefs délais.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-4 rounded-lg border border-[var(--border)] px-5 py-2 text-sm text-[var(--slate)] transition-all hover:border-[var(--blue)] hover:text-[var(--blue)]"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[0.7rem] text-[var(--slate)] uppercase mb-1.5 block">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="font-mono text-[0.7rem] text-[var(--slate)] uppercase mb-1.5 block">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[0.7rem] text-[var(--slate)] uppercase mb-1.5 block">
                    Sujet
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Mission freelance..."
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="font-mono text-[0.7rem] text-[var(--slate)] uppercase mb-1.5 block">
                    Num Tel
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+216 55 568 854"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[0.7rem] text-[var(--slate)] uppercase mb-1.5 block">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre projet ou votre demande..."
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {status === 'error' && (
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
                  Erreur: {errorMsg}
                </p>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={status === 'loading'}
                className="accent-gradient primary-button mt-2 w-full disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Envoi en cours...
                  </span>
                ) : (
                  'Envoyer le message'
                )}
              </button>
            </div>
          )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  )
}
