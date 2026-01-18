import { getPrinters } from "@/server-api/printers";
import { UsageSection } from "./usage-section";

export async function UsageSectionWrapper() {
  // Fetch featured products for each usage type
  const [homeProducts, businessProducts, enterpriseProducts] =
    await Promise.all([
      getPrinters({ usage: "Home", sold_out: false, limit: 4 }),
      getPrinters({ usage: "Business", sold_out: false, limit: 4 }),
      getPrinters({ usage: "Enterprise", sold_out: false, limit: 4 }),
    ]);
  return (
    <UsageSection
      homeProducts={homeProducts}
      businessProducts={businessProducts}
      enterpriseProducts={enterpriseProducts}
    />
  );
}
