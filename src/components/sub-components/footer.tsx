import Link from "next/link";
import {Copyright, Facebook, YoutubeIcon} from "lucide-react";
import Image from "next/image";
import React from "react";

export function Footer() {
    return (
        <section className="flex flex-col  items-center gap-10 py-10 justify-end  text-white w-full bg-black">


            <nav className="flex gap-5 text-xs font-light tracking-widest max-md:hidden">
                <Link href="/about" className="hover:underline">About Us</Link>
                <Link href="/live" className="hover:underline">Live</Link>
                <Link href="/announcements" className="hover:underline">Announcements</Link>
                <Link href="/tithes-offerings" className="hover:underline">Tithes & Offerings</Link>
                <Link href="/resources" className="hover:underline">More</Link>
                <Link href="/contact" className="hover:underline">Contact Us</Link>
            </nav>

            <div className="flex gap-5">
                <Link href="https://www.facebook.com/BlessPower/" target="_blank">
                    <Facebook size={25} />
                </Link>
                <Link href="https://www.youtube.com/@originalseedministries8906" target="_blank">
                    <YoutubeIcon size={25} />
                </Link>
            </div>

            <Link href="/">
                <Image src={"/osm.png"} width={100} height={50} className="mt-2" alt={"OSM Logo"} />
            </Link>

            <p className=" text-sm font-light flex justify-center items-center gap-2">
                <Copyright size={20} /> Original Seed Ministries - 2025
            </p>
        </section>
    )
}