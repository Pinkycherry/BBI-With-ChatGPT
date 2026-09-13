import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, BadgeCheck, CirclePause, CircleCheck, Coins, FileText, Flag, Link2, Users } from "lucide-react";
import type { ReactNode } from "react";
import { getCategory } from "./catalog";
import "./library.css";

export type BlueprintList = string | readonly string[];
export type BlueprintFaq = { q: string; a: string };
export type BlueprintLink = { label: string; url: string };

/** Presentational contract: every ideas column has a corresponding prop. */
export type BlueprintProps = {
  idea_id: string;
  category_name: string;
  category_slug: string;
  subcategory_name: string;
  subcategory_slug: string;
  title: string;
  slug: string;
  summary: string;
  business_description: string;
  tags: BlueprintList;
  pros_json: BlueprintList;
  cons_json: BlueprintList;
  verdict: string;
  trend_score: number | string | null;
  tier: string;
  market_opportunity: string;
  target_customer: string;
  how_you_make_money: string;
  startup_cost: string;
  income_potential: string;
  competition_edge: string;
  getting_started_steps: BlueprintList;
  tools_needed: BlueprintList;
  time_to_first_customer: string;
  faq_json: string | readonly BlueprintFaq[];
  research_facts: BlueprintList;
  external_links: string | readonly BlueprintLink[];
  internal_link_anchors: string | readonly BlueprintLink[];
  seo_title: string;
  meta_description: string;
  focus_keyword: string;
};

export const BLUEPRINT_PLACEHOLDERS: BlueprintProps = {
  idea_id: "Placeholder — idea identifier", // PLACEHOLDER: idea_id
  category_name: "Category placeholder", // PLACEHOLDER: category_name
  category_slug: "Placeholder — category slug", // PLACEHOLDER: category_slug
  subcategory_name: "Subcategory placeholder", // PLACEHOLDER: subcategory_name
  subcategory_slug: "Placeholder — subcategory slug", // PLACEHOLDER: subcategory_slug
  title: "Blueprint title placeholder", // PLACEHOLDER: title
  slug: "Placeholder — idea slug", // PLACEHOLDER: slug
  summary: "Placeholder — a plain-language introduction to the opportunity and the problem it solves.", // PLACEHOLDER: summary
  business_description: "Placeholder — what the business does, what the customer receives, and what running it involves.", // PLACEHOLDER: business_description
  tags: "Placeholder — researched topic tags", // PLACEHOLDER: tags
  pros_json: "Placeholder — evidence-backed reasons this business could work for the right founder.", // PLACEHOLDER: pros_json
  cons_json: "Placeholder — the difficult work, hidden costs, and reasons this business could fail.", // PLACEHOLDER: cons_json
  verdict: "Placeholder — a direct founder-fit verdict, including when you should not build this business.", // PLACEHOLDER: verdict
  trend_score: "Awaiting research", // PLACEHOLDER: trend_score
  tier: "Placeholder — publication tier", // PLACEHOLDER: tier
  market_opportunity: "Placeholder — the specific unmet need and the research supporting it.", // PLACEHOLDER: market_opportunity
  target_customer: "Placeholder — the person who pays, their situation, and why this problem matters to them.", // PLACEHOLDER: target_customer
  how_you_make_money: "Placeholder — what you sell, how customers pay, and what remains after the costs.", // PLACEHOLDER: how_you_make_money
  startup_cost: "Placeholder — setup costs", // PLACEHOLDER: startup_cost
  income_potential: "Placeholder — income range and assumptions", // PLACEHOLDER: income_potential
  competition_edge: "Placeholder — the existing alternatives and a defensible reason to choose this business.", // PLACEHOLDER: competition_edge
  getting_started_steps: "Placeholder — the practical sequence from researching the customer to making the first sale.", // PLACEHOLDER: getting_started_steps
  tools_needed: "Placeholder — essential tools and what each one is needed for.", // PLACEHOLDER: tools_needed
  time_to_first_customer: "Placeholder — realistic time to first customer", // PLACEHOLDER: time_to_first_customer
  faq_json: "Placeholder — questions and answers specific to this blueprint.", // PLACEHOLDER: faq_json
  research_facts: "Placeholder — dated research findings, supporting evidence, and relevant context.", // PLACEHOLDER: research_facts
  external_links: "Placeholder — verified sources and further reading.", // PLACEHOLDER: external_links
  internal_link_anchors: "Placeholder — related blueprints and library reading.", // PLACEHOLDER: internal_link_anchors
  seo_title: "Placeholder — page title", // PLACEHOLDER: seo_title
  meta_description: "Placeholder — page description", // PLACEHOLDER: meta_description
  focus_keyword: "Placeholder — primary topic", // PLACEHOLDER: focus_keyword
};

export function createBlueprintPlaceholder(identity: Partial<Pick<BlueprintProps, "slug" | "category_name" | "category_slug" | "subcategory_slug" | "subcategory_name">> = {}): BlueprintProps {
  return { ...BLUEPRINT_PLACEHOLDERS, ...identity };
}

export function contentList(value: BlueprintList): readonly string[] {
  return typeof value === "string" ? (value.trim() ? [value] : []) : value;
}

function ResearchList({ value, ordered = false }: { value: BlueprintList; ordered?: boolean }) {
  const Tag = ordered ? "ol" : "ul";
  return <Tag className="blueprint-research-list">{contentList(value).map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</Tag>;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <div className="blueprint-field"><h3>{label}</h3><div>{children}</div></div>;
}

function SourceLinks({ value, internal = false }: { value: BlueprintProps["external_links"]; internal?: boolean }) {
  if (typeof value === "string") return <p>{value}</p>;
  return <ul className="blueprint-source-links">{value.map((link, index) => {
    const allowed = internal ? /^\/(?!\/)/.test(link.url) : /^https?:\/\//i.test(link.url);
    return <li key={`${index}-${link.url}`}>{allowed ? <a href={link.url} className="text-link" {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}>{link.label}<ArrowUpRight size={16} aria-hidden="true" /></a> : <span>{link.label}</span>}</li>;
  })}</ul>;
}

const ANSWERS = [
  { id: "who-pays", label: "Who pays", icon: Users },
  { id: "the-money", label: "The money", icon: Coins },
  { id: "year-one", label: "Year one", icon: Flag },
  { id: "founder-fit", label: "Your fit", icon: BadgeCheck },
] as const;

export function BlueprintPage(props: BlueprintProps) {
  const category = getCategory(props.category_slug);
  const isPlaceholder = props.title === BLUEPRINT_PLACEHOLDERS.title;
  return (
    <article className="bbi-page blueprint-page">
      <Link to="/browse" className="text-link blueprint-back"><ArrowLeft size={16} aria-hidden="true" />Back to the library</Link>
      <header className="blueprint-intro">
        <div className="library-inline"><span className="eyebrow">The BBI blueprint</span><span className="pill">Free to read</span>{isPlaceholder && <span className="pill">Template preview</span>}</div>
        <h1 className="page-heading">{props.title}</h1>
        <p className="blueprint-summary">{props.summary}</p>
        <div className="library-inline blueprint-tags">
          {category ? <Link className="pill" to="/category/$categorySlug" params={{ categorySlug: category.category_slug }}>{props.category_name}</Link> : <span className="pill">{props.category_name}</span>}
          <span className="pill">{props.subcategory_name}</span>
          {contentList(props.tags).map((tag) => <span key={tag} className="pill">{tag}</span>)}
        </div>
      </header>

      <nav className="blueprint-answer-nav glass-panel" aria-label="In this blueprint">
        {ANSWERS.map(({ id, label, icon: Icon }) => <a key={id} href={`#${id}`}><Icon size={18} aria-hidden="true" /><span>{label}</span><ArrowUpRight size={15} aria-hidden="true" /></a>)}
      </nav>

      <div className="blueprint-layout">
        <div className="blueprint-main">
          <section className="glass-panel blueprint-answer" id="who-pays" aria-labelledby="who-pays-heading">
            <span className="blueprint-section-icon"><Users size={24} aria-hidden="true" /></span>
            <p className="eyebrow">The customer</p><h2 className="section-heading" id="who-pays-heading">Who specifically will pay you?</h2>
            <p className="blueprint-lead">{props.target_customer}</p>
            <Field label="The business in plain language"><p>{props.business_description}</p></Field>
            <Field label="The opportunity"><p>{props.market_opportunity}</p></Field>
            <Field label="Why choose you?"><p>{props.competition_edge}</p></Field>
          </section>

          <section className="glass-panel blueprint-answer" id="the-money" aria-labelledby="the-money-heading">
            <span className="blueprint-section-icon"><Coins size={24} aria-hidden="true" /></span>
            <p className="eyebrow">The business model</p><h2 className="section-heading" id="the-money-heading">How the money actually works.</h2>
            <p className="blueprint-lead">{props.how_you_make_money}</p>
            <div className="blueprint-metrics"><Field label="What it costs to start"><p>{props.startup_cost}</p></Field><Field label="What you could earn"><p>{props.income_potential}</p></Field></div>
            <Field label="Time to first customer"><p>{props.time_to_first_customer}</p></Field>
          </section>

          <section className="glass-panel blueprint-answer" id="year-one" aria-labelledby="year-one-heading">
            <span className="blueprint-section-icon"><Flag size={24} aria-hidden="true" /></span>
            <p className="eyebrow">The honest part</p><h2 className="section-heading" id="year-one-heading">What will hurt in year one.</h2>
            <div className="blueprint-balance"><div className="blueprint-signal"><CircleCheck size={23} aria-hidden="true" /><h3>Reasons to build</h3><ResearchList value={props.pros_json} /></div><div className="blueprint-signal"><CirclePause size={23} aria-hidden="true" /><h3>Reasons to pause</h3><ResearchList value={props.cons_json} /></div></div>
            <Field label="What you will need"><ResearchList value={props.tools_needed} /></Field>
          </section>

          <section className="glass-panel blueprint-answer blueprint-verdict" id="founder-fit" aria-labelledby="founder-fit-heading">
            <span className="blueprint-section-icon"><BadgeCheck size={24} aria-hidden="true" /></span>
            <p className="eyebrow">The founder-fit verdict</p><h2 className="section-heading" id="founder-fit-heading">A good business. But is it yours?</h2>
            <p className="blueprint-lead">{props.verdict}</p>
            <div className="blueprint-verdict-options" aria-label="Both verdicts matter equally"><span><CircleCheck size={20} aria-hidden="true" />Build this, if it fits.</span><span><CirclePause size={20} aria-hidden="true" />Do not build this, if it does not.</span></div>
          </section>

          <section className="glass-panel blueprint-answer" aria-labelledby="getting-started-heading"><p className="eyebrow">A practical next step</p><h2 className="section-heading" id="getting-started-heading">Where to begin.</h2><ResearchList value={props.getting_started_steps} ordered /></section>
          <section className="glass-panel blueprint-answer" aria-labelledby="blueprint-faq-heading"><p className="eyebrow">Still thinking it through?</p><h2 className="section-heading" id="blueprint-faq-heading">Questions worth asking.</h2>{typeof props.faq_json === "string" ? <p>{props.faq_json}</p> : props.faq_json.map((faq, index) => <details className="blueprint-faq" key={`${index}-${faq.q}`}><summary>{faq.q}</summary><p>{faq.a}</p></details>)}</section>
        </div>

        <aside className="blueprint-aside" aria-label="Supporting research">
          <section className="glass-panel blueprint-aside-card"><FileText size={22} aria-hidden="true" /><h2>Research notes</h2><ResearchList value={props.research_facts} /><Field label="Trend signal"><p>{props.trend_score ?? BLUEPRINT_PLACEHOLDERS.trend_score}</p></Field></section>
          <section className="glass-panel blueprint-aside-card"><Link2 size={22} aria-hidden="true" /><h2>Follow the evidence</h2><SourceLinks value={props.external_links} /><Field label="Keep exploring"><SourceLinks value={props.internal_link_anchors} internal /></Field></section>
          <div className="blueprint-aside-note"><span className="eyebrow">Your decision. Your pace.</span><p>No signup, no paywall, no email gate.</p><Link to="/browse" className="text-link">Explore the library<ArrowUpRight size={17} aria-hidden="true" /></Link></div>
        </aside>
      </div>

      <details className="blueprint-publication glass-panel"><summary>Blueprint information</summary><dl>{([
        ["Record identifier", props.idea_id], ["Idea path", props.slug], ["Category path", props.category_slug], ["Subcategory path", props.subcategory_slug], ["Publication tier", props.tier], ["Page title", props.seo_title], ["Page description", props.meta_description], ["Primary topic", props.focus_keyword],
      ] as const).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></details>
    </article>
  );
}
