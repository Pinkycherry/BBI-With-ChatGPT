const fs = require("fs");
const { parse } = require("csv-parse/sync");

const badData = parse(fs.readFileSync("Superbase_Ideas_Filled.csv", "utf8"), { columns: true });
const goodData = parse(fs.readFileSync("public/completed_batch.csv", "utf8"), { columns: true });

let diffs = 0;
for (let i = 0; i < 5; i++) {
  for (const key of Object.keys(badData[i])) {
    if (badData[i][key] !== goodData[i][key]) {
      console.log(
        `Row ${i} Diff in ${key}: \nBAD: ${badData[i][key]}\nGOOD: ${goodData[i][key]}\n`,
      );
      diffs++;
    }
  }
}
console.log("Total diffs in first 5 rows:", diffs);
