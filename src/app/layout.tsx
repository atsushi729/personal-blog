import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Atsushi Hatakeyama",
  description: "Personal blog and portfolio of Atsushi Hatakeyama",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <main className="max-w-2xl mx-auto px-6 py-16">
          <Navigation />
          {children}
        </main>
      </body>
    </html>
  );
}
