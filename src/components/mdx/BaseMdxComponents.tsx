import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const baseMdxComponents = {
  a: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = /^https?:\/\//.test(href ?? "");
    return (
      <a
        href={href}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...props}
      >
        {children}
      </a>
    );
  },
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt ?? ""} className="my-6 w-full" {...props} />
  ),
  code({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
    const language = (className ?? "").match(/language-([\w-]+)/)?.[1];
    if (!language) {
      return (
        <code
          className="rounded bg-neutral-100 px-1 py-0.5 font-mono text-sm text-neutral-800"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <SyntaxHighlighter
        style={oneLight}
        language={language}
        PreTag="div"
        customStyle={{
          borderRadius: "6px",
          fontSize: "0.875rem",
          marginBottom: "1.25rem",
        }}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  },
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="border-b border-neutral-300" {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border-b border-neutral-300 px-4 py-2 text-left font-semibold text-neutral-700"
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="border-b border-neutral-200 px-4 py-2 text-neutral-700"
      {...props}
    />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="transition-colors hover:bg-neutral-50" {...props} />
  ),
};
