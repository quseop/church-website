import {ArrowLeft, Download, FileText} from "lucide-react";
import Link from "next/link";

type StudyGuide = {
    title: string;
    description: string;
    fileUrl: string;
};

const guides: StudyGuide[] = [
    {
        title: "The Basics of Faith",
        description: "A foundational guide on what it means to live by faith.",
        fileUrl: "/guides/basics-of-faith.pdf",
    },
    {
        title: "Walking in the Spirit",
        description: "Understanding spiritual growth and daily surrender.",
        fileUrl: "/guides/walking-in-the-spirit.pdf",
    },
    {
        title: "The Power of Prayer",
        description: "Deepening your personal prayer life through scripture.",
        fileUrl: "/guides/power-of-prayer.pdf",
    },
];

export function StudyGuides() {
    return (
        <main className="relative flex flex-col h-screen w-full max-sm:px-[5%] px-[15%] py-10 ">

            <div className="pb-12">
                <Link
                    href="/resources"
                    className=" hover:bg-[#6D2E47] hover:border-[#6D2E47] font-light tracking-widest rounded hover:rounded-3xl transition-all duration-500 "
                >
                    <ArrowLeft size={45} className="border border-black rounded-3xl p-2" />
                </Link>
            </div>

            <h1 className="text-3xl font-light tracking-widest mb-6">Study Guides</h1>
            <p className=" text-sm mb-12 w-[60%] max-sm:w-[90%]">
                These free resources are made available to help you grow in your walk with the Lord. Each guide is written with simplicity and scriptural clarity.
            </p>



            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {guides.map((guide, i) => (
                    <div
                        key={i}
                        className="flex items-start space-x-4 border border-white/10 hover:border-[#6D2E47] p-6 rounded-md hover:bg-[#6D2E47]/10 transition-all duration-300"
                    >
                        <FileText className="w-6 h-6  mt-1" />
                        <div className="flex-1">
                            <h3 className="text-lg font-light tracking-wide">{guide.title}</h3>
                            <p className="text-sm text-gray-700 mb-2">{guide.description}</p>
                            <a
                                href={guide.fileUrl}
                                download
                                target="_blank"
                                className="inline-flex items-center text-sm text-gray-700 hover:text-[#6D2E47] transition"
                            >
                                <Download className="w-4 h-4 mr-1" />
                                Download
                            </a>
                        </div>
                    </div>
                ))}
            </div>


        </main>
    );
}

