export default function Live() {
    const isLive = false; // 🔁 You can later fetch live status from YouTube API

    return (
        <main className="h-screen w-full px-[15%] max-sm:px-[5%] py-20 text-[#ddd]">
            <h1 className="text-3xl font-light tracking-widest mb-6">Live Service</h1>
            <p className="text-sm text-gray-400 mb-8 w-[60%] max-sm:w-[90%]">
                Join us for our live broadcasts — Sundays at 10 AM and Wednesdays at 7 PM. Stay tuned for when the Word goes forth.
            </p>

            {isLive ? (
                <div className="aspect-video w-full max-w-4xl">
                    <iframe
                        className="w-full h-full rounded shadow-lg"
                        src="https://www.youtube.com/embed/live_stream?channel=UCWgNafvsdvMEdG-KHb3lzUQ"
                        title="Live Service"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            ) : (
                <div className="border border-white/10 rounded p-8 max-w-2xl">
                    <p className="text-lg font-light mb-2">No live service at the moment.</p>
                    <p className="text-sm text-gray-400">Tune in during our usual service times:</p>
                    <ul className="list-disc list-inside mt-2 text-sm text-gray-400">
                        <li>Sundays at 10:00 AM</li>
                        <li>Wednesdays at 7:00 PM</li>
                    </ul>
                </div>
            )}

            <div className="pt-12">
                <a
                    href="https://www.youtube.com/@originalseedministries8906"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border hover:bg-[#6D2E47] hover:border-[#6D2E47] py-3 px-6 font-light tracking-widest rounded hover:rounded-3xl transition-all duration-500 text-[#ddd]"
                >
                    Visit YouTube Channel
                </a>
            </div>
        </main>
    );
}
