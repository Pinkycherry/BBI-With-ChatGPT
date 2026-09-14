import fs from "fs";
import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const PROMPT_TEMPLATE = `
You are an expert business researcher.
Research this business idea on the web and fill out the requested fields.

BUSINESS TO RESEARCH:
Idea ID: {idea_id}
Category: {category_name}
Subcategory: {subcategory_name}
Title/Description: {title} / {business_description}

THE RULES:
1. Search the web to find factual data. Write exactly one line of JSON containing the research facts.
Format: {"startup_cost":{"value":"...","source":"https://..."},"income_range":{"value":"...","source":"https://..."},"market_note":{"value":"...","source":"https://..."},"long_tail":["question one","question two"],"voice_angle":"...","open_with":"..."}
2. ONLY use numbers in your writing if they exist in that JSON and have a source. Otherwise use qualitative language (e.g. "costs very little").
3. DO NOT use these words: game changer, revolutionary, unlock, seamless, robust, cutting-edge, disrupt, leverage, synergy, holistic, empower, elevate, next-generation, paradigm, dive in, look no further, the possibilities are endless, in conclusion.
4. No years, no brand names, no AI vendor names, no emojis, no markdown.

EXISTING DATA:
summary: {summary}
verdict: {verdict}
how_you_make_money: {how_you_make_money}
startup_cost: {startup_cost}
income_potential: {income_potential}
competition_edge: {competition_edge}

INSTRUCTIONS FOR EXISTING DATA:
If any of the above existing data contains a NUMBER (cost, percentage, timeline) that you cannot source and prove in your research, you MUST rewrite that field entirely to remove the unsourced number, replacing it with qualitative text. If it doesn't contain an unsourced number, leave it exactly as it is (output it exactly).

FIELDS TO GENERATE (if blank in existing data, write them. If not blank, keep existing unless rewriting due to rule above):
- summary: 5-7 sentences. What it is, who pays, their frustration, day to day.
- market_opportunity: 3-4 sentences on why real demand exists.
- target_customer: 3-4 sentences. The exact person who pays. What they do instead today.
- how_you_make_money: 3-4 sentences. Pricing works, what one sale looks like, repeat?
- startup_cost: 2-3 sentences.
- income_potential: 2-3 sentences. Early, settled, ceiling.
- competition_edge: 3-4 sentences. What obvious version gets wrong.
- time_to_first_customer: 1-2 honest sentences.
- verdict: 2-3 sentences. Who suits, who should walk.
- business_description, title, slug: only if blank.
- SEO: focus_keyword, additional_keyword_1, additional_keyword_2, seo_title (max 60 char), meta_description (max 160 char), tags (JSON array of 4-6 tags)
- JSONs (single-line, double quotes):
  - pros_json: 3 genuine advantages
  - cons_json: 3 genuine obstacles (practical, financial, legal, trust)
  - getting_started_steps: 5-7 steps in order
  - tools_needed: 4-6 generic things
  - faq_json: 3 questions [{"q":"...","a":"..."}]
  - external_links: 2-4 real, working, non-commercial reference pages you opened.
- trend_score: number 55-98 based on demand.
- tier: 'premium' if score >= 88, else 'free'

Return ONLY a raw JSON object containing ALL these fields (including research_facts) so they can be written back to the CSV. The JSON keys should match the column names. DO NOT wrap the output in markdown blocks (e.g. \`\`\`json). Just the raw JSON object.
`;

async function processBatch(batchSize = 5) {
  console.log("Reading CSV...");
  const csvContent = fs.readFileSync("data/sheet_full.csv", "utf-8");
  const records = parse(csvContent, { columns: false, skip_empty_lines: true });

  const headers = records[0];
  const rows = records.slice(1);

  // Find rows where AK (index 36) is empty
  const pendingRows = rows.filter((r) => !r[36] || r[36].trim() === "");
  console.log(`Found ${pendingRows.length} rows to process. Processing first ${batchSize}.`);

  const toProcess = pendingRows.slice(0, batchSize);
  const updatedRows = [...records];
  let processedCount = 0;
  const reportLines = [];

  for (const row of toProcess) {
    console.log(`Processing ${row[0]}...`);
    const prompt = PROMPT_TEMPLATE.replace("{idea_id}", row[0])
      .replace("{category_name}", row[2])
      .replace("{subcategory_name}", row[5])
      .replace("{title}", row[13])
      .replace("{business_description}", row[10])
      .replace("{summary}", row[14])
      .replace("{verdict}", row[18])
      .replace("{how_you_make_money}", row[26])
      .replace("{startup_cost}", row[27])
      .replace("{income_potential}", row[28])
      .replace("{competition_edge}", row[29]);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      let jsonText = response.text;
      if (jsonText.startsWith("```")) {
        jsonText = jsonText.replace(/^```(json)?\n/, "").replace(/\n```$/, "");
      }
      const data = JSON.parse(jsonText);

      const rowIndex = updatedRows.findIndex((r) => r[0] === row[0]);
      if (rowIndex !== -1) {
        // Map data back to row array
        // Never touch A-G (0-6), L (11), M (12), AJ (35)
        if (data.focus_keyword) updatedRows[rowIndex][7] = data.focus_keyword;
        if (data.additional_keyword_1) updatedRows[rowIndex][8] = data.additional_keyword_1;
        if (data.additional_keyword_2) updatedRows[rowIndex][9] = data.additional_keyword_2;
        if (data.business_description && !row[10])
          updatedRows[rowIndex][10] = data.business_description;
        if (data.title && !row[13]) updatedRows[rowIndex][13] = data.title;
        if (data.summary) updatedRows[rowIndex][14] = data.summary;
        if (data.tags)
          updatedRows[rowIndex][15] =
            typeof data.tags === "string" ? data.tags : JSON.stringify(data.tags);
        if (data.pros_json)
          updatedRows[rowIndex][16] =
            typeof data.pros_json === "string" ? data.pros_json : JSON.stringify(data.pros_json);
        if (data.cons_json)
          updatedRows[rowIndex][17] =
            typeof data.cons_json === "string" ? data.cons_json : JSON.stringify(data.cons_json);
        if (data.verdict) updatedRows[rowIndex][18] = data.verdict;
        if (data.trend_score) updatedRows[rowIndex][19] = String(data.trend_score);
        if (data.tier) updatedRows[rowIndex][20] = data.tier;
        if (data.slug && !row[21]) updatedRows[rowIndex][21] = data.slug;
        if (data.seo_title) updatedRows[rowIndex][22] = data.seo_title;
        if (data.meta_description) updatedRows[rowIndex][23] = data.meta_description;
        if (data.market_opportunity) updatedRows[rowIndex][24] = data.market_opportunity;
        if (data.target_customer) updatedRows[rowIndex][25] = data.target_customer;
        if (data.how_you_make_money) updatedRows[rowIndex][26] = data.how_you_make_money;
        if (data.startup_cost) updatedRows[rowIndex][27] = data.startup_cost;
        if (data.income_potential) updatedRows[rowIndex][28] = data.income_potential;
        if (data.competition_edge) updatedRows[rowIndex][29] = data.competition_edge;
        if (data.getting_started_steps)
          updatedRows[rowIndex][30] =
            typeof data.getting_started_steps === "string"
              ? data.getting_started_steps
              : JSON.stringify(data.getting_started_steps);
        if (data.tools_needed)
          updatedRows[rowIndex][31] =
            typeof data.tools_needed === "string"
              ? data.tools_needed
              : JSON.stringify(data.tools_needed);
        if (data.time_to_first_customer) updatedRows[rowIndex][32] = data.time_to_first_customer;
        if (data.faq_json)
          updatedRows[rowIndex][33] =
            typeof data.faq_json === "string" ? data.faq_json : JSON.stringify(data.faq_json);
        if (data.external_links)
          updatedRows[rowIndex][34] =
            typeof data.external_links === "string"
              ? data.external_links
              : JSON.stringify(data.external_links);

        if (data.research_facts)
          updatedRows[rowIndex][36] =
            typeof data.research_facts === "string"
              ? data.research_facts
              : JSON.stringify(data.research_facts);

        processedCount++;

        // Reporting logic
        const blanks = Object.keys(data).filter((k) => !data[k] || data[k].length === 0);
        if (blanks.length > 0) {
          reportLines.push(
            `- ${row[0]}: Left blank (${blanks.join(", ")}) because it could not be sourced.`,
          );
        }

        // Log if we rewrote an existing field
        const fieldsMap = {
          summary: 14,
          verdict: 18,
          how_you_make_money: 26,
          startup_cost: 27,
          income_potential: 28,
          competition_edge: 29,
        };
        for (const [f, index] of Object.entries(fieldsMap)) {
          const oldVal = String(row[index] || "").trim();
          const newVal = String(data[f] || "").trim();
          if (oldVal && newVal && oldVal !== newVal) {
            reportLines.push(
              `- ${row[0]} (rewrote ${f}): Old value had numbers. Changed to qualitative text.`,
            );
          }
        }

        // Wait 45 seconds to avoid rate limits
        console.log("Waiting 45s to respect rate limits...");
        await new Promise((resolve) => setTimeout(resolve, 45000));
      }
    } catch (err) {
      console.error(`Error processing ${row[0]}:`, err.message);
    }
  }

  const outCsv = stringify(updatedRows);
  fs.writeFileSync("public/completed_batch.csv", outCsv);
  fs.writeFileSync(
    "public/report.txt",
    `Processed ${processedCount} rows.\n\n` + reportLines.join("\n"),
  );
  console.log(`\nProcessed ${processedCount} rows. Saved to public/completed_batch.csv`);
}

processBatch(50).catch(console.error);
