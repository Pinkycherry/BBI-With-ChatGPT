import { createFileRoute } from "@tanstack/react-router";
import { queryOptions } from "@tanstack/react-query";
import { HomeExperience } from "@/components/home/home-experience";
import { SiteShell } from "@/components/site-shell";
import { catalogQuery, getFeaturedIdeas, getTrendingIdeas } from "@/lib/ideas.functions";
import { FEATURED_IDEA_IDS } from "@/config/featured";
import homeStyles from "@/components/home/home.css?url";

const featuredQuery = queryOptions({
  queryKey: ["featured", FEATURED_IDEA_IDS],
  queryFn: () => getFeaturedIdeas({ data: { ideaIds: FEATURED_IDEA_IDS } }),
});
const trendingQuery = queryOptions({ queryKey: ["trending"], queryFn: () => getTrendingIdeas() });
export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    const [catalog, featured, trending] = await Promise.all([
      context.queryClient.ensureQueryData(catalogQuery),
      context.queryClient.ensureQueryData(featuredQuery),
      context.queryClient.ensureQueryData(trendingQuery),
    ]);
    return { catalog, featured, trending };
  },
  head: () => ({
    meta: [
      { title: "BBI — Bro Business Ideas | Your next chapter starts with an idea" },
      {
        name: "description",
        content:
          "Find researched business ideas, side hustles and low-investment opportunities. Know the buyer, the money, the risks, and whether an idea is right for you. Free to browse.",
      },
      { property: "og:title", content: "BBI — From what if, to what's next." },
      {
        property: "og:description",
        content:
          "Business ideas with the honest research. A real starting point for everyone starting from zero.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: homeStyles }],
  }),
  component: HomePage,
  errorComponent: () => (
    <div id="bbi-home">
      <main className="nh-error">
        <a href="/" className="nh-logo">
          BBI
        </a>
        <h1>The library needs a moment.</h1>
        <p>We couldn’t load the research. Please try again.</p>
        <a className="nh-button" href="/">
          Try again ↗
        </a>
      </main>
    </div>
  ),
});
function HomePage() {
  // Serialize the exact server results; do not refetch random values during hydration.
  const data = Route.useLoaderData();
  return (
    <SiteShell>
      <HomeExperience {...data} />
    </SiteShell>
  );
}
