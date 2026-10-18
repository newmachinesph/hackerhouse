import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationPage } from "@/components/LocationPage";
import { houseMetadata, houses } from "@/data/houses";
import { breadcrumbSchema, houseSchema, jsonLd } from "@/data/structured-data";

// The six houses are the only valid slugs; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return houses.map((house) => ({ slug: house.slug }));
}

export async function generateMetadata(props: PageProps<"/houses/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const house = houses.find((item) => item.slug === slug);
  if (!house) return {};
  return houseMetadata(house.slug);
}

export default async function HouseLocationRoute(props: PageProps<"/houses/[slug]">) {
  const { slug } = await props.params;
  const house = houses.find((item) => item.slug === slug);
  if (!house) notFound();

  const others = houses.filter((item) => item.slug !== house.slug);
  const schema = jsonLd(
    houseSchema(house),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Houses", path: "/houses" },
      { name: house.name, path: `/houses/${house.slug}` },
    ]),
  );

  return (
    <>
      <LocationPage house={house} others={others} />
      <script
        type="application/ld+json"
        // Built from in-repo constants only; no user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
