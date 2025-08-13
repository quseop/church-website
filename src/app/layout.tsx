import type {Metadata, Viewport} from "next";
import {Geist, Roboto_Slab} from "next/font/google";
import "./globals.css";
import Image from "next/image";
import {Header} from "@/components/pages/home/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const roboto = Roboto_Slab({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-roboto"
})

export const viewport: Viewport = {
    themeColor: "#111",
}

export const metadata: Metadata = {
    metadataBase: new URL("https://church-website-lyart.vercel.app"),
    title: "Original Seed Ministries",
    description: "Sharing the Gospel of Jesus Christ in truth and simplicity — pointing every soul to Calvary.",
    keywords: ["Gospel","End Time Message", "Original Seed Ministries", "Message of the Hour" ,"Faith", "Bible", "Sermons", "South Africa", "Christian Ministry", "Prayer", "Testimonies"],
    authors: [{ name: "Original Seed Ministries", url: "https://www.originalseedministries.org" }],
    openGraph: {
        title: "Original Seed Ministries",
        description: "Faith comes by hearing — and hearing by the Word of God. Join us for sermons, testimonies, and study resources.",
        url: "https://www.originalseedministries.org",
        siteName: "Original Seed Ministries",
        images: [
            {
                url: "/og-image.jpg", // Replace with your actual OG image path
                width: 1200,
                height: 630,
                alt: "Original Seed Ministries",
            },
        ],
        type: "website",
    },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${roboto.variable} bg-black antialiased`}
      >
          <section className="relative w-full h-screen flex-col flex z-20 transition-all duration-500 ease-in-out">
              <div className="fixed inset-0 w-full h-screen">
                  <Image
                      src="/prophet-wallpaper.png"
                      alt="hero"
                      fill
                      className="object-cover brightness-125 transition-transform duration-500 ease-in-out z-0" priority />
                  <div className="absolute inset-0 bg-[#D7D5C8]/70 z-10 transition-opacity duration-500 ease-in-out"/>
              </div>

              <section className="relative z-20 w-full max-h-screen flex-col flex">
                  <Header />
                  {children}
              </section>
          </section>
      </body>
    </html>
  );
}
