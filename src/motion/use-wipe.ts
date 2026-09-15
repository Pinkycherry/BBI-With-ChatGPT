/**
 * Directional media reveal using transform and opacity only. The public wipe
 * API is retained, but no animated clip-path or layout property is needed.
 * Content stays visible until the animation is ready and always flattens when
 * reduced motion is enabled, including a preference change during playback.
 */
import { useEffect, useRef, type RefObject } from "react";

import { loadGsap } from "./gsap";
import { observeMotionPreference, preserveStyles } from "./preferences";

export type WipeDirection = "up" | "down" | "left" | "right" | "iris";
const FROM: Record<WipeDirection, gsap.TweenVars> = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
  iris: { scale: 0.96 },
};
export type WipeOptions = {
  direction?: WipeDirection;
  duration?: number;
  delay?: number;
  start?: string;
};

export function useWipe<T extends HTMLElement = HTMLElement>(
  options: WipeOptions = {},
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const { direction = "up", duration = 0.9, delay = 0, start = "top 82%" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observeMotionPreference(() => {
      let cancelled = false;
      let context: gsap.Context | undefined;
      const restore = preserveStyles(
        [el],
        ["opacity", "transform", "translate", "rotate", "scale"],
      );
      loadGsap()
        .then(({ gsap }) => {
          if (cancelled) return;
          context = gsap.context(() => {});
          context.add(() => {
            gsap.fromTo(
              el,
              { opacity: 0, ...FROM[direction] },
              {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration,
                delay,
                ease: "power3.out",
                immediateRender: false,
                scrollTrigger: { trigger: el, start, toggleActions: "restart none restart none" },
                // Release the reveal's inline styles so CSS hover/parallax can
                // take over again after every playback.
                onComplete: restore,
              },
            );
          });
        })
        .catch(() => {
          if (!cancelled) {
            context?.revert();
            restore();
          }
        });
      return () => {
        cancelled = true;
        context?.revert();
        restore();
      };
    });
  }, [direction, duration, delay, start]);

  return ref;
}
