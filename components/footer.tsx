"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiWhatsapp } from "react-icons/si";

export function Footer() {
  return (
    <footer
      id="contact"
      className="w-full border-t border-border bg-white pt-12 md:pt-16 pb-6"
    >
      <div className="max-w-10xl w-full mx-auto px-4">
        {/* Main Content */}
        <div className="flex max-lg:flex-col justify-between w-full mb-12 gap-6 flex-wrap">
          {/* Left Section - Logo, Button, Contact Info */}
          <div className="flex flex-col gap-6">
            {/* Logo */}
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo/logo-full.jpg"
                alt="Huzaifa Computer"
                width={200}
                height={100}
                className="max-h-16 w-auto"
                unoptimized
              />
            </Link>
            <Button
              asChild
              variant={"ghost"}
              size="lg"
              className="border-2 w-fit border-primary gap-2"
            >
              <a
                href="https://wa.me/923009403751"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiWhatsapp className="h-5 w-5" />
                Get in Touch
              </a>
            </Button>

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <a
                    href="tel:03245300625"
                    className="text-foreground/70 hover:text-primary transition-colors block"
                  >
                    +92 324 5300 625
                  </a>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <a
                  href="mailto:info@huzaifacomputer.com"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  info@huzaifacomputer.com
                </a>
              </div>

              <div className="flex gap-3 items-start">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-foreground/70 leading-relaxed">
                  Shop # LG-127, Hafeez Centre
                  <br />
                  Main Boulevard, Gulberg
                  <br />
                  Lahore, 54400
                </p>
              </div>

              <div className="flex gap-3 items-start">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-foreground/70">
                  Mon - Sat: 9 AM - 10 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
          <ul className="flex pt-4 lg:gap-12 gap-4 lg:justify-center max-lg:flex-col w-full flex-1">
            <li>
              <Link
                href="/products?category=printers"
                className="text-foreground/70 hover:text-primary transition-colors text-lg whitespace-nowrap"
              >
                Printers
              </Link>
            </li>
            <li>
              <Link
                href="/products?category=accessories"
                className="text-foreground/70 hover:text-primary transition-colors text-lg whitespace-nowrap"
              >
                Accessories
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="text-foreground/70 hover:text-primary transition-colors text-lg whitespace-nowrap"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/repair"
                className="text-foreground/70 hover:text-primary transition-colors text-lg whitespace-nowrap"
              >
                Repair Services
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-foreground/70 hover:text-primary transition-colors text-lg whitespace-nowrap"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-sm text-foreground/60">
            © {new Date().getFullYear()} Huzaifa Computer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
