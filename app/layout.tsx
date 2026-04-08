import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "OpenChair | Find Nearby Haircut Availability Fast",
    template: "%s | OpenChair"
  },
  description:
    "OpenChair is Yelp/OpenTable for haircut availability, monetized through self-serve promotion and demand capture rather than cold-calling shops.",
  applicationName: "OpenChair",
  keywords: [
    "OpenChair",
    "haircut availability",
    "barber near me",
    "book haircut",
    "salon availability",
    "claim shop",
    "sponsored listings",
    "promoted placement"
  ],
  openGraph: {
    title: "OpenChair",
    description:
      "Find nearby haircut shops fast while giving merchants a self-serve way to claim profiles and pay for promoted visibility.",
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
      <body>{children}</body>
    </html>
  );
}
