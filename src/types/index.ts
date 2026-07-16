export type OpportunityType = "scholarship" | "research" | "internship" | "course";

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
  funding: boolean;
  description: string | null;
  link: string | null;
  deadline: string;
  tags: string[];
  is_featured: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
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
