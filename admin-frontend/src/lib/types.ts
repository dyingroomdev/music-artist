// path: admin-frontend/src/lib/types.ts
export interface HeroSlide {
  id: number;
  title: string;
  subtitle?: string | null;
  image_url: string;
  cta_label?: string | null;
  cta_url?: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Bio {
  id: number;
  headline: string;
  content: string;
  profile_image_url?: string | null;
  updated_at: string;
}

export interface Show {
  id: number;
  title: string;
  venue: string;
  city: string;
  country: string;
  show_date: string;
  start_time?: string | null;
  is_upcoming: boolean;
  ticket_url?: string | null;
  featured_image_url?: string | null;
  description?: string | null;
  created_at: string;
}

export interface AdminUser {
  id: number;
  username: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

export interface SEOSettings {
  id: number;
  meta_title: string;
  meta_description?: string | null;
  og_image_url?: string | null;
  updated_at: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}
