import { NextResponse } from 'next/server'
import { dashboardCookie, dashboardCookieOptions } from '@/lib/dashboard-auth'

export async function POST() {
  const response = NextResponse.json({ authenticated: false })
  response.cookies.set(dashboardCookie, '', { ...dashboardCookieOptions, maxAge: 0 })
  return response
}
