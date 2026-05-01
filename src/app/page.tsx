import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import AboutPage from "@/components/pages/AboutPage";
import { defaultLocale } from "@/i18n/config";
import { aboutContent } from "@/i18n/pages";

const content = aboutContent[defaultLocale];

export const metadata: Metadata = {
  title: "About",
  description: content.description,
  openGraph: {
    title: "About | Atsushi Hatakeyama",
    description: content.description,
    url: "/en",
  },
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      ja: "/ja",
    },
  },
};

export default function Home() {
  return (
    <>
      <Navigation locale={defaultLocale} />
      <AboutPage locale={defaultLocale} />
    </>
  );
}
