import { categoryImage } from "@/config/category-imagery";

export const CATEGORY_GROUPS = ["By investment", "By how you work", "By industry"] as const;
export type CategoryGroup = (typeof CATEGORY_GROUPS)[number];
export type Category = {
  category_name: string;
  category_slug: string;
  count: number;
  image: string;
  alt: string;
  group: CategoryGroup;
};

function category(category_name: string, category_slug: string, count: number, group: CategoryGroup): Category {
  const image = categoryImage(category_slug);
  return { category_name, category_slug, count, image: image.src, alt: image.alt, group };
}

// These names, slugs and counts are the complete category registry supplied in the brief.
export const CATEGORIES: readonly Category[] = [
  category("Side Hustle Ideas", "side-hustle-ideas", 50, "By how you work"),
  category("Zero Investment Business Ideas", "zero-investment-business-ideas", 50, "By investment"),
  category("Work From Home Business Ideas", "work-from-home-business-ideas", 50, "By how you work"),
  category("Passive Income Business Ideas", "passive-income-business-ideas", 35, "By how you work"),
  category("Low Investment Business Ideas", "low-investment-business-ideas", 25, "By investment"),
  category("Tech & SaaS", "tech-saas", 10, "By industry"),
  category("Health & Fitness", "health-fitness", 10, "By industry"),
  category("AI & Automation", "ai-automation", 10, "By industry"),
  category("Education & EdTech", "education-edtech", 10, "By industry"),
  category("E-Commerce & Retail", "ecommerce-retail", 10, "By industry"),
  category("Creator & Media", "creator-media", 10, "By industry"),
  category("FinTech & Finance", "fintech-finance", 10, "By industry"),
  category("Business Ideas That Never Go Out of Style", "timeless-business-ideas", 6, "By how you work"),
  category("Productivity & Workflow", "productivity-workflow", 4, "By industry"),
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((item) => item.category_slug === slug);
}
