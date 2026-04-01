"use client";

import Link from "next/link";
import { useState } from "react";
import type { BlogPost } from "@/lib/blog";

interface Props {
  posts: BlogPost[];
}

export default function BlogList({ posts }: Props) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  // Group by year, keeping order
  const postsByYear = posts.reduce<Record<string, BlogPost[]>>((acc, post) => {
    const year = new Date(post.date).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {});

  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  // Flat list of rows: { post, year (only on first of year) }
  const rows: { post: BlogPost; year: string | null; itemIndex: number }[] = [];
  let idx = 0;
  for (const year of years) {
    postsByYear[year].forEach((post, i) => {
      rows.push({ post, year: i === 0 ? year : null, itemIndex: idx++ });
    });
  }

  const isAnyHovered = hoveredSlug !== null;

  return (
    <div className="writing-list reveal-sequence">
      {rows.map(({ post, year, itemIndex }) => {
        const date = new Date(post.date);
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        const formattedDate = `${mm}/${dd}`;
        const isDimmed = isAnyHovered && hoveredSlug !== post.slug;

        return (
          // reveal-item handles entrance animation (opacity 0→1 via forwards fill)
          // writing-row handles hover dimming separately — no conflict
          <div
            key={post.slug}
            className="reveal-item"
            style={
              { "--enter-delay": `${itemIndex * 40}ms` } as React.CSSProperties
            }
          >
            <Link
              href={`/blog/${post.slug}`}
              className="writing-row"
              style={{
                opacity: isDimmed ? 0.35 : 1,
                transition: "opacity 0.15s ease",
              }}
              onMouseEnter={() => setHoveredSlug(post.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
            >
              <span className="writing-year">{year ?? ""}</span>
              <span className="writing-title">{post.title}</span>
              <span className="writing-date">{formattedDate}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
