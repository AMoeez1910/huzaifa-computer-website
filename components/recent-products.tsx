import { createClient } from "@/lib/supabase/server";
import { FeaturedCarousel } from "./featured-carousel";

export async function RecentProducts() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(6);

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

        <FeaturedCarousel products={products || []} />
      </div>
    </section>
  );
}
