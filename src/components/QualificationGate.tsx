"use client";

import { ArrowDownRight } from "lucide-react";
import { useState } from "react";
import { qualificationRows } from "@/data/site";

export function QualificationGate() {
  const [openRow, setOpenRow] = useState<number | null>(0);

  return (
    <section className="qualification section-shell" id="filter" data-surface="light">
      <div className="section-index"><span>02</span><span>The filter</span></div>
      <div className="qualification__layout">
        <div className="qualification__header">
          <h2>Bring one business,<br />and mean it.</h2>
          <p>Two ways in: revenue that already works, or an early-stage company you are on full time. What we turn down is a side project.</p>
          <div className="qualification__traction"><span>Track 01 / Traction</span><strong>₱150K+</strong><small>Monthly revenue &mdash; or Track 02, pre-revenue and full-time on it</small></div>
        </div>
        <div className="qualification__rows">
        {qualificationRows.map((row, index) => {
          const isOpen = openRow === index;
          return (
            <button
              className={`qualification-row ${isOpen ? "qualification-row--open" : ""}`}
              key={row.number}
              type="button"
              onClick={() => setOpenRow(isOpen ? null : index)}
            >
              <span className="qualification-row__number">{row.number}</span>
              <span className="qualification-row__copy">
                <strong>{row.title}</strong>
                <span>{row.body}</span>
              </span>
              <i aria-hidden="true" />
              <ArrowDownRight aria-hidden="true" />
            </button>
          );
        })}
        </div>
      </div>
      <div className="qualification__rejection"><span>04 / The line</span><p>Still keeping your options open?<br />This house won&apos;t work.</p></div>
    </section>
  );
}
