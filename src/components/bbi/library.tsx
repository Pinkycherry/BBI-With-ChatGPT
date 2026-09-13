import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Layers3, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useId, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { CATEGORIES, CATEGORY_GROUPS } from "./catalog";
import type { Category, CategoryGroup } from "./catalog";
import { contentList } from "./blueprint";
import type { BlueprintProps } from "./blueprint";
import "./library.css";

export type LibraryIdea = Pick<BlueprintProps, "idea_id" | "category_name" | "category_slug" | "subcategory_name" | "subcategory_slug" | "title" | "slug" | "summary" | "tags" | "startup_cost" | "time_to_first_customer" | "verdict">;
const NO_IDEAS: readonly LibraryIdea[] = [];

export function toLibraryIdea(idea: { ideaId: string; categoryName: string; categorySlug: string; subcategoryName: string; subcategorySlug: string; title: string; slug: string; summary: string; tags: string[]; startupCost?: string; timeToFirstCustomer?: string; verdict?: string }): LibraryIdea {
  return {
    idea_id: idea.ideaId,
    category_name: idea.categoryName,
    category_slug: idea.categorySlug,
    subcategory_name: idea.subcategoryName,
    subcategory_slug: idea.subcategorySlug,
    title: idea.title,
    slug: idea.slug,
    summary: idea.summary,
    tags: idea.tags,
    startup_cost: idea.startupCost ?? "",
    time_to_first_customer: idea.timeToFirstCustomer ?? "",
    verdict: idea.verdict ?? "",
  };
}

export function CategoryCard({ category, compact = false }: { category: Category; compact?: boolean }) {
  return <Link to="/category/$categorySlug" params={{ categorySlug: category.category_slug }} className={`library-category-card glass-panel${compact ? " library-category-card-compact" : ""}`}>
    <div className="library-category-image"><img src={category.image} alt={category.alt} loading="lazy" width="640" height="480" /><span className="library-card-arrow"><ArrowUpRight size={20} aria-hidden="true" /></span></div>
    <div className="library-category-copy"><p className="library-card-count">{category.count} blueprints</p><h3>{category.category_name}</h3></div>
  </Link>;
}

export function IdeaPlaceholder() {
  return <article className="library-idea-placeholder glass-panel"><div className="library-placeholder-art" aria-hidden="true"><div /><BookOpen size={42} /><div /></div><div><span className="eyebrow">Library update</span><h3>New blueprints are on the way.</h3><p className="muted">This category is ready for research. Check back soon for the customer, money, risk, and founder-fit sections.</p><div className="library-placeholder-answers"><span>Who pays</span><span>The money</span><span>Year one</span><span>Your fit</span></div></div></article>;
}

export function LibraryIdeaCard({ idea }: { idea: LibraryIdea }) {
  const hasDetails = Boolean(idea.startup_cost || idea.time_to_first_customer);
  return <article className="glass-panel library-idea-card"><div className="library-inline"><span className="pill">{idea.category_name}</span><BookOpen size={18} aria-hidden="true" /></div><h3><Link to="/idea/$slug" params={{ slug: idea.slug }}>{idea.title}</Link></h3><p className="muted">{idea.summary}</p>{hasDetails && <dl><div><dt>Startup cost</dt><dd>{idea.startup_cost || "To be researched"}</dd></div><div><dt>First customer</dt><dd>{idea.time_to_first_customer || "To be researched"}</dd></div></dl>}{idea.verdict && <p className="library-card-verdict">{idea.verdict}</p>}<Link className="text-link" to="/idea/$slug" params={{ slug: idea.slug }}>Read the blueprint<ArrowRight size={17} aria-hidden="true" /></Link></article>;
}

function matchesIdea(idea: LibraryIdea, query: string) {
  const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const haystack = [idea.title, idea.summary, idea.category_name, idea.subcategory_name, ...contentList(idea.tags)].join(" ").toLocaleLowerCase();
  return words.every((word) => haystack.includes(word));
}

export function BrowsePage() {
  const [group, setGroup] = useState<CategoryGroup | "All categories">("All categories");
  return <div className="bbi-page library-page">
    <header className="library-intro"><div><p className="eyebrow">Find your starting point</p><h1 className="page-heading">A world of possibilities.<br /><span className="library-heading-accent">An honest place to start.</span></h1><p className="muted">290 researched business-idea blueprints. 14 categories. Yours to explore.</p></div><Link to="/search" className="button button-secondary"><Search size={18} aria-hidden="true" />Search the library</Link></header>
    <div className="library-group-filter" role="group" aria-label="Browse categories by">{(["All categories", ...CATEGORY_GROUPS] as const).map((item) => <button type="button" key={item} className={`pill${group === item ? " library-pill-active" : ""}`} aria-pressed={group === item} onClick={() => setGroup(item)}>{item}</button>)}</div>
    {CATEGORY_GROUPS.filter((item) => group === "All categories" || group === item).map((item) => <section className="library-category-section" key={item}><div className="library-section-top"><h2 className="section-heading">{item}</h2><span className="library-section-line" aria-hidden="true" /></div><div className="library-category-grid">{CATEGORIES.filter((category) => category.group === item).map((category) => <CategoryCard category={category} key={category.category_slug} />)}</div></section>)}
    <div className="library-footnote glass-panel"><BookOpen size={23} aria-hidden="true" /><p>Every blueprint gets to the point: who pays, how the money works, what hurts, and whether it fits you.</p><span className="pill">Always free</span></div>
  </div>;
}

export type CategoryPageProps = { category: Category; ideas?: readonly LibraryIdea[]; subcategory_slug?: string; subcategory_name?: string };

export function CategoryPage({ category, ideas = NO_IDEAS, subcategory_slug, subcategory_name }: CategoryPageProps) {
  const id = useId();
  const [query, setQuery] = useState("");
  const [cost, setCost] = useState("");
  const [sort, setSort] = useState("library");
  const categoryIdeas = useMemo(() => ideas.filter((idea) => idea.category_slug === category.category_slug), [ideas, category.category_slug]);
  const scopedIdeas = categoryIdeas.filter((idea) => !subcategory_slug || idea.subcategory_slug === subcategory_slug);
  const subcategories = [...new Map(categoryIdeas.filter((idea) => idea.subcategory_slug && idea.subcategory_name).map((idea) => [idea.subcategory_slug, { slug: idea.subcategory_slug, name: idea.subcategory_name }])).values()];
  const costs = [...new Set(scopedIdeas.map((idea) => idea.startup_cost).filter(Boolean))];
  const results = scopedIdeas.filter((idea) => matchesIdea(idea, query) && (!cost || idea.startup_cost === cost));
  if (sort === "title") results.sort((a, b) => a.title.localeCompare(b.title));
  const hasFilters = query.trim() !== "" || cost !== "";
  function resetFilters() { setQuery(""); setCost(""); setSort("library"); }
  const heading = subcategory_slug ? (subcategory_name ?? subcategory_slug.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ")) : category.category_name;
  return <div className="bbi-page library-page">
    <Link className="text-link blueprint-back" to="/browse"><ArrowLeft size={16} aria-hidden="true" />All categories</Link>
    <header className="library-category-hero glass-panel"><div><div className="library-inline"><span className="eyebrow">{subcategory_slug ? "Explore a little deeper" : category.group}</span>{!subcategory_slug && <span className="pill">{category.count} blueprints</span>}</div><h1 className="page-heading">{heading}</h1><p className="muted">Find the customer, understand the money, and get an honest view of the work ahead.</p>{subcategory_slug && <Link to="/category/$categorySlug" params={{ categorySlug: category.category_slug }} className="text-link">{category.category_name}<ArrowUpRight size={17} aria-hidden="true" /></Link>}</div><img src={category.image} alt={category.alt} width="640" height="480" /></header>

    <nav className="library-subcategory-rail" aria-label="Subcategories"><Link to="/category/$categorySlug" params={{ categorySlug: category.category_slug }} className={`pill${!subcategory_slug ? " library-pill-active" : ""}`} aria-current={!subcategory_slug ? "page" : undefined}>All ideas</Link>{subcategories.map((subcategory) => <Link key={subcategory.slug} to="/category/$categorySlug/$subcategorySlug" params={{ categorySlug: category.category_slug, subcategorySlug: subcategory.slug }} className={`pill${subcategory_slug === subcategory.slug ? " library-pill-active" : ""}`} aria-current={subcategory_slug === subcategory.slug ? "page" : undefined}>{subcategory.name}</Link>)}{subcategories.length === 0 && <span className="library-rail-placeholder">Subcategories will appear as research is published.</span>}</nav>

    <section aria-labelledby="category-ideas-heading"><div className="library-section-top"><h2 id="category-ideas-heading" className="section-heading">Explore the blueprints</h2><SlidersHorizontal size={20} aria-hidden="true" /></div><div className="library-filters glass-panel"><label className="library-query" htmlFor={`${id}-query`}><span className="field-label">Search within this category</span><div className="library-input-wrap"><Search size={18} aria-hidden="true" /><input id={`${id}-query`} type="search" className="input" placeholder="A skill, customer, or interest…" value={query} onChange={(event) => setQuery(event.target.value)} /></div></label>{costs.length > 0 && <label htmlFor={`${id}-cost`}><span className="field-label">Startup cost</span><select id={`${id}-cost`} className="input" value={cost} onChange={(event) => setCost(event.target.value)}><option value="">All setup costs</option>{costs.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>}<label htmlFor={`${id}-sort`}><span className="field-label">Sort by</span><select id={`${id}-sort`} className="input" value={sort} onChange={(event) => setSort(event.target.value)}><option value="library">Library order</option><option value="title">Title, A–Z</option></select></label></div>
    <div aria-live="polite" aria-atomic="true" className="library-results-status">{hasFilters && <button type="button" className="text-link" onClick={resetFilters}><X size={15} aria-hidden="true" />Clear filters</button>}{ideas.length > 0 && <span>{results.length ? "Matching blueprints" : "No matching blueprints"}</span>}</div>
    {results.length > 0 ? <div className="library-idea-grid">{results.map((idea) => <LibraryIdeaCard key={idea.idea_id} idea={idea} />)}</div> : hasFilters || ideas.length > 0 ? <EmptyResults query={query} reset={resetFilters} /> : <IdeaPlaceholder />}</section>
    {subcategory_slug && <details className="blueprint-publication glass-panel"><summary>Subcategory information</summary><p>{subcategory_slug}</p></details>}
  </div>;
}

function EmptyResults({ query, reset }: { query: string; reset: () => void }) {
  return <div className="glass-panel library-empty"><Search size={30} aria-hidden="true" /><h2 className="section-heading">No matches this time.</h2><p className="muted">{query.trim() ? <>Nothing matches “{query.trim()}” in this view.</> : "Nothing matches these filters."} Try a broader term or explore a category.</p><button type="button" className="button button-secondary" onClick={reset}>Clear search and filters<ArrowRight size={17} aria-hidden="true" /></button></div>;
}

export function SearchPage({ ideas = NO_IDEAS, initialQuery = "", onSearch }: { ideas?: readonly LibraryIdea[]; initialQuery?: string; onSearch?: (query: string) => void }) {
  const id = useId();
  const [draft, setDraft] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  useEffect(() => { setDraft(initialQuery); setQuery(initialQuery); }, [initialQuery]);
  const normalizedQuery = query.trim();
  const matchingCategories = normalizedQuery ? CATEGORIES.filter((category) => normalizedQuery.toLocaleLowerCase().split(/\s+/).every((word) => category.category_name.toLocaleLowerCase().includes(word))) : [];
  const matchingIdeas = normalizedQuery ? ideas.filter((idea) => matchesIdea(idea, normalizedQuery)) : [];
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setQuery(draft.trim()); onSearch?.(draft.trim()); }
  function reset() { setDraft(""); setQuery(""); onSearch?.(""); }
  return <div className="bbi-page library-page library-search-page"><header className="library-search-intro"><p className="eyebrow">A little curiosity goes a long way</p><h1 className="page-heading">What are you thinking about?</h1><p className="muted">Search by your skills, an interest, or the kind of business you want to build.</p></header><form role="search" className="library-search-form glass-panel" onSubmit={submit}><label className="field-label" htmlFor={`${id}-search`}>Search the BBI library</label><div><Search size={22} aria-hidden="true" /><input id={`${id}-search`} type="search" className="input" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Search business ideas…" autoComplete="off" /><button type="submit" className="button button-primary">Search<ArrowRight size={18} aria-hidden="true" /></button></div></form>
    {!normalizedQuery ? <section className="library-search-start"><div className="library-section-top"><h2 className="section-heading">Start with where you are.</h2><Layers3 size={22} aria-hidden="true" /></div><div className="library-search-suggestions">{CATEGORY_GROUPS.map((group) => <div className="glass-panel" key={group}><h3>{group}</h3>{CATEGORIES.filter((category) => category.group === group).map((category) => <Link key={category.category_slug} to="/category/$categorySlug" params={{ categorySlug: category.category_slug }}>{category.category_name}<ArrowUpRight size={16} aria-hidden="true" /></Link>)}</div>)}</div></section> : <div className="library-search-results"><p className="muted" role="status">Search results for “{normalizedQuery}”</p>{matchingCategories.length > 0 && <section><h2 className="section-heading">Categories to explore</h2><div className="library-category-grid">{matchingCategories.map((category) => <CategoryCard key={category.category_slug} category={category} compact />)}</div></section>}{matchingIdeas.length > 0 && <section><h2 className="section-heading">Matching blueprints</h2><div className="library-idea-grid">{matchingIdeas.map((idea) => <LibraryIdeaCard key={idea.idea_id} idea={idea} />)}</div></section>}{matchingIdeas.length === 0 && matchingCategories.length === 0 && <EmptyResults query={normalizedQuery} reset={reset} />}{ideas.length === 0 && matchingCategories.length > 0 && <p className="library-search-note muted">Category navigation is ready to explore while new blueprint records are indexed.</p>}</div>}
  </div>;
}
