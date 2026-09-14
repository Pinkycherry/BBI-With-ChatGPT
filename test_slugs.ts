import { CALCULATORS } from "./src/lib/calculators";
const slugs = CALCULATORS.map(c => c.slug);
const duplicates = slugs.filter((s, i, a) => a.indexOf(s) !== i);
console.log("DUPLICATES:", duplicates);
