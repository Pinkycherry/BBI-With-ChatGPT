# Core design baseline — do not deviate from this without explicit approval

**Marked:** 2026-09-16
**Source repo:** `Pinkycherry/newbusinessideas3`
**Source branch:** `claude/bbi-continuation-sj6nbr`
**Source commit:** `f867552e79184b1165a1d42d7c61b64cbd10e568` ("Point /blog at Supabase blog_posts instead of WordPress", 2026-09-14 13:20:46 UTC)
**Safety copy (branch, pushed):** https://github.com/Pinkycherry/newbusinessideas3/tree/core-baseline-2026-09-16-instrument
**Safety copy (files, in this repo):** [`baseline-reference/core-design-2026-09-16/`](./baseline-reference/core-design-2026-09-16) — a verbatim copy of that commit's `src/`, `public/`, and config files. Not imported or built by this app; it exists purely as an inert, always-available reference so this design can never be lost again regardless of what happens on any working branch.
**Confirmed live at:** the deployment the founder captured directly from Vercel's dashboard (Deployment `Bm6uLFVFC`, commit `f867552`, domain `newbusinessideas3.vercel.app`).

## Correction on the record

An earlier version of this file pointed at commit `8cc5263` (the tip of
`main`). That was wrong — `main`'s homepage still renders the plain light
hero, not the dark instrument panel the founder is actually asking to keep.
The correct commit was identified from the founder's own Vercel deployment
screenshot, which shows the exact git commit a given deployment was built
from. The safety branch and file copy above have been rebuilt from `f867552`
and supersede anything saved under the old commit.

## What the baseline design actually is

This is not one flat theme — it's **two modes, cleanly scoped**, both defined
in `src/styles.css` and switched by a single `tone` prop on the shared
`SiteShell` component. Read directly from source, not reconstructed from a
screenshot.

### Mode 1 — the light template (every page except the homepage)

- Paper ground: `--background: #F7F6FB`, ink text: `--foreground: #12122E`.
- **Cards are flat and opaque, not glass:** `--card: #FFFFFF`. The file's own
  comment: *"A plate is printed, not frosted — this single value is what
  stops every card in the site reading as glass."*
- Brand violet `#4643BA` is used as **ink** — rules, borders, marks — never as
  a glow, blur, or gradient wash.
- Four semantic accent colors, each contrast-checked, each meaning something
  specific: gold (emphasis/labels), green (positive verdict), coral
  (cost/risk), teal (data/trend scores) — never used decoratively.

### Mode 2 — "The Instrument" (homepage only, `<SiteShell tone="instrument">`)

Scoped entirely to a `.bbi-instrument` class, applied only on `/`, so every
other route keeps Mode 1 untouched. From the file's own design note:

> BBI's one committed idea: the library is a measuring instrument, not a
> brochure about one... The trap this has to avoid is well known —
> "near-black ground plus one bright accent" is the second-commonest
> generated-page look there is. **Darkness is not what makes this an
> instrument. DENSITY is:** real readings, tabular numerals, rules that
> divide two actual things, and more legible information per screen than a
> marketing page would dare. If a section here ends up airy, with big
> padding and a glow, it has become the cliché and should be rebuilt tighter.

Its palette is a strict five-value grayscale, named "the ethereal dream
palette" in the source comment, and stated as **the only colors allowed in
this scope, animations included**:

| Token | Value | Role |
|---|---|---|
| `--ins-void` | `#141414` | the ground — dark, deliberately not pure black |
| `--ins-face` / `--ins-face-2` | `#1e1e1e` / `#262626` | module/card faces, one and two steps up from the ground |
| `--ins-read` | `#e0e0e0` | body text |
| `--ins-dim` | `#b2b2b2` | secondary text |
| `--ins-faint` | `#757575` | non-load-bearing marks only (3.4:1 — not body text) |
| `--ins-signal` / `--ins-bright` | `#ffffff` | the loudest element on the page — signal is pure white |
| `--ins-black` | `#000000` | reserved for contrast, not used as the page ground |

`--radius: 0` in this scope — sharp corners, no soft glass edges. No indigo,
no teal, no accent hue anywhere inside `.bbi-instrument`; the four highlight
tokens (gold/green/coral/teal) all resolve to greyscale here. The header and
footer are the *same* `SiteShell` markup used everywhere else, repainted via
scoped CSS — not a separate component tree — which is also why it survives
future edits to shared nav/footer content without drifting out of sync.

The file also documents the one real cascade trap hit while building this
(kept here because it will bite again if forgotten): a `--foreground` custom
property redefined on `.bbi-instrument` does **not** reach `text-foreground`
utility classes, because `--color-foreground: var(--foreground)` already
resolved on `:root` and descendants inherit the substituted value, not a live
reference. Both the raw variable and its `--color-*` alias have to be set at
the same scope.

## Standing instruction

Do not reintroduce a third styling system, an ad-hoc dark-mode flip, or
glassmorphism on top of either of these two modes without the founder
explicitly asking for it again, in those words, in a fresh conversation.
Read this file and `baseline-reference/core-design-2026-09-16/src/styles.css`
before starting any new visual work on this repo. If a homepage-only dark
treatment is ever needed again, it already exists — as `tone="instrument"` —
rather than something to reinvent.
