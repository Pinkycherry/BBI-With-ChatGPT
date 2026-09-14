import calculatorsRaw from "../../data/calculators.json";

export type CalculatorInput = {
  id: string;
  label: string;
  type: "number" | "currency" | "percentage";
  currency?: string;
  default_value: number;
  unit: string;
  min: number;
  max: number;
  step: number;
  description: string;
};

export type CalculatorOutput = {
  id: string;
  label: string;
  formula_expression: string;
  unit: string;
  description: string;
};

export type CalculatorDef = {
  id: string;
  slug: string;
  name: string;
  category: string;
  data_level: string;
  status: string;
  description: string;
  formula_text: string;
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  industry_benchmarks: Record<string, string | Record<string, string>>;
  example_calculation: {
    scenario: string;
    inputs: Record<string, number>;
    results: Record<string, number | string>;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
};

export const USEFUL_CALCULATORS: CalculatorDef[] = calculatorsRaw.calculators as CalculatorDef[];

export function getCalculatorBySlug(slug: string): CalculatorDef | undefined {
  return USEFUL_CALCULATORS.find((c) => c.slug === slug);
}
