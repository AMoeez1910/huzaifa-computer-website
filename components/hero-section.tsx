"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative w-full py-20 md:py-32 bg-gradient-to-br from-primary/10 via-accent/5 to-background overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-balance">
            Premium Printers for Your <span className="text-primary">Business</span>
          </h1>

          <p className="text-lg md:text-xl text-foreground/70 mb-8 text-balance">
            Welcome to Huzaifa Computers, your trusted partner for quality printing solutions. Located in the heart of
            Hafeez Centre, we offer the finest LaserJet, Inkjet, Dot Matrix, and Scanner solutions for businesses of all
            sizes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/products">
                Shop Now <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="tel:03009403751">Call Us</a>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-card/50 backdrop-blur rounded-lg p-4 border border-border/50">
              <p className="font-semibold text-primary">20+ Years</p>
              <p className="text-foreground/60 text-xs">Experience</p>
            </div>
            <div className="bg-card/50 backdrop-blur rounded-lg p-4 border border-border/50">
              <p className="font-semibold text-primary">100+ Models</p>
              <p className="text-foreground/60 text-xs">In Stock</p>
            </div>
            <div className="bg-card/50 backdrop-blur rounded-lg p-4 border border-border/50">
              <p className="font-semibold text-primary">Expert Team</p>
              <p className="text-foreground/60 text-xs">Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
