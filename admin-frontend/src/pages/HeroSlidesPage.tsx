// path: admin-frontend/src/pages/HeroSlidesPage.tsx
import React, { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { useHeroSlidesAdmin } from "../hooks/useHeroSlidesAdmin";
import Table from "../components/Table";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import HeroSlideForm from "../components/HeroSlideForm";
import { HeroSlide } from "../lib/types";
import { useToast } from "../lib/useToast";
import ToastContainer from "../components/ToastContainer";

export const HeroSlidesPage: React.FC = () => {
  const { slides, loading, error, create, update, remove } = useHeroSlidesAdmin();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<HeroSlide | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const { toasts, addToast } = useToast();

  const handleSave = async (values: Partial<HeroSlide>) => {
    try {
      if (editing) {
        await update(editing.id, values);
        addToast("Slide updated");
      } else {
        await create(values);
        addToast("Slide created");
      }
      setModalOpen(false);
      setEditing(null);
    } catch (err: any) {
      addToast(err?.response?.data?.detail || "Failed to save slide", "error");
    }
  };

  const columns = [
    { title: "Sort", render: (row: HeroSlide) => row.sort_order },
    { title: "Title", render: (row: HeroSlide) => row.title },
    { title: "Active", render: (row: HeroSlide) => (row.is_active ? "Yes" : "No") },
    { title: "Created", render: (row: HeroSlide) => new Date(row.created_at).toLocaleString() },
    {
      title: "Actions",
      render: (row: HeroSlide) => (
        <div className="flex gap-2 text-sm">
          <button
            className="text-sky-400 hover:text-sky-300"
            onClick={() => {
              setEditing(row);
              setModalOpen(true);
            }}
          >
            Edit
          </button>
          <button className="text-rose-400 hover:text-rose-300" onClick={() => setConfirmId(row.id)}>
            Delete
          </button>
        </div>
      )
    }
  ];

  return (
    <AdminLayout title="Hero Slides">
      <ToastContainer toasts={toasts} />
      <div className="mb-4 flex justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Manage Hero Slides</h2>
          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:brightness-110"
        >
          + New Slide
        </button>
      </div>
      {loading ? (
        <p className="text-sm text-slate-300">Loading...</p>
      ) : (
        <Table data={slides} columns={columns} keyExtractor={(row) => row.id} />
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        title={editing ? "Edit Slide" : "New Slide"}
      >
        <HeroSlideForm
          initial={editing || undefined}
          onSubmit={handleSave}
          onCancel={() => {
            setModalOpen(false);
            setEditing(null);
          }}
        />
      </Modal>

      <ConfirmDialog
        isOpen={confirmId !== null}
        message="Delete this slide?"
        onCancel={() => setConfirmId(null)}
        onConfirm={async () => {
          if (confirmId !== null) {
            try {
              await remove(confirmId);
              addToast("Slide deleted");
            } catch (err: any) {
              addToast("Failed to delete slide", "error");
            }
          }
          setConfirmId(null);
        }}
      />
    </AdminLayout>
  );
};

export default HeroSlidesPage;
