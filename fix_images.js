import fs from "fs";
import path from "path";

const guideDir = path.join(process.cwd(), "content", "guides");
const mdFiles = fs.readdirSync(guideDir).filter((f) => f.endsWith(".md"));

mdFiles.forEach((file) => {
  const filePath = path.join(guideDir, file);
  let content = fs.readFileSync(filePath, "utf-8");

  // Find <img src="..." alt="..." ... />
  const regex = /<img\s+src="([^"]+)"\s+alt="([^"]+)"[^>]*>/g;
  const newContent = content.replace(regex, "![$2]($1)");

  fs.writeFileSync(filePath, newContent);
});

console.log("Images fixed.");
