// path: frontend/src/lib/apiClient.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
});

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

export type ShowsResponse =
  | {
      upcoming: Show[];
      past: Show[];
    }
  | Show[];

export const getHeroSlides = async (): Promise<HeroSlide[]> => {
  const res = await api.get<HeroSlide[]>("/hero-slides");
  return res.data;
};

export const getBio = async (): Promise<Bio> => {
  const res = await api.get<Bio>("/bio");
  return res.data;
};

export const getShows = async (upcoming?: boolean, limit?: number): Promise<ShowsResponse> => {
  const res = await api.get<ShowsResponse>("/shows", {
    params: {
      upcoming,
      limit
    }
  });
  return res.data;
};

export interface SpotifyAlbum {
  id: string;
  name: string;
  album: string;
  releaseDate: string;
  imageUrl: string;
  url: string;
}

export const getSpotifyAlbums = async (): Promise<SpotifyAlbum[]> => {
  const res = await api.get<SpotifyAlbum[]>("/spotify/albums");
  return res.data;
};

export interface SEOSettings {
  meta_title: string;
  meta_description?: string | null;
  og_image_url?: string | null;
}

export const getSeoSettings = async (): Promise<SEOSettings | null> => {
  const res = await api.get<SEOSettings | null>("/seo");
  return res.data;
};

export interface MusicPlayerSettings {
  id: number;
  title: string;
  artist: string;
  audio_url?: string | null;
  cover_url?: string | null;
  updated_at: string;
}

export const getMusicPlayer = async (): Promise<MusicPlayerSettings | null> => {
  const res = await api.get<MusicPlayerSettings | null>("/music-player");
  return res.data;
};
