// path: frontend/src/components/LatestReleases.tsx
import React from "react";
import YouTubeList from "./YouTubeList";
import SpotifyList from "./SpotifyList";

export const LatestReleases: React.FC = () => {
  return (
    <section id="releases" className="my-16">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white md:text-3xl">Discography</h2>
      </div>
      <div className="flex flex-col gap-6">
        <YouTubeList />
        <SpotifyList />
      </div>
    </section>
  );
};

export default LatestReleases;
