import { createFileRoute, notFound } from "@tanstack/react-router";
import { CategoryPage, toLibraryIdea } from "@/components/bbi/library";
import { getCategory } from "@/components/bbi/catalog";
import { getSubcategoryPage } from "@/lib/ideas.functions";

export const Route = createFileRoute("/category/$categorySlug/$subcategorySlug")({
  loader: ({ params }) => getSubcategoryPage({ data: { categorySlug: params.categorySlug, subcategorySlug: params.subcategorySlug } }),
  head: () => ({ meta: [{ title: "Business idea subcategory | BBI" }] }),
  component: Page,
});

function Page() {
  const { categorySlug, subcategorySlug } = Route.useParams();
  const data = Route.useLoaderData();
  const category = getCategory(categorySlug);
  if (!category) throw notFound();
  return <CategoryPage category={category} ideas={data.ideas.map(toLibraryIdea)} subcategory_slug={subcategorySlug} {...(data.subcategoryName ? { subcategory_name: data.subcategoryName } : {})} />;
}
