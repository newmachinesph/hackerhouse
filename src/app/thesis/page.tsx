import type { Metadata } from "next";
import { DetailPage } from "@/components/DetailPage";
import { detailMetadata, detailPages } from "@/data/pages";

export const metadata: Metadata = detailMetadata("thesis");

export default function ThesisPage() {
  return <DetailPage page={detailPages.thesis} />;
}
