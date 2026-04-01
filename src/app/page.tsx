import type { Metadata } from "next";
import type { CSSProperties } from "react";

export const metadata: Metadata = {
  title: "About",
  description: "Hi, I'm Atsushi Hatakeyama — a software engineer passionate about building functional and elegant software.",
  openGraph: {
    title: "About | Atsushi Hatakeyama",
    description: "Hi, I'm Atsushi Hatakeyama — a software engineer passionate about building functional and elegant software.",
    url: "/",
  },
  alternates: {
    canonical: "/",
  },
};

export default function About() {
  return (
    <article className="prose reveal-sequence font-serif">
      <h1 className="reveal-item" style={{ "--enter-delay": "0ms" } as CSSProperties}>
        Hi, I&apos;m Atsushi Hatakeyama
      </h1>

      <p className="reveal-item" style={{ "--enter-delay": "90ms" } as CSSProperties}>
        Welcome to my personal corner of the internet. I&apos;m a software engineer
        passionate about building things that make a difference.
      </p>

      <h2 className="reveal-item" style={{ "--enter-delay": "180ms" } as CSSProperties}>
        <span className="handwritten-underline">What I do</span>
      </h2>

      <p className="reveal-item" style={{ "--enter-delay": "270ms" } as CSSProperties}>
        I spend my time writing code, exploring new technologies, and working on
        projects that interest me. I believe in building software that is both
        functional and elegant.
      </p>

      <h2 className="reveal-item" style={{ "--enter-delay": "360ms" } as CSSProperties}>
        <span className="handwritten-underline">My approach</span>
      </h2>

      <p className="reveal-item" style={{ "--enter-delay": "450ms" } as CSSProperties}>
        I value simplicity and clarity in everything I create. Good software
        should be easy to understand, maintain, and extend. I strive to write
        code that future developers (including future me) will appreciate.
      </p>

      <h2 className="reveal-item" style={{ "--enter-delay": "540ms" } as CSSProperties}>
        <span className="handwritten-underline">Beyond code</span>
      </h2>

      <p className="reveal-item" style={{ "--enter-delay": "630ms" } as CSSProperties}>
        When I&apos;m not coding, you can find me exploring new ideas, reading, or
        working on side projects. I believe in continuous learning and pushing
        the boundaries of what&apos;s possible.
      </p>

      <p className="reveal-item" style={{ "--enter-delay": "720ms" } as CSSProperties}>
        Feel free to explore my{" "}
        <a href="/blog">blog</a> where I share my thoughts, or check out my{" "}
        <a href="/projects">projects</a> to see what I&apos;ve been building.
      </p>
    </article>
  );
}
