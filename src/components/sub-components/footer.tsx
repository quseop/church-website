import Link from "next/link";
import {Copyright, Facebook, YoutubeIcon} from "lucide-react";
import Image from "next/image";
import React from "react";

export function Footer() {
    return (
        <section className="h-[35vh] flex flex-col  items-center gap-10 py-10 justify-end py-5 text-white w-full bg-black">

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

            <p className=" text-sm font-light flex justify-center items-center gap-1">
                <Copyright size={25} /> Original Seed Ministries - 2025
            </p>
        </section>
    )
}