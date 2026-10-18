"use client";

import { motion } from "motion/react";
import { houseRules } from "@/data/site";

export function RulesContract() {
  return (
    <section className="rules section-shell" id="rules" data-surface="dark">
      <div className="section-index section-index--light"><span>05</span><span>The rules</span></div>
      <div className="rules__header">
        <h2>Protect the room<br />or leave it.</h2>
        <p>A shared house gets useful when everyone guards other people&apos;s focus as carefully as their own.</p>
      </div>
      <div className="rules__list">
        {houseRules.map((rule, index) => (
          <motion.article
            className="rule-row"
            key={rule.number}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.68, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>{rule.number}</span><h3>{rule.title}</h3><p>{rule.body}</p>
          </motion.article>
        ))}
      </div>
      {/*
        Deliberately not a scroll reveal. This was a motion.p that animated
        clip-path from inset(0 100% 0 0); the animation did not reliably fire
        even with the element fully in view, leaving the headline clipped to
        invisible and the section ending in a large empty gap. A headline must
        not depend on an animation to exist, so it now renders plainly.
      */}
      <p className="rules__closing">Break these and you lose the room, however good the company is.</p>
    </section>
  );
}
