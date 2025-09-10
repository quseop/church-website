import Link from "next/link";
import {ArrowLeft} from "lucide-react";

type TestimonyItem = {
    id: string;
    title: string;
    author: string;
    preview: string;
    date: string;
};

export default function TestimoniesList({ items }: { items: TestimonyItem[] }) {
    return (
        <main className="relative py-20 flex flex-col gap-5 max-sm:bg-[#96958C] overflow-hidden no-scrollbar  w-full min-h-screen max-sm:px-[5%] px-[15%] text-[#222]">

            <div className="pb-12">
                <Link
                    href="/resources"
                    className=" hover:bg-[#6D2E47] hover:border-[#6D2E47] font-light tracking-widest rounded hover:rounded-3xl transition-all duration-500 "
                >
                    <ArrowLeft size={45} className="border border-black rounded-3xl p-2" />
                </Link>
            </div>

            <h1 className="text-3xl font-light tracking-widest mb-6">Testimonies</h1>
            <p className="text-sm text-gray-700 mb-12 w-[60%] max-sm:w-[100%]">
                “They overcame by the blood of the Lamb and by the word of their testimony.” — Revelation 12:11
            </p>

            <div className="space-y-8">
                {items.map((post) => (
                    <div
                        key={post.id}
                        className="block border border-white/10 hover:border-[#6D2E47] p-6 rounded hover:bg-[#6D2E47]/10 transition-all"
                    >
                        <h3 className="text-xl font-light">{post.title}</h3>
                        <p className="text-sm text-gray-700 italic mb-2">
                            By {post.author} · {post.date}
                        </p>
                        <p className="text-sm ">{post.preview}</p>
                    </div>
                ))}
                {items.length === 0 && (
                    <p className="text-black text-lg italic w-full text-center">No testimonies yet.</p>
                )}
            </div>
        </main>
    );
}
