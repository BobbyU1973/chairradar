import { notFound, permanentRedirect } from "next/navigation";
import { getLocationPageBySegments } from "@/data/locationPages";
import { getCanonicalLocalSeoHrefForLocationPage } from "@/data/localSeoPages";

type LegacyLocationPageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export default async function LegacyLocationPage({
  params
}: LegacyLocationPageProps) {
  const { slug } = await params;
  const page = getLocationPageBySegments(slug);

  if (!page) {
    notFound();
  }

  const canonicalHref = getCanonicalLocalSeoHrefForLocationPage(page);

  if (!canonicalHref) {
    notFound();
  }

  permanentRedirect(canonicalHref);
}
