import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "OpenChair | Find Nearby Haircut Availability Fast",
    template: "%s | OpenChair"
  },
  description: "OpenChair helps people find nearby haircut availability fast with simple, clear local shop availability.",
  applicationName: "OpenChair",
  keywords: ["OpenChair", "haircut availability", "barber near me", "book haircut", "salon availability"],
  openGraph: {
    title: "OpenChair",
    description: "Find nearby haircut availability fast.",
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
