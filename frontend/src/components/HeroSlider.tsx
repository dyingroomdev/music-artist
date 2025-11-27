// path: frontend/src/components/HeroSlider.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useHeroSlides } from "../hooks/useHeroSlides";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

const AUTO_ADVANCE_MS = 6000;

export const HeroSlider: React.FC = () => {
  const { data: slides, loading, error } = useHeroSlides();
  const fallbackSlides = useMemo(
    () => [
      {
        id: 0,
        title: "Bangladeshi Pop, Reimagined",
        subtitle: "Moonlit vocals and electric beats from Dhaka to the world.",
        image_url:
          "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1400&q=80",
        cta_label: "Watch on YouTube",
        cta_url: "https://youtube.com/@mehreenofficial"
      }
    ],
    []
  );

  const normalizedSlides = Array.isArray(slides) ? slides : [];
  const activeSlides = normalizedSlides.length > 0 ? normalizedSlides : fallbackSlides;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setCurrent(0);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % activeSlides.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  const goTo = (index: number) => setCurrent((index + activeSlides.length) % activeSlides.length);

  const slide = activeSlides[current];

  return (
    <section id="home" className="relative isolate w-screen min-h-screen overflow-hidden">
      {loading ? (
        <LoadingState variant="hero" />
      ) : error && normalizedSlides.length === 0 ? (
        <ErrorState message={error} />
      ) : (
        <>
          <div className="absolute inset-0" aria-hidden>
            {activeSlides.map((s, idx) => (
              <div
                key={s.id ?? idx}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-800 ease-in-out ${
                  idx === current ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  backgroundImage: `url(${s.image_url})`,
                  transform: "scale(1.05)"
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" aria-hidden />
          <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.25),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.25),transparent_30%)]" />
          <div className="relative z-10 flex h-full min-h-screen items-center">
            <div className="w-full px-6 py-16 md:px-12 lg:px-[15%]">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Mehreen</p>
              <h1 className="mt-6 max-w-3xl text-5xl font-extrabold tracking-tight text-white md:text-7xl">
                {slide.title}
              </h1>
              {slide.subtitle ? (
                <p className="mt-4 max-w-2xl text-xl text-slate-300 md:text-2xl">{slide.subtitle}</p>
              ) : null}
              {slide.cta_url ? (
                <div className="mt-8">
                  <a
                    href={slide.cta_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 px-7 py-3 text-base font-semibold text-white shadow-[0_10px_40px_rgba(59,130,246,0.35)] transition hover:scale-[1.02]"
                  >
                    {slide.cta_label || "Listen now"}
                  </a>
                </div>
              ) : null}
            </div>
          </div>
          {activeSlides.length > 1 ? (
            <>
              <div className="absolute inset-x-0 bottom-8 flex items-center justify-center gap-2">
                {activeSlides.map((_, idx) => (
                  <button
                    key={idx}
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={() => goTo(idx)}
                    className={`h-2 w-8 rounded-full transition ${
                      idx === current ? "bg-white" : "bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 md:px-6">
                <button
                  aria-label="Previous slide"
                  onClick={() => goTo(current - 1)}
                  className="pointer-events-auto text-3xl text-white/70 transition hover:text-white"
                >
                  ‹
                </button>
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 md:px-6">
                <button
                  aria-label="Next slide"
                  onClick={() => goTo(current + 1)}
                  className="pointer-events-auto text-3xl text-white/70 transition hover:text-white"
                >
                  ›
                </button>
              </div>
            </>
          ) : null}
        </>
      )}
    </section>
  );
};

export default HeroSlider;
