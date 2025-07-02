import Link from "next/link";
import {Dancing_Script} from "next/font/google";

const dancingScript = Dancing_Script({
    variable: "--font-dancing-script",
    subsets: ["latin"],
});

export function Hero() {
    return (
        <main className="flex px-[15%] text-white flex-col w-full bg-gradient-to-r h-[90%] justify-center gap-10">
            <p className="text-3xl flex flex-col  font-light leading-15 text-[#dddz] ">
                <span className={`${dancingScript.className} text-[#6D2E46] text-5xl`}>Original Seed Ministries.</span>
                <span className="font-light uppercase text-7xl">

                    Pointing souls <br /> to Calvary
                </span>
            </p>
            <p className="text-[#ddd] text-2xl tracking-wide italic">
                Join us @10:00am this Sunday!
            </p>
            <div className="flex gap-5">
                <Link href="#" className="bg-[#6D2E47] py-4 px-8 font-light tracking-widest rounded hover:rounded-4xl transition-all duration-300 text-[#ddd]" >
                    Learn More
                </Link>
                <Link href="#" className="border py-4 px-8 font-light tracking-widest rounded hover:rounded-4xl transition-all duration-300 text-[#ddd]" >
                    Watch Online
                </Link>
            </div>
        </main>
    )
}
