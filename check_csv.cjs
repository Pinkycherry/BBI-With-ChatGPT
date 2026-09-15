const fs = require("fs");
const { parse } = require("csv-parse/sync");
const csvData = fs.readFileSync("Superbase_Ideas_Filled.csv", "utf8");
const records = parse(csvData, {
  columns: true,
  skip_empty_lines: true,
});
console.log("Found " + records.length + " records in Superbase_Ideas_Filled.csv");
console.log("Headers:", Object.keys(records[0]).join(", "));
