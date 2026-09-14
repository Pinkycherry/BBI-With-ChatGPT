import { CALCULATORS } from "./src/lib/calculators";
const slugs = CALCULATORS.map((c) => c?.slug).filter(Boolean);
const counts = {};
slugs.forEach((s) => {
  counts[s] = (counts[s] || 0) + 1;
});
console.log(Object.entries(counts).filter(([k, v]) => v > 1));
