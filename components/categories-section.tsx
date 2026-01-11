"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Printer, Zap, Briefcase, Home, Wrench, ScanLine } from "lucide-react";

const categories = [
  {
    id: "inkjet",
    name: "Inkjet Printers",
    description: "Professional quality at affordable prices",
    icon: Printer,
    href: "/products?category=Inkjet",
    gradient: "from-primary/20 to-accent/10",
  },
  {
    id: "laser",
    name: "LaserJet Printers",
    description: "Speed, performance, and reliability",
    icon: Zap,
    href: "/products?category=LaserJet",
    gradient: "from-accent/20 to-primary/10",
  },
  {
    id: "work",
    name: "Printers for Work",
    description: "Ideal for larger workspaces with higher printing demands",
    icon: Briefcase,
    href: "/products?category=Office",
    gradient: "from-primary/20 to-accent/10",
  },
  {
    id: "home",
    name: "Printers for Home",
    description: "Perfect for personal or small office needs",
    icon: Home,
    href: "/products?category=Home",
    gradient: "from-accent/20 to-primary/10",
  },
  {
    id: "scanner",
    name: "Scanners",
    description: "High-quality scanning solutions",
    icon: ScanLine,
    href: "/products?category=Scanner",
    gradient: "from-primary/20 to-accent/10",
  },
  {
    id: "repair",
    name: "Repair Services",
    description: "Expert maintenance and repair for all printer brands",
    icon: Wrench,
    href: "/repair",
    gradient: "from-accent/20 to-primary/10",
  },
];

export function CategoriesSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
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
            const Icon = category.icon;
            return (
              <Link key={category.id} href={category.href}>
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-border/50 overflow-hidden group">
                  <CardContent
                    className={`p-8 bg-linear-to-br ${category.gradient} relative`}
                  >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>

                    <div className="relative z-10 flex items-start gap-6">
                      <div className="shrink-0 w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
