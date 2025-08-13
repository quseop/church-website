import {ArrowLeft, ExternalLink} from "lucide-react";
import Link from "next/link";

type Sermon = {
    title: string;
    youtubeUrl: string;
    thumbnailUrl: string;
    date: string;
};

const sermons: Sermon[] = [
    { title: "2025‑0706AM - Sunday Service", youtubeUrl: "https://www.youtube.com/watch?v=JEVQqry82jc", thumbnailUrl: "https://img.youtube.com/vi/JEVQqry82jc/hqdefault.jpg", date: "July 6, 2025" },
    { title: "2025‑0702PM - The Gospel We Have Received", youtubeUrl: "https://www.youtube.com/watch?v=JEVQqry82jc", thumbnailUrl: "https://img.youtube.com/vi/JEVQqry82jc/hqdefault.jpg", date: "July 2, 2025" },
    { title: "2025‑0629M - Sunday Service", youtubeUrl: "https://www.youtube.com/watch?v=S-4bm7dtDSE", thumbnailUrl: "https://img.youtube.com/vi/S-4bm7dtDSE/hqdefault.jpg", date: "June 29, 2025" },
    { title: "2025‑0618PM - The Original Seed – Brother Alpha Hungwe", youtubeUrl: "https://www.youtube.com/watch?v=mXbfheVTy3w", thumbnailUrl: "https://img.youtube.com/vi/mXbfheVTy3w/hqdefault.jpg", date: "June 18, 2025" },
    { title: "2025‑0608AM - The Token Displayed – Pastor Blessing Mapatha", youtubeUrl: "https://www.youtube.com/watch?v=sGX5q6Rc8ts", thumbnailUrl: "https://img.youtube.com/vi/sGX5q6Rc8ts/hqdefault.jpg", date: "June 8, 2025" },
    // { title: "2025‑0420AM - It’s Easter Time! – Pastor Blessing Mapatha", youtubeUrl: "https://www.youtube.com/watch?v=???", thumbnailUrl: "https://img.youtube.com/vi/???/hqdefault.jpg", date: "April 20, 2025" },
];

export function Sermons() {
    return (
        <main className="bg-[#96958C]  max-sm:px-[5%] w-full px-[15%] py-10 ">
            <div className="pb-12">
                <Link
                    href="/resources"
                    className=" hover:bg-[#6D2E47] hover:border-[#6D2E47] font-light tracking-widest rounded hover:rounded-3xl transition-all duration-500"
                >
                    <ArrowLeft size={45} className="border border-black rounded-3xl p-2" />
                </Link>
            </div>
            <h1 className="text-3xl font-light tracking-widest mb-6">Sermons</h1>
            <p className="text-sm text-gray-700 mb-12 w-[60%]">
                Watch the latest sermons from Original Seed Ministries on YouTube.
            </p>

            <div className="grid mb-20 grid-cols-1 md:grid-cols-3 gap-8">
                {sermons.map((s, i) => (
                    <a
                        key={i}
                        href={s.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-white hover:border-[#6D2E47] p-4 rounded hover:bg-[#6D2E47]/10 transition-all flex flex-col gap-3"
                    >
                        <img
                            // width={100}
                            // height={100}
                            src={s.thumbnailUrl}
                            alt={s.title}
                            className="rounded w-full object-cover aspect-video"
                        />
                        <div>
                            <h3 className="text-lg font-light">{s.title}</h3>
                            <p className="text-sm text-gray-700 mb-1">{s.date}</p>
                            <span className="inline-flex items-center text-sm text-[#6D2E47]">
                Watch on YouTube <ExternalLink className="ml-1 w-4 h-4" />
              </span>
                        </div>
                    </a>
                ))}
            </div>
        </main>
    );
}
