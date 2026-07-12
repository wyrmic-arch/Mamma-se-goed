import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

const SALT_ROUNDS = 10
const COOKIE_NAME = 'admin_session'
const SESSION_DURATION = 60 * 60 * 24 // 24 hours

function generateToken() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 48; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS)
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash)
}

export function createSessionCookie() {
  return {
    name: COOKIE_NAME,
    value: generateToken(),
    httpOnly: true,
    path: '/',
    maxAge: SESSION_DURATION,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  }
}

export function clearSessionCookie() {
  return {
    name: COOKIE_NAME,
    value: '',
    httpOnly: true,
    path: '/',
    maxAge: 0,
    sameSite: 'lax',
  }
}

export async function getSession() {
  try {
    const cookieStore = await cookies()
    return cookieStore.get(COOKIE_NAME)?.value
  } catch {
    return null
  }
}
