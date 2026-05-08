"use client";

import { useState } from "react";
import Link from "next/link";
import type { NoteCategory } from "@/lib/note";
import { formatMonthDay } from "@/lib/utils";

export interface WritingItem {
  kind: "article" | "note";
  title: string;
  date: string;
  href: string;
  categoryKey?: string;
}

interface Props {
  items: WritingItem[];
  categories: NoteCategory[];
  emptyLabel: string;
}

export default function WritingList({
  items,
  categories,
  emptyLabel,
}: Props) {
  const [filter, setFilter] = useState<string | null>(null);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  const filtered = filter
    ? items.filter(
        (item) => item.kind === "note" && item.categoryKey === filter
      )
    : items;

  let lastYear = "";
  const rows = filtered.map((item) => {
    const year = new Date(item.date).getFullYear().toString();
    const yearLabel = year !== lastYear ? year : "";
    lastYear = year;
    return { item, yearLabel };
  });

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2 font-sans">
        <FilterChip
          label="All"
          active={filter === null}
          onClick={() => setFilter(null)}
        />
        {categories.map((cat) => {
          const key = cat.segments.join("/");
          return (
            <FilterChip
              key={key}
              label={cat.title}
              active={filter === key}
              onClick={() => setFilter(key)}
            />
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-neutral-500">{emptyLabel}</p>
      ) : (
        <div className="writing-list">
          {rows.map(({ item, yearLabel }, index) => {
            const isDimmed = hoveredHref !== null && hoveredHref !== item.href;
            return (
              <div
                key={item.href}
                className="reveal-item"
                style={
                  { "--enter-delay": `${index * 40}ms` } as React.CSSProperties
                }
              >
                <Link
                  href={item.href}
                  className="writing-row"
                  style={{
                    opacity: isDimmed ? 0.35 : 1,
                    transition: "opacity 0.15s ease",
                  }}
                  onMouseEnter={() => setHoveredHref(item.href)}
                  onMouseLeave={() => setHoveredHref(null)}
                >
                  <span className="writing-year">{yearLabel}</span>
                  <span className="writing-title">{item.title}</span>
                  <span className="writing-date">
                    {formatMonthDay(new Date(item.date))}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded px-3 py-1 text-xs transition-colors ${
        active
          ? "bg-neutral-800 text-white"
          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-800"
      }`}
    >
      {label}
    </button>
  );
}
