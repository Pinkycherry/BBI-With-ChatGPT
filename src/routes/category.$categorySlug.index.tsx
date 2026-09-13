import { createFileRoute, notFound } from "@tanstack/react-router";
import { CategoryPage, toLibraryIdea } from "@/components/bbi/library";
import { getCategory } from "@/components/bbi/catalog";
import { getCategoryPage } from "@/lib/ideas.functions";

export const Route = createFileRoute("/category/$categorySlug/")({
  loader: ({ params }) => getCategoryPage({ data: { categorySlug: params.categorySlug } }),
  head: () => ({ meta: [{ title: "Business idea category | BBI" }] }),
  component: Page,
});

function Page() {
  const { categorySlug } = Route.useParams();
  const data = Route.useLoaderData();
  const category = getCategory(categorySlug);
  if (!category) throw notFound();
  return <CategoryPage category={category} ideas={data.ideas.map(toLibraryIdea)} />;
}
