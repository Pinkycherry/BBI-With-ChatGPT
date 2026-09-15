import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://jqzadwobnfypmytcbpkw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxemFkd29ibmZ5cG15dGNicGt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU0NDE2NDIsImV4cCI6MjEwMTAxNzY0Mn0.085m7cPW0RKkkwWUE4JvoVK0fRKCs9bzt568qXIvgHw",
);

async function test() {
  console.log("Testing connection...");
  const { data, error } = await supabase.from("ideas").select("idea_id, title").limit(3);
  if (error) {
    console.error("Error connecting to ideas table:", error);
  } else {
    console.log("Success! Ideas found:", data);
  }
}
test();
