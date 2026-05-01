"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

interface NavigationProps {
  locale: Locale;
}

function getLanguageHref(
  pathname: string,
  currentLocale: Locale,
  targetLocale: Locale
) {
  if (pathname === "/" || pathname === `/${currentLocale}`) {
    return `/${targetLocale}`;
  }

  if (pathname.startsWith(`/${currentLocale}/`)) {
    return `/${targetLocale}${pathname.slice(`/${currentLocale}`.length)}`;
  }

  return `/${targetLocale}`;
}

export default function Navigation({ locale }: NavigationProps) {
  const pathname = usePathname();

  const links = [
    { href: `/${locale}`, label: "About" },
    { href: `/${locale}/blog`, label: "Blog" },
    { href: `/${locale}/projects`, label: "Projects" },
    { href: `/${locale}/contact`, label: "Contact" },
  ];

  return (
    <nav className="mb-12">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`link-underline text-sm font-sans tracking-wide transition-colors ${
                pathname === link.href
                  ? "text-neutral-800"
                  : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div
          className="flex items-center rounded-full border border-neutral-200 bg-neutral-50 p-0.5"
          aria-label="Language"
        >
          {locales.map((targetLocale) => (
            <Link
              key={targetLocale}
              href={getLanguageHref(pathname, locale, targetLocale)}
              hrefLang={targetLocale}
              aria-current={targetLocale === locale ? "true" : undefined}
              className={`rounded-full px-2.5 py-1 text-xs font-sans uppercase transition-colors ${
                targetLocale === locale
                  ? "bg-white text-neutral-800 shadow-sm"
                  : "text-neutral-400 hover:text-neutral-700"
              }`}
            >
              {targetLocale}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
