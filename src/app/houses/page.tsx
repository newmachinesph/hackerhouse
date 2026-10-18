import type { Metadata } from "next";
import { HouseIndexPage } from "@/components/HouseIndexPage";
import { formatRent, houses, networkRent } from "@/data/houses";
import { breadcrumbSchema, houseListSchema, jsonLd } from "@/data/structured-data";

const description = `HackerHouse Accelerator runs ${houses.length} houses across Metro Manila and Clark. Same rules and services at every one; rent runs ${formatRent(networkRent())} a month depending on the house and the room.`;

export const metadata: Metadata = {
  title: "The Houses",
  description,
  alternates: { canonical: "/houses" },
  openGraph: {
    title: "The Houses | HackerHouse Accelerator",
    description,
    url: "/houses",
    type: "website",
  },
};

export default function HousesPage() {
  const schema = jsonLd(
    houseListSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Houses", path: "/houses" },
    ]),
  );

  return (
    <>
      <HouseIndexPage />
      <script
        type="application/ld+json"
        // Built from in-repo constants only; no user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
