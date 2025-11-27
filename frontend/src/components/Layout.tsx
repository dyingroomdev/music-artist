// path: frontend/src/components/Layout.tsx
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.15),transparent_25%),radial-gradient(circle_at_80%_10%,rgba(79,70,229,0.18),transparent_20%),linear-gradient(135deg,#020617,#0b1224)]" />
      <div className="relative pb-20">{children}</div>
    </div>
  );
};

export default Layout;
