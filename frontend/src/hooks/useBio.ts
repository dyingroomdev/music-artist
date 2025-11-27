// path: frontend/src/hooks/useBio.ts
import { useEffect, useState } from "react";
import { Bio, getBio } from "../lib/apiClient";

interface HookState {
  data: Bio | null;
  loading: boolean;
  error: string | null;
}

export const useBio = (): HookState => {
  const [data, setData] = useState<Bio | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchBio = async () => {
      try {
        const bio = await getBio();
        if (!isMounted) return;
        setData(bio);
      } catch (err) {
        if (!isMounted) return;
        setError("Unable to load bio.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchBio();
    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
};
