import { createFileRoute, notFound } from "@tanstack/react-router";
import { CalculatorPage, secondaryMeta } from "@/components/bbi/secondary";
import { findCalculator } from "@/lib/calculators";

export const Route = createFileRoute("/calculator/$slug")({
  head: () => secondaryMeta("Business calculator", "Transparent calculations using only your own inputs."),
  component: Page,
});

function Page() {
  const { slug } = Route.useParams();
  const calculator = findCalculator(slug);
  if (!calculator) throw notFound();
  return <CalculatorPage key={calculator.slug} calculator={calculator} />;
}
