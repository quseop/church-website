import Link from "next/link";
import {Dancing_Script} from "next/font/google";

const dancingScript = Dancing_Script({
    variable: "--font-dancing-script",
    subsets: ["latin"],
});

export function Hero() {
    return (
        <main className="flex px-[15%] max-sm:items-center max-sm:px-[5%] text-white flex-col w-full bg-gradient-to-r h-[90%] justify-center gap-10">
            <p className="text-3xl flex flex-col max-sm:items-center font-light leading-15 text-[#dddz] ">
                <span className={`${dancingScript.className} text-[#6D2E46] max-sm:text-4xl text-5xl`}>Original Seed Ministries.</span>
                <span className="font-light max-sm:text-center uppercase max-sm:text-5xl text-7xl">

                    Pointing souls <br /> to Calvary
                </span>
            </p>
            <p className="text-[#ddd] max-sm:text-lg text-2xl tracking-wide italic">
                Join us @10:00am this Sunday!
            </p>
            <div className="flex gap-5 items-stretch w-full">
                <Link href="/about" className="bg-[#6D2E47] text-center flex-1 max-sm:px-2  py-4 px-8 font-light tracking-widest rounded hover:rounded-4xl transition-all duration-300 text-[#ddd]" >
                    Learn More
                </Link>
                <Link href="/live" className="border flex-1 py-4 px-8 text-center font-light max-sm:px-2 tracking-widest rounded hover:rounded-4xl transition-all duration-300 text-[#ddd]" >
                    Watch Online
                </Link>
            </div>
        </main>
    )
}
