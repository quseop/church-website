import { NextResponse } from "next/server"
import { put } from "@vercel/blob"

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const file = form.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'file required' }, { status: 400 })

    const safeName = (file.name || 'poster').replace(/[^a-zA-Z0-9._-]/g, '_')
    const key = `news-posters/${Date.now()}-${safeName}`
    const { url } = await put(key, file, { access: 'public', addRandomSuffix: false })
    return NextResponse.json({ url })
  } catch {
    return NextResponse.json({ error: 'upload failed' }, { status: 500 })
  }
}
