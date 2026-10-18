"use client";

import { ArrowUpRight } from "lucide-react";
import { useCallback, useState } from "react";
import { houses } from "@/data/houses";
import { ApplicationDrawer } from "./ApplicationDrawer";
import { CostSection } from "./CostSection";
import { FaqSection } from "./FaqSection";
import { GrowthSequence } from "./GrowthSequence";
import { HouseSequence } from "./HouseSequence";
import { QualificationGate } from "./QualificationGate";
import { ResidencyProof } from "./ResidencyProof";
import { RulesContract } from "./RulesContract";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function HackerHousePage() {
  const [applicationOpen, setApplicationOpen] = useState(false);
  const openApplication = useCallback(() => setApplicationOpen(true), []);
  const closeApplication = useCallback(() => setApplicationOpen(false), []);

  return (
    <>
      <div id="top" className="page-top-anchor" aria-hidden="true" />
      <a className="skip-link" href="#growth">Skip to content</a>
      <SiteHeader onApply={openApplication} />
      <main>
        <GrowthSequence onApply={openApplication} />
        <QualificationGate />
        <ResidencyProof />
        <HouseSequence />
        <RulesContract />
        <CostSection />
        <FaqSection />
        <section className="final-apply" id="apply" data-surface="dark">
          <div className="final-apply__content">
            <div className="section-index section-index--light"><span>07</span><span>Apply</span></div>
            <h2>Make the year<br />answer to a number.</h2>
            <p>Six houses across Metro Manila and Clark. Pick the one that suits the year you are about to have.</p>
            <button className="button button--dark" type="button" onClick={openApplication}>Apply for a room <ArrowUpRight size={18} /></button>
            <small>{houses.length} houses / Metro Manila + Clark</small>
          </div>
          <aside className="final-apply__proof pattern-dither" aria-label="Growth target">
            <span className="final-apply__proof-label">One KPI / one year</span>
            <strong>10</strong>
            <span>× your number.</span>
            <small>{houses.length} houses / Metro Manila + Clark</small>
          </aside>
        </section>
      </main>
      <SiteFooter />
      <ApplicationDrawer open={applicationOpen} onClose={closeApplication} />
    </>
  );
}
