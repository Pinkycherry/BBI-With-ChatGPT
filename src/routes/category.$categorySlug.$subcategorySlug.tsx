import { createFileRoute, notFound } from "@tanstack/react-router";
import { CategoryPage } from "@/components/bbi/library";
import { getCategory } from "@/components/bbi/catalog";

export const Route = createFileRoute("/category/$categorySlug/$subcategorySlug")({
  head: () => ({ meta: [{ title: "Business idea subcategory | BBI" }] }),
  component: Page,
});

function Page() {
  const { categorySlug, subcategorySlug } = Route.useParams();
  const category = getCategory(categorySlug);
  if (!category) throw notFound();
  // PLACEHOLDER: the live subcategory_name arrives with research props. Keep the route slug visible until then.
  return <CategoryPage category={category} subcategory_slug={subcategorySlug} />;
}
