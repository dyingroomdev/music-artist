// path: admin-frontend/src/pages/SEOPage.tsx
import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { getSeoSettings, saveSeoSettings } from "../lib/apiClient";
import { SEOSettings } from "../lib/types";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

export const SEOPage: React.FC = () => {
  const [data, setData] = useState<SEOSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [ogImageUrl, setOgImageUrl] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const res = await getSeoSettings();
      setData(res);
      setMetaTitle(res?.meta_title || "");
      setMetaDescription(res?.meta_description || "");
      setOgImageUrl(res?.og_image_url || "");
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to load SEO settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSeoSettings({
        meta_title: metaTitle,
        meta_description: metaDescription,
        og_image_url: ogImageUrl
      });
      await load();
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to save SEO settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="SEO Settings">
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} />
      ) : (
        <div className="space-y-4 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 border border-slate-800/70 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-200">Meta Title</label>
            <input
              className="input-primary"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-200">Meta Description</label>
            <textarea
              rows={4}
              className="input-primary"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-200">OG Image URL</label>
            <input
              className="input-primary"
              value={ogImageUrl}
              onChange={(e) => setOgImageUrl(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button className="btn-primary px-6 py-3" onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default SEOPage;
