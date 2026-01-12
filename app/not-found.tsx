"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import printerAnimation from "@/public/lottie/Printing.json";
import Lottie from "lottie-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-10xl w-full mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          {/* Lottie Animation */}
          <Lottie
            animationData={printerAnimation}
            loop={true}
            className="w-full h-full"
          />
          <div className="-mt-12 z-100 relative">
            <h1 className="text-6xl font-bold mb-4 ">404</h1>
            <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
            <p className="text-foreground/60 mb-8">
              Oops! The page you're looking for seems to have run out of ink.
              Let's get you back on track.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/">Go Home</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
