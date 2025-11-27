// path: frontend/src/hooks/useSpotifyTracks.ts
import { useEffect, useState } from "react";
import { formatDate } from "../lib/formatters";
import { getSpotifyAlbums, SpotifyAlbum } from "../lib/apiClient";

export interface SpotifyTrack {
  id: string;
  name: string;
  album: string;
  releaseDate: string;
  imageUrl: string;
  url: string;
}

interface HookState {
  data: SpotifyTrack[];
  loading: boolean;
  error: string | null;
}

export const useSpotifyTracks = (): HookState => {
  const [data, setData] = useState<SpotifyTrack[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchTracks = async () => {
      try {
        const albums = await getSpotifyAlbums();
        if (!isMounted) return;
        const mapped: SpotifyTrack[] = albums.map((album: SpotifyAlbum) => ({
          id: album.id,
          name: album.name,
          album: album.album,
          releaseDate: formatDate(album.releaseDate),
          imageUrl: album.imageUrl,
          url: album.url
        }));
        setData(mapped);
      } catch (err: any) {
        if (isMounted) {
          setError(err?.response?.data?.detail || "Unable to load Spotify albums.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchTracks();
    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
};
