const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = "https://jqzadwobnfypmytcbpkw.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxemFkd29ibmZ5cG15dGNicGt3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTQ0MTY0MiwiZXhwIjoyMTAxMDE3NjQyfQ.ov5ldXay1LkY4tQYgxlGww2Cr4jtT5ROyspzxL4YYUg";
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const { data, error } = await supabase.from('ideas').select('*').limit(1);
  if (error) {
    console.error("Error fetching schema:", error);
  } else {
    if (data && data.length > 0) {
      console.log("Columns in ideas table:", Object.keys(data[0]).join(', '));
    } else {
      console.log("Table is empty, can't infer schema easily from REST.");
    }
  }
}
run();
