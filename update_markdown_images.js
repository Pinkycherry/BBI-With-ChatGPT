import fs from "fs";
import path from "path";

const guidesDir = path.join(process.cwd(), "content", "guides");

const generatePrompt = (slug) => {
  const base =
    "Cinematic, emotional documentary photography shot, highly realistic human skin texture, dramatic soft lighting, 35mm lens, depth of field. ";

  const prompts = {
    "b2b-cold-email-lead-generation":
      "A focused diverse startup founder typing on a laptop in a dimly lit, cozy home office, expressing determination and hope.",
    "b2b-saas-churn-reduction":
      "A stressed but resilient customer success manager talking empathetically on a headset in a modern office, warm lighting.",
    "business-idea-validation-framework":
      "Two passionate co-founders sketching ideas on a glass whiteboard, deep in thought, vibrant startup energy.",
    "calculating-customer-lifetime-value":
      "A thoughtful entrepreneur analyzing data on a screen, screen glow illuminating their face, intense focus.",
    "competitor-analysis-framework":
      "A determined business strategist looking at multiple monitors in a dark room, cinematic hacker aesthetic.",
    "early-stage-startup-hiring":
      "A warm, emotional interview between two people at a sunlit coffee shop table, building trust and human connection.",
    "freemium-to-paid-conversion":
      "A joyful user experiencing an aha moment while looking at their phone, bright and uplifting atmosphere.",
    "go-to-market-strategy-b2b":
      "A confident leader presenting a vision to a small dedicated team in a rustic brick-wall office, inspiring and dynamic.",
    "inbound-marketing-bootstrapped-startups":
      "A creative writer deeply immersed in typing on a vintage keyboard, warm coffee cup nearby, soft morning light.",
    "minimum-viable-product-development":
      "Engineers working late into the night, coding intensely, camaraderie and focus, cinematic neon glow.",
    "pre-launch-checklist-for-startups":
      "A team looking nervously and excitedly at a launch button on a laptop, high stakes emotional moment.",
    "product-led-growth-onboarding":
      "A friendly, welcoming hand gesture guiding someone, metaphorical representation of user onboarding, warm colors.",
    "product-market-fit-metrics":
      "A relieved and happy founder seeing positive metrics, hands raised in a subtle victory gesture, natural sunlight.",
    "saas-pricing-models":
      "A contemplative pricing strategist holding a pen, deep in thought looking out a window at a city skyline.",
    "startup-cash-flow-management":
      "An anxious but focused founder looking at financial papers on a wooden desk, late night, realistic emotional depth.",
    "startup-equity-split-guide":
      "Two founders shaking hands firmly across a table, mutual respect and trust, warm cinematic lighting.",
    "startup-metrics-dashboard":
      "A person pointing at a screen, analyzing growth, professional and sharp, shallow depth of field.",
    "tam-sam-som-market-sizing":
      "A visionary founder looking thoughtfully at a large world map, planning global expansion, inspiring and grand.",
    "user-retention-strategies-saas":
      "A customer smiling while using an app, feeling supported and valued, genuine human emotion.",
    "zero-investment-business-models":
      "A determined bootstrapped founder working from a humble kitchen table, gritty, authentic, and inspiring.",
  };

  return (
    base +
    (prompts[slug] ||
      "A focused entrepreneur working passionately on a laptop in a modern aesthetic environment, inspiring emotional journey.")
  );
};

const processGuides = () => {
  const files = fs.readdirSync(guidesDir).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const slug = file.replace(".md", "");
    const filepath = path.join(guidesDir, file);
    let content = fs.readFileSync(filepath, "utf-8");

    const titleMatch = content.match(/title:\s*"([^"]+)"/);
    const title = titleMatch ? titleMatch[1] : slug;

    const prompt = generatePrompt(slug);
    const randomSeed = Math.floor(Math.random() * 1000000);
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1200&height=630&nologo=true&seed=${randomSeed}`;

    const altText = `${title} - Emotional cinematic photograph of startup journey`;
    const imageDescription = `Featured hero image for ${title}`;

    // Replace any existing markdown image with the new Pollinations dynamic URL
    content = content.replace(/!\[.*?\]\([^)]+\)/, `![${altText}](${url} "${imageDescription}")`);

    fs.writeFileSync(filepath, content, "utf-8");
    console.log(`Updated markdown for ${slug}`);
  }
};

processGuides();
