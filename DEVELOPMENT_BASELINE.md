# Development baseline — 13 September 2026

## Source of truth

The founder selected https://newbusinessideas3-qtkbqrlk7-pinky12.vercel.app/.
The Vercel project dashboard identifies its source as
https://github.com/Pinkycherry/newbusinessideas3/commit/6970de8712790fa0d6896d0cde6cf9969937af59
on `claude/bbi-continuation-sj6nbr`. Do not infer the baseline from `main`.

Restoration commit `51d3025` in this copied repository has the exact same tree
as that source: `56b14b9c533d64e824dc8c35acea4d144094766a`. This includes every
tracked file, docs, assets, pipeline definitions and WordPress files. The
previous Nomu homepage remains on `codex/homepage-nomu` and in main's history.
The original source repository and its Vercel project are backup/reference only.

The founder's current instructions supersede the historical source-only branch
rule in CLAUDE.md. Development belongs in Pinkycherry/BBI-With-ChatGPT, using
`codex/` branches and ordinary commits. No force pushes. Its Vercel project is
`pinky12/bbi-with-chat-gpt`; `businessidea.io` is not connected yet.

## Product understanding

Reviewed PRODUCT.md, PROJECT_BRIEF.md, CLAUDE.md, BUTTERFLY_EFFECT.md, DESIGN.md,
DESIGN-VERSION.md, DESIGN_WORKFLOW.md, IMAGE_SEO.md, the dated handoff and
WHAT_THE_USER_NEEDS_2026-08-24.md, plus the drawback/status register in PENDING2.md.
These are historical documents with conflicting states; source code and the
selected deployment take precedence for what is actually built.

The founder identifies https://ideaproof.io/ as the parent/reference product.
Its live presentation combines validation, market research, business plans,
branding and credit-priced tools. Its current public pricing describes credits,
not only monthly subscriptions. Avoid blanket claims about every competitor.

BBI's distinct mechanism is researched, organized blueprints and accessible
platform access. Four questions: buyer, revenue mechanics, first-year risks,
founder fit. India first, built for the world. The master brief specifies public
browsing, Google sign-in for complete idea content, and an active access plan for
the validation handoff: INR199/3 months or INR399/lifetime. BBI does not charge per
validation; use of an external AI account may have its own terms and limits.

Preserve the Golden Tree, real catalog, search, Surprise Me, idea routes,
validation, auth and pricing implementation. No database or pipeline changes.
Old public copy contains conflicting claims about full free access versus
gating, and one-plan versus two-plan pricing; keep these recorded for a dedicated
copy audit instead of silently treating all historical copy as verified.
PENDING2's backlog is historical, not a fresh verification of missing routes.

## Homepage pass

The exact restoration is a separate commit from visual changes. The visual pass
reworks the existing hero and its two explanatory panels, then adds scoped depth
to the existing Golden Tree and section entrances. No new marketing sections.

- Original headline retained; gold sculpture and green research deck create a
  visual identity that grows out of BBI's existing tree.
- Pointer tilt uses CSS 3D transforms; scroll drives the sculpture and orbital
  lines. This is a layered image composition, not a downloadable 3D mesh.
- Keyboard-operable research tabs; four genuine blueprint principles.
- Lazy GSAP, no new runtime dependency, 39,618-byte hero WebP. No decorative
  homepage WebGL canvases or global glow trail on this pass.
- Reduced-motion fallback, visible SSR content, sculpture pause control,
  responsive single-column layout. Existing page features remain intact.

## Generated artwork provenance and SEO

File: `public/images/home/golden-seed-business-idea-research-growth-sculpture.webp`
Alt: Golden sculpture unfolds upward.
Focus: business idea research.
Supporting: startup blueprint; founder research; business growth.
Long-tail: research a business idea before spending money; find a researched
business blueprint for a first venture.
Description: Business idea research begins with a seed of possibility, represented
by a folded gold and smoked-glass sculpture opening upward.

Built-in image generation tool; optimized from PNG to 960px WebP. Final prompt:
"Use case: stylized-concept. Create a premium editorial 3D artwork for
BusinessIdea.io, a researched business idea library for people starting from
zero. A single exquisite impossible continuous folded ribbon sculpture, brushed
champagne-gold metal outside and deeply smoked glass inside, shaped like a seed
opening into an ascending spiral, floating above a tiny pool of warm light.
Dramatic macro studio photography meets architectural sculpture, fine material
detail, restrained warm gold light against nearly pure black #080909 background.
Centered composition, object fills central 65%, square format, generous clean
negative space around silhouette. Elegant, memorable, physically plausible
reflections, no neon sci-fi, no generic glowing orb, no people, no text, no logo,
no watermark. This is the abstract visual metaphor of an idea becoming a
researched possibility. Render a finished high quality website asset."
