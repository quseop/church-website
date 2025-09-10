import { NextResponse } from "next/server"
import { sql } from "@/server/db"
import { sendContactFormEmail } from "@/lib/mailer"

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({})) as { name?: string; email?: string; message?: string }
    const name = (body.name || "Anonymous").toString()
    const email = (body.email || "").toString()
    const message = (body.message || "").toString()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Insert into DB
    const [created] = await sql`
      insert into prayer_requests (name, email, content, is_handled)
      values (${name || null}, ${email || null}, ${message}, false)
      returning id
    `

    // Notify via email (reuse contact template)
    await sendContactFormEmail({ fullName: name, email, message })

    return NextResponse.json({ ok: true, id: created?.id ?? null })
  } catch {
    return NextResponse.json({ error: "Failed to submit request" }, { status: 500 })
  }
}
