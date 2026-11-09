import { snippet } from "@/content/snippet";

export type Concept = {
  name: string;
  body: string;
  code?: string;
  codeLang?: string;
};

export type Possible = {
  title: string;
  detail: string;
};

export type ReadQuestion = {
  id: string;
  question: string;
  choices: string[];
  answer: number;
  why: string;
};

export type Read = {
  lang: string;
  code: string;
  questions: ReadQuestion[];
};

export type Language = {
  slug: string;
  index: string;
  name: string;
  line: string;
  job: string;
  minutes: number;
  oneThing: string;
  possible: Possible[];
  know: Concept[];
  skip: string[];
  prompt: string;
  read: Read;
};

export const languages: Language[] = [
  {
    slug: "html-css",
    index: "01",
    name: "HTML & CSS",
    line: "What a person actually sees.",
    job: "Two languages, one job: the page. Models are fluent in both and careless about meaning. You supply the meaning.",
    minutes: 25,
    oneThing:
      "If a person can activate it, it is a button. If it goes somewhere, it is a link. Do not fake either with a div.",
    possible: [
      {
        title: "A single page with a real heading order",
        detail:
          "One h1, then sections that say what they are. Enough for a landing page, a note, or a personal site.",
      },
      {
        title: "A form that works on a phone",
        detail:
          "Labels tied to inputs, a real submit button, errors written in the page rather than only in the console.",
      },
      {
        title: "A layout that does not scroll sideways",
        detail:
          "At 390 pixels wide the words still fit. This is the check most generated pages fail.",
      },
      {
        title: "A correction of the card habit",
        detail:
          "You can tell the model to stop wrapping every block in a shadow. Taste is the part you still do.",
      },
    ],
    know: [
      {
        name: "Tags have meaning",
        body: "HTML is not a way to make boxes. A heading is a heading, a list is a list, a paragraph is a paragraph. Screen readers, search, and your future self all use that meaning. Style comes second.",
        code: snippet(`
          <main>
            <h1>Office hours</h1>
            <p>Tuesdays, by appointment.</p>
            <a href="/book">Book a time</a>
          </main>
        `),
        codeLang: "HTML",
      },
      {
        name: "The box",
        body: "Every element is a box. Padding is space inside the border. Margin is space outside it. Set border-box once so width means the width you see. Then stop fighting the model.",
        code: snippet(`
          * { box-sizing: border-box; }

          .note {
            max-width: 40rem;
            padding: 1rem;
            margin-block: 1.5rem;
          }
        `),
        codeLang: "CSS",
      },
      {
        name: "Flex for a row, grid for a page",
        body: "Flex lines things up in one direction and lets them wrap. Grid is for regions: a side column and a main column. You do not need a framework to do either.",
        code: snippet(`
          .row {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            align-items: center;
          }
        `),
        codeLang: "CSS",
      },
      {
        name: "Type and space first",
        body: "A page looks finished when the type has two sizes that agree, the line length stays near 65 characters, and related things sit closer than unrelated things. Color is the last dial, not the first.",
      },
      {
        name: "Keyboard and a narrow phone",
        body: "Tab through the page. Every control should show focus and work with Enter or Space. Then narrow the window. If you have to scroll sideways, the layout is not done.",
      },
    ],
    skip: [
      "Float layouts",
      "CSS-in-JS arguments",
      "Animation as a personality",
      "A design system you do not own",
      "Pixel matching before the words are right",
    ],
    prompt: snippet(`
      Design one page for: [who it is for, and what they should do].

      Use semantic HTML: one h1, real button and a elements, a form if there is input.
      Use one plain <style> block. No framework. No icon font.
      Lay it out with flex or grid. It must be readable at 390px wide with no horizontal scrolling.
      Prefer a small type scale and generous space over color and shadow.
      Do not wrap every section in a card.
    `),
    read: {
      lang: "HTML",
      code: snippet(`
        <div class="buy" onclick="buy()">Buy</div>
      `),
      questions: [
        {
          id: "html-keyboard",
          question: "What is wrong with this for someone using a keyboard?",
          choices: [
            "They cannot tab to it, and a screen reader may not call it a button",
            "onclick was removed from browsers",
            "A div cannot be seen on a phone",
          ],
          answer: 0,
          why: "A div is not in the tab order, and Enter does nothing unless extra code is written. The model reached for a div because it was styling a box. You are responsible for the meaning.",
        },
        {
          id: "html-instead",
          question: "What should you ask for instead?",
          choices: [
            "A button with type=\"button\"",
            "A span with a pointer cursor",
            "An image of a button",
          ],
          answer: 0,
          why: "A button is focusable, activates with Enter and Space, and is announced correctly. That is the whole fix. The class name can stay.",
        },
      ],
    },
  },
  {
    slug: "javascript",
    index: "02",
    name: "JavaScript",
    line: "The language already in the browser.",
    job: "JavaScript is what most models emit first, and what runs in the page without a build step. You need enough of it to ask for a small tool and to spot a list that was handled wrong.",
    minutes: 20,
    oneThing:
      "Most of what you ask for is: take a list, keep some of it, reshape the rest.",
    possible: [
      {
        title: "A page that filters as you type",
        detail: "One file. An input, a list, no framework. Useful the same day.",
      },
      {
        title: "A CSV you already have, narrowed by a rule",
        detail:
          "Drop the file in, keep the rows that match, show them. The model can write this if you forbid a build step.",
      },
      {
        title: "One API, rendered as sentences",
        detail:
          "Fetch a public endpoint and show three fields. Not a client library. A page.",
      },
      {
        title: "A form that catches the obvious mistakes",
        detail:
          "Empty fields, a number that is not a number. Shown on the page, not only in an alert.",
      },
    ],
    know: [
      {
        name: "A name holds a value",
        body: "const names something that will not be reassigned. Start there. You rarely need var, and you rarely need a class. Data is numbers, strings, booleans, lists, and objects.",
        code: snippet(`
          const city = "Lisbon";
          const open = true;
          const seats = 12;
        `),
        codeLang: "JavaScript",
      },
      {
        name: "Functions are the unit to ask for",
        body: "Ask for small functions with obvious inputs and outputs. If a function does two things, it is two functions. A comment above it should say what goes in and what comes out — that is how you review it.",
        code: snippet(`
          function label(cents) {
            return "$" + (cents / 100).toFixed(2);
          }
        `),
        codeLang: "JavaScript",
      },
      {
        name: "filter, map, find",
        body: "filter keeps some items. map reshapes every item and keeps the length. find returns the first match or undefined. When a result is the wrong length, one of these was the wrong choice.",
        code: snippet(`
          const prices = [12, 4, 9, 15];
          const big = prices.filter((price) => price > 10);
          const labels = big.map((price) => "$" + price);
        `),
        codeLang: "JavaScript",
      },
      {
        name: "Objects are labeled bags",
        body: "An object groups fields that belong together: a person, a row, a response. Read them with dot or brackets. If the model invents a field you did not ask for, that is the first thing to delete.",
      },
      {
        name: "await means the answer arrives later",
        body: "fetch starts a request. await pauses that function until the response is there. You need this one pattern. You do not need the history of callbacks to use it. Always decide what the page shows if the request fails.",
        code: snippet(`
          async function loadTitle(url) {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Request failed");
            const data = await response.json();
            return data.title;
          }
        `),
        codeLang: "JavaScript",
      },
    ],
    skip: [
      "The prototype chain",
      "How this gets bound",
      "Classes as a requirement",
      "Bundlers and build configuration",
      "Hoisting puzzles",
    ],
    prompt: snippet(`
      Write one HTML file with a plain <script>. No libraries, no build step, no classes.

      Goal: [what the page should do, and the sample data].

      Use const, small functions, and filter / map / find.
      Above each function, add one comment naming its input and output.
      If something can fail (empty list, bad input, a failed request), show a sentence on the page. Do not fail silently.
    `),
    read: {
      lang: "JavaScript",
      code: snippet(`
        const prices = [12, 4, 9, 15];
        const big = prices.filter((price) => price > 10);
        const labels = big.map((price) => "$" + price);
        console.log(labels.length);
      `),
      questions: [
        {
          id: "js-length",
          question: "What does this print?",
          choices: ["2", "4", "\"$12\""],
          answer: 0,
          why: "filter keeps 12 and 15. map only changes how they look. length counts items, so it is 2.",
        },
        {
          id: "js-map-null",
          question:
            "A model rewrites the filter as map, returning the price or null, and treats the result as “only the expensive ones.” What broke?",
          choices: [
            "The list is still length 4, and later code may count the nulls",
            "map is not allowed to return numbers",
            "filter is the only method that runs",
          ],
          answer: 0,
          why: "map always emits one item per input. A null is still an item. “Only some of them” is filter.",
        },
      ],
    },
  },
  {
    slug: "typescript",
    index: "03",
    name: "TypeScript",
    line: "A checker for code you did not write.",
    job: "TypeScript is JavaScript with the shapes written down. For you, it is less a language to author and more a second reader that flags fields the model invented.",
    minutes: 20,
    oneThing:
      "If a field is not in the type, the model invented it. Do not silence that with any.",
    possible: [
      {
        title: "Paste generated JavaScript in and read the red marks",
        detail:
          "The marks are a list of assumptions. That list is often the whole review.",
      },
      {
        title: "Write the shape of a response before the client",
        detail:
          "You describe the JSON you actually saw. Then ask for code that only touches those fields.",
      },
      {
        title: "A signature that states in and out",
        detail:
          "One function, typed arguments, typed return. Easier to trust than eighty untyped lines.",
      },
      {
        title: "A “it worked on my sample” bug, made visible",
        detail:
          "The sample happened to have the field. The type says the next one might not.",
      },
    ],
    know: [
      {
        name: "A type is a shape, not a value",
        body: "Types disappear when the program runs. They exist so the editor can refuse impossible reads. Writing a type does not create the data.",
        code: snippet(`
          type Task = {
            id: string;
            title: string;
            done: boolean;
          };
        `),
        codeLang: "TypeScript",
      },
      {
        name: "Signatures are the documentation",
        body: "The most useful type is on a function: what it accepts, what it returns. Ask the model for that before it writes the body. You can review a signature in one look.",
        code: snippet(`
          function openTitles(tasks: Task[]): string[] {
            return tasks.filter((task) => !task.done).map((task) => task.title);
          }
        `),
        codeLang: "TypeScript",
      },
      {
        name: "A value might be missing",
        body: "string | null means you have to decide the missing case. Models like to pretend a field is always there. A union forces the other branch into the open.",
      },
      {
        name: "Read the error as a location",
        body: "A TypeScript error points at a specific read or call. Start there, not at the top of the file. The message is naming a shape that does not match. Believe the location even when the wording is clumsy.",
      },
      {
        name: "any dismisses the checker",
        body: "any says “stop looking.” It is sometimes a temporary bridge, and it is easy to leave in. If the model adds any to make a file go green, it hid the finding you wanted.",
      },
    ],
    skip: [
      "Conditional types",
      "Mapped-type gymnastics",
      "Decorators",
      "Declaration merging",
      "tsconfig archaeology",
    ],
    prompt: snippet(`
      Here is code an assistant wrote, and one real example of the data:

      [paste the code]
      [paste one real value]

      Add TypeScript types that match the example, not the code's wishes.
      Do not use any. Do not rewrite the logic yet.
      List every place the code touches a field that is not in the type.
    `),
    read: {
      lang: "TypeScript",
      code: snippet(`
        type Task = { id: string; title: string; done: boolean };

        function openTitles(tasks: Task[]) {
          return tasks.filter((task) => !task.done).map((task) => task.title);
        }
      `),
      questions: [
        {
          id: "ts-return",
          question: "What kind of value does openTitles return?",
          choices: ["A list of strings", "A list of tasks", "A list of booleans"],
          answer: 0,
          why: "filter keeps tasks that are not done. map then pulls out title, which is a string. The list of tasks is gone.",
        },
        {
          id: "ts-invented",
          question:
            "The model inserts task.owner inside the map. Task has no owner. What should you expect?",
          choices: [
            "A type error. The field was invented",
            "An empty string, filled in automatically",
            "Nothing, until a customer complains",
          ],
          answer: 0,
          why: "This is why the type is there. The checker does not get tired and it does not share the model's confidence. Do not “fix” it by adding owner unless you have seen owner in real data.",
        },
      ],
    },
  },
  {
    slug: "python",
    index: "04",
    name: "Python",
    line: "The short path from a file to an answer.",
    job: "Python is how you automate a chore and how a lot of AI tooling is written. You can get a useful script from a model on the same afternoon — if you know how to read a loop and how to print the middle.",
    minutes: 20,
    oneThing:
      "Indentation groups the code. Data is lists and dicts. Print the value in the middle before you trust the total at the end.",
    possible: [
      {
        title: "Rename or sort a folder by a rule you can say out loud",
        detail: "“Files ending in .jpg, older than March, move them here.” One script.",
      },
      {
        title: "Clean a CSV without opening a notebook",
        detail:
          "Drop bad rows, keep the columns you named, write a new file. Never overwrite the original.",
      },
      {
        title: "Call an API and print three fields",
        detail: "Standard library only. A token in an environment variable, not in the file.",
      },
      {
        title: "Something you can run again next week",
        detail:
          "The path comes from the command line. The output says what was kept and what was skipped.",
      },
    ],
    know: [
      {
        name: "Indentation is the grouping",
        body: "There are no braces. A block is whatever is indented under the line that ends with a colon. When a model mixes spaces and the logic looks “off,” look at the indent before the algorithm.",
        code: snippet(`
          for name in names:
              if name not in seen:
                  seen.append(name)
        `),
        codeLang: "Python",
      },
      {
        name: "Lists and dicts",
        body: "A list is ordered. A dict maps a key to a value — a row, a config, a JSON object. Most chores are “walk a list of dicts.” You can live here for a long time.",
      },
      {
        name: "Small functions, plain loops",
        body: "A for loop you can read beats a clever one-liner you cannot. Ask for functions that take the rows and return the rows. Classes are optional and usually noise at this size.",
        code: snippet(`
          def kept(rows):
              return [row for row in rows if row["ok"]]
        `),
        codeLang: "Python",
      },
      {
        name: "Read a file, write a different file",
        body: "Open the input, write a new path, leave the original alone. Pass the path in from the command line so the script is not glued to your machine.",
      },
      {
        name: "Print the middle",
        body: "A wrong total with no error is the usual failure. Print one raw row and the count of skips before you believe the sum. If the script is silent, it is not done.",
        code: snippet(`
          total = sum(row["n"] for row in rows if row["ok"])
          print(total)
        `),
        codeLang: "Python",
      },
    ],
    skip: [
      "Metaclasses",
      "asyncio",
      "Multiple inheritance",
      "Dunder methods as a hobby",
      "A web framework on day one",
    ],
    prompt: snippet(`
      Write one Python script, standard library only, that: [the chore].

      Read a path passed on the command line.
      Write a new file. Never overwrite the input.
      Print how many rows were kept and how many were skipped.
      Use functions. No classes.
      Then give the exact command to run it on a copy of my file.
    `),
    read: {
      lang: "Python",
      code: snippet(`
        rows = [
            {"ok": True, "n": 2},
            {"ok": False, "n": 5},
            {"ok": True, "n": 3},
        ]
        total = sum(row["n"] for row in rows if row["ok"])
        print(total)
      `),
      questions: [
        {
          id: "py-total",
          question: "What does this print?",
          choices: ["5", "10", "2"],
          answer: 0,
          why: "The middle row is skipped because ok is false. 2 + 3 is 5. The 5 in the data is a value, not the total — a common mix-up when you skim.",
        },
        {
          id: "py-string-bool",
          question:
            "The model changes the test to if row[\"ok\"] == \"true\". The data is unchanged. What is total?",
          choices: [
            "0. The flag is the boolean True, not the word true. No error is raised",
            "5, because Python treats them as equal",
            "An exception, every time",
          ],
          answer: 0,
          why: "This is a quiet bug. The script exits cleanly and reports a confident zero. Print one row before you trust a total.",
        },
      ],
    },
  },
  {
    slug: "sql",
    index: "05",
    name: "SQL",
    line: "A question you can check.",
    job: "SQL asks a table a question. A model will write the query from English. You still need to know what a group and a null are, or you will trust a confident wrong count.",
    minutes: 15,
    oneThing:
      "WHERE chooses rows. GROUP BY collapses them to one row per group. NULL is not equal to anything, including NULL.",
    possible: [
      {
        title: "How many per customer, last month",
        detail: "The report you used to build by sorting a spreadsheet.",
      },
      {
        title: "Which rows are duplicates",
        detail: "Group, count, keep the groups whose count is more than one.",
      },
      {
        title: "Two exports, matched on one id",
        detail: "A join. You name the key. The model writes the rest. You check the row count.",
      },
      {
        title: "A query you can say back in one sentence",
        detail: "If you cannot say what one result row means, do not send the number onward.",
      },
    ],
    know: [
      {
        name: "SELECT, FROM, WHERE",
        body: "SELECT names the columns you want back. FROM names the table. WHERE throws away rows before any totaling. Start every review there: which rows are even allowed in?",
        code: snippet(`
          SELECT email, created_at
          FROM users
          WHERE created_at >= DATE '2026-01-01';
        `),
        codeLang: "SQL",
      },
      {
        name: "GROUP BY is one row per",
        body: "If you asked for one row per customer and got one row per order, the collapse never happened. COUNT(*) after a proper GROUP BY counts the group, not the whole table.",
        code: snippet(`
          SELECT customer_id, COUNT(*) AS orders
          FROM orders
          WHERE status = 'paid'
          GROUP BY customer_id;
        `),
        codeLang: "SQL",
      },
      {
        name: "JOIN matches rows",
        body: "A join lines up two tables on a key you name. If the key is wrong, rows duplicate and counts inflate. Compare the count to what you expect before you believe a sum.",
      },
      {
        name: "NULL is its own thing",
        body: "NULL means unknown, not zero and not an empty string. Nothing equals NULL, not even NULL. Write IS NULL or IS NOT NULL. Models get this wrong constantly.",
        code: snippet(`
          SELECT COUNT(*) AS waiting
          FROM orders
          WHERE refunded_at IS NULL;
        `),
        codeLang: "SQL",
      },
      {
        name: "Look before you change",
        body: "Have the model write SELECT first. UPDATE and DELETE without a WHERE can empty a table. If a change is required, ask for the SELECT that shows the rows it will touch, and run that yourself.",
      },
    ],
    skip: [
      "Window functions, until a question forces them",
      "Stored procedures",
      "The query planner",
      "An ORM",
      "Dialect trivia you do not use",
    ],
    prompt: snippet(`
      Schema:
      [table names and columns]

      Question, in one sentence: [question]

      Write one SELECT. Name the output columns in plain words.
      Do not use UPDATE, DELETE, or INSERT.
      If you mention NULL, use IS NULL or IS NOT NULL, never = NULL.
      After the query, explain it in three lines: which rows survive, how they group, and what one result row means.
    `),
    read: {
      lang: "SQL",
      code: snippet(`
        SELECT COUNT(*) AS n
        FROM orders
        WHERE refunded_at = NULL;
      `),
      questions: [
        {
          id: "sql-null",
          question:
            "Ten of forty orders have no refund, so refunded_at is null on those rows. What does this return?",
          choices: [
            "0. Nothing equals NULL. The test should be IS NULL",
            "10",
            "40",
          ],
          answer: 0,
          why: "The query is legal and the answer is confidently wrong. This is the bug to memorize. Equality does not match NULL.",
        },
        {
          id: "sql-group",
          question:
            "You asked for one row per customer, paid orders only, and received one row per order. What is missing?",
          choices: [
            "GROUP BY customer_id, after WHERE status = 'paid'",
            "A second copy of SELECT",
            "ORDER BY, which performs the grouping",
          ],
          answer: 0,
          why: "WHERE keeps the paid orders. GROUP BY collapses them. ORDER BY only sorts. If the count matches the raw table, nothing was collapsed.",
        },
      ],
    },
  },
  {
    slug: "shell",
    index: "06",
    name: "The shell",
    line: "How you run what the model just wrote.",
    job: "The shell is not a language you study for its own sake. It is how you run a script, look at a log, and refuse a command that deletes or downloads more than you asked.",
    minutes: 15,
    oneThing:
      "Read a command before it runs. Quotes are not decoration. rm does not have an undo.",
    possible: [
      {
        title: "Run the script, from the right folder",
        detail: "The failure is often “you were somewhere else,” not the language.",
      },
      {
        title: "Search a project for a string",
        detail: "Find the function the model named before you assume it exists.",
      },
      {
        title: "See the end of a log",
        detail: "The last twenty lines answer more than a dashboard does.",
      },
      {
        title: "A pipe, once",
        detail: "One command’s text becomes the next command’s input. Then stop. You do not need a novel.",
      },
    ],
    know: [
      {
        name: "You are always in a folder",
        body: "pwd prints where you are. ls lists it. cd moves. If a path in the model’s command does not match pwd, do not run the command yet.",
        code: snippet(`
          pwd
          ls
          cd projects/notes
        `),
        codeLang: "Shell",
      },
      {
        name: "A command returns a code",
        body: "Zero means it reported success. Anything else means it did not. A script that keeps going after a failure will do the next, wrong thing. Ask the model to stop on errors.",
      },
      {
        name: "Pipes pass text",
        body: "A pipe takes the output of one command and feeds it to the next. ls lists, wc -l counts lines. When a count looks absurd, run the left side alone.",
        code: snippet(`
          ls *.txt | wc -l
        `),
        codeLang: "Shell",
      },
      {
        name: "Quotes keep one piece",
        body: "Without quotes, spaces split a path into several arguments, and an empty variable can disappear. Quote paths. If a variable might be empty, test it before you use it near rm.",
        code: snippet(`
          if [ -z "$DIR" ] || [ "$DIR" = "/" ]; then
            echo "refusing: DIR is empty or root"
            exit 1
          fi
          rm -rf -- "$DIR"
        `),
        codeLang: "Shell",
      },
      {
        name: "Read it before it deletes or downloads",
        body: "Treat sudo, rm, and curl piped into a shell as stop signs. Ask what will be touched. Echo variables first. Run against a copy. The model is optimizing for a command that looks complete.",
      },
    ],
    skip: [
      "A custom prompt theme",
      "awk as a second career",
      "Writing your own framework of aliases",
      "Bash golf",
      "Memorizing flags you can look up",
    ],
    prompt: snippet(`
      I want to: [goal], in this folder.

      Give me the commands one at a time, not a script that deletes or downloads.
      Do not use sudo. Do not use rm -rf. Do not pipe curl into a shell.
      Before any command that changes files, show a command that only prints what would change.
      Quote every path.
    `),
    read: {
      lang: "Shell",
      code: snippet(`
        rm -rf $DIR/
      `),
      questions: [
        {
          id: "sh-empty",
          question:
            "DIR is empty because an earlier command failed. What can this line become?",
          choices: [
            "rm -rf /, which starts at the root of the disk",
            "A harmless no-op that deletes nothing",
            "A prompt that asks you to confirm",
          ],
          answer: 0,
          why: "The slash is not inside the variable. An empty DIR leaves the slash, and the slash is the root. rm will not ask. Refuse the command.",
        },
        {
          id: "sh-refuse",
          question:
            "A model suggests a delete, or curl piped into a shell. What do you do?",
          choices: [
            "Read it. Print the variables. Run it only if you can say what it will touch",
            "Run it, then read the output to see if it was fine",
            "Add sudo so permissions do not interrupt it",
          ],
          answer: 0,
          why: "Speed is the model's priority. Being able to undo is yours. sudo widens the damage. A printed preview is the cheaper first step.",
        },
      ],
    },
  },
];

export function getLanguage(slug: string): Language | undefined {
  return languages.find((language) => language.slug === slug);
}
