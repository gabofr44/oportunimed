import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Stethoscope, BookOpen, Brain, Search, FlaskConical, GraduationCap, HeartPulse, Microscope, Library, Video, CheckCircle, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Recursos | OportuniMed",
  description: "Plataformas y herramientas para el estudio de medicina: repaso clínico, flashcards, preguntas, referencias y más.",
};

interface ResourceItem {
  name: string;
  description: string;
  url: string;
  category: string;
  icon: React.ReactNode;
  tags: string[];
  free: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  default: <BookOpen className="size-5" />,
  clinical: <Stethoscope className="size-5" />,
  flashcards: <Brain className="size-5" />,
  questions: <Search className="size-5" />,
  lab: <FlaskConical className="size-5" />,
  course: <GraduationCap className="size-5" />,
  anatomy: <HeartPulse className="size-5" />,
  research: <Microscope className="size-5" />,
  reference: <Library className="size-5" />,
  video: <Video className="size-5" />,
  community: <MessageCircle className="size-5" />,
};

const resources: ResourceItem[] = [
  { name: "Amboss", description: "Biblioteca de conocimiento médico con artículos, calculadoras clínicas y herramientas de estudio para estudiantes y residentes.", url: "https://www.amboss.com", category: "Repaso Clínico", icon: iconMap.clinical, tags: ["Medicina", "Guías", "Pago"], free: false },
  { name: "Osmosis", description: "Plataforma de aprendizaje médico con videos, flashcards y preguntas de práctica organizadas por especialidad.", url: "https://www.osmosis.org", category: "Repaso Clínico", icon: iconMap.video, tags: ["Videos", "Flashcards", "Pago"], free: false },
  { name: "Sketchy", description: "Aprendizaje visual mediante sketchnotes y videos para microbiología, farmacología y patología.", url: "https://www.sketchy.com", category: "Repaso Clínico", icon: iconMap.flashcards, tags: ["Visual", "Microbiología", "Pago"], free: false },
  { name: "Pathoma", description: "Curso de patología con videos explicativos que cubren los fundamentos de la patología para USMLE.", url: "https://www.pathoma.com", category: "Repaso Clínico", icon: iconMap.clinical, tags: ["Patología", "USMLE", "Pago"], free: false },
  { name: "Boards & Beyond", description: "Videos didácticos que cubren ciencias básicas y clínicas para preparación de exámenes médicos.", url: "https://www.boardsbeyond.com", category: "Repaso Clínico", icon: iconMap.video, tags: ["Ciencias Básicas", "USMLE", "Pago"], free: false },
  { name: "Physeo", description: "Plataforma de fisiología y ciencias básicas con videos y preguntas de práctica.", url: "https://www.physeo.com", category: "Repaso Clínico", icon: iconMap.clinical, tags: ["Fisiología", "Pago"], free: false },
  { name: "UWorld", description: "Banco de preguntas para USMLE y exámenes médicos con explicaciones detalladas y simulaciones.", url: "https://www.uworld.com", category: "Preguntas", icon: iconMap.questions, tags: ["USMLE", "Preguntas", "Pago"], free: false },
  { name: "Amboss Qbank", description: "Banco de preguntas integrado con la biblioteca Amboss para práctica clínica y preparación de exámenes.", url: "https://www.amboss.com/us/qbank", category: "Preguntas", icon: iconMap.questions, tags: ["Preguntas", "USMLE", "Pago"], free: false },
  { name: "Medscape", description: "Plataforma de referencia clínica con artículos, noticias médicas, calculadoras y herramientas para profesionales.", url: "https://www.medscape.com", category: "Referencia", icon: iconMap.reference, tags: ["Referencia", "Gratis", "Noticias"], free: true },
  { name: "PubMed", description: "Base de datos de literatura biomédica con millones de artículos de investigación y resúmenes.", url: "https://pubmed.ncbi.nlm.nih.gov", category: "Referencia", icon: iconMap.research, tags: ["Investigación", "Gratis", "Artículos"], free: true },
  { name: "UpToDate", description: "Recurso de referencia clínica basado en evidencia para ayudar en la toma de decisiones médicas.", url: "https://www.uptodate.com", category: "Referencia", icon: iconMap.reference, tags: ["Referencia", "Clínico", "Pago"], free: false },
  { name: "DynaMed", description: "Referencia clínica basada en evidencia con resúmenes de enfermedades y recomendaciones de tratamiento.", url: "https://www.dynamed.com", category: "Referencia", icon: iconMap.reference, tags: ["Referencia", "Clínico", "Pago"], free: false },
  { name: "Complete Anatomy", description: "Atlas 3D interactivo del cuerpo humano con modelos anatómicos detallados y herramientas de disección virtual.", url: "https://www.elsevier.com/products/complete-anatomy", category: "Anatomía", icon: iconMap.anatomy, tags: ["Anatomía", "3D", "Pago"], free: false },
  { name: "Kenhub", description: "Plataforma de aprendizaje de anatomía humana con videos, ilustraciones y cuestionarios interactivos.", url: "https://www.kenhub.com", category: "Anatomía", icon: iconMap.anatomy, tags: ["Anatomía", "Videos", "Pago"], free: false },
  { name: "Anki", description: "Software de flashcards con repetición espaciada, ideal para memorizar conceptos médicos a largo plazo.", url: "https://apps.ankiweb.net", category: "Flashcards", icon: iconMap.flashcards, tags: ["Flashcards", "Gratis", "Memorización"], free: true },
  { name: "AnKing Deck", description: "Mazo de flashcards Anki prehecho que cubre todo el contenido de USMLE, muy usado por estudiantes de medicina.", url: "https://www.ankingmed.com", category: "Flashcards", icon: iconMap.flashcards, tags: ["Flashcards", "USMLE", "Gratis"], free: true },
  { name: "Picmonic", description: "Aprendizaje basado en historias visuales y mnemotecnias para ciencias médicas básicas y clínicas.", url: "https://www.picmonic.com", category: "Flashcards", icon: iconMap.flashcards, tags: ["Visual", "Mnemotecnias", "Pago"], free: false },
  { name: "Lecturio", description: "Cursos en video con preguntas integradas y planes de estudio para ciencias básicas y clínicas.", url: "https://www.lecturio.com", category: "Cursos", icon: iconMap.course, tags: ["Videos", "Ciencias", "Pago"], free: false },
  { name: "OnlineMedEd", description: "Plataforma de educación médica con videos organizados por especialidad para estudiantes y residentes.", url: "https://onlinemeded.org", category: "Cursos", icon: iconMap.video, tags: ["Clínico", "Residentes", "Pago"], free: false },
  { name: "Kaplan Medical", description: "Cursos de preparación para USMLE y otras certificaciones médicas con materiales completos.", url: "https://www.kaptest.com/medical", category: "Cursos", icon: iconMap.course, tags: ["USMLE", "Preparación", "Pago"], free: false },
  { name: "Medbullets", description: "Plataforma de repaso con resúmenes escritos, videos y preguntas para ciencias básicas y clínicas.", url: "https://www.medbullets.com", category: "Cursos", icon: iconMap.course, tags: ["Resúmenes", "Preguntas", "Pago"], free: false },
  { name: "Coursera (Medicina)", description: "Cursos online de universidades top en ciencias de la salud, desde salud pública hasta especialidades clínicas.", url: "https://www.coursera.org/browse/health", category: "Cursos", icon: iconMap.course, tags: ["MOOCs", "Universidad", "Gratis"], free: true },
  { name: "Free Open Access Meducation (FOAM)", description: "Comunidad global de recursos educativos médicos abiertos: blogs, podcasts, videos y más.", url: "https://www.foam.em", category: "Comunidad", icon: iconMap.community, tags: ["Comunidad", "Gratis", "Blogs"], free: true },
  { name: "Surgical Recall", description: "Recurso de referencia rápida para estudiantes de cirugía con preguntas frecuentes y conceptos clave.", url: "https://shop.lww.com/Surgical-Recall", category: "Referencia", icon: iconMap.reference, tags: ["Cirugía", "Pago"], free: false },
  { name: "Lab Tests Online", description: "Guía completa sobre pruebas de laboratorio, valores normales e interpretación clínica.", url: "https://www.testing.com", category: "Referencia", icon: iconMap.lab, tags: ["Laboratorio", "Gratis"], free: true },
  { name: "Robbins Pathology", description: "Libro de texto fundamental de patología con explicaciones detalladas y correlaciones clínicas.", url: "https://www.elsevier.com/books/robbins-and-cotran-pathologic-basis-of-disease", category: "Referencia", icon: iconMap.reference, tags: ["Patología", "Pago"], free: false },
  { name: "First Aid for USMLE", description: "Guía de referencia indispensable para USMLE Step 1 con resúmenes concisos y high-yield.", url: "https://firstaidteam.com", category: "Referencia", icon: iconMap.reference, tags: ["USMLE", "High-Yield", "Pago"], free: false },
];

const categories = [
  { key: "Repaso Clínico", icon: <Stethoscope className="size-5" />, color: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800" },
  { key: "Preguntas", icon: <Search className="size-5" />, color: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800" },
  { key: "Referencia", icon: <Library className="size-5" />, color: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800" },
  { key: "Anatomía", icon: <HeartPulse className="size-5" />, color: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800" },
  { key: "Flashcards", icon: <Brain className="size-5" />, color: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800" },
  { key: "Cursos", icon: <GraduationCap className="size-5" />, color: "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-800" },
  { key: "Comunidad", icon: <MessageCircle className="size-5" />, color: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800" },
];

export default function RecursosPage() {
  return (
    <main className="flex-1 bg-background">
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black tracking-tight text-text-main sm:text-5xl">
            Recursos de Estudio
          </h1>
          <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
            Las mejores plataformas y herramientas para tu formación médica, organizadas por categoría.
          </p>
        </div>
      </section>

      {categories.map((cat) => {
        const items = resources.filter((r) => r.category === cat.key);
        if (items.length === 0) return null;
        return (
          <section key={cat.key} className="pb-16 last:pb-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-6 flex items-center gap-3">
                <div className={`flex size-10 items-center justify-center rounded-xl border ${cat.color}`}>
                  {cat.icon}
                </div>
                <h2 className="text-2xl font-bold text-text-main">{cat.key}</h2>
                <span className="text-sm text-text-muted ml-auto">{items.length} recursos</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((r) => (
                  <a
                    key={r.name}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bento-shadow card-hover group rounded-2xl border border-border bg-card p-5 noise transition-all hover:border-blue/20"
                  >
                    <div className="relative z-10 flex items-start gap-4">
                      <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${cat.color} transition-colors`}>
                        {r.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-text-main group-hover:text-blue transition-colors truncate">
                            {r.name}
                          </h3>
                          <span className={`shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium border ${
                            r.free
                              ? "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300"
                              : "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300"
                          }`}>
                            {r.free ? "Gratis" : "Pago"}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-text-muted line-clamp-2">{r.description}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {r.tags.map((t) => (
                            <span key={t} className="inline-flex items-center rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] font-medium text-text-muted">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ExternalLink className="size-4 text-text-muted shrink-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}
