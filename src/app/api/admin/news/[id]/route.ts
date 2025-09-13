import { NextResponse } from "next/server"
import { sql } from "@/server/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/server/auth"

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  const role = (session?.user as { role?: string } | undefined)?.role
  if (role !== "ADMIN") {
    return new NextResponse("Forbidden", { status: 403 })
  }
  const body = await request.json()
  const { id } = await context.params
  const fields = {
    title: body.title as string | undefined,
    content: body.content as string | undefined,
    summary: (body.summary as string | null | undefined) ?? undefined,
    body_md: (body.bodyMd as string | null | undefined) ?? undefined,
    event_items: (body.eventItems ? JSON.stringify(body.eventItems) : null) as string | null | undefined,
    author: body.author as string | undefined,
    image_url: (body.imageUrl as string | null | undefined) ?? undefined,
    poster_url: (body.posterUrl as string | null | undefined) ?? undefined,
    venue: (body.venue as string | null | undefined) ?? undefined,
    is_published: typeof body.isPublished === 'boolean' ? body.isPublished : undefined,
    type: body.type as string | undefined,
  }
  const sets: string[] = []
  const values: unknown[] = []
  let i = 1
  for (const [k, v] of Object.entries(fields)) {
    if (typeof v !== 'undefined') { sets.push(`${k} = $${i++}`); values.push(v) }
  }
  values.push(id)
  const text = `update news_articles set ${sets.join(', ')} where id = $${i} returning id, title, content, summary, body_md as "bodyMd", event_items as "eventItems", author, image_url as "imageUrl", poster_url as "posterUrl", venue, is_published as "isPublished", type, date, created_at as "createdAt", updated_at as "updatedAt"`
const [updated] = await (sql as unknown as (q: string, params: unknown[]) => Promise<unknown[]>)(text, values)
  return NextResponse.json(updated)
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  const role = (session?.user as { role?: string } | undefined)?.role
  if (role !== "ADMIN") {
    return new NextResponse("Forbidden", { status: 403 })
  }
  const { id } = await context.params
  await sql`delete from news_articles where id = ${id}`
  return new NextResponse(null, { status: 204 })
}
