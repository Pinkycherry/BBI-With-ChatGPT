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
  },
  {
    slug: "tam-sam-som-market-sizing",
    title: "TAM, SAM, and SOM Market Sizing: A Practical Guide",
    focus: "tam sam som market sizing",
    supporting: ["total addressable market", "bottom up market sizing", "startup market analysis"],
    longTail: ["how to calculate tam sam som for startups", "bottom up vs top down market sizing"],
    category: "Market Sizing",
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
  },
  {
    slug: "saas-pricing-models",
    title: "SaaS Pricing Models: Structuring for Profitability",
    focus: "saas pricing models",
    supporting: ["value based pricing", "tiered subscription plans", "freemium vs trial"],
    longTail: ["how to price a saas product", "best SaaS pricing models for b2b startups"],
    category: "Validation",
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
  },
];

const categoryImages = {
  "Market Sizing":
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=630",
  Validation:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&h=630",
  "Growth & PMF":
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&h=630",
  "Launch & Ops":
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200&h=630",
  Bootstrapping:
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200&h=630",
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function generateContentWithRetry(guide, retries = 5) {
  const prompt = `You are a world-class startup operator and writer for BBI (Built By Operators). 
Your task is to write a highly actionable, dense, and tactical guide on the topic: "${guide.title}".

CONSTRAINTS:
- Length: Must be exactly between 600 and 900 words. Provide real meat, tactics, and examples. Do not be generic.
- Tone: Extremely authoritative, operator-focused, zero-fluff, non-robotic. Dive straight into the tactics. Vary sentence structure. Be punchy. Use real-world B2B/SaaS examples.
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

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      console.error(`Attempt ${attempt} failed for ${guide.slug}:`, error.message);
      if (attempt === retries) return null;
      await delay(5000 * attempt); // exponential backoff
    }
  }
}

async function main() {
  for (let i = 0; i < guides.length; i++) {
    const guide = guides[i];
    console.log(`Generating content for [${i + 1}/20]: ${guide.slug}...`);

    let content = await generateContentWithRetry(guide);
    if (!content) {
      console.log(`Failed to generate ${guide.slug}, skipping.`);
      continue;
    }

    const imageAltText = `BBI - Hero illustration for ${guide.title.replace(/"/g, "")} - Conceptual diagram showing the core principles of ${guide.focus}`;
    const imageUrl = categoryImages[guide.category] || categoryImages["Validation"];

    const description =
      content
        .substring(0, 150)
        .replace(/(\r\n|\n|\r)/gm, " ")
        .replace(/"/g, '\\"') + "...";
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

![${imageAltText}](${imageUrl})

${content}
`;

    fs.writeFileSync(path.join(guideDir, `${guide.slug}.md`), mdContent);
    console.log(`Successfully wrote ${guide.slug}.md (${wordCount} words)`);

    // 4-second delay to avoid rate limiting
    await delay(4000);
  }

  console.log("All guides generated successfully.");
}

main();
