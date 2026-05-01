import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutPage from "@/components/pages/AboutPage";
import { isLocale, locales, localeToOgLocale, type Locale } from "@/i18n/config";
import { aboutContent } from "@/i18n/pages";

const siteName = "Atsushi Hatakeyama";

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
  const content = aboutContent[locale];

  return {
    title: content.pageTitle,
    description: content.description,
    openGraph: {
      title: `${content.pageTitle} | ${siteName}`,
      description: content.description,
      url: `/${locale}`,
      locale: localeToOgLocale[locale],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ja: "/ja",
      },
    },
  };
}

export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  return <AboutPage locale={localeParam} />;
}
