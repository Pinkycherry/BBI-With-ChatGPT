import { createFileRoute } from "@tanstack/react-router";
import { BlogArticlePage, secondaryMeta } from "@/components/bbi/secondary";

export const Route = createFileRoute("/blog/$slug")({
  head: () => secondaryMeta("Field notes article", "A BBI editorial article template."),
  component: BlogArticlePage,
});
