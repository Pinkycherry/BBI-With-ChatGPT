import { createFileRoute, notFound } from "@tanstack/react-router";
import { CategoryPage } from "@/components/bbi/library";
import { getCategory } from "@/components/bbi/catalog";

export const Route = createFileRoute("/category/$categorySlug/")({
  head: () => ({ meta: [{ title: "Business idea category | BBI" }] }),
  component: Page,
});

function Page() {
  const { categorySlug } = Route.useParams();
  const category = getCategory(categorySlug);
  if (!category) throw notFound();
  return <CategoryPage category={category} />;
}
