import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function PUT(request) {
  try {
    const token = await getSession()
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { items } = await request.json()
    for (const item of items) {
      await prisma.section.update({
        where: { id: item.id },
        data: { order: item.order },
      })
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
