import type { Metadata, Viewport } from "next";
import { Archivo_Black, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import { CookieNotice } from "@/components/CookieNotice";
import { jsonLd, organizationSchema, websiteSchema } from "@/data/structured-data";
import { SITE_URL } from "@/data/site";
import "./globals.css";

const display = Archivo_Black({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const body = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

const description =
  "A live-in business residency with six houses across Metro Manila and Clark, for founders working full-time on one company — whether it already clears PHP 150,000 a month or is still pre-revenue.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HackerHouse Accelerator | Live-in houses in Metro Manila and Clark",
    template: "%s | HackerHouse Accelerator",
  },
  description,
  applicationName: "HackerHouse Accelerator",
  alternates: { canonical: "/" },
  openGraph: {
    title: "10x Your Number | HackerHouse Accelerator",
    description:
      "Six live-in houses across Metro Manila and Clark, for founders running one business full time.",
    url: "/",
    siteName: "HackerHouse Accelerator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "10x Your Number | HackerHouse Accelerator",
    description:
      "Six live-in houses across Metro Manila and Clark, for founders running one business full time.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#090908",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {children}
        <CookieNotice />
        <script
          type="application/ld+json"
          // Built from in-repo constants only; no user input reaches this string.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd(organizationSchema(), websiteSchema())),
          }}
        />
      </body>
    </html>
  );
}
