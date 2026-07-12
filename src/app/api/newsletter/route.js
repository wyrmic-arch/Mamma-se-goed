import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request) {
  try {
    const { email, name } = await request.json()
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    const existing = await prisma.subscriber.findUnique({ where: { email } })
    if (existing) return NextResponse.json({ message: 'Already subscribed' })

    await prisma.subscriber.create({ data: { email, name: name || null } })
    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
