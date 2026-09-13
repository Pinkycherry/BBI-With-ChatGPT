import { createFileRoute } from "@tanstack/react-router";
import { ToolsHub, secondaryMeta } from "@/components/bbi/secondary";

export const Route = createFileRoute("/calculator/")({
  head: () => secondaryMeta("Business calculators", "Work through your own business figures with free local calculators."),
  component: ToolsHub,
});
