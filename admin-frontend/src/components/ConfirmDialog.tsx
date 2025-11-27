// path: admin-frontend/src/components/ConfirmDialog.tsx
import React from "react";
import Modal from "./Modal";

interface Props {
  isOpen: boolean;
  title?: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmDialog: React.FC<Props> = ({ isOpen, title = "Confirm", message, onCancel, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title}>
      <p className="text-sm text-slate-200">{message}</p>
      <div className="mt-4 flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="rounded-lg border border-slate-600 px-3 py-1.5 text-sm font-semibold text-slate-100 hover:bg-slate-800"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="rounded-lg bg-rose-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-rose-500"
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
