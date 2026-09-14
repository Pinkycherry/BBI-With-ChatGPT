import guide0 from "../../content/guides/b2b-lead-generation.md?raw";\nimport guide1 from "../../content/guides/b2b-sales-funnel.md?raw";\nimport guide2 from "../../content/guides/bootstrapping-vs-funding.md?raw";\nimport guide3 from "../../content/guides/business-idea-validation.md?raw";\nimport guide4 from "../../content/guides/churn-rate-reduction.md?raw";\nimport guide5 from "../../content/guides/competitor-analysis-framework.md?raw";\nimport guide6 from "../../content/guides/customer-acquisition-cost.md?raw";\nimport guide7 from "../../content/guides/customer-lifetime-value.md?raw";\nimport guide8 from "../../content/guides/freemium-conversion-rate.md?raw";\nimport guide9 from "../../content/guides/go-to-market-strategy.md?raw";\nimport guide10 from "../../content/guides/inbound-marketing-strategy.md?raw";\nimport guide11 from "../../content/guides/minimum-viable-product.md?raw";\nimport guide12 from "../../content/guides/pre-launch-checklist.md?raw";\nimport guide13 from "../../content/guides/product-led-growth.md?raw";\nimport guide14 from "../../content/guides/product-market-fit.md?raw";\nimport guide15 from "../../content/guides/saas-onboarding-flow.md?raw";\nimport guide16 from "../../content/guides/saas-pricing-models.md?raw";\nimport guide17 from "../../content/guides/startup-cash-flow-management.md?raw";\nimport guide18 from "../../content/guides/startup-equity-split.md?raw";\nimport guide19 from "../../content/guides/startup-hiring-process.md?raw";\nimport guide20 from "../../content/guides/startup-metrics-dashboard.md?raw";\nimport guide21 from "../../content/guides/startup-pitch-deck.md?raw";\nimport guide22 from "../../content/guides/tam-sam-som-explained.md?raw";\nimport guide23 from "../../content/guides/user-retention-strategies.md?raw";\nimport guide24 from "../../content/guides/zero-investment-models.md?raw";

export type StartupGuideMeta = {
  slug: string;
  title: string;
  description: string;
  category: "Validation" | "Market Sizing" | "Bootstrapping" | "Growth & PMF" | "Launch & Ops";
  wordCount: number;
  readTime: string;
  publishedDate: string;
  author: string;
  keywords: string[];
  rawMarkdown: string;
  keyTakeaways: string[];
};

function extractBody(markdown: string): string {
  if (markdown.startsWith("---")) {
    const secondFence = markdown.indexOf("---", 3);
    if (secondFence !== -1) {
      return markdown.slice(secondFence + 3).trim();
    }
  }
  return markdown.trim();
}

export const STARTUP_GUIDES: StartupGuideMeta[] = [
  {
    slug: "b2b-lead-generation",
    title: "Guide: b2b-lead-generation",
    description: "A comprehensive guide on b2b lead generation.",
    category: "Validation", // Defaulting for now
    wordCount: 600,
    readTime: "3 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: ["b2b lead generation", "startup guide", "business guide"],
    rawMarkdown: extractBody(guide0),
    keyTakeaways: ["Takeaway 1", "Takeaway 2"],
  },\n  {
    slug: "b2b-sales-funnel",
    title: "Guide: b2b-sales-funnel",
    description: "A comprehensive guide on b2b sales funnel.",
    category: "Validation", // Defaulting for now
    wordCount: 600,
    readTime: "3 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: ["b2b sales funnel", "startup guide", "business guide"],
    rawMarkdown: extractBody(guide1),
    keyTakeaways: ["Takeaway 1", "Takeaway 2"],
  },\n  {
    slug: "bootstrapping-vs-funding",
    title: "Guide: bootstrapping-vs-funding",
    description: "A comprehensive guide on bootstrapping vs funding.",
    category: "Validation", // Defaulting for now
    wordCount: 600,
    readTime: "3 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: ["bootstrapping vs funding", "startup guide", "business guide"],
    rawMarkdown: extractBody(guide2),
    keyTakeaways: ["Takeaway 1", "Takeaway 2"],
  },\n  {
    slug: "business-idea-validation",
    title: "The Operator's Guide to Business Idea Validation",
    description: "A tactical step-by-step framework to validate customer demand, filter false positives, and secure pre-commitments before writing a single line of code.",
    category: "Validation", // Defaulting for now
    wordCount: 600,
    readTime: "3 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: ["business idea validation", "how to validate a business idea", "smoke test framework", "customer discovery interviews", "pre-selling"],
    rawMarkdown: extractBody(guide3),
    keyTakeaways: ["Takeaway 1", "Takeaway 2"],
  },\n  {
    slug: "churn-rate-reduction",
    title: "Guide: churn-rate-reduction",
    description: "A comprehensive guide on churn rate reduction.",
    category: "Validation", // Defaulting for now
    wordCount: 600,
    readTime: "3 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: ["churn rate reduction", "startup guide", "business guide"],
    rawMarkdown: extractBody(guide4),
    keyTakeaways: ["Takeaway 1", "Takeaway 2"],
  },\n  {
    slug: "competitor-analysis-framework",
    title: "Guide: competitor-analysis-framework",
    description: "A comprehensive guide on competitor analysis framework.",
    category: "Validation", // Defaulting for now
    wordCount: 600,
    readTime: "3 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: ["competitor analysis framework", "startup guide", "business guide"],
    rawMarkdown: extractBody(guide5),
    keyTakeaways: ["Takeaway 1", "Takeaway 2"],
  },\n  {
    slug: "customer-acquisition-cost",
    title: "Guide: customer-acquisition-cost",
    description: "A comprehensive guide on customer acquisition cost.",
    category: "Validation", // Defaulting for now
    wordCount: 600,
    readTime: "3 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: ["customer acquisition cost", "startup guide", "business guide"],
    rawMarkdown: extractBody(guide6),
    keyTakeaways: ["Takeaway 1", "Takeaway 2"],
  },\n  {
    slug: "customer-lifetime-value",
    title: "Guide: customer-lifetime-value",
    description: "A comprehensive guide on customer lifetime value.",
    category: "Validation", // Defaulting for now
    wordCount: 600,
    readTime: "3 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: ["customer lifetime value", "startup guide", "business guide"],
    rawMarkdown: extractBody(guide7),
    keyTakeaways: ["Takeaway 1", "Takeaway 2"],
  },\n  {
    slug: "freemium-conversion-rate",
    title: "Guide: freemium-conversion-rate",
    description: "A comprehensive guide on freemium conversion rate.",
    category: "Validation", // Defaulting for now
    wordCount: 600,
    readTime: "3 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: ["freemium conversion rate", "startup guide", "business guide"],
    rawMarkdown: extractBody(guide8),
    keyTakeaways: ["Takeaway 1", "Takeaway 2"],
  },\n  {
    slug: "go-to-market-strategy",
    title: "Guide: go-to-market-strategy",
    description: "A comprehensive guide on go to market strategy.",
    category: "Validation", // Defaulting for now
    wordCount: 600,
    readTime: "3 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: ["go to market strategy", "startup guide", "business guide"],
    rawMarkdown: extractBody(guide9),
    keyTakeaways: ["Takeaway 1", "Takeaway 2"],
  },\n  {
    slug: "inbound-marketing-strategy",
    title: "Guide: inbound-marketing-strategy",
    description: "A comprehensive guide on inbound marketing strategy.",
    category: "Validation", // Defaulting for now
    wordCount: 600,
    readTime: "3 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: ["inbound marketing strategy", "startup guide", "business guide"],
    rawMarkdown: extractBody(guide10),
    keyTakeaways: ["Takeaway 1", "Takeaway 2"],
  },\n  {
    slug: "minimum-viable-product",
    title: "Guide: minimum-viable-product",
    description: "A comprehensive guide on minimum viable product.",
    category: "Validation", // Defaulting for now
    wordCount: 600,
    readTime: "3 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: ["minimum viable product", "startup guide", "business guide"],
    rawMarkdown: extractBody(guide11),
    keyTakeaways: ["Takeaway 1", "Takeaway 2"],
  },\n  {
    slug: "pre-launch-checklist",
    title: "The Zero-Defect Pre-Launch Checklist for Startup Founders",
    description: "A comprehensive 25-point operational checklist covering analytics, payment gateways, technical QA, and distribution hygiene before public launch.",
    category: "Validation", // Defaulting for now
    wordCount: 600,
    readTime: "3 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: ["startup launch checklist", "pre launch checklist", "product launch guide", "how to launch a startup", "go to market checklist"],
    rawMarkdown: extractBody(guide12),
    keyTakeaways: ["Takeaway 1", "Takeaway 2"],
  },\n  {
    slug: "product-led-growth",
    title: "Guide: product-led-growth",
    description: "A comprehensive guide on product led growth.",
    category: "Validation", // Defaulting for now
    wordCount: 600,
    readTime: "3 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: ["product led growth", "startup guide", "business guide"],
    rawMarkdown: extractBody(guide13),
    keyTakeaways: ["Takeaway 1", "Takeaway 2"],
  },\n  {
    slug: "product-market-fit",
    title: "Product-Market Fit: Quantitative Metrics and the Road to PMF",
    description: "How to identify, measure, and validate true Product-Market Fit using retention cohort curves, the Sean Ellis survey benchmark, and word-of-mouth coefficients.",
    category: "Validation", // Defaulting for now
    wordCount: 600,
    readTime: "3 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: ["product market fit", "how to measure pmf", "sean ellis 40 percent test", "retention cohort curves", "startup growth metrics"],
    rawMarkdown: extractBody(guide14),
    keyTakeaways: ["Takeaway 1", "Takeaway 2"],
  },\n  {
    slug: "saas-onboarding-flow",
    title: "Guide: saas-onboarding-flow",
    description: "A comprehensive guide on saas onboarding flow.",
    category: "Validation", // Defaulting for now
    wordCount: 600,
    readTime: "3 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: ["saas onboarding flow", "startup guide", "business guide"],
    rawMarkdown: extractBody(guide15),
    keyTakeaways: ["Takeaway 1", "Takeaway 2"],
  },\n  {
    slug: "saas-pricing-models",
    title: "Guide: saas-pricing-models",
    description: "A comprehensive guide on saas pricing models.",
    category: "Validation", // Defaulting for now
    wordCount: 600,
    readTime: "3 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: ["saas pricing models", "startup guide", "business guide"],
    rawMarkdown: extractBody(guide16),
    keyTakeaways: ["Takeaway 1", "Takeaway 2"],
  },\n  {
    slug: "startup-cash-flow-management",
    title: "Guide: startup-cash-flow-management",
    description: "A comprehensive guide on startup cash flow management.",
    category: "Validation", // Defaulting for now
    wordCount: 600,
    readTime: "3 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: ["startup cash flow management", "startup guide", "business guide"],
    rawMarkdown: extractBody(guide17),
    keyTakeaways: ["Takeaway 1", "Takeaway 2"],
  },\n  {
    slug: "startup-equity-split",
    title: "Guide: startup-equity-split",
    description: "A comprehensive guide on startup equity split.",
    category: "Validation", // Defaulting for now
    wordCount: 600,
    readTime: "3 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: ["startup equity split", "startup guide", "business guide"],
    rawMarkdown: extractBody(guide18),
    keyTakeaways: ["Takeaway 1", "Takeaway 2"],
  },\n  {
    slug: "startup-hiring-process",
    title: "Guide: startup-hiring-process",
    description: "A comprehensive guide on startup hiring process.",
    category: "Validation", // Defaulting for now
    wordCount: 600,
    readTime: "3 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: ["startup hiring process", "startup guide", "business guide"],
    rawMarkdown: extractBody(guide19),
    keyTakeaways: ["Takeaway 1", "Takeaway 2"],
  },\n  {
    slug: "startup-metrics-dashboard",
    title: "Guide: startup-metrics-dashboard",
    description: "A comprehensive guide on startup metrics dashboard.",
    category: "Validation", // Defaulting for now
    wordCount: 600,
    readTime: "3 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: ["startup metrics dashboard", "startup guide", "business guide"],
    rawMarkdown: extractBody(guide20),
    keyTakeaways: ["Takeaway 1", "Takeaway 2"],
  },\n  {
    slug: "startup-pitch-deck",
    title: "Guide: startup-pitch-deck",
    description: "A comprehensive guide on startup pitch deck.",
    category: "Validation", // Defaulting for now
    wordCount: 600,
    readTime: "3 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: ["startup pitch deck", "startup guide", "business guide"],
    rawMarkdown: extractBody(guide21),
    keyTakeaways: ["Takeaway 1", "Takeaway 2"],
  },\n  {
    slug: "tam-sam-som-explained",
    title: "TAM, SAM, and SOM Explained: Practical Market Sizing for Founders",
    description: "How to calculate Total Addressable Market (TAM), Serviceable Addressable Market (SAM), and Serviceable Obtainable Market (SOM) using bottom-up models that withstand investor scrutiny.",
    category: "Validation", // Defaulting for now
    wordCount: 600,
    readTime: "3 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: ["tam sam som explained", "how to calculate tam", "market sizing guide", "bottom up market sizing", "serviceable addressable market"],
    rawMarkdown: extractBody(guide22),
    keyTakeaways: ["Takeaway 1", "Takeaway 2"],
  },\n  {
    slug: "user-retention-strategies",
    title: "Guide: user-retention-strategies",
    description: "A comprehensive guide on user retention strategies.",
    category: "Validation", // Defaulting for now
    wordCount: 600,
    readTime: "3 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: ["user retention strategies", "startup guide", "business guide"],
    rawMarkdown: extractBody(guide23),
    keyTakeaways: ["Takeaway 1", "Takeaway 2"],
  },\n  {
    slug: "zero-investment-models",
    title: "Zero-Investment Business Models: The Bootstrapper's Playbook",
    description: "How to launch, capitalize, and scale cash-generative businesses with near-zero upfront capital through service-first mechanics and digital leverage.",
    category: "Validation", // Defaulting for now
    wordCount: 600,
    readTime: "3 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: ["zero investment business models", "bootstrapped business ideas", "service to product model", "productized services", "lean startup"],
    rawMarkdown: extractBody(guide24),
    keyTakeaways: ["Takeaway 1", "Takeaway 2"],
  }
];

export function getGuideBySlug(slug: string): StartupGuideMeta | undefined {
  return STARTUP_GUIDES.find((g) => g.slug === slug);
}
