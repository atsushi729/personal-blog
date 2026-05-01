import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import { contactContent } from "@/i18n/pages";

export default function ContactPage({ locale }: { locale: Locale }) {
  const content = contactContent[locale];

  return (
    <article className="prose reveal-sequence font-serif">
      <h1 className="reveal-item" style={{ "--enter-delay": "0ms" } as CSSProperties}>{content.title}</h1>

      <p className="reveal-item" style={{ "--enter-delay": "90ms" } as CSSProperties}>
        {content.intro}
      </p>

      <h2 className="reveal-item" style={{ "--enter-delay": "180ms" } as CSSProperties}>{content.getInTouch}</h2>

      <p className="reveal-item" style={{ "--enter-delay": "270ms" } as CSSProperties}>{content.bestWays}</p>

      <ul className="reveal-item space-y-3 list-none pl-0" style={{ "--enter-delay": "360ms" } as CSSProperties}>
        <li>
          <a href="mailto:dtianshan7@gmail.com">dtianshan7@gmail.com</a>
          <span className="text-neutral-500 ml-2">— {content.general}</span>
        </li>
        <li>
          <a
            href="https://x.com/Hatakey2Atsushi"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter / X
          </a>
          <span className="text-neutral-500 ml-2">
            — {content.quick}
          </span>
        </li>
        <li>
          <a
            href="https://github.com/atsushi729"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <span className="text-neutral-500 ml-2">— {content.code}</span>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/atsushi-hatakeyama/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <span className="text-neutral-500 ml-2">
            — {content.professional}
          </span>
        </li>
      </ul>

      <h2 className="reveal-item" style={{ "--enter-delay": "450ms" } as CSSProperties}>{content.responseTime}</h2>

      <p className="reveal-item" style={{ "--enter-delay": "540ms" } as CSSProperties}>
        {content.response}
      </p>
    </article>
  );
}
