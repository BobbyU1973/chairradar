import { notFound, permanentRedirect } from "next/navigation";
import { shops } from "@/data/shops";
import { getShopProfilePath } from "@/lib/shopRoutes";

type LegacyShopPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LegacyShopPage({ params }: LegacyShopPageProps) {
  const { id } = await params;
  const shop = shops.find((item) => item.id === id);

  if (!shop) {
    notFound();
  }

  permanentRedirect(getShopProfilePath(shop));
}
