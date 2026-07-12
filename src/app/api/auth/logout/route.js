import { NextResponse } from 'next/server'
import { clearSessionCookie } from '@/lib/auth'

export async function POST() {
  const res = NextResponse.json({ success: true })
  const cookie = clearSessionCookie()
  res.cookies.set(cookie.name, cookie.value, {
    httpOnly: cookie.httpOnly,
    path: cookie.path,
    maxAge: cookie.maxAge,
    sameSite: cookie.sameSite,
  })
  return res
}
