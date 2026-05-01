import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactPage from "@/components/pages/ContactPage";
import { contactContent } from "@/i18n/pages";
import { isLocale, locales, type Locale } from "@/i18n/config";

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
  const content = contactContent[locale];

  return {
    title: content.title,
    description: content.description,
    openGraph: {
      title: `${content.title} | Atsushi Hatakeyama`,
      description: content.description,
      url: `/${locale}/contact`,
    },
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        en: "/en/contact",
        ja: "/ja/contact",
      },
    },
  };
}

export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  return <ContactPage locale={localeParam} />;
}
