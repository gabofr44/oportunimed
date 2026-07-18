"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "María García",
    role: "Estudiante de Medicina, UNAM",
    text: "Gracias a OportuniMed conseguí una beca de investigación en Alemania. La plataforma hizo todo el proceso mucho más fácil.",
  },
  {
    name: "Carlos Mendoza",
    role: "Internship, Johns Hopkins",
    text: "Encontré mi internship ideal en minutos. Las convocatorias están bien organizadas y siempre actualizadas.",
  },
  {
    name: "Ana Rodríguez",
    role: "Residente, Hospital General",
    text: "La mejor herramienta para estudiantes médicos. Recomiendo OportuniMed a todos mis compañeros.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
            Lo que dicen nuestros estudiantes
          </h2>
          <p className="mt-3 text-base text-text-muted">
            Historias reales de quienes ya dieron el paso
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bento-shadow card-hover rounded-2xl border border-border bg-card p-6 noise"
            >
              <div className="relative z-10">
                <Quote className="mb-3 size-6 text-blue/30" />
                <p className="text-sm leading-relaxed text-text-muted">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-text-main">{t.name}</div>
                    <div className="text-xs text-text-muted">{t.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
