import { NextResponse } from "next/server"
import { sql } from "@/server/db"

export async function GET() {
  const rows = await sql`
    select id, title, description, file_url as "fileUrl", file_type as "fileType",
           created_at as "createdAt", updated_at as "updatedAt"
    from study_guides
    order by created_at desc
  `
  return NextResponse.json(rows)
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as { title?: string; description?: string; fileUrl?: string; fileType?: string }
  if (!body.title || !body.fileUrl || !body.fileType) {
    return new NextResponse("Bad Request", { status: 400 })
  }
  const [created] = await sql`
    insert into study_guides (title, description, file_url, file_type)
    values (${body.title}, ${body.description || null}, ${body.fileUrl}, ${body.fileType})
    returning id, title, description, file_url as "fileUrl", file_type as "fileType",
              created_at as "createdAt", updated_at as "updatedAt"
  `
  return NextResponse.json(created)
}
