import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useCallback, useState } from "react";
import { z } from "zod";

import { IdeaCard } from "@/components/idea-card";
import { SiteShell, Breadcrumbs } from "@/components/site-shell";
import { AdSlot } from "@/components/AdSlot";
import { searchIdeas } from "@/lib/ideas.functions";
import type { IdeaCard as IdeaCardData } from "@/lib/ideas-shared";
import {
  useScrollProgress,
  useElementPointerGroup,
  useStaggerReveal,
  useTextReveal,
} from "@/motion";

export const Route = createFileRoute("/search")({
  validateSearch: z.object({ q: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Search Business Ideas | BBI" },
      { name: "robots", content: "noindex,follow" },
      {
        name: "description",
        content:
          "Search the BBI library by keyword, market or model to find the business idea blueprint that fits you.",
      },
      { property: "og:title", content: "Search Business Ideas | BBI" },
      {
        property: "og:description",
        content: "Search the BBI library by keyword, market or business model.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SearchPage,
});

/**
 * The results grid is its own component so the gallery hooks mount with the
 * grid itself. Results arrive after the page does, and a ref-based hook only
 * reads its element on mount — attaching these to a container that does not
 * exist on first render would silently no-op forever. Keyed on the term by the
 * caller, so a new search remounts and replays the reveal.
 */
function SearchResults({ ideas, term }: { ideas: IdeaCardData[]; term: string }) {
  // MOTION_SPEC section 3 — one delegated pointer listener for up to 50 cards,
  // plus the short 0.03s stagger. `.mo-card` as the selector keeps the ad slots
  // interleaved into this grid out of the reveal.
  const pointerRef = useElementPointerGroup<HTMLDivElement>(".mo-card");
  const revealRef = useStaggerReveal<HTMLDivElement>({
    selector: ".mo-card",
    stagger: 0.03,
    distance: 12,
  });
  const gridRef = useCallback(
    (node: HTMLDivElement | null) => {
      pointerRef.current = node;
      revealRef.current = node;
    },
    [pointerRef, revealRef],
  );

  return (
    <>
      <p className="catalog-count text-sm text-muted-foreground">
        {ideas.length} result{ideas.length === 1 ? "" : "s"} for “{term}”
      </p>
      <div
        ref={gridRef}
        className="catalog-grid mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,17rem),1fr))] gap-5"
      >
        {ideas.map((idea, i) => (
          <Fragment key={idea.ideaId}>
            <IdeaCard idea={idea} />
            {(i + 1) % 5 === 0 && i + 1 < ideas.length && (
              <div className="[grid-column:1/-1]">
                <AdSlot position={`search-in-results-${(i + 1) / 5}`} size="banner" />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
}

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const [term, setTerm] = useState(q ?? "");
  const headingRef = useTextReveal<HTMLHeadingElement>();
  const depthRef = useScrollProgress<HTMLDivElement>();

  const query = useQuery({
    queryKey: ["search", q ?? ""],
    queryFn: () => searchIdeas({ data: { q: q ?? "" } }),
    enabled: Boolean(q && q.trim()),
  });

  return (
    <SiteShell>
      <div ref={depthRef} className="catalog-page mx-auto max-w-6xl px-4 py-12">
        <div className="catalog-ambient mo-drift" aria-hidden="true" />
        {/* EDITABLE SECTION START — safe to add, remove, or reorder sections below without breaking routing or data fetching. */}
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Search" }]} />
        <div className="catalog-masthead">
          <h1 ref={headingRef} className="text-3xl font-bold tracking-tight">
            Search the vault
          </h1>
          <form
            className="catalog-search-form mt-6 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ search: { q: term } });
            }}
          >
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="e.g. data enrichment, newsletters, automation"
              aria-label="Search business ideas"
              className="w-full min-w-0 rounded-md bg-transparent px-3 py-3 text-sm outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Search
            </button>
          </form>
        </div>

        <div className="mt-8">
          {!q?.trim() && (
            <p className="text-sm text-muted-foreground">Type a keyword to search every idea.</p>
          )}
          {query.isLoading && <p className="text-sm text-muted-foreground">Searching…</p>}
          {query.isError && (
            <p className="text-sm text-destructive">Search failed. Try again in a moment.</p>
          )}
          {query.data && <SearchResults key={q ?? ""} ideas={query.data} term={q ?? ""} />}
        </div>
        {/* EDITABLE SECTION END */}
      </div>
    </SiteShell>
  );
}
