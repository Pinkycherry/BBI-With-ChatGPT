import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
  useRouter,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { Header } from "@/components/bbi/header";
import { Footer } from "@/components/bbi/footer";
import { useElementPointerGroup } from "@/motion";
import "../styles.css";

function NotFoundComponent() {
  return (
    <div className="bbi-page error-state">
      <p className="eyebrow">Page not found</p>
      <h1 className="page-heading">A different branch.</h1>
      <p className="muted">This page is not in the library. Find your next starting point below.</p>
      <a className="button button-primary" href="/browse">
        <ArrowLeft size={16} aria-hidden="true" />
        Explore the library
      </a>
    </div>
  );
}

function ErrorComponent({ reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="bbi-page error-state">
      <p className="eyebrow">Something interrupted this page</p>
      <h1 className="page-heading">Let's try that again.</h1>
      <p className="muted">The page could not finish loading.</p>
      <button
        className="button button-primary"
        onClick={() => {
          void router.invalidate();
          reset();
        }}
      >
        <RefreshCw size={16} aria-hidden="true" />
        Try again
      </button>
      <a href="/browse" className="text-link">
        Return to the library
      </a>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "BBI — Business ideas, honestly researched | businessidea.io" },
      {
        name: "description",
        content:
          "A free library of 290 researched business-idea blueprints across 14 categories. Who pays, how the money works, what hurts, and an honest founder-fit verdict.",
      },
      { name: "theme-color", content: "#f4f7fc" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;550;600;650;700&family=IBM+Plex+Mono:wght@400;500&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const glassPointerRef = useElementPointerGroup<HTMLDivElement>(".glass-panel, .home-library, .home-category");
  return (
    <QueryClientProvider client={queryClient}>
      <div ref={glassPointerRef} className="site-frame">
        <Header />
        <noscript>
          <div className="noscript-note">
            You're viewing the static library. <a href="/browse">Browse categories</a>
            <a href="/faq">Read common questions</a>
          </div>
        </noscript>
        <main id="main-content" className="site-main" tabIndex={-1}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
