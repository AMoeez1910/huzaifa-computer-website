"use client";

import Lottie from "lottie-react";
import printerAnimation from "@/public/lottie/Laser Printer Printing Paper Animation.json";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Lottie Animation */}
        <div className="w-full max-w-md mx-auto">
          <Lottie
            animationData={printerAnimation}
            loop={true}
            className="w-full h-full"
          />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            We're Building Something
            <span className="block text-blue-500">Amazing</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Our website is currently under construction. We're working hard to
            bring you the best printer solutions for your home and office.
          </p>
        </div>

        {/* Contact Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2 min-w-50"
            onClick={() => (window.location.href = "tel:+923009403751")}
          >
            <Phone className="h-5 w-5" />
            Call Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-slate-600 hover:text-slate-200  hover:bg-slate-800 hover:text-white gap-2 min-w-50"
            onClick={() =>
              (window.location.href = "mailto:info@huzaifacomputers.com")
            }
          >
            <Mail className="h-5 w-5" />
            Email Us
          </Button>
        </div>

        {/* Additional Info */}
        <div className="pt-8 border-t border-slate-800">
          <p className="text-slate-400 text-sm">
            For immediate assistance, please contact us directly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4 text-slate-300">
            <a
              href="tel:+923009403751"
              className="hover:text-blue-500 transition-colors"
            >
              <Phone className="inline h-4 w-4 mr-2" />
              +92 (300) 9403751
            </a>
            <span className="hidden sm:inline text-slate-600">|</span>
            <a
              href="mailto:info@huzaifacomputers.com"
              className="hover:text-blue-500 transition-colors"
            >
              <Mail className="inline h-4 w-4 mr-2" />
              info@huzaifacomputers.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
