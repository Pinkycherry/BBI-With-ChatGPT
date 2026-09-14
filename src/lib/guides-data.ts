import guideValidation from "../../content/guides/business-idea-validation.md?raw";
import guideTamSamSom from "../../content/guides/tam-sam-som-explained.md?raw";
import guideZeroInvest from "../../content/guides/zero-investment-models.md?raw";
import guidePmf from "../../content/guides/product-market-fit.md?raw";
import guidePreLaunch from "../../content/guides/pre-launch-checklist.md?raw";

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
  // Strip frontmatter if present
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
    slug: "business-idea-validation",
    title: "The Operator's Guide to Business Idea Validation",
    description:
      "A tactical step-by-step framework to validate customer demand, filter false positives, and secure pre-commitments before writing a single line of code.",
    category: "Validation",
    wordCount: 720,
    readTime: "4 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: [
      "business idea validation",
      "smoke test framework",
      "customer discovery interviews",
      "pre-selling",
    ],
    rawMarkdown: extractBody(guideValidation),
    keyTakeaways: [
      "Never ask someone if they like your idea; ask how they currently solve the problem and how much they spent in the past 90 days.",
      "Negative 2-star/3-star incumbent reviews and spreadsheet workarounds reveal real, unserved customer demand.",
      "True validation requires an empirical exchange of value: a deposit, signed LOI, or pre-order.",
    ],
  },
  {
    slug: "tam-sam-som-explained",
    title: "TAM, SAM, and SOM Explained: Practical Market Sizing",
    description:
      "How to calculate Total Addressable Market (TAM), Serviceable Addressable Market (SAM), and Serviceable Obtainable Market (SOM) using bottom-up models.",
    category: "Market Sizing",
    wordCount: 545,
    readTime: "3 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: [
      "tam sam som explained",
      "bottom up market sizing",
      "market sizing guide",
      "serviceable addressable market",
    ],
    rawMarkdown: extractBody(guideTamSamSom),
    keyTakeaways: [
      "Top-down macro percentages are rejected by seasoned operators; bottom-up customer unit counts are defensible.",
      "SAM defines your immediate addressable universe by geography, tech stack fit, and regulatory compliance.",
      "Check SOM feasibility: divide target revenue by ACV to confirm your sales team can realistically close that number of accounts.",
    ],
  },
  {
    slug: "zero-investment-models",
    title: "5 Zero-Investment Business Models for Bootstrapped Founders",
    description:
      "Battle-tested business structures that launch with under $200 in startup capital by monetizing existing skills, attention, or workflow integration.",
    category: "Bootstrapping",
    wordCount: 785,
    readTime: "5 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: [
      "zero investment business models",
      "bootstrapped business ideas",
      "productized services",
      "lean startup",
    ],
    rawMarkdown: extractBody(guideZeroInvest),
    keyTakeaways: [
      "Productized services package expert hours into standardized monthly deliverables with fixed scopes.",
      "Reverse marketplaces curate vetted specialist talent before aggregating clients, cutting marketplace cold-start risk.",
      "Micro-consulting done in-a-weekend bridges the gap between low-ticket templates and high-ticket enterprise setups.",
    ],
  },
  {
    slug: "product-market-fit",
    title: "How to Measure Product-Market Fit: Quantitative Benchmarks",
    description:
      "Cut through founder delusion with empirical PMF benchmarks: Sean Ellis 40% test, cohort retention curves, and organic demand metrics.",
    category: "Growth & PMF",
    wordCount: 640,
    readTime: "4 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: [
      "product market fit",
      "how to measure pmf",
      "sean ellis 40 percent test",
      "retention cohort curves",
    ],
    rawMarkdown: extractBody(guidePmf),
    keyTakeaways: [
      "Surpassing 40% 'very disappointed' on the Sean Ellis test strongly correlates with sustainable product-market fit.",
      "A healthy retention cohort flattens into a horizontal parallel line rather than dropping to zero over months.",
      "Do not accelerate paid marketing spend until organic referral loops and flat retention curves are achieved.",
    ],
  },
  {
    slug: "pre-launch-checklist",
    title: "The Zero-Day Pre-Launch Checklist for Modern Founders",
    description:
      "A comprehensive 25-point audit spanning technical infrastructure, payment funnels, analytics, and legal readiness before opening your doors.",
    category: "Launch & Ops",
    wordCount: 550,
    readTime: "3 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: [
      "startup launch checklist",
      "pre launch checklist",
      "product launch guide",
      "go to market checklist",
    ],
    rawMarkdown: extractBody(guidePreLaunch),
    keyTakeaways: [
      "Test complete end-to-end payment flows with live $1 test cards and verify webhook delivery.",
      "Set up DMARC, DKIM, and SPF records early to avoid transactional emails landing in customer spam.",
      "Audit mobile viewport widths and clean up zero-result states before driving public launch traffic.",
    ],
  },
];

export function getGuideBySlug(slug: string): StartupGuideMeta | undefined {
  return STARTUP_GUIDES.find((g) => g.slug === slug);
}
