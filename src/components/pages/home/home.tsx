import {Hero} from "@/components/pages/home/hero";
import React from "react";
import { sql } from "@/server/db";

type QuoteRow = { id: string; text: string; author: string }

export async function Home(){
    const quotes = (await sql`
      select id, text, author
      from quotes
      where is_active = true
      order by date desc
      limit 3
    `) as unknown as QuoteRow[]
    return(
        <main className="w-full min-h-screen">
            <Hero />

            <section className="bg-white w-full text-[#222] px-[15%] max-sm:px-[5%] py-16">
                <h2 className="text-2xl font-light tracking-widest mb-6">Daily Inspiration</h2>
                {quotes.length === 0 ? (
                    <p className="text-gray-600">No quotes yet.</p>
                ) : (
                    <div className="grid gap-4 text-center w-full md:grid-cols-3 grid-cols-1">
                        {quotes.map((q) => (
                            <blockquote key={q.id} className="p-20 rounded col-span-3 bg-gray-50">
                                <p className="italic text-4xl">“{q.text}”</p>
                                <p className="text-sm text-gray-600 mt-2">— {q.author}</p>
                            </blockquote>
                        ))}
                    </div>
                )}
            </section>

            <section className="relative bg-white py-20 flex flex-col max-sm:gap-10 gap-20 justify-center w-full  max-sm:px-[5%] px-[15%] text-[#222]">
                <h2 className="text-2xl max-sm:text-xl font-light tracking-widest">What to expect on this channel</h2>
                <div className="grid  max-sm:grid-cols-1  text-white grid-cols-3 gap-5 justify-evenly w-full ">
                    <div className="py-20 flex items-center justify-center tracking-wider rounded text-center font-thin text-xl px-5 bg-[#999]  ">
                        Spirit-led <br /> Sermons and Teachings
                    </div>
                    <div className="py-20 tracking-wider flex items-center justify-center rounded text-center font-thin text-xl px-5 bg-[#6D2E46] ">
                        Anointed worship and song services
                    </div>
                    <div className="py-20 flex items-center tracking-wider rounded text-center font-thin text-xl px-5 bg-[#999]  ">
                        Testimonies and Messages of Faith for the Bride of Christ
                    </div>
                </div>
            </section>

        </main>
    )
}

