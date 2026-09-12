# BBI homepage development — 12 September 2026

## Scope and source

Development repository: https://github.com/Pinkycherry/BBI-With-ChatGPT
Branch: codex/homepage-nomu, based on the main branch serving the current homepage.
The older CLAUDE.md branch instruction belongs to the source project's previous workflow. This copied repository has its own homepage branch; never push to Pinkycherry/newbusinessideas3.

Existing site inspected: https://newbusinessideas3.vercel.app/
Visual reference inspected in a real browser: https://nomu.store/
Future custom domain: businessidea.io; no domain or original deployment changes in this phase.

## Existing experience

TanStack Start / React 19, server-rendered Supabase catalog, category/search/idea routes, real featured and random ideas, authentication, newsletter integration, calculators, listicles, FAQs and WordPress blog. The live homepage displays 290 completed ideas across 14 categories. A read-only database query independently returned 290 and three real titles: Cold Snap Small Engine Care, Sundown Meeting Dispatch, Pressure Point Vending Services.

The old homepage repeats category navigation, pricing arguments and FAQs across many sections. Pricing copy conflicts internally (free throughout versus gated full access), and checkout is disabled. These are existing product issues, not proof of missing code. This design must not claim that checkout works or change access rules.

## Preserve

- Research USP: a specific buyer, revenue mechanics, honest risks, and a build-or-walk-away verdict.
- Audience: people starting from zero; plain, humane language.
- Live categories/counts, actual featured idea titles/slugs, search, Surprise Me, newsletter and sign-in access.
- Existing golden-tree artwork, now served locally for this homepage.
- All other routes, shared style tokens, auth rules, data contracts and database rows.
- Source assets and previous implementation remain available in Git history and the untouched original repository.

## Reference observations and implementation

Nomu uses an off-white gridded canvas, a floating white pill navigation, medium-weight large sans-serif headlines, coral emphasis, generous whitespace, a staged product walkthrough, floating image cards, soft framed feature panels, a dark immersive chapter, a comparison and accordion FAQ, and an oversized closing CTA. Adapt this composition closely with BBI's own content and imagery, without Nomu's logo, product photography, customer logos or commercial claims.

The new page owns its shell and CSS under #bbi-home. It reuses the existing server functions; it does not alter Supabase. Loader values are serialized through Route.useLoaderData to avoid duplicate hydration queries. Motion is progressive enhancement, with reduced-motion support and cleanup. Category links are resolved from live data; visual imagery is optional for categories without a mapped image.

## Baseline issues outside homepage design

- package.json requires Lovable config 2.13.1 while package-lock.json had 2.9.1; clean npm ci failed. Regenerate the lockfile against the declared manifest before testing.
- Source notes mention a wp-theme directory on other branches; it is not part of main and is not merged into this homepage work.
- Payment activation and full-library access need a separate product pass.

## Verification

Build, TypeScript, scoped lint, live-data browser checks, desktop/mobile layouts, keyboard controls, reduced motion, links and representative unchanged routes. Record actual outcomes after implementation; do not infer runtime success from compilation.
