import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllNotes, noteCategories } from "@/lib/note";
import { locales } from "@/i18n/config";

export const dynamic = "force-static";

const siteUrl = "https://atsushi-blog.pages.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const localizedStaticEntries: MetadataRoute.Sitemap = locales.flatMap(
    (locale) => [
      {
        url: `${siteUrl}/${locale}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 1,
      },
      {
        url: `${siteUrl}/${locale}/writing`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
      {
        url: `${siteUrl}/${locale}/projects`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      },
      {
        url: `${siteUrl}/${locale}/contact`,
        lastModified: now,
        changeFrequency: "yearly" as const,
        priority: 0.5,
      },
    ]
  );

  const articleEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({
      url: `${siteUrl}/${locale}/writing/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const noteEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getAllNotes(locale).map((note) => ({
      url: `${siteUrl}/${locale}/writing/${note.category.segments.join("/")}/${note.slug}`,
      lastModified: new Date(note.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  const noteCategoryEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    noteCategories.map((category) => ({
      url: `${siteUrl}/${locale}/writing/${category.segments.join("/")}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))
  );

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...localizedStaticEntries,
    ...articleEntries,
    ...noteCategoryEntries,
    ...noteEntries,
  ];
}
