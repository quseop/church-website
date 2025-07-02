'use client'
import Image from "next/image";

interface SermonCardProps {
    id: string;
    title: string;
    preacher: string;
    date: string;
    youtubeId: string;
    duration?: string;
    series?: string;
}

export default function SermonCard({
                                       title,
                                       youtubeId,
                                   }: SermonCardProps) {
    const youtubeThumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

    return (
        <div className="bg-[#111111] lg:h-60 lg:w-105 border-none rounded-4xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-[#333333] group">
            {/* Thumbnail with Black Overlay */}
            <div className="relative h-full aspect-video bg-black">
                {/* Image with Overlay */}
                <div className="absolute h-full inset-0 bg-black">
                    <Image
                        src={youtubeThumbnail}
                        alt={title}
                        fill
                        className="object-cover bg-black"
                    />
                    {/* Black Overlay (50% opacity) */}
                    <div className="absolute inset-0 rounded-3xl bg-black/50 group-hover:bg-black/40 transition-all" />
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-[black]/80 to-transparent group-hover:from-black/70 transition-all">
                    </div>
                </div>

                {/* Play Button (Always Visible) */}
                <button
                    className="absolute inset-0 bg-transparent flex items-center justify-center"
                    onClick={() => window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank')}
                    aria-label={`Play ${title}`}
                >
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 opacity-100 group-hover:scale-110 transition-transform">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="w-8 h-8"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </button>
            </div>


            {/* Sermon Details (Unchanged) */}
          {/*  <div className="p-4">*/}
          {/*      {series && (*/}
          {/*          <span className="inline-block px-2 py-1 mb-2 text-xs font-medium rounded-full bg-[#222222] text-gray-400">*/}
          {/*  {series}*/}
          {/*</span>*/}
          {/*      )}*/}
          {/*      <h3 className="text-white text-lg font-medium mb-1 line-clamp-2">{title}</h3>*/}
          {/*      <div className="flex items-center text-sm text-gray-400 mb-2">*/}
          {/*          /!* Preacher icon/name *!/*/}
          {/*      </div>*/}
          {/*      <div className="flex justify-between items-center text-xs text-gray-500">*/}
          {/*          <span>{date}</span>*/}
          {/*          {duration && <span>{duration}</span>}*/}
          {/*      </div>*/}
          {/*  </div>*/}
        </div>
    );
}
