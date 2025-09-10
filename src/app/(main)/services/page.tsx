import { sql } from "@/server/db"

export const revalidate = 60

type ServiceItem = {
  id: string
  title: string
  description: string | null
  startsAt: string
  location: string | null
}

export default async function ServicesPage() {
  const now = new Date()
  const services = (await sql`
    select id, title, description, to_char(starts_at, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') as "startsAt", location
    from services
    where is_published = true and starts_at >= ${now.toISOString()}
    order by starts_at asc
    limit 50
  `) as unknown as ServiceItem[]

  return (
    <section className="min-h-screen bg-white text-[#222] px-[15%] max-sm:px-[5%] py-16">
      <h1 className="text-3xl font-light tracking-widest mb-8">Upcoming Services</h1>
      {services.length === 0 ? (
        <p className="text-gray-600">No upcoming services.</p>
      ) : (
        <ul className="space-y-4">
          {services.map((s) => (
            <li key={s.id} className="border-b pb-4">
              <h3 className="text-xl font-medium">{s.title}</h3>
              <p className="text-sm text-gray-600">{new Date(s.startsAt).toLocaleString()} {s.location ? `• ${s.location}` : ""}</p>
              {s.description && <p className="mt-2 text-gray-700">{s.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
