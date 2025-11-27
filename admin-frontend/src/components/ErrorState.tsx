// path: admin-frontend/src/components/ErrorState.tsx
import React from "react";

const ErrorState: React.FC<{ message?: string }> = ({ message = "Something went wrong." }) => {
  return <div className="rounded-lg border border-rose-700/50 bg-rose-900/20 px-3 py-2 text-sm text-rose-200">{message}</div>;
};

export default ErrorState;
