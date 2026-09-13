import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage, secondaryMeta } from "@/components/bbi/secondary";

export const Route = createFileRoute("/services")({
  head: () => secondaryMeta("What BBI offers", "Explore researched blueprints, collections, and simple calculators."),
  component: ServicesPage,
});
