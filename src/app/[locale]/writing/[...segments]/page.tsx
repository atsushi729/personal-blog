import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import WritingList, { type WritingItem } from "@/components/WritingList";
import { blogComponentRegistry } from "@/components/blog/registry";
import { baseMdxComponents } from "@/components/mdx/BaseMdxComponents";
import {
  isLocale,
  locales,
  localeToBcp47,
  localeToOgLocale,
  type Locale,
} from "@/i18n/config";
import { writingContent } from "@/i18n/pages";
import {
  getAllSlugs,
  getPostBySlug,
  getPostByTranslationKey,
  getPostsByCategory,
} from "@/lib/blog";
import {
  getAllNotePaths,
  getNoteBySlug,
  getNoteByTranslationKey,
  getNoteCategory,
  getNotesByCategory,
} from "@/lib/note";

function getPostAlternates(post: { slug: string; translationKey: string }) {
  return Object.fromEntries(
    locales.map((locale) => {
      const translated = getPostByTranslationKey(post.translationKey, locale);
      return [
        locale,
        translated
          ? `/${locale}/writing/${translated.slug}`
          : `/${locale}/writing`,
      ];
    })
  ) as Record<Locale, string>;
}

function getNoteAlternates(note: { translationKey: string }) {
  return Object.fromEntries(
    locales.map((locale) => {
      const translated = getNoteByTranslationKey(note.translationKey, locale);
      return [
        locale,
        translated
          ? `/${locale}/writing/${translated.category.segments.join("/")}/${translated.slug}`
          : `/${locale}/writing`,
      ];
    })
  ) as Record<Locale, string>;
}

export function generateStaticParams() {
  return locales.flatMap((locale) => [
    ...getAllSlugs(locale).map((slug) => ({ locale, segments: [slug] })),
    ...getAllNotePaths(locale).map((segments) => ({ locale, segments })),
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; segments: string[] }>;
}): Promise<Metadata> {
  const { locale: localeParam, segments } = await params;

  if (!isLocale(localeParam)) {
    return { title: "Not Found" };
  }

  const locale: Locale = localeParam;
  const content = writingContent[locale];

  if (segments.length === 1) {
    const post = getPostBySlug(segments[0], locale);
    if (post) {
      const alternates = getPostAlternates(post);
      return {
        title: post.title,
        description: post.excerpt || content.readPost(post.title),
        openGraph: {
          title: post.title,
          description: post.excerpt || content.readPost(post.title),
          type: "article",
          url: `/${locale}/writing/${segments[0]}`,
          publishedTime: post.date,
          authors: ["Atsushi Hatakeyama"],
          locale: localeToOgLocale[locale],
        },
        twitter: {
          card: "summary",
          title: post.title,
          description: post.excerpt || content.readPost(post.title),
        },
        alternates: {
          canonical: `/${locale}/writing/${segments[0]}`,
          languages: alternates,
        },
      };
    }
  }

  const category = getNoteCategory(segments);
  if (category) {
    return {
      title: `${category.title} | Writing`,
      description: `${category.title} writing by Atsushi Hatakeyama.`,
      openGraph: {
        title: `${category.title} | Writing | Atsushi Hatakeyama`,
        description: `${category.title} writing by Atsushi Hatakeyama.`,
        url: `/${locale}/writing/${segments.join("/")}`,
        locale: localeToOgLocale[locale],
      },
      alternates: {
        canonical: `/${locale}/writing/${segments.join("/")}`,
        languages: {
          en: `/en/writing/${segments.join("/")}`,
          ja: `/ja/writing/${segments.join("/")}`,
        },
      },
    };
  }

  const noteSegments = segments.slice(0, -1);
  const slug = segments.at(-1);
  const note = slug ? getNoteBySlug(noteSegments, slug, locale) : null;
  if (!note) return { title: "Not Found" };

  const alternates = getNoteAlternates(note);
  return {
    title: note.title,
    description: note.excerpt || content.readPost(note.title),
    openGraph: {
      title: note.title,
      description: note.excerpt || content.readPost(note.title),
      type: "article",
      url: `/${locale}/writing/${segments.join("/")}`,
      publishedTime: note.date,
      authors: ["Atsushi Hatakeyama"],
      locale: localeToOgLocale[locale],
    },
    twitter: {
      card: "summary",
      title: note.title,
      description: note.excerpt || content.readPost(note.title),
    },
    alternates: {
      canonical: `/${locale}/writing/${segments.join("/")}`,
      languages: alternates,
    },
  };
}

export default async function WritingRoute({
  params,
}: {
  params: Promise<{ locale: string; segments: string[] }>;
}) {
  const { locale: localeParam, segments } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const content = writingContent[locale];

  if (segments.length === 1) {
    const post = getPostBySlug(segments[0], locale);
    if (post) {
      const slugComponents = blogComponentRegistry[segments[0]];
      const mdxComponents = slugComponents
        ? { ...baseMdxComponents, ...slugComponents }
        : baseMdxComponents;

      return (
        <article className="font-serif">
          <Link
            href={`/${locale}/writing`}
            className="mb-8 inline-flex items-center gap-1 font-sans text-sm text-neutral-500 transition-colors hover:text-neutral-800"
          >
            &larr; {content.back}
          </Link>

          <header className="mb-8">
            {post.category ? (
              <Link
                href={`/${locale}/writing/${post.category.segments.join("/")}`}
                className="mb-2 inline-block font-sans text-sm text-neutral-500 transition-colors hover:text-neutral-800"
              >
                {post.category.title}
              </Link>
            ) : null}
            <h1 className="mb-2 text-3xl font-normal text-neutral-800">
              {post.title}
            </h1>
            <time className="font-sans text-sm text-neutral-500">
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
  }

  const category = getNoteCategory(segments);
  if (category) {
    const posts = getPostsByCategory(category.segments, locale);
    const notes = getNotesByCategory(category.segments, locale);
    const items: WritingItem[] = [
      ...posts.map((post) => ({
        title: post.title,
        date: post.date,
        href: `/${locale}/writing/${post.slug}`,
      })),
      ...notes.map((note) => ({
        title: note.title,
        date: note.date,
        href: `/${locale}/writing/${note.category.segments.join("/")}/${note.slug}`,
      })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
      <article className="font-serif">
        <Link
          href={`/${locale}/writing`}
          className="mb-8 inline-flex items-center gap-1 font-sans text-sm text-neutral-500 transition-colors hover:text-neutral-800"
        >
          &larr; {content.back}
        </Link>

        <header className="mb-8">
          <h1 className="mb-2 text-3xl font-normal text-neutral-800">
            {category.title}
          </h1>
        </header>

        {items.length === 0 ? (
          <p className="font-sans text-sm text-neutral-500">
            {content.emptyNote}
          </p>
        ) : (
          <WritingList
            items={items}
            categories={[]}
            emptyLabel={content.emptyNote}
          />
        )}
      </article>
    );
  }

  const noteSegments = segments.slice(0, -1);
  const slug = segments.at(-1);
  const note = slug ? getNoteBySlug(noteSegments, slug, locale) : null;

  if (!note) {
    notFound();
  }

  return (
    <article className="font-serif">
      <Link
        href={`/${locale}/writing/${note.category.segments.join("/")}`}
        className="mb-8 inline-flex items-center gap-1 font-sans text-sm text-neutral-500 transition-colors hover:text-neutral-800"
      >
        &larr; {note.category.title}
      </Link>

      <header className="mb-8">
        <p className="mb-2 font-sans text-sm text-neutral-500">
          {note.category.title}
        </p>
        <h1 className="mb-2 text-3xl font-normal text-neutral-800">
          {note.title}
        </h1>
        <time className="font-sans text-sm text-neutral-500">
          {new Date(note.date).toLocaleDateString(localeToBcp47[locale], {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </header>

      <div className="prose prose-neutral max-w-none">
        <MDXRemote
          source={note.content}
          components={baseMdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </article>
  );
}
