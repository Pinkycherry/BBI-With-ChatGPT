import { createFileRoute } from "@tanstack/react-router";
import { AboutPage, secondaryMeta } from "@/components/bbi/secondary";

export const Route = createFileRoute("/about")({
  head: () => secondaryMeta("About BBI", "A free, human-curated library with straight founder-fit verdicts."),
  component: AboutPage,
});
