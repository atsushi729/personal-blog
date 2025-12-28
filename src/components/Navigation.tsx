"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="mb-12">
      <div className="flex items-center gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-sans tracking-wide transition-colors ${
              pathname === link.href
                ? "text-neutral-800"
                : "text-neutral-500 hover:text-neutral-800"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
