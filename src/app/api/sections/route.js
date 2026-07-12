import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
  try {
    const sections = await prisma.section.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(sections)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const token = await getSession()
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const count = await prisma.section.count()
    const section = await prisma.section.create({
      data: {
        type: body.type,
        props: body.props || {},
        order: count,
        pageId: body.pageId || 'home',
      },
    })
    return NextResponse.json(section, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
