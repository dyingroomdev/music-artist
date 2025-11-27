// path: admin-frontend/src/App.tsx
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import HeroSlidesPage from "./pages/HeroSlidesPage";
import BioPage from "./pages/BioPage";
import ShowsPage from "./pages/ShowsPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import SEOPage from "./pages/SEOPage";
import MediaPage from "./pages/MediaPage";
import MusicPlayerPage from "./pages/MusicPlayerPage";
import { isAuthenticated } from "./lib/authClient";

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }
        />
        <Route
          path="/hero-slides"
          element={
            <RequireAuth>
              <HeroSlidesPage />
            </RequireAuth>
          }
        />
        <Route
          path="/bio"
          element={
            <RequireAuth>
              <BioPage />
            </RequireAuth>
          }
        />
        <Route
          path="/shows"
          element={
            <RequireAuth>
              <ShowsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/media"
          element={
            <RequireAuth>
              <MediaPage />
            </RequireAuth>
          }
        />
        <Route
          path="/music-player"
          element={
            <RequireAuth>
              <MusicPlayerPage />
            </RequireAuth>
          }
        />
        <Route
          path="/admin-users"
          element={
            <RequireAuth>
              <AdminUsersPage />
            </RequireAuth>
          }
        />
        <Route
          path="/seo"
          element={
            <RequireAuth>
              <SEOPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
