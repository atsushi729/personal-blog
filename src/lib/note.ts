import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

const noteDirectory = path.join(process.cwd(), "content/note");

export interface NoteCategory {
  title: string;
  segments: string[];
}

export interface Note {
  slug: string;
  locale: Locale;
  translationKey: string;
  title: string;
  date: string;
  excerpt?: string;
  content: string;
  category: NoteCategory;
}

export const noteCategories: NoteCategory[] = [
  {
    title: "Software",
    segments: ["software"],
  },
  {
    title: "Algorithm & Data Structure",
    segments: ["algorithm-data-structure"],
  },
  {
    title: "AI",
    segments: ["ai"],
  },
  {
    title: "Hardware",
    segments: ["hardware"],
  },
  {
    title: "Life",
    segments: ["life"],
  },
];

function sameSegments(a: string[], b: string[]) {
  return (
    a.length === b.length && a.every((segment, index) => segment === b[index])
  );
}

function getNoteDirectory(locale: Locale, segments: string[]): string {
  return path.join(noteDirectory, locale, ...segments);
}

function parseFile(
  locale: Locale,
  category: NoteCategory,
  fileName: string
): Note {
  const slug = fileName.replace(/\.mdx$/, "");
  const fullPath = path.join(
    getNoteDirectory(locale, category.segments),
    fileName
  );
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
    content,
    category,
  };
}

export function getNoteCategory(segments: string[]): NoteCategory | null {
  return (
    noteCategories.find((category) =>
      sameSegments(category.segments, segments)
    ) ?? null
  );
}

function notesByCategory(category: NoteCategory, locale: Locale): Note[] {
  let fileNames: string[];
  try {
    fileNames = fs
      .readdirSync(getNoteDirectory(locale, category.segments))
      .filter((fileName) => fileName.endsWith(".mdx"));
  } catch {
    return [];
  }

  return fileNames
    .map((fileName) => parseFile(locale, category, fileName))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getNotesByCategory(
  segments: string[],
  locale: Locale = defaultLocale
): Note[] {
  const category = getNoteCategory(segments);
  return category ? notesByCategory(category, locale) : [];
}

export function getAllNotes(locale: Locale = defaultLocale): Note[] {
  return noteCategories.flatMap((category) => notesByCategory(category, locale));
}

export function getNoteBySlug(
  segments: string[],
  slug: string,
  locale: Locale = defaultLocale
): Note | null {
  const category = getNoteCategory(segments);
  if (!category) {
    return null;
  }

  try {
    return parseFile(locale, category, `${slug}.mdx`);
  } catch {
    return null;
  }
}

export function getAllNotePaths(locale: Locale = defaultLocale): string[][] {
  const categoryPaths = noteCategories.map((category) => category.segments);
  const notePaths = noteCategories.flatMap((category) =>
    getNotesByCategory(category.segments, locale).map((note) => [
      ...category.segments,
      note.slug,
    ])
  );

  return [...categoryPaths, ...notePaths];
}

export function getNoteByTranslationKey(
  translationKey: string,
  locale: Locale
): Note | null {
  return (
    getAllNotes(locale).find(
      (note) => note.translationKey === translationKey
    ) ?? null
  );
}
