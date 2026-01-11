"use client";

import Link from "next/link";
import { Printer } from "lucide-react";
import Image from "next/image";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-80 transition-opacity"
        >
          <Image
            src="/images/logo/hc-logo.png"
            alt="Huzaifa Computers"
            width={68}
            height={68}
            className="object-contain min-w-10"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-foreground/80 hover:text-foreground transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-foreground/80 hover:text-foreground transition-colors font-medium"
          >
            Printers
          </Link>
          <Link
            href="/repair"
            className="text-foreground/80 hover:text-foreground transition-colors font-medium"
          >
            Repair
          </Link>
          <Link
            href="/contact"
            className="text-foreground/80 hover:text-foreground transition-colors font-medium"
          >
            Contact
          </Link>
        </div>

        <div className="md:hidden flex gap-4">
          <Link
            href="/repair"
            className="text-sm font-medium text-foreground/80"
          >
            Repair
          </Link>
          <Link href="/products" className="text-sm font-medium text-primary">
            Shop
          </Link>
        </div>
      </nav>
    </header>
  );
}
