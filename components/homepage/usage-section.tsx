"use client";

import { useState } from "react";
import { ProductCard } from "../product-card";
import { HomePrinterIcon } from "../icons/HomePrinterIcon";
import { BusinessPrinterIcon } from "../icons/BusinessPrinterIcon";
import { EnterprisePrinterIcon } from "../icons/EnterprisePrinterIcon";

interface UsageSectionProps {
  homeProducts: Product[];
  businessProducts: Product[];
  enterpriseProducts: Product[];
}

type UsageType = "Home" | "Business" | "Enterprise";

export function UsageSection({
  homeProducts,
  businessProducts,
  enterpriseProducts,
}: UsageSectionProps) {
  const [activeTab, setActiveTab] = useState<UsageType>("Home");

  const tabs = [
    {
      name: "Home" as UsageType,
      icon: HomePrinterIcon,
      products: homeProducts,
    },
    {
      name: "Business" as UsageType,
      icon: BusinessPrinterIcon,
      products: businessProducts,
    },
    {
      name: "Enterprise" as UsageType,
      icon: EnterprisePrinterIcon,
      products: enterpriseProducts,
    },
  ];

  const activeProducts =
    tabs.find((tab) => tab.name === activeTab)?.products || [];

  return (
    <section className="w-full py-12 md:py-20 bg-muted/30">
      <div className="max-w-10xl w-full mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Discover Printer Suited For You
          </h2>
          <p className="text-muted-foreground text-lg">
            Find the perfect printer for your needs
          </p>
        </div>

        {/* Icon Tabs */}
        <div className="flex justify-center gap-8 md:gap-16 mb-12">
          {tabs.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setActiveTab(name)}
              className="group flex flex-col items-center gap-3 transition-all"
            >
              <Icon
                className={`w-16 h-16 md:w-20 md:h-20 transition-all ease-in-out duration-300 ${
                  activeTab === name
                    ? "text-blue-900"
                    : "text-muted-foreground group-hover:text-gray-400"
                }`}
              />
              <span
                className={`text-sm md:text-base font-semibold transition-colors ${
                  activeTab === name
                    ? "text-blue-900"
                    : "text-muted-foreground group-hover:text-gray-400"
                }`}
              >
                {name}
              </span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeProducts.length > 0 ? (
            activeProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">
                No {activeTab.toLowerCase()} printers available at the moment
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
