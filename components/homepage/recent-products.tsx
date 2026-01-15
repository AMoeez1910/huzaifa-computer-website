import { createClient } from "@/lib/supabase/server";
import { FeaturedCarousel } from "../featured-carousel";
import { getProducts } from "@/server-api/products";

export async function RecentProducts() {
  const supabase = await createClient();

  const recentProducts = await getProducts({ featured: true, limit: 10 });

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-10xl w-full mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Featured Printers
          </h2>
          <p className="text-muted-foreground text-lg">
            Our most popular and recommended printer models
          </p>
        </div>

        <FeaturedCarousel products={recentProducts || []} />
      </div>
    </section>
  );
}
