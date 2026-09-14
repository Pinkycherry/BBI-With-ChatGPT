import { CALCULATORS } from "./src/lib/calculators";
for (const calc of CALCULATORS) {
  // Create dummy input
  const input = {};
  for (const f of calc.fields) {
    input[f.key] = 100; // dummy value
  }
  try {
    const readings = calc.compute(input);
    const keys = readings.map(r => r.key);
    const counts = {};
    keys.forEach(k => counts[k] = (counts[k] || 0) + 1);
    const dups = Object.keys(counts).filter(k => counts[k] > 1);
    if (dups.length > 0) {
      console.log(`Duplicate keys in ${calc.slug}:`, dups);
    }
  } catch(e) {}
}
console.log("Done checking calculator keys.");
