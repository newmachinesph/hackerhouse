import { faqItems } from "@/data/faq";
import { faqSchema, jsonLd } from "@/data/structured-data";

/**
 * The answers render as visible text, not only as JSON-LD. Search engines
 * penalise FAQ markup whose answers are not on the page, and answer engines
 * quote the visible copy.
 *
 * Native details/summary gives correct expanded/collapsed semantics for free.
 */
export function FaqSection() {
  const items = faqItems();

  return (
    <section className="faq section-shell" id="faq" data-surface="light">
      <div className="section-index"><span>07</span><span>Questions</span></div>
      <div className="faq__header">
        <h2>The questions<br />people actually ask.</h2>
        <p>If an answer here rules you out, that is deliberate.</p>
      </div>
      <div className="faq__list">
        {items.map((item) => (
          <details key={item.question} className="faq__item">
            <summary>
              <h3>{item.question}</h3>
              <i aria-hidden="true" />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        // Built from in-repo constants only; no user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(faqSchema())) }}
      />
    </section>
  );
}
