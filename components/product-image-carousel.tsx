"use client";

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProductImageCarousel({
  images,
  productName,
  isSoldOut = false,
}: ProductImageCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square w-full max-w-lg bg-linear-to-br from-secondary/30 to-secondary/10 rounded-lg overflow-hidden">
        <Image
          src="/placeholder.svg?height=400&width=400&query=printer"
          alt={productName}
          fill
          className="object-contain"
        />
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className="relative flex justify-center items-center aspect-square w-full max-w-lg bg-linear-to-br from-secondary/30 to-secondary/10 rounded-lg overflow-hidden shadow-lg">
        <Image
          src={images[0]}
          alt={productName}
          fill
          className="object-contain"
        />
        {isSoldOut && (
                <>
                    <div className="absolute z-10 w-full flex justify-center items-center text-2xl font-bold p-2 bg-primary text-white ">
                      SOLD OUT
                    </div>
                </>
              )}
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full max-w-lg">
      {/* Main carousel */}
      <div className="relative">
        <div className="overflow-hidden rounded-lg shadow-lg" ref={emblaRef}>
          <div className="flex">
            {images.map((image, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0">
                <div className="relative aspect-square bg-linear-to-br from-secondary/30 to-secondary/10">
                  <Image
                    src={image}
                    alt={`${productName} - Image ${index + 1}`}
                    fill
                    className="object-contain"
                    priority={index === 0}
                  />
                  {isSoldOut && (
                <>
                  <div className="absolute inset-0 z-10 rounded-lg pointer-events-none" />
                    <div className="w-full flex justify-center items-center text-2xl font-bold p-2 bg-primary text-white shadow-2xl">
                      SOLD OUT
                    </div>
                </>
              )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 rounded-full bg-white shadow-xl border-2 hover:bg-primary hover:border-primary group transition-all"
          onClick={scrollPrev}
        >
          <ChevronLeft className="w-(--space-l-s) h-(--space-l-s) text-foreground group-hover:text-primary-foreground group-hover:-translate-x-0.5 transition-all duration-200" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 rounded-full bg-white shadow-xl border-2 hover:bg-primary hover:border-primary group transition-all"
          onClick={scrollNext}
        >
          <ChevronRight className="w-(--space-l-s) h-(--space-l-s) text-foreground group-hover:text-primary-foreground group-hover:translate-x-0.5 transition-all duration-200" />
        </Button>
        {/* Slide indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all ${
                selectedIndex === index
                  ? "w-6 bg-primary"
                  : "w-2 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail navigation */}
      <div className="flex gap-2 justify-center flex-wrap">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden border-2 transition-all ${
              selectedIndex === index
                ? "border-primary shadow-md scale-105"
                : "border-border hover:border-primary/50"
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-contain"
            />
             {isSoldOut && (
                <>
                    <div className="w-full flex justify-center items-center text-2xl font-bold p-2 bg-primary text-white shadow-2xl">
                      SOLD OUT
                    </div>
                </>
              )}
          </button>
        ))}
      </div>
    </div>
  );
}
