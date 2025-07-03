import {ExternalLink, Link2, Globe, BookOpen, ArrowLeft} from "lucide-react";
import {JSX} from "react";
import Link from "next/link";

type LinkItem = {
    title: string;
    description: string;
    url: string;
    icon?: JSX.Element;
};

const links: LinkItem[] = [
    {
        title: "The Bible Hub",
        description: "Parallel translations, Greek/Hebrew tools, commentaries, and concordances.",
        url: "https://biblehub.com",
        icon: <BookOpen className="w-5 h-5 text-[#6D2E47]" />,
    },
    {
        title: "End Time Message",
        description: "Library of sermons and resources related to the End-Time Message.",
        url: "https://branham.org",
        icon: <Globe className="w-5 h-5 text-[#6D2E47]" />,
    },
    {
        title: "Blue Letter Bible",
        description: "Searchable Bible study tools and commentaries.",
        url: "https://blueletterbible.org",
        icon: <BookOpen className="w-5 h-5 text-[#6D2E47]" />,
    },
    {
        title: "Voice of God Recordings",
        description: "Official site for Brother Branham's messages and historical content.",
        url: "https://branham.org/en",
        icon: <Link2 className="w-5 h-5 text-[#6D2E47]" />,
    },
];

export function RecommendedLinks() {
    return (
        <main className="h-screen overflow-hidden w-full px-[15%] py-20 text-[#ddd]">
            <div className="pb-12">
                <Link
                    href="/resources"
                    className=" hover:bg-[#6D2E47] hover:border-[#6D2E47] font-light tracking-widest rounded hover:rounded-3xl transition-all duration-500 text-[#ddd]"
                >
                    <ArrowLeft size={45} className="border rounded-3xl p-2" />
                </Link>
            </div>
            <h1 className="text-3xl font-light tracking-widest mb-6">Recommended Links</h1>
            <p className="text-sm text-gray-400 mb-12 w-[60%]">
                A collection of trusted resources for studying, growing, and walking in the truth of God’s Word.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {links.map((link, index) => (
                    <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-4 border border-white/10 hover:border-[#6D2E47] p-5 rounded hover:bg-[#6D2E47]/10 transition-all"
                    >
                        {link.icon}
                        <div>
                            <h3 className="text-lg font-light">{link.title}</h3>
                            <p className="text-sm text-gray-400">{link.description}</p>
                            <span className="inline-flex items-center text-sm text-[#6D2E47] mt-1">
                Visit Site <ExternalLink className="ml-1 w-4 h-4" />
              </span>
                        </div>
                    </a>
                ))}
            </div>

        </main>
    );
}
