interface CategoryItem {
  label: string;
  description: string;
  icon: string;
}

interface CategoriesContent {
  title?: string;
  subtitle?: string;
  items?: CategoryItem[];
}

const defaultItems: CategoryItem[] = [
  { label: "Scholarships", description: "Full & Partial Funding", icon: "🎓" },
  { label: "Research Programs", description: "STEM & Humanities Research", icon: "🔬" },
  { label: "Internships", description: "Professional Placements Abroad", icon: "💼" },
  { label: "Language & Summer", description: "Short-term Study Abroad", icon: "📖" },
];

export function CategoriesSection({ content }: { content?: CategoriesContent }) {
  const c = content || {};
  const items = (c.items && c.items.length > 0) ? c.items : defaultItems;

  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-text-main sm:text-4xl">
            {c.title || "Categories"}
          </h2>
          <p className="mt-3 text-lg text-text-muted">
            {c.subtitle || ""}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((cat) => (
            <div
              key={cat.label}
              className="group cursor-pointer rounded-2xl border border-border bg-white p-6 text-center shadow-sm transition-all hover:border-orange hover:shadow-md"
            >
              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-surface text-3xl transition-colors group-hover:bg-orange/10">
                {cat.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-main">
                {cat.label}
              </h3>
              <p className="mt-1 text-sm text-text-muted">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
