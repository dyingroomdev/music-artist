// path: frontend/src/components/SpotifyList.tsx
import React from "react";
import { useSpotifyTracks } from "../hooks/useSpotifyTracks";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

export const SpotifyList: React.FC = () => {
  const { data, loading, error } = useSpotifyTracks();

  return (
    <div className="p-4 bg-slate-900/30 rounded-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Albums</h3>
        <a
          href="https://open.spotify.com/artist/1R7tq9CfGc6ohah9L9VGuL"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-slate-400 hover:text-white"
          aria-label="Open Spotify"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M12 1.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5zm4.4 14.33a.75.75 0 0 1-1.03.26c-2.82-1.72-6.37-2.1-10.56-1.14a.75.75 0 1 1-.32-1.46c4.56-1.04 8.48-.6 11.68 1.31.36.22.47.69.23 1.03zM17.7 12.9a.9.9 0 0 1-1.25.31c-2.56-1.57-6.47-2.02-9.51-1.09a.9.9 0 0 1-.52-1.72c3.49-1.05 7.83-.54 10.8 1.24a.9.9 0 0 1 .48 1.26zm.08-2.76c-3.08-1.83-8.16-2-11.07-1.09a1.05 1.05 0 0 1-.6-2.01c3.35-1.01 8.03-.78 11.61 1.31a1.05 1.05 0 1 1-1.08 1.79z" />
          </svg>
        </a>
      </div>
      {loading ? (
        <div className="mt-4 space-y-3">
          <LoadingState variant="card" />
          <LoadingState variant="card" />
        </div>
      ) : error ? (
        <div className="mt-4">
          <ErrorState message={error} />
        </div>
      ) : data.length === 0 ? (
        <p className="mt-4 text-sm text-slate-300">Tracks will appear here when Spotify is connected.</p>
      ) : (
        <div className="mt-4 space-y-3">
          {data.map((track) => (
            <a
              key={track.id}
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-slate-950/40 p-3 transition hover:-translate-y-0.5 hover:bg-slate-900/60"
            >
              <div className="h-14 w-14 overflow-hidden rounded-lg bg-slate-800">
                <img src={track.imageUrl} alt={track.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{track.name}</p>
                <p className="text-xs text-slate-300">{track.album}</p>
                <p className="text-[11px] text-slate-400">{track.releaseDate}</p>
              </div>
              <span className="text-sm font-semibold text-blue-300 opacity-0 transition group-hover:opacity-100">
                Listen →
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpotifyList;
