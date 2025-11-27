// path: frontend/src/components/ErrorState.tsx
import React from "react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message = "Something went wrong.", onRetry }) => {
  return (
    <div className="rounded-xl border border-rose-700/50 bg-rose-900/10 px-4 py-3 text-rose-100">
      <p className="text-sm">{message}</p>
      {onRetry ? (
        <button
          onClick={onRetry}
          className="mt-2 inline-flex items-center gap-2 rounded-lg bg-rose-600 px-3 py-1 text-sm font-semibold text-white transition hover:bg-rose-500"
        >
          Retry
        </button>
      ) : null}
    </div>
  );
};

export default ErrorState;
