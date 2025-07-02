import {
    BookOpen,
    HandPlatter,
    CalendarCheck,
    Headphones,
    Link as LinkIcon,
} from "lucide-react";

export function Resources() {
    const resources = [
        {
            title: "Study Guides",
            description: "Download guides to help you dive deeper into the Word.",
            icon: <BookOpen className="w-6 h-6" />,
            link: "/resources/study-guides",
        },
        {
            title: "Prayer Requests",
            description: "Submit your prayer needs. We’ll stand in faith with you.",
            icon: <HandPlatter className="w-6 h-6" />,
            link: "/resources/prayer",
        },
        {
            title: "Reading Plans",
            description: "Explore Bible reading plans for daily devotion.",
            icon: <CalendarCheck className="w-6 h-6" />,
            link: "/resources/reading-plans",
        },
        {
            title: "Audio Sermons",
            description: "Listen to past sermons anytime, anywhere.",
            icon: <Headphones className="w-6 h-6" />,
            link: "/resources/audio-sermons",
        },
        {
            title: "Recommended Links",
            description: "Explore trusted external resources and ministries.",
            icon: <LinkIcon className="w-6 h-6" />,
            link: "/resources/links",
        },
    ];

    return (
        <section className="relative w-full h-screen px-[15%] py-20 text-[#ddd]">
            <h2 className="text-3xl font-light tracking-widest mb-12">Resources</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {resources.map((res, i) => (
                    <a
                        key={i}
                        href={res.link}
                        className="group flex items-start space-x-5 border border-white/10 hover:border-[#6D2E47] p-6 rounded-md hover:bg-[#6D2E47]/10 transition-all duration-300"
                    >
                        <div className="text-[#ccc] group-hover:text-[#6D2E47]">{res.icon}</div>
                        <div>
                            <h3 className="text-xl font-light tracking-wide">{res.title}</h3>
                            <p className="text-sm text-gray-400">{res.description}</p>
                        </div>
                    </a>
                ))}
            </div>

            <div className="pt-12">
                <a
                    href="/resources"
                    className="border hover:bg-[#6D2E47] hover:border-[#6D2E47] py-3 px-6 font-light tracking-widest rounded hover:rounded-3xl transition-all duration-500 text-[#ddd]"
                >
                    View All Resources
                </a>
            </div>
        </section>
    );
}
