import { Lock } from "lucide-react";
import { type IdeaDetail } from "@/lib/ideas-shared";

export function LockedResearchBlock({ idea }: { idea: IdeaDetail }) {
  const fields = [
    { heading: "Why this still works right now" },
    { heading: "Who actually opens their wallet" },
    { heading: "Exactly how the cash arrives" },
    { heading: "Why you can beat the obvious version" },
    { heading: "What you really need to begin" },
    { heading: "What the money looks like early vs later" },
    { heading: "First moves that actually get you paid" },
    { heading: "The real tools (nothing fancy)" },
    { heading: "How long until the first real payment" },
    { heading: "Straight answers to the real doubts" },
  ];

  return (
    <section className="relative pt-6" data-anchor="research" data-anchor-label="Research">
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background/20 backdrop-blur-[2px] text-center p-6 rounded-2xl">
        <div className="glass px-6 py-4 rounded-2xl flex flex-col items-center">
          <Lock className="h-8 w-8 text-accent mb-2" aria-hidden />
          <h3 className="text-lg font-bold text-foreground">Research locked</h3>
          <p className="mt-1 text-sm text-muted-foreground max-w-sm">
            Unlock with Validate at the bottom of this page to generate the full researched report.
          </p>
          <a
            href="#validate"
            className="mt-4 ac-cta px-5 py-2.5 text-xs uppercase tracking-widest inline-block"
          >
            Go to Validate
          </a>
        </div>
      </div>

      <div className="space-y-10 opacity-40 select-none pointer-events-none px-2 sm:px-6">
        {fields.map((field) => (
          <div key={field.heading} className="relative overflow-hidden">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {field.heading}
            </h2>
            <div className="mt-3 whitespace-pre-line leading-relaxed blur-[8px] text-sm md:text-base">
              {
                "This is a placeholder research text that spans multiple lines to show the user what they are missing when they unlock this section using the Validate button. It will be replaced by the LLM in the new tab."
              }
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
