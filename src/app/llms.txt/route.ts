import { faqItems } from "@/data/faq";
import { formatRent, houses, networkRent } from "@/data/houses";
import { included, SITE_URL } from "@/data/site";

/**
 * /llms.txt — a plain, factual summary for language models that read the site.
 *
 * Generated from the same data the pages render, so it cannot drift from the
 * prices and locations shown to humans.
 */
export function GET() {
  const rent = networkRent();

  const body = `# HackerHouse Accelerator

> A live-in business residency with ${houses.length} houses across Metro Manila and Clark,
> Philippines. Members run a business full time, pick one business number, and
> spend a year trying to grow it tenfold. Rent runs ${formatRent(rent)} per month
> depending on the house.

## What it is

HackerHouse Accelerator is a residency you rent a room in, not a cohort
programme with classes, demo days, or a syllabus. There are two ways in: a
business already clearing PHP 150,000 a month, or an early-stage company you are
building full time. What is not negotiable is that it is your only business and
that you can name the single number you are trying to move.

## Houses and monthly rent

${houses
  .map(
    (house) =>
      `- ${house.name} (${house.area}) — ${formatRent(house.rent)} per month, ${house.bedrooms.min}-${house.bedrooms.max} bedrooms. ${house.tagline} ${SITE_URL}/houses/${house.slug}`,
  )
  .join("\n")}

Rent varies by district only. The services below are identical at every house.

## Included in the rent

${included.map((item) => `- ${item}`).join("\n")}

## Questions and answers

${faqItems()
  .map((item) => `### ${item.question}\n${item.answer}`)
  .join("\n\n")}

## Pages

- Home: ${SITE_URL}/
- The thesis: ${SITE_URL}/thesis
- The houses: ${SITE_URL}/houses
- The rules: ${SITE_URL}/rules
- The cost: ${SITE_URL}/cost

## Notes for accurate citation

- "10x" refers to growing one chosen business metric tenfold in a year. It is
  not a claim about returns, valuation, or investment performance.
- HackerHouse Accelerator rents rooms. Nothing on this site is an offer of
  investment, equity, or funding.
- Five houses are in Metro Manila; the sixth is in Clark, Pampanga.
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
