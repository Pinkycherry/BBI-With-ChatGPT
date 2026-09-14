import { createClient } from "@supabase/supabase-js";

/**
 * SINGLE SOURCE OF TRUTH for the browser Supabase client. Unlike db() in
 * ideas.functions.ts (server-only, no session storage), this one persists a
 * session in the browser — it's what Google sign-in and the plan-gate
 * actually run on. Uses the public anon key, which is safe to ship to the
 * browser: RLS on public.profiles is what actually enforces access.
 */
const supabaseUrl =
  (import.meta.env["VITE_IDEAVAULT_DB_URL"] as string) || "https://placeholder.supabase.co";
const supabaseAnonKey =
  (import.meta.env["VITE_IDEAVAULT_DB_ANON_KEY"] as string) || "placeholder-anon-key";

export const authClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: "pkce",
  },
});

/**
 * redirectTo must be an absolute URL back into this app (Supabase rejects/
 * falls back otherwise). Callers pass where the user actually was — never
 * omit it, or Google drops them back on whatever page called this function
 * (e.g. /sign-in itself) instead of where they started.
 */
export async function signInWithGoogle(redirectTo: string) {
  return authClient.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  });
}

export async function signOut() {
  return authClient.auth.signOut();
}
