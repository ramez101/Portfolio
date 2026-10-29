'use client'

import { FormEvent, useEffect, useState } from 'react'
import { defaultSettings, StudioDashboard } from '@/components/PortfolioExperience'

export default function DashboardClient() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [settings, setSettings] = useState(defaultSettings)

  useEffect(() => {
    fetch('/api/dashboard/session').then((response) => { setAuthenticated(response.ok) }).catch(() => setAuthenticated(false))
    const saved = window.localStorage.getItem('ramez-portfolio-studio')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setSettings({ ...defaultSettings, ...parsed, visible: { ...defaultSettings.visible, ...parsed.visible } })
      } catch { /* use defaults */ }
    }
  }, [])

  useEffect(() => { window.localStorage.setItem('ramez-portfolio-studio', JSON.stringify(settings)) }, [settings])

  const login = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    const response = await fetch('/api/dashboard/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) })
    if (!response.ok) { setError('Identifiants incorrects.'); return }
    setAuthenticated(true)
  }

  const logout = async () => { await fetch('/api/dashboard/logout', { method: 'POST' }); setAuthenticated(false) }

  if (authenticated === null) return <div className="dashboard-page dashboard-loading">Loading Studio…</div>
  if (!authenticated) return <main className="dashboard-page"><form className="dashboard-login" onSubmit={login}><div className="dashboard-login-mark">RW<span>®</span></div><p className="studio-overline">PRIVATE / PORTFOLIO STUDIO</p><h1>Welcome back.</h1><p className="dashboard-login-copy">Connectez-vous pour modifier chaque section du portfolio.</p><label>Identifiant<input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required /></label><label>Mot de passe<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /></label>{error && <p className="dashboard-error">{error}</p>}<button className="lime-button" type="submit">Se connecter <span className="portfolio-arrow">↗</span></button><a href="/" className="dashboard-back">← Retour au portfolio</a></form></main>

  return <main className="dashboard-page"><div className="dashboard-page-top"><a href="/" className="dashboard-back">← Portfolio</a><button className="dashboard-logout" onClick={logout}>Déconnexion</button></div><StudioDashboard settings={settings} setSettings={setSettings} lang="fr" onClose={logout} /></main>
}
