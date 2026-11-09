import { createFileRoute } from "@tanstack/react-router";
import { CopyPrompt } from "@/components/copy-prompt";
import { Shell } from "@/components/shell";
import { habits } from "@/content/review";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/review")({
  head: () => ({
    meta: [{ title: "How to read — Just enough" }],
  }),
  component: ReviewPage,
});

function ReviewPage() {
  const noted = useProgress((state) => state.noted);
  const toggleNoted = useProgress((state) => state.toggleNoted);
  const notedCount = habits.filter((habit) => noted[habit.id]).length;

  return (
    <Shell>
      <main className="mx-auto max-w-2xl px-5 py-12">
        <p className="text-sm tracking-wide text-oxide uppercase">The skill that compounds</p>
        <h1 className="mt-3 font-serif text-5xl leading-display tracking-tight">How to read</h1>
        <p className="mt-4 text-lg text-muted">
          The model will hand you eighty lines. Your job is not to be impressed. Your job is to find the
          one place it is quietly wrong.
        </p>
        <p className="mt-3 text-sm tabular-nums text-muted">
          {notedCount} of {habits.length} noted for next time
        </p>

        <div className="mt-12 flex flex-col gap-14">
          {habits.map((habit) => {
            const on = Boolean(noted[habit.id]);
            return (
              <section key={habit.id} className="border-t border-line pt-8">
                <p className="tabular-nums text-sm text-oxide">{habit.index}</p>
                <h2 className="mt-2 font-serif text-3xl">{habit.name}</h2>
                <p className="mt-3">{habit.body}</p>
                <div className="mt-5">
                  <CopyPrompt text={habit.prompt} label="Copy this ask" />
                </div>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleNoted(habit.id)}
                  className={
                    "mt-4 inline-flex min-h-11 items-center border px-4 text-sm transition-colors duration-200 " +
                    (on ? "border-oxide bg-oxide-soft" : "border-line hover:border-ink")
                  }
                >
                  {on ? "Noted" : "I’ll use this"}
                </button>
              </section>
            );
          })}
        </div>
      </main>
    </Shell>
  );
}
