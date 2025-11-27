// path: admin-frontend/src/components/ToastContainer.tsx
import React from "react";
import { Toast } from "../lib/useToast";

interface Props {
  toasts: Toast[];
}

export const ToastContainer: React.FC<Props> = ({ toasts }) => {
  if (toasts.length === 0) return null;
  return (
    <div className="fixed right-4 top-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`min-w-[240px] rounded-lg px-4 py-3 text-sm shadow-lg ${
            toast.type === "error" ? "bg-rose-900/80 text-rose-100" : "bg-emerald-900/80 text-emerald-100"
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
