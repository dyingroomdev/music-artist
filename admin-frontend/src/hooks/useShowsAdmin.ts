// path: admin-frontend/src/hooks/useShowsAdmin.ts
import { useEffect, useState } from "react";
import api from "../lib/apiClient";
import { Show } from "../lib/types";

export const useShowsAdmin = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const listShows = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<Show[]>("/admin/shows");
      setShows(res.data);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to load shows");
    } finally {
      setLoading(false);
    }
  };

  const createShow = async (payload: Partial<Show>) => {
    await api.post("/admin/shows", payload);
    await listShows();
  };

  const updateShow = async (id: number, payload: Partial<Show>) => {
    await api.put(`/admin/shows/${id}`, payload);
    await listShows();
  };

  const deleteShow = async (id: number) => {
    await api.delete(`/admin/shows/${id}`);
    await listShows();
  };

  useEffect(() => {
    listShows();
  }, []);

  const upcoming = shows.filter((s) => s.is_upcoming);
  const past = shows.filter((s) => !s.is_upcoming);

  return {
    shows,
    upcoming,
    past,
    loading,
    error,
    refresh: listShows,
    create: createShow,
    update: updateShow,
    remove: deleteShow
  };
};
