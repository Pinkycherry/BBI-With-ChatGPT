import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, secondaryMeta } from "@/components/bbi/secondary";

export const Route = createFileRoute("/disclaimer")({
  head: () => secondaryMeta("Disclaimer", "BBI disclaimer draft template."),
  component: () => <LegalPage page="disclaimer" />,
});
