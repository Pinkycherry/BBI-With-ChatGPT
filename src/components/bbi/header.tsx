import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown, Menu, Moon, Search, Sprout, Sun } from "lucide-react";
import { CATEGORIES, CATEGORY_GROUPS } from "./catalog";

export function Brand() {
  return (
    <a href="/" className="brand" aria-label="BBI, businessidea.io home">
      <span className="brand-mark">
        <Sprout size={24} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <span>
        <span className="brand-name">bbi.</span>
        <span className="brand-domain">businessidea.io</span>
      </span>
    </a>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bbi-theme");
      const isDark = saved === "dark";
      document.documentElement.dataset["theme"] = isDark ? "dark" : "light";
      setDark(isDark);
    } catch {
      /* Storage is optional; the default theme remains readable. */
    }
  }, []);
  return (
    <button
      className="icon-button"
      type="button"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => {
        const next = !dark;
        setDark(next);
        document.documentElement.dataset["theme"] = next ? "dark" : "light";
        try {
          localStorage.setItem("bbi-theme", next ? "dark" : "light");
        } catch {
          /* Theme works without persistence. */
        }
      }}
    >
      {dark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
    </button>
  );
}

export function Header() {
  const details = useRef<HTMLDetailsElement>(null);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !details.current?.contains(event.target) &&
        details.current
      )
        details.current.open = false;
    };
    const closeEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && details.current?.open) {
        details.current.open = false;
        details.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeEscape);
    };
  }, []);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="header-navigation" aria-label="Main navigation">
          <details
            className="browse-menu"
            ref={details}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse" && details.current) details.current.open = true;
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse" && details.current && !details.current.matches(":focus-within")) {
                details.current.open = false;
              }
            }}
          >
            <summary>
              <span className="desktop-label">Browse ideas</span>
              <span className="mobile-label">
                <Menu size={16} aria-hidden="true" />
                Menu
              </span>
              <ChevronDown size={13} aria-hidden="true" />
            </summary>
            <div className="menu-panel">
              <div className="menu-top">
                <span className="eyebrow">Find your starting point</span>
                <a href="/browse" className="text-link">
                  All 14 categories{" "}
                  <ArrowUpRight size={13} style={{ display: "inline" }} aria-hidden="true" />
                </a>
              </div>
              <div className="menu-groups">
                {CATEGORY_GROUPS.map((group) => (
                  <section key={group}>
                    <h2>{group}</h2>
                    {CATEGORIES.filter((category) => category.group === group).map((category) => (
                      <a key={category.category_slug} href={`/category/${category.category_slug}`}>
                        {category.category_name}
                      </a>
                    ))}
                  </section>
                ))}
              </div>
              <div className="mobile-menu-links">
                <a href="/search">Search</a>
                <a href="/list">Reading lists</a>
                <a href="/calculator">Free tools</a>
                <a href="/about">Our approach</a>
                <a href="/faq">FAQ</a>
              </div>
            </div>
          </details>
          {[
            { href: "/list", label: "Reading lists" },
            { href: "/calculator", label: "Free tools" },
            { href: "/about", label: "Our approach" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={pathname.startsWith(item.href) ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <span className="header-status">
            <span className="status-dot" />
            Always free to explore
          </span>
          <a
            className="icon-button header-search-link"
            href="/search"
            aria-label="Search the library"
          >
            <Search size={17} aria-hidden="true" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
