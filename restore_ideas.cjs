const fs = require("fs");
const { parse } = require("csv-parse/sync");
const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://jqzadwobnfypmytcbpkw.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxemFkd29ibmZ5cG15dGNicGt3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTQ0MTY0MiwiZXhwIjoyMTAxMDE3NjQyfQ.ov5ldXay1LkY4tQYgxlGww2Cr4jtT5ROyspzxL4YYUg";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const csvData = fs.readFileSync("public/completed_batch.csv", "utf8");
  const records = parse(csvData, { columns: true, skip_empty_lines: true });

  const batchSize = 100;
  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);

    batch.forEach((record) => {
      // Fix empty numerics
      if (record.trend_score === "") record.trend_score = null;
      else if (typeof record.trend_score === "string")
        record.trend_score = parseInt(parseFloat(record.trend_score));

      // Fix empty unique fields so they don't violate constraints
      if (record.slug === "") record.slug = null;

      try {
        if (typeof record.tags === "string" && record.tags.startsWith("["))
          record.tags = JSON.parse(record.tags);
        if (typeof record.pros_json === "string" && record.pros_json.startsWith("["))
          record.pros_json = JSON.parse(record.pros_json);
        if (typeof record.cons_json === "string" && record.cons_json.startsWith("["))
          record.cons_json = JSON.parse(record.cons_json);
        if (typeof record.faq_json === "string" && record.faq_json.startsWith("["))
          record.faq_json = JSON.parse(record.faq_json);
      } catch (e) {}
    });

    const { error } = await supabase.from("ideas").upsert(batch, { onConflict: "idea_id" });

    if (error) {
      console.error(`Error upserting batch ${i} to ${i + batchSize}:`, error);
      process.exit(1);
    } else {
      console.log(`Successfully RESTORED records ${i} to ${i + batch.length}`);
    }
  }

  console.log("Reversion complete! The correct sheet data has been restored.");
}

run();
