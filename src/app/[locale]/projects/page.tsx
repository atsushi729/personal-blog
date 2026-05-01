import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectsPage from "@/components/pages/ProjectsPage";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { projectsContent } from "@/i18n/pages";

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
  const content = projectsContent[locale];

  return {
    title: content.title,
    description: content.description,
    openGraph: {
      title: `${content.title} | Atsushi Hatakeyama`,
      description: content.description,
      url: `/${locale}/projects`,
    },
    alternates: {
      canonical: `/${locale}/projects`,
      languages: {
        en: "/en/projects",
        ja: "/ja/projects",
      },
    },
  };
}

export default async function Projects({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  return <ProjectsPage locale={localeParam} />;
}
