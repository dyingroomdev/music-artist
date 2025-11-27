// path: admin-frontend/src/pages/DashboardPage.tsx
import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../lib/apiClient";
import { Bio, HeroSlide, Show } from "../lib/types";

export const DashboardPage: React.FC = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [bios, setBios] = useState<Bio[]>([]);
  const [shows, setShows] = useState<Show[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [slidesRes, biosRes, showsRes] = await Promise.all([
          api.get<HeroSlide[]>("/admin/hero-slides"),
          api.get<Bio[]>("/admin/bio"),
          api.get<Show[]>("/admin/shows")
        ]);
        setSlides(slidesRes.data);
        setBios(biosRes.data);
        setShows(showsRes.data);
      } catch {
        // ignore for overview
      }
    };
    load();
  }, []);

  const activeSlides = slides.filter((s) => s.is_active).length;
  const upcomingShows = shows.filter((s) => s.is_upcoming).length;
  const lastBioUpdated = bios.length > 0 ? new Date(bios[0].updated_at).toLocaleString() : "N/A";

  const cards = [
    { label: "Active Hero Slides", value: activeSlides },
    { label: "Upcoming Shows", value: upcomingShows },
    { label: "Bio Last Updated", value: lastBioUpdated }
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-slate-800/70">
            <p className="text-sm text-slate-400">{card.label}</p>
            <p className="mt-3 text-2xl font-semibold text-white">{card.value}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
