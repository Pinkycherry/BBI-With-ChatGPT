import { createFileRoute } from "@tanstack/react-router";
import { ListsHub, secondaryMeta } from "@/components/bbi/secondary";

export const Route = createFileRoute("/list/")({
  head: () => secondaryMeta("Business idea reading lists", "Explore BBI collections by category."),
  component: ListsHub,
});
