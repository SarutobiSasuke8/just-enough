# TypeScript

A checker for code you did not write.

TypeScript is JavaScript with the shapes written down. For you, it is less a language to author and more a second reader that flags fields the model invented.

About 20 minutes.

## If you only remember one thing

If a field is not in the type, the model invented it. Do not silence that with any.

## You can already ask for

1. **Paste generated JavaScript in and read the red marks.** The marks are a list of assumptions. That list is often the whole review.
2. **Write the shape of a response before the client.** You describe the JSON you actually saw. Then ask for code that only touches those fields.
3. **A signature that states in and out.** One function, typed arguments, typed return. Easier to trust than eighty untyped lines.
4. **A “it worked on my sample” bug, made visible.** The sample happened to have the field. The type says the next one might not.

## Know these

### 1. A type is a shape, not a value

Types disappear when the program runs. They exist so the editor can refuse impossible reads. Writing a type does not create the data.

```typescript
type Task = {
  id: string;
  title: string;
  done: boolean;
};
```

### 2. Signatures are the documentation

The most useful type is on a function: what it accepts, what it returns. Ask the model for that before it writes the body. You can review a signature in one look.

```typescript
function openTitles(tasks: Task[]): string[] {
  return tasks.filter((task) => !task.done).map((task) => task.title);
}
```

### 3. A value might be missing

string | null means you have to decide the missing case. Models like to pretend a field is always there. A union forces the other branch into the open.

### 4. Read the error as a location

A TypeScript error points at a specific read or call. Start there, not at the top of the file. The message is naming a shape that does not match. Believe the location even when the wording is clumsy.

### 5. any dismisses the checker

any says “stop looking.” It is sometimes a temporary bridge, and it is easy to leave in. If the model adds any to make a file go green, it hid the finding you wanted.

## Leave these

They are real. They are not first. Come back when a task forces them.

- Conditional types
- Mapped-type gymnastics
- Decorators
- Declaration merging
- tsconfig archaeology

## A prompt that works

Replace the brackets. Leave the constraints.

```text
Here is code an assistant wrote, and one real example of the data:

[paste the code]
[paste one real value]

Add TypeScript types that match the example, not the code's wishes.
Do not use any. Do not rewrite the logic yet.
List every place the code touches a field that is not in the type.
```

## Read this

Don’t write it. Decide what it does.

```typescript
type Task = { id: string; title: string; done: boolean };

function openTitles(tasks: Task[]) {
  return tasks.filter((task) => !task.done).map((task) => task.title);
}
```

### 1. What kind of value does openTitles return?

- A list of strings
- A list of tasks
- A list of booleans

<details><summary>Answer</summary>

A list of strings

filter keeps tasks that are not done. map then pulls out title, which is a string. The list of tasks is gone.

</details>

### 2. The model inserts task.owner inside the map. Task has no owner. What should you expect?

- A type error. The field was invented
- An empty string, filled in automatically
- Nothing, until a customer complains

<details><summary>Answer</summary>

A type error. The field was invented

This is why the type is there. The checker does not get tired and it does not share the model's confidence. Do not “fix” it by adding owner unless you have seen owner in real data.

</details>
