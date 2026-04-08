import type { Metadata } from "next";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "OpenChair | Find Nearby Haircut Availability Fast",
    template: "%s | OpenChair"
  },
  verification: {
    google: "Vw9myqX8OlyKcfUvRSAfE00UMDuKrcHaebJiTozf1yA"
  },
  description:
    "Find nearby haircut shops fast with open-now signals, walk-in options, click-to-call phone numbers, and direct booking links on OpenChair.",
  applicationName: "OpenChair",
  keywords: [
    "OpenChair",
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
    title: "OpenChair",
    description:
      "Find nearby haircut shops fast with walk-in options, direct booking links, and click-to-call shop details.",
    url: SITE_URL,
    siteName: "OpenChair",
    type: "website"
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
