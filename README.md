# Just enough

A short field guide to programming languages for people who already have an AI.

You do not need a course. You need to know what to ask for, the few ideas that let you steer, and how to tell when the answer is wrong.

Each language in this guide has the same shape:

1. **One job** — what it is for now
2. **You can already ask for** — four things small enough to finish in a sitting
3. **If you only remember one thing**
4. **Know these** — about five ideas, not a syllabus
5. **Leave these** — real topics that are not first
6. **A prompt that works** — replace the brackets, keep the constraints
7. **Read this** — a snippet to judge, not to write

Progress stays in the browser. There is no track, no streak, and no certificate.

## Three ways in

| | | Stop when |
| --- | --- | --- |
| **Ship a page** | HTML & CSS → JavaScript → TypeScript | Someone can open it on a phone, use the one action, and you can name the function that handles it. |
| **Automate a chore** | Python → the shell → SQL only if the chore is rows | You ran it on a copy, read the kept and skipped counts, and can say what it will not touch. |
| **Review the agent** | How to read → TypeScript → JavaScript | You can say what is wrong in one sentence, and what you would ask the model to change. |

## The languages

| | One thing to remember |
| --- | --- |
| **HTML & CSS** | If a person can activate it, it is a button. If it goes somewhere, it is a link. Do not fake either with a div. |
| **JavaScript** | Most of what you ask for is: take a list, keep some of it, reshape the rest. |
| **TypeScript** | If a field is not in the type, the model invented it. Do not silence that with `any`. |
| **Python** | Indentation groups the code. Data is lists and dicts. Print the middle before you trust the total. |
| **SQL** | `WHERE` chooses rows. `GROUP BY` collapses them. `NULL` is not equal to anything, including `NULL`. |
| **The shell** | Read a command before it runs. Quotes are not decoration. `rm` does not have an undo. |

## How to read code you did not write

1. Run it on a copy.
2. Name the input and the output before you read line by line.
3. Ask about empty, missing, and a second run.
4. Point at one line. “Is this good?” gets a compliment. “What does line 7 assume?” gets a review.
5. Check it against what you forbade.
6. Ask for the smallest change, not a rewrite.

## Where the lessons live

The full text, prompts, and read-aloud checks are in [`src/content/languages.ts`](src/content/languages.ts), [`src/content/paths.ts`](src/content/paths.ts), and [`src/content/review.ts`](src/content/review.ts).
