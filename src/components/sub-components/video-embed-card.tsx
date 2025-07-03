'use client'
import { useState } from 'react';
import Image from "next/image";

interface VideoEmbedCardProps {
    youtubeId: string;
    title: string;
    preacher: string;
    date: string;
    duration?: string;
    series?: string;
}

export default function VideoEmbedCard({
                                           youtubeId,
                                           title,
                                           preacher,
                                           date,
                                           duration,
                                           series,
                                       }: VideoEmbedCardProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="bg-parchment rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-maroon">
            {/* YouTube Embed Container */}
            <div className="relative aspect-video bg-charcoal">
                {!isPlaying ? (
                    <>
                        {/* Thumbnail with Play Button */}
                        <Image
                            src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                            alt={title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
                            }}
                        />
                        <button
                            onClick={() => setIsPlaying(true)}
                            className="absolute inset-0 flex items-center justify-center w-full h-full group"
                            aria-label="Play video"
                        >
                            <div className="bg-gold/90 hover:bg-gold text-maroon rounded-full p-4 transition-all group-hover:scale-110">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
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
                    </>
                ) : (
                    /* Embedded YouTube Player */
                    <iframe
                        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                )}
            </div>

            {/* Sermon Details */}
            <div className="p-4">
                {series && (
                    <span className="inline-block px-2 py-1 mb-2 text-xs font-semibold rounded bg-olive/20 text-olive">
            {series}
          </span>
                )}
                <h3 className="text-charcoal text-xl font-bold mb-2">{title}</h3>

                <div className="flex items-center text-sm text-gray-600 mb-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4 mr-1 text-gold"
                    >
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0z" />
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span>{preacher}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center text-gray-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4 mr-1 text-gold"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span>{date}</span>
                    </div>
                    {duration && (
                        <span className="bg-maroon/10 text-maroon px-2 py-1 rounded text-xs">
              {duration}
            </span>
                    )}
                </div>
            </div>
        </div>
    );
}
