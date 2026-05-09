import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { SiteFooter } from "@/components/SiteFooter";
import { getGuidePage, guidePages } from "@/data/guidePages";
import { getLocalSeoPageByHref } from "@/data/localSeoPages";
import { SITE_URL } from "@/lib/site";
import {
  getBreadcrumbStructuredData,
  getFAQStructuredData
} from "@/lib/structuredData";

type GuidePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return guidePages.map((page) => ({
    slug: page.slug
  }));
}

export async function generateMetadata({
  params
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getGuidePage(slug);

  if (!page) {
    return {
      title: "Guide not found"
    };
  }

  const url = `${SITE_URL}${page.href}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: `${page.metaTitle} | ChairRadar`,
      description: page.metaDescription,
      url,
      siteName: "ChairRadar",
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.metaTitle} | ChairRadar`,
      description: page.metaDescription
    }
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const page = getGuidePage(slug);

  if (!page) {
    notFound();
  }

  const pageUrl = `${SITE_URL}${page.href}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: page.metaTitle,
      description: page.metaDescription,
      url: pageUrl,
      publisher: {
        "@type": "Organization",
        name: "ChairRadar",
        url: SITE_URL
      }
    },
    getBreadcrumbStructuredData([
      { name: "ChairRadar", url: SITE_URL },
      { name: "Guides", url: `${SITE_URL}/guides/find-same-day-haircut` },
      { name: page.metaTitle, url: pageUrl }
    ]),
    getFAQStructuredData(page.faq)
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />

      <section className="px-4 pb-10 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
            {page.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {page.heading}
          </h1>
          <p className="mt-5 text-lg leading-8 text-[color:var(--muted)]">
            {page.intro}
          </p>
          <div className="mt-8">
            <SearchBar buttonLabel="Search nearby shops" compact />
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-4xl gap-5">
          {page.sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[28px] border border-[color:var(--line)] bg-white/82 p-6 shadow-[var(--shadow)]"
            >
              <h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2>
              <p className="mt-3 leading-7 text-[color:var(--muted)]">{section.body}</p>
              {section.bullets ? (
                <ul className="mt-4 grid gap-2 text-sm leading-6 text-[color:var(--muted)]">
                  {section.bullets.map((item) => (
                    <li key={item} className="rounded-[18px] bg-[color:var(--panel-strong)] px-4 py-3">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-[0.6fr_0.4fr]">
          <div className="rounded-[28px] border border-[color:var(--line)] bg-white/82 p-6 shadow-[var(--shadow)]">
            <h2 className="text-2xl font-semibold tracking-tight">Quick FAQ</h2>
            <div className="mt-5 grid gap-4">
              {page.faq.map((item) => (
                <div key={item.question}>
                  <h3 className="font-semibold">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[28px] border border-[color:var(--line)] bg-white/82 p-6 shadow-[var(--shadow)]">
            <h2 className="text-2xl font-semibold tracking-tight">Related pages</h2>
            <div className="mt-5 grid gap-3">
              {page.relatedHrefs.map((href) => {
                const localPage = getLocalSeoPageByHref(href);
                const guidePage = guidePages.find((item) => item.href === href);

                return (
                  <Link
                    key={href}
                    href={href}
                    className="rounded-[20px] border border-[color:var(--line)] bg-[color:var(--panel-strong)] p-4 text-sm font-semibold transition hover:-translate-y-1"
                  >
                    {localPage?.metaTitle ?? guidePage?.metaTitle ?? href}
                  </Link>
                );
              })}
              <Link
                href="/for-shops/get-more-haircut-customers"
                className="rounded-[20px] border border-[color:var(--line)] bg-[color:var(--panel-strong)] p-4 text-sm font-semibold transition hover:-translate-y-1"
              >
                For shops: get more haircut customers
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
