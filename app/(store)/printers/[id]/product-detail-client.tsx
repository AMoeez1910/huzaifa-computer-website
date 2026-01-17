"use client";

import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Tag } from "lucide-react";
import { ProductImageCarousel } from "@/components/product-image-carousel";
import { EditorReadonly } from "@/components/ui/blocks/editor-00";
import Link from "next/link";
import { SiWhatsapp } from "react-icons/si";

export function ProductDetailClient({ product }: { product: Product | null }) {
  if (!product) {
    notFound();
  }

  // Prepare images array for carousel - always include main_image first
  const productImages = [
    ...(product.main_image ? [product.main_image] : []),
    ...(product.images || []),
  ];

  const whatsappMessage = encodeURIComponent(
    `Hi, is the ${product.name} available? I would like to know more about it.\n${process.env.NEXT_PUBLIC_BASE_URL}/printers/${product.id}`
  );
  const whatsappUrl = `https://wa.me/923009403751?text=${whatsappMessage}`;

  // Calculate discount percentage and discounted price if applicable
  const discountPercentage =
    product.discount && product.discount > 0 ? product.discount : null;

  const discountedPrice = discountPercentage
    ? product.price * (1 - discountPercentage / 100)
    : null;

  return (
    <div className="w-full py-12 bg-linear-to-b from-muted/30 to-background">
      <div className="max-w-10xl w-full mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image Carousel */}
          <div className="flex items-center justify-center">
            <div className="relative w-full">
              <div className={product.sold_out ? "grayscale opacity-70" : ""}>
                <ProductImageCarousel
                  images={productImages}
                  productName={product.name}
                />
              </div>
              {product.sold_out && (
                <>
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 rounded-lg pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <Badge className="text-4xl font-bold py-6 px-12 bg-red-600/90 text-white border-4 border-white shadow-2xl">
                      SOLD OUT
                    </Badge>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold">
                  {product.name}
                </h1>
                {product.sold_out && (
                  <Badge className="text-lg font-bold py-2 px-4 bg-red-600 text-white">
                    SOLD OUT
                  </Badge>
                )}
              </div>

              {/* Price Section */}
              <div className="flex items-baseline gap-3 mb-6">
                {discountedPrice ? (
                  <>
                    <p className="text-4xl font-bold text-green-600">
                      PKR{" "}
                      {discountedPrice.toLocaleString("en-PK", {
                        maximumFractionDigits: 0,
                      })}
                    </p>
                    <p className="text-2xl font-medium text-muted-foreground line-through">
                      PKR {product.price.toLocaleString()}
                    </p>
                  </>
                ) : (
                  <p className="text-4xl font-bold text-primary">
                    PKR {product.price.toLocaleString()}
                  </p>
                )}
              </div>

              {/* Description Section */}
              <div className="mb-8 pb-8 border-b border-border">
                {product.description ? (
                  <div className="text-muted-foreground leading-relaxed">
                    <EditorReadonly
                      editorSerializedState={
                        typeof product.description === "string"
                          ? JSON.parse(product.description)
                          : product.description
                      }
                    />
                  </div>
                ) : (
                  <p className="text-muted-foreground leading-relaxed">
                    No description available
                  </p>
                )}
              </div>

              {/* Product Specifications */}
              <Card className="bg-muted/50 border-border/50 mb-8">
                <CardContent className="py-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Product Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Category
                      </p>
                      <p className="font-semibold">{product.category}</p>
                    </div>
                    {product.type && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Type
                        </p>
                        <p className="font-semibold">{product.type}</p>
                      </div>
                    )}
                    {product.function && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Function
                        </p>
                        <p className="font-semibold">{product.function}</p>
                      </div>
                    )}
                    {product.usage && product.usage.length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Usage
                        </p>
                        <p className="font-semibold">
                          {product.usage.join(", ")}
                        </p>
                      </div>
                    )}
                    {discountPercentage && discountPercentage > 0 && (
                      <>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Discount
                          </p>
                          <p className="font-semibold text-green-600">
                            {discountPercentage}% OFF
                          </p>
                        </div>
                        {discountedPrice && (
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">
                              You Save
                            </p>
                            <p className="font-semibold text-green-600">
                              PKR{" "}
                              {(product.price - discountedPrice).toLocaleString(
                                "en-PK",
                                { maximumFractionDigits: 0 }
                              )}
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 pt-8 border-t border-border">
              {product.sold_out && (
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-2">
                  <p className="text-red-800 dark:text-red-200 font-medium text-center">
                    This product is currently sold out. Contact us for
                    availability or similar products.
                  </p>
                </div>
              )}
              <Button
                size="lg"
                className="gap-2 shadow-md hover:shadow-lg transition-all bg-primary text-primary-foreground hover:bg-primary/90"
                asChild
              >
                <Link href={whatsappUrl} target="_blank">
                  <SiWhatsapp
                    style={{
                      width: "var(--space-l-s)",
                      height: "var(--space-l-s)",
                    }}
                  />{" "}
                  {product.sold_out
                    ? "Enquire on WhatsApp"
                    : "Contact via WhatsApp"}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="tel:03009403751">
                  <Phone className="h-5 w-5" />
                  Call for {product.sold_out ? "Enquiry" : "Availability"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
