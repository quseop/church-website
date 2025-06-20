import {Header} from "@/components/home/header";
import {Hero} from "@/components/home/hero";
import Image from "next/image";

export function Home(){
    return(
        <main className="w-full h-screen overflow-y-scroll scroll-smooth no-scrollbar snap-mandatory">
            <section className="relative w-full min-h-screen flex-col flex z-20 transition-all duration-500 ease-in-out">
                <div className="absolute inset-0 w-full h-screen">
                    <Image
                        src="/prophet-wallpaper.png"
                        alt="hero"
                        fill
                        className="object-cover transition-transform duration-500 ease-in-out z-0" priority />
                    <div className="absolute inset-0 bg-black/50 z-10 transition-opacity duration-500 ease-in-out"/>
                </div>
                <section className="relative z-20 w-full h-screen flex-col flex">
                    <Header />
                    <Hero />
                </section>
            </section>
            {/*<section className="relative w-full h-screen bg-[#F5F1E6]  transition-all duration-500 ease-in-out">*/}
            {/*    <div className="absolute inset-0 w-full h-screen">*/}
            {/*        <Image*/}
            {/*            src="/prophet-wallpaper.png"*/}
            {/*            alt="hero" fill className="object-cover hidden transition-transform duration-500 ease-in-out  z-0" priority />*/}
            {/*        <div className="absolute inset-0 transition-opacity duration-500 ease-in-out  z-10"/>*/}
            {/*    </div>*/}
            {/*    <section className="relative z-20 p-25 w-full h-screen items-center flex-col flex">*/}
            {/*        <h3 className="text-3xl text-white transition-transform duration-500 ease-in-out">Quick Links</h3>*/}

            {/*        <div className="w-[80%] bg-[#6D2E47] flex font-medium text-3xl bg-[] h-60">*/}
            {/*            <div className="relative w-[50%] ">*/}
            {/*                <div className="absolute inset-0 w-full h-70">*/}
            {/*                    <Image*/}
            {/*                        src="/prophet-wallpaper.png"*/}
            {/*                        alt="hero"*/}
            {/*                        fill*/}
            {/*                        className="object-cover transition-transform duration-500 ease-in-out z-0" priority />*/}
            {/*                    <div className="absolute inset-0 bg-black/50 z-10 transition-opacity duration-500 ease-in-out"/>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className="text-white relative w-[50%]">*/}
            {/*                <p>Why are we not a denomination?</p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </section>*/}
            {/*</section>*/}
        </main>
    )
}

