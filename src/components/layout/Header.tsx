"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Destinations", href: "/destinations" },
  { label: "Scholarships", href: "/opportunities?type=scholarship" },
  { label: "Stories", href: "/stories" },
  { label: "Blog", href: "/blog" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-orange text-white font-bold text-sm">
            GP
          </div>
          <span className="text-lg font-bold text-primary">Oportunimed</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-surface hover:text-text-main"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-text-muted hover:bg-surface md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-white px-4 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-text-muted hover:bg-surface hover:text-text-main"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
