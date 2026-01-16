"use client";

import * as React from "react";
import Link from "next/link";
import { Send, Menu } from "lucide-react";
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
    title: "View All Brands",
    href: "/printers",
  },
];

const accessories = [
  {
    title: "All Accessories",
    href: "/accessories",
  },
  {
    title: "Toners",
    href: "/accessories?category=Toners",
  },
  {
    title: "Ink Cartridges",
    href: "/accessories?category=Ink Cartridges",
  },
  {
    title: "Drums",
    href: "/accessories?category=Drums",
  },
  {
    title: "Cables",
    href: "/accessories?category=Cables",
  },
  {
    title: "Paper",
    href: "/accessories?category=Paper",
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
            src="/images/logo/hc-logo.png"
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
                <NavigationMenuTrigger>Printers</NavigationMenuTrigger>
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
                <NavigationMenuTrigger>Accessories</NavigationMenuTrigger>
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

          {/* Request Service Button */}
          <Button asChild variant="default" className="gap-2">
            <Link href="/repair">
              <Send className="w-(--space-l-s) h-(--space-l-s)" />
              Request Service
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
                  Browse our products and services
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-2  ">
                {/* Printers Section */}
                <div className="space-y-3 pl-4 pt-0 ">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">Printers</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-4">
                        By Category
                      </p>
                      {printerCategories.map((item) => (
                        <SheetClose asChild key={item.title}>
                          <Link
                            href={item.href}
                            className="block text-xs hover:text-primary hover:bg-primary/5 transition-colors py-1 px-4 rounded-md"
                          >
                            {item.title}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-4">
                        By Type
                      </p>
                      {printerTypes.map((item) => (
                        <SheetClose asChild key={item.title}>
                          <Link
                            href={item.href}
                            className="block text-xs hover:text-primary hover:bg-primary/5 transition-colors py-1 px-4 rounded-md"
                          >
                            {item.title}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-4">
                        By Function
                      </p>
                      {printerFunctions.map((item) => (
                        <SheetClose asChild key={item.title}>
                          <Link
                            href={item.href}
                            className="block text-xs hover:text-primary hover:bg-primary/5 transition-colors py-1 px-4 rounded-md"
                          >
                            {item.title}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-4">
                        By Brand
                      </p>
                      {printerBrands.map((item) => (
                        <SheetClose asChild key={item.title}>
                          <Link
                            href={item.href}
                            className="block text-xs hover:text-primary hover:bg-primary/5 transition-colors py-1 px-4 rounded-md"
                          >
                            {item.title}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Accessories Section */}
                <div className="space-y-3 pl-4 pt-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">Accessories</h3>
                  </div>
                  <div className="space-y-1">
                    {accessories.map((item) => (
                      <SheetClose asChild key={item.title}>
                        <Link
                          href={item.href}
                          className="block text-xs hover:text-primary hover:bg-primary/5 transition-colors py-1 px-4 rounded-md"
                        >
                          {item.title}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 mt-2 p-6 border-t">
                  <SheetClose asChild>
                    <Button asChild className="w-full">
                      <Link href="/repair">
                        <Send className="w-4 h-4 mr-2" />
                        Request Service
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
