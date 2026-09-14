const fs = require("fs");
let content = fs.readFileSync("src/lib/calculators.ts", "utf-8");
content = content.replace(
  "CALCULATORS.find((calculator) => calculator.slug === slug)",
  "CALCULATORS.find((calculator) => calculator && calculator.slug === slug)",
);
fs.writeFileSync("src/lib/calculators.ts", content);
