import { NextResponse } from 'next/server'
import { createDashboardSession, credentialsMatch, dashboardCookie, dashboardCookieOptions } from '@/lib/dashboard-auth'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const username = typeof body?.username === 'string' ? body.username.trim() : ''
  const password = typeof body?.password === 'string' ? body.password : ''

  if (!credentialsMatch(username, password)) {
    return NextResponse.json({ error: 'Identifiants incorrects.' }, { status: 401 })
  }

  const response = NextResponse.json({ authenticated: true })
  response.cookies.set(dashboardCookie, createDashboardSession(username), dashboardCookieOptions)
  return response
}
