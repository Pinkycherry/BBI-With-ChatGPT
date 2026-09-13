import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { SearchPage } from "@/components/bbi/library";

export const Route = createFileRoute("/search")({
  validateSearch: z.object({ q: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Search the business idea library | BBI" },
      { name: "robots", content: "noindex,follow" },
    ],
  }),
  component: Page,
});

function Page() {
  const { q } = Route.useSearch();
  return <SearchPage initialQuery={q ?? ""} />;
}
