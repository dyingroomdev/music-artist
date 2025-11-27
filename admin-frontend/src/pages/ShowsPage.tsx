// path: admin-frontend/src/pages/ShowsPage.tsx
import React, { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { useShowsAdmin } from "../hooks/useShowsAdmin";
import ShowForm from "../components/ShowForm";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import Table from "../components/Table";
import { Show } from "../lib/types";
import { useToast } from "../lib/useToast";
import ToastContainer from "../components/ToastContainer";

export const ShowsPage: React.FC = () => {
  const { shows, upcoming, past, loading, error, create, update, remove } = useShowsAdmin();
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Show | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const { toasts, addToast } = useToast();

  const handleSave = async (values: Partial<Show>) => {
    try {
      if (editing) {
        await update(editing.id, values);
        addToast("Show updated");
      } else {
        await create(values);
        addToast("Show created");
      }
      setModalOpen(false);
      setEditing(null);
    } catch (err: any) {
      addToast("Failed to save show", "error");
    }
  };

  const columns = [
    { title: "Title", render: (row: Show) => row.title },
    { title: "Venue", render: (row: Show) => row.venue },
    { title: "Location", render: (row: Show) => `${row.city}, ${row.country}` },
    { title: "Date", render: (row: Show) => row.show_date },
    { title: "Time", render: (row: Show) => row.start_time || "-" },
    { title: "Upcoming", render: (row: Show) => (row.is_upcoming ? "Yes" : "No") },
    {
      title: "Actions",
      render: (row: Show) => (
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
    <AdminLayout title="Shows">
      <ToastContainer toasts={toasts} />
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Manage Shows</h2>
          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:brightness-110"
        >
          + Add Show
        </button>
      </div>

      <div className="mb-4 flex gap-3">
        <button
          className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${tab === "upcoming" ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800/60"}`}
          onClick={() => setTab("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${tab === "past" ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800/60"}`}
          onClick={() => setTab("past")}
        >
          Past
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-slate-300">Loading...</p>
      ) : (
        <Table data={tab === "upcoming" ? upcoming : past} columns={columns} keyExtractor={(row) => row.id} />
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        title={editing ? "Edit Show" : "Add Show"}
      >
        <ShowForm
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
        message="Delete this show?"
        onCancel={() => setConfirmId(null)}
        onConfirm={async () => {
          if (confirmId !== null) {
            try {
              await remove(confirmId);
              addToast("Show deleted");
            } catch (err: any) {
              addToast("Failed to delete show", "error");
            }
          }
          setConfirmId(null);
        }}
      />
    </AdminLayout>
  );
};

export default ShowsPage;
