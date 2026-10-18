import Link from "next/link";
import { formatRange, houses, networkBedrooms, networkRent } from "@/data/houses";
import { included } from "@/data/site";

export function CostSection() {
  const rent = networkRent();
  const bedrooms = networkBedrooms();

  return (
    <section className="cost section-shell" id="cost" data-surface="light">
      <div className="section-index"><span>06</span><span>The cost</span></div>
      <div className="cost__grid">
        <div className="cost__price">
          <p>Monthly rent, across {houses.length} houses</p>
          <h2><span>PHP</span>{rent.min}K<small>-</small>{rent.max}K</h2>
          <p className="cost__note">Rent depends on which house you take a room in. Clark is the lowest, BGC the highest. <Link href="/houses">Compare all {houses.length} houses</Link>.</p>
        </div>
        <div className="cost__rooms">
          <span>Shared or solo rooms</span>
          <strong>{formatRange(bedrooms)}</strong>
          <span>bedrooms</span>
        </div>
      </div>
      <div className="cost__houses">
        {houses.map((house) => (
          <Link key={house.slug} href={`/houses/${house.slug}`}>
            <small>{house.index}</small>
            <strong>{house.name}</strong>
            <span>₱{house.rent.min}–{house.rent.max}K</span>
          </Link>
        ))}
      </div>
      <div className="cost__ledger">
        <p>Included</p>
        <div>{included.map((item, index) => <span key={item}><small>{String(index + 1).padStart(2, "0")}</small>{item}</span>)}</div>
      </div>
      {/* The scrolling ticker used to sit here. It repeated the same items as the
          Included list directly above, so it was cut rather than restyled. */}
      <div className="cost__proof"><strong>{houses.length}</strong><p>houses<br />to choose from.</p></div>
    </section>
  );
}
