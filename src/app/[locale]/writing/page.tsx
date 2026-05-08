import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WritingPage from "@/components/pages/WritingPage";
import { isLocale, locales, localeToOgLocale, type Locale } from "@/i18n/config";
import { writingContent } from "@/i18n/pages";

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
  const content = writingContent[locale];

  return {
    title: content.title,
    description: content.description,
    openGraph: {
      title: `${content.title} | Atsushi Hatakeyama`,
      description: content.description,
      url: `/${locale}/writing`,
      locale: localeToOgLocale[locale],
    },
    alternates: {
      canonical: `/${locale}/writing`,
      languages: {
        en: "/en/writing",
        ja: "/ja/writing",
      },
    },
  };
}

export default async function Writing({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  return <WritingPage locale={localeParam} />;
}
