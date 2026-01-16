import { getProducts } from "@/server-api/products";
import { UsageSection } from "./usage-section";

export async function UsageSectionWrapper() {
  // Fetch featured products for each usage type
  const [homeProducts, businessProducts, enterpriseProducts] =
    await Promise.all([
      getProducts({ usage: "Home", featured: true, limit: 3 }),
      getProducts({ usage: "Business", featured: true, limit: 3 }),
      getProducts({ usage: "Enterprise", featured: true, limit: 3 }),
    ]);

  return (
    <UsageSection
      homeProducts={homeProducts}
      businessProducts={businessProducts}
      enterpriseProducts={enterpriseProducts}
    />
  );
}
