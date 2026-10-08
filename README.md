# Master Robotics — From Absolute Beginner to Professional Engineer

A complete, plain-English, web-based robotics book. Written for readers who are
new to robotics and may be weak in English: short sentences, everyday examples,
every term defined, and icons instead of emojis.

## What it is

- **24 chapters** across **6 parts**, plus **2 appendices** (glossary, resources).
- Each chapter is a **long, self-contained lesson** (roughly 3,500–5,500 words)
  with learning goals, worked examples, figures, formulas, code, tables,
  callouts, a "common mistakes" section, a "how professionals do it" section,
  hands-on exercises, key takeaways and a quiz.
- Fully static HTML/CSS/JS — **no build step, no server required**. Works from
  `file://` or any static host.

## Parts

1. Foundations — what a robot is, engineering thinking, safety
2. Mechanics and Motion — tools, structure, motors, gears, solid design
3. Electronics and Power — electricity, sensors, boards, batteries, wiring
4. Software and Control — programming, control systems, kinematics, vision, ROS
5. Robot Intelligence — learning, path planning, manipulation
6. Practice and Career — first project, industry, becoming professional

## Design

- Custom design system (`assets/css/base.css`, `assets/css/prose.css`).
- Shared reader engine (`assets/js/book.js`) renders the sidebar, search,
  theme toggle, reading-progress bar, pagination and the home table of contents
  from a single source of truth (`assets/js/data.js`).
- Bootstrap Icons via CDN. Fonts via Google Fonts. No emojis anywhere.
- Light and dark themes, responsive down to phones, and print styles.

## Viewing the book

Open `index.html` in a browser. For search and navigation to work nicely over
HTTP as well, you can serve the folder:

```bash
cd master_robotics
python3 -m http.server 8080
# then open http://localhost:8080
```

## Adding or editing a chapter

1. `assets/js/data.js` is the single source of truth. Add or edit the chapter
   there (title, file, part, goals, minutes, level).
2. Use `_build/TEMPLATE.html` as the starting skeleton. Keep the `<head>` links,
   the `topbar`/`sidebar` mount points, `#pager`, and the two `<script>` tags.
3. Set `<body data-file="...">` to the exact chapter filename.
4. Only use the CSS classes documented in `_build/WRITING-GUIDE.md`.

## Validating

With Node.js installed:

```bash
node _build/validate.mjs
```

This checks that every chapter exists, has the right `data-file`, links only to
real files, contains the required structural pieces, and has no emojis.

## Writing style rules

See `_build/WRITING-GUIDE.md`. The core promise: a reader weak in English can
understand every page without help.