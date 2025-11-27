// path: frontend/src/components/LoadingState.tsx
import React from "react";
import clsx from "clsx";

interface LoadingStateProps {
  variant?: "section" | "card" | "hero";
  className?: string;
}

const skeletonClass = "animate-pulse bg-slate-800/60 rounded-xl";

export const LoadingState: React.FC<LoadingStateProps> = ({ variant = "section", className }) => {
  if (variant === "hero") {
    return <div className={clsx("min-h-[70vh] w-full", skeletonClass, className)} aria-label="Loading hero" />;
  }
  if (variant === "card") {
    return <div className={clsx("h-40 w-full", skeletonClass, className)} aria-label="Loading card" />;
  }
  return (
    <div className={clsx("h-64 w-full", skeletonClass, className)} aria-label="Loading content section">
      <div className="h-full w-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl" />
    </div>
  );
};

export default LoadingState;
