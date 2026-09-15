import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const guideDir = path.join(process.cwd(), "content", "guides");

const guides = [
  {
    slug: "pre-launch-checklist-for-startups",
    title: "Pre-Launch Checklist for Startups: Technical and Marketing Audit",
    focus: "pre-launch checklist for startups",
    supporting: ["startup launch preparation", "technical qa audit", "go to market hygiene"],
    longTail: [
      "how to prepare for a startup product launch",
      "what to check before launching a saas product",
    ],
    category: "Launch & Ops",
    takeaways: [
      "Verify SSL and canonical domains to prevent routing errors.",
      "Test complete payment flows using live $1 transactions.",
      "Audit mobile viewports for responsive design.",
    ],
  },
  {
    slug: "business-idea-validation-framework",
    title: "Business Idea Validation Framework: Test Before You Build",
    focus: "business idea validation framework",
    supporting: ["customer discovery interviews", "pre-selling strategies", "smoke test mvp"],
    longTail: [
      "how to validate a business idea without coding",
      "best frameworks for startup idea validation",
    ],
    category: "Validation",
    takeaways: [
      "Never ask if someone likes your idea; ask how they solve the problem today.",
      "Look for negative reviews on incumbent products to find unserved demand.",
      "True validation requires a deposit or signed LOI.",
    ],
  },
  {
    slug: "tam-sam-som-market-sizing",
    title: "TAM, SAM, and SOM Market Sizing: A Practical Guide",
    focus: "tam sam som market sizing",
    supporting: ["total addressable market", "bottom up market sizing", "startup market analysis"],
    longTail: ["how to calculate tam sam som for startups", "bottom up vs top down market sizing"],
    category: "Market Sizing",
    takeaways: [
      "Avoid top-down macro percentages; use bottom-up customer unit counts.",
      "SAM restricts your universe by geography and regulatory fit.",
      "SOM must align with your realistic sales capacity.",
    ],
  },
  {
    slug: "zero-investment-business-models",
    title: "Zero-Investment Business Models for Bootstrapped Founders",
    focus: "zero investment business models",
    supporting: ["bootstrapped business ideas", "productized services", "lean startup methodology"],
    longTail: [
      "how to start a business with zero investment",
      "best bootstrapped business models for beginners",
    ],
    category: "Bootstrapping",
    takeaways: [
      "Productize your existing skills into fixed-scope monthly retainers.",
      "Build reverse marketplaces by securing supply before demand.",
      "Use micro-consulting to fund software development.",
    ],
  },
  {
    slug: "product-market-fit-metrics",
    title: "Product-Market Fit Metrics: How to Measure True PMF",
    focus: "product market fit metrics",
    supporting: ["sean ellis test", "retention cohort curves", "startup growth KPIs"],
    longTail: [
      "how to measure product market fit",
      "quantitative metrics for early stage startups",
    ],
    category: "Growth & PMF",
    takeaways: [
      "Surpassing 40% 'very disappointed' on the Sean Ellis test is a strong PMF indicator.",
      "Healthy cohort retention curves flatten into a horizontal line over time.",
      "Do not scale paid acquisition until retention curves are flat.",
    ],
  },
  {
    slug: "b2b-saas-churn-reduction",
    title: "B2B SaaS Churn Reduction: High-Retention Strategies",
    focus: "b2b saas churn reduction",
    supporting: [
      "customer retention rate",
      "saas onboarding optimization",
      "sticky software features",
    ],
    longTail: [
      "how to reduce churn rate in b2b saas",
      "best strategies for saas customer retention",
    ],
    category: "Growth & PMF",
    takeaways: [
      "Analyze churn cohorts to identify specific drop-off points.",
      "Optimize user onboarding to ensure rapid time-to-value.",
      "Implement proactive customer success interventions.",
    ],
  },
  {
    slug: "product-led-growth-onboarding",
    title: "Product-Led Growth Onboarding: Driving Rapid Activation",
    focus: "product led growth onboarding",
    supporting: ["time to value", "user activation rate", "freemium SaaS models"],
    longTail: [
      "how to design PLG onboarding flows",
      "best practices for product led growth activation",
    ],
    category: "Growth & PMF",
    takeaways: [
      "Eliminate friction to reduce time-to-value (TTV).",
      "Use interactive checklists rather than passive product tours.",
      "Gate advanced features to drive upgrade conversions naturally.",
    ],
  },
  {
    slug: "micro-saas-pricing-models",
    title: "Micro SaaS Pricing Models: Structuring for Profitability",
    focus: "micro saas pricing models",
    supporting: ["value based pricing", "tiered subscription plans", "freemium vs trial"],
    longTail: ["how to price a micro saas product", "best SaaS pricing models for indie hackers"],
    category: "Validation",
    takeaways: [
      "Base your pricing on the value delivered, not the cost of development.",
      "Use a 3-tier structure to anchor prices and drive conversions.",
      "Avoid lifetime deals unless used strictly for early validation capital.",
    ],
  },
  {
    slug: "b2b-cold-email-lead-generation",
    title: "B2B Cold Email Lead Generation: High-Converting Frameworks",
    focus: "b2b cold email lead generation",
    supporting: [
      "outbound sales strategy",
      "email deliverability optimization",
      "cold outreach templates",
    ],
    longTail: [
      "how to write b2b cold emails that convert",
      "best tools for automated outbound lead generation",
    ],
    category: "Growth & PMF",
    takeaways: [
      "Warm up your sending domains to protect deliverability.",
      "Keep emails under 100 words and focus entirely on the prospect's pain.",
      "Use soft calls-to-action (CTAs) to gauge interest rather than demanding a call.",
    ],
  },
  {
    slug: "startup-equity-split-guide",
    title: "Startup Equity Split Guide: Avoiding Co-Founder Conflict",
    focus: "startup equity split guide",
    supporting: [
      "co-founder vesting schedules",
      "startup capitalization table",
      "dynamic equity models",
    ],
    longTail: [
      "how to split equity between startup founders",
      "standard vesting schedules for co-founders",
    ],
    category: "Launch & Ops",
    takeaways: [
      "Never split equity 50/50 without a vesting schedule.",
      "Implement a standard 4-year vest with a 1-year cliff.",
      "Base initial splits on future expected contributions, not past ideas.",
    ],
  },
  {
    slug: "freemium-to-paid-conversion",
    title: "Freemium to Paid Conversion: Strategies that Actually Work",
    focus: "freemium to paid conversion",
    supporting: ["product qualified leads", "feature gating", "saas upgrade friction"],
    longTail: [
      "how to increase freemium to paid conversion rate",
      "best strategies for converting free SaaS users",
    ],
    category: "Growth & PMF",
    takeaways: [
      "Align your paywall with a natural usage limit or friction point.",
      "Identify Product Qualified Leads (PQLs) based on high activity.",
      "Use time-sensitive discounts strategically upon reaching milestones.",
    ],
  },
  {
    slug: "go-to-market-strategy-b2b",
    title: "Go-to-Market Strategy for B2B Startups",
    focus: "go to market strategy b2b",
    supporting: ["ideal customer profile", "channel partner strategy", "b2b sales cycle"],
    longTail: [
      "how to build a go to market strategy for b2b saas",
      "go to market plan examples for startups",
    ],
    category: "Launch & Ops",
    takeaways: [
      "Define an ultra-specific Ideal Customer Profile (ICP).",
      "Match your acquisition channel to your pricing model.",
      "Leverage partner networks for rapid trust-building.",
    ],
  },
  {
    slug: "calculating-customer-lifetime-value",
    title: "Calculating Customer Lifetime Value (CLTV) in SaaS",
    focus: "calculating customer lifetime value",
    supporting: ["saas unit economics", "cltv to cac ratio", "churn rate impact"],
    longTail: [
      "how to calculate customer lifetime value in saas",
      "why cltv is the most important startup metric",
    ],
    category: "Market Sizing",
    takeaways: [
      "Calculate CLTV by dividing Average Revenue Per User (ARPU) by Customer Churn Rate.",
      "Aim for a CLTV:CAC ratio of at least 3:1.",
      "Focus on negative churn (expansion revenue) to drastically increase CLTV.",
    ],
  },
  {
    slug: "minimum-viable-product-development",
    title: "Minimum Viable Product Development: Ship Faster",
    focus: "minimum viable product development",
    supporting: ["lean startup principles", "no code prototyping", "mvp feature prioritization"],
    longTail: [
      "how to build a minimum viable product quickly",
      "what features to include in an mvp",
    ],
    category: "Validation",
    takeaways: [
      "Cut your initial feature list in half, then cut it in half again.",
      "Use no-code tools to validate mechanics before custom coding.",
      "An MVP should solve one specific problem exceptionally well.",
    ],
  },
  {
    slug: "early-stage-startup-hiring",
    title: "Early Stage Startup Hiring: Finding Founding Engineers",
    focus: "early stage startup hiring",
    supporting: [
      "founding team recruitment",
      "startup compensation structure",
      "evaluating startup fit",
    ],
    longTail: [
      "how to hire the first employees for a startup",
      "what to look for in a founding engineer",
    ],
    category: "Launch & Ops",
    takeaways: [
      "Hire for adaptability and agency, not just specialized technical skills.",
      "Use equity to align long-term incentives.",
      "Conduct working interviews or paid trial projects over whiteboard algorithms.",
    ],
  },
  {
    slug: "inbound-marketing-bootstrapped-startups",
    title: "Inbound Marketing for Bootstrapped Startups",
    focus: "inbound marketing bootstrapped startups",
    supporting: ["content marketing strategy", "startup seo tactics", "organic lead generation"],
    longTail: [
      "how to build an inbound marketing strategy for startups",
      "best seo practices for bootstrapped founders",
    ],
    category: "Growth & PMF",
    takeaways: [
      "Focus on high-intent, bottom-of-funnel keywords first.",
      "Build programmatic SEO assets like calculators and templates.",
      "Repurpose one core piece of content across five different platforms.",
    ],
  },
  {
    slug: "competitor-analysis-framework",
    title: "Competitor Analysis Framework for Founders",
    focus: "competitor analysis framework",
    supporting: [
      "startup competitive advantage",
      "feature matrix comparison",
      "market positioning",
    ],
    longTail: [
      "how to do competitor analysis for a startup",
      "best competitor analysis frameworks for b2b",
    ],
    category: "Market Sizing",
    takeaways: [
      "Focus on your competitors' negative reviews to find your wedge.",
      "Map positioning along an axis of complexity vs. price.",
      "Do not copy feature-for-feature; build contrasting strengths.",
    ],
  },
  {
    slug: "startup-metrics-dashboard",
    title: "Startup Metrics Dashboard: KPIs that Actually Matter",
    focus: "startup metrics dashboard",
    supporting: ["core startup kpis", "mrr and arr tracking", "burn rate calculation"],
    longTail: [
      "what metrics should a startup dashboard track",
      "how to build a kpi dashboard for early stage startups",
    ],
    category: "Growth & PMF",
    takeaways: [
      "Track North Star, MRR, Churn, and Burn Rate obsessively.",
      "Separate leading indicators (signups) from lagging indicators (revenue).",
      "Keep the dashboard visible to the entire team to drive alignment.",
    ],
  },
  {
    slug: "user-retention-strategies-saas",
    title: "User Retention Strategies for SaaS: Keeping Customers Forever",
    focus: "user retention strategies saas",
    supporting: ["customer success management", "in app engagement", "saas renewal tactics"],
    longTail: [
      "how to improve user retention in saas",
      "best customer retention strategies for software startups",
    ],
    category: "Growth & PMF",
    takeaways: [
      "Implement proactive lifecycle emails based on user behavior.",
      "Build community elements to increase switching costs.",
      "Conduct exit interviews for every churned account.",
    ],
  },
  {
    slug: "startup-cash-flow-management",
    title: "Startup Cash Flow Management: Extending Your Runway",
    focus: "startup cash flow management",
    supporting: [
      "startup runway calculation",
      "working capital optimization",
      "bootstrapped financial modeling",
    ],
    longTail: [
      "how to manage cash flow for a new startup",
      "best practices for startup financial management",
    ],
    category: "Launch & Ops",
    takeaways: [
      "Collect payments upfront annually to generate negative working capital.",
      "Separate your operational accounts from your tax/runway reserves.",
      "Review your P&L statement every single month without fail.",
    ],
  },
];

async function generateContent(guide) {
  const prompt = `You are a world-class startup operator and writer for BBI (Built By Operators). 
Your task is to write a highly actionable, dense, and tactical guide on the topic: "${guide.title}".

CONSTRAINTS:
- Length: Must be between 600 and 1000 words. (Do not output a summary or templated intro/outro, provide real meat).
- Tone: Extremely authoritative, operator-focused, zero-fluff, non-robotic. Do NOT use typical AI slop phrases like "In today's fast-paced digital world", "Understanding X is critical", or "By mastering A, B, and C". Just dive straight into the tactics, as if an experienced founder is talking to another founder. Vary sentence structure. Be punchy. Use real-world B2B/SaaS examples if possible.
- SEO Requirements: 
  - Use the exact focus keyword: "${guide.focus}"
  - Naturally include the supporting keywords: ${guide.supporting.map((s) => `"${s}"`).join(", ")}
  - You MUST use the following exact long-tail keywords as markdown H2 (##) headings: ${guide.longTail.map((l) => `"${l}"`).join(", ")}
- Formatting: Provide the output in raw Markdown. 
- Use H2s (##) for the long-tail keywords, and H3s (###) for subsections if needed. Use bullet points and bold text where appropriate to make it readable.
- DO NOT INCLUDE ANY FRONTMATTER.
- DO NOT INCLUDE A TITLE (H1). Start directly with the first paragraph of the guide.
- DO NOT output unrendered markdown checkboxes (like "[ ]").
- DO NOT output an intro/conclusion if it sounds like AI fluff. Make it all value.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error(`Error generating content for ${guide.slug}:`, error);
    return null;
  }
}

async function main() {
  for (let i = 0; i < guides.length; i++) {
    const guide = guides[i];
    console.log(`Generating content for [${i + 1}/20]: ${guide.slug}...`);

    let content = await generateContent(guide);
    if (!content) {
      console.log(`Failed to generate ${guide.slug}, skipping.`);
      continue;
    }

    const imageAltText = `BBI - Hero illustration for ${guide.title.replace(/"/g, "")} - Conceptual diagram showing the core principles of ${guide.focus}`;

    const description =
      content
        .substring(0, 150)
        .replace(/(\r\n|\n|\r)/gm, " ")
        .replace(/"/g, '\\"') + "...";

    // We will estimate word count by splitting by spaces (rough estimate)
    const wordCount = content.split(/\s+/).length;

    const mdContent = `---
title: "${guide.title.replace(/"/g, '\\"')}"
slug: "${guide.slug}"
description: "${description}"
keywords: ["${guide.focus}", ${guide.supporting.map((s) => `"${s}"`).join(", ")}]
word_count: ${wordCount}
status: "completed"
data_level: "ACTUAL"
published_date: "2026-09-14"
last_updated: "2026-09-14"
author: "BBI Research Team"
---
# ${guide.title}

<img src="/images/guides/${guide.slug}-hero.webp" alt="${imageAltText}" width="1200" height="630" fetchpriority="high" />

${content}
`;

    fs.writeFileSync(path.join(guideDir, `${guide.slug}.md`), mdContent);
    console.log(`Successfully wrote ${guide.slug}.md (${wordCount} words)`);

    // Slight delay to avoid aggressive rate limiting
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log("All guides generated successfully.");
}

main();
