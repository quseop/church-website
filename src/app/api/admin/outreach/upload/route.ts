import { NextResponse } from "next/server"
import { put } from "@vercel/blob"

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const file = form.get('file') as File | null
    const title = (form.get('title') as string | null) ?? null
    const alt = (form.get('alt') as string | null) ?? null

    if (!file) {
      return NextResponse.json({ error: 'file is required' }, { status: 400 })
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const key = `outreach/${Date.now()}-${safeName}`

    const { url } = await put(key, file, {
      access: 'public',
      addRandomSuffix: false,
    })

    return NextResponse.json({ url, title, alt })
  } catch {
    return NextResponse.json({ error: 'upload failed' }, { status: 500 })
  }
}
