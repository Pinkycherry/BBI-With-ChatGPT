import { useEffect, type RefObject } from "react";

import { loadGsap, prefersReducedMotion } from "@/motion";

/**
 * Scroll choreography for the existing homepage composition. Every tween is
 * transform-only, so the authored copy remains readable before and after the
 * optional GSAP chunk arrives.
 */
export function useHomeMotion(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let cancelled = false;
    let revert = () => {};

    loadGsap()
      .then(({ gsap }) => {
        if (cancelled || !rootRef.current) return;
        const root = rootRef.current;
        const media = gsap.matchMedia();
        media.add("(prefers-reduced-motion: no-preference)", () => {
          const context = gsap.context(() => {
            const hero = root.querySelector<HTMLElement>(".home-hero");
            const tree = root.querySelector<HTMLElement>(".bbi-tree-hero");
            const library = root.querySelector<HTMLElement>(".home-library");
            const answers = root.querySelector<HTMLElement>(".bbi-answer-section");
            const editorial = root.querySelector<HTMLElement>(".home-editorial");

            if (hero && tree) {
              gsap.to(tree, {
                y: -34,
                rotateZ: 1.2,
                ease: "none",
                scrollTrigger: {
                  trigger: hero,
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.8,
                },
              });
            }
            if (library) {
              gsap.to(library, {
                y: -18,
                ease: "none",
                scrollTrigger: {
                  trigger: library,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.9,
                },
              });
            }
            if (answers) {
              gsap.to(answers, {
                y: -24,
                ease: "none",
                scrollTrigger: {
                  trigger: answers,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.9,
                },
              });
            }
            if (editorial) {
              gsap.to(editorial, {
                y: -30,
                ease: "none",
                scrollTrigger: {
                  trigger: editorial,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              });
            }
          }, root);
          return () => context.revert();
        });
        revert = () => media.revert();
      })
      .catch(() => {
        // The fully authored page remains the fallback when GSAP is unavailable.
      });

    return () => {
      cancelled = true;
      revert();
    };
  }, [rootRef]);
}
