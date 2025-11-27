// path: admin-frontend/src/components/ShowForm.tsx
import React, { useRef, useState } from "react";
import { Show } from "../lib/types";
import FormField from "./FormField";
import { uploadImage } from "../lib/apiClient";

interface Props {
  initial?: Partial<Show>;
  onSubmit: (values: Partial<Show>) => Promise<void> | void;
  onCancel?: () => void;
}

export const ShowForm: React.FC<Props> = ({ initial, onSubmit, onCancel }) => {
  const [values, setValues] = useState<Partial<Show>>({
    title: "",
    venue: "",
    city: "",
    country: "",
    show_date: "",
    start_time: "",
    is_upcoming: true,
    ticket_url: "",
    featured_image_url: "",
    description: "",
    ...initial
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (field: keyof Show, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSubmit(values);
    setSaving(false);
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setValues((prev) => ({ ...prev, featured_image_url: url }));
    } finally {
      setUploading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Title">
          <input
            required
            className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-white outline-none border border-slate-700 focus:border-blue-400"
            value={values.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </FormField>
        <FormField label="Venue">
          <input
            required
            className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-white outline-none border border-slate-700 focus:border-blue-400"
            value={values.venue || ""}
            onChange={(e) => handleChange("venue", e.target.value)}
          />
        </FormField>
        <FormField label="City">
          <input
            required
            className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-white outline-none border border-slate-700 focus:border-blue-400"
            value={values.city || ""}
            onChange={(e) => handleChange("city", e.target.value)}
          />
        </FormField>
        <FormField label="Country">
          <input
            required
            className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-white outline-none border border-slate-700 focus:border-blue-400"
            value={values.country || ""}
            onChange={(e) => handleChange("country", e.target.value)}
          />
        </FormField>
        <FormField label="Show Date">
          <input
            type="date"
            required
            className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-white outline-none border border-slate-700 focus:border-blue-400"
            value={values.show_date || ""}
            onChange={(e) => handleChange("show_date", e.target.value)}
          />
        </FormField>
        <FormField label="Start Time">
          <input
            type="time"
            className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-white outline-none border border-slate-700 focus:border-blue-400"
            value={values.start_time || ""}
            onChange={(e) => handleChange("start_time", e.target.value)}
          />
        </FormField>
        <FormField label="Ticket URL">
          <input
            className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-white outline-none border border-slate-700 focus:border-blue-400"
            value={values.ticket_url || ""}
            onChange={(e) => handleChange("ticket_url", e.target.value)}
          />
        </FormField>
        <FormField label="Is Upcoming">
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={values.is_upcoming ?? false}
            onChange={(e) => handleChange("is_upcoming", e.target.checked)}
          />
        </FormField>
        <FormField label="Featured Image URL">
          <div className="flex gap-2 items-center">
            <input
            className="flex-1 rounded-lg bg-slate-800 px-3 py-2 text-sm text-white outline-none border border-slate-700 focus:border-blue-400"
              value={values.featured_image_url || ""}
              onChange={(e) => handleChange("featured_image_url", e.target.value)}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file);
              }}
            />
            <button
              type="button"
              className="rounded-lg border border-slate-600 px-3 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-800"
              onClick={() => fileInputRef.current?.click()}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          {values.featured_image_url ? (
            <div className="mt-2">
              <p className="text-xs text-slate-400 mb-1">Preview</p>
              <img
                src={values.featured_image_url}
                alt="Preview"
                className="h-32 w-auto rounded-lg object-cover border border-slate-700"
              />
            </div>
          ) : null}
        </FormField>
      </div>
      <FormField label="Description">
        <textarea
          rows={4}
          className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-white outline-none border border-slate-700 focus:border-blue-400"
          value={values.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </FormField>
      <div className="flex justify-end gap-3">
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-600 px-3 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-800"
          >
            Cancel
          </button>
        ) : null}
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:brightness-110 disabled:opacity-70"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default ShowForm;
