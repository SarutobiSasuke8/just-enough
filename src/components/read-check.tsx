import type { Read } from "@/content/languages";
import { useProgress } from "@/lib/progress";

export function ReadCheck({ read }: { read: Read }) {
  const answers = useProgress((state) => state.answers);
  const answer = useProgress((state) => state.answer);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-sm text-muted">{read.lang}</p>
        <pre className="overflow-x-auto bg-ink p-5 font-mono text-sm leading-relaxed text-paper">
          {read.code}
        </pre>
      </div>
      {read.questions.map((item, index) => {
        const picked = answers[item.id];
        const decided = picked !== undefined;
        return (
          <fieldset key={item.id} className="flex flex-col gap-3">
            <legend className="mb-1 text-base font-medium">
              <span className="mr-2 tabular-nums text-muted">{index + 1}.</span>
              {item.question}
            </legend>
            {item.choices.map((choice, choiceIndex) => {
              const selected = picked === choiceIndex;
              const correct = choiceIndex === item.answer;
              const show = decided && (selected || correct);
              return (
                <button
                  key={choice}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => answer(item.id, choiceIndex)}
                  className={
                    "min-h-11 border px-4 py-3 text-left text-sm transition-colors duration-200 " +
                    (show && correct
                      ? "border-oxide bg-oxide-soft"
                      : selected
                        ? "border-ink bg-paper"
                        : "border-line bg-paper hover:border-ink")
                  }
                >
                  {choice}
                </button>
              );
            })}
            {decided ? <p className="text-sm text-muted">{item.why}</p> : null}
          </fieldset>
        );
      })}
    </div>
  );
}
