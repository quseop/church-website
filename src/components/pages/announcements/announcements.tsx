import { Calendar, BookOpen, Users } from "lucide-react";

export function Announcements(){

    const events = [
        {
            title: "Sunday Service",
            date: "Every Sunday @10:00am",
            icon: <Calendar className="w-5 h-5" />,
        },
        {
            title: "Prayer Meeting",
            date: "Every Wednesday @7:00pm",
            icon: <BookOpen className="w-5 h-5" />,
        },
        {
            title: "Community Outreach",
            date: "August 3rd, 2–5pm",
            icon: <Users className="w-5 h-5" />,
        },
    ];

    return(
        <section className="relative flex flex-col items-start overflow-hidden justify-center w-full max-sm:px-[5%] p-[15%] text-[#ddd]">
            <h2 className="text-3xl font-light tracking-widest">Announcements & Events</h2>
            <div className="mt-6 space-y-5">
                {events.map((event, index) => (
                    <div
                        key={index}
                        className="flex items-center space-x-4 p-4 rounded hover:bg-white/5 transition"
                    >
                        <div className="text-[#ddd]">{event.icon}</div>
                        <div className="flex flex-col">
                            <h3 className="text-xl font-light">{event.title}</h3>
                            <span className="text-gray-400 text-sm">{event.date}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pt-8">
                <a
                    href="/announcements"
                    className="border hover:bg-[#6D2E47] hover:border-[#6D2E47] flex py-3 px-6 font-light tracking-widest rounded hover:rounded-4xl transition-all duration-500 text-[#ddd]"
                >
                    View All Announcements
                </a>
            </div>
        </section>
    )
}
