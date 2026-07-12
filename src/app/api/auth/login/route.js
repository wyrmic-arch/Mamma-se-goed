import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyPassword, createSessionCookie, hashPassword } from '@/lib/auth'

const rateLimit = new Map()

function checkRateLimit(ip) {
  const now = Date.now()
  const windowMs = 60000
  const maxAttempts = 5
  const record = rateLimit.get(ip)
  if (!record || now - record.reset > windowMs) {
    rateLimit.set(ip, { count: 1, reset: now })
    return true
  }
  if (record.count >= maxAttempts) return false
  record.count++
  return true
}

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 })
    }

    const { email, password } = await request.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    const sanitizedEmail = email.trim().toLowerCase()
    let user = await prisma.user.findUnique({ where: { email: sanitizedEmail } })

    if (!user) {
      const hashed = await hashPassword(password)
      user = await prisma.user.create({
        data: { email: sanitizedEmail, passwordHash: hashed },
      })
    } else {
      const valid = await verifyPassword(password, user.passwordHash)
      if (!valid) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }
    }

    const res = NextResponse.json({ success: true })
    const cookie = createSessionCookie()
    res.cookies.set(cookie.name, cookie.value, {
      httpOnly: cookie.httpOnly,
      path: cookie.path,
      maxAge: cookie.maxAge,
      sameSite: cookie.sameSite,
      secure: cookie.secure,
    })

    return res
  } catch (err) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
