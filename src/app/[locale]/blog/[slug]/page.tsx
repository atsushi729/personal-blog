import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { blogComponentRegistry } from "@/components/blog/registry";
import {
  getAllSlugs,
  getPostBySlug,
  getPostByTranslationKey,
} from "@/lib/blog";
import { getDictionary } from "@/i18n/dictionaries";
import {
  isLocale,
  locales,
  localeToBcp47,
  localeToOgLocale,
  type Locale,
} from "@/i18n/config";

const baseMdxComponents = {
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt ?? ""} className="w-full my-6" {...props} />
  ),
  code({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
    const language = (className ?? "").match(/language-([\w-]+)/)?.[1];
    if (!language) {
      return (
        <code
          className="bg-neutral-100 text-neutral-800 rounded px-1 py-0.5 text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <SyntaxHighlighter
        style={oneLight}
        language={language}
        PreTag="div"
        customStyle={{
          borderRadius: "6px",
          fontSize: "0.875rem",
          marginBottom: "1.25rem",
        }}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  },
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="border-b border-neutral-300" {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="px-4 py-2 text-left font-semibold text-neutral-700 border-b border-neutral-300"
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="px-4 py-2 border-b border-neutral-200 text-neutral-700"
      {...props}
    />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="hover:bg-neutral-50 transition-colors" {...props} />
  ),
};

function getPostAlternates(post: { slug: string; translationKey: string }) {
  return Object.fromEntries(
    locales.map((locale) => {
      const translatedPost = getPostByTranslationKey(
        post.translationKey,
        locale
      );
      return [
        locale,
        translatedPost
          ? `/${locale}/blog/${translatedPost.slug}`
          : `/${locale}/blog`,
      ];
    })
  ) as Record<Locale, string>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;

  if (!isLocale(localeParam)) {
    return { title: "Post Not Found" };
  }

  const locale: Locale = localeParam;
  const dictionary = getDictionary(locale);
  const post = getPostBySlug(slug, locale);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const alternates = getPostAlternates(post);

  return {
    title: post.title,
    description: post.excerpt || dictionary.blog.readPost(post.title),
    openGraph: {
      title: post.title,
      description: post.excerpt || dictionary.blog.readPost(post.title),
      type: "article",
      url: `/${locale}/blog/${slug}`,
      publishedTime: post.date,
      authors: ["Atsushi Hatakeyama"],
      locale: localeToOgLocale[locale],
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.excerpt || dictionary.blog.readPost(post.title),
    },
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: alternates,
    },
  };
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllSlugs(locale).map((slug) => ({ locale, slug }))
  );
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const dictionary = getDictionary(locale);
  const post = getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const slugComponents = blogComponentRegistry[slug];
  const mdxComponents = slugComponents
    ? { ...baseMdxComponents, ...slugComponents }
    : baseMdxComponents;

  return (
    <article className="font-serif">
      <Link
        href={`/${locale}/blog`}
        className="inline-flex items-center gap-1 text-sm font-sans text-neutral-500 hover:text-neutral-800 transition-colors mb-8"
      >
        &larr; {dictionary.blog.back}
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-normal text-neutral-800 mb-2">
          {post.title}
        </h1>
        <time className="text-sm font-sans text-neutral-500">
          {new Date(post.date).toLocaleDateString(localeToBcp47[locale], {
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
