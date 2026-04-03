export type Role = "Hacker" | "Organizer" | "Sponsor" | "Staff" | "Other";

export interface Member {
  id: string;
  name: string;
  email: string;
  year: number | string;
  role: Role;
  school?: string;
  what_i_did?: string;
  headshot_url?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  created_at: string;
  featured: boolean;
  approved: boolean;
}

export interface Prize {
  prize_id: string;
  prize_name: string;
  sponsor_name: string;
  description: string;
  active: boolean;
}

export interface Winner {
  prize_id: string;
  year: number;
  team_name: string;
  project_name: string;
  description: string;
  members: string;
}

export interface JoinFormData {
  name: string;
  email: string;
  year: string;
  role: Role;
  school?: string;
  what_i_did?: string;
  headshot_url?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SupportFormData {
  name: string;
  email: string;
  type: "donate" | "sponsor";
  donation_range?: string;
  message?: string;
  prize_name?: string;
  prize_description?: string;
  prize_criteria?: string;
  preferred_year?: string;
}
