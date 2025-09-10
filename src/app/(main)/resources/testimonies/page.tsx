import TestimoniesList from "@/components/pages/resources/testimonies/testimonies"
import { sql } from "@/server/db"

export const revalidate = 60

type TestimonyRow = {
  id: string
  title: string
  content: string
  author: string
  date: string
}

export default async function TestimoniesPage() {
  const items = (await sql`
    select id, title, content, author, to_char(date, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') as date
    from testimonies
    where is_approved = true
    order by date desc
    limit 50
  `) as unknown as TestimonyRow[]

  const mapped = items.map((t) => ({
    id: t.id,
    title: t.title,
    author: t.author,
    date: new Date(t.date).toLocaleDateString(),
    preview: t.content.length > 200 ? t.content.slice(0, 200) + "…" : t.content,
  }))

  return <TestimoniesList items={mapped} />
}
