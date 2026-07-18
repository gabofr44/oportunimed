"use client";

import Link from "next/link";
import { useState, useEffect, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import {
  Search,
  Menu,
  X,
  Sun,
  Moon,
  Stethoscope,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  children?: React.ReactNode;
  navItems?: NavItem[];
}

const defaultNavItems: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Convocatorias", href: "/opportunities" },
  { label: "Internship", href: "/opportunities?type=internship" },
  { label: "Investigación", href: "/opportunities?type=research" },
  { label: "Blog", href: "/blog" },
];

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function Header({ children, navItems = defaultNavItems }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const isClient = useIsClient();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "glass border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Stethoscope className="size-4" />
            </div>
            <span className="text-base font-bold tracking-tight text-text-main">
              Oportuni<span className="text-blue">Med</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-text-muted transition-colors hover:bg-secondary hover:text-text-main"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/opportunities"
              className="hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-1.5 text-sm text-text-muted transition-all hover:border-blue/30 hover:shadow-sm sm:flex"
            >
              <Search className="size-3.5" />
              <span className="hidden lg:inline">Buscar</span>
              <kbd className="ml-1 rounded-md border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium text-text-muted">
                ⌘K
              </kbd>
            </Link>

            {isClient && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex size-8 items-center justify-center rounded-xl text-text-muted transition-colors hover:bg-secondary hover:text-text-main"
              >
                {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </button>
            )}

            <Link
              href="/auth/login"
              className="hidden rounded-xl bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-all hover:scale-[1.03] sm:block"
            >
              Iniciar sesión
            </Link>

            <button
              className="flex size-8 items-center justify-center rounded-xl text-text-muted md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="glass border-t border-border px-4 pb-4 pt-2 md:hidden">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-text-muted hover:bg-secondary hover:text-text-main"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/auth/login"
                className="mt-2 rounded-xl bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
                onClick={() => setMobileOpen(false)}
              >
                Iniciar sesión
              </Link>
            </nav>
          </div>
        )}
      </header>
      {children}
    </>
  );
}
