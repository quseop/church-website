export function Hero() {
    return (
        <main className="flex px-15 flex-col gap-4 w-full bg-gradient-to-r h-[90%] justify-center ">
            <p className="text-3xl font-light leading-15 text-[#999] ">
                WELCOME TO <br />
                <span className="font-black uppercase text-5xl">
                Original Seed Ministries
                </span>
            </p>
            {/*<hr className="border-0.5 border-white w-6/17" />*/}
            <section className="pl-5 flex flex-col gap-2">
                <p className=" tracking-wide italic text-lg text-[#999]">
                    <span className="font-black text-2xl">&#34;</span>Behold, <span className="font-bold not-italic text-2xl">I </span>
                    will send <span className="font-bold not-italic text-2xl">
                You</span> Elijah the
                    <span className="font-bold text-2xl not-italic"> Prophet </span>
                    before the <br />coming of the great and
                    dreadful day of the LORD.<span className="font-black text-2xl">&#34;</span>
                </p>
                <h3 className="tracking-widest font-black text-[#777] text-sm italic">- Malachi 4</h3>
            </section>
            {/*<SermonCard id={} title={} preacher={} date={} youtubeId={} />*/}
        </main>
    )
}
