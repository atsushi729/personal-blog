import type { Metadata } from "next";
import type { CSSProperties } from "react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Atsushi Hatakeyama via email, Twitter/X, GitHub, or LinkedIn.",
  openGraph: {
    title: "Contact | Atsushi Hatakeyama",
    description: "Get in touch with Atsushi Hatakeyama via email, Twitter/X, GitHub, or LinkedIn.",
    url: "/contact",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function Contact() {
  return (
    <article className="prose reveal-sequence font-serif">
      <h1 className="reveal-item" style={{ "--enter-delay": "0ms" } as CSSProperties}>Contact</h1>

      <p className="reveal-item" style={{ "--enter-delay": "90ms" } as CSSProperties}>
        I&apos;m always happy to connect with fellow developers, discuss ideas,
        or explore collaboration opportunities.
      </p>

      <h2 className="reveal-item" style={{ "--enter-delay": "180ms" } as CSSProperties}>Get in touch</h2>

      <p className="reveal-item" style={{ "--enter-delay": "270ms" } as CSSProperties}>The best ways to reach me:</p>

      <ul className="reveal-item space-y-3 list-none pl-0" style={{ "--enter-delay": "360ms" } as CSSProperties}>
        <li>
          <a href="mailto:dtianshan7@gmail.com">dtianshan7@gmail.com</a>
          <span className="text-neutral-500 ml-2">— For general</span>
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
            — For quick conversations
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
          <span className="text-neutral-500 ml-2">— For code and projects</span>
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
            — For professional connections
          </span>
        </li>
      </ul>

      <h2 className="reveal-item" style={{ "--enter-delay": "450ms" } as CSSProperties}>Response time</h2>

      <p className="reveal-item" style={{ "--enter-delay": "540ms" } as CSSProperties}>
        I try to respond to all messages within a few days. If it&apos;s urgent,
        please mention that in your message.
      </p>
    </article>
  );
}
