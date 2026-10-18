import type { Metadata } from "next";
import { DetailPage } from "@/components/DetailPage";
import { detailMetadata, detailPages } from "@/data/pages";

export const metadata: Metadata = detailMetadata("rules");

export default function RulesPage() {
  return <DetailPage page={detailPages.rules} />;
}
