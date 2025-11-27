// path: frontend/src/components/ShowsSection.tsx
import React from "react";
import { useShows } from "../hooks/useShows";
import { Show } from "../lib/apiClient";
import { formatDate, formatTime } from "../lib/formatters";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

export const ShowsSection: React.FC = () => {
  const { data, loading, error } = useShows();
  const upcoming = data?.upcoming ?? [];
  const past = data?.past ?? [];
  const combined = [...upcoming.slice(0, 7), ...past.slice(0, 3)];

  const renderCard = (show: Show) => (
    <div
      key={show.id}
      className="group flex flex-col overflow-hidden rounded-2xl bg-slate-900/50 transition hover:-translate-y-1 hover:bg-slate-900/70"
    >
      <div className="flex flex-col md:flex-row">
        {show.featured_image_url ? (
          <div className="md:w-64 w-full h-48 md:h-auto flex-shrink-0 overflow-hidden">
            <img
              src={show.featured_image_url}
              alt={show.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        ) : null}
        <div className="flex-1 p-4 md:p-6 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-slate-400 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current text-slate-400">
                  <path d="M12 2a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-.75 1.8a7.2 7.2 0 0 1 1.5 0v2.4h-1.5V3.8zm-1.5.3v2.1H6.9a7.22 7.22 0 0 1 2.85-2.1zm4.5 0a7.22 7.22 0 0 1 2.85 2.1h-2.85V4.1zM5.2 7.7H8.1v2.4H3.9a7.14 7.14 0 0 1 1.3-2.4zm10.7 0h2.9a7.14 7.14 0 0 1 1.3 2.4H15.9V7.7zm-5.1 0h2.25v2.4H10.8V7.7zm-5.7 3.9h4.2v2.4H5a7.08 7.08 0 0 1-.9-2.4zm6.6 0h2.25v2.4H11.7v-2.4zm4.2 0h4.2c-.15.86-.47 1.66-.9 2.4h-3.3v-2.4zm-8.1 3.9h2.85v2.1a7.26 7.26 0 0 1-2.85-2.1zm4.35 0h1.5v2.4a7.2 7.2 0 0 1-1.5 0v-2.4zm3 0h2.85a7.26 7.26 0 0 1-2.85 2.1v-2.1z" />
                </svg>
                {show.city}, {show.country}
              </p>
              <h3 className="text-lg font-semibold text-white">{show.title}</h3>
              <p className="text-sm text-slate-300 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current text-slate-400">
                  <path d="M12 2C8.7 2 6 4.7 6 8c0 4.1 5 9.7 5.3 10l.7.7.7-.7C13 17.7 18 12.1 18 8c0-3.3-2.7-6-6-6zm0 8.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 5.5 12 5.5s2.5 1.1 2.5 2.5S13.4 10.5 12 10.5z" />
                </svg>
                {show.venue}
              </p>
            </div>
            <div className="rounded-lg bg-indigo-900/70 px-3 py-2 text-center text-xs font-semibold text-indigo-100">
              {formatDate(show.show_date)}
              {show.start_time ? <div className="text-[11px] text-indigo-200/90">{formatTime(show.start_time)}</div> : null}
            </div>
          </div>
          {show.description ? <p className="text-sm text-slate-300">{show.description}</p> : null}
          {show.ticket_url ? (
            <div className="pt-2">
              <a
                href={show.ticket_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.01]"
              >
                Get Tickets
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );

  return (
    <section id="shows" className="my-16 p-2 md:p-0">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-white md:text-3xl">Shows</h2>
      </div>

      {loading ? (
        <div className="mt-6 space-y-4">
          <LoadingState variant="card" />
          <LoadingState variant="card" />
        </div>
      ) : error || !data ? (
        <div className="mt-6">
          <ErrorState message={error || "Shows unavailable."} />
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {combined.length === 0 ? (
            <p className="text-sm text-slate-300">No shows available.</p>
          ) : (
            combined.map(renderCard)
          )}
        </div>
      )}
    </section>
  );
};

export default ShowsSection;
