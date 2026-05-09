import { shops, type Shop } from "@/data/shops";

export function slugifyPathPart(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getShopSlug(shop: Shop) {
  if (shop.id === "main-street-barber-hairstyling") {
    return "main-street-barber-mooresville-nc";
  }

  return `${slugifyPathPart(shop.name)}-${slugifyPathPart(shop.city)}-${shop.state.toLowerCase()}`;
}

export function getShopProfilePath(shop: Shop) {
  return `/shop/${getShopSlug(shop)}`;
}

export function getShopBySlug(slug: string) {
  return shops.find((shop) => getShopSlug(shop) === slug || shop.id === slug);
}
