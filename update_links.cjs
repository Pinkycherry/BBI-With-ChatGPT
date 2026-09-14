const fs = require("fs");

const files = [
  "src/components/home/home-experience.tsx",
  "src/routes/startup-guides.index.tsx",
  "src/routes/startup-guides.$slug.tsx",
  "src/routes/founder-glossary.index.tsx",
  "src/routes/learning-resources.index.tsx",
];

for (const file of files) {
  let content = fs.readFileSync(file, "utf-8");
  content = content.replace(/\/useful-tools/g, "/calculator");
  fs.writeFileSync(file, content);
}
