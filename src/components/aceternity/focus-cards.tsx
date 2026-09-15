import { Link } from "@tanstack/react-router";
import { memo, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";

import { cn, hideImgIfBroken } from "@/lib/utils";
import { useElementPointerGroup, useStaggerReveal } from "@/motion";
import "@/components/catalog-ui.css";

export type FocusCard = {
  title: string;
  meta?: string;
  src?: string;
  alt?: string;
  to: string;
  params: Record<string, string>;
};

/**
 * FocusCards — Aceternity UI, ported to this stack.
 *
 * Gallery comparison stays still while one delegated pointer listener lights
 * the active card. The existing photographs stay inside a fixed media slot.
 */
const Card = memo(function Card({ card }: { card: FocusCard }) {
  return (
    <Link
      to={card.to}
      params={card.params}
      className="mo-card catalog-category-card group relative block h-64 w-full overflow-hidden sm:h-72"
    >
      <div className="mo-media catalog-category-media absolute inset-0">
        {card.src ? (
          <img
            src={card.src}
            alt={card.alt ?? ""}
            loading="lazy"
            decoding="async"
            ref={hideImgIfBroken}
            onError={(event) => hideImgIfBroken(event.currentTarget)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
      </div>
      <div className="catalog-category-shade absolute inset-0" />
      <div className="catalog-category-caption absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
        <div className="flex min-w-0 flex-col gap-2">
          <span className="text-xl font-semibold leading-snug tracking-tight">{card.title}</span>
          {card.meta ? (
            <span className="text-[11px] uppercase tracking-[0.18em] opacity-80">{card.meta}</span>
          ) : null}
        </div>
        <ArrowUpRight className="catalog-category-arrow h-5 w-5 shrink-0" aria-hidden="true" />
      </div>
    </Link>
  );
});

export default function FocusCards({
  cards,
  className,
}: {
  cards: FocusCard[];
  className?: string;
}) {
  const pointerRef = useElementPointerGroup<HTMLDivElement>(".mo-card");
  const revealRef = useStaggerReveal<HTMLDivElement>({
    selector: ".mo-card",
    stagger: 0.03,
    distance: 12,
  });
  const gridRef = useCallback(
    (node: HTMLDivElement | null) => {
      pointerRef.current = node;
      revealRef.current = node;
    },
    [pointerRef, revealRef],
  );

  return (
    <div
      ref={gridRef}
      className={cn("catalog-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}
    >
      {cards.map((card) => (
        <Card key={card.title} card={card} />
      ))}
    </div>
  );
}
