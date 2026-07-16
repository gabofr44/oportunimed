import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-orange font-bold text-sm">
                GP
              </div>
              <span className="text-lg font-bold">Global Pathways</span>
            </div>
            <p className="mt-4 text-sm text-slate-400">
              Empowering students to find research and scholarship opportunities worldwide.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/opportunities" className="hover:text-white transition-colors">Opportunities</Link></li>
              <li><Link href="/scholarships" className="hover:text-white transition-colors">Scholarships</Link></li>
              <li><Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Resources
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/stories" className="hover:text-white transition-colors">Stories</Link></li>
              <li><Link href="/how-to-apply" className="hover:text-white transition-colors">How to Apply</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Legal
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
          &copy; {new Date().getFullYear()} Global Pathways. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
