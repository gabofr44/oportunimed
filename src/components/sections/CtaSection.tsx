"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CtaContent {
  title?: string;
  subtitle?: string;
  button_text?: string;
  button_link?: string;
}

export function CtaSection({ content }: { content?: CtaContent }) {
  const c = content || {};

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bento-shadow relative overflow-hidden rounded-3xl bg-primary p-12 text-center noise sm:p-16"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-0 top-0 size-64 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute bottom-0 right-0 size-64 rounded-full bg-white/5 blur-3xl" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {c.title || "¿Listo para dar el siguiente paso?"}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-white/70">
              {c.subtitle || "Únete a miles de estudiantes que ya están transformando su carrera médica con oportunidades globales."}
            </p>
            <div className="mt-8">
              <Link
                href={c.button_link || "/opportunities"}
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-8 text-sm font-semibold text-primary transition-all hover:scale-[1.03] hover:shadow-lg"
              >
                {c.button_text || "Empezar ahora"}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
