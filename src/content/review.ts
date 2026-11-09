import { snippet } from "@/content/snippet";

export type Habit = {
  id: string;
  index: string;
  name: string;
  body: string;
  prompt: string;
};

export const habits: Habit[] = [
  {
    id: "run-a-copy",
    index: "01",
    name: "Run it on a copy",
    body: "Admiration is not a test. Run the page, the script, or the query against a copy of real data. A clean exit is not the same as a right answer.",
    prompt: snippet(`
      Give me the smallest way to run this on a copy of my data.
      Tell me what I should see if it worked, and what a silent failure would look like.
      Do not rewrite it yet.
    `),
  },
  {
    id: "in-and-out",
    index: "02",
    name: "Name the input and the output",
    body: "Before you read line by line, say what goes in and what comes out. If you cannot, the model probably cannot either — it just kept typing.",
    prompt: snippet(`
      Above the code, write one line and nothing else:
      inputs are ___, output is ___.
      Use the names from the code. Do not add features.
    `),
  },
  {
    id: "empty",
    index: "03",
    name: "Ask about empty, missing, and twice",
    body: "The sample data is never empty. Yours will be. Ask what happens with an empty list, a null, and a second run. Quiet zeros live there.",
    prompt: snippet(`
      Do not change the code. Answer three questions:
      What happens if the list is empty?
      What happens if a field is null?
      What happens if I run it twice?
    `),
  },
  {
    id: "one-line",
    index: "04",
    name: "Point at one line",
    body: "“Is this good?” gets a compliment. “What does line 7 assume?” gets a review. Pick the line you do not immediately believe.",
    prompt: snippet(`
      Explain line [n] only.
      What does it assume is true?
      What breaks if that assumption is wrong?
    `),
  },
  {
    id: "the-skip",
    index: "05",
    name: "Check it against what you forbade",
    body: "If you said no classes, no any, no rm, no new dependencies — look for those first. Models drift back to their habits when the task gets long.",
    prompt: snippet(`
      I asked you not to use: [the constraints].
      List every place this code breaks one.
      Do not fix them yet. Just list them.
    `),
  },
  {
    id: "smallest-change",
    index: "06",
    name: "Ask for the smallest change",
    body: "A full rewrite throws away the parts you already understood. Ask for the diff. Ask what that diff might break.",
    prompt: snippet(`
      Don't rewrite the file.
      Give the smallest change that fixes [the specific problem].
      Then say what that change might break.
    `),
  },
];
