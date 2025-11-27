// path: frontend/src/hooks/useInstagramFeed.ts
import { useEffect, useState } from "react";
import { truncate } from "../lib/formatters";

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  permalink: string;
}

interface HookState {
  data: InstagramPost[];
  loading: boolean;
  error: string | null;
}

export const useInstagramFeed = (limit = 12): HookState => {
  const [data, setData] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const endpoint = import.meta.env.VITE_INSTAGRAM_FEED_ENDPOINT;
    if (!endpoint) {
      setLoading(false);
      setError("Instagram feed not configured yet.");
      return;
    }

    let isMounted = true;
    const fetchFeed = async () => {
      try {
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error("Instagram fetch failed");
        const posts = await res.json();
        if (!Array.isArray(posts)) throw new Error("Invalid instagram data");
        const limited = posts.slice(0, limit).map((p: any) => ({
          id: String(p.id),
          imageUrl: p.imageUrl || p.image_url || "",
          caption: truncate(p.caption || "", 120),
          permalink: p.permalink || "#"
        }));
        if (isMounted) setData(limited);
      } catch (err) {
        if (isMounted) setError("Unable to load Instagram feed.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchFeed();
    return () => {
      isMounted = false;
    };
  }, [limit]);

  return { data, loading, error };
};
