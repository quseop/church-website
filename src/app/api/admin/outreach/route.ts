import { NextResponse } from "next/server"
import { sql } from "@/server/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/server/auth"

export async function GET() {
  const items = await sql`
    select id, title, url, alt, created_at as "createdAt", updated_at as "updatedAt"
    from outreach_photos
    order by created_at desc
  `
  return NextResponse.json(items)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  const role = (session?.user as { role?: string } | undefined)?.role
  if (role !== "ADMIN") {
    return new NextResponse("Forbidden", { status: 403 })
  }
  const body = await request.json()
  const [created] = await sql`
    insert into outreach_photos (title, url, alt)
    values (${body.title || null}, ${body.url}, ${body.alt || null})
    returning id, title, url, alt, created_at as "createdAt", updated_at as "updatedAt"
  `
  return NextResponse.json(created)
}
