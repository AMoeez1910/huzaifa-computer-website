"use client";
import React from "react";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

import { Button } from "@/components/ui/button";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";

import styles from "./styles.module.css";

export function WhatWeDoCardMobile({
  cardData,
}: {
  cardData: {
    title: string;
    description: string;
    img: string;
    cta: {
      text: string;
    };
    pageLink: string;
  };
}) {
  const { width } = useWindowDimensions();
  const [ref, inView] = useInView({
    rootMargin: "-37% 0px -37% 0px",
    threshold: 0.3,
    triggerOnce: false,
    skip: width ? width > 768 : false,
  });
  return (
    <Link
      href={cardData.pageLink}
      ref={ref}
      className={`${styles.cardContainer} ${inView ? styles.hover : ""}`}
    >
      <Image
        src={cardData.img}
        alt={cardData.title}
        className={styles.img}
        width={800}
        height={800}
      />

      <div
        className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-transparent"
        style={{
          borderRadius: "var(--space-6xl)",
        }}
      />
      <div className={styles.cardHeader}>
        <h2 className={styles.cardHeading}>{cardData.title}</h2>
        <p className={styles.cardDescription}>{cardData.description}</p>
      </div>
      <Button className={styles.cta}>
        <div className={styles.ctaText}>{cardData.cta.text}</div>
        <ChevronRight size={20} className={styles.chevronRight} />
      </Button>
    </Link>
  );
}
