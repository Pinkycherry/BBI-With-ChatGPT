import { createFileRoute, notFound } from "@tanstack/react-router";
import { FaqCategory, secondaryMeta } from "@/components/bbi/secondary";
import { getCategory } from "@/components/bbi/catalog";

export const Route = createFileRoute("/faq/$categorySlug")({
  head: () => secondaryMeta("Category questions", "Explore the researched BBI library."),
  component: Page,
});

function Page() {
  const { categorySlug } = Route.useParams();
  const category = getCategory(categorySlug);
  if (!category) throw notFound();
  return <FaqCategory key={category.category_slug} category={category} />;
}
