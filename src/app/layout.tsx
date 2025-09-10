import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "./providers"
import { Geist, Roboto_Slab } from "next/font/google"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const roboto = Roboto_Slab({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
})

export const viewport: Viewport = {
  themeColor: "#111",
}

export const metadata: Metadata = {
  title: "Original Seed Ministries",
  description:
    "End Time Message in Pretoria. We believe the Bible and the Spoken Word as preached by Malachi 4 (William Marrion Branham).",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${roboto.variable}`}>
      <body className="bg-black antialiased">
        <Providers>
          <section className="relative w-full min-h-screen flex-col flex z-20 transition-all duration-500 ease-in-out">
            <section className="relative z-20 w-full flex-col flex">
              {children}
              <Analytics />
            </section>
          </section>
        </Providers>
      </body>
    </html>
  )
}

