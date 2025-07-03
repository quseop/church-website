import { notFound } from "next/navigation";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";

const testimonies = [
    {
        slug: "he-healed-my-body",
        title: "He Healed My Body",
        author: "Sister Naledi",
        date: "June 10, 2025",
        content: `
      For three years, I suffered from chronic back pain...
      I prayed and fasted, and one day during worship, I felt the pain leave.
      I give glory to God for His healing power!
    `,
    },
    {
        slug: "financial-miracle",
        title: "A Financial Miracle",
        author: "Brother Thabo",
        date: "May 27, 2025",
        content: `
      I lost my job and had no income for months.
      One night, I gave my last offering and prayed for a breakthrough.
      Two days later, I got a job offer I never applied for.
      God provides!
    `,
    },
];

export function TestimonyBlog({ slug }: {slug: string}) {
    const post = testimonies.find((t) => t.slug === slug);
    if (!post) return notFound();

    return (
        <main className="h-screen px-[15%] max-sm:px-[5%] py-20 text-[#ddd]">

            <div className="pb-12">
                <Link
                    href="/resources"
                    className=" hover:bg-[#6D2E47] hover:border-[#6D2E47] font-light tracking-widest rounded hover:rounded-3xl transition-all duration-500 text-[#ddd]"
                >
                    <ArrowLeft size={45} className="border rounded-3xl p-2" />
                </Link>
            </div>

            <h1 className="text-3xl font-light tracking-widest mb-4">{post.title}</h1>
            <p className="text-sm text-gray-400 mb-6">
                By {post.author} · {post.date}
            </p>
            <article className="text-lg leading-8 whitespace-pre-wrap text-gray-300">
                {post.content.trim()}
            </article>

            <div className="pt-12">
                <Link
                    href="/resources/testimonies"
                    className="underline text-[#6D2E47] hover:text-[#8d3b61] text-sm"
                >
                    ← Back to Testimonies
                </Link>
            </div>
        </main>
    );
}
