import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";

import { searchIdeas } from "@/lib/ideas.functions";
import { useStaggerReveal } from "@/motion";
import "@/components/catalog-ui.css";

function SearchSuggestions({ children, id }: { children: ReactNode; id: string }) {
  const revealRef = useStaggerReveal<HTMLDivElement>({
    selector: ".mo-row",
    stagger: 0.03,
    distance: 4,
  });
  return (
    <div
      ref={revealRef}
      id={id}
      className="catalog-search-suggestions mo-route absolute left-0 top-[calc(100%+0.5rem)] z-50 w-[min(24rem,80vw)] overflow-hidden rounded-2xl p-1.5"
      data-route-enter=""
    >
      {children}
    </div>
  );
}

/**
 * Live suggest search. The query itself stays on the server (createServerFn);
 * only the matched card array crosses to the client.
 */
export function LiveSearch({
  className = "",
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const suggestionsId = useId();

  useEffect(() => {
    const t = setTimeout(() => setDebounced(term.trim()), 220);
    return () => clearTimeout(t);
  }, [term]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const results = useQuery({
    queryKey: ["live-search", debounced],
    queryFn: () => searchIdeas({ data: { q: debounced } }),
    enabled: debounced.length >= 2,
    staleTime: 60_000,
  });

  const items = (results.data ?? []).slice(0, 6);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!term.trim()) return;
    setOpen(false);
    onNavigate?.();
    navigate({ to: "/search", search: { q: term.trim() } });
  };

  return (
    <div ref={wrap} className={`relative ${className}`}>
      <form
        onSubmit={submit}
        className="catalog-live-search flex items-center gap-2 rounded-full px-3.5 py-2"
      >
        <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
        <input
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder="Search ideas…"
          aria-label="Search business ideas"
          aria-controls={open && debounced.length >= 2 ? suggestionsId : undefined}
          className="w-full min-w-0 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground"
        />
      </form>

      {open && debounced.length >= 2 && (
        <SearchSuggestions key={`${debounced}-${results.isLoading}`} id={suggestionsId}>
          {results.isLoading && (
            <div className="space-y-1.5 p-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="iv-skeleton h-8 w-full" />
              ))}
            </div>
          )}
          {!results.isLoading && items.length === 0 && (
            <p className="px-3 py-2.5 text-xs text-muted-foreground">No matches yet.</p>
          )}
          {items.map((idea) => (
            <button
              key={idea.ideaId}
              type="button"
              onClick={() => {
                setOpen(false);
                onNavigate?.();
                navigate({ to: "/idea/$slug", params: { slug: idea.slug } });
              }}
              className="mo-row block w-full truncate rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground"
            >
              {idea.title}
            </button>
          ))}
        </SearchSuggestions>
      )}
    </div>
  );
}
