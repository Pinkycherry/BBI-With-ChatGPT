import { createFileRoute } from "@tanstack/react-router";
import { PricingPage, secondaryMeta } from "@/components/bbi/secondary";

export const Route = createFileRoute("/pricing")({
  head: () => secondaryMeta("The free BBI library", "The complete BBI library is free, with no signup, paywall, or email gate."),
  component: PricingPage,
});
