import type { Locale } from "./config";

export const aboutContent = {
  en: {
    pageTitle: "About",
    title: "Hi, I'm Atsushi Hatakeyama",
    description:
      "Hi, I'm Atsushi Hatakeyama — a software engineer passionate about building functional and elegant software.",
    intro:
      "Welcome to my personal corner of the internet. I'm a software engineer passionate about building things that make a difference.",
    sections: [
      {
        title: "What I do",
        body: "I spend my time writing code, exploring new technologies, and working on projects that interest me. I believe in building software that is both functional and elegant.",
      },
      {
        title: "My approach",
        body: "I value simplicity and clarity in everything I create. Good software should be easy to understand, maintain, and extend. I strive to write code that future developers (including future me) will appreciate.",
      },
      {
        title: "Beyond code",
        body: "When I'm not coding, you can find me exploring new ideas, reading, or working on side projects. I believe in continuous learning and pushing the boundaries of what's possible.",
      },
    ],
    closingPrefix: "Feel free to explore my",
    blogLink: "blog",
    closingMiddle: "where I share my thoughts, or check out my",
    projectsLink: "projects",
    closingSuffix: "to see what I've been building.",
  },
  ja: {
    pageTitle: "プロフィール",
    title: "こんにちは、Atsushi Hatakeyama です",
    description:
      "Atsushi Hatakeyama の個人ブログとポートフォリオです。コード、技術、アイデアについて書いています。",
    intro:
      "このサイトでは、ソフトウェア開発や技術、日々考えていることについて書いています。",
    sections: [
      {
        title: "やっていること",
        body: "コードを書き、新しい技術を試し、興味のあるプロジェクトを形にしています。機能的でありながら、扱いやすく美しいソフトウェアを作ることを大切にしています。",
      },
      {
        title: "大切にしていること",
        body: "シンプルさと明快さを重視しています。良いソフトウェアは理解しやすく、保守しやすく、拡張しやすいものであるべきだと考えています。",
      },
      {
        title: "コードの外側",
        body: "コードを書いていない時間は、本を読んだり、新しいアイデアを考えたり、個人プロジェクトに取り組んだりしています。",
      },
    ],
    closingPrefix: "考えたことは",
    blogLink: "ブログ",
    closingMiddle: "に、作っているものは",
    projectsLink: "プロジェクト",
    closingSuffix: "にまとめています。",
  },
} satisfies Record<Locale, unknown>;

export const projectsContent = {
  en: {
    title: "Projects",
    description:
      "A selection of projects by Atsushi Hatakeyama — experiments, tools, and things built with Next.js, TypeScript, and more.",
    intro:
      "A selection of projects I've worked on. Some are experiments, others are tools I use regularly.",
    viewProject: "View project",
  },
  ja: {
    title: "プロジェクト",
    description:
      "Atsushi Hatakeyama が取り組んできたプロジェクト、実験、ツールの一覧です。",
    intro:
      "これまでに作ったプロジェクトの一部です。実験的なものから、日常的に使っているツールまで含めています。",
    viewProject: "プロジェクトを見る",
  },
} satisfies Record<Locale, unknown>;

export const contactContent = {
  en: {
    title: "Contact",
    description:
      "Get in touch with Atsushi Hatakeyama via email, Twitter/X, GitHub, or LinkedIn.",
    intro:
      "I'm always happy to connect with fellow developers, discuss ideas, or explore collaboration opportunities.",
    getInTouch: "Get in touch",
    bestWays: "The best ways to reach me:",
    general: "For general",
    quick: "For quick conversations",
    code: "For code and projects",
    professional: "For professional connections",
    responseTime: "Response time",
    response:
      "I try to respond to all messages within a few days. If it's urgent, please mention that in your message.",
  },
  ja: {
    title: "連絡先",
    description:
      "Atsushi Hatakeyama への連絡先です。メール、Twitter/X、GitHub、LinkedIn から連絡できます。",
    intro:
      "開発者の方との交流、アイデアの相談、コラボレーションの話など、気軽にご連絡ください。",
    getInTouch: "連絡方法",
    bestWays: "主な連絡先:",
    general: "一般的なご連絡",
    quick: "短いやりとり",
    code: "コードやプロジェクト",
    professional: "仕事上のつながり",
    responseTime: "返信について",
    response:
      "通常は数日以内の返信を心がけています。急ぎの場合は、その旨をメッセージに書いてください。",
  },
} satisfies Record<Locale, unknown>;
