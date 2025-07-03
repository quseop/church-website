import {
    BookOpen,
    HandPlatter,
    Link as LinkIcon, Quote, Video,
} from "lucide-react";
import Link from "next/link";

export function Resources() {
    const resources = [
        {
            title: "Study Guides",
            description: "Download guides to help you dive deeper into the Word.",
            icon: <BookOpen className="w-6 h-6" />,
            link: "/resources/guides",
        },
        {
            title: "Prayer Requests",
            description: "Submit your prayer needs. We’ll stand in faith with you.",
            icon: <HandPlatter className="w-6 h-6" />,
            link: "/resources/prayer",
        },
        {
            title: "Sermons",
            description: "Watch recent sermons and messages from our YouTube channel.",
            icon: <Video className="w-6 h-6" />,
            link: "/resources/sermons",
        },
        {
            title: "Testimonies",
            description: "Read powerful stories of what the Lord has done.",
            icon: <Quote className="w-6 h-6" />,
            link: "/resources/testimonies",
        },
        {
            title: "Recommended Links",
            description: "Explore trusted external resources and ministries.",
            icon: <LinkIcon className="w-6 h-6" />,
            link: "/resources/recommended",
        }

    ];

    return (
        <section className="relative w-full h-screen px-[15%] py-20 text-[#ddd]">
            <h2 className="text-3xl font-light tracking-widest mb-12">Resources</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {resources.map((res, i) => (
                    <Link
                        key={i}
                        href={res.link}
                        className="group flex items-center space-x-5 border border-white/10 hover:border-[#6D2E47] p-6 rounded-md hover:bg-[#6D2E47]/10 transition-all duration-300"
                    >
                        <div className="text-[#ccc] group-hover:text-[#6D2E47]">{res.icon}</div>
                        <div>
                            <h3 className="text-xl font-light tracking-wide">{res.title}</h3>
                            <p className="text-sm text-gray-400">{res.description}</p>
                        </div>
                    </Link>
                ))}
            </div>

        </section>
    );
}
