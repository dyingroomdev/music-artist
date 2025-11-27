// path: frontend/src/components/YouTubeList.tsx
import React from "react";
import { useYouTubeVideos } from "../hooks/useYouTubeVideos";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

export const YouTubeList: React.FC = () => {
  const { data, loading, error } = useYouTubeVideos(3);

  return (
    <div className="p-4 bg-slate-900/30 rounded-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Jukebox</h3>
        <a
          href="https://youtube.com/@mehreenofficial"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-slate-400 hover:text-white"
          aria-label="Open YouTube"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M19.6 7.2s-.2-1.4-.8-2c-.7-.8-1.6-.8-2-.9C14.8 4 12 4 12 4s-2.8 0-4.8.3c-.4.1-1.3.1-2 .9-.6.6-.8 2-.8 2S4 8.8 4 10.4v1.2c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.7.8 1.6.8 2 .9C8.8 18 12 18 12 18s2.8 0 4.8-.3c.4-.1 1.3-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.2c0-1.6-.2-3.2-.2-3.2zM10 14.7V8.8l5.3 2.95L10 14.7z" />
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
        <p className="mt-4 text-sm text-slate-300">Videos will appear here when configured.</p>
      ) : (
        <div className="mt-4 space-y-4">
          {data.map((video) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex gap-4 rounded-xl bg-slate-950/40 p-3 transition hover:-translate-y-1"
            >
              <div className="aspect-video w-48 flex-shrink-0 overflow-hidden rounded-lg bg-slate-900">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-400">{video.publishedAt}</p>
                <h4 className="mt-1 text-lg font-semibold text-white">{video.title}</h4>
                <p className="text-sm text-blue-300 mt-2">Watch on YouTube →</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default YouTubeList;
