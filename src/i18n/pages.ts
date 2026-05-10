import type { Locale } from "./config";

export const aboutContent = {
  en: {
    pageTitle: "About",
    title: "Hi, I'm Atsushi Hatakeyama",
    description:
      "A personal blog and portfolio by Atsushi Hatakeyama, writing about code, technology, and startups.",
    intro:
      "On this site, I write about software development, startups, and things I learn through day-to-day experience. My technical strengths are AI system development, software design, and new business development. The languages I use most are Python and TypeScript.",
    sections: [
      {
        title: "What I do",
        body: "I write code, explore new technologies, and turn projects I care about into real products. I am especially interested in AI product development, contributing to OSS, and building software that is both functional and inspiring.",
      },
      {
        title: "What I value",
        body: "I value simplicity and clarity. I believe good software should be easy to understand, maintain, and extend. More than technology itself, I care about solving real problems, because my way of thinking starts from engineering.",
      },
      {
        title: "Other work",
        body: "Beyond software development, I also work on my own business, finance, and education-related activities.",
      },
    ],
    closingPrefix: "I collect my thoughts in",
    writingLink: "Writing",
    closingMiddle: "and the things I build in",
    projectsLink: "Projects",
    closingSuffix: ".",
  },
  ja: {
    pageTitle: "プロフィール",
    title: "こんにちは、Atsushi Hatakeyama です",
    description:
      "Atsushi Hatakeyama の個人ブログとポートフォリオです。コード、技術、スタートアップについて書いています。",
    intro:
      "このサイトでは、ソフトウェア開発やスタートアップなど、日々経験したことについて書いています。ハードスキルとしてはAIシステム開発、設計、新規事業開発に強みを持ちます。得意な言語はPythonとTypeScriptです。",
    sections: [
      {
        title: "やっていること",
        body: "コードを書き、新しい技術を試し、興味のあるプロジェクトを形にしています。AIプロダクト開発やOSSへの貢献など、機能的で感動的なソフトウェアを作ることに情熱を注いでいます。",
      },
      {
        title: "大切にしていること",
        body: "シンプルさと明快さを重視しています。良いソフトウェアは理解しやすく、保守しやすく、拡張しやすいものであるべきだと考えています。技術だけではなく、課題を解決することを重視しています。なぜなら、考え方の起点がエンジニアリングにあるためです。",
      },
      {
        title: "その他活動",
        body: "ソフトウェア開発の他に自分の事業、ファイナンス、教育の活動を行っています。",
      },
    ],
    closingPrefix: "考えたことは",
    writingLink: "Writing",
    closingMiddle: "に、作っているものは",
    projectsLink: "Projects",
    closingSuffix: "にまとめています。",
  },
} satisfies Record<Locale, unknown>;

export const projectsContent = {
  en: {
    title: "Projects",
    description:
      "A collection of projects, experiments, and tools by Atsushi Hatakeyama.",
    intro:
      "A selection of projects I have built, ranging from experiments to tools I use in everyday life.",
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

export const writingContent = {
  en: {
    title: "Writing",
    description:
      "Articles and notes on software, technology, and building things by Atsushi Hatakeyama.",
    back: "Back to writing",
    readPost: (title: string) => `Read "${title}" by Atsushi Hatakeyama.`,
    empty: "No posts yet.",
    emptyNote: "No notes yet.",
  },
  ja: {
    title: "Writing",
    description:
      "ソフトウェア、技術、ものづくりについての Atsushi Hatakeyama の記事と学習記録です。",
    back: "Writing へ戻る",
    readPost: (title: string) =>
      `Atsushi Hatakeyama による「${title}」を読む。`,
    empty: "まだ投稿がありません。",
    emptyNote: "まだメモがありません。",
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
