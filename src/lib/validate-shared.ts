export type ValidatePlatform = "claude" | "perplexity" | "gemini" | "grok" | "chatgpt";

export const VALIDATE_PLATFORMS: { id: ValidatePlatform; label: string }[] = [
  { id: "gemini", label: "Gemini" },
  { id: "claude", label: "Claude" },
  { id: "perplexity", label: "Perplexity" },
  { id: "grok", label: "Grok" },
  { id: "chatgpt", label: "ChatGPT" },
];

/**
 * Ceiling on the optional user-supplied context box (validate-context-input.tsx).
 * Shared between client (char counter, `maxLength`) and server (input
 * validator in validate.functions.ts) so the two never drift apart.
 */
export const VALIDATE_CONTEXT_MAX_LENGTH = 600;
