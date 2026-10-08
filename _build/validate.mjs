// Validates the Master Robotics book: every chapter file exists, has the
// correct data-file, links only to real assets/chapters, and contains the
// required structural pieces. Run: node _build/validate.mjs
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataSrc = readFileSync(join(root, "assets/js/data.js"), "utf8");
const { PARTS, FLAT, APPENDICES } = new Function(
  dataSrc + "; return { PARTS, FLAT, APPENDICES };"
)();

const files = [];
PARTS.forEach((p) => p.chapters.forEach((c) => files.push({ ...c, chapter: true })));
APPENDICES.forEach((a) => files.push({ ...a, chapter: false }));

let errors = 0;
const warn = (m) => { errors++; console.log("  FAIL " + m); };

console.log(`Validating ${files.length} files...\n`);

for (const f of files) {
  const path = join(root, f.file);
  if (!existsSync(path)) { warn(`${f.file}: MISSING`); continue; }
  const html = readFileSync(path, "utf8");
  const checks = [
    [html.includes(`data-file="${f.file}"`), `data-file must equal "${f.file}"`],
    [html.startsWith("<!DOCTYPE html>"), "must start with <!DOCTYPE html>"],
    [/<\/html>\s*$/.test(html.trimEnd()), "must end with </html>"],
    [html.includes('href="assets/css/base.css"'), "missing base.css link"],
    [html.includes('href="assets/css/prose.css"'), "missing prose.css link"],
    [html.includes('src="assets/js/data.js"'), "missing data.js script"],
    [html.includes('src="assets/js/book.js"'), "missing book.js script"],
    [html.includes('id="sidebar"'), "missing sidebar mount"],
    [html.includes('id="pager"'), "missing pager mount"],
    [html.includes('class="article"'), "missing article body"],
    [html.includes("<h1>"), "missing h1"],
    [!/\u{1F300}-\u{1FAFF}/u.test(html), "must not contain emojis"],
    [!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(html), "unexpected timestamp"],
  ];
  if (f.chapter) {
    checks.push(
      [html.includes('class="takeaways"'), "missing takeaways section"],
      [html.includes('class="quiz"'), "missing quiz section"],
    );
  }
  for (const [ok, msg] of checks) if (!ok) warn(`${f.file}: ${msg}`);

  // Internal href/src targets must exist
  const refs = [...html.matchAll(/(?:href|src)="((?!https?:|#|mailto:)[^"]+)"/g)];
  for (const [, ref] of refs) {
    const target = ref.split("#")[0];
    if (!target) continue;
    if (!existsSync(join(root, target))) warn(`${f.file}: broken link -> ${ref}`);
  }
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  console.log(`  ok   ${f.file}  (~${words} words raw)`);
}

// Every chapter referenced in data must have a file, and vice versa.
const onDisk = readdirSync(root).filter((n) => /^ch\d+.*\.html$/.test(n));
for (const n of onDisk) {
  if (!files.some((f) => f.file === n)) warn(`orphan file on disk: ${n}`);
}

console.log(`\n${errors === 0 ? "PASS" : errors + " problem(s) found"}`);
process.exit(errors === 0 ? 0 : 1);