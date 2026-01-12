import React from "react";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import styles from "./styles.module.css";
import { WhatWeDoCardMobile } from "./what-we-do-card-mobile";
import { Button } from "../../ui/button";

export function WhatWeDoCard({
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
  return (
    <>
      {/* Tablet/Desktop */}
      <Link href={cardData.pageLink} className={styles.cardContainer}>
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
        <Button className={styles.button}>
          <div className={styles.buttonText}>{cardData.cta.text}</div>
          <ChevronRight size={20} className={styles.chevronRight} />
        </Button>
      </Link>
      <WhatWeDoCardMobile cardData={cardData} />
    </>
  );
}
