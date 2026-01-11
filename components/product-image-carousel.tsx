"use client";

import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageCarouselProps {
  images: string[];
  productName: string;
}

export function ProductImageCarousel({
  images,
  productName,
}: ProductImageCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollTo = (index: number) => {
    emblaApi?.scrollTo(index);
    setSelectedIndex(index);
  };

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square bg-linear-to-br from-secondary/30 to-secondary/10 rounded-lg overflow-hidden">
        <Image
          src="/placeholder.svg?height=400&width=400&query=printer"
          alt={productName}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className="relative aspect-square bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-lg overflow-hidden">
        <Image
          src={images[0]}
          alt={productName}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main carousel */}
      <div className="relative">
        <div className="overflow-hidden rounded-lg" ref={emblaRef}>
          <div className="flex">
            {images.map((image, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0">
                <div className="relative aspect-square bg-gradient-to-br from-secondary/30 to-secondary/10">
                  <Image
                    src={image}
                    alt={`${productName} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:bg-background"
          onClick={scrollPrev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:bg-background"
          onClick={scrollNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Thumbnail navigation */}
      <div className="flex gap-2 justify-center">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
              selectedIndex === index
                ? "border-primary shadow-md scale-105"
                : "border-border hover:border-primary/50"
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
