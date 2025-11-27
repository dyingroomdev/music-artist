// path: admin-frontend/src/components/Topbar.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../lib/authClient";

interface Props {
  title: string;
}

export const Topbar: React.FC<Props> = ({ title }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="flex items-center justify-between bg-slate-900/60 px-8 py-4 border-b border-slate-800/70 backdrop-blur">
      <h1 className="text-xl font-semibold text-white tracking-tight">{title}</h1>
      <button
        onClick={handleLogout}
        className="rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
      >
        Logout
      </button>
    </div>
  );
};

export default Topbar;
