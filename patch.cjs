const fs = require('fs');
let content = fs.readFileSync('src/lib/calculators.ts', 'utf-8');

// 1. Add the import at the top
content = `import { GENERATED_CALCULATORS } from "./generated-calculators";\n` + content;

// 2. Append to the end of CALCULATORS array
// The array currently ends around line 976 with "];"
// Actually, it's safer to just do string replacement
content = content.replace(/export const CALCULATORS: readonly Calculator\[\] = \[([\s\S]*?)\];/, 
  "export const CALCULATORS: readonly Calculator[] = [\n$1,\n  ...GENERATED_CALCULATORS\n];");

fs.writeFileSync('src/lib/calculators.ts', content);
