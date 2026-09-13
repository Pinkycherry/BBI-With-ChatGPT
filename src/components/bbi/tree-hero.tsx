import { lazy, Suspense, useEffect, useId, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  Coins,
  Fingerprint,
  MoveUpRight,
  Sprout,
  Users,
  ShieldAlert,
} from "lucide-react";

import "./tree-hero.css";

const TREE_IMAGE = "/images/home/golden-tree-business-ideas-growth-research.jpg";
const TreeGlowCanvas = lazy(() => import("./tree-glow-canvas"));

/** The original, self-hosted BBI artwork is always rendered by the server. */
export function TreeHero({ className = "" }: { className?: string }) {
  const scene = useRef<HTMLDivElement>(null);
  const dragOrigin = useRef<{ x: number; y: number } | null>(null);
  const active = useRef(true);
  const filterId = `tree-cutout-${useId().replace(/:/g, "")}`;
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(pointerX, { stiffness: 105, damping: 25, mass: 0.7 });
  const rotateX = useSpring(pointerY, { stiffness: 105, damping: 25, mass: 0.7 });

  useEffect(() => {
    const element = scene.current;
    if (!element) return;
    let inView = true;
    const stop = () => {
      active.current = inView && !document.hidden && !reducedMotion;
      if (!active.current) {
        pointerX.set(0);
        pointerY.set(0);
        rotateX.jump(0);
        rotateY.jump(0);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? false;
      stop();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", stop);
    stop();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", stop);
    };
  }, [pointerX, pointerY, reducedMotion, rotateX, rotateY]);

  function reset() {
    dragOrigin.current = null;
    pointerX.set(0);
    pointerY.set(0);
  }

  function move(event: PointerEvent<HTMLDivElement>) {
    if (!active.current || reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.pointerType === "touch") {
      if (!dragOrigin.current) return;
      const dx = (event.clientX - dragOrigin.current.x) / bounds.width;
      const dy = (event.clientY - dragOrigin.current.y) / bounds.height;
      pointerX.set(Math.max(-12, Math.min(12, dx * 38)));
      pointerY.set(Math.max(-7, Math.min(7, -dy * 20)));
    } else {
      pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 16);
      pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * -10);
    }
  }

  return (
    <div
      className={`bbi-tree-hero ${className}`}
      ref={scene}
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerUp={reset}
      onPointerCancel={reset}
      onPointerDown={(event) => {
        if (event.pointerType !== "touch" || reducedMotion) return;
        dragOrigin.current = { x: event.clientX, y: event.clientY };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
    >
      {/* Rendering-only luminance key preserves the supplied JPG unchanged. */}
      <svg className="bbi-tree-filter" aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  1 1 1 0 0" />
          </filter>
        </defs>
      </svg>
      <Suspense fallback={null}>
        <TreeGlowCanvas />
      </Suspense>
      <div className="bbi-tree-atmosphere" aria-hidden="true" />
      <motion.div
        className="bbi-tree-stage"
        style={{ rotateX: reducedMotion ? 0 : rotateX, rotateY: reducedMotion ? 0 : rotateY }}
      >
        <div className="bbi-tree-orbit bbi-tree-orbit-back" aria-hidden="true" />
        <div className="bbi-tree-orbit bbi-tree-orbit-front" aria-hidden="true" />
        <div className="bbi-tree-constellation" aria-hidden="true">
          <svg viewBox="0 0 600 450" fill="none">
            <path d="M75 155 170 95 300 120 437 78 530 170 465 282 315 346 158 296 75 155Z" />
            <path d="m75 155 225 165 230-150M170 95l130 225L437 78M158 296l142 24 165-38" />
            <circle cx="75" cy="155" r="4" />
            <circle cx="170" cy="95" r="4" />
            <circle cx="437" cy="78" r="4" />
            <circle cx="530" cy="170" r="4" />
            <circle cx="465" cy="282" r="4" />
            <circle cx="158" cy="296" r="4" />
          </svg>
        </div>
        <div className="bbi-tree-plinth bbi-tree-plinth-bottom" aria-hidden="true" />
        <div className="bbi-tree-plinth bbi-tree-plinth-middle" aria-hidden="true" />
        <div className="bbi-tree-plinth bbi-tree-plinth-top" aria-hidden="true">
          <span />
        </div>
        <div className="bbi-tree-gold-light" aria-hidden="true" />
        <img
          className="bbi-tree-art"
          src={TREE_IMAGE}
          alt="Golden business ideas tree with branching startup opportunities and deep research roots"
          width={1280}
          height={720}
          fetchPriority="high"
          decoding="async"
          draggable={false}
          style={{ filter: `url(#${filterId}) drop-shadow(0 12px 15px rgb(148 104 27 / 12%))` }}
        />
        {/* PLACEHOLDER: editorial tree captions; replace with final brand copy. */}
        <div className="bbi-tree-label bbi-tree-label-research">
          <span className="bbi-tree-label-icon">
            <Sprout size={17} strokeWidth={1.7} />
          </span>
          <span>
            <strong>Rooted in research</strong>
            <small>Real-world possibilities</small>
          </span>
          <ArrowUpRight size={14} aria-hidden="true" />
        </div>
        <div className="bbi-tree-label bbi-tree-label-ideas">
          <span className="bbi-tree-tiny-dot" />
          <strong>290 ideas. Your next chapter.</strong>
        </div>
        <div className="bbi-tree-label bbi-tree-label-verdict">
          <span className="bbi-tree-label-icon bbi-tree-label-icon-lilac">
            <BadgeCheck size={18} strokeWidth={1.7} />
          </span>
          <span>
            <strong>An honest verdict</strong>
            <small>Before you take the leap</small>
          </span>
        </div>
        <span className="bbi-tree-satellite bbi-tree-satellite-one" aria-hidden="true" />
        <span className="bbi-tree-satellite bbi-tree-satellite-two" aria-hidden="true" />
      </motion.div>
      {/* PLACEHOLDER: decorative artwork caption and no-script description. */}
      <div className="bbi-tree-caption">
        <span /> THE POSSIBILITY TREE <MoveUpRight size={12} aria-hidden="true" />
      </div>
      <noscript>
        <p className="bbi-tree-noscript">
          Explore 290 researched business ideas, rooted in an honest founder-fit verdict.
        </p>
      </noscript>
    </div>
  );
}

// PLACEHOLDER: explanatory captions for the brief's four required blueprint answers.
const ANSWERS = [
  {
    icon: Users,
    label: "Who pays you",
    detail: "A specific customer. A real problem.",
    color: "blue",
  },
  {
    icon: Coins,
    label: "How the money works",
    detail: "Costs, pricing, and the path to revenue.",
    color: "cyan",
  },
  {
    icon: ShieldAlert,
    label: "What will hurt",
    detail: "The hard parts of your first year.",
    color: "amber",
  },
  {
    icon: Fingerprint,
    label: "Is it right for you?",
    detail: "An honest verdict. Even if it's no.",
    color: "lilac",
  },
] as const;

/** A short desktop scroll chapter; the complete reading order is always visible. */
export function BlueprintScroll({ className = "" }: { className?: string }) {
  const wrapper = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [activeAnswer, setActiveAnswer] = useState(0);

  useEffect(() => {
    if (reducedMotion || !wrapper.current) return;
    const element = wrapper.current;
    let cancelled = false;
    let cleanup = () => {};

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const media = gsap.matchMedia();
        media.add(
          "(min-width: 1024px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)",
          () => {
            const cards = element.querySelectorAll<HTMLElement>(".bbi-answer-card");
            const progress = element.querySelector<HTMLElement>(".bbi-answer-progress-fill");
            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: element,
                start: "top 24%",
                end: "+=340",
                pin: true,
                pinSpacing: true,
                scrub: 0.65,
                invalidateOnRefresh: true,
                onUpdate: (self) => setActiveAnswer(Math.min(3, Math.floor(self.progress * 4))),
              },
            });
            timeline.fromTo(progress, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "none" });
            cards.forEach((card, index) => {
              timeline.to(card, { y: -8, duration: 0.2, ease: "sine.out" }, index * 0.25);
              if (index < cards.length - 1)
                timeline.to(card, { y: 0, duration: 0.16 }, index * 0.25 + 0.2);
            });
            return () => timeline.kill();
          },
        );
        cleanup = () => media.revert();
      })
      .catch(() => {
        // The static cards remain fully usable if the optional motion chunk fails.
      });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={wrapper}
      className={`bbi-answer-section ${className}`}
      aria-labelledby="blueprint-answers-heading"
    >
      {/* PLACEHOLDER: introductory section copy; the four-answer order is fixed. */}
      <div className="bbi-answer-heading">
        <div>
          <p className="bbi-answer-eyebrow">INSIDE EVERY BLUEPRINT</p>
          <h2 id="blueprint-answers-heading">The answers that actually matter.</h2>
        </div>
        <p>From the first customer to the final verdict.</p>
      </div>
      <div className="bbi-answer-progress" aria-hidden="true">
        <span className="bbi-answer-progress-fill" />
      </div>
      <ol className="bbi-answer-grid">
        {ANSWERS.map(({ icon: Icon, label, detail, color }, index) => (
          <li
            className={`bbi-answer-card bbi-answer-${color}`}
            data-active={index === activeAnswer}
            key={label}
          >
            <span className="bbi-answer-icon">
              <Icon size={20} strokeWidth={1.65} aria-hidden="true" />
            </span>
            <div>
              <h3>{label}</h3>
              <p>{detail}</p>
            </div>
            {index === ANSWERS.length - 1 ? (
              <BadgeCheck className="bbi-answer-verdict-icon" size={16} aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
