const fs = require("fs");
const { parse } = require("csv-parse/sync");
const { stringify } = require("csv-stringify/sync");

const csvData = fs.readFileSync("Superbase_Ideas_Filled.csv", "utf8");
const records = parse(csvData, { columns: true, skip_empty_lines: true });

const slugCounts = {};
records.forEach((r) => {
  if (!slugCounts[r.slug]) {
    slugCounts[r.slug] = 0;
  }
  slugCounts[r.slug]++;
  if (slugCounts[r.slug] > 1) {
    r.slug = `${r.slug}-${slugCounts[r.slug]}`;
    console.log(`Updated duplicate slug for idea ${r.idea_id} to ${r.slug}`);
  }
});

const output = stringify(records, { header: true });
fs.writeFileSync("Superbase_Ideas_Filled_Fixed.csv", output);
console.log("Fixed CSV created.");
