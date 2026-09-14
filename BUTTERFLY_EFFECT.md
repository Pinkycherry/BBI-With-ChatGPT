# BUTTERFLY EFFECT — the one rule we check before touching anything

Purpose (founder's standing instruction): before we **create, modify, or implement** anything — inside the site, outside it, in Supabase, in the pipeline, anywhere — we stop and ask one question first:

> **Does this change touch, depend on, or risk breaking any area other than the one I'm working on?**

If the honest answer is "yes" or "not sure," we do NOT proceed until we've mapped the blast radius and made the change additive/isolated. A change that fixes A but silently breaks X, Y, Z is worse than no change — it forces us to run again and again cleaning up secondary damage. This file is the checklist we run first, every time.

## The 5-question check (run before every task)

1. **Does it modify an existing file/route/component that other pages share?** (shared = higher risk. e.g. `site-shell.tsx`, `styles.css`, `ideas.functions.ts`, `use-auth.ts`, anything under `components/ui/`.)
2. **Does it change the Supabase schema or existing rows?** (Never mutate the ~280 live idea rows or the `ideas` table shape. New data = new table/columns, additive only.)
3. **Does it change global styling/tokens?** (A color/spacing/token change ripples to every page. Treat as high-blast-radius.)
4. **Does it change a data contract other code reads?** (types in `ideas-shared.ts`, query shapes, route params. Changing these breaks consumers.)
5. **Can it be built as a NEW, isolated thing instead?** (new route + new component + new table = near-zero blast radius. Always prefer this over editing shared code.)

If a task is all "no" on 1–4 and "yes" on 5 → **safe, proceed.** If any "yes" on 1–4 → **stop, scope it, isolate it, verify the affected areas explicitly before and after.**

## Blast-radius map of this project (know what's dangerous to touch)

| Area                                                   | Blast radius                     | Rule                                                                                    |
| ------------------------------------------------------ | -------------------------------- | --------------------------------------------------------------------------------------- |
| New route + new component (e.g. `/tools/*`, `/list/*`) | **Isolated**                     | Safest work. Build freely.                                                              |
| New Supabase table keyed by id                         | **Isolated**                     | Additive. Never alter `ideas`.                                                          |
| `src/routes/idea.$slug.tsx`                            | Medium                           | Every idea renders through it. Embed things conditionally, never break the base render. |
| `src/routes/index.tsx` (homepage)                      | Medium                           | Many sections; edit one section at a time.                                              |
| `src/components/site-shell.tsx`                        | **High**                         | Header/nav/footer on every page. Section-scoped edits only.                             |
| `src/styles.css`                                       | **High**                         | Global. One owner at a time; only add scoped classes, avoid touching shared tokens.     |
| `src/lib/ideas.functions.ts` / `ideas-shared.ts`       | **High**                         | Data contract for the whole site. Additive fields only; never change existing shapes.   |
| `src/hooks/use-auth.ts`                                | **High**                         | Gating logic sitewide. Read its states; don't change its signature.                     |
| Supabase `ideas` table / live rows                     | **Critical**                     | Never mutate. The live site + 280 ideas depend on it.                                   |
| Payment/checkout                                       | out of scope this phase          | Do not touch.                                                                           |
| Gemini/n8n pipeline                                    | isolated build, but writes to DB | Writes to NEW tables only; never edits core `ideas` rows.                               |

## Working rules that fall out of this

- **Prefer additive over edit.** New table/route/component beats modifying a shared one, every time.
- **One owner per shared file per work-round.** Two agents must never edit `styles.css` or `site-shell.tsx` at once.
- **Conditional rendering for enrichment.** New sections on existing pages render only when their data exists, so un-enriched content never breaks.
- **Centralized branding (colors/buttons/layout tokens) is HIGH blast radius** — it's valuable but touches everything, so it is a deliberate, isolated, single-focus round on its own, never bundled with feature work. Deferred until we choose to do it alone.
- **Verify the affected areas, not just the changed one.** After a medium/high-risk change, screenshot/check the _other_ pages that share the file, not only the one you meant to change.

This file is consulted first. Then we touch anything.

---

## 24-Hour Data Generation Tracking & Content Inventory

**Sprint Mode:** 24-Hour Data Generation Only (No Design, No Components, No Styling)  
**Execution Date:** 2026-09-14  
**Blast Radius Rating:** **Isolated** (All outputs are new independent routes under `src/routes/`, raw JSON datasets in `/data/`, and markdown files in `/content/guides/`. Core `ideas` table, existing 280 rows, and shared components remain untouched).

### 1. Existing Content vs. Missing Content Analysis

| Category | Previously Existing on BBI | Newly Added in this Sprint | Status / Duplication Check |
| :--- | :--- | :--- | :--- |
| **Tools & Calculators** | Generic `/calculator/` routes (`src/routes/calculator.*`) | Route `/useful-tools/` + `/data/calculators.json` (TAM/SAM/SOM, Runway, Break-Even, CAC, LTV) | **Distinct & Isolated.** Zero collision with existing calculators. |
| **Guides & Playbooks** | Blog posts (`/blog/*`) via WordPress REST API | Route `/startup-guides/` + 5 comprehensive Markdown guides in `/content/guides/` | **Distinct.** Built as standalone static markdown guides with frontmatter. |
| **Glossary** | None (Missing) | Route `/founder-glossary/` + `/data/glossary.json` (45 defined terms with formulas & relations) | **New & Unique.** |
| **Resources Hub** | None (Missing) | Route `/learning-resources/` | **New & Unique.** |
| **Founder Stories** | None (Missing) | Route `/founder-stories/` + `/data/case-studies.json` (5 detailed case studies with P&L) | **New & Unique.** Real benchmarks, zero fictional stubs. |

---

### 2. Comprehensive Content Tracking Registry

| Slug | Type | Status | Reason | Description | Keywords | Date |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/useful-tools/` | Route Hub | **ACTUAL** (Route Registered) | Hub route for startup tools | Index entry for founder calculators and tactical utilities | useful tools, startup tools, calculators, bbi tools | 2026-09-14 |
| `/useful-tools/tam-sam-som` | Calculator Data | **ACTUAL** (in `/data/calculators.json`) | Market sizing validation | Bottom-up and top-down TAM, SAM, and SOM calculation model with industry benchmarks | tam sam som calculator, market sizing, total addressable market | 2026-09-14 |
| `/useful-tools/runway` | Calculator Data | **ACTUAL** (in `/data/calculators.json`) | Cash runway & burn rate | Models gross/net burn, runway months, safe next round window, and default-alive status | startup runway calculator, burn rate, zero cash date | 2026-09-14 |
| `/useful-tools/break-even` | Calculator Data | **ACTUAL** (in `/data/calculators.json`) | Financial viability analysis | Calculates unit sales and gross revenue needed to cover fixed overhead | break even calculator, contribution margin, fixed costs | 2026-09-14 |
| `/useful-tools/cac` | Calculator Data | **ACTUAL** (in `/data/calculators.json`) | Acquisition efficiency | Blended vs paid CAC, marketing spend allocation, and payback period in months | cac calculator, customer acquisition cost, cac payback | 2026-09-14 |
| `/useful-tools/ltv` | Calculator Data | **ACTUAL** (in `/data/calculators.json`) | Unit economics audit | Customer Lifetime Value, lifespan from churn, and LTV:CAC health ratio | ltv calculator, customer lifetime value, ltv to cac ratio | 2026-09-14 |
| `/startup-guides/` | Route Hub | **ACTUAL** (Route Registered) | Hub route for operator guides | Index entry for tactical startup and validation guides | startup guides, business guides, founder playbooks | 2026-09-14 |
| `/startup-guides/business-idea-validation` | Guide Content (Markdown) | **ACTUAL** (720 words in `/content/guides/business-idea-validation.md`) | Practical validation framework | 5-step framework: discovery interviews, competitor reviews, smoke tests, and LOIs | business idea validation, smoke test framework, customer discovery | 2026-09-14 |
| `/startup-guides/tam-sam-som-explained` | Guide Content (Markdown) | **ACTUAL** (545 words in `/content/guides/tam-sam-som-explained.md`) | Investor-grade market sizing | Explains TAM, SAM, and SOM with bottom-up math and operator rules of thumb | tam sam som explained, bottom up market sizing, market size guide | 2026-09-14 |
| `/startup-guides/zero-investment-models` | Guide Content (Markdown) | **ACTUAL** (785 words in `/content/guides/zero-investment-models.md`) | Lean bootstrapping strategies | 5 zero-capital business models from productized services to reverse marketplaces | zero investment business models, bootstrapped business, lean startup | 2026-09-14 |
| `/startup-guides/product-market-fit` | Guide Content (Markdown) | **ACTUAL** (640 words in `/content/guides/product-market-fit.md`) | Quantitative PMF metrics | Sean Ellis 40% benchmark, cohort retention flattening, and organic pull | product market fit, how to measure pmf, retention cohort curves | 2026-09-14 |
| `/startup-guides/pre-launch-checklist` | Guide Content (Markdown) | **ACTUAL** (550 words in `/content/guides/pre-launch-checklist.md`) | Day-one operational readiness | 25-point launch audit: technical QA, webhooks, analytics, and legal compliance | startup launch checklist, pre launch checklist, product launch guide | 2026-09-14 |
| `/founder-glossary/` | Route Hub & Glossary Data | **ACTUAL** (45 terms in `/data/glossary.json`) | Founder vocabulary reference | 45 essential startup terms covering economics, fundraising, growth, and legal | founder glossary, startup terminology, venture capital definitions | 2026-09-14 |
| `/learning-resources/` | Route Hub | **ACTUAL** (Route Registered) | Operator resource index | Centralized index for frameworks, financial templates, and educational assets | learning resources, startup frameworks, founder resources | 2026-09-14 |
| `/founder-stories/` | Route Hub | **ACTUAL** (Route Registered) | Case study directory | Directory of transparent founder revenue and operational case studies | founder stories, bootstrapped case studies, startup revenue breakdown | 2026-09-14 |
| `/founder-stories/ugc-creator-agency-dtc` | Case Study Data | **ACTUAL** ($34.5K/mo in `/data/case-studies.json`) | UGC agency business model | Scaling a DTC creator agency to $34.5K/month with 62% net margin | ugc agency case study, dtc creative agency, productized services | 2026-09-14 |
| `/founder-stories/ai-content-repurposing-b2b` | Case Study Data | **ACTUAL** ($28.2K/mo in `/data/case-studies.json`) | AI repurposing service | Bootstrapping an executive content repurposing agency to $28.2K/month | ai repurposing case study, content repurposing, executive ghostwriting | 2026-09-14 |
| `/founder-stories/notion-systems-micro-consulting` | Case Study Data | **ACTUAL** ($12.4K/mo in `/data/case-studies.json`) | Side hustle transition | Scaling a $97 Notion template and custom implementation service to $12.4K/month | side hustle case study, notion consulting, digital product monetization | 2026-09-14 |
| `/founder-stories/faceless-youtube-finance-automation` | Case Study Data | **ACTUAL** ($16.8K/mo in `/data/case-studies.json`) | Media automation breakdown | Scaling an automated documentary channel to $16.8K/month with sponsorships | faceless youtube automation, business documentary channel, youtube cpm | 2026-09-14 |
| `/founder-stories/cold-email-infrastructure-agency` | Case Study Data | **ACTUAL** ($42.0K/mo in `/data/case-studies.json`) | Technical service agency | Building an outbound email deliverability infrastructure service to $42.0K/month | service business case study, cold email infrastructure, deliverability agency | 2026-09-14 |
