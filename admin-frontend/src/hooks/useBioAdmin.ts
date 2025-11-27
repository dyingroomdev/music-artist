// path: admin-frontend/src/hooks/useBioAdmin.ts
import { useEffect, useState } from "react";
import api from "../lib/apiClient";
import { Bio } from "../lib/types";

export const useBioAdmin = () => {
  const [bios, setBios] = useState<Bio[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const listBios = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<Bio[]>("/admin/bio");
      setBios(res.data);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to load bios");
    } finally {
      setLoading(false);
    }
  };

  const createBio = async (payload: Partial<Bio>) => {
    await api.post("/admin/bio", payload);
    await listBios();
  };

  const updateBio = async (id: number, payload: Partial<Bio>) => {
    await api.put(`/admin/bio/${id}`, payload);
    await listBios();
  };

  useEffect(() => {
    listBios();
  }, []);

  const latestBio = bios.length > 0 ? bios[0] : null;

  return { bios, latestBio, loading, error, refresh: listBios, saveNew: createBio, saveExisting: updateBio };
};
