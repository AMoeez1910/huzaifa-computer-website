"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, Mail, Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer
      id="contact"
      className="w-full border-t border-border bg-white pt-6 md:pt-10 pb-4"
    >
      <div className="container mx-auto px-4">
        {/* Top Section with Logo and Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and About */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo/logo-full.jpg"
                alt="Huzaifa Computer"
                width={200}
                height={100}
                className="h-16 w-auto"
                unoptimized
              />
            </Link>
            {/* Social Links */}
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="text-foreground/60 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-foreground/60 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/repair"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  Repair Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="space-y-3">
              <div className="flex gap-2 items-start">
                <Phone className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <a
                  href="tel:03009403751"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  0300 9403751
                </a>
              </div>
              <div className="flex gap-2 items-start">
                <Mail className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <a
                  href="mailto:info@huzaifacomputer.com"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  info@huzaifacomputer.com
                </a>
              </div>
            </div>
          </div>

          {/* Address & Hours */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Visit Us</h3>
            <div className="space-y-3">
              <div className="flex gap-2 items-start">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Shop # LG-127, Hafeez Centre
                  <br />
                  Main Boulevard, Gulberg
                  <br />
                  Lahore, 54400
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-foreground/70">
                  Mon - Sat: 9 AM - 10 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
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
