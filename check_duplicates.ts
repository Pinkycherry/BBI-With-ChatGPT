import { CALCULATORS } from "./src/lib/calculators";
import { CASE_STUDIES } from "./src/lib/case-studies-data";
import { STARTUP_GUIDES } from "./src/lib/guides-data";
import { GLOSSARY_DATA } from "./src/lib/glossary-data";

const calcSlugs = CALCULATORS.map((c) => c.slug);
const caseSlugs = CASE_STUDIES.map((c) => c.slug);
const guideSlugs = STARTUP_GUIDES.map((c) => c.slug);
const glossSlugs = GLOSSARY_DATA.map((c) => c.slug);

console.log(
  "Calc duplicates:",
  calcSlugs.filter((s, i, a) => a.indexOf(s) !== i),
);
console.log(
  "Case duplicates:",
  caseSlugs.filter((s, i, a) => a.indexOf(s) !== i),
);
console.log(
  "Guide duplicates:",
  guideSlugs.filter((s, i, a) => a.indexOf(s) !== i),
);
console.log(
  "Gloss duplicates:",
  glossSlugs.filter((s, i, a) => a.indexOf(s) !== i),
);
