import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function PUT(request, { params }) {
  try {
    const token = await getSession()
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = params
    const body = await request.json()
    const section = await prisma.section.update({
      where: { id },
      data: {
        type: body.type,
        props: body.props,
        order: body.order,
        pageId: body.pageId,
      },
    })
    return NextResponse.json(section)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const token = await getSession()
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = params
    await prisma.section.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
