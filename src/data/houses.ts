import type { Metadata } from "next";

export type HouseSlug = "makati" | "bgc" | "pasig" | "moa" | "qc" | "clark";

export type House = {
  slug: HouseSlug;
  index: string;
  name: string;
  city: string;
  area: string;
  tagline: string;
  intro: string;
  /** Monthly rent in PHP thousands. */
  rent: { min: number; max: number };
  bedrooms: { min: number; max: number };
  standout: readonly string[];
  nearby: readonly string[];
  image: string;
};

/**
 * PLACEHOLDER PRICING — every `rent` and `bedrooms` value below is an
 * assumption, tiered by what each district typically costs. None of it is confirmed.
 * Correct these before launch: the rest of the site derives from them, so editing a
 * number here updates every figure shown anywhere on the site.
 */
export const houses: readonly House[] = [
  {
    slug: "makati",
    index: "01",
    name: "Makati",
    city: "Makati",
    area: "Makati CBD",
    tagline: "The oldest business district, and the shortest meeting commute.",
    intro:
      "Your investors, your bank and most of your enterprise clients already work here. If your week is full of meetings, this is the house that stops you losing hours to EDSA.",
    rent: { min: 70, max: 110 },
    bedrooms: { min: 6, max: 10 },
    standout: [
      "Walking distance to Ayala Avenue offices",
      "Best house for investor and client meetings",
      "Most cafes and backup workspaces within walking distance",
    ],
    nearby: ["Ayala Avenue", "Salcedo Village", "Greenbelt", "Poblacion"],
    image: "/media/houses/makati.png",
  },
  {
    slug: "bgc",
    index: "02",
    name: "BGC",
    city: "Taguig",
    area: "Bonifacio Global City, Taguig",
    tagline: "Newest build, cleanest streets, highest rent.",
    intro:
      "BGC is the most planned district in the country. Wide pavements, power that stays on, and most of the tech and multinational offices within walking distance. It costs the most, and it is the easiest place to bring someone you want to impress.",
    rent: { min: 75, max: 120 },
    bedrooms: { min: 8, max: 12 },
    standout: [
      "The most reliable power and fibre of the six",
      "Walkable to tech and multinational offices",
      "The house to use when you need to impress someone",
    ],
    nearby: ["High Street", "Uptown", "Track 30th", "Market Market"],
    image: "/media/houses/bgc.png",
  },
  {
    slug: "pasig",
    index: "03",
    name: "Pasig",
    city: "Pasig",
    area: "Ortigas Center, Pasig",
    tagline: "Sits between Makati and QC, costs less than both.",
    intro:
      "Ortigas is the easiest house to reach from anywhere in the metro. The buildings are older and less polished than BGC, and you pay noticeably less for the same reach.",
    rent: { min: 55, max: 90 },
    bedrooms: { min: 8, max: 12 },
    standout: [
      "Most central location in the network",
      "Reaches the same places as Makati and BGC for less",
      "Older buildings, quieter floors",
    ],
    nearby: ["Ortigas Center", "Kapitolyo", "Estancia", "Pasig River"],
    image: "/media/houses/pasig.png",
  },
  {
    slug: "moa",
    index: "04",
    name: "Mall of Asia",
    city: "Pasay",
    area: "Bay Area, Pasay",
    tagline: "Flat roads, open water, twenty minutes to the airport.",
    intro:
      "The bay area is flat, new and unusually open for Metro Manila. Take this house if you fly often, or if you want to finish the day running along the water instead of sitting in traffic.",
    rent: { min: 50, max: 85 },
    bedrooms: { min: 8, max: 14 },
    standout: [
      "Closest house to the airport",
      "Bayside running and walking routes",
      "Newer roads and lighter traffic than the rest of the metro",
    ],
    nearby: ["Mall of Asia", "Manila Bay", "Entertainment City", "NAIA"],
    image: "/media/houses/moa.png",
  },
  {
    slug: "qc",
    index: "05",
    name: "Quezon City",
    city: "Quezon City",
    area: "Diliman, Quezon City",
    tagline: "Quiet streets, and the best place to hire engineers.",
    intro:
      "Diliman is green, residential and sits beside the largest university in the country. If you are hiring engineers or designers, they already live within a few kilometres of this house.",
    rent: { min: 45, max: 75 },
    bedrooms: { min: 10, max: 14 },
    standout: [
      "Closest to the biggest pool of technical hires",
      "Quietest streets in Metro Manila",
      "The cheapest rent that is still inside the metro",
    ],
    nearby: ["UP Diliman", "Katipunan", "Teachers Village", "Tomas Morato"],
    image: "/media/houses/qc.png",
  },
  {
    slug: "clark",
    index: "06",
    name: "Clark",
    city: "Pampanga",
    area: "Clark Freeport, Pampanga",
    tagline: "Two hours north. Cheapest rent, fewest distractions.",
    intro:
      "Clark is a former airbase two hours north of Manila. Wide empty roads, big skies, and not much to do after dark. Take this house if your real problem is that you keep getting distracted.",
    rent: { min: 35, max: 60 },
    bedrooms: { min: 10, max: 16 },
    standout: [
      "Lowest rent in the network",
      "Almost no commute, and almost no nightlife",
      "The most floor space per peso of any house",
    ],
    nearby: ["Clark Freeport", "Angeles City", "Clark airport", "Mt. Arayat"],
    image: "/media/houses/clark.png",
  },
] as const;

export const houseSlugs = houses.map((house) => house.slug);

export function houseBySlug(slug: HouseSlug): House {
  const house = houses.find((item) => item.slug === slug);
  if (!house) throw new Error(`Unknown house slug: ${slug}`);
  return house;
}

/** Rent range across the whole network, so no page hardcodes a price. */
export const networkRent = () => ({
  min: Math.min(...houses.map((house) => house.rent.min)),
  max: Math.max(...houses.map((house) => house.rent.max)),
});

export const networkBedrooms = () => ({
  min: Math.min(...houses.map((house) => house.bedrooms.min)),
  max: Math.max(...houses.map((house) => house.bedrooms.max)),
});

export const formatRange = (range: { min: number; max: number }) => `${range.min}–${range.max}`;

export const formatRent = (range: { min: number; max: number }) => `₱${range.min}–${range.max}K`;

/** Route metadata for one house. Relative URLs resolve against the root metadataBase. */
export function houseMetadata(slug: HouseSlug): Metadata {
  const house = houseBySlug(slug);
  const title = `${house.name} House`;
  const path = `/houses/${house.slug}`;

  return {
    title,
    description: house.intro,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | HackerHouse Accelerator`,
      description: house.intro,
      url: path,
      type: "website",
    },
  };
}
