"use client";

import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Phone } from "lucide-react";
import { ProductImageCarousel } from "@/components/product-image-carousel";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url: string;
  images?: string[];
  description?: string;
}

export function ProductDetailClient({ product }: { product: Product | null }) {
  if (!product) {
    notFound();
  }

  // Prepare images array for carousel
  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : product.image_url
      ? [product.image_url]
      : [];

  const whatsappMessage = encodeURIComponent(
    `Hi, is the ${product.name} available? I would like to know more about it.`
  );
  const whatsappUrl = `https://wa.me/923009403751?text=${whatsappMessage}`;

  return (
    <div className="w-full py-12 bg-linear-to-brom-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image Carousel */}
          <div className="flex items-center justify-center">
            <ProductImageCarousel
              images={productImages}
              productName={product.name}
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-0 hover:bg-primary/20">
                {product.category}
              </Badge>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 mb-6">
                <p className="text-4xl font-bold text-primary">
                  PKR {product.price.toLocaleString()}
                </p>
              </div>

              <div className="mb-8 pb-8 border-b border-border">
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description || "No description available"}
                </p>
              </div>

              <Card className="bg-muted/50 border-border/50 mb-8">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Product Details
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Category
                      </p>
                      <p className="font-semibold">{product.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Price
                      </p>
                      <p className="font-semibold text-primary">
                        PKR {product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 pt-8 border-t border-border">
              <Button
                size="lg"
                className="gap-2 shadow-md hover:shadow-lg transition-all bg-primary text-primary-foreground hover:bg-primary/90"
                asChild
              >
                <Link href={whatsappUrl} target="_blank">
                  <MessageCircle className="h-5 w-5" />
                  Contact via WhatsApp
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="tel:03009403751">
                  <Phone className="h-5 w-5" />
                  Call for Availability
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
