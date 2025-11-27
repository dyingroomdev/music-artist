import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import { deleteMedia, listMedia, MediaItem, uploadImage } from "../lib/apiClient";

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const MediaPage: React.FC = () => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await listMedia();
      setItems(data);
      setError(null);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to load media");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await uploadImage(file);
      await load();
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (filename: string) => {
    if (!confirm(`Delete ${filename}?`)) return;
    try {
      await deleteMedia(filename);
      await load();
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Delete failed");
    }
  };

  return (
    <AdminLayout title="Media Library">
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Uploaded Media</h2>
            <p className="text-sm text-slate-400">Manage files stored in the backend media folder.</p>
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(59,130,246,0.35)] transition hover:scale-[1.02]">
            {uploading ? "Uploading..." : "Upload"}
            <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
          </label>
        </div>

        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.filename}
                className="rounded-xl border border-slate-800/70 bg-slate-900/70 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-semibold text-white break-all">{item.filename}</p>
                    <p className="text-sm text-slate-400">{formatSize(item.size)}</p>
                    <p className="text-xs text-slate-500">
                      Updated {new Date(item.modified_at).toLocaleString()}
                    </p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm font-semibold text-sky-300 hover:text-sky-200"
                    >
                      View
                    </a>
                  </div>
                  <button
                    onClick={() => handleDelete(item.filename)}
                    className="text-sm font-semibold text-rose-300 hover:text-rose-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <div className="col-span-full rounded-xl border border-dashed border-slate-800/70 bg-slate-900/60 p-6 text-center text-slate-400">
                No media uploaded yet.
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default MediaPage;
