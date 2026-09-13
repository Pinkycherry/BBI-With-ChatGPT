import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, secondaryMeta } from "@/components/bbi/secondary";

export const Route = createFileRoute("/terms")({
  head: () => secondaryMeta("Terms of use", "BBI terms of use draft template."),
  component: () => <LegalPage page="terms" />,
});
