'use client'

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

const linkStyle = "hover:bg-[#6D2E46] hover:text-white px-5 py-1.5 rounded-3xl transition-colors duration-300"

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="flex text-black w-full max-sm:px-[5%] px-[15%] py-5 items-center justify-between h-[10%] relative z-50">
            <Link href="/" className="font-black text-3xl tracking-tighter">OSM</Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex gap-2 tracking-wide font-light items-center">
                <Link href="/about" className={linkStyle}>About Us</Link>
                <Link href="/live" className={linkStyle}>Live</Link>
                <Link href="/announcements" className={linkStyle}>Announcements</Link>
                <Link href="/tithes-offerings" className={linkStyle}>Tithes & Offerings</Link>
                <Link href="/resources" className={linkStyle}>Resources</Link>
                <Link
                    href="/contact"
                    className="bg-white text-sm font-medium flex hover:font-bold items-center gap-2 hover:gap-2.5 text-[#333]  rounded-3xl px-5  hover:py-3 py-2 transition-all duration-300"
                >
                    Where to Find Us
                    <ArrowRight />
                </Link>
            </nav>

            {/* Hamburger icon on mobile */}
            <button
                className="md:hidden text-white"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation"
            >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile nav */}
            {isOpen && (
                <div className="absolute bg-[#96958C] top-full left-0 w-full px-2   py-6 flex flex-col gap-6 md:hidden">
                    <Link href="/about" className={linkStyle} onClick={() => setIsOpen(false)}>About Us</Link>
                    <Link href="/live" className={linkStyle} onClick={() => setIsOpen(false)}>Live</Link>
                    <Link href="/announcements" className={linkStyle} onClick={() => setIsOpen(false)}>Announcements</Link>
                    <Link href="/tithes-offerings" className={linkStyle}>Tithes & Offerings</Link>
                    <Link href="/resources" className={linkStyle} onClick={() => setIsOpen(false)}>Resources</Link>
                    <Link
                        href="/contact"
                        onClick={() => setIsOpen(false)}
                        className="bg-white max-sm:mx-[5%] text-sm font-medium flex hover:font-bold items-center gap-2 hover:gap-2.5 text-[#333]  rounded-3xl px-5  hover:py-3 py-2 transition-all duration-300"
                    >
                        Where to Find Us
                        <ArrowRight />
                    </Link>
                </div>
            )}
        </header>
    );
}


