"use client";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import {
  formatRange,
  formatRent,
  houses,
  networkBedrooms,
  networkRent,
} from "@/data/houses";
import { detailPages } from "@/data/pages";
import { houseStates } from "@/data/site";
import { ApplicationDrawer } from "./ApplicationDrawer";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function HouseIndexPage() {
  const [applicationOpen, setApplicationOpen] = useState(false);
  const openApplication = useCallback(() => setApplicationOpen(true), []);
  const closeApplication = useCallback(() => setApplicationOpen(false), []);

  const page = detailPages.house;
  const rent = networkRent();
  const bedrooms = networkBedrooms();

  return (
    <>
      <div id="top" className="page-top-anchor" aria-hidden="true" />
      <a className="skip-link" href="#page-content">Skip to content</a>
      <SiteHeader onApply={openApplication} pageContext={{ index: "02", label: "The houses" }} />
      <main className="detail-page detail-page--houses" id="page-content">
        <section className="detail-hero" id="growth" data-surface="dark">
          <div className="detail-hero__grid" aria-hidden="true" />
          <div className="detail-hero__copy">
            <Link className="detail-hero__back" href="/"><ArrowLeft size={15} /> Home</Link>
            <p className="eyebrow">02 / Six houses, one standard</p>
            <h1>Pick the city that suits the work.</h1>
            <p className="detail-hero__intro">
              Six houses across Metro Manila and Clark. Same rules, same services, same bar to get in.
              What changes is the neighbourhood, the room and the rent.
            </p>
          </div>
          <div className="detail-hero__visual">
            <div className="detail-visual detail-visual--network pattern-dither" aria-hidden="true">
              <strong>{houses.length}</strong>
              <span>houses</span>
              <small>Metro Manila + Clark</small>
            </div>
          </div>
          <div className="detail-hero__metrics">
            <div><strong>{formatRent(rent)}</strong><span>Monthly rent, depending on house</span></div>
            <div><strong>{formatRange(bedrooms)}</strong><span>Bedrooms per house</span></div>
          </div>
          <span className="detail-hero__folio">HHA / 02</span>
        </section>

        <section className="houses-list section-shell" id="filter" data-surface="light">
          <div className="section-index"><span>02</span><span>The houses</span></div>
          <div className="houses-list__header">
            <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              Six addresses.<br />Same standard.
            </motion.h2>
            <p>
              Rent follows the district, not the service. Clark is the cheapest and BGC the dearest, but
              the food, cleaning, gym and work floor are the same in both. Choose on location.
            </p>
          </div>

          <div className="houses-grid">
            {houses.map((house) => (
              <motion.div
                key={house.slug}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={`/houses/${house.slug}`} className="house-card">
                  <div className="house-card__media">
                    <Image src={house.image} alt={`The ${house.name} house`} fill sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw" />
                    <span className="house-card__index">{house.index}</span>
                  </div>
                  <div className="house-card__body">
                    <h3>{house.name}</h3>
                    <p className="house-card__area">{house.area}</p>
                    <p className="house-card__tagline">{house.tagline}</p>
                    <dl className="house-card__stats">
                      <div><dt>Rent</dt><dd>{formatRent(house.rent)}</dd></div>
                      <div><dt>Bedrooms</dt><dd>{formatRange(house.bedrooms)}</dd></div>
                      <div><dt>City</dt><dd>{house.city}</dd></div>
                    </dl>
                    <span className="house-card__go">See the house <ArrowUpRight size={15} /></span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="houses-compare">
            <p className="eyebrow">Rent at a glance</p>
            <div className="houses-compare__scroll">
              <table>
                <caption className="visually-hidden">Monthly rent and bedrooms for each HackerHouse Accelerator house</caption>
                <thead>
                  <tr><th scope="col">House</th><th scope="col">Area</th><th scope="col">Rent / month</th><th scope="col">Bedrooms</th></tr>
                </thead>
                <tbody>
                  {houses.map((house) => (
                    <tr key={house.slug}>
                      <th scope="row"><Link href={`/houses/${house.slug}`}>{house.name}</Link></th>
                      <td>{house.area}</td>
                      <td>{formatRent(house.rent)}</td>
                      <td>{formatRange(house.bedrooms)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="detail-principles section-shell" id="rules" data-surface="dark">
          <div className="section-index section-index--light"><span>02</span><span>What every house handles</span></div>
          <div className="detail-principles__header">
            <h2>{page.manifestTitle}</h2>
            <p>{page.manifestBody[0]}</p>
          </div>
          <div className="detail-principles__list">
            {houseStates.map((state, index) => (
              <motion.article
                key={state.number}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: 0.65, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <span>{state.number}</span><h3>{state.title}</h3><p>{state.text}</p><i aria-hidden="true" />
              </motion.article>
            ))}
          </div>
        </section>

        <section className="detail-closing" id="apply" data-surface="dark">
          <div className="detail-closing__mark" aria-hidden="true"><span>H</span><span>H</span><span>A</span></div>
          <div className="section-index section-index--light"><span>05</span><span>Apply</span></div>
          <h2>Tell us which house you want.</h2>
          <p>{page.closingBody}</p>
          <button className="button button--dark" type="button" onClick={openApplication}>Apply for a room <ArrowUpRight size={17} /></button>
          <small>{houses.length} houses / Metro Manila + Clark</small>
        </section>
      </main>
      <SiteFooter />
      <ApplicationDrawer open={applicationOpen} onClose={closeApplication} />
    </>
  );
}
