import { Link, useNavigate } from "@tanstack/react-router";
import { STARTUP_GUIDES } from "@/lib/guides-data";
import { CALCULATORS } from "@/lib/calculators";
import { CASE_STUDIES } from "@/lib/case-studies-data";
import { GLOSSARY_DATA } from "@/lib/glossary-data";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Search,
  Shuffle,
  Check,
  Plus,
  Minus,
  ChevronDown,
  Menu,
  X,
  Users,
  Wallet,
  ShieldCheck,
  Sprout,
  BookOpen,
  Compass,
  Pause,
  Play,
} from "lucide-react";
import type { Catalog, CategoryNode } from "@/lib/ideas.functions";
import { getSurpriseIdeas } from "@/lib/ideas.functions";
import type { IdeaCard } from "@/lib/ideas-shared";
import { subscribeToNewsletter } from "@/lib/newsletter.functions";
import { useAuth } from "@/hooks/use-auth";
import { signOut } from "@/lib/auth-client";
import { loadGsap } from "@/lib/motion";
import sideHustle from "../../../Images/Side-Hustle-Ideas.webp";
import homeWork from "../../../Images/Work-From-Home-Business-Ideas.webp";
import zeroInvestment from "../../../Images/Zero-Investment-Business-Ideas.webp";
import creator from "../../../Images/Creator-Media-business-ideas.webp";
import education from "../../../Images/Education-EdTech-business-ideas.webp";
import lowInvestment from "../../../Images/Low-Investment-Business-Ideas.webp";
import technology from "../../../Images/Tech-SaaS-business-ideas.webp";

// Optional illustration mapping only. The live catalog supplies all names, counts and destinations.
const ART: Record<string, string> = {
  "side-hustle-ideas": sideHustle,
  "work-from-home-business-ideas": homeWork,
  "zero-investment-business-ideas": zeroInvestment,
  "creator-media": creator,
  "education-edtech": education,
  "low-investment-business-ideas": lowInvestment,
  "tech-saas": technology,
};
const CHAPTERS = [
  {
    label: "The buyer",
    heading: "Someone has to pay you.",
    text: "Not ‘everyone’. Not ‘a huge market’. Every blueprint names the specific person who needs this business, and the problem they want solved.",
    icon: Users,
    short: "Who actually buys?",
    note: "A named customer. A real problem.",
  },
  {
    label: "The money",
    heading: "How the money really works.",
    text: "What you sell. How you charge. What it takes to start. Understand the business behind the idea before you put your own money into it.",
    icon: Wallet,
    short: "How does it earn?",
    note: "Revenue mechanics, not revenue promises.",
  },
  {
    label: "The risks",
    heading: "The part nobody puts in the pitch.",
    text: "Competition. Hidden costs. The hard first year. We put the painful parts in the blueprint, where you can see them before they become your problem.",
    icon: ShieldCheck,
    short: "What could go wrong?",
    note: "The downside deserves its own page.",
  },
  {
    label: "The verdict",
    heading: "Build it. Or walk away.",
    text: "A good idea isn’t always your idea. Every blueprint ends with a straight founder-fit verdict. Sometimes the best next step is choosing a different path.",
    icon: Compass,
    short: "Is this right for me?",
    note: "An honest no is a useful answer.",
  },
] as const;
const FAQS = [
  {
    q: "Are these real business ideas or just inspiration?",
    a: "Every entry is a researched blueprint. It explains the specific customer, how money changes hands, the realistic obstacles, and a direct verdict on founder fit. It is a starting point for your own research, not a guarantee that a business will succeed.",
  },
  {
    q: "Do I have to pay to browse?",
    a: "No. You can browse categories, search ideas, and explore the library without paying or creating an account. Full-access options are explained on the pricing page.",
  },
  {
    q: "What if I have no money or experience?",
    a: "Start with the zero-investment, low-investment, or side-hustle categories. Look for an idea that fits your skills and time. Research first, talk to potential customers, and spend only when you understand what you are testing.",
  },
  {
    q: "Can I validate my own version of an idea?",
    a: "Yes. Open the closest blueprint and use its Validate option to add your own context and explore the idea further. The idea page explains the available access options. BBI does not guarantee the accuracy of a validation report.",
  },
  {
    q: "How often does the library change?",
    a: "New completed blueprints appear automatically in the library and category pages when they are published. The counts you see here come from the current catalog.",
  },
  {
    q: "Can I suggest an idea or a category?",
    a: "Yes. Tell us what you would like us to research through the Contact page. Specific problems, industries, or situations are especially helpful.",
  },
];
function clean(text: string, limit = 165) {
  const value = text
    .replace(/<[^>]*>/g, "")
    .replace(/[`*_#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (value.length <= limit) return value;
  const slice = value.slice(0, limit);
  const boundary = slice.lastIndexOf(" ");
  return `${slice.slice(0, boundary > 0 ? boundary : limit)}…`;
}

function BlueprintCard({ idea, index = 0 }: { idea: IdeaCard; index?: number }) {
  return (
    <Link
      className="nh-blueprint"
      to="/idea/$slug"
      params={{ slug: idea.slug }}
      style={{ "--card-i": index } as CSSProperties}
    >
      <div className="nh-blueprint-top">
        <span>{idea.categoryName}</span>
        <ArrowUpRight size={20} />
      </div>
      <div className="nh-blueprint-mark" aria-hidden="true">
        <BookOpen strokeWidth={1.1} />
      </div>
      <p className="nh-eyebrow">{clean(idea.subcategoryName, 68)}</p>
      <h3>{clean(idea.title, 85)}</h3>
      <p>{clean(idea.summary)}</p>
      <div className="nh-blueprint-bottom">
        <span>Read the blueprint</span>
        {idea.trendScore !== null && (
          <span>
            Trend <b>{idea.trendScore}</b>
            <span className="nh-sr"> out of 100</span>
          </span>
        )}
      </div>
    </Link>
  );
}

function ResearchJourney({ idea, paused }: { idea: IdeaCard | undefined; paused: boolean }) {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  const chapter = CHAPTERS[active]!;
  const Icon = chapter.icon;
  useEffect(() => {
    const el = root.current;
    if (!el || paused) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void loadGsap(true).then((gsap) => {
      if (disposed) return;
      const media = gsap.matchMedia();
      media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 22%",
            end: "bottom 85%",
            onUpdate: (self) => setActive(Math.min(3, Math.floor(self.progress * 4))),
          },
        });
      });
      cleanup = () => media.revert();
    });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [paused]);
  function keyTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % 4;
    else if (event.key === "ArrowLeft") next = (index + 3) % 4;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 3;
    else return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`nh-step-${next}`)?.focus();
  }
  return (
    <section id="how-it-works" ref={root} className="nh-journey" aria-labelledby="nh-journey-title">
      <div className="nh-journey-sticky">
        <div className="nh-section-heading" data-home-reveal>
          <p className="nh-eyebrow">Inside every blueprint</p>
          <h2 id="nh-journey-title">
            A big idea.
            <br />
            <span>Four honest answers.</span>
          </h2>
        </div>
        <div className="nh-journey-tabs" role="tablist" aria-label="What is in a blueprint">
          {CHAPTERS.map((step, i) => (
            <button
              key={step.label}
              id={`nh-step-${i}`}
              role="tab"
              aria-selected={active === i}
              aria-controls="nh-research-panel"
              tabIndex={active === i ? 0 : -1}
              onKeyDown={(e) => keyTab(e, i)}
              onClick={() => setActive(i)}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              {step.label}
              {active === i && <span className="nh-tab-dot" />}
            </button>
          ))}
        </div>
        <div className="nh-research-frame">
          <div className="nh-window-bar">
            <span className="nh-window-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>BBI / the anatomy of an idea</span>
            <ShieldCheck size={15} />
          </div>
          <div
            className="nh-research-content"
            id="nh-research-panel"
            role="tabpanel"
            aria-labelledby={`nh-step-${active}`}
          >
            <div className="nh-research-copy" key={active}>
              <span className="nh-stage">
                0{active + 1} / 04 <span>THE RESEARCH</span>
              </span>
              <div className="nh-research-icon">
                <Icon size={29} strokeWidth={1.4} />
              </div>
              <h3>{chapter.heading}</h3>
              <p>{chapter.text}</p>
              <span className="nh-research-note">
                <Check size={16} />
                {chapter.note}
              </span>
            </div>
            <div className="nh-paper-stack">
              <div className="nh-paper-shadow" />
              <div className="nh-paper">
                <div className="nh-paper-top">
                  <span>THE BLUEPRINT</span>
                  <BookOpen size={19} />
                </div>
                <p className="nh-paper-category">{idea?.subcategoryName || "Your next business"}</p>
                <h4>{idea?.title || "Start with a real question."}</h4>
                <div className="nh-paper-rule" />
                {CHAPTERS.map((step, i) => (
                  <div
                    className={`nh-paper-row ${active === i ? "is-active" : ""}`}
                    key={step.label}
                  >
                    <span>0{i + 1}</span>
                    <span>{step.short}</span>
                    {active === i ? <ArrowRight size={16} /> : <Check size={15} />}
                  </div>
                ))}
                <p className="nh-paper-foot">Research first. Decide for yourself.</p>
              </div>
              <span className="nh-paper-sticker">
                <ShieldCheck size={17} /> Honest by design
              </span>
            </div>
          </div>
        </div>
        <div className="nh-journey-footer">
          {idea ? (
            <Link to="/idea/$slug" params={{ slug: idea.slug }}>
              Open this blueprint <ArrowUpRight size={17} />
            </Link>
          ) : (
            <Link to="/browse">
              Explore the library <ArrowUpRight size={17} />
            </Link>
          )}
          <span>
            Scroll to explore <ArrowDown size={14} />
          </span>
        </div>
      </div>
    </section>
  );
}

function CategoryWorld({ categories }: { categories: CategoryNode[] }) {
  const illustrated = categories.filter((c) => ART[c.categorySlug]).slice(0, 6);
  return (
    <section className="nh-world" id="categories" aria-labelledby="nh-world-title">
      <div className="nh-section-heading" data-home-reveal>
        <p className="nh-eyebrow">There is more than one way to start</p>
        <h2 id="nh-world-title">
          Your life. Your starting point.
          <br />
          <span>Your kind of business.</span>
        </h2>
        <p>
          A side hustle. A fresh start. Something of your own.
          <br />
          Find the ideas that fit the life you actually have.
        </p>
        <Link to="/browse" className="nh-button">
          Find your starting point <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="nh-world-art">
        <div className="nh-orbit-label">
          <Sprout size={25} />
          <span>
            Small beginnings.
            <br />
            <b>Real possibilities.</b>
          </span>
        </div>
        {illustrated.map((c, i) => (
          <Link
            key={c.categorySlug}
            className={`nh-world-card nh-world-card-${i}`}
            to="/category/$categorySlug"
            params={{ categorySlug: c.categorySlug }}
          >
            <img src={ART[c.categorySlug]} alt="" width="1280" height="720" loading="lazy" />
            <div>
              <span>{c.categoryName}</span>
              <ArrowUpRight size={18} />
            </div>
            <small>{c.ideaCount} researched blueprints</small>
          </Link>
        ))}
      </div>
      <div className="nh-category-list" aria-label="All business categories">
        {categories.map((c) => (
          <Link
            key={c.categorySlug}
            to="/category/$categorySlug"
            params={{ categorySlug: c.categorySlug }}
          >
            {c.categoryName}
            <span>{c.ideaCount}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Discovery({ categories }: { categories: CategoryNode[] }) {
  const [categorySlug, setCategorySlug] = useState("");
  const run = useServerFn(getSurpriseIdeas);
  const surprise = useMutation({
    mutationFn: () => run({ data: { categorySlug: categorySlug || undefined, count: 3 } }),
  });
  return (
    <section
      className="nh-discovery nh-container"
      id="surprise-me"
      aria-labelledby="nh-surprise-title"
    >
      <div className="nh-section-heading" data-home-reveal>
        <h2 id="nh-surprise-title">
          Oh, and a little
          <br />
          <span>room for serendipity.</span>
        </h2>
      </div>
      <div className="nh-feature-grid">
        <div className="nh-feature nh-surprise">
          <div className="nh-feature-icon">
            <Shuffle size={25} />
          </div>
          <h3>
            Not sure where to start?
            <br />
            Let curiosity pick.
          </h3>
          <p>
            You don’t need the perfect search term. Pull three real ideas from the library and see
            what clicks.
          </p>
          <div className="nh-discovery-controls">
            <label className="nh-sr" htmlFor="nh-category-select">
              Surprise me category
            </label>
            <select
              id="nh-category-select"
              value={categorySlug}
              onChange={(e) => setCategorySlug(e.target.value)}
            >
              <option value="">Any category</option>
              {categories.map((c) => (
                <option value={c.categorySlug} key={c.categorySlug}>
                  {c.categoryName}
                </option>
              ))}
            </select>
            <button
              className="nh-button"
              onClick={() => surprise.mutate()}
              disabled={surprise.isPending}
            >
              {surprise.isPending ? "Picking your ideas…" : "Surprise me"}
              <Shuffle size={17} />
            </button>
          </div>
          <div className="nh-mini-papers" aria-hidden="true">
            <span>What if?</span>
            <span>Why not?</span>
            <span>
              Start here. <ArrowUpRight />
            </span>
          </div>
        </div>
        <div className="nh-feature nh-tools">
          <div className="nh-feature-icon">
            <Wallet size={25} />
          </div>
          <h3>
            Before you spend it,
            <br />
            work it out.
          </h3>
          <p>Use the business calculators to think through the numbers behind your next move.</p>
          <Link to="/calculator" className="nh-text-link">
            Explore the calculators <ArrowUpRight size={17} />
          </Link>
          <div className="nh-calculator-art" aria-hidden="true">
            <div>
              <span>RESEARCH → REALITY</span>
              <Wallet size={19} />
            </div>
            <p>Does it add up?</p>
            <div className="nh-math-grid">
              <span>Costs</span>
              <span>Time</span>
              <span>Price</span>
              <b>=</b>
            </div>
            <small>Less guessing. Better questions.</small>
          </div>
        </div>
      </div>
      <div className="nh-surprise-results" aria-live="polite" aria-atomic="false">
        {surprise.isError && (
          <p className="nh-feedback">We couldn’t pick ideas just now. Please try again.</p>
        )}
        {surprise.isSuccess && surprise.data.length === 0 && (
          <p className="nh-feedback">
            No completed ideas in this category yet. Try another category.
          </p>
        )}
        {surprise.data && surprise.data.length > 0 && (
          <>
            <h3>Your next three possibilities</h3>
            <div className="nh-blueprint-grid">
              {surprise.data.map((idea, i) => (
                <BlueprintCard key={idea.ideaId} idea={idea} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function GoldenTree({ catalog }: { catalog: Catalog }) {
  return (
    <section className="nh-tree-section" aria-labelledby="nh-tree-title">
      <div className="nh-tree-topline" />
      <div className="nh-section-heading" data-home-reveal>
        <span className="nh-dark-badge">
          <Sprout size={16} /> A world of possibilities
        </span>
        <h2 id="nh-tree-title">
          Every big thing
          <br />
          starts with <span>one small idea.</span>
        </h2>
        <p>
          Follow a branch. Find your direction.
          <br />
          The Golden Tree of Business Growth.
        </p>
      </div>
      <div className="nh-tree-canopy">
        <img
          className="nh-tree-image"
          src="/home/golden-tree.jpg"
          alt="BBI’s Golden Tree of Business Growth"
          width="1280"
          height="720"
          loading="lazy"
        />
        {catalog.categories.slice(0, 6).map((c, i) => (
          <Link
            className={`nh-tree-node nh-tree-node-${i}`}
            key={c.categorySlug}
            to="/category/$categorySlug"
            params={{ categorySlug: c.categorySlug }}
          >
            {c.categoryName}
            <span>
              {c.ideaCount} blueprints <ArrowUpRight size={13} />
            </span>
          </Link>
        ))}
      </div>
      <div className="nh-tree-stats">
        <div>
          <strong>{catalog.totalIdeas}</strong>
          <span>researched blueprints</span>
        </div>
        <div>
          <strong>{catalog.totalCategories}</strong>
          <span>ways into the library</span>
        </div>
        <div>
          <strong>₹0</strong>
          <span>to start browsing</span>
        </div>
      </div>
      <Link className="nh-button" to="/browse">
        Find your next idea <ArrowUpRight size={18} />
      </Link>
    </section>
  );
}

function OperatorToolkitSection() {
  return (
    <section
      className="nh-toolkit nh-container"
      aria-labelledby="nh-toolkit-title"
      style={{ paddingTop: "90px", paddingBottom: "70px" }}
    >
      <div className="nh-section-heading nh-heading-left" data-home-reveal>
        <div>
          <p className="nh-eyebrow">Calculators, Playbooks & Real Case Studies</p>
          <h2 id="nh-toolkit-title">
            The Operator&apos;s Toolkit.
            <br />
            <span>Real numbers. Zero fluff.</span>
          </h2>
        </div>
        <Link to="/learning-resources" className="nh-text-link">
          All resources <ArrowUpRight size={18} />
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
          marginTop: "40px",
        }}
      >
        {/* Card 1: Calculators */}
        <Link
          to="/calculator"
          className="glass glass-card"
          style={{
            borderRadius: "20px",
            padding: "30px 26px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: "#000000",
                textTransform: "uppercase",
              }}
            >
              {CALCULATORS.length} Live Calculators
            </span>
            <h3
              style={{ fontSize: "21px", fontWeight: 600, marginTop: "12px", marginBottom: "8px" }}
            >
              Useful Calculators
            </h3>
            <p style={{ fontSize: "14px", color: "#686664", lineHeight: 1.6 }}>
              Interactive TAM/SAM/SOM, runway, break-even units, CAC, and LTV models with real-time
              feedback.
            </p>
          </div>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "#000000",
              textTransform: "uppercase",
              marginTop: "24px",
            }}
          >
            Model Numbers <ArrowRight size={14} />
          </span>
        </Link>

        {/* Card 2: Startup Guides */}
        <Link
          to="/startup-guides"
          className="glass glass-card"
          style={{
            borderRadius: "20px",
            padding: "30px 26px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: "#000000",
                textTransform: "uppercase",
              }}
            >
              {STARTUP_GUIDES.length} Tactical Playbooks
            </span>
            <h3
              style={{ fontSize: "21px", fontWeight: 600, marginTop: "12px", marginBottom: "8px" }}
            >
              Startup Guides
            </h3>
            <p style={{ fontSize: "14px", color: "#686664", lineHeight: 1.6 }}>
              Empirical customer discovery without pitching, bottom-up TAM calculation, and lean
              launch systems.
            </p>
          </div>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "#000000",
              textTransform: "uppercase",
              marginTop: "24px",
            }}
          >
            Read Playbooks <ArrowRight size={14} />
          </span>
        </Link>

        {/* Card 3: Founder Stories */}
        <Link
          to="/founder-stories"
          className="glass glass-card"
          style={{
            borderRadius: "20px",
            padding: "30px 26px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: "#000000",
                textTransform: "uppercase",
              }}
            >
              Illustrative Case Studies
            </span>
            <h3
              style={{ fontSize: "21px", fontWeight: 600, marginTop: "12px", marginBottom: "8px" }}
            >
              Founder Stories
            </h3>
            <p style={{ fontSize: "14px", color: "#686664", lineHeight: 1.6 }}>
              Illustrative case studies of bootstrapped business models, execution timelines, and
              practical takeaways.
            </p>
          </div>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "#000000",
              textTransform: "uppercase",
              marginTop: "24px",
            }}
          >
            View Breakdowns <ArrowRight size={14} />
          </span>
        </Link>

        {/* Card 4: Glossary */}
        <Link
          to="/founder-glossary"
          className="glass glass-card"
          style={{
            borderRadius: "20px",
            padding: "30px 26px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: "#000000",
                textTransform: "uppercase",
              }}
            >
              Essential Terms
            </span>
            <h3
              style={{ fontSize: "21px", fontWeight: 600, marginTop: "12px", marginBottom: "8px" }}
            >
              Founder Glossary
            </h3>
            <p style={{ fontSize: "14px", color: "#686664", lineHeight: 1.6 }}>
              Venture metrics, unit economics ratios, and financial terms with formulas and operator
              benchmarks.
            </p>
          </div>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "#000000",
              textTransform: "uppercase",
              marginTop: "24px",
            }}
          >
            Search Glossary <ArrowRight size={14} />
          </span>
        </Link>
      </div>
    </section>
  );
}


export function HomeExperience({
  catalog,
  featured,
  trending,
}: {
  catalog: Catalog;
  featured: IdeaCard[];
  trending: IdeaCard[];
}) {
  const root = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const paused = false;
  const [faq, setFaq] = useState<number | null>(0);
  const navigate = useNavigate();
  const picks = (featured.length ? featured : trending).slice(0, 3);
  useEffect(() => {
    const el = root.current;
    if (!el || paused) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void loadGsap(true).then((gsap) => {
      if (disposed) return;
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const ctx = gsap.context(() => {
          gsap.from(".nh-hero-reveal", {
            y: 24,
            autoAlpha: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "all",
          });
          el.querySelectorAll<HTMLElement>("[data-home-reveal]").forEach((section) =>
            gsap.from(section, {
              y: 32,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: section, start: "top 94%", once: true },
              clearProps: "all",
            }),
          );
          gsap.fromTo(
            ".nh-world-card",
            { y: 70, rotation: (i) => (i % 2 ? 7 : -7) },
            {
              y: -35,
              rotation: (i) => (i % 2 ? -3 : 3),
              ease: "none",
              stagger: 0.015,
              scrollTrigger: {
                trigger: ".nh-world",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
          gsap.fromTo(
            ".nh-tree-image",
            { scale: 0.93 },
            {
              scale: 1.035,
              ease: "none",
              scrollTrigger: {
                trigger: ".nh-tree-canopy",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        }, el);
        return () => ctx.revert();
      });
      cleanup = () => media.revert();
    });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [paused]);
  function submitSearch(e: FormEvent) {
    e.preventDefault();
    const q = search.trim();
    if (q) void navigate({ to: "/search", search: { q } });
  }
  return (
    <div id="bbi-home" ref={root} className={paused ? "nh-motion-paused" : ""}>
      <main id="main-content">
        <section className="nh-hero" aria-labelledby="nh-hero-title">
          <div className="nh-hero-inner">
            <div className="nh-dark-badge nh-hero-reveal">
              <span className="nh-live-dot" />
              {catalog.totalIdeas} researched ideas. Yours to explore.
            </div>
            <h1 id="nh-hero-title" className="nh-hero-reveal">
              From what if,
              <br />
              <span>to what’s next.</span>
            </h1>
            <p className="nh-hero-subtitle nh-hero-reveal">
              Business ideas. With the honest research.
            </p>
            <p className="nh-hero-description nh-hero-reveal">
              Who will pay you. How the money works. What could go wrong.
              <br className="nh-desktop-break" /> Find your starting point, before you spend your
              savings.
            </p>
            <form className="nh-hero-prompt nh-hero-reveal" onSubmit={submitSearch}>
              <Search size={20} />
              <label className="nh-sr" htmlFor="nh-hero-search">
                Search business ideas
              </label>
              <input
                id="nh-hero-search"
                type="search"
                placeholder="What would you love to start?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" aria-label="Search ideas">
                <ArrowUpRight size={20} />
              </button>
            </form>
            <div className="nh-hero-reassurance nh-hero-reveal">
              <span>Free to browse</span>
              <i>✳</i>
              <span>No account needed</span>
              <i>✳</i>
              <a href="#surprise-me">
                Or let us surprise you <Shuffle size={13} />
              </a>
            </div>
          </div>
          <a href="#how-it-works" className="nh-scroll-cue">
            A little less guessing <ArrowDown size={15} />
          </a>
        </section>
        <ResearchJourney idea={picks[0]} paused={paused} />
        <div className="nh-values-strip" aria-label="Our research principles">
          <span>Research over hype</span>
          <i>✳</i>
          <span>Real-world business ideas</span>
          <i>✳</i>
          <span>The hard parts included</span>
          <i>✳</i>
          <span>Your call. Always.</span>
        </div>
        <CategoryWorld categories={catalog.categories} />
        <Discovery categories={catalog.categories} />
        <GoldenTree catalog={catalog} />
        <OperatorToolkitSection />
        <section className="nh-featured nh-container" aria-labelledby="nh-featured-title">
          <div className="nh-section-heading nh-heading-left" data-home-reveal>
            <div>
              <p className="nh-eyebrow">A few places to begin</p>
              <h2 id="nh-featured-title">
                Worth your curiosity.
                <br />
                <span>Not just your click.</span>
              </h2>
            </div>
            <Link to="/browse" className="nh-text-link">
              The whole library <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="nh-blueprint-grid">
            {picks.map((idea, i) => (
              <BlueprintCard idea={idea} index={i} key={idea.ideaId} />
            ))}
          </div>
        </section>
        <section className="nh-promise nh-container" aria-labelledby="nh-promise-title">
          <div className="nh-promise-copy" data-home-reveal>
            <p className="nh-eyebrow">The BBI difference</p>
            <h2 id="nh-promise-title">
              Not here to sell you a dream.
              <br />
              <span>Here to hand you the research.</span>
            </h2>
            <p>
              We built this for the person searching “business ideas” on a phone at 1am. No team. No
              funding. Just the feeling that there has to be something more.
            </p>
            <p>
              We’ve been there too. You deserve a useful starting point, not another recycled list.
            </p>
            <Link to="/about" className="nh-text-link">
              Why we built BBI <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="nh-promise-table">
            <div className="nh-promise-table-head">
              <span>Your questions</span>
              <span>Inside a BBI blueprint</span>
            </div>
            {CHAPTERS.map((c, i) => (
              <div key={c.label}>
                <span>
                  <small>0{i + 1}</small>
                  {c.short}
                </span>
                <span>
                  <Check size={17} />
                  {c.note}
                </span>
              </div>
            ))}
            <div className="nh-promise-table-foot">
              <Sprout size={20} /> You bring the curiosity. We bring the homework.
            </div>
          </div>
        </section>
        <section className="nh-faq nh-container" aria-labelledby="nh-faq-title">
          <div className="nh-section-heading" data-home-reveal>
            <h2 id="nh-faq-title">
              Big questions?
              <br />
              <span>Straight answers.</span>
            </h2>
          </div>
          <div className="nh-faq-list">
            {FAQS.map((item, i) => (
              <div className={`nh-faq-item ${faq === i ? "is-open" : ""}`} key={item.q}>
                <h3>
                  <button
                    id={`nh-faq-button-${i}`}
                    aria-expanded={faq === i}
                    aria-controls={`nh-faq-answer-${i}`}
                    onClick={() => setFaq(faq === i ? null : i)}
                  >
                    {item.q}
                    {faq === i ? <Minus size={21} /> : <Plus size={21} />}
                  </button>
                </h3>
                <div
                  className="nh-faq-answer"
                  id={`nh-faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`nh-faq-button-${i}`}
                  hidden={faq !== i}
                >
                  <p>{item.a}</p>
                  {i === 1 && (
                    <Link to="/pricing">
                      View access options <ArrowUpRight size={15} />
                    </Link>
                  )}
                  {i === 5 && (
                    <Link to="/contact">
                      Get in touch <ArrowUpRight size={15} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="nh-closing">
          <div className="nh-closing-symbol" aria-hidden="true">
            <Sprout size={58} strokeWidth={1.2} />
          </div>
          <div data-home-reveal>
            <p className="nh-eyebrow">The next chapter is yours</p>
            <h2>
              You bring the what if.
              <br />
              <span>We’ll bring the way in.</span>
            </h2>
            <Link className="nh-button" to="/browse">
              Find your next idea <ArrowUpRight size={19} />
            </Link>
            <p>Start small. Stay curious. Make it yours.</p>
          </div>
          <div className="nh-closing-tags" aria-hidden="true">
            <span>Something on the side</span>
            <span>A fresh start</span>
            <span>A little more freedom</span>
            <span>Something of your own</span>
          </div>
        </section>
      </main>
    </div>
  );
}
