const fs = require("fs");
let content = fs.readFileSync("src/routes/calculator.$slug.tsx", "utf-8");

// Inside head: ({ loaderData }) => {
content = content.replace(
  /{ name: "description", content: calculator.description },/,
  '{ name: "description", content: calculator.description },\n        { name: "keywords", content: (calculator.seoKeywords || []).join(", ") },',
);

fs.writeFileSync("src/routes/calculator.$slug.tsx", content);
