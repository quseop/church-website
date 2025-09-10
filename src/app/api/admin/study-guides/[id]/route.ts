import { NextResponse } from "next/server"
import { sql } from "@/server/db"

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const body = await request.json().catch(() => ({})) as { title?: string; description?: string; fileUrl?: string; fileType?: string }
  const { id } = await context.params
  const fields = {
    title: body.title as string | undefined,
    description: (body.description as string | null | undefined) ?? undefined,
    file_url: body.fileUrl as string | undefined,
    file_type: body.fileType as string | undefined,
  }
  const sets: string[] = []
  const values: unknown[] = []
  let i = 1
  for (const [k, v] of Object.entries(fields)) {
    if (typeof v !== 'undefined') { sets.push(`${k} = $${i++}`); values.push(v) }
  }
  values.push(id)
  const text = `update study_guides set ${sets.join(', ')} where id = $${i} returning id, title, description, file_url as "fileUrl", file_type as "fileType", created_at as "createdAt", updated_at as "updatedAt"`
  const [updated] = await (sql as unknown as (q: string, params: unknown[]) => Promise<unknown[]>)(text, values)
  return NextResponse.json(updated)
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  await sql`delete from study_guides where id = ${id}`
  return new NextResponse(null, { status: 204 })
}
