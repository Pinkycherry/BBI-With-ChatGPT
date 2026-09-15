import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Lock } from "lucide-react";

import type { IdeaCard as IdeaCardData } from "@/lib/ideas-shared";
import { useAuth } from "@/hooks/use-auth";
import "@/components/catalog-ui.css";

export function IdeaCard({
  idea,
  featured = false,
}: {
  idea: IdeaCardData;
  /** Section 12.7 — no repetitive same-size card walls. Pass true for exactly
   * ONE card per grid: the highest trend-scored idea in the set, which the
   * listing loaders already sort to the front. It spans 2 grid columns and
   * gets larger type, a longer summary and more tags, so a long grid reads as
   * ranked rather than as a uniform tile wall. This used to fire on every
   * seventh index, which scattered wide tiles through the grid at random —
   * that broke left-to-right comparison without telling the reader anything,
   * so the emphasis is now earned by real data or not given at all. */
  featured?: boolean;
}) {
  const auth = useAuth();
  // PROJECT_BRIEF.md Section 3.2 — idea content is blurred for anonymous
  // visitors; the browse/category page shell around it stays fully visible.
  // While the session is still resolving (auth.status === "loading"), we do
  // NOT know yet whether the visitor is signed in — treat that brief window
  // as unlocked-neutral rather than locked, so an already-logged-in user
  // never sees a flash of the "Sign in to view" overlay. Only the definitive
  // "anonymous" status renders the locked treatment.
  const locked = auth.status === "anonymous";

  return (
    <article
      className={`mo-card catalog-idea-card h-full ${featured ? "catalog-idea-featured sm:col-span-2" : ""}`}
    >
      <Link
        to="/idea/$slug"
        params={{ slug: idea.slug }}
        className="group relative z-10 flex h-full min-w-0 flex-col p-5 sm:p-6"
      >
        <div
          className={`flex h-full flex-col gap-4 ${locked ? "pointer-events-none select-none blur-sm" : ""}`}
        >
          <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-widest text-muted-foreground">
            <span className="truncate">{idea.subcategoryName}</span>
            {idea.trendScore !== null && (
              <span className="catalog-trend shrink-0 tabular-nums text-hl-teal">
                Trend {idea.trendScore}
              </span>
            )}
          </div>
          <h3
            className={`break-words font-semibold leading-snug tracking-tight ${
              featured ? "text-2xl" : "text-lg"
            }`}
          >
            {idea.title}
          </h3>
          <p
            className={`break-words text-sm text-muted-foreground ${
              featured ? "line-clamp-4" : "line-clamp-3"
            }`}
          >
            {idea.summary}
          </p>
          <div className="catalog-card-footer mt-auto flex items-end justify-between gap-3 pt-4">
            <div className="flex min-w-0 flex-wrap gap-1.5">
              {idea.tags.slice(0, featured ? 5 : 3).map((tag) => (
                <span
                  key={tag}
                  className="catalog-tag max-w-full truncate rounded-full px-2.5 py-1 text-[11px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="catalog-card-arrow" aria-hidden="true">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
        {locked && (
          <div className="catalog-card-lock absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-background/45">
            <Lock className="h-4 w-4 text-accent" aria-hidden />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
              Sign in to view
            </span>
          </div>
        )}
      </Link>
    </article>
  );
}
