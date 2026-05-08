import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import { writingContent } from "@/i18n/pages";
import { getAllPosts } from "@/lib/blog";
import { getAllNotes, noteCategories } from "@/lib/note";
import WritingList, { type WritingItem } from "@/components/WritingList";

export default function WritingPage({ locale }: { locale: Locale }) {
  const content = writingContent[locale];
  const posts = getAllPosts(locale);
  const notes = getAllNotes(locale);

  const items: WritingItem[] = [
    ...posts.map((post) => ({
      kind: "article" as const,
      title: post.title,
      date: post.date,
      href: `/${locale}/writing/${post.slug}`,
    })),
    ...notes.map((note) => {
      const categoryPath = note.category.segments.join("/");
      return {
        kind: "note" as const,
        title: note.title,
        date: note.date,
        href: `/${locale}/writing/${categoryPath}/${note.slug}`,
        categoryKey: categoryPath,
      };
    }),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="reveal-sequence font-serif">
      <h1
        className="reveal-item mb-10 text-3xl font-normal text-neutral-800"
        style={{ "--enter-delay": "0ms" } as CSSProperties}
      >
        {content.title}
      </h1>

      <div
        className="reveal-item"
        style={{ "--enter-delay": "90ms" } as CSSProperties}
      >
        <WritingList
          items={items}
          categories={noteCategories}
          emptyLabel={content.empty}
        />
      </div>
    </div>
  );
}
