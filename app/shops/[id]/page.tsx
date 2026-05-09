import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { shops } from "@/data/shops";
import { SITE_URL } from "@/lib/site";
import { getShopProfilePath } from "@/lib/shopRoutes";

type LegacyShopPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params
}: LegacyShopPageProps): Promise<Metadata> {
  const { id } = await params;
  const shop = shops.find((item) => item.id === id);

  if (!shop) {
    return {
      title: "Shop not found"
    };
  }

  return {
    title: `${shop.name} in ${shop.city}, ${shop.state}`,
    alternates: {
      canonical: `${SITE_URL}${getShopProfilePath(shop)}`
    },
    robots: {
      index: false,
      follow: true
    }
  };
}

export function generateStaticParams() {
  return shops.map((shop) => ({
    id: shop.id
  }));
}

export default async function LegacyShopPage({ params }: LegacyShopPageProps) {
  const { id } = await params;
  const shop = shops.find((item) => item.id === id);

  if (!shop) {
    notFound();
  }

  redirect(getShopProfilePath(shop));
}
