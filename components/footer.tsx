"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiWhatsapp } from "react-icons/si";

// Simple blur placeholder for logo
const logoBlurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg==";

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
            <Link href="/" className="flex gap-2 items-center">
              <Image
                src="/images/logo/hc-logo.png"
                alt="Huzaifa Computer"
                width={200}
                height={100}
                className="max-h-16 w-auto"
                placeholder="blur"
                blurDataURL={logoBlurDataURL}
                unoptimized
              />
              <h1 className="text-2xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                Huzaifa Computer
              </h1>
            </Link>
            <Button
              asChild
              variant={"outline"}
              size="lg"
              className="w-fit gap-2"
            >
              <a
                href="https://wa.me/923009403751"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiWhatsapp
                  style={{
                    width: "var(--space-l-s)",
                    height: "var(--space-l-s)",
                  }}
                />
                Get in Touch
              </a>
            </Button>

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <Phone className="w-(--space-l-s) h-(--space-l-s) text-primary shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <a
                    href="tel:03009403751"
                    className="text-foreground/70 hover:text-primary transition-colors text-sm block"
                  >
                    +92 300 9403751
                  </a>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <Mail className="w-(--space-l-s) h-(--space-l-s) text-primary shrink-0 mt-0.5" />
                <a
                  href="mailto:info@huzaifacomputer.com"
                  className="text-foreground/70 hover:text-primary transition-colors text-sm"
                >
                  info@huzaifacomputer.com
                </a>
              </div>

              <div className="flex gap-3 items-start">
                <MapPin className="w-(--space-l-s) h-(--space-l-s) text-primary shrink-0 mt-0.5" />
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Shop # LG-127, Hafeez Centre
                  <br />
                  Main Boulevard, Gulberg
                  <br />
                  Lahore, 54400
                </p>
              </div>

              <div className="flex gap-3 items-start">
                <Clock className="w-(--space-l-s) h-(--space-l-s) text-primary shrink-0 mt-0.5" />
                <p className="text-foreground/70 text-sm">
                  Mon - Sat: 9 AM - 10 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full flex-1 gap-8">
            <ul className="flex pt-4 lg:gap-12 gap-4 lg:justify-center max-lg:flex-col ">
              <li>
                <Link
                  href="/products?category=printers"
                  className="text-foreground/70 hover:text-primary transition-colors text-sm  whitespace-nowrap"
                >
                  Printers
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=accessories"
                  className="text-foreground/70 hover:text-primary transition-colors text-sm  whitespace-nowrap"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-foreground/70 hover:text-primary transition-colors text-sm  whitespace-nowrap"
                >
                  Products
                </Link>
              </li>
            </ul>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4167.470528873578!2d74.3433854!3d31.516092600000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919059ec9c13881%3A0xd7eada72dd063ade!2sHuzaifa%20Computer!5e1!3m2!1sen!2s!4v1768310377814!5m2!1sen!2s"
              width="600"
              height="450"
              className="lg:mx-auto"
              style={{
                border: 0,
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
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
