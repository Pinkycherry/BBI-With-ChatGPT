import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { IconType } from "react-icons";
import { SiClaude, SiPerplexity, SiGooglegemini } from "react-icons/si";
import { RiOpenaiFill, RiGrokAiFill } from "react-icons/ri";
import { VALIDATE_PLATFORMS, type ValidatePlatform } from "@/lib/validate-shared";
import { useAuth } from "@/hooks/use-auth";
import { PaywallPopup } from "@/components/paywall-popup";
import { Spotlight } from "@/components/spotlight";
import { usePillInteraction } from "@/hooks/use-pill-interaction";
import { ValidateContextInput } from "@/components/validate-context-input";
import { useMagnet } from "@/motion";

const PLATFORM_ICONS: Record<ValidatePlatform, IconType> = {
  gemini: SiGooglegemini,
  claude: SiClaude,
  perplexity: SiPerplexity,
  grok: RiGrokAiFill,
  chatgpt: RiOpenaiFill,
};

function PlatformButton({
  platform,
  isOpening,
  disabled,
  primary = false,
  onSelect,
}: {
  platform: (typeof VALIDATE_PLATFORMS)[number];
  isOpening: boolean;
  disabled: boolean;
  primary?: boolean;
  onSelect: (id: ValidatePlatform) => void;
}) {
  const pill = usePillInteraction<HTMLButtonElement>();
  const magnetRef = useMagnet<HTMLButtonElement>();
  const Icon = PLATFORM_ICONS[platform.id];
  const motionProps = primary
    ? { ref: magnetRef }
    : {
        ref: pill.ref,
        onMouseEnter: pill.onMouseEnter,
        onMouseLeave: pill.onMouseLeave,
        onPointerDown: pill.onPointerDown,
        onPointerUp: pill.onPointerUp,
      };

  return (
    <Spotlight className="inline-block rounded-full">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onSelect(platform.id)}
        {...motionProps}
        className="glass-pill inline-flex items-center gap-2.5 rounded-md px-6 py-3 text-sm font-semibold disabled:cursor-wait disabled:opacity-70"
      >
        <Icon aria-hidden className="h-5 w-5 shrink-0" />
        <span>{isOpening ? "Opening…" : `Continue with ${platform.label}`}</span>
      </button>
    </Spotlight>
  );
}

export function ValidateButton({ 
  ideaPath, 
  getUrl 
}: { 
  ideaPath: string;
  getUrl: (platform: ValidatePlatform, context: string) => string;
}) {
  const auth = useAuth();
  const navigate = useNavigate();
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [context, setContext] = useState("");

  const handleSelect = (platform: ValidatePlatform) => {
    if (auth.status === "anonymous") {
      navigate({ to: "/sign-in", search: { redirect: ideaPath } });
      return;
    }
    if (auth.status === "authenticated" && auth.hasActivePlan) {
      const url = getUrl(platform, context.trim());
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    setPaywallOpen(true);
  };

  const buttonsDisabled = auth.status === "loading";

  return (
    <section className="glass mt-10 rounded-3xl px-5 py-7 sm:px-8">
      <p className="t-eyebrow">Free · no extra cost, no limit</p>
      <h2 className="mt-2 font-display text-xl font-bold tracking-tight">Validate this idea</h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
        We do not charge for validation. You get a fully researched write-up on this idea — free,
        using AI tools you already pay for, as many times as you want.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        {VALIDATE_PLATFORMS.map((platform, i) => (
          <PlatformButton
            key={platform.id}
            platform={platform}
            isOpening={false}
            disabled={buttonsDisabled}
            primary={i === 0}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <div className="mt-5">
        <ValidateContextInput value={context} onChange={setContext} disabled={buttonsDisabled} />
      </div>

      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
        Pick one above and your research opens in a new tab with everything filled in — just hit
        enter. Not signed in there yet? Sign in, then tap Validate again.
      </p>

      <PaywallPopup open={paywallOpen} onOpenChange={setPaywallOpen} />
    </section>
  );
}
