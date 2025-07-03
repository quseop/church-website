import TestimonyBlog from "@/components/pages/resources/testimonies/blog/testimony-blog";

export default function TestimonyPage({ params }: { params: { slug: string } }) {
    return (
        <TestimonyBlog params={params} />
    )
}
