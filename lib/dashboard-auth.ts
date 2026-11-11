import { createHmac, timingSafeEqual } from 'node:crypto'

export const dashboardCookie = 'ramez-dashboard-session'
const sessionDuration = 1000 * 60 * 60 * 24 * 7

function getCredentials() {
  return {
    username: process.env.DASHBOARD_USER,
    password: process.env.DASHBOARD_PASSWORD,
    secret: process.env.DASHBOARD_SECRET,
  }
}

export function isDashboardConfigured() {
  const credentials = getCredentials()
  return Boolean(credentials.username && credentials.password && credentials.secret)
}

export function credentialsMatch(username: string, password: string) {
  const credentials = getCredentials()
  return isDashboardConfigured() &&
    username === credentials.username &&
    password === credentials.password
}

export function createDashboardSession(username: string) {
  const secret = getCredentials().secret
  if (!secret) throw new Error('Dashboard authentication is not configured.')
  const expiresAt = Date.now() + sessionDuration
  const payload = `${username}.${expiresAt}`
  const signature = createHmac('sha256', secret).update(payload).digest('hex')
  return `${payload}.${signature}`
}

export function isDashboardSessionValid(token?: string) {
  if (!token) return false
  const secret = getCredentials().secret
  if (!secret) return false
  const [username, expiresAt, signature] = token.split('.')
  if (!username || !expiresAt || !signature || Number(expiresAt) < Date.now()) return false

  const payload = `${username}.${expiresAt}`
  const expected = createHmac('sha256', secret).update(payload).digest('hex')
  const actualBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expected)
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer)
}

export const dashboardCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: sessionDuration / 1000,
}
