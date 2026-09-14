const fs = require('fs');
const { parse } = require('csv-parse/sync');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = "https://jqzadwobnfypmytcbpkw.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxemFkd29ibmZ5cG15dGNicGt3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTQ0MTY0MiwiZXhwIjoyMTAxMDE3NjQyfQ.ov5ldXay1LkY4tQYgxlGww2Cr4jtT5ROyspzxL4YYUg";
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function checkDiff() {
  const badCsvData = fs.readFileSync('Superbase_Ideas_Filled.csv', 'utf8');
  const badRecords = parse(badCsvData, { columns: true, skip_empty_lines: true });
  console.log("Bad records count:", badRecords.length);

  const goodCsvData = fs.readFileSync('public/completed_batch.csv', 'utf8');
  const goodRecords = parse(goodCsvData, { columns: true, skip_empty_lines: true });
  console.log("Good (completed_batch) records count:", goodRecords.length);
}
checkDiff();
