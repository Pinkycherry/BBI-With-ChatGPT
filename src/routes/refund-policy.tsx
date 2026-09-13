import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, secondaryMeta } from "@/components/bbi/secondary";

export const Route = createFileRoute("/refund-policy")({
  head: () => secondaryMeta("Refund policy", "BBI refund policy draft template."),
  component: () => <LegalPage page="refund-policy" />,
});
