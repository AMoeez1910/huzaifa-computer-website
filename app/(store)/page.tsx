"use client";

import Lottie from "lottie-react";
import printerAnimation from "@/public/lottie/Laser Printer Printing Paper Animation.json";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center space-y-4">
        {/* Lottie Animation */}
        <div className="w-full max-w-md  mx-auto">
          <Lottie
            animationData={printerAnimation}
            loop={true}
            className="w-full h-full"
          />
        </div>

        {/* Content */}
        <div className="space-y-4 -mt-14">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            We're Building Something
            <span className="block text-blue-500">Amazing</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Our website is currently under construction. We're working hard to
            bring you the best printers for your home and office.
          </p>
        </div>

        {/* Contact Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2 min-w-50"
            asChild
          >
            <Link href="tel:+923009403751">
              <Phone className="h-5 w-5" />
              Call Now
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-slate-600 hover:text-slate-200  hover:bg-slate-800 gap-2 min-w-50"
            asChild
          >
            <Link href="mailto:info@huzaifacomputers.com">
              <Mail className="h-5 w-5" />
              Email Us
            </Link>
          </Button>
        </div>

        {/* Additional Info */}
        <div className="pt-8 border-t border-slate-800 max-sm:pb-6">
          <p className="text-slate-400 text-sm">
            For immediate assistance, please contact us directly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4 text-slate-300">
            <Link href={"https://maps.app.goo.gl/xNTPuParQofbxwA97"}>
              Shop # LG-127, Hafeez Centre, Main Boulevard Gulberg, Lahore
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
