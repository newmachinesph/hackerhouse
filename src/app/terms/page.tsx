import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { legalDocs } from "@/data/legal";

const doc = legalDocs.terms;

export const metadata: Metadata = {
  title: "Terms",
  description: doc.intro,
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms | HackerHouse Accelerator",
    description: doc.intro,
    url: "/terms",
    type: "website",
  },
};

export default function TermsPage() {
  return <LegalPage doc={doc} />;
}
