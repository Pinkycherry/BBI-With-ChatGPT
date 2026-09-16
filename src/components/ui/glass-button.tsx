import * as React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface GlassButtonProps extends Omit<ButtonProps, "variant"> {
  /**
   * `light` — frosted white glass, for primary CTAs.
   * `dark` — frosted violet glass (the pre-existing `.glass-btn` system),
   * for secondary or featured CTAs. Both share the same press/hover physics
   * via `usePillInteraction` inside `Button` — this component only picks
   * which glass tone renders, it does not own any motion itself.
   */
  tone?: "light" | "dark";
  /**
   * Adds the coloured edge-glow from the reference's floating "featured"
   * cards. Only meaningful with `tone="dark"`. Use on 1-2 CTAs per page at
   * most — it is a "this one matters most" signal, not a default.
   */
  glow?: boolean;
}

/**
 * Liquid-glass CTA button. Wraps the existing `Button` rather than
 * introducing a parallel component: same `usePillInteraction` press/hover
 * spring, same disabled handling, same `asChild` support. The only thing
 * this adds is picking the glass tone and, optionally, the edge-glow.
 */
export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ tone = "light", glow = false, className, ...props }, ref) => (
    <Button
      ref={ref}
      variant={tone === "dark" ? "secondary" : "default"}
      className={cn(tone === "dark" && glow && "glass-btn-glow", className)}
      {...props}
    />
  ),
);
GlassButton.displayName = "GlassButton";
