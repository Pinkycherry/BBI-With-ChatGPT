/**
 * SINGLE SOURCE OF TRUTH for this site's own canonical origin (schema.org
 * markup, sitemaps, absolute URLs). Set SITE_URL in the environment once the
 * businessidea.io domain is live; falls back to the current Lovable domain.
 */
export function siteUrl(): string {
  const fromEnv = typeof process !== "undefined" ? process.env?.["SITE_URL"] : undefined;
  return (fromEnv?.trim() || "https://newbusinessideas3.lovable.app").replace(/\/+$/, "");
}
