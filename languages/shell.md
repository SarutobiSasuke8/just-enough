# The shell

How you run what the model just wrote.

The shell is not a language you study for its own sake. It is how you run a script, look at a log, and refuse a command that deletes or downloads more than you asked.

About 15 minutes.

## If you only remember one thing

Read a command before it runs. Quotes are not decoration. rm does not have an undo.

## You can already ask for

1. **Run the script, from the right folder.** The failure is often “you were somewhere else,” not the language.
2. **Search a project for a string.** Find the function the model named before you assume it exists.
3. **See the end of a log.** The last twenty lines answer more than a dashboard does.
4. **A pipe, once.** One command’s text becomes the next command’s input. Then stop. You do not need a novel.

## Know these

### 1. You are always in a folder

pwd prints where you are. ls lists it. cd moves. If a path in the model’s command does not match pwd, do not run the command yet.

```shell
pwd
ls
cd projects/notes
```

### 2. A command returns a code

Zero means it reported success. Anything else means it did not. A script that keeps going after a failure will do the next, wrong thing. Ask the model to stop on errors.

### 3. Pipes pass text

A pipe takes the output of one command and feeds it to the next. ls lists, wc -l counts lines. When a count looks absurd, run the left side alone.

```shell
ls *.txt | wc -l
```

### 4. Quotes keep one piece

Without quotes, spaces split a path into several arguments, and an empty variable can disappear. Quote paths. If a variable might be empty, test it before you use it near rm.

```shell
if [ -z "$DIR" ] || [ "$DIR" = "/" ]; then
  echo "refusing: DIR is empty or root"
  exit 1
fi
rm -rf -- "$DIR"
```

### 5. Read it before it deletes or downloads

Treat sudo, rm, and curl piped into a shell as stop signs. Ask what will be touched. Echo variables first. Run against a copy. The model is optimizing for a command that looks complete.

## Leave these

They are real. They are not first. Come back when a task forces them.

- A custom prompt theme
- awk as a second career
- Writing your own framework of aliases
- Bash golf
- Memorizing flags you can look up

## A prompt that works

Replace the brackets. Leave the constraints.

```text
I want to: [goal], in this folder.

Give me the commands one at a time, not a script that deletes or downloads.
Do not use sudo. Do not use rm -rf. Do not pipe curl into a shell.
Before any command that changes files, show a command that only prints what would change.
Quote every path.
```

## Read this

Don’t write it. Decide what it does.

```shell
rm -rf $DIR/
```

### 1. DIR is empty because an earlier command failed. What can this line become?

- rm -rf /, which starts at the root of the disk
- A harmless no-op that deletes nothing
- A prompt that asks you to confirm

<details><summary>Answer</summary>

rm -rf /, which starts at the root of the disk

The slash is not inside the variable. An empty DIR leaves the slash, and the slash is the root. rm will not ask. Refuse the command.

</details>

### 2. A model suggests a delete, or curl piped into a shell. What do you do?

- Read it. Print the variables. Run it only if you can say what it will touch
- Run it, then read the output to see if it was fine
- Add sudo so permissions do not interrupt it

<details><summary>Answer</summary>

Read it. Print the variables. Run it only if you can say what it will touch

Speed is the model's priority. Being able to undo is yours. sudo widens the damage. A printed preview is the cheaper first step.

</details>
