import Link from "next/link";

interface FooterProps {
  siteName?: string;
  logoText?: string;
  tagline?: string;
  copyright?: string;
  exploreLinks?: Array<{ label: string; href: string }>;
  resourceLinks?: Array<{ label: string; href: string }>;
  legalLinks?: Array<{ label: string; href: string }>;
}

export function Footer({
  siteName = "Oportunimed",
  logoText = "GP",
  tagline = "Empowering students to find research and scholarship opportunities worldwide.",
  copyright = "Oportunimed",
  exploreLinks = [
    { label: "Opportunities", href: "/opportunities" },
    { label: "Scholarships", href: "/opportunities?type=scholarship" },
    { label: "Destinations", href: "/destinations" },
  ],
  resourceLinks = [
    { label: "Blog", href: "/blog" },
    { label: "Stories", href: "/stories" },
    { label: "How to Apply", href: "/how-to-apply" },
  ],
  legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
}: FooterProps) {
  return (
    <footer className="border-t border-border bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-orange font-bold text-sm">
                {logoText}
              </div>
              <span className="text-lg font-bold">{siteName}</span>
            </div>
            <p className="mt-4 text-sm text-slate-400">{tagline}</p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Resources
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Legal
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
          &copy; {new Date().getFullYear()} {copyright}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
