import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import { getMusicPlayerSettings, saveMusicPlayerSettings, uploadImage } from "../lib/apiClient";

export const MusicPlayerPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getMusicPlayerSettings();
      setTitle(data?.title || "");
      setArtist(data?.artist || "Mehreen");
      setAudioUrl(data?.audio_url || "");
      setCoverUrl(data?.cover_url || "");
      setError(null);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to load music player settings");
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
      await saveMusicPlayerSettings({
        title,
        artist,
        audio_url: audioUrl,
        cover_url: coverUrl
      });
      await load();
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage(file);
      setter(url);
      setError(null);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Upload failed");
    } finally {
      e.target.value = "";
    }
  };

  return (
    <AdminLayout title="Music Player">
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : (
        <div className="space-y-6 rounded-2xl bg-slate-900/80 p-6 border border-slate-800/70 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-200">Song Title</label>
              <input className="input-primary" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-200">Artist</label>
              <input className="input-primary" value={artist} onChange={(e) => setArtist(e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-200">Audio URL</label>
              <div className="flex gap-2">
                <input className="input-primary flex-1" value={audioUrl} onChange={(e) => setAudioUrl(e.target.value)} />
                <label className="btn-secondary cursor-pointer px-4 py-2 text-sm">
                  Upload
                  <input type="file" className="hidden" accept="audio/*" onChange={(e) => handleFileUpload(e, setAudioUrl)} />
                </label>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-200">Cover URL</label>
              <div className="flex gap-2">
                <input className="input-primary flex-1" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} />
                <label className="btn-secondary cursor-pointer px-4 py-2 text-sm">
                  Upload
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, setCoverUrl)} />
                </label>
              </div>
            </div>
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

export default MusicPlayerPage;
