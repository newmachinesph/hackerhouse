import { faqItems } from "./faq";
import { type House, houses, networkRent } from "./houses";
import { included, SITE_URL } from "./site";

/**
 * schema.org JSON-LD. Search and answer engines read this to state facts about
 * the brand with confidence, which is most of what "AEO" and "GEO" amount to.
 *
 * Deliberately omitted: street addresses, geo coordinates, phone numbers,
 * social profiles, ratings and review counts. None of those are known, and
 * inventing them would publish false claims in a machine-readable format.
 */

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "HackerHouse Accelerator",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    image: `${SITE_URL}/opengraph-image`,
    slogan: "10x your number.",
    description:
      "A live-in business residency with six houses across Metro Manila and Clark, for founders working full-time on one company — with revenue or pre-revenue — who want to grow one business number tenfold in a year.",
    areaServed: [
      { "@type": "Country", name: "Philippines" },
      ...houses.map((house) => ({ "@type": "City", name: house.city })),
    ],
    knowsAbout: [
      "live-in business residency",
      "founder housing",
      "coworking and coliving",
      "Metro Manila",
      "Clark Freeport",
    ],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE_URL,
    name: "HackerHouse Accelerator",
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

/** One house, as a rentable accommodation with a monthly price range. */
export function houseSchema(house: House) {
  return {
    "@type": "Accommodation",
    "@id": `${SITE_URL}/houses/${house.slug}#accommodation`,
    name: `HackerHouse Accelerator — ${house.name}`,
    url: `${SITE_URL}/houses/${house.slug}`,
    description: house.intro,
    image: `${SITE_URL}${house.image}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: house.city,
      addressRegion: house.slug === "clark" ? "Pampanga" : "Metro Manila",
      addressCountry: "PH",
    },
    numberOfBedrooms: house.bedrooms.max,
    amenityFeature: included.map((item) => ({
      "@type": "LocationFeatureSpecification",
      name: item,
      value: true,
    })),
    provider: { "@id": ORG_ID },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "PHP",
        minPrice: house.rent.min * 1000,
        maxPrice: house.rent.max * 1000,
        unitText: "MONTH",
      },
    },
  };
}

export function faqSchema() {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faqItems().map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbSchema(trail: readonly { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

/** The six houses as an ordered list, for the /houses index. */
export function houseListSchema() {
  const rent = networkRent();
  return {
    "@type": "ItemList",
    name: "HackerHouse Accelerator houses",
    description: `${houses.length} live-in business residencies across Metro Manila and Clark, from PHP ${rent.min * 1000} to PHP ${rent.max * 1000} per month.`,
    numberOfItems: houses.length,
    itemListElement: houses.map((house, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: houseSchema(house),
    })),
  };
}

/** Wraps one or more schema nodes into a single @graph document. */
export function jsonLd(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
