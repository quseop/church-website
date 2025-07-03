import Link from "next/link";
import {ArrowLeft} from "lucide-react";

type Testimony = {
    title: string;
    author: string;
    slug: string;
    preview: string;
    date: string;
};

const testimonies: Testimony[] = [
    {
        title: "He Healed My Body",
        author: "Sister Naledi",
        slug: "he-healed-my-body",
        preview: "After 3 years of pain, the Lord stepped in...",
        date: "June 10, 2025",
    },
    {
        title: "A Financial Miracle",
        author: "Brother Thabo",
        slug: "financial-miracle",
        preview: "I was broke and jobless. Then God moved...",
        date: "May 27, 2025",
    },
];

export default function TestimoniesList() {
    return (
        <main className=" px-[15%] py-20 text-[#ddd]">

            <div className="pb-12">
                <Link
                    href="/resources"
                    className=" hover:bg-[#6D2E47] hover:border-[#6D2E47] font-light tracking-widest rounded hover:rounded-3xl transition-all duration-500 text-[#ddd]"
                >
                    <ArrowLeft size={45} className="border rounded-3xl p-2" />
                </Link>
            </div>
            
        <h1 className="text-3xl font-light tracking-widest mb-6">Testimonies</h1>
            <p className="text-sm text-gray-400 mb-12 w-[60%]">
                “They overcame by the blood of the Lamb and by the word of their testimony.” — Revelation 12:11
            </p>

            <div className="space-y-8">
                {testimonies.map((post, i) => (
                    <Link
                        key={i}
                        href={`/resources/testimonies/${post.slug}`}
                        className="block border border-white/10 hover:border-[#6D2E47] p-6 rounded hover:bg-[#6D2E47]/10 transition-all"
                    >
                        <h3 className="text-xl font-light">{post.title}</h3>
                        <p className="text-sm text-gray-400 italic mb-2">
                            By {post.author} · {post.date}
                        </p>
                        <p className="text-sm text-gray-300">{post.preview}</p>
                    </Link>
                ))}
            </div>
        </main>
    );
}
