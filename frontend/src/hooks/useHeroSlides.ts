// path: frontend/src/hooks/useHeroSlides.ts
import { useEffect, useState } from "react";
import { HeroSlide, getHeroSlides } from "../lib/apiClient";

interface HookState {
  data: HeroSlide[];
  loading: boolean;
  error: string | null;
}

export const useHeroSlides = (): HookState => {
  const [data, setData] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchSlides = async () => {
      try {
        const slides = await getHeroSlides();
        if (!isMounted) return;
        setData(Array.isArray(slides) ? slides : []);
      } catch (err) {
        if (!isMounted) return;
        setError("Unable to load hero slides.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchSlides();
    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
};
