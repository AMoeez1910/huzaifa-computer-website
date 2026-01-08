"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Weekly Deals",
    subtitle: "Save up to 44% on select printers + free shipping",
    description: "Buy direct from America's most trusted printer brand.",
    image: "/hero-1.jpg",
    cta: "Shop Now",
    href: "/products",
  },
  {
    id: 2,
    title: "HP OfficeJet Pro 9135e",
    subtitle: "Wireless All-in-One Printer with 3 Months of Instant Ink",
    description: "AI-enabled printing for your business needs",
    image: "/hero-2.jpg",
    cta: "Learn More",
    href: "/products",
  },
  {
    id: 3,
    title: "Professional Printing Solutions",
    subtitle: "LaserJet • Inkjet • Scanner • Repair Services",
    description: "20+ years serving businesses in Lahore",
    image: "/hero-3.jpg",
    cta: "Contact Us",
    href: "/contact",
  },
];

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  return (
    <section className="relative w-full bg-gradient-to-br from-primary via-primary/90 to-accent overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0">
              <div className="relative h-[500px] md:h-[600px] flex items-center">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Text Content */}
                    <div className="text-white">
                      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                        {slide.title}
                      </h1>
                      <p className="text-xl md:text-2xl mb-4 text-white/90 font-medium">
                        {slide.subtitle}
                      </p>
                      <p className="text-lg mb-8 text-white/80">
                        {slide.description}
                      </p>
                      <Button
                        asChild
                        size="lg"
                        className="bg-white text-primary hover:bg-white/90 font-semibold"
                      >
                        <Link href={slide.href}>{slide.cta}</Link>
                      </Button>
                    </div>

                    {/* Placeholder for image - you'll add actual images later */}
                    <div className="hidden md:flex items-center justify-center">
                      <div className="w-full h-80 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center text-white/50">
                        Image placeholder - {slide.id}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white border-0"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-5 w-5 text-primary" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white border-0"
        onClick={scrollNext}
      >
        <ChevronRight className="h-5 w-5 text-primary" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === selectedIndex
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/70"
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
