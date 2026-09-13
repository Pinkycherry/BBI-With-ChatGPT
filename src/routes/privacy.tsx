import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, secondaryMeta } from "@/components/bbi/secondary";

export const Route = createFileRoute("/privacy")({
  head: () => secondaryMeta("Privacy policy", "BBI privacy policy draft template."),
  component: () => <LegalPage page="privacy" />,
});
