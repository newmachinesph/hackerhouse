"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { HAS_APPROVED_HERO_IMAGE, HAS_APPROVED_HERO_VIDEO } from "@/data/site";
import { VisualPlaceholder } from "./VisualPlaceholder";

type GrowthSequenceProps = { onApply: () => void };

export function GrowthSequence({ onApply }: GrowthSequenceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.25 });
  const mediaScale = useTransform(smoothProgress, [0, 1], [1.035, 1.16]);
  const mediaX = useTransform(smoothProgress, [0, 1], ["0%", "-3.5%"]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.15], [0, -72]);
  const tenClip = useTransform(smoothProgress, [0.18, 0.3], ["polygon(0 100%, 100% 88%, 100% 100%, 0 100%)", "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)"]);
  const tenNumberY = useTransform(smoothProgress, [0.16, 0.34], [120, 0]);
  const tenContentOpacity = useTransform(smoothProgress, [0.18, 0.28, 0.32, 0.35, 0.4], [0, 0, 1, 1, 0]);
  const pressureClip = useTransform(smoothProgress, [0.42, 0.54], ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const pressureX = useTransform(smoothProgress, [0.4, 0.58], [80, 0]);
  const pressureContentOpacity = useTransform(smoothProgress, [0.42, 0.52, 0.56, 0.63, 0.68], [0, 0, 1, 1, 0]);
  const finalClip = useTransform(smoothProgress, [0.7, 0.82], ["polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)"]);
  const finalCopyY = useTransform(smoothProgress, [0.68, 0.86], [90, 0]);
  const finalContentOpacity = useTransform(smoothProgress, [0.7, 0.81, 0.85], [0, 0, 1]);
  const progressScale = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="growth-sequence" id="growth" data-surface="dark">
      <div className="growth-desktop">
        <motion.div className="growth-media" style={{ scale: mediaScale, x: mediaX }}>
          {HAS_APPROVED_HERO_VIDEO ? (
            <video autoPlay muted loop playsInline preload="metadata" poster="/media/hero-manila-poster.png">
              <source src="/media/hero-manila-loop.mp4" type="video/mp4" />
            </video>
          ) : HAS_APPROVED_HERO_IMAGE ? (
            <Image
              className="growth-media__image"
              src="/media/hero-manila-poster.png"
              alt="A late-night communal worktable overlooking the Manila skyline"
              fill
              priority
              sizes="100vw"
            />
          ) : (
            <VisualPlaceholder code="MNL / 01" label="Hero film pending approval" className="growth-media__placeholder" />
          )}
          <div className="growth-media__shade" />
          <div className="growth-media__frame" aria-hidden="true" />
        </motion.div>

        <motion.div className="growth-hero" style={{ opacity: heroOpacity, y: heroY }}>
          <div className="growth-hero__top">
            <p className="eyebrow">Metro Manila + Clark / Live-in business residency</p>
            <span>Applications / Cohort 01</span>
          </div>
          <h1><span>Live where</span><span>the work</span><span>gets serious.</span></h1>
          <div className="growth-hero__traction" aria-label="Who gets in">
            <small>Two ways in</small><strong>₱150K+</strong><em>or pre-revenue, full-time</em>
          </div>
          <div className="growth-hero__bottom">
            <p>Six live-in houses across Metro Manila and Clark, for founders running one business full time. Bring revenue or bring an early start. Bring all of your week either way.</p>
            <div className="growth-hero__actions">
              <button className="button button--signal" type="button" onClick={onApply}>Apply for a room <ArrowUpRight size={16} /></button>
              <a className="text-link" href="#filter">Keep scrolling <ArrowDown size={15} /></a>
            </div>
          </div>
        </motion.div>

        <motion.div className="growth-stage growth-stage--ten" style={{ clipPath: tenClip }}>
          <motion.div className="growth-stage__index" style={{ opacity: tenContentOpacity }}><span>01</span><span>The target</span></motion.div>
          <motion.strong className="growth-stage__number" style={{ y: tenNumberY, opacity: tenContentOpacity }}>10x</motion.strong>
          <motion.div className="growth-stage__copy" style={{ opacity: tenContentOpacity }}>
            <p>Pick the scoreboard that matters</p>
            <h2>One number.<br />Ten times the result.</h2>
          </motion.div>
          <motion.div className="growth-stage__foot" style={{ opacity: tenContentOpacity }}><span>Traction or early stage</span><span>One KPI / One year</span></motion.div>
        </motion.div>

        <motion.div className="growth-stage growth-stage--pressure" style={{ clipPath: pressureClip }}>
          <motion.div className="growth-stage__index" style={{ opacity: pressureContentOpacity }}><span>02</span><span>The standard</span></motion.div>
          <motion.h2 style={{ x: pressureX, opacity: pressureContentOpacity }}><span>Past proof.</span><span>Into scale.</span><strong>10x.</strong></motion.h2>
          <motion.div className="growth-pressure__criteria" style={{ opacity: pressureContentOpacity }}>
            <span><i>01</i>Traction, or building it full-time</span>
            <span><i>02</i>Full-time on the business</span>
            <span><i>03</i>One company gets the year</span>
          </motion.div>
        </motion.div>

        <motion.div className="growth-stage growth-stage--final" style={{ clipPath: finalClip }}>
          <motion.div className="growth-stage__index" style={{ opacity: finalContentOpacity }}><span>03</span><span>The premise</span></motion.div>
          <motion.div className="growth-stage__premise" style={{ y: finalCopyY, opacity: finalContentOpacity }}>
            <p>The house takes the errands off your week</p>
            <h2><span>Protect the hours.</span><span>Raise the pace.</span><span>Make it count.</span></h2>
          </motion.div>
          <motion.div className="growth-stage__manifesto" style={{ opacity: finalContentOpacity }} aria-hidden="true"><span>BUILD</span><span>TRAIN</span><span>EAT</span><span>SHIP</span><strong>MNL / 2026</strong></motion.div>
          <motion.a className="growth-stage__next" style={{ opacity: finalContentOpacity }} href="#filter">Enter the filter <ArrowDown size={18} /></motion.a>
        </motion.div>

        <div className="growth-progress" aria-hidden="true">
          <span>00</span><i><motion.b style={{ scaleX: progressScale }} /></i><span>04</span>
        </div>
      </div>

      <div className="growth-mobile">
        <div className="growth-mobile__image">
          {HAS_APPROVED_HERO_IMAGE ? (
            <Image src="/media/hero-manila-poster.png" alt="A late-night communal worktable overlooking the Manila skyline" fill priority sizes="calc(100vw - 2rem)" />
          ) : (
            <VisualPlaceholder code="MNL / 01" label="Hero film pending approval" />
          )}
          <div className="growth-mobile__image-meta"><span>Metro Manila + Clark</span><span>Cohort 01</span></div>
        </div>
        <p className="eyebrow">Metro Manila + Clark / Live-in business residency</p>
        <h1>Live where the work gets serious.</h1>
        <p className="growth-mobile__lead">Six houses across Metro Manila and Clark, for founders running one business full time.</p>
        <button className="button button--signal" type="button" onClick={onApply}>Apply for a room <ArrowUpRight size={16} /></button>
        <div className="growth-mobile__ten">10x</div>
        <p className="growth-mobile__statement">Pick one business number, then build the year around moving it tenfold.</p>
        <div className="growth-mobile__criteria"><span>₱150K+ or pre-revenue</span><span>Full-time on the business</span><span>One company gets the year</span></div>
        <div className="growth-mobile__minimum">Two ways in <strong>Traction or early stage</strong></div>
      </div>
    </section>
  );
}
