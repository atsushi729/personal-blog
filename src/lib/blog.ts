import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getNoteCategory, type NoteCategory } from "@/lib/note";

const blogDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  locale: Locale;
  translationKey: string;
  title: string;
  date: string;
  excerpt?: string;
  category?: NoteCategory;
  content: string;
}

function getBlogDirectory(locale: Locale): string {
  return path.join(blogDirectory, locale);
}

function parseFile(locale: Locale, fileName: string): BlogPost {
  const slug = fileName.replace(/\.mdx$/, "");
  const fullPath = path.join(getBlogDirectory(locale), fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const date =
    data.date instanceof Date
      ? data.date.toISOString().split("T")[0]
      : String(data.date || "");

  return {
    slug,
    locale: isLocale(String(data.locale || "")) ? data.locale : locale,
    translationKey: String(data.translationKey || slug),
    title: data.title || slug,
    date,
    excerpt: data.excerpt || "",
    category:
      getNoteCategory(String(data.category || "").split("/")) ?? undefined,
    content,
  };
}

export function getAllPosts(locale: Locale = defaultLocale): BlogPost[] {
  let fileNames: string[];
  try {
    fileNames = fs
      .readdirSync(getBlogDirectory(locale))
      .filter((f) => f.endsWith(".mdx"));
  } catch {
    return [];
  }

  const allPosts = fileNames.map((fileName) => parseFile(locale, fileName));
  return allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(
  slug: string,
  locale: Locale = defaultLocale
): BlogPost | null {
  try {
    return parseFile(locale, `${slug}.mdx`);
  } catch {
    return null;
  }
}

export function getPostsByCategory(
  segments: string[],
  locale: Locale = defaultLocale
): BlogPost[] {
  const categoryPath = segments.join("/");
  return getAllPosts(locale).filter(
    (post) => post.category?.segments.join("/") === categoryPath
  );
}

export function getAllSlugs(locale: Locale = defaultLocale): string[] {
  try {
    return fs
      .readdirSync(getBlogDirectory(locale))
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

export function getPostByTranslationKey(
  translationKey: string,
  locale: Locale
): BlogPost | null {
  return (
    getAllPosts(locale).find(
      (post) => post.translationKey === translationKey
    ) ?? null
  );
}
