import type { Metadata } from "next";

export type DetailPageData = {
  slug: "thesis" | "house" | "rules" | "cost";
  index: string;
  label: string;
  seoTitle: string;
  eyebrow: string;
  title: string;
  intro: string;
  metric: { value: string; label: string };
  secondaryMetric: { value: string; label: string };
  manifestTitle: string;
  manifestBody: readonly string[];
  facts: readonly string[];
  principles: readonly { number: string; title: string; body: string }[];
  closingTitle: string;
  closingBody: string;
};

export const detailPages: Record<DetailPageData["slug"], DetailPageData> = {
  thesis: {
    slug: "thesis",
    index: "01",
    label: "The thesis",
    seoTitle: "The Thesis",
    eyebrow: "Why live together",
    title: "Ten times is a different kind of year.",
    intro: "Six live-in houses across Metro Manila and Clark. Every member picks one business number and spends the year trying to move it ten times.",
    metric: { value: "10×", label: "Target on one chosen KPI" },
    secondaryMetric: { value: "02", label: "Ways in: traction or early stage" },
    manifestTitle: "Scale is a different problem.",
    manifestBody: [
      "Someone already pays you. What is hard now is distribution, output, retention, or whichever single constraint keeps the company small.",
      "Living here makes the target harder to walk back quietly. The people around you know what you said you would move, and they notice when a week vanishes.",
    ],
    facts: ["Full-time business", "One clear scoreboard", "Six houses", "Application only"],
    principles: [
      { number: "01", title: "Two ways in", body: "Either the business already clears PHP 150K a month, or it is early stage and you are on it full-time. Both get read." },
      { number: "02", title: "Name the constraint", body: "Pick the number that tells the truth about the business, even when it is unflattering." },
      { number: "03", title: "Say it out loud", body: "Targets you keep to yourself are the easiest ones to quietly lower." },
      { number: "04", title: "Stay with the work", body: "No new company every month. You leave with the one you arrived with." },
    ],
    closingTitle: "Know your number before you apply.",
    closingBody: "If you cannot say what should be ten times bigger by December, wait until you can.",
  },
  house: {
    slug: "house",
    index: "02",
    label: "The house",
    seoTitle: "The House",
    eyebrow: "What gets handled",
    title: "Someone else runs the errands.",
    intro: "Beds, a work floor, meeting rooms, a gym and a kitchen at one address. Most of the day's small decisions are settled before you wake up.",
    metric: { value: "6", label: "Houses to choose from" },
    secondaryMetric: { value: "1", label: "Roof over work and life" },
    manifestTitle: "Your calendar shouldn't lose to groceries.",
    manifestBody: [
      "Healthy food, laundry, cleaning, electricity, and Wi-Fi come with the room. Coworking space and meeting pods keep business calls out of the bedroom.",
      "The gym, sauna and cold plunge are downstairs, so training does not turn into a half-day trip across the city.",
    ],
    facts: ["Shared or solo rooms", "Work space + meeting pods", "Training + recovery", "Food + cleaning"],
    principles: [
      { number: "01", title: "Work without commuting", body: "Your desk, meeting room, and bed live at the same address." },
      { number: "02", title: "Eat without planning it", body: "Meals are cooked here, so you stop negotiating with delivery apps every evening." },
      { number: "03", title: "Train close to the work", body: "Gym, sauna, and cold plunge fit around the day instead of taking it over." },
      { number: "04", title: "Reset the room", body: "Laundry and cleaning happen without you booking a Saturday for them." },
    ],
    closingTitle: "Spend your attention on the company.",
    closingBody: "The house handles the small recurring decisions. What you do with the hours you get back is your problem.",
  },
  rules: {
    slug: "rules",
    index: "03",
    label: "The rules",
    seoTitle: "The Rules",
    eyebrow: "How the room stays useful",
    title: "Four rules, and we enforce them.",
    intro: "Put driven people in one building and it gets loud fast. These four rules are what keep the house worth paying for.",
    metric: { value: "04", label: "Non-negotiable house rules" },
    secondaryMetric: { value: "0", label: "Room for house politics" },
    manifestTitle: "Being good at your job is not enough.",
    manifestBody: [
      "Talent buys nobody a pass here. If your habits wreck other people's concentration, or you drag the house into your personal life, you are the problem.",
      "None of this is branding. It is the minimum that works when a dozen people share a kitchen and a work floor for a year.",
    ],
    facts: ["Full-time only", "Focus stays protected", "Dating stays outside", "Conflict gets addressed"],
    principles: [
      { number: "01", title: "Work on the real thing", body: "You join with one business and it gets your full week. Side projects do not get to take over the house." },
      { number: "02", title: "Keep your noise to yourself", body: "Headphones on, closed doors respected. Your interruption should not become four other people's." },
      { number: "03", title: "Keep dating outside", body: "People live and work here. Do not turn the house into your dating pool." },
      { number: "04", title: "Say it early", body: "Take it to the person involved, before it becomes everyone else's entertainment." },
    ],
    closingTitle: "Follow them or leave.",
    closingBody: "None of this holds unless every person in the house holds it.",
  },
  cost: {
    slug: "cost",
    index: "04",
    label: "The cost",
    seoTitle: "The Cost",
    eyebrow: "What the month covers",
    title: "What the month actually costs.",
    intro: "Monthly rent runs from about PHP 35,000 in Clark to PHP 120,000 in BGC. Which house you pick sets the band; the room type sets the exact number.",
    metric: { value: "₱35–120K", label: "Monthly range across six houses" },
    secondaryMetric: { value: "11", label: "Included house essentials" },
    manifestTitle: "One bill, not eleven.",
    manifestBody: [
      "The rent covers your room, work space, meeting pods, gym, sauna, cold plunge, healthy food, laundry, cleaning, electricity, and Wi-Fi. That list is identical at every house; only the address and the rate move.",
      "Your company costs and your own spending are still yours. The rent covers the shared basics and makes no claim beyond that.",
    ],
    facts: ["Room included", "Facilities included", "House services included", "Utilities included"],
    principles: [
      { number: "01", title: "The room", body: "Choose shared or solo at any of the six houses, subject to what is free when you move in." },
      { number: "02", title: "The work floor", body: "Desk space and meeting pods come with the room, so client calls stay out of your bedroom." },
      { number: "03", title: "The body", body: "Gym, sauna, cold plunge and meals are already paid for in the monthly rate." },
      { number: "04", title: "The upkeep", body: "Laundry, cleaning, power and Wi-Fi are handled. No separate bills to chase." },
    ],
    closingTitle: "The expensive part is a scattered year.",
    closingBody: "If the setup helps you reclaim the hours needed to move the business, the rent has a job. Make it earn its place.",
  },
};

/**
 * Route metadata for a detail page. Relative URLs resolve against the
 * `metadataBase` set in the root layout.
 */
export function detailMetadata(slug: DetailPageData["slug"]): Metadata {
  const page = detailPages[slug];
  const path = `/${slug}`;

  return {
    title: page.seoTitle,
    description: page.intro,
    alternates: { canonical: path },
    openGraph: {
      title: `${page.seoTitle} | HackerHouse Accelerator`,
      description: page.intro,
      url: path,
      type: "website",
    },
  };
}
