import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/blog";
import BlogList from "@/components/BlogList";
import { getDictionary } from "@/i18n/dictionaries";
import {
  isLocale,
  locales,
  localeToOgLocale,
  type Locale,
} from "@/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    return { title: "Not Found" };
  }

  const locale: Locale = localeParam;
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.blog.title,
    description: dictionary.blog.description,
    openGraph: {
      title: `${dictionary.blog.title} | Atsushi Hatakeyama`,
      description: dictionary.blog.description,
      url: `/${locale}/blog`,
      locale: localeToOgLocale[locale],
    },
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        en: "/en/blog",
        ja: "/ja/blog",
      },
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const dictionary = getDictionary(locale);
  const posts = getAllPosts(locale);

  return (
    <div className="font-sans">
      {posts.length === 0 ? (
        <p className="text-neutral-500 text-sm">{dictionary.blog.empty}</p>
      ) : (
        <BlogList posts={posts} locale={locale} />
      )}
    </div>
  );
}
