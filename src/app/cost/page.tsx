import type { Metadata } from "next";
import { DetailPage } from "@/components/DetailPage";
import { detailMetadata, detailPages } from "@/data/pages";

export const metadata: Metadata = detailMetadata("cost");

export default function CostPage() {
  return <DetailPage page={detailPages.cost} />;
}
