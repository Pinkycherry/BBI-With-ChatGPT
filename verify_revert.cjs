const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = "https://jqzadwobnfypmytcbpkw.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxemFkd29ibmZ5cG15dGNicGt3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTQ0MTY0MiwiZXhwIjoyMTAxMDE3NjQyfQ.ov5ldXay1LkY4tQYgxlGww2Cr4jtT5ROyspzxL4YYUg";
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const { count: ideasCount, error: e1 } = await supabase.from('ideas').select('*', { count: 'exact', head: true });
  const { count: updatedCount, error: e2 } = await supabase.from('updated_ideas').select('*', { count: 'exact', head: true });
  
  // Let's get one specific record that might differ to prove the revert
  // We'll just fetch IDEA-00001 from both to show they are separate
  const { data: idea1 } = await supabase.from('ideas').select('title').eq('idea_id', 'IDEA-00001').single();
  const { data: idea2 } = await supabase.from('updated_ideas').select('title').eq('idea_id', 'IDEA-00001').single();

  console.log(`Ideas table count: ${ideasCount}`);
  console.log(`Updated_ideas table count: ${updatedCount}`);
  if (idea1) console.log(`IDEA-00001 title in 'ideas': ${idea1.title}`);
  if (idea2) console.log(`IDEA-00001 title in 'updated_ideas': ${idea2.title}`);
}
run();
