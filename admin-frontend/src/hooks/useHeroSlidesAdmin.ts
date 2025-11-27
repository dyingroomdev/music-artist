// path: admin-frontend/src/hooks/useHeroSlidesAdmin.ts
import { useEffect, useState } from "react";
import api from "../lib/apiClient";
import { HeroSlide } from "../lib/types";

export const useHeroSlidesAdmin = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const listHeroSlides = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<HeroSlide[]>("/admin/hero-slides");
      setSlides(res.data);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to load slides");
    } finally {
      setLoading(false);
    }
  };

  const createHeroSlide = async (payload: Partial<HeroSlide>) => {
    await api.post("/admin/hero-slides", payload);
    await listHeroSlides();
  };

  const updateHeroSlide = async (id: number, payload: Partial<HeroSlide>) => {
    await api.put(`/admin/hero-slides/${id}`, payload);
    await listHeroSlides();
  };

  const deleteHeroSlide = async (id: number) => {
    await api.delete(`/admin/hero-slides/${id}`);
    await listHeroSlides();
  };

  useEffect(() => {
    listHeroSlides();
  }, []);

  return {
    slides,
    loading,
    error,
    refresh: listHeroSlides,
    create: createHeroSlide,
    update: updateHeroSlide,
    remove: deleteHeroSlide
  };
};
