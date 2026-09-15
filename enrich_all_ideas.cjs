const { GoogleGenAI, Type } = require("@google/genai");
const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://jqzadwobnfypmytcbpkw.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxemFkd29ibmZ5cG15dGNicGt3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTQ0MTY0MiwiZXhwIjoyMTAxMDE3NjQyfQ.ov5ldXay1LkY4tQYgxlGww2Cr4jtT5ROyspzxL4YYUg";
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const ai = new GoogleGenAI();

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    seo_title: { type: Type.STRING },
    meta_description: { type: Type.STRING },
    market_opportunity: { type: Type.STRING },
    target_customer: { type: Type.STRING },
    how_you_make_money: { type: Type.STRING },
    startup_cost: { type: Type.STRING },
    income_potential: { type: Type.STRING },
    competition_edge: { type: Type.STRING },
    time_to_first_customer: { type: Type.STRING },
    getting_started_steps: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    tools_needed: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    faq_json: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          q: { type: Type.STRING },
          a: { type: Type.STRING },
        },
        required: ["q", "a"],
      },
    },
  },
  required: [
    "seo_title",
    "meta_description",
    "market_opportunity",
    "target_customer",
    "how_you_make_money",
    "startup_cost",
    "income_potential",
    "competition_edge",
    "time_to_first_customer",
    "getting_started_steps",
    "tools_needed",
    "faq_json",
  ],
};

async function generateData(idea) {
  const prompt = `
Generate detailed, highly specific business insights for the following business idea. Do not use generic templated language. Give a unique, realistic assessment of this exact business model.

Idea Title: ${idea.title}
Category: ${idea.category_name}
Summary: ${idea.summary}

Provide:
1. seo_title: Catchy title for search engines (max 60 chars)
2. meta_description: Compelling description for search engines (max 155 chars)
3. market_opportunity: A short paragraph explaining why this market exists and is growing right now.
4. target_customer: Who specifically is buying this? Give a realistic persona.
5. how_you_make_money: Pricing model and revenue streams.
6. startup_cost: Realistic required initial investment.
7. income_potential: Realistic earning potential once established.
8. competition_edge: How this idea stands out against existing solutions.
9. time_to_first_customer: Realistic timeline to land the first paying client.
10. getting_started_steps: 5 to 7 concrete, actionable steps to start this exact business.
11. tools_needed: 4 to 6 specific tools, software, or equipment needed.
12. faq_json: 3 frequently asked questions (and answers) a potential founder would have about this business.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    return JSON.parse(response.text);
  } catch (e) {
    console.error(`Error generating for ${idea.idea_id}:`, e.message);
    return null;
  }
}

async function run() {
  console.log("Fetching all ideas...");
  const { data: ideas, error } = await supabase.from("ideas").select("*");

  if (error) {
    console.error("Error fetching ideas:", error);
    process.exit(1);
  }

  console.log(`Found ${ideas.length} ideas. Starting enrichment process...`);

  let successCount = 0;

  // We process in batches of 5 to avoid rate limits while remaining fast
  const CONCURRENCY = 5;
  for (let i = 0; i < ideas.length; i += CONCURRENCY) {
    const batch = ideas.slice(i, i + CONCURRENCY);
    console.log(
      `Processing batch ${Math.floor(i / CONCURRENCY) + 1} of ${Math.ceil(ideas.length / CONCURRENCY)}...`,
    );

    const promises = batch.map(async (idea) => {
      // Optional: Check if the idea is already enriched (e.g. unique seo_title).
      // If the current target_customer is exactly equal to the template string, or we just want to force regenerate all.
      // The user wants to replace all templated ones. Let's just process all to be sure.

      const generated = await generateData(idea);
      if (generated) {
        // Update the idea in Supabase
        const { error: updateError } = await supabase
          .from("ideas")
          .update({
            seo_title: generated.seo_title,
            meta_description: generated.meta_description,
            market_opportunity: generated.market_opportunity,
            target_customer: generated.target_customer,
            how_you_make_money: generated.how_you_make_money,
            startup_cost: generated.startup_cost,
            income_potential: generated.income_potential,
            competition_edge: generated.competition_edge,
            time_to_first_customer: generated.time_to_first_customer,
            getting_started_steps: generated.getting_started_steps, // Array goes natively to JSONB
            tools_needed: generated.tools_needed,
            faq_json: generated.faq_json,
          })
          .eq("idea_id", idea.idea_id);

        if (updateError) {
          console.error(`Error updating DB for ${idea.idea_id}:`, updateError.message);
        } else {
          successCount++;
        }
      }
    });

    await Promise.all(promises);
  }

  console.log(
    `Finished processing. Successfully updated ${successCount} out of ${ideas.length} ideas.`,
  );
}

run();
