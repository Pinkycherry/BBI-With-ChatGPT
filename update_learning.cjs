const fs = require("fs");
let content = fs.readFileSync("src/routes/learning-resources.index.tsx", "utf-8");

content = content.replace(
  'import { USEFUL_CALCULATORS } from "@/lib/useful-tools-data";',
  'import { CALCULATORS } from "@/lib/calculators";',
);
content = content.replace("USEFUL_CALCULATORS.length", "CALCULATORS.length");

fs.writeFileSync("src/routes/learning-resources.index.tsx", content);
