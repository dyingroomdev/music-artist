// path: frontend/src/hooks/useYouTubeVideos.ts
import { useEffect, useState } from "react";
import { formatDate } from "../lib/formatters";

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  publishedAt: string;
  url: string;
}

interface HookState {
  data: YouTubeVideo[];
  loading: boolean;
  error: string | null;
}

const YT_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
const YT_PLAYLIST_ITEMS_URL = "https://www.googleapis.com/youtube/v3/playlistItems";
const DEFAULT_PLAYLIST_ID = "PLohUukgPOsEZlScot7UAtT87lMQuO6bJL";

export const useYouTubeVideos = (maxResults = 6): HookState => {
  const [data, setData] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const apiKey = import.meta.env.VITE_YT_API_KEY;
    const playlistId = import.meta.env.VITE_YT_CHANNEL_ID || DEFAULT_PLAYLIST_ID;

    const fallback = [
      {
        id: "2UaN1kJvK3M",
        title: "Playlist Video 1",
        thumbnailUrl: "https://i.ytimg.com/vi/2UaN1kJvK3M/hqdefault.jpg",
        publishedAt: formatDate(new Date().toISOString()),
        url: "https://www.youtube.com/watch?v=2UaN1kJvK3M"
      },
      {
        id: "y7rW0ZsYNdU",
        title: "Playlist Video 2",
        thumbnailUrl: "https://i.ytimg.com/vi/y7rW0ZsYNdU/hqdefault.jpg",
        publishedAt: formatDate(new Date().toISOString()),
        url: "https://www.youtube.com/watch?v=y7rW0ZsYNdU"
      },
      {
        id: "8Zrcd8Bn2xo",
        title: "Playlist Video 3",
        thumbnailUrl: "https://i.ytimg.com/vi/8Zrcd8Bn2xo/hqdefault.jpg",
        publishedAt: formatDate(new Date().toISOString()),
        url: "https://www.youtube.com/watch?v=8Zrcd8Bn2xo"
      }
    ];

    if (!apiKey) {
      setData(fallback);
      setLoading(false);
      setError("YouTube API key missing. Showing fallback playlist items.");
      return;
    }

    const fetchVideos = async () => {
      try {
        const params = new URLSearchParams({
          part: "snippet",
          playlistId,
          maxResults: maxResults.toString(),
          key: apiKey
        });
        const res = await fetch(`${YT_PLAYLIST_ITEMS_URL}?${params.toString()}`);
        if (!res.ok) {
          throw new Error("YouTube fetch failed");
        }
        const json = await res.json();
        const items = (json.items || []) as any[];
        const mapped: YouTubeVideo[] = items.map((item) => ({
          id: item.snippet.resourceId?.videoId || item.id,
          title: item.snippet.title,
          thumbnailUrl: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || "",
          publishedAt: formatDate(item.snippet.publishedAt),
          url: `https://www.youtube.com/watch?v=${item.snippet.resourceId?.videoId || item.id}`
        }));
        if (isMounted) setData(mapped);
      } catch (err) {
        if (isMounted) {
          setError("Unable to load YouTube videos. Showing fallback playlist items.");
          setData(fallback);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchVideos();
    return () => {
      isMounted = false;
    };
  }, [maxResults]);

  return { data, loading, error };
};
