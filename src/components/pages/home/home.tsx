import {Hero} from "@/components/pages/home/hero";
import {Copyright} from "lucide-react";
import React from "react";

export function Home(){
    return(
        <main className="w-full min-h-screen">
            <Hero />
            <section className="relative bg-white py-20 flex flex-col max-sm:gap-10 gap-30 justify-center w-full  max-sm:px-[5%] px-[15%] text-[#222]">
                <h2 className="text-4xl text-center max-sm:text-xl font-light tracking-widest">What to expect on this channel</h2>
                <div className="grid  max-sm:grid-cols-1  text-white grid-cols-3 gap-5 justify-evenly w-full ">
                    <div className="py-20 flex items-center justify-center tracking-wider rounded text-center font-thin text-xl px-5 bg-[#999]  ">
                        Spirit-led <br /> Sermons and Teachings
                    </div>
                    <div className="py-20 tracking-wider flex items-center justify-center rounded text-center font-thin text-xl px-5 bg-[#6D2E46] ">
                        Anointed worship and song services
                    </div>
                    <div className="py-20 flex items-center tracking-wider rounded text-center font-thin text-xl px-5 bg-[#999]  ">
                        Testimonies and Messages of Faith for the Bride of Christ
                    </div>
                </div>
            </section>
            <section className="h-[35vh] flex items-end justify-center py-5 text-white w-full bg-black">
                <p className=" text-sm font-light flex justify-center items-center gap-1">
                    <Copyright size={25} /> Original Seed Ministries - 2025
                </p>
            </section>

        </main>
    )
}

