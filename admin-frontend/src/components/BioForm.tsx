// path: admin-frontend/src/components/BioForm.tsx
import React, { useRef, useState } from "react";
import { Bio } from "../lib/types";
import FormField from "./FormField";
import { uploadImage } from "../lib/apiClient";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Props {
  initial?: Partial<Bio>;
  onSubmit: (values: Partial<Bio>) => Promise<void> | void;
}

export const BioForm: React.FC<Props> = ({ initial, onSubmit }) => {
  const [values, setValues] = useState<Partial<Bio>>({
    headline: "",
    profile_image_url: "",
    content: "",
    ...initial
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (field: keyof Bio, value: any) => {
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
      setValues((prev) => ({ ...prev, profile_image_url: url }));
    } finally {
      setUploading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <FormField label="Headline">
        <input
          required
          className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-white outline-none border border-slate-700 focus:border-blue-400"
          value={values.headline || ""}
          onChange={(e) => handleChange("headline", e.target.value)}
        />
      </FormField>
      <FormField label="Profile Image URL">
        <div className="flex gap-2 items-center">
          <input
            className="flex-1 rounded-lg bg-slate-800 px-3 py-2 text-sm text-white outline-none border border-slate-700 focus:border-blue-400"
            value={values.profile_image_url || ""}
            onChange={(e) => handleChange("profile_image_url", e.target.value)}
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
        {values.profile_image_url ? (
          <div className="mt-2">
            <p className="text-xs text-slate-400 mb-1">Preview</p>
            <img
              src={values.profile_image_url}
              alt="Preview"
              className="h-32 w-auto rounded-lg object-cover border border-slate-700"
            />
          </div>
        ) : null}
      </FormField>
      <FormField label="Content (Rich Editor)">
        <div className="[&_.ql-toolbar]:rounded-t-lg [&_.ql-toolbar]:bg-slate-800 [&_.ql-toolbar]:border-slate-700 [&_.ql-container]:rounded-b-lg [&_.ql-container]:bg-slate-900 [&_.ql-container]:border-slate-700 [&_.ql-editor]:min-h-[220px]">
          <ReactQuill
            theme="snow"
            value={values.content || ""}
            onChange={(val) => handleChange("content", val)}
          />
        </div>
      </FormField>
      <div className="flex justify-end">
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

export default BioForm;
