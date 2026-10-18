"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Appears once the page is scrolled past roughly one viewport.
 *
 * Scrolling is requested with an explicit `behavior` rather than relying on
 * CSS, because the global smooth scroll-behavior is deliberately scoped to
 * :target only — a global one makes Next.js animate its scroll reset on every
 * route change.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toTop() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      className={`back-to-top ${visible ? "back-to-top--visible" : ""}`}
      onClick={toTop}
      aria-label="Back to top"
      disabled={!visible}
    >
      <ArrowUp size={15} aria-hidden="true" />
      <span>Top</span>
    </button>
  );
}
