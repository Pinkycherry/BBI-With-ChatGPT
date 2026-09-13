import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, secondaryMeta } from "@/components/bbi/secondary";

export const Route = createFileRoute("/gdpr")({
  head: () => secondaryMeta("Data protection", "BBI data protection draft template."),
  component: () => <LegalPage page="gdpr" />,
});
