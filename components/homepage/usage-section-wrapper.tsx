import { getPrinters } from "@/server-api/printers";
import { UsageSection } from "./usage-section";

export async function UsageSectionWrapper() {
  // Fetch featured products for each usage type
  const [homeProducts, businessProducts, enterpriseProducts] =
    await Promise.all([
      getPrinters({ usage: "Home", featured: true, limit: 3 }),
      getPrinters({ usage: "Business", featured: true, limit: 3 }),
      getPrinters({ usage: "Enterprise", featured: true, limit: 3 }),
    ]);

  return (
    <UsageSection
      homeProducts={homeProducts}
      businessProducts={businessProducts}
      enterpriseProducts={enterpriseProducts}
    />
  );
}
