const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = "https://jqzadwobnfypmytcbpkw.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxemFkd29ibmZ5cG15dGNicGt3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTQ0MTY0MiwiZXhwIjoyMTAxMDE3NjQyfQ.ov5ldXay1LkY4tQYgxlGww2Cr4jtT5ROyspzxL4YYUg";
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  // Read all from updated_ideas
  let allRecords = [];
  let start = 0;
  const limit = 1000;
  
  while (true) {
    const { data, error } = await supabase.from('updated_ideas').select('*').range(start, start + limit - 1);
    if (error) {
      console.error("Error reading updated_ideas:", error);
      process.exit(1);
    }
    if (!data || data.length === 0) break;
    
    allRecords = allRecords.concat(data);
    start += limit;
  }
  
  console.log(`Fetched ${allRecords.length} records from updated_ideas. Upserting to ideas...`);
  
  const batchSize = 100;
  for (let i = 0; i < allRecords.length; i += batchSize) {
    const batch = allRecords.slice(i, i + batchSize);
    
    // Some cleanup if necessary, but it should be exactly matched schema now
    const { error } = await supabase.from('ideas').upsert(batch, { onConflict: 'idea_id' });
    
    if (error) {
      console.error(`Error upserting batch ${i} to ${i + batchSize}:`, error);
      process.exit(1);
    } else {
      console.log(`Successfully upserted records ${i} to ${i + batch.length} to 'ideas' table`);
    }
  }
  
  console.log("All records successfully pushed from 'updated_ideas' to 'ideas' table!");
}

run();
