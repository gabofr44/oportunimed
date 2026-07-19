"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Check, Stethoscope } from "lucide-react";

const steps = [
  { id: "level", title: "¿Cuál es tu nivel educativo?", subtitle: "Selecciona el que aplique actualmente." },
  { id: "fields", title: "¿Qué áreas te interesan?", subtitle: "Puedes elegir varias." },
  { id: "goals", title: "¿Qué meta te gustaría lograr?", subtitle: "Selecciona todas las que apliquen." },
  { id: "types", title: "¿Qué tipo de oportunidades buscas?", subtitle: "¿Becas, investigación, prácticas?" },
];

const levelOptions = [
  { value: "secundaria", label: "Secundaria" },
  { value: "preparatoria", label: "Preparatoria" },
  { value: "universidad", label: "Universidad", default: true },
  { value: "posgrado", label: "Posgrado (Maestría/Doctorado)" },
  { value: "profesional", label: "Profesional / Carrera" },
];

const fieldOptions = [
  { value: "ciencias_salud", label: "Ciencias de la Salud 🩺", highlight: true },
  { value: "ciencias", label: "Ciencias 🔬" },
  { value: "ciencias_sociales", label: "Ciencias Sociales 📊" },
  { value: "ingenieria", label: "Ingeniería ⚙️" },
  { value: "tecnologia", label: "Tecnología / Computación 💻" },
  { value: "administracion", label: "Administración / Negocios 📈" },
  { value: "humanidades", label: "Humanidades 📖" },
  { value: "derecho", label: "Derecho ⚖️" },
  { value: "educacion", label: "Educación 🎓" },
  { value: "artes", label: "Artes 🎨" },
];

const goalOptions = [
  { value: "extranjero", label: "Especializarme en el extranjero" },
  { value: "maestria_doctorado", label: "Hacer una maestría o doctorado" },
  { value: "hospital_internacional", label: "Trabajar en un hospital internacional" },
  { value: "investigacion", label: "Publicar investigación" },
  { value: "voluntariado", label: "Hacer voluntariado internacional" },
  { value: "startup", label: "Crear un proyecto / startup de salud" },
  { value: "no_se", label: "Aún no lo sé" },
];

const typeOptions = [
  { value: "scholarship", label: "Becas (financiamiento)" },
  { value: "research", label: "Investigación" },
  { value: "internship", label: "Internships (prácticas)" },
  { value: "internado_ss", label: "Internado / Servicio Social" },
  { value: "course", label: "Cursos / Certificaciones" },
  { value: "event", label: "Eventos / Congressos" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [level, setLevel] = useState("");
  const [fields, setFields] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const toggleArray = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];

  const canProceed = () => {
    switch (step) {
      case 0: return !!level;
      case 1: return fields.length > 0;
      case 2: return goals.length > 0;
      case 3: return types.length > 0;
      default: return true;
    }
  };

  const handleFinish = async () => {
    setSaving(true);
    try {
      await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          educational_level: level,
          educational_field: fields[0] || null,
          interests: fields,
          goals,
          preferred_types: types,
        }),
      });
      router.push("/dashboard");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground mb-4">
            <Stethoscope className="size-7" />
          </div>
          <h1 className="text-2xl font-bold text-text-main">Bienvenido a OportuniMed</h1>
          <p className="mt-1 text-sm text-text-muted">Cuéntanos sobre ti para recomendarte las mejores oportunidades.</p>
        </div>

        <div className="mb-6 flex gap-1.5">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-border"}`} />
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 noise">
          <div className="relative z-10">
            <h2 className="text-lg font-semibold text-text-main">{steps[step].title}</h2>
            <p className="mt-1 text-sm text-text-muted">{steps[step].subtitle}</p>

            <div className="mt-5 space-y-2">
              {step === 0 && levelOptions.map((opt) => (
                <button key={opt.value} onClick={() => setLevel(opt.value)}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                    level === opt.value
                      ? "border-blue bg-blue/5 text-blue font-medium"
                      : "border-border bg-surface text-text-main hover:border-blue/30"
                  }`}
                >
                  <div className={`flex size-5 items-center justify-center rounded-full border text-[10px] ${
                    level === opt.value ? "border-blue bg-blue text-white" : "border-border"
                  }`}>
                    {level === opt.value && <Check className="size-3" />}
                  </div>
                  {opt.label}
                </button>
              ))}

              {step === 1 && fieldOptions.map((opt) => (
                <button key={opt.value} onClick={() => setFields(toggleArray(fields, opt.value))}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                    fields.includes(opt.value)
                      ? "border-blue bg-blue/5 text-blue font-medium"
                      : "border-border bg-surface text-text-main hover:border-blue/30"
                  }`}
                >
                  <div className={`flex size-5 items-center justify-center rounded border text-[10px] ${
                    fields.includes(opt.value) ? "border-blue bg-blue text-white" : "border-border"
                  }`}>
                    {fields.includes(opt.value) && <Check className="size-3" />}
                  </div>
                  {opt.label}
                </button>
              ))}
              {step === 1 && (
                <p className="pt-2 text-xs text-text-muted text-center">Seleccionados: {fields.length}</p>
              )}

              {step === 2 && goalOptions.map((opt) => (
                <button key={opt.value} onClick={() => setGoals(toggleArray(goals, opt.value))}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                    goals.includes(opt.value)
                      ? "border-blue bg-blue/5 text-blue font-medium"
                      : "border-border bg-surface text-text-main hover:border-blue/30"
                  }`}
                >
                  <div className={`flex size-5 items-center justify-center rounded border text-[10px] ${
                    goals.includes(opt.value) ? "border-blue bg-blue text-white" : "border-border"
                  }`}>
                    {goals.includes(opt.value) && <Check className="size-3" />}
                  </div>
                  {opt.label}
                </button>
              ))}

              {step === 3 && typeOptions.map((opt) => (
                <button key={opt.value} onClick={() => setTypes(toggleArray(types, opt.value))}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                    types.includes(opt.value)
                      ? "border-blue bg-blue/5 text-blue font-medium"
                      : "border-border bg-surface text-text-main hover:border-blue/30"
                  }`}
                >
                  <div className={`flex size-5 items-center justify-center rounded border text-[10px] ${
                    types.includes(opt.value) ? "border-blue bg-blue text-white" : "border-border"
                  }`}>
                    {types.includes(opt.value) && <Check className="size-3" />}
                  </div>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          {step > 0 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1 rounded-xl">
              <ArrowLeft className="mr-1 size-4" /> Anterior
            </Button>
          )}
          {step < steps.length - 1 ? (
            <Button disabled={!canProceed()} onClick={() => setStep(step + 1)} className="flex-1 rounded-xl">
              Siguiente <ArrowRight className="ml-1 size-4" />
            </Button>
          ) : (
            <Button disabled={!canProceed() || saving} onClick={handleFinish} className="flex-1 rounded-xl">
              {saving ? "Guardando..." : "Comenzar"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
