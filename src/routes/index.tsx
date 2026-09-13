import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleCheck,
  Compass,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { CATEGORIES, CATEGORY_GROUPS } from "@/components/bbi/catalog";
import { TreeHero, BlueprintScroll } from "@/components/bbi/tree-hero";
import { Badge } from "@/components/bbi/primitives";

export const Route = createFileRoute("/")({ component: HomePage });

// PLACEHOLDER: Editorial interface copy below can be replaced with the founder’s final copy.
function HomePage() {
  const [group, setGroup] = useState("Start here");
  const categories =
    group === "Start here"
      ? CATEGORIES.filter((category) =>
          [
            "side-hustle-ideas",
            "zero-investment-business-ideas",
            "work-from-home-business-ideas",
            "passive-income-business-ideas",
          ].includes(category.category_slug),
        )
      : CATEGORIES.filter((category) => category.group === group);
  return (
    <div className="bbi-page home-page">
      <div className="home-topline">
        <span className="eyebrow">
          <span className="status-dot" />
          Independent research. Open to everyone.
        </span>
        <span>A little clarity before your next big thing.</span>
      </div>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span className="pill">
              <Sparkles size={12} aria-hidden="true" />
              Ideas with roots.
            </span>
          </div>
          <h1 className="home-title" id="home-title">
            Your next chapter
            <span className="accent-line">
              starts with
              <br />a better idea.
            </span>
          </h1>
          <p className="hero-description">
            290 researched business blueprints. The customers, the money, the hard parts. And an
            honest answer to: <strong>is this right for you?</strong>
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="/browse">
              Find your starting point
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a className="button button-secondary" href="#inside-blueprint">
              Inside a blueprint
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-assurances">
            <span>
              <Check size={13} aria-hidden="true" />
              No signup
            </span>
            <span>
              <Check size={13} aria-hidden="true" />
              No paywall
            </span>
            <span>
              <ShieldCheck size={13} aria-hidden="true" />
              Honest founder-fit verdicts
            </span>
          </div>
        </div>
        <TreeHero />
      </section>
      <section className="home-library" aria-labelledby="library-heading">
        <div className="library-toolbar">
          <div>
            <p className="eyebrow">
              <Compass size={13} aria-hidden="true" />
              The idea library
            </p>
            <h2 className="section-heading" id="library-heading">
              Find a path that fits your life.
            </h2>
          </div>
          <form className="home-search" action="/search" method="get" role="search">
            <Search size={16} className="muted" aria-hidden="true" />
            <label htmlFor="home-query" className="sr-only">
              Search business ideas
            </label>
            <input
              id="home-query"
              name="q"
              placeholder="What are you curious about?"
              type="search"
            />
            <button type="submit" aria-label="Search business ideas">
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </form>
        </div>
        <div className="home-library-filters" aria-label="Explore categories by">
          <span>Explore by</span>
          {["Start here", ...CATEGORY_GROUPS].map((item) => (
            <button
              key={item}
              className="home-filter"
              type="button"
              aria-pressed={group === item}
              onClick={() => setGroup(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="home-category-grid">
          {categories.map((category) => (
            <a
              href={`/category/${category.category_slug}`}
              key={category.category_slug}
              className="home-category"
            >
              <div className="home-category-image">
                <img
                  src={category.image}
                  alt={category.alt}
                  loading="lazy"
                  width="480"
                  height="300"
                />
                <span className="home-category-count">{category.count} blueprints</span>
              </div>
              <div className="home-category-body">
                <h3>{category.category_name}</h3>
                <span>
                  Explore the possibilities
                  <ArrowUpRight size={15} aria-hidden="true" />
                </span>
              </div>
            </a>
          ))}
        </div>
        <div className="library-bottom">
          <span className="muted">290 blueprints. 14 categories. Yours to explore.</span>
          <a href="/browse" className="text-link">
            View the whole library
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </section>
      <div id="inside-blueprint">
        <BlueprintScroll />
      </div>
      <section className="home-editorial" aria-label="Our research approach">
        <article className="glass-panel founder-note">
          <img
            src="/images/home/golden-seed-business-idea-research-growth-sculpture.webp"
            alt="Golden seed sculpture representing researched business idea growth"
            width="220"
            height="250"
            loading="lazy"
          />
          <div>
            <span className="eyebrow">Small beginnings</span>
            <h2>Good ideas need honest roots.</h2>
            <p>Understand the business before you invest your time in building it.</p>
            <a href="/about" className="text-link">
              Why we built BBI
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </article>
        <article className="glass-panel verdict-note">
          <p className="eyebrow">The founder-fit verdict</p>
          <h2>Sometimes, the best advice is “don't.”</h2>
          <div className="verdict-options">
            <Badge tone="positive">
              <CircleCheck size={14} aria-hidden="true" />
              Worth exploring
            </Badge>
            <Badge tone="negative">
              <X size={14} aria-hidden="true" />
              Do not build this one
            </Badge>
          </div>
          <p>Both answers belong here. Your time deserves the truth.</p>
        </article>
      </section>
    </div>
  );
}
