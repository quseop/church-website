import { NextResponse } from "next/server"
import { sql } from "@/server/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/server/auth"

export async function GET() {
  const quotes = await sql`
    select id, text, author, is_active as "isActive", date, created_at as "createdAt", updated_at as "updatedAt"
    from quotes
    order by created_at desc
  `
  return NextResponse.json(quotes)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  const role = (session?.user as { role?: string } | undefined)?.role
  if (role !== "ADMIN") {
    return new NextResponse("Forbidden", { status: 403 })
  }
  const body = await request.json()
  const { text, author, isActive } = body
  const [created] = await sql`
    insert into quotes (text, author, is_active)
    values (${text}, ${author}, ${!!isActive})
    returning id, text, author, is_active as "isActive", date, created_at as "createdAt", updated_at as "updatedAt"
  `
  return NextResponse.json(created)
}
