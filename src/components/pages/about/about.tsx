import Link from "next/link";

export function About() {
    return(
        <main className="relative py-20 flex flex-col gap-10 justify-center w-full min-h-screen max-sm:px-[5%]  px-[15%] text-[#ddd]">
            {/*<div*/}
            {/*    className="absolute inset-0 bg-[url('/paper-texture.jpg')] bg-repeat opacity-10 mix-blend-multiply pointer-events-none z-0"*/}
            {/*/>*/}

            <h1 className="text-3xl font-light max-sm:text-2xl tracking-widest">Our Mission</h1>

            <p className="text-xl max-sm:text-sm font-light leading-7 max-sm:w-full w-[60%] tracking-widest">
                Original Seed Ministries exists to share the Gospel of Jesus Christ in its truth and simplicity. We stand upon the foundation that “faith comes by hearing, and hearing by the Word of God” (Romans 10:17), and we seek to make that Word available to every heart and home.
                <br /><br />
                We believe that true believers are known by the love they have for one another, as Jesus Himself said, “By this all will know that you are My disciples, if you have love for one another” (John 13:35).
                <br /><br />
                Through preaching, teaching, and living out these truths, Original Seed Ministries aims to point every soul to Calvary — to a deeper walk with the Lord, a stronger love for His people, and a steadfast faith in His Word.
            </p>

            <div className="flex mb-10">
                <Link
                    href="#"
                    className="border hover:bg-[#6D2E47] hover:border-[#6D2E47] flex py-4 px-8 font-light tracking-widest rounded hover:rounded-4xl transition-all duration-500 text-[#ddd]"
                >
                    Read Our Story
                </Link>
            </div>
        </main>
    )
}
