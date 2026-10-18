import { formatRent, houses, networkRent } from "./houses";
import { houseRules, included } from "./site";

export type FaqItem = { question: string; answer: string };

/**
 * Answer-engine content. Every answer is derived from the same data the pages
 * render, so a price or house edit can never leave a stale answer behind.
 *
 * Questions are phrased the way someone would actually ask them out loud, which
 * is what answer engines match against.
 */
export function faqItems(): FaqItem[] {
  const rent = networkRent();
  const names = houses.map((house) => house.name);
  const cheapest = houses.reduce((a, b) => (a.rent.min <= b.rent.min ? a : b));
  const dearest = houses.reduce((a, b) => (a.rent.max >= b.rent.max ? a : b));

  return [
    {
      question: "What is HackerHouse Accelerator?",
      answer:
        "HackerHouse Accelerator rents rooms in six shared houses across Metro Manila and Clark. Everyone living there runs one business full time, picks a single number they are trying to grow, and spends the year on it. There are no classes, no demo day and no syllabus. You rent a room, and the house handles the food, cleaning, gym and work space.",
    },
    {
      question: "Where are the HackerHouse Accelerator houses?",
      answer: `There are ${houses.length} houses: ${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}. Five are in Metro Manila and one is in Clark, Pampanga, about two hours north.`,
    },
    {
      question: "How much does it cost to live at HackerHouse Accelerator?",
      answer: `Rent runs ${formatRent(rent)} per month depending on which house you choose and which room is free. ${cheapest.name} is the lowest at ${formatRent(cheapest.rent)} and ${dearest.name} the highest at ${formatRent(dearest.rent)}. One payment a month covers the room and everything the house runs.`,
    },
    {
      question: "What is included in the rent?",
      answer: `${included.length} things are included at every house: ${included.join(", ").toLowerCase()}. The list is the same at all ${houses.length} houses. Only the address and the rate change.`,
    },
    {
      question: "Who qualifies to join HackerHouse Accelerator?",
      answer:
        "Two ways in. Either the business already earns at least PHP 150,000 a month, or it is pre-revenue and you are building it full time. We read both. What we do not bend on: it is your only business, you have no day job, and you can name the one number that matters most to it.",
    },
    {
      question: "Which HackerHouse Accelerator house should I pick?",
      answer: houses
        .map((house) => `${house.name} (${house.area}, ${formatRent(house.rent)}): ${house.tagline}`)
        .join(" "),
    },
    {
      question: "What are the house rules?",
      answer: houseRules.map((rule) => `${rule.title}: ${rule.body}`).join(" "),
    },
    {
      question: "How do I apply to HackerHouse Accelerator?",
      answer:
        "Use the Apply button on any page. It asks what you are building, a link to it, your current revenue, the number you are trying to move, and what ten times that looks like by December.",
    },
  ];
}
