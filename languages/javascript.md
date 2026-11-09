# JavaScript

The language already in the browser.

JavaScript is what most models emit first, and what runs in the page without a build step. You need enough of it to ask for a small tool and to spot a list that was handled wrong.

About 20 minutes.

## If you only remember one thing

Most of what you ask for is: take a list, keep some of it, reshape the rest.

## You can already ask for

1. **A page that filters as you type.** One file. An input, a list, no framework. Useful the same day.
2. **A CSV you already have, narrowed by a rule.** Drop the file in, keep the rows that match, show them. The model can write this if you forbid a build step.
3. **One API, rendered as sentences.** Fetch a public endpoint and show three fields. Not a client library. A page.
4. **A form that catches the obvious mistakes.** Empty fields, a number that is not a number. Shown on the page, not only in an alert.

## Know these

### 1. A name holds a value

const names something that will not be reassigned. Start there. You rarely need var, and you rarely need a class. Data is numbers, strings, booleans, lists, and objects.

```javascript
const city = "Lisbon";
const open = true;
const seats = 12;
```

### 2. Functions are the unit to ask for

Ask for small functions with obvious inputs and outputs. If a function does two things, it is two functions. A comment above it should say what goes in and what comes out — that is how you review it.

```javascript
function label(cents) {
  return "$" + (cents / 100).toFixed(2);
}
```

### 3. filter, map, find

filter keeps some items. map reshapes every item and keeps the length. find returns the first match or undefined. When a result is the wrong length, one of these was the wrong choice.

```javascript
const prices = [12, 4, 9, 15];
const big = prices.filter((price) => price > 10);
const labels = big.map((price) => "$" + price);
```

### 4. Objects are labeled bags

An object groups fields that belong together: a person, a row, a response. Read them with dot or brackets. If the model invents a field you did not ask for, that is the first thing to delete.

### 5. await means the answer arrives later

fetch starts a request. await pauses that function until the response is there. You need this one pattern. You do not need the history of callbacks to use it. Always decide what the page shows if the request fails.

```javascript
async function loadTitle(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Request failed");
  const data = await response.json();
  return data.title;
}
```

## Leave these

They are real. They are not first. Come back when a task forces them.

- The prototype chain
- How this gets bound
- Classes as a requirement
- Bundlers and build configuration
- Hoisting puzzles

## A prompt that works

Replace the brackets. Leave the constraints.

```text
Write one HTML file with a plain <script>. No libraries, no build step, no classes.

Goal: [what the page should do, and the sample data].

Use const, small functions, and filter / map / find.
Above each function, add one comment naming its input and output.
If something can fail (empty list, bad input, a failed request), show a sentence on the page. Do not fail silently.
```

## Read this

Don’t write it. Decide what it does.

```javascript
const prices = [12, 4, 9, 15];
const big = prices.filter((price) => price > 10);
const labels = big.map((price) => "$" + price);
console.log(labels.length);
```

### 1. What does this print?

- 2
- 4
- "$12"

<details><summary>Answer</summary>

2

filter keeps 12 and 15. map only changes how they look. length counts items, so it is 2.

</details>

### 2. A model rewrites the filter as map, returning the price or null, and treats the result as “only the expensive ones.” What broke?

- The list is still length 4, and later code may count the nulls
- map is not allowed to return numbers
- filter is the only method that runs

<details><summary>Answer</summary>

The list is still length 4, and later code may count the nulls

map always emits one item per input. A null is still an item. “Only some of them” is filter.

</details>
