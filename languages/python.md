# Python

The short path from a file to an answer.

Python is how you automate a chore and how a lot of AI tooling is written. You can get a useful script from a model on the same afternoon — if you know how to read a loop and how to print the middle.

About 20 minutes.

## If you only remember one thing

Indentation groups the code. Data is lists and dicts. Print the value in the middle before you trust the total at the end.

## You can already ask for

1. **Rename or sort a folder by a rule you can say out loud.** “Files ending in .jpg, older than March, move them here.” One script.
2. **Clean a CSV without opening a notebook.** Drop bad rows, keep the columns you named, write a new file. Never overwrite the original.
3. **Call an API and print three fields.** Standard library only. A token in an environment variable, not in the file.
4. **Something you can run again next week.** The path comes from the command line. The output says what was kept and what was skipped.

## Know these

### 1. Indentation is the grouping

There are no braces. A block is whatever is indented under the line that ends with a colon. When a model mixes spaces and the logic looks “off,” look at the indent before the algorithm.

```python
for name in names:
    if name not in seen:
        seen.append(name)
```

### 2. Lists and dicts

A list is ordered. A dict maps a key to a value — a row, a config, a JSON object. Most chores are “walk a list of dicts.” You can live here for a long time.

### 3. Small functions, plain loops

A for loop you can read beats a clever one-liner you cannot. Ask for functions that take the rows and return the rows. Classes are optional and usually noise at this size.

```python
def kept(rows):
    return [row for row in rows if row["ok"]]
```

### 4. Read a file, write a different file

Open the input, write a new path, leave the original alone. Pass the path in from the command line so the script is not glued to your machine.

### 5. Print the middle

A wrong total with no error is the usual failure. Print one raw row and the count of skips before you believe the sum. If the script is silent, it is not done.

```python
total = sum(row["n"] for row in rows if row["ok"])
print(total)
```

## Leave these

They are real. They are not first. Come back when a task forces them.

- Metaclasses
- asyncio
- Multiple inheritance
- Dunder methods as a hobby
- A web framework on day one

## A prompt that works

Replace the brackets. Leave the constraints.

```text
Write one Python script, standard library only, that: [the chore].

Read a path passed on the command line.
Write a new file. Never overwrite the input.
Print how many rows were kept and how many were skipped.
Use functions. No classes.
Then give the exact command to run it on a copy of my file.
```

## Read this

Don’t write it. Decide what it does.

```python
rows = [
    {"ok": True, "n": 2},
    {"ok": False, "n": 5},
    {"ok": True, "n": 3},
]
total = sum(row["n"] for row in rows if row["ok"])
print(total)
```

### 1. What does this print?

- 5
- 10
- 2

<details><summary>Answer</summary>

5

The middle row is skipped because ok is false. 2 + 3 is 5. The 5 in the data is a value, not the total — a common mix-up when you skim.

</details>

### 2. The model changes the test to if row["ok"] == "true". The data is unchanged. What is total?

- 0. The flag is the boolean True, not the word true. No error is raised
- 5, because Python treats them as equal
- An exception, every time

<details><summary>Answer</summary>

0. The flag is the boolean True, not the word true. No error is raised

This is a quiet bug. The script exits cleanly and reports a confident zero. Print one row before you trust a total.

</details>
