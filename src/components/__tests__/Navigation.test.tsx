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
    expect(screen.getByRole("link", { name: "Writing" })).toBeInTheDocument();
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
    expect(screen.getByRole("link", { name: "Writing" })).toHaveAttribute(
      "href",
      "/en/writing"
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
    mockUsePathname.mockReturnValue("/en/writing");
    render(<Navigation locale="en" />);

    const writingLink = screen.getByRole("link", { name: "Writing" });
    const aboutLink = screen.getByRole("link", { name: "About" });

    expect(writingLink.className).toContain("text-neutral-800");
    expect(aboutLink.className).toContain("text-neutral-500");
  });

  it("/projects ページでは Projects リンクがアクティブになる", () => {
    mockUsePathname.mockReturnValue("/en/projects");
    render(<Navigation locale="en" />);

    const projectsLink = screen.getByRole("link", { name: "Projects" });
    expect(projectsLink.className).toContain("text-neutral-800");
  });

  it("/writing/some-post ではWriting リンクがアクティブになる", () => {
    mockUsePathname.mockReturnValue("/en/writing/some-post");
    render(<Navigation locale="en" />);

    const writingLink = screen.getByRole("link", { name: "Writing" });
    expect(writingLink.className).toContain("text-neutral-800");
  });

  it("/writing/ads/data-structure/tree では Writing リンクがアクティブになる", () => {
    mockUsePathname.mockReturnValue("/en/writing/ads/data-structure/tree");
    render(<Navigation locale="en" />);

    const writingLink = screen.getByRole("link", { name: "Writing" });
    expect(writingLink.className).toContain("text-neutral-800");
  });
});
