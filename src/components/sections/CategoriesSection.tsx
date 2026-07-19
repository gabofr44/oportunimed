"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GraduationCap, Beaker, Briefcase, BookOpen, Stethoscope, CalendarDays } from "lucide-react";

interface CategoryItem {
  label: string;
  description: string;
  icon: string;
  type?: string;
}

interface CategoriesContent {
  title?: string;
  subtitle?: string;
  items?: CategoryItem[];
}

const iconMap: Record<string, React.ReactNode> = {
  "🎓": <GraduationCap className="size-6" />,
  "🔬": <Beaker className="size-6" />,
  "💼": <Briefcase className="size-6" />,
  "📖": <BookOpen className="size-6" />,
  "🩺": <Stethoscope className="size-6" />,
  "📅": <CalendarDays className="size-6" />,
};

const typeLinks: Record<string, string> = {
  "Becas": "/opportunities?type=scholarship",
  "Investigación": "/opportunities?type=research",
  "Internships": "/opportunities?type=internship",
  "Internado y SS": "/opportunities?type=internado_ss",
  "Cursos & Verano": "/opportunities?type=course",
  "Eventos": "/opportunities?type=event",
};

const defaultItems: CategoryItem[] = [
  { label: "Becas", description: "Financiamiento completo y parcial", icon: "🎓" },
  { label: "Investigación", description: "STEM y Humanidades", icon: "🔬" },
  { label: "Internships", description: "Experiencia profesional en el extranjero", icon: "💼" },
  { label: "Internado y SS", description: "Servicio social e internado médico", icon: "🩺" },
  { label: "Cursos & Verano", description: "Programas de corta duración", icon: "📖" },
  { label: "Eventos", description: "Congressos, hackathons y más", icon: "📅" },
];

export function CategoriesSection({ content }: { content?: CategoriesContent }) {
  const c = content || {};
  const items = c.items && c.items.length > 0 ? c.items : defaultItems;

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
            {c.title || "Explora por tipo de oportunidad"}
          </h2>
          <p className="mt-3 text-base text-text-muted">
            {c.subtitle || "Descubre programas que se adapten a tus metas académicas"}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((cat, i) => {
            const href = typeLinks[cat.label] || `/opportunities?type=${(cat.label).toLowerCase()}`;
            return (
              <Link key={cat.label} href={href}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bento-shadow card-hover group rounded-2xl border border-border bg-card p-6 noise"
                >
                  <div className="relative z-10">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-blue/8 text-blue transition-colors group-hover:bg-blue group-hover:text-white">
                      {iconMap[cat.icon] || <span className="text-2xl">{cat.icon}</span>}
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-text-main">{cat.label}</h3>
                    <p className="mt-1 text-sm text-text-muted">{cat.description}</p>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
