"use client";

import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { HAS_APPROVED_IMAGES, houseStates } from "@/data/site";
import { VisualPlaceholder } from "./VisualPlaceholder";

export function HouseSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="house-sequence" id="house" data-surface="dark">
      <div className="house-desktop">
        <div className="house-copy">
          <div className="section-index section-index--light"><span>04</span><span>The house</span></div>
          <h2>The house handles<br />the background noise.</h2>
          <p>Meals, laundry, a gym and a work floor, all at the same address. Fewer errands means fewer reasons to stop working.</p>
          <div className="house-index">
            <i><motion.b style={{ height: progressHeight }} /></i>
            <div>{houseStates.map((state) => <span key={state.number}>{state.number} / {state.title}</span>)}</div>
          </div>
        </div>
        <div className="house-stack">
          {houseStates.map((state, index) => (
            <HousePanel key={state.number} index={index} progress={scrollYProgress} state={state} />
          ))}
        </div>
      </div>

      <div className="house-mobile section-shell">
        <div className="section-index section-index--light"><span>04</span><span>The house</span></div>
        <h2>The house handles the background noise.</h2>
        <p>Meals, laundry, a gym and a work floor, all at the same address.</p>
        <div className="house-mobile__grid">
          {houseStates.map((state) => (
            <article key={state.number} className="house-mobile__panel">
              {state.number === "05" ? (
                <HouseSignalGraphic />
              ) : HAS_APPROVED_IMAGES ? (
                <Image
                  src={state.asset}
                  alt={`${state.title}: ${state.text}`}
                  width={1024}
                  height={1536}
                  sizes="100vw"
                  quality={75}
                />
              ) : (
                <VisualPlaceholder code={`MNL / ${state.number}`} label={`${state.title} image pending approval`} />
              )}
              <div><span>{state.number}</span><h3>{state.title}</h3><p>{state.text}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HousePanel({ index, progress, state }: {
  index: number;
  progress: MotionValue<number>;
  state: (typeof houseStates)[number];
}) {
  const count = houseStates.length;
  const start = index / count;
  const end = Math.min(1, start + 1 / count);
  const incoming = index === 0 ? 0 : Math.max(0, start - 0.12);
  const y = useTransform(progress, [incoming, Math.max(start, 0.001), end], index === 0 ? ["0%", "0%", "0%"] : ["112%", "0%", "0%"]);
  const scale = useTransform(progress, [incoming, Math.max(start, 0.001), end], index === 0 ? [1, 1, 0.975] : [0.94, 1, 0.975]);
  const rotateX = useTransform(progress, [incoming, Math.max(start, 0.001)], index === 0 ? [0, 0] : [6, 0]);
  const copyOpacity = useTransform(progress, [Math.max(0, end - 0.12), Math.max(0.001, end - 0.045)], index === count - 1 ? [1, 1] : [1, 0]);

  return (
    <motion.article className="house-panel" style={{ y, scale, rotateX, zIndex: index + 1 }}>
      {state.number === "05" ? (
        <HouseSignalGraphic />
      ) : HAS_APPROVED_IMAGES ? (
        <Image
          src={state.asset}
          alt={`${state.title}: ${state.text}`}
          width={1024}
          height={1536}
          sizes="62vw"
          quality={75}
        />
      ) : (
        <VisualPlaceholder code={`MNL / ${state.number}`} label={`${state.title} image pending approval`} />
      )}
      <div className="house-panel__shade" />
      <span className="house-panel__concept">Concept visual</span>
      <motion.div className="house-panel__copy" style={{ opacity: copyOpacity }}><span>{state.number}</span><h3>{state.title}</h3><p>{state.text}</p></motion.div>
    </motion.article>
  );
}

function HouseSignalGraphic() {
  return (
    <div className="house-signal" aria-label="Fast Wi-Fi and reliable electricity">
      <div className="house-signal__grid" aria-hidden="true" />
      <span>HOUSE NETWORK / LIVE</span>
      <strong>99.9</strong>
      <small>% uptime target</small>
      <div className="house-signal__pulse" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <p><span>Wi-Fi</span><span>Electricity</span><span>Always on</span></p>
    </div>
  );
}
