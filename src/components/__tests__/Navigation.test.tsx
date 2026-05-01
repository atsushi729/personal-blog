import { render, screen } from "@testing-library/react";
import Navigation from "../Navigation";

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

// next/navigation をモック
const mockUsePathname = jest.fn();
jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

describe("Navigation", () => {
  it("全ナビゲーションリンクを表示する", () => {
    mockUsePathname.mockReturnValue("/en");
    render(<Navigation locale="en" />);

    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Blog" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Projects" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  });

  it("各リンクの href が正しい", () => {
    mockUsePathname.mockReturnValue("/en");
    render(<Navigation locale="en" />);

    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/en"
    );
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute(
      "href",
      "/en/blog"
    );
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "href",
      "/en/projects"
    );
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/en/contact"
    );
  });

  it("現在のパスに対応するリンクがアクティブスタイルを持つ", () => {
    mockUsePathname.mockReturnValue("/en/blog");
    render(<Navigation locale="en" />);

    const blogLink = screen.getByRole("link", { name: "Blog" });
    const aboutLink = screen.getByRole("link", { name: "About" });

    // アクティブなリンクは text-neutral-800
    expect(blogLink.className).toContain("text-neutral-800");
    // 非アクティブなリンクは text-neutral-500
    expect(aboutLink.className).toContain("text-neutral-500");
  });

  it("/projects ページでは Projects リンクがアクティブになる", () => {
    mockUsePathname.mockReturnValue("/en/projects");
    render(<Navigation locale="en" />);

    const projectsLink = screen.getByRole("link", { name: "Projects" });
    expect(projectsLink.className).toContain("text-neutral-800");
  });
});
