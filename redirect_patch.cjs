const fs = require("fs");
let content = `import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/useful-tools/")({
  beforeLoad: () => {
    throw redirect({
      to: "/calculator",
      replace: true,
    });
  },
  component: () => null,
});
`;

fs.writeFileSync("src/routes/useful-tools.index.tsx", content);
