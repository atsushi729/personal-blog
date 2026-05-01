export const locales = ["en", "ja"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const localeToOgLocale: Record<Locale, string> = {
  en: "en_US",
  ja: "ja_JP",
};
export const localeToBcp47: Record<Locale, string> = {
  en: "en-US",
  ja: "ja-JP",
};
