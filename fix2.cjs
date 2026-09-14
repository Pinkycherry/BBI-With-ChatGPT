const fs = require('fs');
let content = fs.readFileSync('src/lib/calculators.ts', 'utf-8');
content = content.replace(/},\s*,\s*\.\.\.GENERATED_CALCULATORS/, '},\n  ...GENERATED_CALCULATORS');
fs.writeFileSync('src/lib/calculators.ts', content);
