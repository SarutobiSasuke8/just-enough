import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProgressState = {
  steered: Record<string, boolean>;
  answers: Record<string, number>;
  noted: Record<string, boolean>;
  toggleSteered: (slug: string) => void;
  answer: (id: string, choice: number) => void;
  toggleNoted: (id: string) => void;
  reset: () => void;
};

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      steered: {},
      answers: {},
      noted: {},
      toggleSteered: (slug) =>
        set((state) => ({
          steered: { ...state.steered, [slug]: !state.steered[slug] },
        })),
      answer: (id, choice) =>
        set((state) => ({
          answers: { ...state.answers, [id]: choice },
        })),
      toggleNoted: (id) =>
        set((state) => ({
          noted: { ...state.noted, [id]: !state.noted[id] },
        })),
      reset: () => set({ steered: {}, answers: {}, noted: {} }),
    }),
    { name: "just-enough", skipHydration: true },
  ),
);

export function steeredCount(steered: Record<string, boolean>): number {
  return Object.values(steered).filter(Boolean).length;
}
