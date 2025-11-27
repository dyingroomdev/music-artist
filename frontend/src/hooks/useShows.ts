// path: frontend/src/hooks/useShows.ts
import { useEffect, useState } from "react";
import { Show, ShowsResponse, getShows } from "../lib/apiClient";

type ShowsGrouped = {
  upcoming: Show[];
  past: Show[];
};

interface HookState {
  data: ShowsGrouped | null;
  loading: boolean;
  error: string | null;
}

export const useShows = (): HookState => {
  const [data, setData] = useState<ShowsGrouped | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchShows = async () => {
      try {
        const shows = await getShows();
        if (!isMounted) return;
        if (Array.isArray(shows)) {
          setData({ upcoming: shows, past: [] });
        } else {
          const upcoming = Array.isArray((shows as any).upcoming) ? (shows as any).upcoming : [];
          const past = Array.isArray((shows as any).past) ? (shows as any).past : [];
          setData({ upcoming, past });
        }
      } catch (err) {
        if (!isMounted) return;
        setError("Unable to load shows.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchShows();
    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
};
