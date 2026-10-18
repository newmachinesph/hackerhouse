import Link from "next/link";
import { houses } from "@/data/houses";
import { primaryLinks } from "@/data/site";
import { BackToTop } from "./BackToTop";
import { CookieSettingsButton } from "./CookieNotice";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <BackToTop />
      <Link href="/#top">HackerHouse<br />Accelerator</Link>
      <p>{houses.length} houses<br />Metro Manila + Clark</p>
      {/* Driven by primaryLinks so the footer cannot drift from the header the
          way the old hardcoded /house link did once that route was retired. */}
      <nav aria-label="Footer navigation">
        {primaryLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
      </nav>
      <p>One number.<br />One year to move it.</p>
      <div className="site-footer__legal">
        <span>A design concept. Not an operating business.</span>
        <nav aria-label="Legal">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <CookieSettingsButton />
        </nav>
      </div>
    </footer>
  );
}
