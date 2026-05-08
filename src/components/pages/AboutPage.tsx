import type { CSSProperties } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { aboutContent } from "@/i18n/pages";

export default function AboutPage({ locale }: { locale: Locale }) {
  const content = aboutContent[locale];

  return (
    <article className="prose reveal-sequence font-serif">
      <h1
        className="reveal-item"
        style={{ "--enter-delay": "0ms" } as CSSProperties}
      >
        {content.title}
      </h1>

      <p
        className="reveal-item"
        style={{ "--enter-delay": "90ms" } as CSSProperties}
      >
        {content.intro}
      </p>

      {content.sections.map((section, index) => (
        <section key={section.title}>
          <h2
            className="reveal-item"
            style={
              { "--enter-delay": `${180 + index * 180}ms` } as CSSProperties
            }
          >
            <span className="handwritten-underline">{section.title}</span>
          </h2>
          <p
            className="reveal-item"
            style={
              { "--enter-delay": `${270 + index * 180}ms` } as CSSProperties
            }
          >
            {section.body}
          </p>
        </section>
      ))}

      <p
        className="reveal-item"
        style={{ "--enter-delay": "720ms" } as CSSProperties}
      >
        {content.closingPrefix}{" "}
        <Link href={`/${locale}/writing`}>{content.writingLink}</Link>{" "}
        {content.closingMiddle}{" "}
        <Link href={`/${locale}/projects`}>{content.projectsLink}</Link>{" "}
        {content.closingSuffix}
      </p>
    </article>
  );
}
