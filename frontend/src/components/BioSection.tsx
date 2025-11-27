// path: frontend/src/components/BioSection.tsx
import React from "react";
import DOMPurify from "dompurify";
import { useBio } from "../hooks/useBio";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "";
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date(dateString));
};

export const BioSection: React.FC = () => {
  const { data, loading, error } = useBio();

  return (
    <section id="about" className="my-16 px-2 md:px-0">
      {loading ? (
        <div className="mt-6">
          <LoadingState />
        </div>
      ) : error || !data ? (
        <div className="mt-6">
          <ErrorState message={error || "Bio not available"} />
        </div>
      ) : (
        <div className="relative mx-auto max-w-6xl">
          <div className="absolute inset-0 pointer-events-none blur-3xl bg-gradient-to-br from-purple-800/20 via-indigo-700/10 to-transparent" />
          <div className="relative rounded-[32px] bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950/90 p-[1px] shadow-[0_20px_70px_rgba(0,0,0,0.45)]">
            <div className="rounded-[30px] bg-slate-950/80 p-6 md:p-10 flex flex-col gap-8 md:flex-row">
              <div className="flex-shrink-0">
                {data.profile_image_url ? (
                  <div className="overflow-hidden rounded-3xl border border-slate-800/80 shadow-xl">
                    <img
                      src={data.profile_image_url}
                      alt={data.headline}
                      className="h-[360px] w-[320px] md:h-[420px] md:w-[360px] lg:h-[460px] lg:w-[420px] object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-72 w-72 items-center justify-center rounded-3xl border border-dashed border-slate-700 text-slate-400">
                    Portrait coming soon
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-4 text-slate-200">
                <div className="text-xs uppercase tracking-[0.25em] text-slate-400">Biography</div>
                <h3 className="text-3xl md:text-4xl font-bold text-white">{data.headline}</h3>
                <div
                  className="prose prose-invert max-w-none prose-p:text-slate-200 prose-a:text-blue-300 prose-strong:text-white"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.content) }}
                />
                <div className="flex gap-3 pt-2">
                  <a
                    href="https://www.instagram.com/mehreen.music"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-slate-800/70 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://facebook.com/mehreenofficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BioSection;
