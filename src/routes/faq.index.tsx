import { createFileRoute } from "@tanstack/react-router";
import { FaqHub, secondaryMeta } from "@/components/bbi/secondary";

export const Route = createFileRoute("/faq/")({
  head: () => secondaryMeta("Questions and answers", "Practical questions about the BBI library and its categories."),
  component: FaqHub,
});
