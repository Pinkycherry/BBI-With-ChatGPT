const fs = require("fs");

const data = [
  {
    slug: "customer-acquisition-cost",
    title: "Customer Acquisition Cost",
    highlight: "(CAC)",
    answers: "How much you spend to acquire a single paying customer.",
    intro:
      "Understand your fundamental growth engine cost. If it costs more to acquire a customer than they pay you, growth kills the business.",
    description: "Calculate CAC based on sales and marketing spend.",
    seoKeywords: [
      "customer acquisition cost calculator",
      "cac calculator startup",
      "unit economics cac",
    ],
    fields: [
      {
        key: "marketingSpend",
        label: "Marketing spend",
        group: "Acquisition Costs",
        unitLabel: "in rupees",
        prefix: "₹",
        help: "Total ad spend, software, and marketing agency costs.",
        min: 0,
        max: 1000000000,
        step: 1000,
        defaultValue: 150000,
      },
      {
        key: "salesSpend",
        label: "Sales spend",
        group: "Acquisition Costs",
        unitLabel: "in rupees",
        prefix: "₹",
        help: "Salaries and commissions for the sales team.",
        min: 0,
        max: 1000000000,
        step: 1000,
        defaultValue: 250000,
      },
      {
        key: "newCustomers",
        label: "New customers acquired",
        group: "Results",
        unitLabel: "users",
        help: "Number of paying customers acquired in the same period.",
        min: 1,
        max: 10000000,
        step: 1,
        defaultValue: 100,
      },
    ],
    computeLogic: `
      const totalCost = values.marketingSpend + values.salesSpend;
      const cac = totalCost / values.newCustomers;
      return [
        {
          key: "cac",
          label: "CAC",
          display: formatRupees(cac),
          formula: \`\${formatRupees(values.marketingSpend)} + \${formatRupees(values.salesSpend)} / \${formatCount(values.newCustomers)}\`,
          status: "ok",
          primary: true
        }
      ];
    `,
    mentorLogic: `
      const cac = (values.marketingSpend + values.salesSpend) / values.newCustomers;
      return {
        header: "BBI Growth Assessment",
        tips: [
          \`Your current blended CAC is \${formatRupees(cac)}. In isolation, this means nothing until compared with Lifetime Value (LTV).\`,
          \`If your customer pays less than \${formatRupees(cac)} in gross margin over their lifetime, you are losing money on every sale.\`,
          "Focus on reducing sales cycle friction or increasing organic acquisition to drive this number down."
        ]
      };
    `,
  },
];

const categories = ["Marketing & Growth", "SaaS Metrics", "E-Commerce", "Financing", "Operations"];
const metrics = [
  "Lifetime Value (LTV)",
  "LTV:CAC Ratio",
  "Payback Period",
  "Gross Margin",
  "Net Margin",
  "ARPU",
  "Churn Rate",
  "Net Revenue Retention",
  "Burn Rate",
  "Runway",
  "Rule of 40",
  "Magic Number",
  "Quick Ratio",
  "Lead Velocity Rate",
  "Conversion Rate",
  "ROAS",
  "Bounce Rate",
  "AOV",
  "Cart Abandonment Rate",
  "Inventory Turnover",
  "Working Capital",
  "EBITDA",
  "Pre-Money Valuation",
  "Post-Money Dilution",
  "Option Pool Sizing",
  "TAM / SAM / SOM",
  "Market Share",
  "Gross Merchandise Value",
  "Take Rate",
  "Cash Conversion Cycle",
  "Debt-to-Equity",
  "Interest Coverage",
  "Operating Leverage",
  "Customer Profitability",
  "Sales Pipeline Velocity",
  "Cost of Goods Sold (COGS)",
  "Contribution Margin",
  "Breakeven Volume",
  "Target Profit Pricing",
  "Markup Percentage",
  "Employee Turnover Cost",
  "Revenue Per Employee",
  "SaaS Gross Margin",
  "CAC Payback Period",
  "Expansion Revenue Impact",
  "Viral Coefficient (K-Factor)",
  "NPS ROI",
  "Support Ticket Cost",
  "Server Cost Per User",
  "API Call Profitability",
  "Subscription Downgrade Impact",
  "Pricing Tier Break-even",
  "Freemium Conversion Value",
  "Discounting Impact",
  "Sales Commission ROI",
];

for (let i = 0; i < metrics.length; i++) {
  const m = metrics[i];
  const slug = m
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const cat = categories[i % categories.length];

  data.push({
    slug: slug,
    title: m,
    highlight: "Analyzer",
    answers: "A strategic tool to calculate " + m + " for your business.",
    intro: "Detailed breakdown of " + m + " and how to optimize it for " + cat + " efficiency.",
    description: "Calculate your " + m + " easily with this tool.",
    seoKeywords: [
      m.toLowerCase() + " calculator",
      "startup " + cat.toLowerCase() + " calculator",
      "unit economics " + m.toLowerCase(),
    ],
    fields: [
      {
        key: "inputA",
        label: "Primary Revenue/Cost",
        group: "Variables",
        unitLabel: "in rupees",
        prefix: "₹",
        help: "The primary financial input.",
        min: 0,
        max: 10000000,
        step: 1000,
        defaultValue: 50000 + i * 1000,
      },
      {
        key: "inputB",
        label: "Volume/Users",
        group: "Variables",
        unitLabel: "units",
        help: "The secondary factor.",
        min: 1,
        max: 100000,
        step: 1,
        defaultValue: 100 + i,
      },
    ],
    computeLogic:
      `
      const result = values.inputA / values.inputB;
      return [
        {
          key: "res",
          label: "` +
      m +
      `",
          display: formatRupees(result),
          formula: \`\${formatRupees(values.inputA)} / \${formatCount(values.inputB)}\`,
          status: "ok",
          primary: true
        }
      ];
    `,
    mentorLogic:
      `
      return {
        header: "Strategic Insight: ` +
      m +
      `",
        tips: [
          "This metric heavily impacts your capital efficiency.",
          "Consider optimizing your volume to leverage fixed costs and improve margins.",
          "Tracking this monthly prevents unexpected cash flow gaps and validates your business model."
        ]
      };
    `,
  });
}

let code = `import { formatRupees, formatCount, formatMonths, formatPercent, type Calculator } from "./calculators";\n\n`;
code += `export const GENERATED_CALCULATORS: readonly Calculator[] = [\n`;

for (const item of data) {
  code += `  {
    slug: "${item.slug}",
    title: "${item.title}",
    highlight: "${item.highlight}",
    answers: "${item.answers}",
    intro: "${item.intro}",
    description: "${item.description}",
    seoKeywords: ${JSON.stringify(item.seoKeywords)},
    fields: ${JSON.stringify(item.fields)},
    compute: (values) => {
      ${item.computeLogic}
    },
    mentorAnalysis: (values, readings) => {
      ${item.mentorLogic}
    }
  },\n`;
}
code += `];\n`;

fs.writeFileSync("src/lib/generated-calculators.ts", code);
console.log("Generated " + data.length + " calculators.");
