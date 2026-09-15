/**
 * Reveal entering children in short batches. Content remains readable while
 * the motion chunk downloads or if it fails; long grids never wait on one
 * page-length stagger. Re-entry can replay without hiding content on exit.
 */
import { useEffect, useRef, type RefObject } from "react";

import { loadGsap } from "./gsap";
import { observeMotionPreference, preserveStyles } from "./preferences";

export type StaggerRevealDirection = "up" | "down" | "left" | "right" | "none";
export type StaggerRevealOptions = {
  selector?: string;
  distance?: number;
  direction?: StaggerRevealDirection;
  stagger?: number;
  duration?: number;
  delay?: number;
  start?: string;
  scaleFrom?: number;
};

const AXIS: Record<StaggerRevealDirection, (d: number) => gsap.TweenVars> = {
  up: (d) => ({ y: d }),
  down: (d) => ({ y: -d }),
  left: (d) => ({ x: d }),
  right: (d) => ({ x: -d }),
  none: () => ({}),
};

export function useStaggerReveal<T extends HTMLElement = HTMLElement>(
  options: StaggerRevealOptions = {},
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const {
    selector, distance = 18, direction = "up", stagger = 0.06,
    duration = 0.55, delay = 0, start = "top 85%", scaleFrom = 1,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = selector
      ? Array.from(el.querySelectorAll<HTMLElement>(selector))
      : (Array.from(el.children) as HTMLElement[]);
    if (!items.length) return;
    const settle = () => items.forEach((item) => item.setAttribute("data-revealed", ""));

    return observeMotionPreference(() => {
      let cancelled = false;
      let triggers: import("gsap/ScrollTrigger").ScrollTrigger[] = [];
      const tweens = new Set<gsap.core.Tween>();
      const playing = new Set<Element>();
      const restore = preserveStyles(items, ["opacity", "transform", "will-change"]);

      loadGsap().then(({ gsap, ScrollTrigger }) => {
        if (cancelled) return;
        const reveal = (batch: Element[]) => {
          if (cancelled) return;
          const targets = batch.filter((item) => !playing.has(item)) as HTMLElement[];
          if (!targets.length) return;
          targets.forEach((item) => playing.add(item));
          const restoreBatch = preserveStyles(targets, ["opacity", "transform", "will-change"]);
          const tween = gsap.fromTo(targets,
            { opacity: 0, scale: scaleFrom, ...AXIS[direction](distance) },
            {
              opacity: 1, x: 0, y: 0, scale: 1, duration, delay,
              // The final child begins within 240ms even in a dense grid.
              stagger: { amount: Math.min(0.24, Math.max(0, stagger) * (targets.length - 1)) },
              ease: "power3.out",
              onComplete: function (this: gsap.core.Tween) {
                restoreBatch();
                targets.forEach((item) => {
                  item.setAttribute("data-revealed", "");
                  playing.delete(item);
                });
                tweens.delete(this);
              },
            },
          );
          tweens.add(tween);
        };
        triggers = ScrollTrigger.batch(items, {
          start, interval: 0.05, batchMax: 12,
          onEnter: reveal,
          onEnterBack: reveal,
        });
      }).catch(() => {
        if (!cancelled) {
          triggers.forEach((trigger) => trigger.kill());
          tweens.forEach((tween) => tween.kill());
          restore();
          settle();
        }
      });

      return () => {
        cancelled = true;
        triggers.forEach((trigger) => trigger.kill());
        tweens.forEach((tween) => tween.kill());
        restore();
      };
    }, { settle });
  }, [selector, distance, direction, stagger, duration, delay, start, scaleFrom]);

  return ref;
}
