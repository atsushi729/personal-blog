import { render, screen, fireEvent } from "@testing-library/react";
import BlogList from "../BlogList";
import type { BlogPost } from "@/lib/blog";

// next/link をモック
jest.mock("next/link", () => {
  const MockLink = ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

const posts: BlogPost[] = [
  {
    slug: "post-2024",
    title: "Post in 2024",
    locale: "en",
    translationKey: "post-2024",
    date: "2024-03-15",
    excerpt: "Excerpt 2024",
    content: "Content 2024",
  },
  {
    slug: "post-2023",
    title: "Post in 2023",
    locale: "en",
    translationKey: "post-2023",
    date: "2023-07-20",
    excerpt: "Excerpt 2023",
    content: "Content 2023",
  },
  {
    slug: "post-2023-b",
    title: "Another Post in 2023",
    locale: "en",
    translationKey: "post-2023-b",
    date: "2023-01-05",
    excerpt: "",
    content: "Content 2023 B",
  },
];

describe("BlogList", () => {
  it("全投稿のタイトルを表示する", () => {
    render(<BlogList posts={posts} locale="en" />);
    expect(screen.getByText("Post in 2024")).toBeInTheDocument();
    expect(screen.getByText("Post in 2023")).toBeInTheDocument();
    expect(screen.getByText("Another Post in 2023")).toBeInTheDocument();
  });

  it("年をグループのヘッダーとして表示する", () => {
    render(<BlogList posts={posts} locale="en" />);
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
    // 同じ年の 2 件目は年ラベルを表示しない
    const yearLabels = screen.getAllByText("2023");
    expect(yearLabels).toHaveLength(1);
  });

  it("日付を MM/DD 形式で表示する", () => {
    render(<BlogList posts={posts} locale="en" />);
    expect(screen.getByText("03/15")).toBeInTheDocument();
    expect(screen.getByText("07/20")).toBeInTheDocument();
    expect(screen.getByText("01/05")).toBeInTheDocument();
  });

  it("各投稿のリンクが正しい href を持つ", () => {
    render(<BlogList posts={posts} locale="en" />);
    // アクセシブル名は子テキストを連結した形式 (例: "2024 Post in 2024 03/15")
    expect(screen.getByRole("link", { name: /Post in 2024/ })).toHaveAttribute(
      "href",
      "/en/blog/post-2024"
    );
    expect(
      screen.getByRole("link", { name: /^2023 Post in 2023/ })
    ).toHaveAttribute("href", "/en/blog/post-2023");
  });

  it("投稿が空のとき何も表示しない", () => {
    const { container } = render(<BlogList posts={[]} locale="en" />);
    // writing-list ラッパーは存在するが中身がない
    expect(container.querySelector(".writing-list")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("ホバー時に他の投稿が dimmed になる", () => {
    render(<BlogList posts={posts} locale="en" />);
    const firstLink = screen.getByRole("link", { name: /Post in 2024/ });
    const secondLink = screen.getByRole("link", {
      name: /Another Post in 2023/,
    });

    // ホバー前は opacity: 1
    expect(secondLink).toHaveStyle({ opacity: 1 });

    // first リンクをホバー
    fireEvent.mouseEnter(firstLink);

    // 他のリンクが dimmed (opacity 0.35) になる
    expect(secondLink).toHaveStyle({ opacity: 0.35 });

    // ホバーを外す
    fireEvent.mouseLeave(firstLink);

    // 元に戻る
    expect(secondLink).toHaveStyle({ opacity: 1 });
  });

  it("ホバー中の投稿自身は dimmed にならない", () => {
    render(<BlogList posts={posts} locale="en" />);
    const firstLink = screen.getByRole("link", { name: /Post in 2024/ });

    fireEvent.mouseEnter(firstLink);
    expect(firstLink).toHaveStyle({ opacity: 1 });
  });
});
