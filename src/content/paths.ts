export type PathStep =
  | {
      kind: "language";
      slug: string;
      why: string;
    }
  | {
      kind: "review";
      why: string;
    };

export type GuidePath = {
  slug: string;
  index: string;
  title: string;
  line: string;
  promise: string;
  minutes: number;
  steps: PathStep[];
  stop: string;
};

export const paths: GuidePath[] = [
  {
    slug: "ship-a-page",
    index: "01",
    title: "Ship a page",
    line: "Something a person can open.",
    promise:
      "You leave with one page that reads well on a phone, one piece of behavior, and the ability to point at the line that does it.",
    minutes: 65,
    steps: [
      {
        kind: "language",
        slug: "html-css",
        why: "The page is the product. Get the meaning and the layout right before any logic.",
      },
      {
        kind: "language",
        slug: "javascript",
        why: "Add one behavior: filter, submit, or fetch. Keep it in the same file.",
      },
      {
        kind: "language",
        slug: "typescript",
        why: "Only after something works. Use it to check the code, not to start over.",
      },
    ],
    stop: "A person can open it on a phone, use the one action, and you can name the function that handles it.",
  },
  {
    slug: "automate-a-chore",
    index: "02",
    title: "Automate a chore",
    line: "A script you can run again.",
    promise:
      "You leave with a script that reads a copy of a real file, writes a new file, and tells you what it skipped.",
    minutes: 50,
    steps: [
      {
        kind: "language",
        slug: "python",
        why: "The chore itself. Lists, dicts, files, and a printed count.",
      },
      {
        kind: "language",
        slug: "shell",
        why: "So you can run it from the right folder and refuse a dangerous command.",
      },
      {
        kind: "language",
        slug: "sql",
        why: "Only if the chore is a question about rows. Otherwise stop after the shell.",
      },
    ],
    stop: "You ran it on a copy, read the kept and skipped counts, and can say what the script will not touch.",
  },
  {
    slug: "review-the-agent",
    index: "03",
    title: "Review the agent",
    line: "Read code you did not write.",
    promise:
      "You leave able to reject a snippet for a specific reason — a wrong length, an invented field, a null, a command you will not run.",
    minutes: 55,
    steps: [
      {
        kind: "review",
        why: "Six habits. This is the skill that compounds, because every language uses it.",
      },
      {
        kind: "language",
        slug: "typescript",
        why: "The checker is a second reader. Learn what it is pointing at.",
      },
      {
        kind: "language",
        slug: "javascript",
        why: "Most of what you are handed is JavaScript. filter and map are the usual fault line.",
      },
    ],
    stop: "You can say what is wrong in one sentence, and what you would ask the model to change — not “make it better.”",
  },
];

export function getPath(slug: string): GuidePath | undefined {
  return paths.find((path) => path.slug === slug);
}

export function pathsForLanguage(slug: string): GuidePath[] {
  return paths.filter((path) =>
    path.steps.some((step) => step.kind === "language" && step.slug === slug),
  );
}
