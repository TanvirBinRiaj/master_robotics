# Handoff — Master Robotics Gap-Analysis Fix Pass (Oct 2026)

## 1. What was asked
Analyze the whole book, analyze the gaps against `_build/GAP_ANALYSIS.md`,
research with agent-reach, fix everything per the gap analysis, re-validate,
and leave a handoff.

## 2. Book analysis (what I read and measured)
- `node _build/validate.mjs` before changes: **PASS** (24 chapters + 2 appendices,
  all structurally valid, no emojis, no broken links).
- Audited every chapter's `<h2>` skeleton and keyword coverage with a script:
  structure follows `_build/WRITING-GUIDE.md` (goals, worked examples, mistakes,
  professionals, exercises, takeaways, quiz, SVG, formulas, code).
- Confirmed the gap analysis is **accurate**: the book is a strong beginner book
  (Arduino/PID/2-joint kinematics/ROS-1 concepts/workshop safety) and stops at
  undergraduate depth. No Lie groups, no QP/MPC/WBC, no ROS 2 production stack,
  no modern simulators, no functional-safety standards, no force control.

## 3. Research (agent-reach, Exa backend)
- ROS 2 + EtherCAT: `ethercat_driver_ros2` (ICube, Jazzy), CiA 402 modes
  8/9/10/6, ros2_control URDF integration.
- WBC/MPC: 2025 humanoid HQP framework (100 Hz SQP planner via OCS2 + 800 Hz
  QPOASES tracker, 1.2 m/s, 60 N recovery); QP solver benchmark (HPIPM, OSQP,
  qpOASES, DAQP, PROXQP; sparse MPC is O(N)).
- Safety: ISO 13849-1:2023 (PL a–e), IEC 61508 (SIL), safety-function FMEA as
  add-on to the 7-step AIAG-VDA FMEA.
- Sim-to-real: IIT DLSLab joint-calibration repo; MuJoCo-XLA differentiable
  system ID (~75% drift cut, trajectory-only data).
- Math: Blanco 2010 SE(3) tutorial (parameterizations + on-manifold Jacobians).
- Findings appended to `_build/RESEARCH-NOTES.md`.

## 4. What was fixed/added (Phase 1 "Master Engineer Core" — done)
| Item | File(s) |
|---|---|
| 6 new Tier-1 chapters, Part 7 "Advanced Foundations" (Ch25 math/Lie/QP, Ch26 WBC/MPC, Ch27 production software/ROS 2, Ch28 simulation/sim-to-real, Ch29 functional safety, Ch30 advanced manipulation/force) | `ch25-*.html` … `ch30-*.html` |
| Registered Part 7 + 2 appendices in single source of truth | `assets/js/data.js` |
| New Appendix C: Mathematical Reference | `appendix-c-math-reference.html` |
| New Appendix D: Debugging Cookbook | `appendix-d-debugging-cookbook.html` |
| Ch18 retitled to ROS 2 (+ desc/meta), bridge callout to Ch27 | `ch18-ros.html`, `data.js` |
| "Where this leads" bridge callouts linking beginner chapters to Part 7 | Ch02, Ch03, Ch06, Ch10, Ch15, Ch16, Ch18, Ch19, Ch21, Ch24 |
| Chapter counters 24 → 30 | all `ch*.html` |
| Glossary: new "Advanced foundations (Part 7)" term table (21 terms) | `glossary.html` |
| Resources: "Advanced path" reading list (Lynch/Park, Boyd, Thrun, Tedrake, open stacks) | `resources.html` |
| Homepage stats + TOC line (30 chapters, 7 parts, 4 appendices, ~12 h) | `index.html` |
| Research log update | `_build/RESEARCH-NOTES.md` |

Validation after changes: **PASS** — 32 files, zero errors (`node _build/validate.mjs`).

## 5. What is NOT done (left for next passes)
- **Tier 2 chapters** (supply chain, fleet/DevOps, EMI/EMC, legacy systems,
  technical leadership) — Ch35–39 in the gap analysis. Not started.
- **Tier 3 appendices** E (standards quick ref) and F (vendor errata DB) —
  partially covered by Appendix D; not split out.
- **Full Ch18 rewrite**: chapter body still teaches ROS 1 concepts first and
  bridges to ROS 2 via Ch27. A from-scratch ROS 2 rewrite remains open.
- **Phase 4 enhancement pass**: only bridge callouts were added to existing
  chapters; the deep +2,000-word upgrades per chapter (Ch2 ADRs, Ch6 torque
  actuators, Ch10 calibration, Ch15 feedforward, Ch17 VLM/TensorRT, Ch20
  TAMP/behavior trees, Ch22 second project) are still open.
- **Depth caveat**: Ch25 (~2.6k raw words) and Ch26 (~2.0k) are structurally
  complete (10 sections, formulas, SVG, code, 8 quiz) but shorter than the
  3,500–5,000-word guide target. Expand with `edit` passes if needed.
- Validation criteria 1–10 in the gap analysis are now *teachable* from the
  book, but hands-on project verification (real EtherCAT hardware, real FMEA
  sign-off) still needs a human with hardware.

## 6. How to continue
1. `node _build/validate.mjs` after every addition (must stay PASS).
2. New chapters: copy `_build/TEMPLATE.html`, keep `data-file`, register in
   `assets/js/data.js`, use `index.html#advanced` breadcrumb for Part 7.
3. Suggested next: Ch31 legged locomotion, Ch32 sensor fusion/SLAM, Ch33
   advanced robot learning, then Tier 2 practice chapters.
4. To check a chapter's weight: `node -e` word count or the `~N words` line
   in validator output.

## 7. File inventory of this pass
New: `ch25`, `ch26`, `ch27`, `ch28`, `ch29`, `ch30`, `appendix-c`,
`appendix-d`, `HANDOFF.md`. Edited: `data.js`, `index.html`, `glossary.html`,
`resources.html`, `ch02`, `ch03`, `ch06`, `ch10`, `ch15`, `ch16`, `ch18`,
`ch19`, `ch21`, `ch24`, `_build/RESEARCH-NOTES.md`.

## 8. Follow-up fix — theme toggle icon + dark/light switching (same day)
Reported from screenshot: the top-right toggle button rendered as an empty
box, and dark/light switching felt broken.

Root causes found in `assets/js/book.js`:
1. `init()` called `setTheme(getTheme())` **before** `buildTopbar()`, so
   `#themeToggle` did not exist when the icon HTML was painted; `buildTopbar()`
   then created the button with **no inner icon** — the empty box in the
   screenshot. Icon only appeared after the first click.
2. Icon name `bi-moon-stars` used; switched to guaranteed `bi-moon`/`bi-sun`.

Fixes applied:
- `assets/js/book.js`: init order is now `buildTopbar()` → `setTheme()`;
  the button is built with the correct icon for the stored theme via a new
  `currentIcon()` helper; `setTheme()` still refreshes icon + aria-label on
  every toggle.
- `assets/css/base.css`: added `color-scheme: light` / `dark` so native
  controls (scrollbars, search input) follow the theme.
- All 35 HTML files: tiny pre-paint `<script>` in `<head>` applies the saved
  `mr-theme` before first render — no light-flash on reload, theme persists
  across pages via localStorage.
- Verified with a Node DOM-stub harness: fresh load paints moon icon in
  light mode; click → `dark` + sun icon; click → `light` + moon icon;
  persisted value round-trips; stored `dark` restores dark + sun on load.
  `node --check` clean, `node _build/validate.mjs` **PASS**.

Git: baseline committed as `6eeeba3` ("Phase-1 gap-analysis pass"), this
handoff update committed separately on top.

## 9. Follow-up fix — theme resets when changing chapters (same day)
Symptom (screenshots): Chapter 1 stayed dark, but opening Chapter 2 loaded
light. Toggle icon was correct on each page, so the choice simply did not
travel across pages.

Root cause: persistence relied only on `localStorage`, which this browser
blocks for `file://` pages. The toggle changed the live page and the write
failed silently, so every new chapter fell back to the hardcoded `light`.

Fixes applied (commit `7945d72`):
- `assets/js/book.js`: three-layer theme resolution — stored value first
  (`localStorage`, then **cookie fallback**), then OS `prefers-color-scheme`,
  then light. Writes go to both `localStorage` and cookie.
- Same resolution logic mirrored into the pre-paint `<script>` in all 35
  HTML files, so the right theme is on before first paint.
- Side benefit: on a dark-OS machine every page now loads dark even with no
  stored choice (previously everything defaulted to light).
- Verified with a Node DOM-stub harness simulating blocked storage + dark
  OS: fresh load → dark; toggle writes cookie; next page reads cookie →
  same theme and icon. Validator **PASS**.

## 10. Real root cause + tab-relay fix (same day, after §9 did not hold)
§9's cookie fallback was not enough: reproduced in headless browsers on
this machine with probe pages (`localStorage` + `document.cookie` set on
one page, read on another, same profile):
- Chromium `file://`: localStorage persists across pages, cookies do not.
- Firefox `file://` (this browser's engine): **neither persists** — each
  page load gets fresh, memory-only storage. So no write-based persistence
  can carry the theme across chapters here.

Fix (commits `d3f9398`, cleanup `ba3c244`): carry the theme in
`window.name`, which travels with the tab across page loads in every
browser, no storage needed. `book.js` gained `readRelay()`/`writeRelay()`
(relay token preserved alongside any other `window.name` content);
resolution order is now stored → relay → OS → light, and the pre-paint
script in all 35 files mirrors it. Sidebar/pager links navigate in the
same tab, so the theme now follows chapter switches; fresh tabs fall back
to the OS setting. Verified in Node harness against the shipped bytes:
relay-dark beats OS-light, cookie-light beats OS-dark, empty state keeps
the old default. Validator **PASS**. (A literal `~/probe-test` dir from
the Chromium probe was briefly committed with `d3f9398` and removed in
`ba3c244`; probe files outside the repo were deleted.)

## 11. Private GitHub repo (same day)
Local `.git` (branch `main`) previously had no commits and no remote.
Created **private** repo `TanvirBinRiaj/master_robotics` via
`gh repo create master_robotics --private --source=. --push` and pushed
all commits: https://github.com/TanvirBinRiaj/master_robotics
(`main` tracks `origin/main`). Nothing public; working tree clean.
