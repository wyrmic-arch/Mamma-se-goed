import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { uploadImage } from '@/lib/blob'

export async function GET() {
  try {
    const media = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(media)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const token = await getSession()
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const formData = await request.formData()
    const file = formData.get('file')
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const url = await uploadImage(file)
    const media = await prisma.media.create({
      data: {
        url,
        filename: file.name,
        mimeType: file.type || 'image/jpeg',
        size: file.size || 0,
      },
    })
    return NextResponse.json(media, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
