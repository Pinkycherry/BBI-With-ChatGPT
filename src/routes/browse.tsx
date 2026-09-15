import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { SiteShell, Breadcrumbs } from "@/components/site-shell";
import { getCatalog } from "@/lib/ideas.functions";
import FocusCards from "@/components/aceternity/focus-cards";
import { photoAt } from "@/config/imagery";
import { JsonLd, breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import { useScrollProgress, useTextReveal } from "@/motion";

const catalogQuery = queryOptions({ queryKey: ["catalog"], queryFn: () => getCatalog() });

export const Route = createFileRoute("/browse")({
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogQuery),
  head: () => ({
    meta: [
      { title: "Browse Business Idea Categories | BBI" },
      {
        name: "description",
        content:
          "Browse every business idea category and subcategory in the BBI library, from AI automation to fintech and creator media.",
      },
      { property: "og:title", content: "Browse Business Idea Categories | BBI" },
      {
        property: "og:description",
        content: "Every category and subcategory in the BBI business idea library.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BrowsePage,
  errorComponent: () => (
    <SiteShell>
      <p className="mx-auto max-w-6xl px-4 py-24">
        Couldn't load the idea library — try refreshing.
      </p>
    </SiteShell>
  ),
  notFoundComponent: () => (
    <SiteShell>
      <p className="mx-auto max-w-6xl px-4 py-24">That page doesn't exist.</p>
    </SiteShell>
  ),
});

function SubcategoryPill({
  categorySlug,
  subcategorySlug,
  label,
}: {
  categorySlug: string;
  subcategorySlug: string;
  label: string;
}) {
  return (
    <Link
      to="/category/$categorySlug/$subcategorySlug"
      params={{ categorySlug, subcategorySlug }}
      className="mo-row glass-pill iv-tag px-4 py-2 text-sm"
    >
      {label}
    </Link>
  );
}

function BrowsePage() {
  const { data } = useSuspenseQuery(catalogQuery);
  const headingRef = useTextReveal<HTMLHeadingElement>();
  const depthRef = useScrollProgress<HTMLDivElement>();
  return (
    <>
      <JsonLd
        schema={[
          collectionPageSchema({
            path: "/browse",
            name: "Browse Business Idea Categories",
            description: "Every category and subcategory in the BBI business idea library.",
            itemCount: data.totalIdeas,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Browse", path: "/browse" },
          ]),
        ]}
      />
      <SiteShell>
        <div ref={depthRef} className="catalog-page mx-auto max-w-6xl px-4 py-12">
          <div className="catalog-ambient mo-drift" aria-hidden="true" />
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Browse" }]} />
          <div className="catalog-masthead">
            <h1 ref={headingRef} className="mt-4 text-3xl font-bold tracking-tight">
              The full idea library
            </h1>
            {/* One line, two figures. The third used to be "N subcategories",
              which was the idea count wearing a different label —
              subcategory_name is byte-identical to title, so there are exactly
              as many subcategories as ideas and the number said nothing. */}
            <p className="catalog-count mt-4 text-sm text-muted-foreground">
              {data.totalIdeas} researched blueprints across {data.totalCategories} categories
            </p>
          </div>
          {/* Existing category photography stays in fixed media slots; the
              shared gallery owns one pointer listener and short stagger. */}
          <FocusCards
            className="mt-8"
            cards={data.categories.map((category, index) => {
              const photo = photoAt(index);
              return {
                title: category.categoryName,
                meta: `${category.ideaCount} blueprints`,
                src: photo.src,
                alt: photo.alt,
                to: "/category/$categorySlug",
                params: { categorySlug: category.categorySlug },
              };
            })}
          />
        </div>
      </SiteShell>
    </>
  );
}
