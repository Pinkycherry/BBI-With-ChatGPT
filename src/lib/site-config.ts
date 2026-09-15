/**
 * SINGLE SOURCE OF TRUTH for this site's own canonical origin (schema.org
 * markup, sitemaps, absolute URLs). Set SITE_URL in the environment once the
 * businessidea.io domain is live; falls back to the current Lovable domain.
 */
export function siteUrl(): string {
  const fromEnv = typeof process !== "undefined" ? process.env?.["SITE_URL"] : undefined;
  return (fromEnv?.trim() || "https://newbusinessideas3.lovable.app").replace(/\/+$/, "");
}

/**
 * The canonical URL for a path on THIS site.
 *
 * Every absolute URL the site publishes -- canonical tags, sitemaps, schema.org
 * markup, Open Graph -- is built from `siteUrl()`, so changing the domain is one
 * environment variable and nothing else. A hand-typed domain anywhere in the
 * codebase silently survives a domain change and points visitors and crawlers at
 * the old site, which is exactly what happened before this existed.
 *
 * Query strings and fragments are dropped on purpose: `/browse?page=2` and
 * `/browse` are the same page to a crawler, and a canonical that varies by query
 * parameter splits one page into many in the index.
 */
export function canonicalUrl(pathname: string): string {
  const path = (pathname || "/").split("?")[0]!.split("#")[0]!;
  const trimmed = path.replace(/^\/+|\/+$/g, "");
  // The homepage keeps its trailing slash so the canonical matches the URL the
  // server actually serves, rather than a bare origin.
  return trimmed === "" ? `${siteUrl()}/` : `${siteUrl()}/${trimmed}`;
}
