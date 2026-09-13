import { createFileRoute } from "@tanstack/react-router";
import { BlogHub, secondaryMeta } from "@/components/bbi/secondary";

export const Route = createFileRoute("/blog/")({
  head: () => secondaryMeta("Field notes", "A home for BBI research articles and founder reading."),
  component: BlogHub,
});
