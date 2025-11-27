// path: admin-frontend/src/lib/authClient.ts
import api from "./apiClient";
import { Token } from "./types";

const TOKEN_KEY = "mehreen_admin_token";

export const login = async (username: string, password: string): Promise<void> => {
  const res = await api.post<Token>("/auth/login", { username, password });
  localStorage.setItem(TOKEN_KEY, res.data.access_token);
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  return Boolean(localStorage.getItem(TOKEN_KEY));
};

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);
