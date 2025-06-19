// components/sermon/SermonCard.tsx
import Image from "next/image";
import Link from "next/link";

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
                                       id,
                                       title,
                                       preacher,
                                       date,
                                       youtubeId,
                                       duration,
                                       series,
                                   }: SermonCardProps) {
    const youtubeThumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

    return (
        <div className="bg-parchment rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-maroon">
            {/* YouTube Thumbnail with Play Button */}
            <div className="relative aspect-video">
                <Image
                    src={youtubeThumbnail}
                    alt={title}
                    fill
                    className="object-cover"
                    priority={false}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Link
                        href={`/sermons/${id}`}
                        className="bg-gold/90 hover:bg-gold text-maroon rounded-full p-4 transition-all"
                        aria-label="Watch sermon"
                    >
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
                    </Link>
                </div>
            </div>

            {/* Sermon Details */}
            <div className="p-4">
                {series && (
                    <span className="inline-block px-2 py-1 mb-2 text-xs font-semibold rounded bg-olive/20 text-olive">
            {series}
          </span>
                )}
                <h3 className="text-charcoal text-xl font-bold mb-2 line-clamp-2">
                    {title}
                </h3>

                <div className="flex items-center text-sm text-gray-600 mb-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4 mr-1 text-gold"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
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
                        <span className="bg-maroon/10 text-maroon px-2 py-1 rounded">
              {duration}
            </span>
                    )}
                </div>
            </div>
        </div>
    );
}
