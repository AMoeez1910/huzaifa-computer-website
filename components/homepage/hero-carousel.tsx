"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { NavigationButton } from "../ui/button/NavigationButton";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "Heavy Performance Affordable Price",
    subtitle: "Get enterprise-level printing without the heavy price tag.",
    description:
      "We stock the best value-for-money printers in Lahore. Perfect for students, remote work, and small businesses.",
    // Visual: Modern desk with printer
    image:
      "/images/hero-image.jpg",
    cta: "View Best Sellers",
    href: "/printers",
    variant: "full-image" as const,
  },
  {
    id: 2,
    title: "Expert Repairs You Can Actually Trust.",
    subtitle: "Printer not working let us have a look.",
    description:
      "We use genuine parts to fix what others can't. Bring your printer in or let us know the issue.",
    // Visual: Technician hands fixing hardware
    image:
     "/images/hero-image-2.jpg",
    cta: "Get Support",
    href: "tel:03009403751",
    variant: "split-left" as const,
  },
  {
    id: 3,
    title: "Browse Online. Call to Order.",
    subtitle: "From Our Warehouse , Delivered to your door.",
    description:
      "Found the perfect printer? Give us a call to confirm stock and we'll have it shipped to you in 24-48 hours (in Lahore).",
    // Visual: Delivery service / Box
    image:
     "/images/hero-image-3.jpg",
    cta: "Browse Collection",
    href: "/printers",
    variant: "split-right" as const,
  },
];

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
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
              {/* Variant 1: Full Image Overlay */}
              {slide.variant === "full-image" && (
                <div className="relative h-110 lg:h-175 flex flex-col lg:flex-row lg:items-center">
                  <div className="relative flex-1 h-64 lg:h-full">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      priority={slide.id === 1}
                      unoptimized 
                      />
                  </div>
                  <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent hidden lg:block"></div>
                  <div className="px-8 lg:py-8 py-4 lg:px-16 w-full max-lg:pb-0 lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-end relative z-10 lg:bg-transparent">
                    <div className="max-w-2xl flex flex-col lg:items-end w-full">
                      <h1 className="text-2xl lg:text-5xl font-semibold tracking-tight mb-3 lg:mb-4 text-primary lg:text-white lg:drop-shadow-lg lg:text-right">
                        {slide.title}
                      </h1>
                      <p className="text-base lg:text-xl mb-3 lg:mb-4 text-primary/90 lg:text-white/95 font-medium lg:drop-shadow-md lg:text-right">
                        {slide.subtitle}
                      </p>
                      <p className="text-sm lg:text-lg mb-6 lg:mb-8 text-primary/80 lg:text-white/90 lg:drop-shadow-md lg:text-right">
                        {slide.description}
                      </p>
                      <NavigationButton
                        asChild
                        size="default"
                        className="bg-primary w-fit lg:bg-white text-white lg:text-primary hover:bg-primary/90 lg:hover:bg-white/90 font-semibold shadow-xl"
                      >
                        <Link href={slide.href}>{slide.cta}</Link>
                      </NavigationButton>
                    </div>
                  </div>
                </div>
              )}

              {/* Variant 2: Split Layout - Text Left, Image Right */}
              {slide.variant === "split-left" && (
                <div className="relative h-110 lg:h-175 flex flex-col lg:flex-row lg:bg-white">
                  <div className="relative flex-8 h-64 lg:h-full lg:order-2">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex-col lg:flex-5 flex justify-center text-primary px-8 lg:pt-8 py-4 max-lg:pb-0 lg:px-16 lg:py-0 lg:order-1">
                    <div>
                      <h1 className="text-2xl lg:text-5xl font-semibold tracking-tight mb-3 lg:mb-4">
                        {slide.title}
                      </h1>
                      <p className="text-base lg:text-xl mb-3 lg:mb-4 text-primary/90 font-medium">
                        {slide.subtitle}
                      </p>
                      <p className="text-sm lg:text-lg mb-6 lg:mb-8 text-primary/80">
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
                <div className="relative h-110 lg:h-175 flex flex-col lg:flex-row lg:bg-white">
                  <div className="relative flex-8 h-64 lg:h-full">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex-col lg:flex-5 flex justify-center text-primary px-8 lg:pt-8 py-4 max-lg:pb-0 lg:px-16 lg:py-0">
                    <div>
                      <h1 className="text-2xl lg:text-5xl font-semibold tracking-tight mb-3 lg:mb-4">
                        {slide.title}
                      </h1>
                      <p className="text-base lg:text-xl mb-3 lg:mb-4 text-primary/90 font-medium">
                        {slide.subtitle}
                      </p>
                      <p className="text-sm lg:text-lg mb-6 lg:mb-8 text-primary/80">
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

      <div className="flex gap-2 justify-center items-center py-4">
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
