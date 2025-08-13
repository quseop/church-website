import {Hero} from "@/components/pages/home/hero";

export function Home(){
    return(
        <main className="w-full min-h-screen">
            <Hero />
            <section className="relative bg-white py-20 flex flex-col gap-30 justify-center w-full h-[50vh] max-sm:px-[5%] px-[15%] text-[#222]">
                <h2 className="text-2xl text-center max-sm:text-xl tracking-widest">What to expect on this channel</h2>
                <div className="grid  text-white grid-cols-3 gap-5 justify-evenly w-full ">
                    <div className="py-20 tracking-wider rounded text-center font-light text-xl px-5 bg-[#6D2E46] ">
                        Spirit-led <br /> Sermons and Teachings
                    </div>
                    <div className="py-20 tracking-wider rounded text-center font-light text-xl px-5 bg-[#6D2E46] ">
                        Anointed worship and song services
                    </div>
                    <div className="py-20 tracking-wider rounded text-center font-light text-xl px-5 bg-[#6D2E46] ">
                        Testimonies and Messages of Faith for the Bride of Christ
                    </div>
                </div>
            </section>
        </main>
    )
}

