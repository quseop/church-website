import {sql} from "@/server/db";

export const revalidate = 60

type NewsItem = {
    id: string
    title: string
    content: string
    author: string
    date: string
}

export async function Announcements(){

    const news = (await sql`
    select id, title, content, author, to_char(date, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') as date
    from news_articles
    where is_published = true
    order by date desc
    limit 10
  `) as unknown as NewsItem[]

    return(
        <section className="h-screen max-sm:bg-[#96958C] w-full px-[15%] max-sm:px-[5%] py-20">
            <h2 className="text-3xl font-light tracking-widest">Latest News & Updates</h2>
            <div className="mt-6 space-y-5">
                {news.length === 0 ? (
                    <p className="text-gray-600">No news yet.</p>
                ) : (
                    <div className="space-y-4">
                        {news.map((n) => (
                            <article key={n.id} className=" pb-4">
                                <h3 className="text-xl font-light">{n.title}</h3>
                                <p className="text-sm text-gray-600">By {n.author} • {new Date(n.date).toLocaleDateString()}</p>
                                <p className="mt-2 text-gray-700 line-clamp-3">{n.content}</p>
                            </article>
                        ))}
                    </div>
                )}
            </div>
            {/*<div className="pt-8">*/}
            {/*    <a*/}
            {/*        href="/announcements"*/}
            {/*        className="border hover:bg-[#6D2E47] hover:border-[#6D2E47] flex py-3 px-6 font-light tracking-widest rounded hover:rounded-4xl transition-all duration-500 text-[#ddd]"*/}
            {/*    >*/}
            {/*        View All Announcements*/}
            {/*    </a>*/}
            {/*</div>*/}
        </section>
    )
}
