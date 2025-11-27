// path: admin-frontend/src/components/Sidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/hero-slides", label: "Hero Slides" },
  { to: "/bio", label: "Bio" },
  { to: "/shows", label: "Shows" },
  { to: "/media", label: "Media" },
  { to: "/music-player", label: "Music Player" },
  { to: "/admin-users", label: "Admins" },
  { to: "/seo", label: "SEO" }
];

export const Sidebar: React.FC = () => {
  const apiBase = import.meta.env.VITE_API_BASE_URL?.replace(/\/api\/?$/, "") || "";
  const logoUrl = `${apiBase}/media/logo.png`;

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-950/90 to-slate-900/80 backdrop-blur-lg p-5 space-y-3 border-r border-slate-800/60">
      <div className="mb-6 px-2 text-lg font-bold text-white flex items-center gap-2">
        <img src={logoUrl} alt="Mehreen" className="h-8 w-8 object-contain" />
        <span>Admin</span>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `block rounded-lg px-3 py-2 text-sm font-semibold transition ${
                isActive ? "bg-slate-800 text-white shadow-glow" : "text-slate-300 hover:bg-slate-800/70"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
