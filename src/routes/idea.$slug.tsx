import { createFileRoute, notFound } from "@tanstack/react-router";
import { BlueprintPage } from "@/components/bbi/blueprint";
import { getIdeaBySlug } from "@/lib/ideas.functions";

export const Route = createFileRoute("/idea/$slug")({
  loader: ({ params }) => getIdeaBySlug({ data: { slug: params.slug } }),
  head: () => ({
    meta: [
      { title: "Business idea blueprint | BBI" },
      { name: "description", content: "A BBI blueprint covering who pays, how the money works, what hurts in year one, and founder fit." },
    ],
  }),
  component: Page,
});

function Page() {
  const { slug } = Route.useParams();
  const data = Route.useLoaderData();
  if (!data) throw notFound();
  const idea = data.idea;
  return <BlueprintPage
    idea_id={idea.ideaId}
    category_name={idea.categoryName}
    category_slug={idea.categorySlug}
    subcategory_name={idea.subcategoryName}
    subcategory_slug={idea.subcategorySlug}
    title={idea.title}
    slug={idea.slug}
    summary={idea.summary}
    business_description={idea.businessDescription}
    tags={idea.tags}
    pros_json={idea.pros}
    cons_json={idea.cons}
    verdict={idea.verdict}
    trend_score={idea.trendScore}
    tier={idea.tier}
    market_opportunity={idea.marketOpportunity}
    target_customer={idea.targetCustomer}
    how_you_make_money={idea.howYouMakeMoney}
    startup_cost={idea.startupCost}
    income_potential={idea.incomePotential}
    competition_edge={idea.competitionEdge}
    getting_started_steps={idea.gettingStartedSteps}
    tools_needed={idea.toolsNeeded}
    time_to_first_customer={idea.timeToFirstCustomer}
    faq_json={idea.faq}
    research_facts={[]}
    external_links={idea.externalLinks}
    internal_link_anchors={[]}
    seo_title={idea.seoTitle || idea.title}
    meta_description={idea.metaDescription || idea.summary}
    focus_keyword={idea.keywords[0] ?? ""}
  />;
}
