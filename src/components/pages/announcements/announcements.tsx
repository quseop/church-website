import {sql} from "@/server/db";
import { Poster } from "@/components/pages/announcements/Poster";

export const revalidate = 60

type NewsItem = {
    id: string
    title: string
    summary: string | null
    bodyMd: string | null
    eventItems: { date: string; startTime: string; venue?: string; note?: string }[] | null
    posterUrl?: string | null
    venue?: string | null
    author: string
    date: string
}

export async function Announcements(){

    const news = (await sql`
    select id, title, summary, body_md as "bodyMd", event_items as "eventItems", poster_url as "posterUrl", venue, author, to_char(date, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') as date
    from news_articles
    where is_published = true
    order by date desc
    limit 10
  `) as unknown as NewsItem[]

    return(
        <section className="min-h-screen max-sm:bg-[#96958C] w-full px-[15%] max-sm:px-[5%] py-20">
            <h2 className="text-3xl font-light tracking-widest">Latest News & Updates</h2>
            <div className="mt-6 space-y-5">
                {news.length === 0 ? (
                    <p className="text-gray-600">No news yet.</p>
                ) : (
                    <div className="space-y-6">
                        {news.map((n) => (
                            <article key={n.id} className="pb-6 border-b">
                                <h3 className="text-xl font-light">{n.title}</h3>
                                <p className="text-sm text-gray-600">By {n.author} • {new Date(n.date).toLocaleDateString()}</p>
                                {n.posterUrl && (
                                  <Poster posterUrl={n.posterUrl} title={n.title} />
                                )}
                                {n.summary && <p className="mt-3 text-gray-700">{n.summary}</p>}
                                {Array.isArray(n.eventItems) && n.eventItems.length > 0 && (
                                  <div className="mt-2 text-sm text-gray-700 space-y-2">
                                    {(() => {
                                      const groups = new Map<string, { date: string; startTime: string; venue?: string; note?: string }[]>()
                                      const fallbackVenue = n.venue || ''
                                      for (const item of n.eventItems) {
                                        const v = (item.venue || fallbackVenue || '').trim()
                                        const key = v || 'Schedule'
                                        if (!groups.has(key)) groups.set(key, [])
                                        groups.get(key)!.push(item)
                                      }
                                      return Array.from(groups.entries()).map(([venueLabel, items], gi) => (
                                        <div key={gi}>
                                          {venueLabel && <div className="font-medium">{venueLabel}</div>}
                                          <ul className="list-disc pl-5">
                                            {items.map((ev, i) => (
                                              <li key={i}>
                                                {ev.date ? new Date(ev.date).toLocaleDateString() : ''}
                                                {ev.startTime ? ` • ${ev.startTime}` : ''}
                                                {ev.note ? ` — ${ev.note}` : ''}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))
                                    })()}
                                  </div>
                                )}
                                {n.bodyMd && <p className="mt-2 text-gray-700 whitespace-pre-wrap">{n.bodyMd}</p>}
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
