import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { loadGsap } from "@/lib/motion";
import { Odometer } from "@/motion";

const answers = [
  {
    label: "The buyer",
    title: "Who will actually pay you?",
    body: "A specific person with a specific problem. Every blueprint starts with the customer, before it starts with the dream.",
  },
  {
    label: "The money",
    title: "How does the money work?",
    body: "What you charge. What it costs. How money changes hands. The mechanics behind the idea, without an income promise.",
  },
  {
    label: "The risks",
    title: "What could hurt in year one?",
    body: "The hidden costs, difficult trade-offs and obstacles people discover too late. The hard parts belong in the blueprint.",
  },
  {
    label: "The verdict",
    title: "Build it. Or walk away.",
    body: "A straight answer about founder fit. Sometimes the most valuable research is the research that saves you from the wrong idea.",
  },
];

export function SeedExperience({
  totalIdeas,
  categoryCount,
}: {
  totalIdeas: number;
  categoryCount: number;
}) {
  const root = useRef<HTMLElement>(null);
  const sculpture = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [motionPaused, setMotionPaused] = useState(false);

  useEffect(() => {
    let disposed = false;
    let revert: (() => void) | undefined;
    if (motionPaused) return;
    void loadGsap(true)
      .then((gsap) => {
        if (disposed || !root.current) return;
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          const context = gsap.context(() => {
            gsap.from(".seed-copy > *", {
              y: 24,
              duration: 1,
              stagger: 0.075,
              ease: "power3.out",
              clearProps: "transform",
            });
            gsap.to(".seed-art-scroll", {
              yPercent: 15,
              rotation: 12,
              scale: 1.13,
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.7,
              },
            });
            gsap.to(".seed-orbit", {
              rotationZ: 150,
              rotationX: 56,
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });
          }, root);
          return () => context.revert();
        });
        revert = () => mm.revert();
      })
      .catch(() => {
        /* The full static composition remains usable. */
      });
    return () => {
      disposed = true;
      revert?.();
    };
  }, [motionPaused]);

  const choose = (next: number) => setActive((next + answers.length) % answers.length);
  return (
    <section
      id="hero"
      data-anchor="hero"
      data-anchor-label="Top"
      className="seed-experience"
      ref={root}
      data-paused={motionPaused}
    >
      <div className="seed-topline">
        <span>BUSINESS IDEAS. GROUNDED IN RESEARCH.</span>
        <span>INDIA FIRST. BUILT FOR THE WORLD.</span>
      </div>
      <div className="seed-hero-grid">
        <div className="seed-copy">
          <p className="seed-eyebrow">
            <span /> The truth about business ideas
          </p>
          <h1>
            Tired of paying just to check if your <em>idea will work?</em>
          </h1>
          <p className="seed-lead">Keep your money for the business.</p>
          <p className="seed-description">
            Real buyers. Honest numbers. The risks nobody mentions. Research your next move before
            you spend your savings.
          </p>
          <div className="seed-actions">
            <Link to="/browse" className="seed-primary">
              Browse the library <span aria-hidden="true">↗</span>
            </Link>
            <Link to="/search" search={{ q: "" }} className="seed-secondary">
              Find an idea <span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className="seed-assurance">Free to browse. No credit card required.</p>
          <dl className="seed-stats">
            <div>
              <dd>
                <Odometer value={totalIdeas} format={(n) => `${Math.round(n)}`} />
              </dd>
              <dt>researched blueprints</dt>
            </div>
            <div>
              <dd>
                <Odometer value={categoryCount} format={(n) => `${Math.round(n)}`} />
              </dd>
              <dt>live categories</dt>
            </div>
            <div>
              <dd>₹0</dd>
              <dt>to start exploring</dt>
            </div>
          </dl>
        </div>
        <figure
          className="seed-art"
          onPointerMove={(event) => {
            if (
              motionPaused ||
              event.pointerType !== "mouse" ||
              window.matchMedia("(prefers-reduced-motion: reduce)").matches
            )
              return;
            const rect = event.currentTarget.getBoundingClientRect();
            sculpture.current?.style.setProperty(
              "--tilt-x",
              `${((event.clientY - rect.top) / rect.height - 0.5) * -12}deg`,
            );
            sculpture.current?.style.setProperty(
              "--tilt-y",
              `${((event.clientX - rect.left) / rect.width - 0.5) * 18}deg`,
            );
          }}
          onPointerLeave={() => {
            sculpture.current?.style.setProperty("--tilt-x", "0deg");
            sculpture.current?.style.setProperty("--tilt-y", "0deg");
          }}
        >
          <div className="seed-art-scroll">
            <div ref={sculpture} className="seed-sculpture">
              <img
                src="/images/home/golden-seed-business-idea-research-growth-sculpture.webp"
                width="960"
                height="960"
                fetchPriority="high"
                alt="Golden sculpture unfolds upward."
              />
              <div className="seed-orbit" aria-hidden="true" />
              <div className="seed-orbit seed-orbit-two" aria-hidden="true" />
            </div>
          </div>
          <figcaption>
            <span>01 / THE BEGINNING</span>
            <span>An idea is only the seed.</span>
          </figcaption>
          <button
            className="seed-motion"
            aria-pressed={motionPaused}
            onClick={() => setMotionPaused((value) => !value)}
          >
            {motionPaused ? "Resume sculpture motion" : "Pause sculpture motion"}
          </button>
        </figure>
      </div>
      <div className="seed-research">
        <div className="seed-research-intro">
          <p className="seed-eyebrow">What you get</p>
          <h2>
            Four honest answers.
            <br />
            <em>Before your first move.</em>
          </h2>
          <p>
            This is not a list. This is the research you wish someone gave you before you spent your
            time or money.
          </p>
        </div>
        <div className="seed-deck" style={{ "--active-card": active } as CSSProperties}>
          <div role="tablist" aria-label="Inside every blueprint" className="seed-tabs">
            {answers.map((answer, index) => (
              <button
                key={answer.label}
                type="button"
                role="tab"
                id={`seed-tab-${index}`}
                aria-controls="seed-answer"
                aria-selected={active === index}
                tabIndex={active === index ? 0 : -1}
                onClick={() => choose(index)}
                onKeyDown={(event) => {
                  let next = index;
                  if (event.key === "ArrowRight") next = (index + 1) % 4;
                  else if (event.key === "ArrowLeft") next = (index + 3) % 4;
                  else if (event.key === "Home") next = 0;
                  else if (event.key === "End") next = 3;
                  else return;
                  event.preventDefault();
                  choose(next);
                  document.getElementById(`seed-tab-${next}`)?.focus();
                }}
              >
                <span>0{index + 1}</span>
                {answer.label}
              </button>
            ))}
          </div>
          <div className="seed-card-stack">
            <div className="seed-card-shadow" aria-hidden="true" />
            <div
              className="seed-card"
              id="seed-answer"
              role="tabpanel"
              aria-labelledby={`seed-tab-${active}`}
              tabIndex={0}
            >
              <span className="seed-card-number" aria-hidden="true">
                0{active + 1}
              </span>
              <div key={active} className="seed-card-copy">
                <p className="seed-eyebrow">THE BLUEPRINT / 0{active + 1}</p>
                <h3>{answers[active]!.title}</h3>
                <p>{answers[active]!.body}</p>
              </div>
              <span className="seed-card-foot">RESEARCH FIRST. DECIDE FOR YOURSELF.</span>
            </div>
          </div>
        </div>
      </div>
      <div className="seed-how">
        <span className="seed-eyebrow">How it works</span>
        <p>
          Browse a category. Find your starting point. Sign in to read the full blueprint. Unlock
          validation with ₹199 for 3 months or ₹399 for lifetime access — then validate using your
          own AI account, without a per-validation charge from BBI.
        </p>
        <Link to="/pricing">
          See access options <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}

/** Applies depth only to existing homepage surfaces, never to shared pages. */
export function HomepageDepth() {
  useEffect(() => {
    let disposed = false;
    let revert: (() => void) | undefined;
    void loadGsap(true)
      .then((gsap) => {
        if (disposed) return;
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference) and (min-width: 900px)", () => {
          const context = gsap.context(() => {
            gsap.fromTo(
              "#golden-tree .tree-asset-container",
              { scale: 0.86, rotationX: 13 },
              {
                scale: 1.03,
                rotationX: 0,
                transformPerspective: 1000,
                ease: "none",
                scrollTrigger: {
                  trigger: "#golden-tree",
                  start: "top bottom",
                  end: "center center",
                  scrub: 0.8,
                },
              },
            );
            gsap.utils
              .toArray<HTMLElement>(".seed-page > section:not(#hero):not(#golden-tree)")
              .forEach((section) => {
                gsap.from(section, {
                  y: 35,
                  duration: 0.8,
                  ease: "power2.out",
                  clearProps: "transform",
                  scrollTrigger: { trigger: section, start: "top 94%", once: true },
                });
              });
          });
          return () => context.revert();
        });
        revert = () => mm.revert();
      })
      .catch(() => {});
    return () => {
      disposed = true;
      revert?.();
    };
  }, []);
  return null;
}
