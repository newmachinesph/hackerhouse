import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { legalDocs } from "@/data/legal";

const doc = legalDocs.privacy;

export const metadata: Metadata = {
  title: "Privacy",
  description: doc.intro,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy | HackerHouse Accelerator",
    description: doc.intro,
    url: "/privacy",
    type: "website",
  },
};

export default function PrivacyPage() {
  return <LegalPage doc={doc} />;
}
