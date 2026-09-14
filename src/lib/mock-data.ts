import type { IdeaRow } from "./ideas-shared";
import type { CategoryNode } from "./ideas.functions";

export const MOCK_CATEGORIES: CategoryNode[] = [
  { categoryName: "AI & Automation", categorySlug: "ai-automation", ideaCount: 28 },
  { categoryName: "Creator & Media", categorySlug: "creator-media", ideaCount: 34 },
  { categoryName: "Tech & SaaS", categorySlug: "tech-saas", ideaCount: 42 },
  { categoryName: "E-Commerce & Retail", categorySlug: "e-commerce-retail", ideaCount: 26 },
  { categoryName: "Health & Fitness", categorySlug: "health-fitness", ideaCount: 19 },
  { categoryName: "FinTech & Finance", categorySlug: "fintech-finance", ideaCount: 22 },
  { categoryName: "Education & EdTech", categorySlug: "education-edtech", ideaCount: 18 },
  { categoryName: "Productivity & Workflow", categorySlug: "productivity-workflow", ideaCount: 25 },
  {
    categoryName: "Low-Investment Business Ideas",
    categorySlug: "low-investment-business-ideas",
    ideaCount: 38,
  },
  { categoryName: "Side Hustle Ideas", categorySlug: "side-hustle-ideas", ideaCount: 38 },
];

export const MOCK_IDEAS: IdeaRow[] = [
  {
    idea_id: "IDEA-00022",
    category_id: "CAT-02",
    category_name: "Creator & Media",
    category_slug: "creator-media",
    subcategory_id: "SUB-021",
    subcategory_name: "Visual Storytelling",
    subcategory_slug: "visual-storytelling",
    collection_id: null,
    status: "completed",
    focus_keyword: "human lens media",
    additional_keyword_1: "documentary branding",
    additional_keyword_2: "founder film production",
    business_description:
      "A boutique media agency specializing in documentary-style founder stories and brand films that drive organic customer affinity and investor trust.",
    title: "Human Lens Media",
    slug: "human-lens-media",
    summary:
      "Documentary-style founder storytelling that converts authentic human struggle into high-converting organic media assets.",
    tags: ["Media", "Video", "Creator Economy", "Brand Storytelling"],
    pros_json: [
      "High retainers ($5k-$20k per project)",
      "Strong referral flywheel from high-profile founders",
      "Immune to commoditized AI text spam",
    ],
    cons_json: [
      "Requires in-person or high-end remote production logistics",
      "Initial portfolio takes 2-3 unpaid or subsidized cases",
    ],
    verdict: "High-ticket service with rapid path to $20k/mo for skilled visual storytellers.",
    trend_score: 89,
    tier: "free",
    created_at: new Date().toISOString(),
    seo_title: "Human Lens Media — Boutique Founder Storytelling Agency Blueprint",
    meta_description:
      "Blueprint for starting a documentary-style media production company catering to high-growth startup founders.",
    market_opportunity:
      "Founders and executives increasingly need personal branding, but traditional marketing agencies produce generic, sterile corporate reels. Authentic documentary storytelling commands premium pricing.",
    target_customer:
      "Seed to Series B venture-backed startup founders, boutique agency owners, and niche creators.",
    how_you_make_money:
      "Sprint-based packages ($7,500/film) and monthly content repurposing retainers ($3,000/mo).",
    startup_cost: "$2,000 - $5,000 for prosumer camera & audio kit (or rent on-demand).",
    income_potential: "$120,000 - $350,000/year at 3-5 active accounts.",
    competition_edge: "Cinematic depth, emotional pacing, and quick 10-day delivery cycles.",
    time_to_first_customer: "14 - 30 days through direct outreach to funded founders on LinkedIn.",
    getting_started_steps: [
      "Film 2 free mini-documentaries for recognizable local or Twitter founders.",
      "Package the results into a 60-second before/after case study landing page.",
      "Conduct targeted outreach to newly funded founders announcing seed rounds.",
    ],
    tools_needed: [
      "Sony FX3 / Blackmagic Camera",
      "DaVinci Resolve / Premiere Pro",
      "Descript",
      "Frame.io",
    ],
  },
  {
    idea_id: "IDEA-00012",
    category_id: "CAT-02",
    category_name: "Creator & Media",
    category_slug: "creator-media",
    subcategory_id: "SUB-022",
    subcategory_name: "Audio & Newsletters",
    subcategory_slug: "audio-newsletters",
    collection_id: null,
    status: "completed",
    focus_keyword: "narrative weave",
    additional_keyword_1: "serialized podcast production",
    additional_keyword_2: "audio narrative editing",
    business_description:
      "A dedicated audio-first production house that scripts, records, and sound-designs serialized narrative podcasts for tech brands.",
    title: "Narrative Weave",
    slug: "narrative-weave",
    summary:
      "Turn corporate case studies into gripping, RadioLab-style episodic podcast seasons for enterprise B2B brands.",
    tags: ["Podcasting", "Audio", "B2B Marketing", "Storytelling"],
    pros_json: [
      "Enterprise contracts with $30k+ season budgets",
      "High barrier to entry keeps freelance competitors away",
      "Long production lead times provide predictable schedules",
    ],
    cons_json: [
      "Requires advanced sound design and narrative editing skill",
      "Sales cycles can take 60-90 days with corporate procurement",
    ],
    verdict: "Lucrative B2B niche with minimal direct competition and high client retention.",
    trend_score: 87,
    tier: "free",
    created_at: new Date().toISOString(),
    seo_title: "Narrative Weave — High-End B2B Narrative Podcast Studio",
    meta_description:
      "Learn how to build a serialized podcast studio serving enterprise brands with custom narrative seasons.",
    market_opportunity:
      "Enterprise companies spend millions on whitepapers nobody reads. Serialized investigative podcasts turn dry technical breakthroughs into bingeable thought leadership.",
    target_customer: "VP of Content & CMOs at growth-stage SaaS, cybersecurity, and fintech firms.",
    how_you_make_money: "$25,000 - $60,000 per 6-episode branded season.",
    startup_cost: "$1,500 for broadcast microphones, audio interface, and monitoring headphones.",
    income_potential: "$200,000 - $500,000/year.",
    competition_edge:
      "Bespoke score composition, journalistic interviewing, and turnkey hosting setup.",
    time_to_first_customer: "45 - 60 days via outbound executive pitching.",
    getting_started_steps: [
      "Produce a 5-minute proof-of-concept audio pilot dissecting a famous tech milestone.",
      "Pitch CMOs whose companies have announced major rebrands or funding.",
      "Offer pilot episode production with zero-risk exit clause.",
    ],
    tools_needed: ["Shure SM7B", "Logic Pro / Pro Tools", "iZotope RX Suite", "Riverside.fm"],
  },
  {
    idea_id: "IDEA-00021",
    category_id: "CAT-02",
    category_name: "Creator & Media",
    category_slug: "creator-media",
    subcategory_id: "SUB-023",
    subcategory_name: "Faceless Channels",
    subcategory_slug: "faceless-channels",
    collection_id: null,
    status: "completed",
    focus_keyword: "faceless youtube channels",
    additional_keyword_1: "automated media channels",
    additional_keyword_2: "content syndication",
    business_description:
      "Systematized acquisition, production, and syndication of high-retention faceless educational channels across YouTube and TikTok.",
    title: "Hidden Hand Channels",
    slug: "hidden-hand-channels",
    summary:
      "Systematized creation and monetization of faceless, high-retention video channels powered by specialized research scripts.",
    tags: ["YouTube", "Automation", "Passive Income", "Syndication"],
    pros_json: [
      "Scales without camera-facing talent",
      "Multiple monetization streams (AdSense, sponsorships, affiliate)",
      "High asset equity with established viewer base",
    ],
    cons_json: [
      "Platform algorithm fluctuations",
      "Requires rigorous quality control to avoid spam penalties",
    ],
    verdict:
      "Reliable asset-building play if executed with real research and human narration over cheap AI slop.",
    trend_score: 86,
    tier: "free",
    created_at: new Date().toISOString(),
    seo_title: "Hidden Hand Channels — Systematic Faceless Media Blueprint",
    meta_description:
      "Blueprint for launching and scaling high-retention faceless educational channels on modern video platforms.",
    market_opportunity:
      "Audiences crave deep-dive historical, technical, and geopolitical explanations. Channels delivering documentary-grade editing outperform low-effort AI channels by 10x.",
    target_customer:
      "Curious global general audience searching for educational and analytical media.",
    how_you_make_money:
      "YouTube AdSense RPMs ($8-$18 in finance/tech niches), integrated brand sponsorships, digital guides.",
    startup_cost: "$300 - $800 for stock video licenses, music libraries, and voiceover talent.",
    income_potential: "$5,000 - $40,000/month across a network of 3-5 channels.",
    competition_edge:
      "Proprietary research archive, high-retention hook editing, bespoke visual animation.",
    time_to_first_customer: "60 - 90 days to achieve YouTube Partner Program monetization.",
    getting_started_steps: [
      "Pick a high-RPM niche with evergreen search demand (history, architecture, engineering).",
      "Write 5 deep-dive, 12-minute scripts with verified primary sources.",
      "Partner with professional voiceover artists and motion designers.",
    ],
    tools_needed: ["Premiere Pro / After Effects", "Artlist / Storyblocks", "TubeBuddy / VidIQ"],
  },
  {
    idea_id: "IDEA-00001",
    category_id: "CAT-01",
    category_name: "AI & Automation",
    category_slug: "ai-automation",
    subcategory_id: "SUB-011",
    subcategory_name: "Workflow Automation",
    subcategory_slug: "workflow-automation",
    collection_id: null,
    status: "completed",
    focus_keyword: "ai client onboarding",
    additional_keyword_1: "automated onboarding agent",
    additional_keyword_2: "agency automation",
    business_description:
      "A turnkey onboarding engine that collects assets, sets up Slack channels, provisions permissions, and schedules kickoff calls automatically in under 5 minutes.",
    title: "Autonomous Client Onboarding for Agencies",
    slug: "ai-workflow-automator",
    summary:
      "Cut client setup lag from 5 days to 5 minutes with intelligent onboarding pipelines that provision workspaces and contracts.",
    tags: ["AI", "B2B SaaS", "Agency Tools", "Productivity"],
    pros_json: [
      "Eliminates the #1 friction point in marketing agency operations",
      "Very high perceived value directly impacting agency churn",
      "Straightforward setup using modern webhook and API orchestrators",
    ],
    cons_json: ["Agencies use disparate software stacks that require modular connectors"],
    verdict: "High-demand B2B agency solution with strong SaaS or productized service economics.",
    trend_score: 94,
    tier: "free",
    created_at: new Date().toISOString(),
    seo_title: "AI Client Onboarding Engine — Agency Blueprint",
    meta_description:
      "How to build and sell automated client onboarding systems for high-volume digital marketing agencies.",
    market_opportunity:
      "Agencies lose up to 15% of clients during clumsy onboarding. Automating credentials and questionnaires transforms client satisfaction.",
    target_customer: "Digital marketing, SEO, web design, and development agencies with 5+ staff.",
    how_you_make_money: "$2,500 upfront implementation + $499/mo ongoing maintenance and support.",
    startup_cost: "$100 for domain, website, and automation tool licenses.",
    income_potential: "$15,000 - $35,000/month recurring.",
    competition_edge:
      "Zero-touch setup for clients with automated follow-ups for missing credentials.",
    time_to_first_customer: "7 - 14 days via cold email to boutique agency owners.",
    getting_started_steps: [
      "Map out standard onboarding flows for 3 local agencies.",
      "Build a repeatable template in Make / n8n connecting Airtable, Slack, and Google Drive.",
      "Offer a 'first onboarding free' guarantee to build testimonials.",
    ],
    tools_needed: ["Make.com / n8n", "Airtable", "Slack API", "Stripe"],
  },
  {
    idea_id: "IDEA-00002",
    category_id: "CAT-03",
    category_name: "Tech & SaaS",
    category_slug: "tech-saas",
    subcategory_id: "SUB-031",
    subcategory_name: "B2B Micro-SaaS",
    subcategory_slug: "b2b-micro-saas",
    collection_id: null,
    status: "completed",
    focus_keyword: "cold email deliverability tool",
    additional_keyword_1: "inbox reputation monitor",
    additional_keyword_2: "spam filter checker",
    business_description:
      "A real-time DNS, blacklist, and inbox placement monitor that alerts outbound sales teams immediately when secondary domains begin flagging spam filters.",
    title: "Cold Email Deliverability Guard",
    slug: "micro-saas-cold-email-validator",
    summary:
      "Automated inbox placement and DNS reputation watchdog that alerts outbound teams before domain burnout destroys sales pipeline.",
    tags: ["SaaS", "Outbound Sales", "Deliverability", "Cold Email"],
    pros_json: [
      "Essential utility: outbound agencies cannot function without good deliverability",
      "Low churn once integrated into daily sales workflows",
      "Natural upsell into domain provisioning and warmup consulting",
    ],
    cons_json: ["Email service providers frequently change spam algorithms"],
    verdict: "Exceptional micro-SaaS with clear ROI and passionate early adopter base.",
    trend_score: 91,
    tier: "free",
    created_at: new Date().toISOString(),
    seo_title: "Cold Email Deliverability Guard — Micro-SaaS Opportunity",
    meta_description:
      "Build an inbox placement and domain health monitoring SaaS for cold email agencies and SDR teams.",
    market_opportunity:
      "Over 50,000 agencies use cold email tools like Smartlead and Instantly, but losing a domain mid-campaign costs thousands in pipeline.",
    target_customer: "Outbound SDR leads, lead generation agency owners, and growth marketers.",
    how_you_make_money:
      "Tiered subscriptions: $49/mo (up to 10 inboxes) to $299/mo (up to 100 inboxes).",
    startup_cost: "$500 for seed server infrastructure and domain test inboxes.",
    income_potential: "$10,000 - $50,000 MRR.",
    competition_edge:
      "Instant webhooks into Slack & email when DMARC, SPF, or spam score degrades.",
    time_to_first_customer:
      "10 days via cold outreach and active Facebook/Slack sales communities.",
    getting_started_steps: [
      "Build a free lightweight web scanner checking SPF, DKIM, and DMARC records.",
      "Share the free tool in sales communities to capture emails.",
      "Launch automated daily inbox health notifications as the paid tier.",
    ],
    tools_needed: ["Node.js / Express", "PostgreSQL", "Cloudflare DNS API", "Stripe"],
  },
  {
    idea_id: "IDEA-00003",
    category_id: "CAT-04",
    category_name: "E-Commerce & Retail",
    category_slug: "e-commerce-retail",
    subcategory_id: "SUB-041",
    subcategory_name: "Functional Wellness",
    subcategory_slug: "functional-wellness",
    collection_id: null,
    status: "completed",
    focus_keyword: "mushroom coffee alternative",
    additional_keyword_1: "adaptogenic morning elixir",
    additional_keyword_2: "nootropic beverage",
    business_description:
      "A premium morning beverage mix combining lion's mane, cordyceps, and ceremonial cacao for jitter-free executive focus.",
    title: "Functional Mushroom Morning Elixir",
    slug: "niche-dtc-sustainable-coffee",
    summary:
      "Clean-label adaptogenic coffee replacement with organic lion's mane and raw Peruvian cacao designed for creative knowledge workers.",
    tags: ["DTC", "Wellness", "E-Commerce", "Nootropics"],
    pros_json: [
      "High repeat subscription rate (60%+ 90-day retention in functional beverage space)",
      "High gross margins (75%-80% on powders)",
      "Strong aesthetic appeal on visual social platforms",
    ],
    cons_json: [
      "Inventory capital required for initial batch run",
      "Customer acquisition costs can fluctuate on Meta/TikTok",
    ],
    verdict:
      "Strong recurring revenue model if built with distinctive branding and clear functional benefits.",
    trend_score: 84,
    tier: "free",
    created_at: new Date().toISOString(),
    seo_title: "Functional Mushroom Coffee Alternative — DTC Brand Blueprint",
    meta_description:
      "How to launch and scale a direct-to-consumer adaptogenic morning beverage brand.",
    market_opportunity:
      "Consumers are actively shifting away from jittery high-caffeine energy drinks toward steady, jitter-free cognitive nutrition.",
    target_customer:
      "Designers, software developers, and knowledge workers seeking sustained focus without afternoon crashes.",
    how_you_make_money:
      "$45/bag direct DTC sales with 15% off recurring 30-day monthly subscriptions.",
    startup_cost:
      "$3,000 - $6,000 for initial compliant contract manufacturing batch and packaging.",
    income_potential: "$25,000 - $100,000/month.",
    competition_edge:
      "Third-party lab tested beta-glucan percentages printed transparently on every pouch.",
    time_to_first_customer: "30 days via community sample drops and micro-influencer gifting.",
    getting_started_steps: [
      "Source certified organic mushroom extracts from verified US/EU suppliers.",
      "Design minimalist, compostable packaging with distinct brand voice.",
      "Send free 14-day sample kits to 50 tech podcast hosts and newsletter writers.",
    ],
    tools_needed: ["Shopify", "Klaviyo", "Recharge", "Canva / Figma"],
  },
];
