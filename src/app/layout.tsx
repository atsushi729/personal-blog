import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

const siteUrl = "https://atsushi-blog.pages.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Atsushi Hatakeyama",
    template: "%s | Atsushi Hatakeyama",
  },
  description: "Personal blog and portfolio of Atsushi Hatakeyama — software engineer writing about code, technology, and ideas.",
  openGraph: {
    type: "website",
    siteName: "Atsushi Hatakeyama",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    creator: "@Hatakey2Atsushi",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <main className="max-w-xl mx-auto px-6 py-16">
          <Navigation />
          {children}
        </main>
      </body>
    </html>
  );
}
