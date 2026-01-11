"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { NavigationButton } from "./ui/button/NavigationButton";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "Weekly Deals",
    subtitle: "Save up to 44% on select printers + free shipping",
    description: "Buy direct from America's most trusted printer brand.",
    image: "/images/hero-image.jpg",
    cta: "Shop Now",
    href: "/products",
    variant: "full-image" as const,
  },
  {
    id: 2,
    title: "HP OfficeJet Pro 9135e",
    subtitle: "Wireless All-in-One Printer with 3 Months of Instant Ink",
    description: "AI-enabled printing for your business needs",
    image: "/images/hp-hero.jpg",
    cta: "Learn More",
    href: "/products",
    variant: "split-left" as const,
  },
  {
    id: 3,
    title: "Professional Printing Solutions",
    subtitle: "LaserJet • Inkjet • Scanner • Repair Services",
    description: "20+ years serving businesses in Lahore",
    image: "/images/toner-refil-1.jpg",
    cta: "Contact Us",
    href: "/contact",
    variant: "split-right" as const,
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

  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0">
              {slide.variant === "full-image" && (
                <div className="relative h-110 md:h-175 flex flex-col md:flex-row md:items-center">
                  {/* Image Section */}
                  <div className="relative flex-1 h-64 md:h-full">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Text Section - appears below on mobile */}
                  <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent hidden md:block"></div>
                  <div className="px-8 md:py-8 py-4 md:px-16 w-full max-md:pb-0 md:absolute md:inset-0 md:flex md:items-center md:justify-end relative z-10 md:bg-transparent">
                    <div className="max-w-2xl flex flex-col md:items-end w-full">
                      <h1 className="text-2xl md:text-6xl font-bold tracking-tight mb-3 md:mb-4 text-primary md:text-white md:drop-shadow-lg md:text-right">
                        {slide.title}
                      </h1>
                      <p className="text-base md:text-2xl mb-3 md:mb-4 text-primary/90 md:text-white/95 font-medium md:drop-shadow-md md:text-right">
                        {slide.subtitle}
                      </p>
                      <p className="text-sm md:text-lg mb-6 md:mb-8 text-primary/80 md:text-white/90 md:drop-shadow-md md:text-right">
                        {slide.description}
                      </p>
                      <NavigationButton
                        asChild
                        size="default"
                        className="bg-primary md:bg-white text-white md:text-primary hover:bg-primary/90 md:hover:bg-white/90 font-semibold shadow-xl"
                      >
                        <Link href={slide.href}>{slide.cta}</Link>
                      </NavigationButton>
                    </div>
                  </div>
                </div>
              )}

              {/* Variant 2: Split Layout - Text Left, Image Right */}
              {slide.variant === "split-left" && (
                <div className="relative h-110 md:h-175 flex flex-col md:flex-row md:bg-white">
                  {/* Image - Full Height - On top for mobile */}
                  <div className="relative flex-7 h-64 md:h-full md:order-2">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Text Content - Below image on mobile */}
                  <div className="flex-col md:flex-5 flex justify-center text-primary px-8 md:pt-8 py-4 max-md:pb-0 md:px-16 md:py-0 md:order-1">
                    <div>
                      <h1 className="text-2xl md:text-6xl font-bold tracking-tight mb-3 md:mb-4">
                        {slide.title}
                      </h1>
                      <p className="text-base md:text-2xl mb-3 md:mb-4 text-primary/90 font-medium">
                        {slide.subtitle}
                      </p>
                      <p className="text-sm md:text-lg mb-6 md:mb-8 text-primary/80">
                        {slide.description}
                      </p>
                      <NavigationButton
                        asChild
                        size="default"
                        className="bg-primary text-white hover:bg-primary/90 font-semibold"
                      >
                        <Link href={slide.href}>{slide.cta}</Link>
                      </NavigationButton>
                    </div>
                  </div>
                </div>
              )}

              {/* Variant 3: Split Layout - Image Left, Text Right */}
              {slide.variant === "split-right" && (
                <div className="relative h-110 md:h-175 flex flex-col md:flex-row md:bg-white">
                  {/* Image - Full Height - On top for mobile */}
                  <div className="relative flex-7 h-64 md:h-full">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Text Content - Below image on mobile */}
                  <div className="flex-col md:flex-5 flex justify-center text-primary px-8 md:pt-8 py-4 max-md:pb-0 md:px-16 md:py-0">
                    <div>
                      <h1 className="text-2xl md:text-6xl font-bold tracking-tight mb-3 md:mb-4">
                        {slide.title}
                      </h1>
                      <p className="text-base md:text-2xl mb-3 md:mb-4 text-primary/90 font-medium">
                        {slide.subtitle}
                      </p>
                      <p className="text-sm md:text-lg mb-6 md:mb-8 text-primary/80">
                        {slide.description}
                      </p>
                      <NavigationButton
                        asChild
                        size="default"
                        className="bg-primary text-white hover:bg-primary/90 font-semibold"
                      >
                        <Link href={slide.href}>{slide.cta}</Link>
                      </NavigationButton>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex gap-2 justify-center items-center py-4  ">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === selectedIndex
                ? "bg-primary w-8"
                : "bg-primary/50 hover:bg-primary/70"
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
