import { Announcements } from "@/components/pages/announcements/announcements"
import { sql } from "@/server/db"

export const revalidate = 60

type NewsItem = {
  id: string
  title: string
  summary: string | null
  author: string
  date: string
  eventItems: { date: string; startTime: string; venue: string; note?: string }[] | null
  bodyMd: string | null
}

export default async function AnnouncementsPage() {
  const news = (await sql`
    select id, title, summary, body_md as "bodyMd", event_items as "eventItems", author, to_char(date, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') as date
    from news_articles
    where is_published = true
    order by date desc
    limit 10
  `) as unknown as NewsItem[]

  return (
    <div>
      <Announcements />
      <section className="bg-white text-[#222] px-[15%] max-sm:px-[5%] py-16">
        <h2 className="text-2xl font-light tracking-widest mb-6">Latest News</h2>
        {news.length === 0 ? (
          <p className="text-gray-600">No news yet.</p>
        ) : (
          <div className="space-y-4">
            {news.map((n) => (
              <article key={n.id} className="border-b pb-4">
                <h3 className="text-lg font-medium">{n.title}</h3>
                <p className="text-sm text-gray-600">By {n.author} • {new Date(n.date).toLocaleDateString()}</p>
                {n.summary && <p className="mt-2 text-gray-700 line-clamp-3">{n.summary}</p>}
                {Array.isArray(n.eventItems) && n.eventItems.length > 0 && (
                  <ul className="mt-2 text-sm text-gray-700 list-disc pl-5 space-y-1">
                    {n.eventItems.map((ev, i) => (
                      <li key={i}>
                        {ev.date ? new Date(ev.date).toLocaleDateString() : ''}
                        {ev.startTime ? ` • ${ev.startTime}` : ''}
                        {ev.venue ? ` • ${ev.venue}` : ''}
                        {ev.note ? ` — ${ev.note}` : ''}
                      </li>
                    ))}
                  </ul>
                )}
                {n.bodyMd && <p className="mt-2 text-gray-700 whitespace-pre-wrap">{n.bodyMd}</p>}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
