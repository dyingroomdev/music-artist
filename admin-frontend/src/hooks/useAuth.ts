// path: admin-frontend/src/hooks/useAuth.ts
import { useState } from "react";
import { login as authLogin, logout as authLogout, isAuthenticated as checkAuth } from "../lib/authClient";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthed, setIsAuthed] = useState<boolean>(checkAuth());

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await authLogin(username, password);
      setIsAuthed(true);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Login failed");
      setIsAuthed(false);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authLogout();
    setIsAuthed(false);
  };

  return { isAuthenticated: isAuthed, loading, error, login, logout };
};
