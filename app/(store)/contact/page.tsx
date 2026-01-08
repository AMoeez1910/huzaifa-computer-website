import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-muted/30 to-background py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visit our store or get in touch with us for any inquiries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Address Card */}
          <Card className="border-border/50">
            <CardContent className="pt-6">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Our Location</h3>
                  <p className="text-muted-foreground leading-relaxed">
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
            </CardContent>
          </Card>

          {/* Phone Card */}
          <Card className="border-border/50">
            <CardContent className="pt-6">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Phone</h3>
                  <a
                    href="tel:03009403751"
                    className="text-lg text-primary hover:underline font-medium"
                  >
                    0300 9403751
                  </a>
                  <p className="text-muted-foreground text-sm mt-2">
                    Available during business hours
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hours Card */}
          <Card className="border-border/50">
            <CardContent className="pt-6">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Business Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Saturday
                    <br />
                    9:00 AM - 10:00 PM
                    <br />
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Card */}
          <Card className="border-border/50">
            <CardContent className="pt-6">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Email</h3>
                  <a
                    href="mailto:info@huzaifacomputers.com"
                    className="text-lg text-primary hover:underline font-medium"
                  >
                    info@huzaifacomputers.com
                  </a>
                  <p className="text-muted-foreground text-sm mt-2">
                    We'll respond within 24 hours
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-primary text-primary-foreground border-0">
          <CardContent className="pt-8 pb-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Need Immediate Assistance?
            </h3>
            <p className="mb-6 text-primary-foreground/90">
              Contact us directly via WhatsApp or call us now
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
                onClick={() =>
                  window.open("https://wa.me/923009403751", "_blank")
                }
              >
                WhatsApp Us
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                <a href="tel:03009403751">Call Now</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Links */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/repair">Repair Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
