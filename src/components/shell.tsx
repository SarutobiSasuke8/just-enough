import { Link } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { steeredCount, useProgress } from "@/lib/progress";

export function Shell({ children }: { children: ReactNode }) {
  const steered = useProgress((state) => state.steered);
  useRehydrate();
  const count = steeredCount(steered);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
          <Link to="/" className="font-serif text-xl tracking-tight">
            Just enough
          </Link>
          <nav aria-label="Guide" className="flex items-center gap-4 text-sm sm:gap-6">
            <Link
              to="/review"
              className="py-2 hover:text-oxide"
              activeProps={{ className: "py-2 text-oxide" }}
            >
              How to read
            </Link>
            <span className="tabular-nums text-muted" aria-live="polite">
              {count} marked
            </span>
          </nav>
        </div>
      </header>
      {children}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Six languages. No track to finish. Progress stays in this browser.</p>
          <ResetProgress />
        </div>
      </footer>
    </div>
  );
}

function ResetProgress() {
  const reset = useProgress((state) => state.reset);
  return (
    <button
      type="button"
      className="min-h-11 self-start underline decoration-line underline-offset-4 hover:text-ink hover:decoration-ink"
      onClick={() => reset()}
    >
      Clear progress
    </button>
  );
}

function useRehydrate(): void {
  useEffect(() => {
    if (!useProgress.persist.hasHydrated()) {
      void useProgress.persist.rehydrate();
    }
  }, []);
}
