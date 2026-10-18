"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { HAS_APPROVED_BUILDER_IMAGE } from "@/data/site";
import { VisualPlaceholder } from "./VisualPlaceholder";

export function ResidencyProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["7%", "-7%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.06]);
  const imageClip = useTransform(scrollYProgress, [0, 0.35], ["inset(9% 12% 9% 12%)", "inset(0% 0% 0% 0%)"]);
  const copyY = useTransform(scrollYProgress, [0, 1], [32, -32]);

  return (
    <section ref={sectionRef} className="residency section-shell" id="proof" data-surface="dark">
      <div className="section-index section-index--light"><span>03</span><span>Why this exists</span></div>
      <motion.div className="residency__copy" style={{ y: copyY }}>
        <h2>We copied this from houses that worked.</h2>
        <div className="residency__body">
          <p>We stayed at Network School and spent time in San Francisco founder houses, HF0 among them. What made them work had little to do with the address. It was being around people who took the work seriously.</p>
          <p>We wanted that here, so we opened six houses of our own and wrote our own rules for them.</p>
        </div>
      </motion.div>
      <motion.div className="residency__visual" style={{ y: imageY, clipPath: imageClip }}>
        <motion.div className="residency__visual-inner" style={{ scale: imageScale }}>
          {HAS_APPROVED_BUILDER_IMAGE ? (
            <Image
              src="/media/builder-table.png"
              alt="Builders working together around a long table at night"
              width={1536}
              height={1024}
              sizes="(min-width: 768px) 55vw, 100vw"
              quality={75}
            />
          ) : (
            <VisualPlaceholder code="MNL / 03" label="Builder residency image pending approval" />
          )}
        </motion.div>
        <div className="residency__visual-meta"><span>Founder residency / field notes</span><span>01—03</span></div>
      </motion.div>
      <div className="residency__places" aria-label="Residency experience"><span>Network School</span><span>San Francisco</span><span>HF0</span><strong>→ Manila</strong></div>
      <div className="residency__rule"><span>Borrowed the format. Set our own standard.</span></div>
      <p className="residency__legal">Independent project. No affiliation or endorsement implied.</p>
    </section>
  );
}
