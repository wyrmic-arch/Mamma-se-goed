import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { deleteImage } from '@/lib/blob'

export async function DELETE(request, { params }) {
  try {
    const token = await getSession()
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = params
    const media = await prisma.media.findUnique({ where: { id } })
    if (media) {
      await deleteImage(media.url)
      await prisma.media.delete({ where: { id } })
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
