import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";

export function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="font-serif">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm font-sans text-neutral-500 hover:text-neutral-800 transition-colors mb-8"
      >
        &larr; Back to blog
      </Link>

      <header className="mb-8">
        <time className="text-sm font-sans text-neutral-500">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="text-3xl font-normal text-neutral-800 mt-2">
          {post.title}
        </h1>
      </header>

      <div className="prose prose-neutral max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
