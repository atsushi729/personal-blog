import type { Locale } from "./config";

export const dictionaries = {
  en: {
    blog: {
      title: "Blog",
      description:
        "Thoughts on software, technology, and building things by Atsushi Hatakeyama.",
      empty: "No posts yet.",
      back: "Back to blog",
      readPost: (title: string) => `Read "${title}" by Atsushi Hatakeyama.`,
    },
  },
  ja: {
    blog: {
      title: "ブログ",
      description:
        "ソフトウェア、技術、ものづくりについての Atsushi Hatakeyama のブログです。",
      empty: "まだ投稿がありません。",
      back: "ブログへ戻る",
      readPost: (title: string) => `Atsushi Hatakeyama による「${title}」を読む。`,
    },
  },
} satisfies Record<Locale, unknown>;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
