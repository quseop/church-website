import { NextResponse } from "next/server"
import { sql } from "@/server/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/server/auth"

export async function GET() {
  const items = await sql`
    select id, title, content, summary, body_md as "bodyMd", event_items as "eventItems", author, image_url as "imageUrl", is_published as "isPublished", type, date, created_at as "createdAt", updated_at as "updatedAt"
    from news_articles
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
  const { title, content, summary, bodyMd, eventItems, author, imageUrl, isPublished } = body
  const [created] = await sql`
    insert into news_articles (title, content, summary, body_md, event_items, author, image_url, is_published)
    values (${title}, ${content || ''}, ${summary || null}, ${bodyMd || null}, ${eventItems ? JSON.stringify(eventItems) : null}, ${author}, ${imageUrl || null}, ${!!isPublished})
    returning id, title, content, summary, body_md as "bodyMd", event_items as "eventItems", author, image_url as "imageUrl", is_published as "isPublished", type, date, created_at as "createdAt", updated_at as "updatedAt"
  `
  return NextResponse.json(created)
}
