import { NextResponse } from "next/server"
import { put } from "@vercel/blob"

const ALLOWED = new Set([
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
  'application/vnd.ms-powerpoint', // .ppt legacy
])

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const file = form.get('file') as File | null
    const title = (form.get('title') as string | null) ?? null
    const description = (form.get('description') as string | null) ?? null

    if (!file) return NextResponse.json({ error: 'file required' }, { status: 400 })
    if (!ALLOWED.has(file.type)) {
      return NextResponse.json({ error: 'unsupported file type' }, { status: 400 })
    }

    const safeName = (file.name || 'file').replace(/[^a-zA-Z0-9._-]/g, '_')
    const key = `study-guides/${Date.now()}-${safeName}`

    const { url } = await put(key, file, { access: 'public', addRandomSuffix: false })

    return NextResponse.json({ url, title, description, fileType: file.type })
  } catch {
    return NextResponse.json({ error: 'upload failed' }, { status: 500 })
  }
}
