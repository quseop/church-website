import Link from "next/link";
import {ArrowRight} from "lucide-react";

export function Header(){

    const linkStyle = "hover:border border border-black hover:border-white px-5 py-1.5 rounded-3xl transition-colors duration-300"

    return(
        <header className="flex text-white w-full px-[15%] py-5 items-center justify-between h-[10%]">
            <Link href="/" className="font-black text-3xl tracking-tighter">OSM</Link>
            <nav className="flex gap-5  tracking-wide font-light items-center">
                <Link href="/about" className={linkStyle}>About Us</Link>
                <Link href="/live" className={linkStyle}>Live</Link>
                <Link href="/announcements" className={linkStyle}>Announcements</Link>
                <Link href="/resources" className={linkStyle}>Resources</Link>
                <Link
                    href="/contact"
                    className="bg-white text-sm font-medium flex hover:font-bold items-center gap-2 hover:gap-2.5 text-[#333]  rounded-3xl px-5  hover:py-3 py-2 transition-all duration-300">
                    CONNECT
                    <ArrowRight />
                </Link>
            </nav>
        </header>
    )
}
