"use client";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { networkRent } from "@/data/houses";
import type { DetailPageData } from "@/data/pages";
import { ApplicationDrawer } from "./ApplicationDrawer";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function DetailPage({ page }: { page: DetailPageData }) {
  const [applicationOpen, setApplicationOpen] = useState(false);
  const openApplication = useCallback(() => setApplicationOpen(true), []);
  const closeApplication = useCallback(() => setApplicationOpen(false), []);

  return (
    <>
      <div id="top" className="page-top-anchor" aria-hidden="true" />
      <a className="skip-link" href="#page-content">Skip to content</a>
      <SiteHeader onApply={openApplication} pageContext={{ index: page.index, label: page.label }} />
      <main className={`detail-page detail-page--${page.slug}`} id="page-content">
        <section className="detail-hero" id="growth" data-surface="dark">
          <div className="detail-hero__grid" aria-hidden="true" />
          <motion.div
            className="detail-hero__copy"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link className="detail-hero__back" href="/"><ArrowLeft size={15} /> Home</Link>
            <p className="eyebrow">{page.index} / {page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p className="detail-hero__intro">{page.intro}</p>
          </motion.div>
          <motion.div
            className="detail-hero__visual"
            initial={false}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
          >
            <DetailVisual page={page} />
          </motion.div>
          <div className="detail-hero__metrics">
            <div><strong>{page.metric.value}</strong><span>{page.metric.label}</span></div>
            <div><strong>{page.secondaryMetric.value}</strong><span>{page.secondaryMetric.label}</span></div>
          </div>
          <span className="detail-hero__folio">HHA / {page.index}</span>
        </section>

        <section className="detail-manifest section-shell" id="filter" data-surface="light">
          <div className="section-index"><span>{page.index}</span><span>{page.label}</span></div>
          <div className="detail-manifest__grid">
            <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>{page.manifestTitle}</motion.h2>
            <div>{page.manifestBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </div>
          <div className="detail-facts" aria-label="Page facts">
            {page.facts.map((fact, index) => <span key={fact}><small>{String(index + 1).padStart(2, "0")}</small>{fact}</span>)}
          </div>
          <DetailMedia slug={page.slug} />
        </section>

        <section className="detail-principles section-shell" id="rules" data-surface="dark">
          <div className="section-index section-index--light"><span>{page.index}</span><span>The operating notes</span></div>
          <div className="detail-principles__header"><h2>What this means<br />in practice.</h2><p>The specifics, without the sales gloss.</p></div>
          <div className="detail-principles__list">
            {page.principles.map((principle, index) => (
              <motion.article
                key={principle.number}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: 0.65, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <span>{principle.number}</span><h3>{principle.title}</h3><p>{principle.body}</p><i aria-hidden="true" />
              </motion.article>
            ))}
          </div>
        </section>

        <section className="detail-closing" id="apply" data-surface="dark">
          <div className="detail-closing__mark" aria-hidden="true"><span>H</span><span>H</span><span>A</span></div>
          <div className="section-index section-index--light"><span>05</span><span>Apply</span></div>
          <h2>{page.closingTitle}</h2>
          <p>{page.closingBody}</p>
          <button className="button button--dark" type="button" onClick={openApplication}>Apply for a room <ArrowUpRight size={17} /></button>
          <small>HackerHouse Accelerator / Metro Manila + Clark</small>
        </section>
      </main>
      <SiteFooter />
      <ApplicationDrawer open={applicationOpen} onClose={closeApplication} />
    </>
  );
}

function DetailVisual({ page }: { page: DetailPageData }) {
  const rent = networkRent();

  if (page.slug === "house") {
    return (
      <div className="detail-visual detail-visual--house">
        <Image src="/media/house-live.png" alt="A shared bedroom concept for HackerHouse Accelerator" fill priority sizes="(min-width: 768px) 48vw, 100vw" />
        <div><span>Shared / Solo</span><span>Metro Manila + Clark</span></div>
      </div>
    );
  }

  if (page.slug === "rules") {
    return (
      <div className="detail-visual detail-visual--rules" aria-hidden="true">
        <strong>NO</strong>
        <div><span>Split focus</span><span>House dating</span><span>Noise debt</span><span>Politics</span></div>
      </div>
    );
  }

  if (page.slug === "cost") {
    return (
      <div className="detail-visual detail-visual--cost" aria-hidden="true">
        <span>Monthly / PHP</span><strong>{rent.min}</strong><i>—</i><strong>{rent.max}</strong><small>House and room type set the final rate</small>
      </div>
    );
  }

  return (
    <div className="detail-visual detail-visual--thesis" aria-hidden="true">
      <div className="detail-visual__orbit"><i /><i /><i /><i /></div>
      <strong>10×</strong>
      <span>One KPI / one year</span>
    </div>
  );
}

function DetailMedia({ slug }: { slug: DetailPageData["slug"] }) {
  if (slug === "house") {
    const images = [
      { src: "/media/house-work.png", label: "Work", alt: "HackerHouse Accelerator coworking room concept" },
      { src: "/media/house-train.png", label: "Train", alt: "HackerHouse Accelerator training room concept" },
      { src: "/media/house-eat.png", label: "Eat", alt: "Healthy shared meal concept for the house" },
      { src: "/media/house-reset.png", label: "Reset", alt: "Laundry and cleaning service concept for the house" },
    ];
    return (
      <div className="detail-media detail-media--grid">
        {images.map((item, index) => (
          <figure key={item.src}><Image src={item.src} alt={item.alt} fill sizes="(min-width: 768px) 25vw, 50vw" /><figcaption><span>0{index + 1}</span>{item.label}</figcaption></figure>
        ))}
      </div>
    );
  }

  if (slug === "cost") {
    return (
      <div className="detail-media detail-media--split">
        <figure><Image src="/media/house-eat.png" alt="Healthy food service concept included with the house" fill sizes="(min-width: 768px) 50vw, 100vw" /><figcaption><span>Included / 07</span>Food without the daily order</figcaption></figure>
        <figure><Image src="/media/house-reset.png" alt="Laundry and cleaning service concept included with the house" fill sizes="(min-width: 768px) 50vw, 100vw" /><figcaption><span>Included / 08—09</span>Upkeep without the lost Saturday</figcaption></figure>
      </div>
    );
  }

  const media = slug === "rules"
    ? { src: "/media/rules-focus.png", alt: "Founders working quietly at night inside a Manila residence", label: "The room stays quiet enough for real work" }
    : { src: "/media/builder-table.png", alt: "Builders working around a shared table at night", label: "A visible target carries more weight" };

  return (
    <div className="detail-media detail-media--wide">
      <figure><Image src={media.src} alt={media.alt} fill sizes="100vw" /><figcaption><span>HHA / Field note</span>{media.label}</figcaption></figure>
    </div>
  );
}
