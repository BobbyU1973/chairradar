import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { TrackedInternalLink } from "@/components/TrackedInternalLink";
import { SITE_URL } from "@/lib/site";
import {
  getBreadcrumbStructuredData,
  getFAQStructuredData
} from "@/lib/structuredData";

const faq = [
  {
    question: "Is ChairRadar a booking platform?",
    answer:
      "No. ChairRadar is a lightweight discovery directory. It sends customers to your phone number, website, booking link, directions, and public listing details."
  },
  {
    question: "Do shops need to connect a scheduling system?",
    answer:
      "No. ChairRadar does not require a scheduling integration. Add or improve your public booking link when you have one."
  },
  {
    question: "What can a claimed listing improve?",
    answer:
      "A claimed listing can keep haircut services, hours, phone number, website, booking link, walk-in information, and tracking details easier to manage."
  }
];

export const metadata: Metadata = {
  title: "Get More Haircut Customers",
  description:
    "Claim your ChairRadar listing so customers can find your haircut services, hours, booking link, phone number, and walk-in information.",
  alternates: {
    canonical: `${SITE_URL}/for-shops/get-more-haircut-customers`
  },
  openGraph: {
    title: "Get More Haircut Customers | ChairRadar",
    description:
      "Claim your ChairRadar listing so customers can find your services, hours, booking link, phone number, and walk-in information.",
    url: `${SITE_URL}/for-shops/get-more-haircut-customers`,
    siteName: "ChairRadar",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Get More Haircut Customers | ChairRadar",
    description:
      "Claim your listing so customers can find your haircut services, hours, booking link, phone number, and walk-in information."
  }
};

export default function ForShopsPage() {
  const pageUrl = `${SITE_URL}/for-shops/get-more-haircut-customers`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Get More Haircut Customers",
      description: metadata.description,
      url: pageUrl,
      isPartOf: {
        "@type": "WebSite",
        name: "ChairRadar",
        url: SITE_URL
      }
    },
    getBreadcrumbStructuredData([
      { name: "ChairRadar", url: SITE_URL },
      { name: "For shops", url: pageUrl }
    ]),
    getFAQStructuredData(faq)
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />

      <section className="px-4 pb-12 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.66fr_0.34fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
              For barbershops and salons
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Help haircut customers choose your shop faster.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
              Claim your ChairRadar listing so customers can find your haircut services, hours, booking link, phone number, and walk-in information.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[color:var(--muted)]">
              ChairRadar stays lightweight: no user accounts for customers, no payment flow, and no live scheduling integration. The goal is to send ready-to-act people to the shop's own phone, website, booking page, or map.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <TrackedInternalLink
                href="/search"
                eventName="claim_listing_click"
                eventParams={{
                  source_surface: "for_shops_primary_cta"
                }}
                className="inline-flex rounded-full bg-[color:var(--foreground)] px-6 py-3 text-sm font-semibold text-white"
              >
                Find your listing
              </TrackedInternalLink>
              <Link
                href="/locations"
                className="inline-flex rounded-full border border-[color:var(--line)] bg-white px-6 py-3 text-sm font-semibold"
              >
                View coverage
              </Link>
            </div>
          </div>

          <aside className="rounded-[30px] border border-[color:var(--line)] bg-white/82 p-6 shadow-[var(--shadow)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
              Future shop report
            </p>
            <p className="mt-4 text-3xl font-semibold tracking-tight">
              "ChairRadar sent you 87 clicks, calls, and booking visits this month."
            </p>
            <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
              The tracking hooks are already structured around calls, websites, booking links, directions, and claim clicks. Reporting can grow from there without changing the public discovery model.
            </p>
          </aside>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            {
              title: "Make the next action obvious",
              text: "Customers should quickly see whether to call, book online, visit your website, or get directions."
            },
            {
              title: "Keep public details current",
              text: "Hours, services, walk-in notes, and booking links are the small details that prevent wasted trips."
            },
            {
              title: "Measure useful interest",
              text: "Clicks, calls, booking visits, direction taps, and claim events are the first layer of shop-side reporting."
            }
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-[28px] border border-[color:var(--line)] bg-white/82 p-6 shadow-[var(--shadow)]"
            >
              <h2 className="text-2xl font-semibold tracking-tight">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.6fr_0.4fr]">
          <div className="rounded-[30px] border border-[color:var(--line)] bg-white/82 p-6 shadow-[var(--shadow)] sm:p-8">
            <h2 className="text-3xl font-semibold tracking-tight">FAQ</h2>
            <div className="mt-6 grid gap-4">
              {faq.map((item) => (
                <div key={item.question} className="rounded-[22px] bg-[color:var(--panel-strong)] p-5">
                  <h3 className="font-semibold">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[30px] border border-[color:var(--line)] bg-white/82 p-6 shadow-[var(--shadow)] sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">Related pages</h2>
            <div className="mt-5 grid gap-3">
              <Link
                href="/haircuts/mooresville-nc"
                className="rounded-[20px] bg-[color:var(--panel-strong)] p-4 text-sm font-semibold"
              >
                Haircuts in Mooresville
              </Link>
              <Link
                href="/guides/walk-in-haircuts-vs-online-booking"
                className="rounded-[20px] bg-[color:var(--panel-strong)] p-4 text-sm font-semibold"
              >
                Walk-ins vs online booking
              </Link>
              <Link
                href="/guides/find-same-day-haircut"
                className="rounded-[20px] bg-[color:var(--panel-strong)] p-4 text-sm font-semibold"
              >
                Same-day haircut guide
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
