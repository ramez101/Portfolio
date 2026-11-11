'use client'

import { FormEvent, useEffect, useState } from 'react'
import { defaultSettings, StudioDashboard } from '@/components/PortfolioExperience'

export default function DashboardClient() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [settings, setSettings] = useState(defaultSettings)

  useEffect(() => {
    let active = true
    fetch('/api/dashboard/session')
      .then((response) => { if (active) setAuthenticated(response.ok) })
      .catch(() => { if (active) setAuthenticated(false) })

    try {
      const saved = window.localStorage.getItem('ramez-portfolio-studio')
      if (saved) {
        const parsed = JSON.parse(saved)
        setSettings({ ...defaultSettings, ...parsed, visible: { ...defaultSettings.visible, ...parsed.visible } })
      }
    } catch { /* localStorage may be unavailable */ }

    return () => { active = false }
  }, [])

  useEffect(() => {
    try { window.localStorage.setItem('ramez-portfolio-studio', JSON.stringify(settings)) }
    catch { /* localStorage may be unavailable */ }
  }, [settings])

  const login = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/dashboard/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) })
      const result = await response.json().catch(() => null)
      if (!response.ok) {
        setError(typeof result?.error === 'string' ? result.error : 'Connexion impossible. Vérifiez la configuration du serveur.')
        return
      }
      setAuthenticated(true)
    } catch {
      setError('Impossible de joindre le serveur. Vérifiez votre connexion et réessayez.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const logout = async () => {
    try {
      const response = await fetch('/api/dashboard/logout', { method: 'POST' })
      if (!response.ok) throw new Error('Dashboard logout failed.')
      setAuthenticated(false)
    } catch {
      setError('Déconnexion impossible. Veuillez réessayer.')
    }
  }

  if (authenticated === null) return <main className="dashboard-page dashboard-loading" aria-live="polite"><span className="dashboard-loading-mark">RW</span><p>Connexion au studio…</p></main>
  if (!authenticated) return <main className="dashboard-page"><form className="dashboard-login" onSubmit={login}><a href="/" className="dashboard-login-mark" aria-label="Retour au portfolio">RW<span>®</span></a><p className="studio-overline">ESPACE PRIVÉ · PORTFOLIO</p><h1>Bienvenue.</h1><p className="dashboard-login-copy">Connectez-vous pour accéder au studio de votre portfolio.</p><label>Identifiant<input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required /></label><label>Mot de passe<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /></label>{error && <p className="dashboard-error" role="alert">{error}</p>}<button className="lime-button" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Connexion…' : 'Se connecter'} <span className="portfolio-arrow">↗</span></button><a href="/" className="dashboard-back">← Retour au portfolio</a></form></main>

  return <main className="dashboard-page"><StudioDashboard settings={settings} setSettings={setSettings} lang="fr" onClose={logout} /></main>
}
