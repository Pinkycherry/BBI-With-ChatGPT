import { createFileRoute } from "@tanstack/react-router";
import { ContactPage, secondaryMeta } from "@/components/bbi/secondary";

export const Route = createFileRoute("/contact")({
  head: () => secondaryMeta("Contact BBI", "Questions, research corrections, and feedback about BBI."),
  component: ContactPage,
});
