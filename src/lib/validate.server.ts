import { db } from "./ideas.functions";
import { toIdeaDetail, type IdeaDetail, type IdeaRow } from "./ideas-shared";
import type { ValidatePlatform } from "./validate-shared";

/**
 * SINGLE SOURCE OF TRUTH for the Validate-for-Free prompt (PROJECT_BRIEF.md
 * Section 8). One template, substituted per idea from the real record — never
 * hand-written per idea, never rendered as visible or copyable text in our
 * own UI. The user spends one of their own daily uses on their own AI
 * account running this, so it asks for a complete structured report, not a
 * one-liner.
 */
function buildValidationPrompt(idea: IdeaDetail, extraContext?: string): string {
  const lines = [
    "Act as a blunt, operator-grade startup analyst. Produce a complete, structured, markdown-formatted validation report for the business idea below. Be specific to this idea and its actual market — no generic startup platitudes, no hedging, no marketing language.",
    "",
    `Idea: ${idea.title}`,
    `Category: ${idea.categoryName} / ${idea.subcategoryName}`,
    `Business description: ${idea.businessDescription || idea.summary}`,
  ];
  if (idea.pros.length > 0) lines.push(`Claimed strengths on file: ${idea.pros.join("; ")}`);
  if (idea.cons.length > 0) lines.push(`Claimed risks on file: ${idea.cons.join("; ")}`);
  const trimmedContext = extraContext?.trim();
  if (trimmedContext) {
    lines.push(
      "",
      "The user added this context themselves before sending — it's real signal, not filler. Weave it into whichever sections above it actually bears on, rather than tacking it on as an afterthought:",
      trimmedContext,
    );
  }
  lines.push(
    "",
    "I need you to thoroughly research and fill out the following specific aspects of this business idea to validate it completely:",
    "",
    "1. Why this still works right now (Market Opportunity)",
    "2. Who actually opens their wallet (Target Customer)",
    "3. Exactly how the cash arrives (How You Make Money)",
    "4. Why you can beat the obvious version (Competition Edge)",
    "5. What you really need to begin (Startup Cost)",
    "6. What the money looks like early vs later (Income Potential)",
    "7. First moves that actually get you paid (Getting Started Steps)",
    "8. The real tools (nothing fancy) (Tools Needed)",
    "9. How long until the first real payment (Time to First Customer)",
    "10. Straight answers to the real doubts (FAQs)",
    "",
    "If your platform can generate an accompanying chart, diagram or other visual (market sizing, a roadmap timeline, competitive positioning), generate one alongside the written report rather than plain paragraphs only."
  );
  return lines.join("\n");
}

function platformUrl(platform: ValidatePlatform, prompt: string): string {
  const encoded = encodeURIComponent(prompt);
  if (platform === "claude") return `https://claude.ai/new?q=${encoded}`;
  if (platform === "gemini") return `https://gemini.google.com/app?q=${encoded}`;
  if (platform === "grok") return `https://grok.com/?text=${encoded}`;
  if (platform === "chatgpt") return `https://chatgpt.com/?q=${encoded}`;
  return `https://www.perplexity.ai/search?q=${encoded}`;
}

export async function buildValidateUrl(
  platform: ValidatePlatform,
  slug: string,
  extraContext?: string,
): Promise<string> {
  const { data, error } = await db().from("ideas").select("*").eq("slug", slug).maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("That idea does not exist in the library.");
  const idea = toIdeaDetail(data as IdeaRow);
  return platformUrl(platform, buildValidationPrompt(idea, extraContext));
}
