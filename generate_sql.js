const fs = require('fs');
const { parse } = require('csv-parse/sync');

const csvData = fs.readFileSync('public/completed_batch.csv', 'utf8');
const records = parse(csvData, {
  columns: true,
  skip_empty_lines: true
});

let sql = `CREATE TABLE IF NOT EXISTS public.updated_ideas (
  idea_id text PRIMARY KEY,
  category_id text,
  category_name text,
  category_slug text,
  subcategory_id text,
  subcategory_name text,
  subcategory_slug text,
  focus_keyword text,
  additional_keyword_1 text,
  additional_keyword_2 text,
  business_description text,
  collection_id text,
  status text,
  title text,
  summary text,
  tags text,
  pros_json text,
  cons_json text,
  verdict text,
  trend_score numeric,
  tier text,
  slug text,
  seo_title text,
  meta_description text,
  market_opportunity text,
  target_customer text,
  how_you_make_money text,
  startup_cost text,
  income_potential text,
  competition_edge text,
  getting_started_steps text,
  tools_needed text,
  time_to_first_customer text,
  faq_json text,
  external_links text,
  internal_link_anchors text,
  research_facts text
);\n\n`;

console.log("SQL schema generated.");
