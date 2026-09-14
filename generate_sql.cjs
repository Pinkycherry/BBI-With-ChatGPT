const fs = require("fs");
console.log("Validating CSV headers...");
const csvData = fs.readFileSync("public/completed_batch.csv", "utf8");
const headers = csvData.split("\n")[0];
console.log(headers);
