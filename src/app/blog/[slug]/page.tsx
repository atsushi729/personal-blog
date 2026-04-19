import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { TreeTraversalDemo } from "@/components/blog/TreeTraversalDemo";
import { TreeTraversalDiagram } from "@/components/blog/TreeTraversalDiagram";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";

const mdxComponents = {
  TreeTraversalDemo,
  TreeTraversalDiagram,
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="border-b border-neutral-300" {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-2 text-left font-semibold text-neutral-700 border-b border-neutral-300" {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-2 border-b border-neutral-200 text-neutral-700" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="hover:bg-neutral-50 transition-colors" {...props} />
  ),
};

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

      <div className="prose prose-neutral max-w-none">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </article>
  );
}
