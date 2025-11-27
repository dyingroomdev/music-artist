// path: frontend/src/components/InstagramGrid.tsx
import React from "react";
import { useInstagramFeed } from "../hooks/useInstagramFeed";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import { truncate } from "../lib/formatters";

export const InstagramGrid: React.FC = () => {
  const { data, loading, error } = useInstagramFeed();

  return (
    <section id="instagram" className="my-12 p-2 md:p-0">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-white md:text-3xl">Instagram Highlights</h2>
      </div>

      {loading ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <LoadingState key={i} variant="card" className="aspect-square" />
          ))}
        </div>
      ) : error ? (
        <div className="mt-6">
          <ErrorState message={error} />
        </div>
      ) : data.length === 0 ? (
        <p className="mt-6 text-sm text-slate-300">Instagram feed coming soon.</p>
      ) : (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {data.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden bg-slate-950/40"
            >
              <img src={post.imageUrl} alt={post.caption} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 transition group-hover:opacity-100">
                <p className="p-3 text-sm text-slate-100">{truncate(post.caption, 80)}</p>
              </div>
              <span className="absolute right-2 top-2 bg-black/70 px-3 py-1 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100">
                View on Instagram
              </span>
            </a>
          ))}
        </div>
      )}
    </section>
  );
};

export default InstagramGrid;
