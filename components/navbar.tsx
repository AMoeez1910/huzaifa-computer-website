"use client";

import * as React from "react";
import Link from "next/link";
import { Phone, Menu } from "lucide-react";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { SiWhatsapp } from "react-icons/si";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const printerCategories = [
  {
    title: "Inkjet Printers",
    href: "/printers?category=Inkjet",
  },
  {
    title: "LaserJet Printers",
    href: "/printers?category=LaserJet",
  },
  {
    title: "Scanners",
    href: "/printers?category=Scanner",
  },
  {
    title: "All Printers",
    href: "/printers",
  },
];

const printerTypes = [
  {
    title: "Color",
    href: "/printers?type=Color",
  },
  {
    title: "Black and White",
    href: "/printers?type=Black and White",
  },
];

const printerFunctions = [
  {
    title: "Printer Only",
    href: "/printers?function=Printer",
  },
  {
    title: "Printer-Scanner",
    href: "/printers?function=Printer-Scanner",
  },
  {
    title: "All-in-One",
    href: "/printers?function=All-in-One",
  },
  {
    title: "Scan Only",
    href: "/printers?function=Scan",
  },
];

const printerBrands = [
  {
    title: "HP",
    href: "/printers?brand=hp",
  },
  {
    title: "Canon",
    href: "/printers?brand=canon",
  },
  {
    title: "Epson",
    href: "/printers?brand=epson",
  },
  {
    title: "Pantum",
    href: "/printers?brand=pantum",
  },
  {
    title: "View All Brands",
    href: "/printers",
  },
];

const accessories = [
  {
    title: "Ink Cartridges",
    href: "/accessories?category=Ink Cartridges",
  },
  {
    title: "Toner Cartridges",
    href: "/accessories?category=Toner Cartridges",
  },
  {
    title: "Paper",
    href: "/accessories?category=Paper",
  },
  {
    title: "All Accessories",
    href: "/accessories",
  },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="max-w-10xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-primary"
        >
          <Image
            src="/images/logo/hc-logo.webp"
            alt="Logo"
            width={68}
            height={68}
            className="object-contain"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-6 flex-1 justify-end">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Printers */}
              <NavigationMenuItem>
                <NavigationMenuTrigger><Link href={"/printers"}>Printers</Link></NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-112.5 lg:w-137.5 lg:grid-cols-3">
                    <div className="flex flex-col gap-2">
                      <h4 className="font-bold text-sm px-2 text-muted-foreground uppercase tracking-wider">
                        By Category
                      </h4>
                      {printerCategories.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                        />
                      ))}
                    </div>
                    <div className="flex flex-col gap-2">
                      <h4 className="font-bold text-sm px-2 text-muted-foreground uppercase tracking-wider">
                        By Type
                      </h4>
                      {printerTypes.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                        />
                      ))}
                      <h4 className="font-bold text-sm px-2 text-muted-foreground uppercase tracking-wider mt-2">
                        By Function
                      </h4>
                      {printerFunctions.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                        />
                      ))}
                    </div>
                    <div className="flex flex-col gap-2">
                      <h4 className="font-bold text-sm px-2 text-muted-foreground uppercase tracking-wider">
                        By Brand
                      </h4>
                      {printerBrands.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                        />
                      ))}
                    </div>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Accessories */}
              <NavigationMenuItem>
                <NavigationMenuTrigger><Link href={"/accessories"}>Accessories</Link></NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-75 gap-2 p-4">
                    {accessories.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {/* WhatsApp Get In Touch Button */}
          <Button asChild variant="ghost" className="gap-2">
            <a
              href="https://wa.me/923009403751"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiWhatsapp className="w-(--space-l-s) h-(--space-l-s)" />
              Get in Touch
            </a>
          </Button>

          {/* Contact Us Button */}
          <Button asChild variant="default" className="gap-2">
            <Link href="tel:03009403751">
              <Phone className="w-(--space-l-s) h-(--space-l-s)" />
              Contact Us
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden flex ">
          <Sheet>
            <SheetTrigger asChild>
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="right" className="overflow-y-auto lg:hidden">
              <SheetHeader className="pb-0">
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Browse our printers and accessories
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-2 pt-4">
                {/* Printers Section with Accordion */}
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="printers">
                    <AccordionTrigger className="text-lg font-semibold px-4">
                      Printers
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 px-8">
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            By Category
                          </p>
                          {printerCategories.map((item) => (
                            <SheetClose asChild key={item.title}>
                              <Link
                                href={item.href}
                                className="block text-xs hover:text-primary hover:bg-primary/5 transition-colors py-1 px-2 rounded-md"
                              >
                                {item.title}
                              </Link>
                            </SheetClose>
                          ))}
                        </div>

                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            By Type
                          </p>
                          {printerTypes.map((item) => (
                            <SheetClose asChild key={item.title}>
                              <Link
                                href={item.href}
                                className="block text-xs hover:text-primary hover:bg-primary/5 transition-colors py-1 px-2 rounded-md"
                              >
                                {item.title}
                              </Link>
                            </SheetClose>
                          ))}
                        </div>

                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            By Function
                          </p>
                          {printerFunctions.map((item) => (
                            <SheetClose asChild key={item.title}>
                              <Link
                                href={item.href}
                                className="block text-xs hover:text-primary hover:bg-primary/5 transition-colors py-1 px-2 rounded-md"
                              >
                                {item.title}
                              </Link>
                            </SheetClose>
                          ))}
                        </div>

                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            By Brand
                          </p>
                          {printerBrands.map((item) => (
                            <SheetClose asChild key={item.title}>
                              <Link
                                href={item.href}
                                className="block text-xs hover:text-primary hover:bg-primary/5 transition-colors py-1 px-2 rounded-md"
                              >
                                {item.title}
                              </Link>
                            </SheetClose>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Accessories Section */}
                  <AccordionItem value="accessories">
                    <AccordionTrigger className="text-lg font-semibold px-4">
                      Accessories
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-1 px-4">
                        {accessories.map((item) => (
                          <SheetClose asChild key={item.title}>
                            <Link
                              href={item.href}
                              className="block text-xs hover:text-primary hover:bg-primary/5 transition-colors py-1 px-2 rounded-md"
                            >
                              {item.title}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 mt-2 p-6 border-t">
                  <SheetClose asChild>
                    <Button asChild className="w-full">
                      <Link href="tel:03009403751">
                        <Phone className="w-4 h-4 mr-2" />
                        Contact Us
                      </Link>
                    </Button>
                  </SheetClose>
                  <Button asChild variant="outline" className="w-full">
                    <a
                      href="https://wa.me/923009403751"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SiWhatsapp className="w-4 h-4 mr-2" />
                      Get in Touch
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

// Fixed ListItem to use the updated NavigationMenuLink
function ListItem({ title, href }: { title: string; href: string }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm font-semibold leading-none">{title}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
