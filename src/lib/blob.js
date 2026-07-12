export async function uploadImage(file) {
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import('@vercel/blob')
    const blob = await put(filename, file, { access: 'public' })
    return blob.url
  }

  const { writeFile, mkdir } = await import('fs/promises')
  const path = await import('path')
  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  await mkdir(uploadDir, { recursive: true })
  const buffer = Buffer.from(await file.arrayBuffer())
  const filepath = path.join(uploadDir, filename)
  await writeFile(filepath, buffer)
  return `/uploads/${filename}`
}

export async function deleteImage(url) {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { del } = await import('@vercel/blob')
    await del(url)
    return
  }

  const { unlink } = await import('fs/promises')
  const path = await import('path')
  const filename = path.basename(url)
  const filepath = path.join(process.cwd(), 'public', 'uploads', filename)
  try { await unlink(filepath) } catch {}
}
