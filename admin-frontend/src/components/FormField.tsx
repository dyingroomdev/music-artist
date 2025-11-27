// path: admin-frontend/src/components/FormField.tsx
import React from "react";

interface Props {
  label: string;
  children: React.ReactNode;
}

export const FormField: React.FC<Props> = ({ label, children }) => {
  return (
    <label className="flex flex-col gap-1 text-sm text-slate-200">
      <span className="font-semibold text-slate-100">{label}</span>
      {children}
    </label>
  );
};

export default FormField;
