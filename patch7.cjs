const fs = require("fs");
let content = fs.readFileSync("src/components/site-shell.tsx", "utf-8");

content = content.replace(
  /\{ to: "\/useful-tools", label: "Useful Tools" \}/g,
  '{ to: "/calculator", label: "Calculators & Tools" }',
);

fs.writeFileSync("src/components/site-shell.tsx", content);
