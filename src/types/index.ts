export type OpportunityType = "scholarship" | "research" | "internship" | "internado_ss" | "course" | "event";

export type OpportunitySubtype =
  // Scholarship
  | "full_scholarship" | "fellowship" | "government" | "need_based" | "merit_based" | "travel_grant"
  // Internship
  | "corporate" | "un_international" | "consulting" | "tech" | "research_internship"
  // Internado y Servicio Social
  | "internado_pregrado" | "servicio_social"
  // Research
  | "phd" | "postdoc" | "research_fellowship" | "clinical_fellowship" | "summer_research" | "winter_research" | "observership"
  // Course
  | "online" | "certification" | "bootcamp" | "summer_school" | "short_program" | "mentorship"
  // Event
  | "congress" | "hackathon" | "competition" | "conference" | "exchange" | "mission_brain" | "student_chapter";

export type ApplicationStatus = "pending" | "accepted" | "rejected" | "withdrawn";

export type UserRole = "student" | "admin";

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  country: string | null;
  university: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
  educational_level: string | null;
  educational_field: string | null;
  interests: string[];
  goals: string[];
  onboarding_complete: boolean;
}

export type CallFrequency =
  | "Contínua"
  | "Anual - enero" | "Anual - febrero" | "Anual - marzo" | "Anual - abril"
  | "Anual - mayo" | "Anual - junio" | "Anual - julio" | "Anual - agosto"
  | "Anual - septiembre" | "Anual - octubre" | "Anual - noviembre" | "Anual - diciembre"
  | "Anual - varía" | "Anual - consultar convocatoria"
  | "Semestral - enero/julio" | "Semestral - febrero/septiembre"
  | "Semestral - marzo/agosto" | "Semestral - abril/octubre"
  | "Trimestral"
  | "Bianual" | "Única";

export type OpportunityStatus = "activa" | "por_salir" | "pasada";

export function getOpportunityStatus(deadline: string, callFrequency?: string | null): OpportunityStatus {
  const now = new Date();
  const deadlineDate = new Date(deadline);

  if (deadlineDate > now) return "activa";

  if (callFrequency && callFrequency !== "Única" && callFrequency !== "Contínua" && callFrequency !== "Anual - consultar convocatoria") {
    return "por_salir";
  }

  return "pasada";
}

export function getStatusLabel(status: OpportunityStatus): string {
  switch (status) {
    case "activa": return "Activa";
    case "por_salir": return "Por salir";
    case "pasada": return "Pasada";
  }
}

export interface Opportunity {
  id: string;
  title: string;
  institution: string;
  location: string;
  country_code: string | null;
  type: OpportunityType;
  subtype: OpportunitySubtype | null;
  funding: boolean;
  description: string | null;
  link: string | null;
  deadline: string;
  tags: string[];
  is_featured: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  educational_level?: string;
  educational_field?: string;
  course_level?: string;
  course_duration?: string;
  course_subject?: string;
  course_language?: string;
  call_frequency?: string | null;
}

export interface Application {
  id: string;
  user_id: string;
  opportunity_id: string;
  status: ApplicationStatus;
  notes: string | null;
  applied_at: string;
  updated_at: string;
  opportunities?: Opportunity;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  created_at: string;
}
