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
    text: body.text as string | undefined,
    author: body.author as string | undefined,
    is_active: typeof body.isActive === 'boolean' ? body.isActive : undefined,
  }
  const sets: string[] = []
  const values: unknown[] = []
  let i = 1
  for (const [k, v] of Object.entries(fields)) {
    if (typeof v !== 'undefined') { sets.push(`${k} = $${i++}`); values.push(v) }
  }
  values.push(id)
  const text = `update quotes set ${sets.join(', ')} where id = $${i} returning id, text, author, is_active as "isActive", date, created_at as "createdAt", updated_at as "updatedAt"`
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
  await sql`delete from quotes where id = ${id}`
  return new NextResponse(null, { status: 204 })
}
