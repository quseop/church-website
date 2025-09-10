import { NextResponse } from "next/server"
import { sql } from "@/server/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/server/auth"

export async function GET() {
  const items = await sql`
    select id, title, content, author, is_approved as "isApproved", date, created_at as "createdAt", updated_at as "updatedAt"
    from testimonies
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
    insert into testimonies (title, content, author, is_approved)
    values (${body.title}, ${body.content}, ${body.author}, ${!!body.isApproved})
    returning id, title, content, author, is_approved as "isApproved", date, created_at as "createdAt", updated_at as "updatedAt"
  `
  return NextResponse.json(created)
}
