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
