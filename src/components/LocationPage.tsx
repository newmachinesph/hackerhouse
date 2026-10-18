"use client";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { formatRange, formatRent, type House } from "@/data/houses";
import { included } from "@/data/site";
import { ApplicationDrawer } from "./ApplicationDrawer";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function LocationPage({ house, others }: { house: House; others: readonly House[] }) {
  const [applicationOpen, setApplicationOpen] = useState(false);
  const openApplication = useCallback(() => setApplicationOpen(true), []);
  const closeApplication = useCallback(() => setApplicationOpen(false), []);

  return (
    <>
      <div id="top" className="page-top-anchor" aria-hidden="true" />
      <a className="skip-link" href="#page-content">Skip to content</a>
      <SiteHeader onApply={openApplication} pageContext={{ index: house.index, label: house.name }} />
      <main className="detail-page detail-page--location" id="page-content">
        <section className="detail-hero" id="growth" data-surface="dark">
          <div className="detail-hero__grid" aria-hidden="true" />
          <div className="detail-hero__copy">
            <Link className="detail-hero__back" href="/houses"><ArrowLeft size={15} /> All houses</Link>
            <p className="eyebrow">{house.index} / {house.area}</p>
            <h1>{house.name}</h1>
            <p className="detail-hero__intro">{house.tagline}</p>
          </div>
          <div className="detail-hero__visual">
            <div className="detail-visual detail-visual--house">
              <Image src={house.image} alt={`The ${house.name} house at night, overlooking ${house.area}`} fill priority sizes="(min-width: 768px) 48vw, 100vw" />
              <div><span>Shared / Solo</span><span>{house.area}</span></div>
            </div>
          </div>
          <div className="detail-hero__metrics">
            <div><strong>{formatRent(house.rent)}</strong><span>Monthly rent</span></div>
            <div><strong>{formatRange(house.bedrooms)}</strong><span>Bedrooms, shared or solo</span></div>
          </div>
          <span className="detail-hero__folio">HHA / {house.index}</span>
        </section>

        <section className="detail-manifest section-shell" id="filter" data-surface="light">
          <div className="section-index"><span>{house.index}</span><span>{house.name}</span></div>
          <div className="detail-manifest__grid">
            <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              Why this house.
            </motion.h2>
            <div>
              <p>{house.intro}</p>
              <p>Rent here runs {formatRent(house.rent)} a month, covering the room and every house service. Where you land in that range depends on the room you take and what is free when you arrive.</p>
            </div>
          </div>
          <div className="detail-facts" aria-label={`What stands out about the ${house.name} house`}>
            {house.standout.map((item, index) => (
              <span key={item}><small>{String(index + 1).padStart(2, "0")}</small>{item}</span>
            ))}
          </div>
          <div className="location-nearby">
            <p className="eyebrow">Around the house</p>
            <div>{house.nearby.map((place) => <span key={place}>{place}</span>)}</div>
          </div>
        </section>

        <section className="detail-principles section-shell" id="rules" data-surface="dark">
          <div className="section-index section-index--light"><span>{house.index}</span><span>What the rent covers</span></div>
          <div className="detail-principles__header">
            <h2>Same standard<br />at every house.</h2>
            <p>Every house runs the same services. Only the neighbourhood and the rent move.</p>
          </div>
          <div className="location-included">
            {included.map((item, index) => (
              <span key={item}><small>{String(index + 1).padStart(2, "0")}</small>{item}</span>
            ))}
          </div>
        </section>

        <section className="location-others section-shell" data-surface="light">
          <div className="section-index"><span>--</span><span>The other houses</span></div>
          <h2>Not the right room?</h2>
          <div className="location-others__grid">
            {others.map((other) => (
              <Link key={other.slug} href={`/houses/${other.slug}`} className="location-card">
                <span className="location-card__index">{other.index}</span>
                <h3>{other.name}</h3>
                <p className="location-card__area">{other.area}</p>
                <p className="location-card__rent">{formatRent(other.rent)}<small>/ month</small></p>
                <span className="location-card__go" aria-hidden="true"><ArrowUpRight size={16} /></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="detail-closing" id="apply" data-surface="dark">
          <div className="detail-closing__mark" aria-hidden="true"><span>H</span><span>H</span><span>A</span></div>
          <div className="section-index section-index--light"><span>05</span><span>Apply</span></div>
          <h2>Take a room in {house.name}.</h2>
          <p>Say which house you want, which number you are trying to move, and why this one helps you move it.</p>
          <button className="button button--dark" type="button" onClick={openApplication}>Apply for a room <ArrowUpRight size={17} /></button>
          <small>{house.area} / {formatRent(house.rent)} per month</small>
        </section>
      </main>
      <SiteFooter />
      <ApplicationDrawer open={applicationOpen} onClose={closeApplication} />
    </>
  );
}
