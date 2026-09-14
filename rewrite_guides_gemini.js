import fs from "fs";
import path from "path";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});
const guideDir = path.join(process.cwd(), "content", "guides");

const mdFiles = fs.readdirSync(guideDir).filter(f => f.endsWith('.md'));

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function rewriteGuide(file) {
  const content = fs.readFileSync(path.join(guideDir, file), "utf-8");
  const slug = file.replace('.md', '');
  
  let title = "", description = "", keywords = [];
  const lines = content.split('\n');
  let inFrontmatter = false;
  for (let line of lines) {
    if (line.trim() === "---") {
      inFrontmatter = !inFrontmatter;
      continue;
    }
    if (inFrontmatter) {
      if (line.startsWith("title:")) title = line.split("title:")[1].trim().replace(/^"|"$/g, '');
      if (line.startsWith("description:")) description = line.split("description:")[1].trim().replace(/^"|"$/g, '');
      if (line.startsWith("keywords:")) {
        const kwString = line.split("keywords:")[1].trim().replace(/^\[|\]$/g, '');
        keywords = kwString.split(",").map(k => k.trim().replace(/^"|"$/g, ''));
      }
    }
  }

  const prompt = `
You are an elite startup operator and BBI research analyst.
Write a highly actionable, unique, tactical 800-word guide on the following topic.
Title: ${title}
Description: ${description}
Keywords: ${keywords.join(', ')}

Guidelines:
1. Write in a sophisticated, authoritative, and direct tone (no generic fluff, no "In today's fast-paced digital world").
2. Do not use generic ChatGPT structures like "Understanding X is critical" or "Conclusion". Use punchy, highly specific H2 and H3 headings.
3. Include real-world tactical advice, metrics, formulas, or step-by-step methodologies. Focus on SEO but make it read naturally for expert operators.
4. Output ONLY the markdown body. Do not include frontmatter. Do not include an H1 title (it will be added). Do not include an image tag.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });

    let newBody = response.text;
    
    // Calculate new word count
    const wordCount = newBody.split(/\s+/).length + 50;

    const newMarkdown = `---
title: "${title.replace(/"/g, '\\"')}"
slug: "${slug}"
description: "${description.replace(/"/g, '\\"')}"
keywords: [${keywords.map(k => `"${k}"`).join(', ')}]
word_count: ${wordCount}
status: "completed"
data_level: "ACTUAL"
published_date: "2026-09-14"
last_updated: "2026-09-14"
author: "BBI Research Team"
---

# ${title}

![BBI - Hero illustration for ${title.replace(/"/g, '')}](https://picsum.photos/seed/${slug}/1200/630)

${newBody}
`;

    fs.writeFileSync(path.join(guideDir, file), newMarkdown);
    console.log(`Successfully rewrote ${file}`);
  } catch (error) {
    console.error(`Failed to rewrite ${file}:`, error.message);
  }
}

async function run() {
  for (const file of mdFiles) {
    console.log(`Processing ${file}...`);
    await rewriteGuide(file);
    await delay(3000); // Wait 3s between calls to avoid rate limits
  }
  console.log("All guides rewritten!");
}

run();
