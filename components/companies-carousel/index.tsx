"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./styles.module.css";
import AutoScroll from "embla-carousel-auto-scroll";
const logos = [
  {
    src: `/svg/hp.svg`,
    width: 80,
    alt: "canon",
  },
  {
    src: `/svg/epson.svg`,
    alt: "Epson",
  },
  {
    src: `/svg/canon.svg`,
    alt: "Canon",
  },
  {
    src: `/svg/pantum.svg`,
    alt: "Pantum",
  },
  {
    src: `/svg/ricoh.svg`,
    alt: "Ricoh",
  },
];

export default function InthePressCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [
      AutoScroll({
        playOnInit: true,
        startDelay: 0,
        speed: 1,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );
  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    emblaApi
      .on("autoScroll:play", () => {})
      .on("autoScroll:stop", () => {})
      .on("reInit", () => {});
  }, [emblaApi]);
  const handleMouseEnter = () => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    autoScroll?.stop();
  };
  const handleMouseLeave = () => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    autoScroll?.play();
  };
  return (
    <div
      id="in-the-press"
      className="container mx-auto px-4 flex flex-col justify-between pt-10 md:pt-12 2xl:pt-16 pb-6 md:pb-14 "
    >
      <h2 className="text-3xl md:text-4xl font-bold max-md:px-4 pb-8">
        Companies We Deal In
      </h2>
      <section className={styles.embla}>
        <div
          className={`${styles.embla__viewport}`}
          ref={emblaRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            maskImage:
              "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)",
          }}
        >
          <div className={styles.embla__container}>
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index + "in-the-pressLogos"}
                className={`${styles.embla__slide} flex items-center justify-center`}
              >
                <Image
                  src={logo.src}
                  width={logo.width || 120}
                  height={50}
                  alt={logo.alt || "Company Logo"}
                  priority={true}
                  style={{ width: logo.width, height: "auto" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
