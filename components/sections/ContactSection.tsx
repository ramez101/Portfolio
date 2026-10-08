'use client'

import { useState } from 'react'
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
      <div className="section-shell grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-20">

        {/* Left — info */}
        <div data-reveal>
          <SectionLabel text="// get_in_touch" />
          <h2 className="section-title mb-6">
            Travaillons<br />ensemble
          </h2>
          <p className="text-[var(--slate)] leading-relaxed mb-10">
            Disponible pour des missions freelance, des alternances ou des opportunités à plein temps. N&apos;hésitez pas à me contacter — je réponds sous 24h.
          </p>

          <div className="flex flex-col gap-4" data-reveal>
            <a
              href="mailto:ramez.werfelli9@gmail.com"
              className="glass-card group flex items-center gap-4 rounded-2xl px-4 py-4 text-sm font-medium text-[var(--ice)] transition-all hover:-translate-y-0.5 hover:border-[var(--blue)] sm:px-5"
              data-reveal
            >
              <span className="accent-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white">@</span>
              <div>
                <div className="text-[var(--slate)] text-xs font-mono mb-0.5">Email</div>
                <div className="group-hover:text-[var(--blue)] transition-colors">ramez.werfelli9@gmail.com</div>
              </div>
            </a>

            <a
              href="tel:+21655568854"
              className="glass-card group flex items-center gap-4 rounded-2xl px-4 py-4 text-sm font-medium text-[var(--ice)] transition-all hover:-translate-y-0.5 hover:border-[var(--blue)] sm:px-5"
              data-reveal
            >
              <span className="accent-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white">+</span>
              <div>
                <div className="text-[var(--slate)] text-xs font-mono mb-0.5">Téléphone</div>
                <div className="group-hover:text-[var(--blue)] transition-colors">+216 55 568 854</div>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/ramez-werfelli"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card group flex items-center gap-4 rounded-2xl px-4 py-4 text-sm font-medium text-[var(--ice)] transition-all hover:-translate-y-0.5 hover:border-[var(--blue)] sm:px-5"
              data-reveal
            >
              <span className="accent-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white">in</span>
              <div>
                <div className="text-[var(--slate)] text-xs font-mono mb-0.5">LinkedIn</div>
                <div className="group-hover:text-[var(--blue)] transition-colors">linkedin.com/in/ramez-werfelli</div>
              </div>
            </a>

            <div className="glass-card flex items-center gap-4 rounded-2xl px-4 py-4 text-sm sm:px-5" data-reveal>
              <span className="accent-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white">TN</span>
              <div>
                <div className="text-[var(--slate)] text-xs font-mono mb-0.5">Localisation</div>
                <div className="text-[var(--ice)]">El Mourouj, Tunis — Tunisie</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="glass-card rounded-[1.5rem] p-5 sm:p-8" data-reveal>
          <h3 className="font-grotesk font-semibold text-xl text-[var(--ice)] mb-6">
            Envoyer un message
          </h3>

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
    </section>
  )
}
