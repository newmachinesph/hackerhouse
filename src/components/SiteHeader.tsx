"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { houses } from "@/data/houses";
import { chapters, primaryLinks } from "@/data/site";
import { LogoMark } from "./LogoMark";

type SiteHeaderProps = { onApply: () => void; pageContext?: { index: string; label: string } };

export function SiteHeader({ onApply, pageContext }: SiteHeaderProps) {
  const { scrollYProgress } = useScroll();
  const pageProgress = useSpring(scrollYProgress, { stiffness: 150, damping: 28, mass: 0.2 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [surface, setSurface] = useState<"dark" | "light">("dark");
  const [active, setActive] = useState("growth");

  useEffect(() => {
    const sections = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const element = visible.target as HTMLElement;
        setSurface(element.dataset.surface === "light" ? "light" : "dark");
        setActive(element.id);
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-15% 0px -35% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const current = pageContext ?? chapters.find((chapter) => chapter.id === active) ?? chapters[0];

  function openApplication() {
    setMenuOpen(false);
    onApply();
  }

  return (
    <>
      <div className="concept-banner" role="note">
        <strong>Concept</strong>
        <span>This is a design concept, not an operating business. Nothing here is a real offer.</span>
      </div>
      <header className={`site-header site-header--${surface}`}>
        <Link className="site-header__brand" href="/#top" aria-label="HackerHouse Accelerator home">
          <LogoMark size={26} className="site-header__mark" />
          <span className="site-header__wordmark">HackerHouse <span>Accelerator</span></span>
        </Link>
        <nav className="site-header__nav" aria-label="Primary navigation">
          {primaryLinks.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
        </nav>
        <div className="site-header__right">
          <span className="site-header__status"><i />{houses.length} houses</span>
          <button className="button button--signal site-header__apply" type="button" onClick={onApply}>
            <span>Apply</span><ArrowUpRight size={15} aria-hidden="true" />
          </button>
          <button className="site-header__menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen} aria-controls="mobile-menu">
            <Menu aria-hidden="true" />
          </button>
        </div>
        <motion.i className="site-header__progress" style={{ scaleX: pageProgress }} aria-hidden="true" />
      </header>

      <div className="chapter-folio" aria-hidden="true">
        <span>{current.index}</span><i /><span>{current.label}</span>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`} aria-hidden={!menuOpen} inert={!menuOpen}>
        <div className="mobile-menu__panel mobile-menu__panel--left" />
        <div className="mobile-menu__panel mobile-menu__panel--right" />
        <div className="mobile-menu__content">
          <div className="mobile-menu__top">
            <span>HackerHouse Accelerator</span>
            <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X aria-hidden="true" /></button>
          </div>
          <nav aria-label="Mobile navigation">
            {primaryLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                <span>{link.index}</span>{link.label}
              </Link>
            ))}
          </nav>
          <div className="mobile-menu__bottom">
            <p>{houses.length} houses<br />Metro Manila + Clark</p>
            <button className="button button--signal" type="button" onClick={openApplication}>Apply for a room <ArrowUpRight size={16} /></button>
          </div>
        </div>
      </div>
    </>
  );
}
