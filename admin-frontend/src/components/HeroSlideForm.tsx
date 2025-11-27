// path: admin-frontend/src/components/HeroSlideForm.tsx
import React, { useRef, useState } from "react";
import { HeroSlide } from "../lib/types";
import FormField from "./FormField";
import { uploadImage } from "../lib/apiClient";

interface Props {
  initial?: Partial<HeroSlide>;
  onSubmit: (values: Partial<HeroSlide>) => Promise<void> | void;
  onCancel?: () => void;
}

export const HeroSlideForm: React.FC<Props> = ({ initial, onSubmit, onCancel }) => {
  const [values, setValues] = useState<Partial<HeroSlide>>({
    title: "",
    subtitle: "",
    image_url: "",
    cta_label: "",
    cta_url: "",
    is_active: true,
    sort_order: 0,
    ...initial
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (field: keyof HeroSlide, value: any) => {
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
      setValues((prev) => ({ ...prev, image_url: url }));
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
        <FormField label="Subtitle">
          <input
            className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-white outline-none border border-slate-700 focus:border-blue-400"
            value={values.subtitle || ""}
            onChange={(e) => handleChange("subtitle", e.target.value)}
          />
        </FormField>
        <FormField label="Image URL">
          <div className="flex gap-2 items-center">
            <input
              required
              className="flex-1 rounded-lg bg-slate-800 px-3 py-2 text-sm text-white outline-none border border-slate-700 focus:border-blue-400"
              value={values.image_url || ""}
              onChange={(e) => handleChange("image_url", e.target.value)}
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
          {values.image_url ? (
            <div className="mt-2">
              <p className="text-xs text-slate-400 mb-1">Preview</p>
              <img src={values.image_url} alt="Preview" className="h-32 w-auto rounded-lg object-cover border border-slate-700" />
            </div>
          ) : null}
        </FormField>
        <FormField label="CTA Label">
          <input
            className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-white outline-none border border-slate-700 focus:border-blue-400"
            value={values.cta_label || ""}
            onChange={(e) => handleChange("cta_label", e.target.value)}
          />
        </FormField>
        <FormField label="CTA URL">
          <input
            className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-white outline-none border border-slate-700 focus:border-blue-400"
            value={values.cta_url || ""}
            onChange={(e) => handleChange("cta_url", e.target.value)}
          />
        </FormField>
        <FormField label="Sort Order">
          <input
            type="number"
            className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-white outline-none border border-slate-700 focus:border-blue-400"
            value={values.sort_order ?? 0}
            onChange={(e) => handleChange("sort_order", parseInt(e.target.value, 10))}
          />
        </FormField>
        <FormField label="Active">
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={values.is_active ?? false}
            onChange={(e) => handleChange("is_active", e.target.checked)}
          />
        </FormField>
      </div>
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

export default HeroSlideForm;
