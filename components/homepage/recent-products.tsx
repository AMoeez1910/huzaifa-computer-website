import { createClient } from "@/lib/supabase/server";
import { FeaturedCarousel } from "../featured-carousel";
import { getPrinters } from "@/server-api/printers";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export async function RecentProducts() {
  const supabase = await createClient();

  const recentProducts = await getPrinters({
    featured: true,
    sold_out: false,
    limit: 10,
  });

  return (
    <section className="w-full py-8 pb-2 md:py-12 md:pb-4 bg-white">
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
        {/* View All Button */}
        <div className="flex justify-center mt-10">
          <Button asChild size="lg" variant="default">
            <Link href={`/printers?featured=true`}>
              View All Featured Printers
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
