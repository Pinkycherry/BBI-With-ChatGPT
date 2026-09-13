import { createFileRoute, notFound } from "@tanstack/react-router";
import { ListDetail, secondaryMeta } from "@/components/bbi/secondary";
import { getCategory } from "@/components/bbi/catalog";

export const Route = createFileRoute("/list/$slug")({
  head: () => secondaryMeta("Business idea collection", "Explore the researched BBI library."),
  component: Page,
});

function Page() {
  const { slug } = Route.useParams();
  const category = getCategory(slug);
  if (!category) throw notFound();
  return <ListDetail key={category.category_slug} category={category} />;
}
