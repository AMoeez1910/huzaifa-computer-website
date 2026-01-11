import { Suspense } from "react";
import { HeroCarousel } from "@/components/hero-carousel";
import { CategoriesSection } from "@/components/categories-section";
import { RecentProducts } from "@/components/recent-products";
import { Spinner } from "@/components/ui/spinner";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <CategoriesSection />
      <Suspense
        fallback={
          <section className="w-full py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4 flex justify-center">
              <Spinner />
            </div>
          </section>
        }
      >
        <RecentProducts />
      </Suspense>
    </>
  );
}
