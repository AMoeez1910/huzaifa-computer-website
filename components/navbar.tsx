"use client";

import * as React from "react";
import Link from "next/link";
import { Wrench } from "lucide-react";
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

const printerTypes = [
  {
    title: "LaserJet",
    href: "/products?type=laserjet",
  },
  {
    title: "Inkjet",
    href: "/products?type=inkjet",
  },
  {
    title: "All-in-One",
    href: "/products?type=all-in-one",
  },
  {
    title: "Black & White",
    href: "/products?type=black-and-white",
  },
];

const printerBrands = [
  {
    title: "HP",
    href: "/products?brand=hp",
  },
  {
    title: "Canon",
    href: "/products?brand=canon",
  },
  {
    title: "Epson",
    href: "/products?brand=epson",
  },
  {
    title: "View All Brands",
    href: "/products",
  },
];

const accessories = [
  {
    title: "Toners",
    href: "/products?category=toners",
  },
  {
    title: "Ink Cartridges",
    href: "/products?category=cartridges",
  },
  {
    title: "Drums",
    href: "/products?category=drums",
  },
  {
    title: "Other Accessories",
    href: "/products?category=accessories",
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
                  {/* Changed w-100/125 to [400px]/[500px] */}
                  <ul className="grid gap-3 p-4 md:w-112.5 lg:w-137.5 lg:grid-cols-2">
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
              <Wrench className="w-(--space-l-s) h-(--space-l-s)" />
              Request Service
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden flex gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="border-2 border-primary"
          >
            <a
              href="https://wa.me/923009403751"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiWhatsapp className="w-(--space-l-s) h-(--space-l-s)" />
            </a>
          </Button>
          <Button
            asChild
            size="sm"
            variant="ghost"
            className="border-2 border-primary"
          >
            <Link href="/repair">
              <Wrench className="w-(--space-l-s) h-(--space-l-s)" />
            </Link>
          </Button>
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
