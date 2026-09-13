import { createFileRoute } from "@tanstack/react-router";
import { SignInPage, secondaryMeta } from "@/components/bbi/secondary";

export const Route = createFileRoute("/sign-in")({
  head: () => secondaryMeta("Account access", "An account is never required to read the BBI library."),
  component: SignInPage,
});
