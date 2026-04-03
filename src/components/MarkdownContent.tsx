import ReactMarkdown, { type Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialLight,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

const markdownComponents: Components = {
  code({ className, children, ...props }) {
    const language = className?.match(/language-([\w-]+)/)?.[1];

    if (!language) {
      return (
        <code
          className="bg-neutral-100 text-neutral-800 rounded px-1 py-0.5 text-sm font-mono"
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
};

type MarkdownContentProps = {
  content: string;
};

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-neutral max-w-none">
      <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
    </div>
  );
}
