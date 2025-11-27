// path: admin-frontend/src/pages/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const LoginPage: React.FC = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    try {
      await login(username, password);
      navigate("/");
    } catch (err: any) {
      setLocalError(err?.response?.data?.detail || "Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="w-full max-w-md rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.45)] border border-slate-800/70">
        <div className="flex items-center gap-3">
          <img src="http://localhost:8001/media/logo.png" alt="Mehreen" className="h-10 w-10 object-contain drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]" />
          <h1 className="text-2xl font-bold text-white">Admin</h1>
        </div>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-200">Username</label>
            <input
              required
              className="w-full rounded-lg bg-slate-800 px-3 py-2 text-sm text-white outline-none border border-slate-700 focus:border-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-200">
              <span>Password</span>
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="text-xs font-semibold text-blue-300 hover:text-blue-200"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              required
              type={showPassword ? "text" : "password"}
              className="w-full rounded-lg bg-slate-800 px-3 py-2 text-sm text-white outline-none border border-slate-700 focus:border-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-200">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="remember">Remember me</label>
          </div>
          {(localError || error) && <p className="text-sm text-rose-300">{localError || error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-glow hover:brightness-110 disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
