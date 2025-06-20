import SermonCard from "@/components/sub-components/sermon-card";

export function SermonsPreview() {
    return (
        <section className="flex gap-4 w-full">
            <SermonCard
                id="abc123"
                title="The Son of Man Ministry"
                preacher="Pst. Ronnie Monakali"
                date="11 May 2025"
                youtubeId="mXbfheVTy3w" // Replace with actual YouTube ID
                duration="32:50"
                series="The Son Operating In The Realms of God"
            />
            <SermonCard
                id="abc123"
                title="The Son of Man Ministry"
                preacher="Pst. Ronnie Monakali"
                date="11 May 2025"
                youtubeId="XBehXxwI1iA" // Replace with actual YouTube ID
                duration="32:50"
                series="The Son Operating In The Realms of God"
            />
            <SermonCard
                id="abc123"
                title="Youth Meeting"
                preacher="Pst. Ronnie Monakali"
                date="11 May 2025"
                youtubeId="mCfBxm2SDdY" // Replace with actual YouTube ID
                duration="32:50"
                series=""
            />
        </section>
    )
}
