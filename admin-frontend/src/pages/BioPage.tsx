// path: admin-frontend/src/pages/BioPage.tsx
import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { useBioAdmin } from "../hooks/useBioAdmin";
import BioForm from "../components/BioForm";
import DOMPurify from "dompurify";
import ToastContainer from "../components/ToastContainer";
import { useToast } from "../lib/useToast";

export const BioPage: React.FC = () => {
  const { latestBio, loading, error, saveNew, saveExisting, refresh } = useBioAdmin();
  const [currentBio, setCurrentBio] = useState(latestBio || null);
  const { toasts, addToast } = useToast();

  useEffect(() => {
    setCurrentBio(latestBio || null);
  }, [latestBio]);

  const handleSave = async (values: any) => {
    if (currentBio) {
      await saveExisting(currentBio.id, values);
      addToast("Bio updated");
    } else {
      await saveNew(values);
      addToast("Bio saved");
    }
    await refresh();
  };

  return (
    <AdminLayout title="Bio">
      <ToastContainer toasts={toasts} />
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Artist Bio</h2>
          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
        </div>
      </div>
      {loading ? (
        <p className="text-sm text-slate-300">Loading...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <BioForm initial={currentBio || undefined} onSubmit={handleSave} />
          </div>
            <div className="rounded-xl bg-gradient-to-br from-slate-900/70 to-slate-950/70 p-4 border border-slate-800/70 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
            <h3 className="text-lg font-semibold text-white mb-2">Preview</h3>
            <div
              className="prose prose-invert max-w-none text-sm"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentBio?.content || "No bio content yet.") }}
            />
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default BioPage;
