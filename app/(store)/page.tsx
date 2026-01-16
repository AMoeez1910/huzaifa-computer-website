import { Suspense } from "react";
import { HeroCarousel } from "@/components/homepage/hero-carousel";
import { CategoriesSection } from "@/components/homepage/categories-section";
import { RecentProducts } from "@/components/homepage/recent-products";
import { Spinner } from "@/components/ui/spinner";
import CompaniesWeDealIn from "@/components/companies-carousel";
import { UsageSectionWrapper } from "@/components/homepage/usage-section-wrapper";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <CompaniesWeDealIn />
      <CategoriesSection />
      <Suspense
        fallback={
          <section className="w-full py-8 md:py-10 bg-muted/30">
            <div className="max-w-10xl w-full mx-auto px-4 flex justify-center">
              <Spinner />
            </div>
          </section>
        }
      >
        <RecentProducts />
      </Suspense>
      <Suspense
        fallback={
          <section className="w-full py-12 md:py-20 bg-muted/30">
            <div className="max-w-10xl w-full mx-auto px-4 flex justify-center">
              <Spinner />
            </div>
          </section>
        }
      >
        <UsageSectionWrapper />
      </Suspense>
    </>
  );
}
