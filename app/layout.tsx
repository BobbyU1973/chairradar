import type { Metadata } from "next";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ChairRadar | Haircut Near Me, Barbers, Salons, and Walk-Ins",
    template: "%s | ChairRadar"
  },
  verification: {
    google: "Vw9myqX8OlyKcfUvRSAfE00UMDuKrcHaebJiTozf1yA"
  },
  description:
    "ChairRadar helps people find nearby barbershops and salons with walk-in details, posted hours, phone numbers, booking links, and directions for a same-day haircut search.",
  applicationName: "ChairRadar",
  keywords: [
    "ChairRadar",
    "haircut availability",
    "barber near me",
    "walk-in haircut",
    "open now haircut",
    "book haircut",
    "salon availability",
    "hair salon near me",
    "barbershop north carolina"
  ],
  openGraph: {
    title: "ChairRadar | Find Nearby Haircuts Fast",
    description:
      "Find nearby barbershops and salons with walk-in details, posted hours, phone numbers, booking links, and directions.",
    url: SITE_URL,
    siteName: "ChairRadar",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ChairRadar haircut discovery directory"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ChairRadar | Find Nearby Haircuts Fast",
    description:
      "Find nearby barbershops, salons, and haircut providers with walk-in options, booking links, phone numbers, hours, and directions.",
    images: ["/opengraph-image"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      </body>
    </html>
  );
}
