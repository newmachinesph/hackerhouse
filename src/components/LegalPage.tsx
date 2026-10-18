"use client";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import type { LegalDoc } from "@/data/legal";
import { ApplicationDrawer } from "./ApplicationDrawer";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  const [applicationOpen, setApplicationOpen] = useState(false);
  const openApplication = useCallback(() => setApplicationOpen(true), []);
  const closeApplication = useCallback(() => setApplicationOpen(false), []);

  return (
    <>
      <div id="top" className="page-top-anchor" aria-hidden="true" />
      <a className="skip-link" href="#page-content">Skip to content</a>
      <SiteHeader onApply={openApplication} pageContext={{ index: doc.index, label: doc.label }} />
      <main className="legal-page" id="page-content">
        <section className="legal-hero section-shell" data-surface="dark">
          <Link className="detail-hero__back" href="/"><ArrowLeft size={15} /> Home</Link>
          <p className="eyebrow">{doc.index} / {doc.label}</p>
          <h1>{doc.title}</h1>
          <p className="legal-hero__intro">{doc.intro}</p>
          <p className="legal-hero__updated">Last updated {doc.updated}</p>
        </section>

        <section className="legal-body section-shell" data-surface="light">
          {doc.sections.map((section, index) => (
            <article key={section.heading} className="legal-section">
              <h2><span>{String(index + 1).padStart(2, "0")}</span>{section.heading}</h2>
              <div>{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            </article>
          ))}
          <p className="legal-body__foot">
            Questions about this page? Say so in your application, or wait until the project is
            real enough to have a contact address.
          </p>
        </section>

        <section className="detail-closing" data-surface="dark">
          <div className="detail-closing__mark" aria-hidden="true"><span>H</span><span>H</span><span>A</span></div>
          <div className="section-index section-index--light"><span>{doc.index}</span><span>{doc.label}</span></div>
          <h2>Still want a room?</h2>
          <p>The houses are not real yet. The way we would run them is.</p>
          <button className="button button--dark" type="button" onClick={openApplication}>Apply for a room <ArrowUpRight size={17} /></button>
        </section>
      </main>
      <SiteFooter />
      <ApplicationDrawer open={applicationOpen} onClose={closeApplication} />
    </>
  );
}
