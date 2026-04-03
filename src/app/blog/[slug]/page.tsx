import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt || `Read "${post.title}" by Atsushi Hatakeyama.`,
    openGraph: {
      title: post.title,
      description:
        post.excerpt || `Read "${post.title}" by Atsushi Hatakeyama.`,
      type: "article",
      url: `/blog/${slug}`,
      publishedTime: post.date,
      authors: ["Atsushi Hatakeyama"],
    },
    twitter: {
      card: "summary",
      title: post.title,
      description:
        post.excerpt || `Read "${post.title}" by Atsushi Hatakeyama.`,
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

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
        <h1 className="text-3xl font-normal text-neutral-800 mb-2">
          {post.title}
        </h1>
        <time className="text-sm font-sans text-neutral-500">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </header>

      <MarkdownContent content={post.content} />
    </article>
  );
}
