# How to read

The model will hand you eighty lines. Your job is not to be impressed. Your job is to find the one place it is quietly wrong.

## 01. Run it on a copy

Admiration is not a test. Run the page, the script, or the query against a copy of real data. A clean exit is not the same as a right answer.

```text
Give me the smallest way to run this on a copy of my data.
Tell me what I should see if it worked, and what a silent failure would look like.
Do not rewrite it yet.
```

## 02. Name the input and the output

Before you read line by line, say what goes in and what comes out. If you cannot, the model probably cannot either — it just kept typing.

```text
Above the code, write one line and nothing else:
inputs are ___, output is ___.
Use the names from the code. Do not add features.
```

## 03. Ask about empty, missing, and twice

The sample data is never empty. Yours will be. Ask what happens with an empty list, a null, and a second run. Quiet zeros live there.

```text
Do not change the code. Answer three questions:
What happens if the list is empty?
What happens if a field is null?
What happens if I run it twice?
```

## 04. Point at one line

“Is this good?” gets a compliment. “What does line 7 assume?” gets a review. Pick the line you do not immediately believe.

```text
Explain line [n] only.
What does it assume is true?
What breaks if that assumption is wrong?
```

## 05. Check it against what you forbade

If you said no classes, no any, no rm, no new dependencies — look for those first. Models drift back to their habits when the task gets long.

```text
I asked you not to use: [the constraints].
List every place this code breaks one.
Do not fix them yet. Just list them.
```

## 06. Ask for the smallest change

A full rewrite throws away the parts you already understood. Ask for the diff. Ask what that diff might break.

```text
Don't rewrite the file.
Give the smallest change that fixes [the specific problem].
Then say what that change might break.
```

