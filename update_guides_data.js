import fs from "fs";
import path from "path";

const guideDir = path.join(process.cwd(), "content", "guides");
const mdFiles = fs.readdirSync(guideDir).filter((f) => f.endsWith(".md"));

let imports = [];
let objects = [];

mdFiles.forEach((file, i) => {
  const varName = "guide" + i;
  const slug = file.replace(".md", "");
  imports.push(`import ${varName} from "../../content/guides/${file}?raw";`);

  // Read frontmatter to get title, description, category, keywords, wordCount, etc.
  const content = fs.readFileSync(path.join(guideDir, file), "utf-8");

  let title = "",
    description = "",
    category = "Launch & Ops",
    wordCount = 750;
  let keywords = [];

  const lines = content.split("\n");
  let inFrontmatter = false;
  for (let line of lines) {
    if (line.trim() === "---") {
      inFrontmatter = !inFrontmatter;
      continue;
    }
    if (inFrontmatter) {
      if (line.startsWith("title:")) title = line.split("title:")[1].trim().replace(/^"|"$/g, "");
      if (line.startsWith("description:"))
        description = line.split("description:")[1].trim().replace(/^"|"$/g, "");
      if (line.startsWith("word_count:")) wordCount = parseInt(line.split("word_count:")[1].trim());
      if (line.startsWith("keywords:")) {
        const kwString = line
          .split("keywords:")[1]
          .trim()
          .replace(/^\[|\]$/g, "");
        keywords = kwString.split(",").map((k) => k.trim().replace(/^"|"$/g, ""));
      }
    }
  }

  // Derive category loosely based on keywords or default
  if (slug.includes("pricing") || slug.includes("validation") || slug.includes("mvp"))
    category = "Validation";
  if (
    slug.includes("market") ||
    slug.includes("tam") ||
    slug.includes("competitor") ||
    slug.includes("cltv") ||
    slug.includes("lifetime")
  )
    category = "Market Sizing";
  if (slug.includes("zero") || slug.includes("bootstrapped")) category = "Bootstrapping";
  if (
    slug.includes("growth") ||
    slug.includes("churn") ||
    slug.includes("retention") ||
    slug.includes("metrics") ||
    slug.includes("email")
  )
    category = "Growth & PMF";
  if (
    slug.includes("cash") ||
    slug.includes("hiring") ||
    slug.includes("equity") ||
    slug.includes("pre-launch") ||
    slug.includes("strategy")
  )
    category = "Launch & Ops";

  objects.push(`  {
    slug: "${slug}",
    title: "${title.replace(/"/g, '\\"')}",
    description: "${description.replace(/"/g, '\\"')}",
    category: "${category}",
    wordCount: ${wordCount},
    readTime: "5 min read",
    publishedDate: "2026-09-14",
    author: "BBI Research Team",
    keywords: [${keywords.map((k) => `"${k}"`).join(", ")}],
    rawMarkdown: extractBody(${varName}),
    keyTakeaways: ["${keywords[0] || "Strategy"}", "Execution", "Optimization"],
  }`);
});

const output = `${imports.join("\n")}

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

function extractBody(markdown: string) {
  if (markdown.startsWith("---")) {
    const secondFence = markdown.indexOf("---", 3);
    if (secondFence !== -1) {
      return markdown.slice(secondFence + 3).trim();
    }
  }
  return markdown.trim();
}

export const STARTUP_GUIDES: StartupGuideMeta[] = [
${objects.join(",\n")}
];

export function getGuideBySlug(slug: string): StartupGuideMeta | undefined {
  return STARTUP_GUIDES.find((g) => g.slug === slug);
}
`;

fs.writeFileSync(path.join(process.cwd(), "src", "lib", "guides-data.ts"), output);
console.log("Successfully updated guides-data.ts");
