/**
 * Privacy and terms copy.
 *
 * Written for what this site actually does today: a static marketing concept
 * with no backend, no accounts, and no analytics. The application form posts
 * nowhere unless APPLICATION_ENDPOINT is configured, and the only cookie is the
 * consent record itself.
 *
 * If a real endpoint, analytics, or a payment flow is ever added, these pages
 * must be revisited — they become wrong the moment that happens.
 */

export type LegalSection = { heading: string; body: readonly string[] };

export type LegalDoc = {
  slug: "privacy" | "terms";
  index: string;
  label: string;
  title: string;
  intro: string;
  updated: string;
  sections: readonly LegalSection[];
};

/** Shown as "last updated". Change when the copy below changes. */
const UPDATED = "10 August 2026";

export const legalDocs: Record<LegalDoc["slug"], LegalDoc> = {
  privacy: {
    slug: "privacy",
    index: "08",
    label: "Privacy",
    title: "What we collect, which is almost nothing.",
    updated: UPDATED,
    intro:
      "This site is a design concept. It has no accounts, no logins, and no analytics. This page describes the little data the site can touch and what happens to it.",
    sections: [
      {
        heading: "No tracking or analytics",
        body: [
          "The site runs no analytics, no advertising pixels, no session recording, and no third-party trackers. Nothing profiles you across sites, and nothing is sold or shared.",
        ],
      },
      {
        heading: "Cookies",
        body: [
          "The only cookie this site sets is the one recording your cookie preference, so the consent notice does not reappear on every page. It holds your choice and nothing else.",
          "You can change or withdraw that choice at any time from the cookie settings link in the footer, or by clearing cookies in your browser.",
        ],
      },
      {
        heading: "The application form",
        body: [
          "The application asks for your name, what you are building, a link to your work, your revenue, the number you want to move, and why you want a room. Those answers stay in your browser as you type.",
          "Because this is a concept, no submission endpoint is configured. Submitting formats your answers into text for you to copy and send yourself. The site transmits nothing to a server.",
          "If a submission endpoint is ever configured, your answers would be sent to it, and this page would need to say where they go and how long they are kept.",
        ],
      },
      {
        heading: "Hosting and server logs",
        body: [
          "Like any website, the host serving these pages may keep standard request logs, which can include IP address, user agent, and the page requested. Those logs belong to the host, exist to operate and secure the service, and are not used to build any profile.",
        ],
      },
      {
        heading: "Third parties",
        body: [
          "Fonts come from Google Fonts through the framework's font pipeline, which self-hosts the files at build time, so your browser never requests them from Google while you browse.",
          "There are no embeds, comment widgets, chat widgets, or social scripts on this site.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "Because the site stores no personal data, there is generally nothing for us to access, correct, export, or erase. If you have sent something directly and want it deleted, ask and it will be deleted.",
        ],
      },
      {
        heading: "Changes",
        body: [
          "If this stops being a concept and starts collecting data, this page changes first. The date at the top says when it was last revised.",
        ],
      },
    ],
  },
  terms: {
    slug: "terms",
    index: "09",
    label: "Terms",
    title: "What this site is, and what it isn't.",
    updated: UPDATED,
    intro:
      "Plain terms for a site that does not sell anything yet. Using this site means you accept what follows.",
    sections: [
      {
        heading: "This is a concept, not a business",
        body: [
          "HackerHouse Accelerator as presented here is a design concept. The houses, rooms, rates, availability, and services described are illustrative and are not currently offered for sale or rent.",
          "Nothing on this site is an offer, a reservation, a lease, a booking, or a contract, and nothing here creates any obligation on either side.",
        ],
      },
      {
        heading: "Prices are illustrative",
        body: [
          "Every rent figure, room count, and inclusion shown is a placeholder used to design and test the site. Prices are not quotes and are not binding. Do not rely on them for any decision.",
        ],
      },
      {
        heading: "No investment, funding, or equity",
        body: [
          "The word accelerator here describes a shared living and working format. It is not an offer of investment, funding, equity, securities, or financial services, and no returns of any kind are offered or implied.",
          "Ten times, or 10x, refers to an ambition to grow one chosen business metric. It is not a projection, a guarantee, or a claim about anyone's results.",
        ],
      },
      {
        heading: "No professional advice",
        body: [
          "Nothing here is legal, financial, tax, immigration, or business advice. Take proper advice before making decisions about where you live or how you run your company.",
        ],
      },
      {
        heading: "Applications",
        body: [
          "Submitting an application creates no agreement and no place in any house. Applications may be declined for any reason or none. Because no submission endpoint is configured, an application may not reach anyone at all.",
        ],
      },
      {
        heading: "Content and marks",
        body: [
          "The text, layout, code, and imagery on this site belong to their respective owners. Imagery is illustrative and depicts concepts rather than actual properties.",
          "Network School and HF0 are referenced only to describe experience. This is an independent project with no affiliation with, sponsorship by, or endorsement from either.",
        ],
      },
      {
        heading: "No warranty and limited liability",
        body: [
          "The site is provided as is, without warranties of any kind. It may be inaccurate, incomplete, or unavailable at any time.",
          "To the extent the law allows, we are not liable for any loss arising from your use of, or reliance on, this site.",
        ],
      },
      {
        heading: "Changes",
        body: [
          "These terms may change as the project changes. The date at the top says when they were last revised.",
        ],
      },
    ],
  },
};
