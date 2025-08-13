import { Calendar, BookOpen, Users } from "lucide-react";

export function Announcements(){

    const events = [
        {
            title: "Sunday School Outing",
            date: "August 30th",
            icon: <Users className="w-5 h-5" />,
        },
        {
            title: "Sunday Service",
            date: "Every Sunday @10:00am",
            icon: <Calendar className="w-5 h-5" />,
        },
        {
            title: "Prayer Meeting",
            date: "Every Wednesday @7:00pm",
            icon: <BookOpen className="w-5 h-5" />,
        }
    ];

    return(
        <section className="h-screen w-full px-[15%] max-sm:px-[5%] py-20">
            <h2 className="text-3xl font-light tracking-widest">Announcements & Events</h2>
            <div className="mt-6 space-y-5">
                {events.map((event, index) => (
                    <div
                        key={index}
                        className="flex items-center space-x-4 p-4 rounded hover:bg-white/5 transition"
                    >
                        <div className="">{event.icon}</div>
                        <div className="flex flex-col">
                            <h3 className="text-xl font-light">{event.title}</h3>
                            <span className=" text-sm">{event.date}</span>
                        </div>
                    </div>
                ))}
            </div>
            {/*<div className="pt-8">*/}
            {/*    <a*/}
            {/*        href="/announcements"*/}
            {/*        className="border hover:bg-[#6D2E47] hover:border-[#6D2E47] flex py-3 px-6 font-light tracking-widest rounded hover:rounded-4xl transition-all duration-500 text-[#ddd]"*/}
            {/*    >*/}
            {/*        View All Announcements*/}
            {/*    </a>*/}
            {/*</div>*/}
        </section>
    )
}
