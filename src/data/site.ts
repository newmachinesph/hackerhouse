/**
 * Absolute base for canonical URLs, the sitemap, robots.txt, JSON-LD @ids, and
 * Open Graph image URLs.
 *
 * This previously defaulted to a placeholder domain that was never registered,
 * so og:image pointed at a host that does not resolve and every social preview
 * failed silently. It now derives from the deployment instead:
 *
 *   1. NEXT_PUBLIC_SITE_URL  — set this once you have a custom domain.
 *   2. VERCEL_PROJECT_PRODUCTION_URL — the stable production host, set by
 *      Vercel at build time, so previews still point at production.
 *   3. VERCEL_URL — the per-deployment host, as a last resort.
 *   4. localhost, for local builds.
 *
 * Only server code reads this (metadata, sitemap, robots, llms.txt, JSON-LD),
 * so the non-public env vars are available where it matters.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (host) return `https://${host.replace(/\/+$/, "")}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

export const APPLICATION_ENDPOINT = "";
export const CONTACT_URL = "";
export const HAS_APPROVED_HERO_VIDEO = false;
export const HAS_APPROVED_HERO_IMAGE = true;
export const HAS_APPROVED_BUILDER_IMAGE = true;
export const HAS_APPROVED_IMAGES = true;

export const chapters = [
  { id: "growth", index: "01", label: "10x", theme: "dark" },
  { id: "filter", index: "02", label: "The filter", theme: "light" },
  { id: "proof", index: "03", label: "Why", theme: "dark" },
  { id: "house", index: "04", label: "The houses", theme: "dark" },
  { id: "rules", index: "05", label: "The rules", theme: "dark" },
  { id: "cost", index: "06", label: "The cost", theme: "light" },
  { id: "apply", index: "07", label: "Apply", theme: "dark" },
] as const;

export const primaryLinks = [
  { href: "/thesis", index: "01", label: "Thesis" },
  { href: "/houses", index: "02", label: "Houses" },
  { href: "/rules", index: "03", label: "Rules" },
  { href: "/cost", index: "04", label: "Cost" },
] as const;

export const qualificationRows = [
  {
    number: "01",
    title: "Revenue, or a real head start",
    body: "Two ways in. You're clearing PHP 150K a month, or you're pre-revenue and building full time. We read both.",
  },
  {
    number: "02",
    title: "It takes your whole week",
    body: "No day job, no backup project. This counts for more with us than the revenue number does.",
  },
  {
    number: "03",
    title: "You know your number",
    body: "Revenue, retention, distribution, output. Whichever it is, you can name the one that would change the company if it moved.",
  },
  {
    number: "04",
    title: "You can close the other tabs",
    body: "There is always a newer idea. This only works if the business you arrived with keeps winning that argument.",
  },
] as const;

export const houseStates = [
  { number: "01", title: "Work", text: "Coworking space and meeting pods", asset: "/media/house-work.png" },
  { number: "02", title: "Train", text: "Gym, sauna, and cold plunge", asset: "/media/house-train.png" },
  { number: "03", title: "Eat", text: "Healthy food handled", asset: "/media/house-eat.png" },
  { number: "04", title: "Reset", text: "Laundry and cleaning included", asset: "/media/house-reset.png" },
  { number: "05", title: "Stay online", text: "Electricity and fast Wi-Fi", asset: "/media/house-work.png" },
  // Bedroom counts vary by house (see houses.ts), so this deliberately carries
  // no number — it used to say "6-10" while /houses computed 6-16.
  { number: "06", title: "Live", text: "Shared and solo rooms", asset: "/media/house-live.png" },
] as const;

export const houseRules = [
  { number: "01", title: "Work on the real thing", body: "One business, full time. Not a rotating set of experiments." },
  { number: "02", title: "Protect other people's focus", body: "Sound carries in a shared house. Don't be the reason someone loses an afternoon." },
  { number: "03", title: "Keep dating outside", body: "People work and sleep here. Take that somewhere else." },
  { number: "04", title: "Say it early", body: "Raise it with the person involved while it is still small enough to fix." },
] as const;

export const included = [
  "Room",
  "Coworking space",
  "Meeting pods",
  "Gym",
  "Sauna",
  "Cold plunge",
  "Healthy food",
  "Laundry",
  "Cleaning",
  "Electricity",
  "Wi-Fi",
] as const;
