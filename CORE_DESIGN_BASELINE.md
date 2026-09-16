# Core design baseline — do not deviate from this without explicit approval

**Marked:** 2026-09-16
**Source repo:** `Pinkycherry/newbusinessideas3`
**Source commit:** `8cc5263b2c8d0f9d4f69c0d9f0ae5edaaf474a8a` ("Merge pull request #25 from Pinkycherry/llm/sharp-goodall-qefesa", 2026-09-10 12:13:00 +0530)
**Safety copy (branch, pushed):** https://github.com/Pinkycherry/newbusinessideas3/tree/core-baseline-2026-09-16
**Safety copy (files, in this repo):** [`baseline-reference/core-design-2026-09-16/`](./baseline-reference/core-design-2026-09-16) — a verbatim copy of that commit's `src/`, `public/`, and config files. Not imported or built by this app; it exists purely as an inert, always-available reference so this design can never be lost again regardless of what happens on any working branch.
**Live reference at time of marking:** https://newbusinessideas3-b1llrvo94-pinky12.vercel.app/

## Why this file exists

This design was built and pushed once, correctly. The founder then made a
separate copy of it — this repo, `BBI-With-ChatGPT` — to keep experimenting
with UI variations without risking the original. That experimentation (the
"liquid glass" pass and everything downstream of it) did not land — colors,
contrast, and the glass effect itself went through many rounds and ended up
worse than the starting point, not better.

This file, the pushed branch, and the copied files above are the recovery
point. From now on: **any new UI work starts from this baseline, not from
whatever is currently on the working branch.** If a UI attempt fails again,
the way back is here, not lost in commit history.

## What the baseline design actually is

Read directly from `src/styles.css` in the source commit — this is not a
description reconstructed from memory, it's what the file says:

- **Cards are flat and opaque, not glass.** `--card: #FFFFFF`. The file's own
  comment: *"A plate is printed, not frosted — this single value is what
  stops every card in the site reading as glass."* This is a deliberate,
  stated rejection of glassmorphism, not an omission.
- **Ground:** `--background: #F7F6FB`, `--background-2: #EFEDF7` — a very
  light, cool, paper-like tone.
- **Ink:** `--foreground: #12122E` — dark navy text on the paper ground.
- **Brand violet (`#4643BA`) is ink, not glow.** It's used for rules, borders,
  and marks — never as a gradient wash, blurred glass tint, or colored
  shadow. `--border: rgba(70, 67, 186, 0.22)` — a drawn line at a readable
  weight, not a soft frosted edge.
- **Four semantic accent colors**, each contrast-checked against both the
  page ground and a white card, each carrying a specific meaning (not used
  decoratively):
  - gold `#8A5D00` — emphasis, labels, eyebrows, "free"
  - green `#0F6E44` — a positive verdict: build it, included, live
  - coral `#B0442C` — a cost or risk: what hurts, what to watch
  - teal `#10627A` — data: trend scores, counts, measured figures
- **Structure and hierarchy come from drawn lines and opaque plates, not
  shadows or blur.** No backdrop-filter-driven glass system anywhere in the
  core token set.
- **One unified styling system.** No separate homepage-only CSS file, no
  competing token namespace, no dark "void" mode — `html.light` is the only
  live theme, applied everywhere.

## Standing instruction

Do not reintroduce glassmorphism, dark-mode-by-default, or a second/competing
CSS token system without the founder explicitly asking for it again, in those
words, in a fresh conversation. Read this file and
`baseline-reference/core-design-2026-09-16/src/styles.css` before starting any
new visual work on this repo.
