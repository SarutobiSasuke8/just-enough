# HTML & CSS

What a person actually sees.

Two languages, one job: the page. Models are fluent in both and careless about meaning. You supply the meaning.

About 25 minutes.

## If you only remember one thing

If a person can activate it, it is a button. If it goes somewhere, it is a link. Do not fake either with a div.

## You can already ask for

1. **A single page with a real heading order.** One h1, then sections that say what they are. Enough for a landing page, a note, or a personal site.
2. **A form that works on a phone.** Labels tied to inputs, a real submit button, errors written in the page rather than only in the console.
3. **A layout that does not scroll sideways.** At 390 pixels wide the words still fit. This is the check most generated pages fail.
4. **A correction of the card habit.** You can tell the model to stop wrapping every block in a shadow. Taste is the part you still do.

## Know these

### 1. Tags have meaning

HTML is not a way to make boxes. A heading is a heading, a list is a list, a paragraph is a paragraph. Screen readers, search, and your future self all use that meaning. Style comes second.

```html
<main>
  <h1>Office hours</h1>
  <p>Tuesdays, by appointment.</p>
  <a href="/book">Book a time</a>
</main>
```

### 2. The box

Every element is a box. Padding is space inside the border. Margin is space outside it. Set border-box once so width means the width you see. Then stop fighting the model.

```css
* { box-sizing: border-box; }

.note {
  max-width: 40rem;
  padding: 1rem;
  margin-block: 1.5rem;
}
```

### 3. Flex for a row, grid for a page

Flex lines things up in one direction and lets them wrap. Grid is for regions: a side column and a main column. You do not need a framework to do either.

```css
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}
```

### 4. Type and space first

A page looks finished when the type has two sizes that agree, the line length stays near 65 characters, and related things sit closer than unrelated things. Color is the last dial, not the first.

### 5. Keyboard and a narrow phone

Tab through the page. Every control should show focus and work with Enter or Space. Then narrow the window. If you have to scroll sideways, the layout is not done.

## Leave these

They are real. They are not first. Come back when a task forces them.

- Float layouts
- CSS-in-JS arguments
- Animation as a personality
- A design system you do not own
- Pixel matching before the words are right

## A prompt that works

Replace the brackets. Leave the constraints.

```text
Design one page for: [who it is for, and what they should do].

Use semantic HTML: one h1, real button and a elements, a form if there is input.
Use one plain <style> block. No framework. No icon font.
Lay it out with flex or grid. It must be readable at 390px wide with no horizontal scrolling.
Prefer a small type scale and generous space over color and shadow.
Do not wrap every section in a card.
```

## Read this

Don’t write it. Decide what it does.

```html
<div class="buy" onclick="buy()">Buy</div>
```

### 1. What is wrong with this for someone using a keyboard?

- They cannot tab to it, and a screen reader may not call it a button
- onclick was removed from browsers
- A div cannot be seen on a phone

<details><summary>Answer</summary>

They cannot tab to it, and a screen reader may not call it a button

A div is not in the tab order, and Enter does nothing unless extra code is written. The model reached for a div because it was styling a box. You are responsible for the meaning.

</details>

### 2. What should you ask for instead?

- A button with type="button"
- A span with a pointer cursor
- An image of a button

<details><summary>Answer</summary>

A button with type="button"

A button is focusable, activates with Enter and Space, and is announced correctly. That is the whole fix. The class name can stay.

</details>
