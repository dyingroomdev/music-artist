// path: admin-frontend/src/lib/apiClient.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("mehreen_admin_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await api.post<{ url: string }>("/admin/upload-image", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data.url;
};

export const getAdminUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

export const createAdminUser = async (payload: { username: string; password: string; role: string; is_active: boolean }) => {
  const res = await api.post("/admin/users", payload);
  return res.data;
};

export const updateAdminUser = async (id: number, payload: { password?: string; role?: string; is_active?: boolean }) => {
  const res = await api.put(`/admin/users/${id}`, payload);
  return res.data;
};

export const deleteAdminUser = async (id: number) => {
  await api.delete(`/admin/users/${id}`);
};

export const getSeoSettings = async () => {
  const res = await api.get("/seo");
  return res.data;
};

export const saveSeoSettings = async (payload: { meta_title?: string; meta_description?: string; og_image_url?: string }) => {
  const res = await api.put("/seo", payload);
  return res.data;
};

// Media library
export interface MediaItem {
  filename: string;
  size: number;
  modified_at: string;
  url: string;
}

export const listMedia = async (): Promise<MediaItem[]> => {
  const res = await api.get("/admin/media");
  return res.data;
};

export const deleteMedia = async (filename: string) => {
  await api.delete(`/admin/media/${encodeURIComponent(filename)}`);
};

// Music player settings
export interface MusicPlayerSettings {
  id: number;
  title: string;
  artist: string;
  audio_url?: string | null;
  cover_url?: string | null;
  updated_at: string;
}

export const getMusicPlayerSettings = async (): Promise<MusicPlayerSettings | null> => {
  const res = await api.get("/music-player");
  return res.data;
};

export const saveMusicPlayerSettings = async (payload: {
  title?: string;
  artist?: string;
  audio_url?: string | null;
  cover_url?: string | null;
}) => {
  const res = await api.put("/music-player", payload);
  return res.data;
};
