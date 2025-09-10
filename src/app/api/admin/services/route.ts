import { NextResponse } from "next/server"
import { sql } from "@/server/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/server/auth"

export async function GET() {
  const items = await sql`
    select id, title, description, starts_at as "startsAt", location, is_published as "isPublished", created_at as "createdAt", updated_at as "updatedAt"
    from services
    order by starts_at desc
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
    insert into services (title, description, starts_at, location, is_published)
    values (${body.title}, ${body.description || null}, ${body.startsAt}, ${body.location || null}, ${!!body.isPublished})
    returning id, title, description, starts_at as "startsAt", location, is_published as "isPublished", created_at as "createdAt", updated_at as "updatedAt"
  `
  return NextResponse.json(created)
}
