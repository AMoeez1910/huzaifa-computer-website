"use client";
import { WhatWeDoCard } from "./what-we-do-card";

const categories = [
  {
    id: "1",
    name: "Inkjet Printers",
    description: "Professional quality at affordable prices",
    img: "/images/epson-hero.jpg",
    href: "/products?category=Inkjet",
  },
  {
    id: "2",
    name: "LaserJet Printers",
    description: "Speed, performance, and reliability",
    img: "/images/hp-hero.jpg",
    href: "/products?category=LaserJet",
    gradient: "from-accent/20 to-primary/10",
  },
  {
    id: "3",
    name: "Accessories",
    description: "Toners, ink cartridges, and more",
    img: "/images/toner-refil.jpg",
    href: "/products?category=Office",
  },
  {
    id: "4",
    name: "View All Products",
    description: "Explore our complete range of products",
    img: "/images/all-products.jpg",
    href: "/products?category=Home",
  },
];

export function CategoriesSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-muted/30">
      <div className="max-w-10xl w-full mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Printers for Home and Office
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our versatile lineup of printing solutions for every need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => {
            return (
              <WhatWeDoCard
                key={category.id}
                cardData={{
                  title: category.name,
                  description: category.description,
                  img: category.img,
                  cta: {
                    text: "Shop Now",
                  },
                  pageLink: category.href,
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
