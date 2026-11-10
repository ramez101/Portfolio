'use client'

import { useState, type FormEvent } from 'react'
import type { ContactFormData } from '@/types'

type Language = 'fr' | 'en' | 'ar'
type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const initialForm: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

const copy = {
  fr: {
    eyebrow: 'UN PROJET EN TÊTE ?',
    title: 'Écrivez-moi.',
    name: 'Nom complet',
    email: 'Adresse e-mail',
    phone: 'Téléphone',
    subject: 'Sujet',
    message: 'Votre message',
    namePlaceholder: 'Votre nom',
    emailPlaceholder: 'vous@exemple.com',
    phonePlaceholder: '+216 ...',
    subjectPlaceholder: 'Parlons de votre projet',
    messagePlaceholder: 'Quelques mots sur votre besoin, vos objectifs ou vos délais…',
    send: 'Envoyer le message',
    sending: 'Envoi en cours…',
    success: 'Message envoyé. Merci, je vous répondrai dès que possible.',
    serverError: 'Le message n’a pas pu être envoyé. Veuillez réessayer.',
    networkError: 'Impossible de joindre le serveur. Vérifiez votre connexion et réessayez.',
    required: 'Champ obligatoire',
  },
  en: {
    eyebrow: 'HAVE A PROJECT IN MIND?',
    title: 'Send me a note.',
    name: 'Full name',
    email: 'Email address',
    phone: 'Phone',
    subject: 'Subject',
    message: 'Your message',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'you@example.com',
    phonePlaceholder: '+216 ...',
    subjectPlaceholder: "Let's talk about your project",
    messagePlaceholder: 'A few words about your needs, goals or timeline…',
    send: 'Send message',
    sending: 'Sending…',
    success: 'Message sent. Thank you — I’ll get back to you as soon as I can.',
    serverError: 'Your message could not be sent. Please try again.',
    networkError: 'Could not reach the server. Check your connection and try again.',
    required: 'This field is required',
  },
  ar: {
    eyebrow: 'هل لديك مشروع؟',
    title: 'أرسل لي رسالة.',
    name: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    subject: 'الموضوع',
    message: 'رسالتك',
    namePlaceholder: 'اسمك',
    emailPlaceholder: 'you@example.com',
    phonePlaceholder: '+216 ...',
    subjectPlaceholder: 'لنتحدث عن مشروعك',
    messagePlaceholder: 'أخبرني باختصار عن احتياجاتك وأهدافك…',
    send: 'إرسال الرسالة',
    sending: 'جارٍ الإرسال…',
    success: 'تم إرسال الرسالة. شكراً لك، سأرد عليك في أقرب وقت.',
    serverError: 'تعذر إرسال الرسالة. يرجى المحاولة مرة أخرى.',
    networkError: 'تعذر الاتصال بالخادم. تحقق من اتصالك وحاول مجدداً.',
    required: 'هذا الحقل مطلوب',
  },
} as const

export default function PortfolioContactForm({ lang }: { lang: Language }) {
  const [form, setForm] = useState<ContactFormData>(initialForm)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const text = copy[lang]

  const updateField = (field: keyof ContactFormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    if (status !== 'sending') {
      setStatus('idle')
      setErrorMessage('')
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        let message: string = text.serverError
        try {
          const result: unknown = await response.json()
          if (
            typeof result === 'object' &&
            result !== null &&
            'error' in result &&
            typeof result.error === 'string'
          ) {
            message = result.error
          }
        } catch {
          message = text.serverError
        }
        setErrorMessage(message)
        setStatus('error')
        return
      }

      setForm(initialForm)
      setStatus('success')
    } catch {
      setErrorMessage(text.networkError)
      setStatus('error')
    }
  }

  const fieldClassName = 'rw-contact-input'

  return (
    <form className="rw-contact-form" onSubmit={handleSubmit}>
      <p className="rw-contact-form__eyebrow">{text.eyebrow}</p>
      <h3 className="rw-contact-form__title">{text.title}</h3>

      <div className="rw-contact-form__fields">
        <label className="rw-contact-form__field">
          <span>{text.name}</span>
          <input
            className={fieldClassName}
            type="text"
            name="name"
            autoComplete="name"
            maxLength={120}
            placeholder={text.namePlaceholder}
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            required
            aria-required="true"
          />
        </label>

        <label className="rw-contact-form__field">
          <span>{text.email}</span>
          <input
            className={fieldClassName}
            type="email"
            name="email"
            autoComplete="email"
            maxLength={254}
            placeholder={text.emailPlaceholder}
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            required
            aria-required="true"
          />
        </label>

        <label className="rw-contact-form__field">
          <span>{text.phone}</span>
          <input
            className={fieldClassName}
            type="tel"
            name="phone"
            autoComplete="tel"
            maxLength={32}
            placeholder={text.phonePlaceholder}
            value={form.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            required
            aria-required="true"
          />
        </label>

        <label className="rw-contact-form__field">
          <span>{text.subject}</span>
          <input
            className={fieldClassName}
            type="text"
            name="subject"
            maxLength={160}
            placeholder={text.subjectPlaceholder}
            value={form.subject}
            onChange={(event) => updateField('subject', event.target.value)}
            required
            aria-required="true"
          />
        </label>

        <label className="rw-contact-form__field rw-contact-form__field--full">
          <span>{text.message}</span>
          <textarea
            className={fieldClassName}
            name="message"
            rows={5}
            maxLength={4000}
            placeholder={text.messagePlaceholder}
            value={form.message}
            onChange={(event) => updateField('message', event.target.value)}
            required
            aria-required="true"
          />
        </label>
      </div>

      {status === 'success' && (
        <p className="rw-contact-form__notice rw-contact-form__notice--success" role="status">
          <span aria-hidden="true">✓</span> {text.success}
        </p>
      )}
      {status === 'error' && (
        <p className="rw-contact-form__notice rw-contact-form__notice--error" role="alert">
          {errorMessage}
        </p>
      )}

      <button className="rw-contact-form__submit" type="submit" disabled={status === 'sending'}>
        <span>{status === 'sending' ? text.sending : text.send}</span>
        <span aria-hidden="true">{status === 'sending' ? '···' : '↗'}</span>
      </button>
    </form>
  )
}
