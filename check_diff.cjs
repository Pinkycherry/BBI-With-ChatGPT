const fs = require('fs');
const { parse } = require('csv-parse/sync');

const badData = parse(fs.readFileSync('Superbase_Ideas_Filled.csv', 'utf8'), { columns: true });
const goodData = parse(fs.readFileSync('public/completed_batch.csv', 'utf8'), { columns: true });

let diffCount = 0;
for (let i = 0; i < Math.min(badData.length, goodData.length); i++) {
  if (badData[i].idea_id !== goodData[i].idea_id) {
     console.log(`Mismatch at row ${i}: ${badData[i].idea_id} vs ${goodData[i].idea_id}`);
     diffCount++;
  }
}
console.log(`Checked ${badData.length} vs ${goodData.length}. Diffs found: ${diffCount}`);
