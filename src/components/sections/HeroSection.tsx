"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search, ArrowRight, Sparkles, GraduationCap, Beaker, Globe } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface HeroContent {
  headline?: string;
  subheadline?: string;
  search_placeholder?: string;
  cta_1_text?: string;
  cta_1_link?: string;
  cta_2_text?: string;
  cta_2_link?: string;
}

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1800;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export function HeroSection({ content }: { content?: HeroContent }) {
  const c = content || {};

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 size-96 rounded-full bg-blue/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 size-96 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-black tracking-tight text-text-main sm:text-5xl lg:text-6xl">
            {c.headline || (
              <>
                Tu carrera médica<br className="hidden sm:block" /> comienza aquí.
              </>
            )}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-text-muted sm:text-lg">
            {c.subheadline || "Becas, internships, oportunidades de investigación y mucho más, todo en un solo lugar."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-8 max-w-2xl"
        >
          <Link href={c.cta_1_link || "/opportunities"} className="flex items-center rounded-2xl border border-border bg-card p-2 shadow-sm transition-all hover:border-blue/30 hover:shadow-md focus-within:border-blue/40 focus-within:shadow-md">
            <Search className="ml-3 size-5 text-text-muted" />
            <input
              type="text"
              placeholder={c.search_placeholder || "Beca, universidad, país..."}
              className="flex-1 bg-transparent px-3 py-2.5 text-sm text-text-main outline-none placeholder:text-text-muted/60"
              readOnly
            />
            <button className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:scale-[1.03]">
              {c.cta_1_text || "Buscar"}
              <ArrowRight className="size-3.5" />
            </button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-3 text-sm text-text-muted"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs">
            <Sparkles className="size-3 text-blue" />
            IA inteligente
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs">
            <Globe className="size-3 text-success" />
            +50 países
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs">
            <GraduationCap className="size-3 text-purple-500" />
            100% gratuito
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs">
            <Beaker className="size-3 text-amber-500" />
            Actualizado diario
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { value: 342, suffix: "+", label: "Convocatorias activas", icon: "📋" },
            { value: 50, suffix: "+", label: "Países disponibles", icon: "🌍" },
            { value: 12000, suffix: "+", label: "Estudiantes registrados", icon: "👥" },
            { value: 89, suffix: "%", label: "Tasa de aceptación", icon: "🎯" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
              className="bento-shadow card-hover rounded-2xl border border-border bg-card p-5 text-center noise"
            >
              <div className="relative z-10">
                <span className="text-2xl">{stat.icon}</span>
                <div className="mt-2 text-2xl font-bold text-text-main sm:text-3xl">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-xs text-text-muted">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mx-auto mt-10 flex max-w-4xl flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <Link
            href={c.cta_1_link || "/opportunities"}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:scale-[1.03] hover:shadow-lg"
          >
            {c.cta_1_text || "Explorar convocatorias"}
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href={c.cta_2_link || "/how-to-apply"}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-card px-6 text-sm font-medium text-text-main transition-all hover:border-blue/30 hover:shadow-sm"
          >
            {c.cta_2_text || "Cómo postular"}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
