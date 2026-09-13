import { createFileRoute } from "@tanstack/react-router";
import { BrowsePage } from "@/components/bbi/library";

export const Route = createFileRoute("/browse")({
  head: () => ({
    meta: [
      { title: "Browse business ideas | BBI" },
      { name: "description", content: "Explore all 14 BBI business-idea categories, grouped by investment, working style, and industry." },
    ],
  }),
  component: BrowsePage,
});
