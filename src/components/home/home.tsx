import {Header} from "@/components/home/header";
import {Hero} from "@/components/home/hero";
import Image from "next/image";

export function Home(){
    return(
        <main className="w-full h-full">
            <div className="fixed inset-0 w-full h-screen">
                <Image src="/prophet-wallpaper.png" alt="hero" fill className="object-cover z-0" priority />
                <div className="absolute inset-0  bg-black/50 z-10"/>
            </div>
            <section className="relative h-screen flex-col flex z-20">
                <Header />
                <Hero />
            </ section>
        </main>
    )
}
