import { NextResponse } from "next/server"
import { sendContactFormEmail, sendCustomerConfirmationEmail } from "@/lib/mailer"

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({})) as { fullName?: string; email?: string; message?: string }
    const fullName = (body.fullName || "Anonymous").toString()
    const email = (body.email || "").toString()
    const message = (body.message || "").toString()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Fire and wait for the admin notification
    await sendContactFormEmail({ fullName, email, message })

    // Best-effort confirmation to the sender (if email provided)
    if (email) {
      // Don't block on confirmation
      sendCustomerConfirmationEmail(email, fullName).catch(() => {})
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
