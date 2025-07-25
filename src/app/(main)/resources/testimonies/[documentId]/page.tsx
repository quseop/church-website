import {TestimonyBlog} from "@/components/pages/resources/testimonies/blog/testimony-blog";

// import { type Metadata } from "next";

type Props = {
    params: Promise<{ slug: string }>
}

export default async function TestimonyPage({ params }: Props) {
    const { slug } = await params;
    return (
        <TestimonyBlog slug={slug} />
    )
}
