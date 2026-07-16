export function CategoriesSection() {
  const categories = [
    {
      name: "Scholarships",
      description: "Full & Partial Funding",
      icon: "🎓",
    },
    {
      name: "Research Programs",
      description: "STEM & Humanities Research",
      icon: "🔬",
    },
    {
      name: "Internships",
      description: "Professional Placements Abroad",
      icon: "💼",
    },
    {
      name: "Language & Summer",
      description: "Short-term Study Abroad",
      icon: "📖",
    },
  ];

  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-text-main sm:text-4xl">
            Categories
          </h2>
          <p className="mt-3 text-lg text-text-muted">
            Discover opportunities that match your academic goals
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="group cursor-pointer rounded-2xl border border-border bg-white p-6 text-center shadow-sm transition-all hover:border-orange hover:shadow-md"
            >
              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-surface text-3xl transition-colors group-hover:bg-orange/10">
                {cat.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-main">
                {cat.name}
              </h3>
              <p className="mt-1 text-sm text-text-muted">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
