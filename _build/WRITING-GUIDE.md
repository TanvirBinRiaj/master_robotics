# Writing guide — Master Robotics

You are writing ONE chapter (or appendix) of a web-based, plain-English
robotics book. Output a single complete `.html` file.

## Hard rules

1. **One file only.** Start at `<!DOCTYPE html>` and end at `</html>`. No extra
   commentary outside the file.
2. **Copy the exact skeleton from `_build/TEMPLATE.html`.** Keep all `<head>`
   links, the top bar/sidebar markup, and both `<script>` tags. Do not add or
   remove CSS/JS files.
3. **Set `<body data-file="...">` to your exact filename.** This drives the
   active sidebar item, search and pager. Wrong value = broken navigation.
4. **Final file lives in the project root** (same folder as `index.html`), so
   asset paths stay `assets/css/...` and chapter links are just `chXX-....html`.
5. **No emojis.** Icons only, via Bootstrap Icons `<i class="bi bi-...">`.
6. **No external images and no MathJax.** For diagrams, use inline `<svg>` with
   hardcoded colors that read on both light and dark backgrounds
   (use strokes/fills like `#2d5bff`, `#0f9d78`, `#7b849b`, `#1c2230`).
   Formulas use the `.formula` block with HTML entities (`&times;`, `&radic;`,
   `&theta;`, `&pi;`, `&deg;`, `&rarr;`).
7. **Only use the CSS classes documented below.** They already exist. Do not
   invent classes or add inline `<style>` blocks.
8. **Escape code inside `<pre><code>`**: `<` `>` `&` become `&lt;` `&gt;` `&amp;`.

## Language rules (this is the most important part)

The reader may be weak in English. Write so they never get lost.

- **Short sentences.** Aim for 8–16 words. One idea per sentence.
- **Plain words.** Use "start" not "commence", "use" not "utilise", "make"
  not "fabricate", "strong" not "robust" (unless you define it).
- **Define every technical term the first time.** Example:
  "Torque is the turning force of a motor. Think of opening a tight jar lid."
- **Explain with everyday things.** Jar lids, bicycle gears, water pipes,
  door hinges, phone charging.
- **Bold a key term** with `<strong>` when you introduce it, then reuse it.
- **No long lists of facts.** Explain one thing, give an example, then move on.
- **Second person.** Talk to "you". Be warm and direct, never condescending.
- **Show, then name.** Give the picture or example first, then the formal word.
- **Recap at the end** with the takeaways box.

## Style of a good paragraph (follow this shape)

> A motor turns electricity into movement. It does this with a spinning part
> called a shaft. The shaft spins, and you attach a wheel, a gear or a belt to
> it. If nothing is attached, the motor spins freely and does no useful work.
> To move a robot, we always attach something to the shaft.

Notice: short lines, concrete words, one small step at a time.

## Required structure (every chapter)

This is a full, professional reference book. Chapters are LONG and DETAILED.
Target **3,500–5,000 words of body text** per chapter (excluding code/HTML).
A reader must be able to go from zero to working knowledge from the chapter
alone, with no other source.

1. Breadcrumb, kicker, `<h1>`, `.lede`, `.chapter-meta`, `.goals` box
   (copy goals from `data.js` for your chapter).
2. **Opening story or scene** — 2–4 short paragraphs that place the topic in
   real life and motivate it.
3. Body: **7–10 `<h2>` sections**, each with `<h3>` subsections. Every section
   must teach, not just list. Include, spread across the chapter:
   - at least 3 callouts of different types,
   - at least 1 table,
   - at least 1 formula or worked calculation (use `.formula`),
   - at least 1 inline-SVG figure,
   - at least 1 code block for software chapters (or a procedure block),
   - at least 2 numbered "step by step" or "how to" lists.
4. **A worked example** section that solves a real, concrete problem from start
   to finish, showing every step and the reasoning between steps.
5. **Common mistakes** section — the errors beginners make and how to avoid them.
6. **"How professionals do it"** section — what changes at industrial scale.
7. **Try it yourself** section — 3–5 hands-on exercises, from easy to harder,
   with a short hint for each.
8. **Going deeper** (optional) — one advanced idea for curious readers, marked
   clearly as optional.
9. `.takeaways` box with 5–7 short takeaways.
10. `.quiz` with 5–8 question/answer `<details>` items (mix easy and hard).
11. The `#pager` nav (leave empty — JS fills it).

## How to produce a long chapter without breaking

Your output limit per message is about 8,000 tokens, so a full 4,000-word
chapter will not fit in one write. Build it in **two or three passes**:

1. First `write` the file with `<head>`, the chapter header, the first few
   `<h2>` sections, and CLOSE the file properly (end with the `.takeaways`,
   `.quiz`, `pager` and closing tags). This makes a valid, working file.
2. Then use `edit` calls to expand it: replace the placeholder block between
   the last written section and the `<section class="takeaways">` with more
   sections plus that marker again. Repeat until the chapter is complete.
   Keep the `<section class="takeaways">` marker exactly so you always have a
   safe place to insert before.
3. Do the same to add the worked example, mistakes, professional practice,
   exercises and extra quiz rows.

Do NOT try to emit the whole chapter in a single message. Do NOT leave
placeholder text like "TODO" or "more here" — every section must be real.

## Available components (exact markup)

### Callouts
```html
<div class="callout note">
  <div class="callout__head"><i class="bi bi-info-circle-fill"></i> Note</div>
  <p>Text.</p>
</div>
```
Types and matching icon: `simple`=bi-translate, `tip`=bi-lightbulb,
`note`=bi-info-circle-fill, `warn`=bi-exclamation-triangle-fill,
`danger`=bi-shield-exclamation, `key`=bi-key-fill. Use `simple` for a
"plain English translation" box — very useful for weak-English readers.

### Code block
```html
<div class="code">
  <div class="code__bar">
    <span class="code__dots"><span></span><span></span><span></span></span>
    <span class="code__lang">Python</span>
    <button class="code__copy" type="button"><i class="bi bi-clipboard"></i> Copy</button>
  </div>
  <pre><code>print("hello")</code></pre>
</div>
```

### Table
```html
<div class="table-wrap">
  <table>
    <thead><tr><th>Motor</th><th>Best for</th></tr></thead>
    <tbody><tr><td>DC</td><td>Wheels</td></tr></tbody>
  </table>
</div>
```

### Formula
```html
<div class="formula"><span class="label">Ohm's law</span> V = I &times; R</div>
```

### Figure (inline SVG)
```html
<figure class="figure">
  <div class="figure__box">
    <svg viewBox="0 0 420 160" width="100%" role="img" aria-label="...">
      <rect x="20" y="40" width="120" height="60" rx="10" fill="#e8eeff" stroke="#2d5bff"/>
      <text x="80" y="76" text-anchor="middle" font-family="Inter, sans-serif" font-size="14" fill="#1c2230">Motor</text>
    </svg>
  </div>
  <figcaption>Figure 1. The motor connects to the wheel.</figcaption>
</figure>
```

### Takeaways
```html
<section class="takeaways">
  <h2><i class="bi bi-pin-angle-fill"></i> Key takeaways</h2>
  <ul>
    <li><i class="bi bi-check2-circle"></i> Point.</li>
  </ul>
</section>
```

### Quiz
```html
<section class="quiz">
  <div class="quiz__head"><i class="bi bi-patch-question-fill"></i> Check your understanding</div>
  <details>
    <summary><span class="q-num">Q1.</span><span>Question?</span><i class="bi bi-chevron-down chev"></i></summary>
    <div class="answer"><strong>Answer.</strong> Text.</div>
  </details>
</section>
```

## Breadcrumb / kicker per part

Use the same `chapter-kicker` text and breadcrumb part link for every chapter
in a part:

- Part 1 Foundations — icon `bi-rocket-takeoff`, anchor `index.html#foundations`
- Part 2 Mechanics and Motion — icon `bi-gear-wide-connected`, anchor `index.html#mechanics`
- Part 3 Electronics and Power — icon `bi-cpu`, anchor `index.html#electronics`
- Part 4 Software and Control — icon `bi-code-slash`, anchor `index.html#software`
- Part 5 Robot Intelligence — icon `bi-diagram-3`, anchor `index.html#intelligence`
- Part 6 Practice and Career — icon `bi-mortarboard`, anchor `index.html#career`
- Appendices — icon `bi-collection`, anchor `index.html#contents`

## Your assignment

You will be told your exact filename, chapter number, title, part, and the
three learning goals. Use them exactly. Write the finished HTML file to the
given path. Do not summarise; produce the file.