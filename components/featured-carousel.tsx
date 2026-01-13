"use client";

import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url: string;
  description?: string;
}

export function FeaturedCarousel({ products }: { products: Product[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    skipSnaps: false,
  });

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => clearInterval(autoplay);
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground/60">No featured products available</p>
      </div>
    );
  }

  return (
    <div className="relative px-2">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 -ml-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-[0_0_100%] md:flex-[0_0_calc(50%-0.5rem)] lg:flex-[0_0_calc(33.333%-0.67rem)] min-w-0 pl-4"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {products.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 rounded-full bg-background shadow-xl border-2 hover:bg-primary hover:border-primary group transition-all"
            onClick={scrollPrev}
          >
            <ChevronLeft className="w-(--space-l-s) h-(--space-l-s) text-foreground group-hover:text-primary-foreground group-hover:-translate-x-0.5 transition-all duration-200" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 rounded-full bg-background shadow-xl border-2 hover:bg-primary hover:border-primary group transition-all"
            onClick={scrollNext}
          >
            <ChevronRight className="w-(--space-l-s) h-(--space-l-s) text-foreground group-hover:text-primary-foreground group-hover:translate-x-0.5 transition-all duration-200" />
          </Button>
        </>
      )}
    </div>
  );
}
