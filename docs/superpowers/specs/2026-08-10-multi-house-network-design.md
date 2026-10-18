# HackerHouse Accelerator — Multi-House Network

**Date:** 2026-08-10
**Status:** Approved

## Problem

The site presents HackerHouse Accelerator as a single Manila house whose property is not yet
chosen — "Founding house", "4 committed", "Manila / Property TBC", "the final property". In
reality there are six houses: Makati, BGC, Pasig, Mall of Asia (Pasay), Clark, and Quezon City.

Because rent varies by district, the single hardcoded `PHP 50K–100K` figure is no longer correct.
Pricing becomes a property of each house.

## Decisions

| Question | Decision |
| --- | --- |
| House status | All six are live and taking residents. Singular/"founding"/"TBC" framing is retired. |
| Rent figures | Assumed by the implementer, tiered by district, marked `PLACEHOLDER` in the data file. |
| Information architecture | `/houses` index plus `/houses/[slug]`. |

## Two different numbers

These must not be conflated:

- **₱150K+** — the *applicant's* minimum monthly revenue. An entry requirement. Identical at every
  house and unchanged by this work.
- **Rent** — what a resident pays. Varies per house. This is what becomes dynamic.

## Data model

`src/data/houses.ts` is the single source of truth. No price, bedroom count, or house name is
written anywhere else in the codebase.

```ts
export type House = {
  slug: "makati" | "bgc" | "pasig" | "moa" | "clark" | "qc";
  index: string;                      // "01".."06", display order
  name: string;                       // "BGC"
  city: string;                       // "Taguig"
  area: string;                       // "Bonifacio Global City, Taguig"
  tagline: string;                    // one line, why this house
  intro: string;                      // 1-2 sentences
  rent: { min: number; max: number }; // PHP thousands per month
  bedrooms: { min: number; max: number };
  committed: number;                  // residents committed at this house
  standout: readonly string[];        // 3-4 differentiators
  nearby: readonly string[];          // 3-4 landmarks
  image: string;                      // /media/houses/<slug>.png
};
```

Derived helpers, so no range is ever hardcoded:

```ts
networkRent()      // { min, max } across all houses -> drives every "from/to" figure
networkBedrooms()  // { min, max }
totalCommitted()   // sum
houseMetadata(slug)// Next.js Metadata, mirrors detailMetadata() in pages.ts
```

### Assumed rent (PLACEHOLDER — must be confirmed before launch)

| # | Slug | House | Area | Rent /mo | Bedrooms |
| --- | --- | --- | --- | --- | --- |
| 01 | `makati` | Makati | Makati CBD | ₱70–110K | 6–10 |
| 02 | `bgc` | BGC | Bonifacio Global City, Taguig | ₱75–120K | 8–12 |
| 03 | `pasig` | Pasig | Ortigas Center, Pasig | ₱55–90K | 8–12 |
| 04 | `moa` | Mall of Asia | Bay Area, Pasay | ₱50–85K | 8–14 |
| 05 | `qc` | Quezon City | Diliman, Quezon City | ₱45–75K | 10–14 |
| 06 | `clark` | Clark | Clark Freeport, Pampanga | ₱35–60K | 10–16 |

Network range therefore **₱35–120K**, replacing the hardcoded ₱50–100K.

`committed` counts are also placeholders. The existing site shows a real "4 committed"; per-house
counts are invented and must be corrected.

## Routes

| Route | Renders |
| --- | --- |
| `/houses` | Network index: all six with rent and bedrooms, plus what every house includes |
| `/houses/[slug]` | One location, statically generated via `generateStaticParams` |
| `/house` | Permanent redirect to `/houses` (the old URL must not 404) |

The `/house` editorial content (what gets handled: work, train, eat, reset) describes the offering
common to all houses, so it folds into the `/houses` index rather than being deleted.

## Components

- `HouseIndexPage` — the network index.
- `LocationPage` — one house. Reuses the existing `detail-*` CSS classes and visual language.

`DetailPage` is **not** extended to cover locations; it stays focused on the editorial routes it
already serves (thesis, rules, cost).

## Copy changes

| Location | From | To |
| --- | --- | --- |
| `SiteFooter`, mobile menu | "Founding house / Manila, Philippines" | Six houses / Metro Manila + Clark |
| `HackerHousePage` final CTA | "Founding house / 4 committed / Manila" | Network framing, count from data |
| `SiteHeader` status | "4 committed" | `totalCommitted()` |
| `DetailPage` house visual | "Manila / Property TBC" | Per-house area |
| `CostSection`, `/cost` | ₱50K–100K | `networkRent()` + per-house table |
| Nav (`primaryLinks`) | HOUSE → `/house` | HOUSES → `/houses` |

## Images

Six hero images, one per house, generated **only** via the codex bridge (`gpt-image-bridge`), no
other source. Saved to `public/media/houses/<slug>.png`, 1024×1536, rendered through `next/image`.

## Out of scope

Booking, availability calendars, per-house application routing, and a map view. The application
drawer stays as-is.
