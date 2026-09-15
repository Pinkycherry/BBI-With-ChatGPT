import { createFileRoute } from "@tanstack/react-router";

import { urlsetXml, xmlResponse } from "@/lib/sitemap";
import { CALCULATORS } from "@/lib/calculators";
import { STARTUP_GUIDES } from "@/lib/guides-data";
import { CASE_STUDIES } from "@/lib/case-studies-data";

/**
 * Every page on this site that is not an idea or a category.
 *
 * The detail pages are DERIVED from the same data the routes render, never
 * hand-listed. This file previously held a typed list of twelve paths, and by
 * the time anyone checked it was missing every calculator, every guide, every
 * founder story, the glossary, the tools index, the FAQ and the shortlists --
 * the whole of the site built after the list was written. A hand-kept list of
 * URLs always ends up behind the site it describes; a derived one cannot.
 *
 * Deliberately absent:
 * - `/useful-tools`, which is a redirect to `/calculator`. A sitemap should
 *   name the destination, not the signpost.
 * - `/search` and `/sign-in`, which are functional pages with nothing to index.
 */

const STATIC_PAGES = [
  "/",
  "/browse",
  "/blog",
  "/calculator",
  "/startup-guides",
  "/founder-stories",
  "/founder-glossary",
  "/learning-resources",
  "/list",
  "/faq",
  "/about",
  "/services",
  "/contact",
  "/pricing",
  "/terms",
  "/privacy",
  "/disclaimer",
  "/gdpr",
  "/refund-policy",
];

export const Route = createFileRoute("/sitemap-pages.xml")({
  server: {
    handlers: {
      GET: async () =>
        xmlResponse(
          urlsetXml([
            ...STATIC_PAGES.map((path) => ({ path })),
            ...CALCULATORS.map((calculator) => ({ path: `/calculator/${calculator.slug}` })),
            ...STARTUP_GUIDES.map((guide) => ({ path: `/startup-guides/${guide.slug}` })),
            ...CASE_STUDIES.map((story) => ({ path: `/founder-stories/${story.slug}` })),
          ]),
        ),
    },
  },
});
