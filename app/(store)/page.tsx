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
          <section className="w-full py-8 md:py-10 bg-white">
            <div className="max-w-10xl w-full mx-auto px-4 flex flex-col items-center justify-center">
              <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                  Featured Printers
                </h2>
                <p className="text-muted-foreground text-lg">
                  Our most popular and recommended printer models
                </p>
              </div>
              <Spinner />
            </div>
          </section>
        }
      >
        <RecentProducts />
      </Suspense>
      <Suspense
        fallback={
          <section className="w-full py-12 md:py-20 bg-white">
            <div className="max-w-10xl w-full mx-auto px-4 flex flex-col items-center justify-center">
              <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                  Discover Printer Suited For You
                </h2>
                <p className="text-muted-foreground text-lg">
                  Find the perfect printer for your needs
                </p>
              </div>
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
