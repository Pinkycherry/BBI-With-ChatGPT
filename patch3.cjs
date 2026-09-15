const fs = require("fs");
let content = fs.readFileSync("src/routes/calculator.index.tsx", "utf-8");

// We need to import useState
if (!content.includes('import { useState } from "react";')) {
  content = content.replace(
    "import { createFileRoute",
    'import { useState } from "react";\nimport { createFileRoute',
  );
}

// Add state to component
content = content.replace(
  "function CalculatorIndex() {",
  'function CalculatorIndex() {\n  const [search, setSearch] = useState("");',
);

// Add search input before the grid
const searchInput = `
          <div className="mt-8 relative max-w-xl">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <svg className="h-5 w-5 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="search"
              placeholder="Search 60+ calculators..."
              className="w-full rounded-2xl border border-border/50 bg-background/50 py-3.5 pl-11 pr-4 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div
`;

content = content.replace(
  "<div\n            ref={(node) => {",
  searchInput + "            ref={(node) => {",
);

// Filter the array
content = content.replace(
  "{CALCULATORS.map((calculator)",
  `{CALCULATORS.filter(c => {
              const q = search.toLowerCase();
              return c.title.toLowerCase().includes(q) || c.answers.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
            }).map((calculator)`,
);

fs.writeFileSync("src/routes/calculator.index.tsx", content);
