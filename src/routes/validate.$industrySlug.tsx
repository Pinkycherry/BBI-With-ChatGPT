import { createFileRoute, notFound } from "@tanstack/react-router";
import { ValidationPage, secondaryMeta } from "@/components/bbi/secondary";
import { getCategory } from "@/components/bbi/catalog";

export const Route = createFileRoute("/validate/$industrySlug")({
  head: () => secondaryMeta("Think through a business idea", "Explore the researched BBI library."),
  component: Page,
});

function Page() {
  const { industrySlug } = Route.useParams();
  const category = getCategory(industrySlug);
  if (!category) throw notFound();
  return <ValidationPage key={category.category_slug} category={category} />;
}
