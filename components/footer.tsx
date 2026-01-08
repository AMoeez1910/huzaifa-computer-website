"use client";

import Link from "next/link";
import { MapPin, Phone, Clock, Shield, FileText } from "lucide-react";

export function Footer() {
  return (
    <footer
      id="contact"
      className="w-full border-t border-border bg-secondary/30 py-12 md:py-16"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Address */}
          <div className="space-y-3">
            <div className="flex gap-2 items-start">
              <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Address</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Shop # LG-127
                  <br />
                  Hafeez Centre, Main Boulevard
                  <br />
                  Gulberg, Block E1
                  <br />
                  Lahore, 54400
                </p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-3">
            <div className="flex gap-2 items-start">
              <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <a
                  href="tel:03009403751"
                  className="text-sm text-primary hover:underline font-medium"
                >
                  0300 9403751
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-3">
            <div className="flex gap-2 items-start">
              <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Hours</h3>
                <p className="text-sm text-foreground/70">
                  Mon - Sat: 9:00 AM - 10:00 PM
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
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/60">
            © Huzaifa Computers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
