import { NextResponse } from 'next/server'
import { dashboardCookie, isDashboardSessionValid } from '@/lib/dashboard-auth'

export async function GET(request: Request) {
  const token = request.headers.get('cookie')?.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${dashboardCookie}=`))?.split('=').slice(1).join('=')
  return NextResponse.json({ authenticated: isDashboardSessionValid(token) }, { status: isDashboardSessionValid(token) ? 200 : 401 })
}
