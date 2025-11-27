// path: admin-frontend/src/layouts/AdminLayout.tsx
import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

interface Props {
  title: string;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/80 to-slate-950 text-slate-100">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title={title} />
        <main className="flex-1 overflow-y-auto p-8 bg-transparent">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
