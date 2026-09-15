import { useId, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { SiteShell, Breadcrumbs } from "@/components/site-shell";
import {
  CALCULATORS,
  defaultInputs,
  fieldGroups,
  findCalculator,
  readValues,
  type Calculator,
  type FieldIssue,
  type Reading,
} from "@/lib/calculators";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { useElementPointerGroup, useStaggerReveal, useTextReveal } from "@/motion";

/**
 * One route for every calculator. It renders whatever `src/lib/calculators.ts`
 * describes and contains no arithmetic of its own — a fifth calculator needs
 * one new entry in that registry and no change to this file.
 *
 * Everything happens in the browser. There is no server function, no database
 * read and no fetch: the loader below only looks a slug up in an array that is
 * already in the bundle, so it can answer "no such calculator" before the page
 * paints.
 */
export const Route = createFileRoute("/calculator/$slug")({
  loader: ({ params }) => {
    const calculator = findCalculator(params.slug);
    if (!calculator) throw notFound();
    return { slug: calculator.slug, name: `${calculator.title} ${calculator.highlight}` };
  },
  head: ({ loaderData }) => {
    const calculator = loaderData ? findCalculator(loaderData.slug) : undefined;
    if (!calculator) {
      return {
        meta: [{ title: "Calculator not found | BBI" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${calculator.title} ${calculator.highlight} — India, in rupees | BBI`;
    return {
      meta: [
        { title },
        { name: "description", content: calculator.description },
        { name: "keywords", content: (calculator.seoKeywords || []).join(", ") },
        { property: "og:title", content: title },
        { property: "og:description", content: calculator.description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CalculatorRoute,
  notFoundComponent: () => (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-24">
        <h1 className="text-2xl font-bold">That calculator doesn&apos;t exist</h1>
        <p className="mt-2 text-muted-foreground">
          Nothing is published at this address. The full list is on the calculators page.
        </p>
        <Link to="/calculator" className="mo-link mt-5 inline-block font-semibold text-primary">
          See every calculator
        </Link>
      </div>
    </SiteShell>
  ),
});

function CalculatorRoute() {
  const { slug } = Route.useParams();
  const calculator = findCalculator(slug);
  if (!calculator) throw notFound();
  // Keyed on the slug so moving between calculators starts from that
  // calculator's own defaults instead of carrying the last one's typing over.
  return <CalculatorPage key={calculator.slug} calculator={calculator} />;
}

function CalculatorPage({ calculator }: { calculator: Calculator }) {
  const [typed, setTyped] = useState<Record<string, string>>(() => defaultInputs(calculator));

  // Read, check, then compute — in that order, every render. The arithmetic is
  // a few subtractions on at most ten numbers, so it runs on each keystroke
  // and the answer is on screen in the same paint as the character. Nothing
  // here is debounced, animated or counted up: a number the visitor is driving
  // must never lag behind their own typing.
  const { values, issues } = readValues(calculator.fields, typed);
  const readings = issues.length === 0 ? calculator.compute(values) : [];
  const issueFor = (key: string): FieldIssue | undefined => issues.find((i) => i.key === key);

  const titleRef = useTextReveal<HTMLHeadingElement>();
  const pointerRef = useElementPointerGroup<HTMLDivElement>(".mo-card");

  const fieldsRef = useStaggerReveal<HTMLDivElement>({
    selector: "[data-field]",
    distance: 12,
    stagger: 0.035,
  });

  const pageName = `${calculator.title} ${calculator.highlight}`;
  const path = `/calculator/${calculator.slug}`;
  const others = CALCULATORS.filter((c) => c.slug !== calculator.slug);

  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({ path, name: pageName, description: calculator.description }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Calculators", path: "/calculator" },
            { name: pageName, path },
          ]),
        ]}
      />
      <SiteShell>
        <div ref={pointerRef} className="mo-document mx-auto max-w-6xl px-3 py-12 sm:px-4">
          {/* EDITABLE SECTION START — safe to add, remove, or reorder sections below without breaking routing or data fetching. */}
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Calculators", to: "/calculator" },
              { label: pageName },
            ]}
          />
          <p className="mt-6 t-eyebrow">Calculator</p>
          <h1
            ref={titleRef}
            className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl"
          >
            {calculator.title}{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-warm bg-clip-text text-transparent">
              {calculator.highlight}
            </span>
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{calculator.intro}</p>

          <div className="mt-10 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)]">
            <form
              className="glass mo-card rounded-2xl px-5 py-6 sm:px-7"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="font-display text-lg font-bold tracking-tight">Your numbers</h2>
                <button
                  type="button"
                  onClick={() => setTyped(defaultInputs(calculator))}
                  className="rounded-full border border-border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:border-primary hover:text-foreground"
                >
                  Reset
                </button>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The boxes start with example figures so the page is never blank. Replace them with
                yours — the answers change as you type.
              </p>

              <div ref={fieldsRef} className="mt-6 space-y-7">
                {fieldGroups(calculator).map(({ group, fields }) => (
                  <fieldset key={group} className="border-0 p-0">
                    <legend className="t-eyebrow">{group}</legend>
                    <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))] gap-5">
                      {fields.map((field) => (
                        <FieldInput
                          key={field.key}
                          field={field}
                          value={typed[field.key] ?? ""}
                          issue={issueFor(field.key)}
                          onChange={(next) => setTyped((prev) => ({ ...prev, [field.key]: next }))}
                        />
                      ))}
                    </div>
                  </fieldset>
                ))}
              </div>
            </form>

            <div className="lg:sticky lg:top-24">
              <div aria-live="polite" className="glass mo-card rounded-2xl px-5 py-6 sm:px-7">
                {issues.length > 0 ? (
                  <>
                    <h2 className="font-display text-lg font-bold tracking-tight">
                      Nothing to work out yet
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Every box has to hold a real number before the sums can run. Right now:
                    </p>
                    <ul className="mt-4 space-y-1">
                      {issues.map((issue) => (
                        <li
                          key={issue.key}
                          className="mo-row -mx-2 rounded-lg px-2 py-1.5 text-sm leading-relaxed"
                        >
                          <span className="font-semibold text-foreground">{issue.label}</span>
                          <span className="text-muted-foreground"> — {issue.message}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <>
                    <h2 className="font-display text-lg font-bold tracking-tight">
                      What this comes to
                    </h2>
                    <ul className="mt-4 space-y-2">
                      {readings.map((reading) => (
                        <ResultRow key={reading.key} reading={reading} />
                      ))}
                    </ul>
                    
                    <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                      These answers come only from the figures above. This page holds no benchmark,
                      no market average and no opinion on whether a number is good — it does the
                      arithmetic and shows its working.
                    </p>
                  </>
                )}
              </div>

              {calculator.mentorAnalysis && issues.length === 0 && (
                <div className="glass mo-card mt-6 overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-accent shadow-[0_0_20px_rgba(200,80,20,0.3)]">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {calculator.mentorAnalysis(values, readings).header}
                    </h3>
                  </div>
                  <ul className="space-y-3 mt-4">
                    {calculator.mentorAnalysis(values, readings).tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent/80 shadow-[0_0_8px_rgba(200,80,20,0.8)]" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

          </div>

          
          <div className="mt-16">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
                More Analyzers
              </h2>
              <div className="h-px flex-1 bg-border/50"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {others.slice(0, 6).map((other) => (
                <Link
                  key={other.slug}
                  to="/calculator/$slug"
                  params={{ slug: other.slug }}
                  className="glass mo-card group relative flex h-full min-w-0 flex-col justify-between overflow-hidden rounded-2xl p-5"
                >
                  <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />
                  <div>
                    <h3 className="font-display text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary mb-2 line-clamp-2">
                      {other.title} <span className="text-accent">{other.highlight}</span>
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3">
                      {other.answers}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center text-xs font-semibold uppercase tracking-wider text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Open Analyzer
                    <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
            {others.length > 6 && (
              <div className="mt-8 text-center">
                <Link to="/calculator" className="inline-flex items-center justify-center rounded-full bg-primary/10 px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/20">
                  View all {others.length + 1} calculators
                </Link>
              </div>
            )}
          </div>

          {/* EDITABLE SECTION END */}
        </div>
      </SiteShell>
    </>
  );
}

function FieldInput({
  field,
  value,
  issue,
  onChange,
}: {
  field: Calculator["fields"][number];
  value: string;
  issue: FieldIssue | undefined;
  onChange: (next: string) => void;
}) {
  const id = useId();
  const helpId = `${id}-help`;
  const errorId = `${id}-error`;

  return (
    <div data-field>
      <label htmlFor={id} className="block text-sm font-semibold">
        {field.label} <span className="font-normal text-muted-foreground">({field.unitLabel})</span>
      </label>
      
      <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-input/60 bg-gradient-to-b from-card to-card/50 px-3 py-1 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
        {field.prefix && (
          <span aria-hidden className="text-sm font-medium text-muted-foreground/80">
            {field.prefix}
          </span>
        )}
        <input
          id={id}
          name={field.key}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-describedby={issue ? `${helpId} ${errorId}` : helpId}
          aria-invalid={issue ? true : undefined}
          className="w-full min-w-0 bg-transparent py-2.5 text-base font-semibold tabular-nums outline-none placeholder:text-muted-foreground"
        />
        {field.suffix && (
          <span aria-hidden className="whitespace-nowrap text-xs text-muted-foreground">
            {field.suffix}
          </span>
        )}
      </div>
      <p id={helpId} className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
        {field.help}
      </p>
      {issue && (
        <p id={errorId} className="mt-1 text-xs font-medium text-destructive">
          {issue.message}
        </p>
      )}
    </div>
  );
}

function ResultRow({ reading }: { reading: Reading }) {
  return (
    <li className="relative overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-background to-muted/20 p-4 shadow-sm">
      {reading.primary && (
        <div className="absolute top-0 right-0 h-16 w-16 -translate-y-8 translate-x-8 rounded-full bg-primary/20 blur-2xl" />
      )}
      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {reading.label}
        </p>
        <p className={reading.primary ? "mt-1 font-display text-4xl font-extrabold tracking-tight text-primary drop-shadow-sm" : "mt-1 text-2xl font-bold tracking-tight text-foreground"}>
          {reading.display}
        </p>
        <p className="mt-3 rounded-md bg-muted/50 px-2.5 py-1.5 text-xs font-medium text-muted-foreground">
          {reading.formula}
        </p>
        {reading.note && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{reading.note}</p>}
      </div>
    </li>
  );

}
